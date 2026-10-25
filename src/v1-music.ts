import type { InviteLanguage } from './v1-language';

export function setupInviteMusic(root:HTMLElement){
  const audio=root.querySelector<HTMLAudioElement>('.v1-music-audio')!;
  const button=root.querySelector<HTMLButtonElement>('.v1-music-toggle')!;
  const startAtSeconds=10;
  let language:InviteLanguage='en';
  let mutedByGuest=false;
  let starting=false;
  let gestureStartPending=false;
  let playbackStartedByGuest=false;
  let startPositionApplied=false;
  audio.volume=.24;
  audio.muted=mutedByGuest;
  function applyStartPosition(){
    if(startPositionApplied||audio.readyState<HTMLMediaElement.HAVE_METADATA)return;
    const lastPlayableSecond=Number.isFinite(audio.duration)?Math.max(0,audio.duration-.05):startAtSeconds;
    audio.currentTime=Math.min(startAtSeconds,lastPlayableSecond);
    startPositionApplied=true;
  }
  audio.addEventListener('loadedmetadata',applyStartPosition,{once:true});
  function update(){
    const playing=!audio.muted;
    const label=language==='mr'
      ?(playing?'संगीत बंद करा':'संगीत सुरू करा')
      :(playing?'Mute music':'Play music');
    button.setAttribute('aria-label',label);
    button.title=label;
    button.setAttribute('aria-pressed',String(playing));
    button.dataset.playing=String(playing);
  }
  async function start(fromGesture=false){
    if(starting&&!fromGesture)return;
    starting=true;
    try { applyStartPosition(); await audio.play(); } catch { /* Retry after a guest gesture if autoplay was blocked. */ }
    finally { starting=false;update(); }
  }
  button.addEventListener('click',()=>{
    if(!audio.muted&&!audio.paused){
      mutedByGuest=true;
      audio.muted=true;
    }else{
      mutedByGuest=false;
      audio.muted=false;
      void start(true);
    }
    update();
  });
  // Start playback at the first touch or click, before navigation handlers run.
  const onGuestTap=(event:Event)=>{
    if(event.target instanceof Element&&event.target.closest('.v1-music-toggle,a,input,select,textarea'))return;
    if(mutedByGuest||gestureStartPending||playbackStartedByGuest)return;
    gestureStartPending=true;
    void start(true).finally(()=>{
      gestureStartPending=false;
      if(!audio.paused)playbackStartedByGuest=true;
    });
  };
  root.addEventListener('pointerdown',onGuestTap,{capture:true});
  root.addEventListener('click',onGuestTap);
  for(const event of ['playing','pause','volumechange','ended'])audio.addEventListener(event,update);
  update();
  return {setLanguage(next:InviteLanguage){language=next;update();}};
}
