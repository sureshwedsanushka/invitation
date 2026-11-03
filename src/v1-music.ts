import type { InviteLanguage } from './v1-language';

export function setupInviteMusic(root:HTMLElement){
  const audio=root.querySelector<HTMLAudioElement>('.v1-music-audio')!;
  const button=root.querySelector<HTMLButtonElement>('.v1-music-toggle')!;
  const loopAtSeconds=94;
  const fadeSeconds=4;
  const targetVolume=.24;
  let language:InviteLanguage='en';
  let mutedByGuest=false;
  let starting=false;
  let playbackGeneration=0;
  let startPositionApplied=false;
  let endFadeStarted=false;
  let audioContext:AudioContext|undefined;
  let gainNode:GainNode|undefined;
  let fadeTimer:number|undefined;
  let fadeGeneration=0;
  audio.volume=targetVolume;
  audio.muted=mutedByGuest;
  audio.loop=false;
  function applyStartPosition(){
    if(startPositionApplied||audio.readyState<HTMLMediaElement.HAVE_METADATA)return;
    audio.currentTime=0;
    startPositionApplied=true;
  }
  audio.addEventListener('loadedmetadata',applyStartPosition,{once:true});
  function initializeAudioOutput(){
    if(gainNode||!window.AudioContext)return;
    try{
      audioContext=new AudioContext();
      const source=audioContext.createMediaElementSource(audio);
      gainNode=audioContext.createGain();
      gainNode.gain.setValueAtTime(0,audioContext.currentTime);
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      audio.volume=1;
    }catch{
      void audioContext?.close();
      audioContext=undefined;
      gainNode=undefined;
      audio.volume=targetVolume;
    }
  }
  function setLevel(level:number){
    if(gainNode&&audioContext){
      const now=audioContext.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(level,now);
    }else audio.volume=level;
  }
  function fadeTo(level:number,durationSeconds:number){
    if(fadeTimer!==undefined)window.clearTimeout(fadeTimer);
    fadeTimer=undefined;
    const generation=++fadeGeneration;
    if(gainNode&&audioContext?.state==='running'){
      const now=audioContext.currentTime;
      const gain=gainNode.gain;
      const startLevel=gain.value;
      gain.cancelScheduledValues(now);
      gain.setValueAtTime(startLevel,now);
      gain.linearRampToValueAtTime(level,now+durationSeconds);
      return;
    }
    const startLevel=audio.volume;
    const startedAt=performance.now();
    const step=()=>{
      if(generation!==fadeGeneration)return;
      const progress=Math.min(1,(performance.now()-startedAt)/(durationSeconds*1000));
      audio.volume=startLevel+(level-startLevel)*progress;
      if(progress<1)fadeTimer=window.setTimeout(step,40);
      else fadeTimer=undefined;
    };
    step();
  }
  function onTimeUpdate(){
    if(audio.paused)return;
    if(audio.currentTime>=loopAtSeconds){
      endFadeStarted=false;
      setLevel(0);
      audio.currentTime=0;
      fadeTo(targetVolume,fadeSeconds);
      return;
    }
    if(!endFadeStarted&&audio.currentTime>=loopAtSeconds-fadeSeconds){
      endFadeStarted=true;
      fadeTo(0,fadeSeconds);
    }
  }
  audio.addEventListener('timeupdate',onTimeUpdate);
  function update(){
    const playing=!mutedByGuest&&!audio.muted&&!audio.paused&&(!audioContext||audioContext.state==='running');
    const label=language==='mr'
      ?(playing?'संगीत बंद करा':'संगीत सुरू करा')
      :(playing?'Mute music':'Play music');
    button.setAttribute('aria-label',label);
    button.title=label;
    button.setAttribute('aria-pressed',String(playing));
    button.dataset.playing=String(playing);
  }
  function stop(){
    mutedByGuest=true;
    playbackGeneration++;
    starting=false;
    fadeGeneration++;
    if(fadeTimer!==undefined)window.clearTimeout(fadeTimer);
    fadeTimer=undefined;
    setLevel(0);
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
      applyStartPosition();
      initializeAudioOutput();
      // Both calls must happen synchronously inside the trusted gesture.
      const resumeAudio=audioContext&&audioContext.state!=='running'
        ?audioContext.resume():Promise.resolve();
      const playAudio=audio.play();
      await Promise.all([resumeAudio,playAudio]);
      if(generation!==playbackGeneration||mutedByGuest)return;
      endFadeStarted=false;
      fadeTo(targetVolume,Math.min(fadeSeconds,Math.max(.1,loopAtSeconds-audio.currentTime)));
    } catch {
      if(generation===playbackGeneration){
        audio.pause();
        setLevel(0);
      }
      // Keep the control available for the next trusted gesture.
    } finally {
      if(generation===playbackGeneration)starting=false;
      update();
    }
  }
  button.addEventListener('click',()=>{
    if(starting||(!mutedByGuest&&!audio.paused&&(!audioContext||audioContext.state==='running'))){
      stop();
    }else void start();
  });
  const onGuestTap=(event:Event)=>{
    if(event.target instanceof Element&&event.target.closest('.v1-music-toggle,a,input,select,textarea'))return;
    if(mutedByGuest||starting)return;
    if(!audio.paused&&(!audioContext||audioContext.state==='running'))return;
    void start();
  };
  // Touch activation is granted on touchend, not on touch pointerdown.
  // Capture also covers swipes whose navigation handler prevents a click.
  root.addEventListener('touchend',onGuestTap,{capture:true,passive:true});
  root.addEventListener('click',onGuestTap,{capture:true});
  window.addEventListener('pagehide',stop);
  for(const event of ['playing','pause','volumechange','ended'])audio.addEventListener(event,update);
  update();
  return {setLanguage(next:InviteLanguage){language=next;update();}};
}
