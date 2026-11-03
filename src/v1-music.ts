import type { InviteLanguage } from './v1-language';

export function setupInviteMusic(root:HTMLElement){
  const audio=root.querySelector<HTMLAudioElement>('.v1-music-audio')!;
  const button=root.querySelector<HTMLButtonElement>('.v1-music-toggle')!;
  let language:InviteLanguage='en';
  let mutedByGuest=false;
  let starting=false;
  let playbackGeneration=0;
  // The 94-second clip contains the four-second fades and a fixed music level.
  // Native playback avoids iOS differences between media volume and Web Audio gain.
  audio.volume=1;
  audio.muted=false;
  audio.loop=true;
  function update(){
    const playing=!mutedByGuest&&!audio.muted&&!audio.paused;
    const label=language==='mr'
      ?(playing?'संगीत बंद करा':'संगीत सुरू करा')
      :(playing?'Mute music':'Play music');
    button.setAttribute('aria-label',label);
    button.title=label;
    button.setAttribute('aria-pressed',String(playing));
    button.dataset.playing=String(playing);
    button.dataset.enabled=String(!mutedByGuest);
  }
  function stop(){
    mutedByGuest=true;
    playbackGeneration++;
    starting=false;
    audio.muted=true;
    audio.pause();
    update();
  }
  async function start(){
    if(starting)return;
    starting=true;
    const generation=++playbackGeneration;
    mutedByGuest=false;
    audio.muted=false;
    try {
      // Invoke play before any await, directly inside the trusted gesture.
      await audio.play();
    } catch {
      if(generation===playbackGeneration)audio.pause();
      // A blocked attempt leaves the control ready for another trusted gesture.
    } finally {
      if(generation===playbackGeneration)starting=false;
      update();
    }
  }
  button.addEventListener('click',()=>{
    if(starting||(!mutedByGuest&&!audio.paused))stop();
    else void start();
  });
  const onGuestTap=(event:Event)=>{
    if(event.target instanceof Element&&event.target.closest('.v1-music-toggle,a,input,select,textarea'))return;
    if(mutedByGuest||starting||!audio.paused)return;
    void start();
  };
  // Try at swipe start; touchend and click retry if the browser blocks that attempt.
  root.addEventListener('touchstart',onGuestTap,{capture:true,passive:true});
  root.addEventListener('touchend',onGuestTap,{capture:true,passive:true});
  root.addEventListener('click',onGuestTap,{capture:true});
  window.addEventListener('pagehide',stop);
  for(const event of ['playing','pause','volumechange','ended'])audio.addEventListener(event,update);
  update();
  return {setLanguage(next:InviteLanguage){language=next;update();}};
}
