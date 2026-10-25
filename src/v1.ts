import { gsap } from 'gsap';
import { announcementLayers, familyLayers, haldiLayers, mehendiLayers, type AnnouncementLayer } from './v1-announcement';
import './v1.css';
import { marathiCopy, marathiCeremonyLettering, type InviteLanguage } from './v1-language';
import { setupInviteMusic } from './v1-music';
import { invitationConfigs, type InvitationLocation } from './invite-config';
import { assetUrl } from './asset-url';

const root = document.getElementById('root')!;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const invitePath = (location.pathname.startsWith(basePath)
  ? location.pathname.slice(basePath.length)
  : location.pathname).replace(/\/+$/, '') || '/';
const invitation = invitationConfigs[invitePath] ?? invitationConfigs['/v1'];
// Start every fresh load at the cover so its intro sequence is visible on refresh.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo({top:0,left:0,behavior:'instant'});
root.innerHTML = `<div class="v1-invite-controls">
<button type="button" class="v1-music-toggle" aria-label="Play music" aria-pressed="false">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z"/>
    <g class="v1-music-waves"><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/></g>
    <path class="v1-music-slash" d="m16 9 5 6m0-6-5 6"/>
  </svg>
</button>
<nav class="v1-language-toggle" aria-label="Invitation language">
  <button type="button" data-language="en" lang="en" aria-pressed="true">English</button>
  <button type="button" data-language="mr" lang="mr" aria-pressed="false">मराठी</button>
</nav>
</div>
<audio class="v1-music-audio" src="${assetUrl('audio/vaaroon-forever.mp3')}" loop preload="auto"></audio>
<main class="v1-opening" aria-label="Suresh and Anushka wedding invitation">
  <section class="v1-scene v1-opening-scene" aria-label="Wedding invitation cover">
  <div class="v1-page v1-page-one" role="button" tabindex="0" aria-label="Continue to the wedding announcement after the opening">
    <img class="v1-paper" src="${assetUrl('assets/independent/opening-clean.png')}" alt="">
    <div class="v1-border" aria-hidden="true"></div>
    <img class="v1-art v1-left v1-later" src="${assetUrl('assets/independent/opening-left.png')}" alt="">
    <img class="v1-art v1-right v1-later" src="${assetUrl('assets/independent/opening-right.png')}" alt="">
    <svg class="v1-medallion" viewBox="0 0 240 190" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M120 12C91 12 72 31 72 53c0 18 12 30 15 44 3 17-7 25-7 42 0 25 17 39 40 39s40-14 40-39c0-17-10-25-7-42 3-14 15-26 15-44 0-22-19-41-48-41Z"/>
        <path d="M120 22c-21 0-35 14-35 31 0 16 15 24 17 43 2 18-8 26-8 42 0 19 10 30 26 30s26-11 26-30c0-16-10-24-8-42 2-19 17-27 17-43 0-17-14-31-35-31Z"/>
        <path d="M120 4v18M120 168v18M65 95H43m154 0h-22M82 35 68 21m90 14 14-14M83 153l-15 15m89-15 15 15"/>
        <path d="m120 4 5 8-5 8-5-8 5-8Zm0 164 5 8-5 8-5-8 5-8ZM43 95l8-5 8 5-8 5-8-5Zm138 0 8-5 8 5-8 5-8-5ZM68 21l9 2 2 9-9-2-2-9Zm93 132 9 2 2 9-9-2-2-9Zm-93 9 2-9 9-2-2 9-9 2Zm93-132 2-9 9-2-2 9-9 2Z"/>
      </g>
      <g fill="currentColor"><circle cx="120" cy="28" r="2.4"/><circle cx="120" cy="162" r="2.4"/><circle cx="76" cy="95" r="2.4"/><circle cx="164" cy="95" r="2.4"/></g>
    </svg>
    <img class="v1-art v1-ganesh" src="${assetUrl('assets/ganesh-opening.png')}" alt="Ganpati Bappa">
    <div class="v1-prayer v1-later" lang="sa" aria-label="श्री गणेश प्रार्थना">
      <span class="v1-invocation">॥ श्री गणेशाय नमः ॥</span>
      <span>वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।</span>
      <span>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</span>
    </div>
    <img class="v1-art v1-logo v1-later" src="${assetUrl('assets/monogram.png')}" alt="Suresh and Anushka wedding monogram" fetchpriority="high">
    <div class="v1-continue-hint" aria-hidden="true">
      <svg class="v1-continue-gesture" viewBox="0 0 180 112" aria-hidden="true">
        <g class="v1-gesture-arrows" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="m69 34 21-18 21 18"/>
          <path d="m79 45 11-10 11 10"/>
        </g>
        <rect x="20" y="59" width="140" height="43" rx="12" fill="none" stroke="currentColor" stroke-width="3.4"/>
        <text class="v1-swipe-up-en" x="90" y="86" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing=".4">SWIPE UP</text>
        <text class="v1-swipe-up-mr" x="90" y="86" text-anchor="middle" fill="currentColor" font-family="'Kohinoor Devanagari', 'Tiro Devanagari Hindi', sans-serif" font-size="16" font-weight="700" lang="mr">वर स्वाइप करा</text>
      </svg>
    </div>
    <div class="v1-sparkles" aria-hidden="true"></div>
  </div>
  </section>
  <section class="v1-scene v1-announcement-scene" aria-hidden="true" aria-label="Wedding announcement">
    <div class="v1-announcement-card">
      <div class="v1-announcement-art"></div>
      <div class="v1-announcement-copy"></div>
    </div>
  </section>
  <section class="v1-scene v1-family-scene" aria-hidden="true" aria-label="Family invitation">
    <div class="v1-family-card">
      <div class="v1-family-art"></div>
      <div class="v1-family-copy"></div>
      <div class="v1-family-ornament" aria-hidden="true">❦</div>
    </div>
  </section>
  ${invitation.includeMehendi ? `<section class="v1-scene v1-mehendi-scene" aria-hidden="true" aria-label="Anushka’s Mehendi invitation">
    <div class="v1-mehendi-card">
      <div class="v1-mehendi-art"></div>
      <h1 class="v1-mehendi-title"><span data-i18n="Anushka’s">Anushka’s</span><span data-i18n="Mehendi">Mehendi</span></h1>
      <div class="v1-event-details v1-mehendi-details"></div>
    </div>
  </section>
  ` : ''}${invitation.includeHaldi ? `<section class="v1-scene v1-haldi-scene v1-p5-entering" aria-hidden="true" aria-label="Haldi invitation">
    <div class="v1-haldi-card">
      <div class="v1-haldi-art"></div>
      <h1 class="v1-haldi-title" data-i18n="Haldi">Haldi</h1>
      <div class="v1-event-details v1-haldi-details"></div>
    </div>
  </section>
  ` : ''}${invitation.includeSangeet ? `<section class="v1-scene v1-sangeet-scene v1-p6-entering" aria-hidden="true" aria-label="Sangeet and Cocktails invitation">
    <div class="v1-sangeet-card">
      <div class="v1-sangeet-paper" aria-hidden="true"></div>
      <div class="v1-sangeet-shimmer" aria-hidden="true"></div>
      <div class="v1-sangeet-background-twinkles" aria-hidden="true"></div>
      <img class="v1-sangeet-canopy" src="${assetUrl('assets/sangeet/canopy-v2.png')}" alt="">
      <header class="v1-sangeet-heading"><h1><span data-i18n="Sangeet">Sangeet</span> <span class="v1-sangeet-ampersand" data-i18n="&amp;">&amp;</span> <span data-i18n="Cocktails">Cocktails</span></h1></header>
      <div class="v1-event-details v1-sangeet-details"></div>
      <div class="v1-sangeet-stage" aria-hidden="true">
        <img class="v1-sangeet-leaf v1-sangeet-leaf-left" src="${assetUrl('assets/sangeet/leaves-v2.png')}" alt="">
        <img class="v1-sangeet-leaf v1-sangeet-leaf-right" src="${assetUrl('assets/sangeet/leaves-v2.png')}" alt="">
        <img class="v1-sangeet-leaf v1-sangeet-leaf-outer" src="${assetUrl('assets/sangeet/leaves-v2.png')}" alt="">
        <div class="v1-sangeet-floor-light"></div>
        <div class="v1-sangeet-taal"><span></span><span></span></div>
        <img class="v1-sangeet-couple" src="${assetUrl('assets/sangeet/couple-v2.png')}" alt="">
        <img class="v1-sangeet-flowers v1-sangeet-flowers-left" src="${assetUrl('assets/sangeet/flowers.png')}" alt="">
        <img class="v1-sangeet-flowers v1-sangeet-flowers-right" src="${assetUrl('assets/sangeet/flowers.png')}" alt="">
      </div>
    </div>
  </section>
  ` : ''}<section class="v1-scene v1-wedding-scene v1-p7-entering" aria-hidden="true" aria-label="Wedding invitation">
    <div class="v1-wedding-card">
      <div class="v1-wedding-paper" aria-hidden="true"></div>
      <div class="v1-wedding-grain" aria-hidden="true"></div>
      <header class="v1-wedding-heading"><h1 data-i18n="Wedding">Wedding</h1></header>
      <div class="v1-event-details v1-wedding-details"></div>
      <div class="v1-wedding-art"></div>
    </div>
  </section>
</main>`;
const inviteMusic=setupInviteMusic(root);
const familyPage = root.querySelector<HTMLElement>('.v1-family-scene')!;
const familyArt = root.querySelector<HTMLElement>('.v1-family-art')!;
const familyCopy = root.querySelector<HTMLElement>('.v1-family-copy')!;
// Every visit opens in English; guests can switch languages for the current visit.
let inviteLanguage:InviteLanguage='en';
function translated(english:string){
  return inviteLanguage==='mr'?(marathiCopy[english]??english):english;
}
function renderTranslation(element:HTMLElement,english:string){
  if(inviteLanguage==='mr'&&element.dataset.familyName==='true'){
    const label=document.createElement('span');
    label.className='v1-p3-family-name';
    const prefix=document.createElement('span');
    prefix.className='v1-p3-name-prefix';
    prefix.textContent=english==='Anushka'?'चि. सौ. कां.':'चि.';
    const name=document.createElement('span');
    name.className='v1-p3-name';
    name.textContent=marathiCopy[english]??english;
    label.append(prefix,document.createTextNode(' '),name);
    element.replaceChildren(label);
    return;
  }
  element.textContent=translated(english);
}
function bindTranslation(element:HTMLElement,english:string,familyName=false){
  element.dataset.i18n=english;
  if(familyName)element.dataset.familyName='true';
  renderTranslation(element,english);
}
function applyInviteLanguage(){
  root.querySelector<HTMLElement>('.v1-opening')!.lang=inviteLanguage;
  familyCopy.lang=inviteLanguage;
  const announcement=root.querySelector<HTMLElement>('.v1-announcement-copy');
  if(announcement)announcement.lang=inviteLanguage;
  for(const element of root.querySelectorAll<HTMLElement>('[data-i18n]')){
    const english=element.dataset.i18n!;
    renderTranslation(element,english);
    const lettering=inviteLanguage==='mr'?marathiCeremonyLettering[english]:undefined;
    if(lettering){
      const readable=document.createElement('span');
      readable.className='v1-ceremony-readable';
      readable.textContent=translated(english);
      element.replaceChildren(readable);
      for(const text of lettering){
        const line=document.createElement('span');
        line.className='v1-ceremony-lettering';
        line.setAttribute('aria-hidden','true');
        line.textContent=text;
        element.append(line);
      }
    }
  }
  for(const element of root.querySelectorAll<HTMLElement>('[aria-label]')){
    const english=element.dataset.englishLabel??element.getAttribute('aria-label')!;
    element.dataset.englishLabel=english;
    element.setAttribute('aria-label',translated(english));
  }
  for(const image of root.querySelectorAll<HTMLImageElement>('img[alt]:not([alt=""])')){
    image.dataset.englishAlt??=image.alt;
    image.alt=translated(image.dataset.englishAlt);
  }
  for(const schedule of root.querySelectorAll<HTMLElement>('.v1-event-schedule')){
    schedule.setAttribute('aria-label',Array.from(schedule.querySelectorAll<HTMLElement>('[data-i18n]')).map(e=>e.textContent).join(' '));
  }
  for(const map of root.querySelectorAll<HTMLAnchorElement>('.v1-event-map[data-venue]')){
    map.setAttribute('aria-label',inviteLanguage==='mr'?`${translated(map.dataset.venue!)} हे स्थळ नकाशावर पाहा`:`Open ${map.dataset.venue} in Google Maps`);
  }
  root.querySelectorAll<HTMLButtonElement>('.v1-language-toggle button').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.language===inviteLanguage));
  });
  inviteMusic.setLanguage(inviteLanguage);
}
root.querySelectorAll<HTMLButtonElement>('.v1-language-toggle button').forEach(button=>{
  button.addEventListener('click',()=>{
    inviteLanguage=button.dataset.language as InviteLanguage;
    applyInviteLanguage();
  });
});
applyInviteLanguage();
const pageFour = root.querySelector<HTMLElement>('.v1-mehendi-scene');
const pageFive = root.querySelector<HTMLElement>('.v1-haldi-scene');
const pageSix = root.querySelector<HTMLElement>('.v1-sangeet-scene');
const pageSeven = root.querySelector<HTMLElement>('.v1-wedding-scene')!;
const page = root.querySelector<HTMLElement>('.v1-page-one')!;
const opening = root.querySelector<HTMLElement>('.v1-opening')!;
const nextPage = root.querySelector<HTMLElement>('.v1-announcement-scene')!;
const announcementArt = root.querySelector<HTMLElement>('.v1-announcement-art')!;
const announcementCopy = root.querySelector<HTMLElement>('.v1-announcement-copy')!;
const ganesh = root.querySelector<HTMLElement>('.v1-ganesh')!;
const medallion = root.querySelector<SVGElement>('.v1-medallion')!;
const prayer = root.querySelector<HTMLElement>('.v1-prayer')!;
const later = root.querySelectorAll<HTMLElement>('.v1-later:not(.v1-prayer)');
const floral = root.querySelectorAll<HTMLElement>('.v1-left,.v1-right');
const logo = root.querySelector<HTMLElement>('.v1-logo')!;
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)');
const scenes = Array.from(root.querySelectorAll<HTMLElement>('.v1-scene'));
scenes.forEach((scene,index)=>scene.classList.toggle('v1-scene-visible',index===0));
let activeSceneIndex = 0;
let tapLocked = false;
let timeline: gsap.core.Timeline | undefined;
let introFinished = false;
let advancing = false;
let ignoreClickUntil = 0;
let touchStartX = 0;
let touchStartY = 0;
let trackingTouch = false;
let wheelGestureLocked = false;
let wheelUnlockTimer = 0;

const pageTwoReady = (async () => {
  const pages = await fetch(assetUrl('canva-pages.json')).then(response => response.json());
  const pageData = pages.find((entry: {number:number}) => entry.number === 2);
  const layers = announcementLayers(pageData);
  // Stagger the edge florals so they settle down the sides without crossing the text area.
  const fallingFlowerOrder = [1,4,2,5,9,6,11,13,12,14,15,17,22,18,23,21,24,26,28,29];
  for (const layer of layers) {
    const image = document.createElement('img');
    image.className = `v1-p2-art${layer.label === 'peach-paper-background' ? ' v1-p2-paper' : ''}`;
    if (layer.label === 'announcement-left-leaves' || layer.label === 'announcement-right-leaf') {
      image.classList.add('v1-p2-breeze', layer.label === 'announcement-left-leaves' ? 'v1-p2-breeze-left' : 'v1-p2-breeze-right');
    }
    if (layer.label === 'announcement-lamp') image.classList.add('v1-p2-lamp-glow');
    const flowerIndex = Number(layer.label.replace('loose-flower-',''));
    const flowerOrder = fallingFlowerOrder.indexOf(flowerIndex);
    if (flowerOrder >= 0) {
      image.classList.add('v1-p2-flower-fall');
      image.style.setProperty('--fall-delay', `${(flowerOrder * .11).toFixed(2)}s`);
      image.style.setProperty('--fall-duration', `${(1.35 + flowerOrder % 4 * .12).toFixed(2)}s`);
      image.style.setProperty('--fall-distance', `${6 + flowerOrder % 3 * 2}cqw`);
      image.style.setProperty('--fall-drift', `${flowerOrder % 2 ? '-2.4' : '2.4'}cqw`);
      image.style.setProperty('--fall-tilt', `${flowerOrder % 2 ? 11 : -9}deg`);
    }
    if (layer.src) image.src = assetUrl(layer.src);
    image.alt = '';
    image.dataset.layer = layer.label;
    image.style.left = `${layer.box.position.left / 1080 * 100}%`;
    image.style.top = `${layer.box.position.top / 1920 * 100}%`;
    image.style.width = `${layer.box.dimension.width / 1080 * 100}%`;
    image.style.height = `${layer.box.dimension.height / 1920 * 100}%`;
    if (layer.clip) image.style.clipPath = layer.clip;
    announcementArt.append(image);
    if (layer.label === 'announcement-lamp') {
      const flames = document.createElementNS('http://www.w3.org/2000/svg','svg');
      flames.setAttribute('viewBox','0 0 939 1676');
      flames.setAttribute('preserveAspectRatio','none');
      flames.setAttribute('aria-hidden','true');
      flames.classList.add('v1-p2-art','v1-p2-flames');
      flames.style.left = image.style.left;
      flames.style.top = image.style.top;
      flames.style.width = image.style.width;
      flames.style.height = image.style.height;
      flames.innerHTML = `<defs>
        <linearGradient id="p2-flame-outer" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#ff9b28"/><stop offset=".62" stop-color="#ffc951"/><stop offset="1" stop-color="#fff0ae"/></linearGradient>
        <linearGradient id="p2-flame-core" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#fff0a3"/><stop offset="1" stop-color="#fffdf0"/></linearGradient>
      </defs>
      <g class="v1-p2-flame v1-p2-flame-left"><path class="v1-p2-flame-glow" d="M22 540C9 534 8 522 15 510c5-8 9-14 7-25 13 12 19 25 13 40-3 8-7 13-13 15Z" fill="url(#p2-flame-outer)"/><path d="M22 535c-5-6-4-12 0-19 4 6 7 12 3 18-1 1-2 1-3 1Z" fill="url(#p2-flame-core)"/></g>
      <g class="v1-p2-flame v1-p2-flame-right"><path class="v1-p2-flame-glow" d="M145 548c-13-6-14-18-7-31 5-9 10-17 8-29 15 14 21 29 14 45-3 8-8 13-15 15Z" fill="url(#p2-flame-outer)"/><path d="M145 543c-6-7-4-15 1-23 5 8 8 14 3 22-1 1-2 1-4 1Z" fill="url(#p2-flame-core)"/></g>`;
      announcementArt.append(flames);
    }
  }
  await Promise.all(Array.from(announcementArt.querySelectorAll('img')).map(image => image.complete
    ? Promise.resolve()
    : new Promise<void>(resolve => {
      image.addEventListener('load', () => resolve(), {once:true});
      image.addEventListener('error', () => resolve(), {once:true});
    })));

  const layout:Record<string,{top:number;left?:number;width?:number;height?:number}> = {
    'TOGETHER':{top:1172}, 'A BEAUTIFUL BEGINNING':{top:1224},
    'Suresh':{top:1315}, 'and':{top:1450}, 'Anushka':{top:1540},
    'ARE GETTING MARRIED':{top:1732},
  };
  for (const item of pageData.text as Array<{text:string;box:{position:{left:number;top:number};dimension:{width:number;height:number}}}>) {
    const displayText=invitation.announcementCopy?.[item.text]??item.text;
    const element = document.createElement(displayText === 'Suresh' || displayText === 'Anushka' ? 'h1' : 'p');
    const isHeading = /^(TOGETHER|A BEAUTIFUL|ARE GETTING)/.test(item.text);
    const isScript = ['Suresh','and','Anushka'].includes(item.text);
    element.className = `v1-p2-text${isHeading ? ' v1-p2-heading' : ''}${isScript ? ' v1-p2-script' : ''}`;
    bindTranslation(element,displayText);
    element.dataset.layer = item.text;
    const position = layout[item.text] ?? {top:item.box.position.top};
    element.style.left = `${(position.left ?? item.box.position.left) / 1080 * 100}%`;
    element.style.top = `${position.top / 1920 * 100}%`;
    element.style.width = `${(position.width ?? item.box.dimension.width) / 1080 * 100}%`;
    element.style.height = `${(position.height ?? item.box.dimension.height) / 1920 * 100}%`;
    if (isHeading) element.style.fontSize = '2.8cqw';
    else if (displayText === 'Suresh') element.style.fontSize = '8.9cqw';
    else if (item.text === 'and') element.style.fontSize = '5cqw';
    else if (displayText === 'Anushka') element.style.fontSize = '9.63cqw';
    announcementCopy.append(element);
  }
  applyInviteLanguage();
  return Array.from(announcementCopy.children) as HTMLElement[];
})();

type CanvaPageData = {
  number:number;
  art:Array<{id:string;asset:string;label:string;src:string;box:AnnouncementLayer['box'];clip?:string;kind?:string}>;
  text:Array<{text:string;box:AnnouncementLayer['box']}>;
};
type EventDetailsOptions = InvitationLocation & {
  top:string;weekday:string;month:string;day:string;year:string;time:string;
  reception?:string;peach?:boolean;haldi?:boolean;
};
// Shared cadence for sequential text groups throughout the invitation.
const textRevealTiming={step:.95,duration:.95,closingFade:.35};
function revealEventText(timeline:gsap.core.Timeline,title:HTMLElement,schedule:HTMLElement,venue:HTMLElement,titleAt:number){
  const reduced=prefersReduced.matches;
  const groupStep=reduced?.1:textRevealTiming.step;
  const titleDuration=reduced?.2:textRevealTiming.duration;
  const scheduleDuration=reduced?.2:textRevealTiming.duration;
  const venueFadeDuration=reduced?.2:textRevealTiming.closingFade;
  const venueMoveDuration=reduced?.2:textRevealTiming.duration;
  timeline.to(title,{opacity:1,y:0,duration:titleDuration,ease:'sine.out'},titleAt)
    .to(schedule,{opacity:1,y:0,duration:scheduleDuration,ease:'sine.out'},titleAt+groupStep)
    .to(venue,{opacity:1,duration:venueFadeDuration,ease:'sine.out'},titleAt+groupStep*2)
    .to(venue,{y:0,duration:venueMoveDuration,ease:'sine.out'},titleAt+groupStep*2);
}
const eventPages=fetch(assetUrl('canva-pages.json')).then(response=>response.json() as Promise<CanvaPageData[]>);
const waitForImages=(images:Iterable<HTMLImageElement>)=>Promise.all(Array.from(images).map(image=>image.complete
  ? Promise.resolve()
  : new Promise<void>(resolve=>{
    image.addEventListener('load',()=>resolve(),{once:true});
    image.addEventListener('error',()=>resolve(),{once:true});
  })));

function appendArtwork(container:HTMLElement,layers:AnnouncementLayer[],className:string) {
  for(const layer of layers){
    const image=document.createElement('img');
    image.className=className;
    if(className==='v1-p2-art'&&layer.label==='peach-paper-background')image.classList.add('v1-p2-paper');
    if(className==='v1-p3-art'&&layer.label==='peach-paper-background')image.classList.add('v1-p3-paper');
    if(className==='v1-p2-art'&&['announcement-left-leaves','announcement-right-leaf'].includes(layer.label))
      image.classList.add('v1-p2-breeze',layer.label==='announcement-left-leaves'?'v1-p2-breeze-left':'v1-p2-breeze-right');
    if(className==='v1-p4-art'&&layer.label==='top-left-foliage')image.classList.add('v1-p4-breeze','v1-p4-breeze-left');
    if(className==='v1-p4-art'&&layer.label==='top-right-foliage')image.classList.add('v1-p4-breeze','v1-p4-breeze-right');
    if(className==='v1-p5-art'&&layer.label==='top-left-garland')image.classList.add('v1-p5-sway','v1-p5-sway-left');
    if(className==='v1-p5-art'&&layer.label==='top-right-garland')image.classList.add('v1-p5-sway','v1-p5-sway-right');
    if(className==='v1-p5-art'&&layer.label==='right-tree-foliage')image.classList.add('v1-p5-breeze','v1-p5-breeze-tree');
    if(className==='v1-p5-art'&&layer.label==='left-jasmine-plant')image.classList.add('v1-p5-breeze','v1-p5-breeze-left-plant');
    if(className==='v1-p5-art'&&layer.label==='left-yellow-drape')image.classList.add('v1-p5-sway','v1-p5-sway-left-drape');
    if(className==='v1-p5-art'&&layer.label==='right-yellow-drape')image.classList.add('v1-p5-sway','v1-p5-sway-right-drape');
    if(className==='v1-p5-art'&&layer.label==='brass-lantern')image.classList.add('v1-p5-lantern-glow');
    if(className==='v1-p5-art'&&layer.label==='left-vase-floral-arrangement')image.classList.add('v1-p5-breeze','v1-p5-breeze-left-flowers');
    if(className==='v1-p5-art'&&layer.label==='right-vase-floral-arrangement')image.classList.add('v1-p5-breeze','v1-p5-breeze-right-flowers');
    image.src=layer.src?assetUrl(layer.src):'';
    image.alt='';
    image.dataset.layer=layer.label;
    const garlandDrop=className==='v1-p5-art'&&['top-left-garland','top-right-garland'].includes(layer.label);
    if(garlandDrop){
      const wrapper=document.createElement('div');
      wrapper.className='v1-p5-garland-drop';
      wrapper.dataset.layer=layer.label;
      wrapper.style.left=`${layer.box.position.left/1080*100}%`;
      wrapper.style.top=`${layer.box.position.top/1920*100}%`;
      wrapper.style.width=`${layer.box.dimension.width/1080*100}%`;
      wrapper.style.height=`${layer.box.dimension.height/1920*100}%`;
      image.style.left='0';image.style.top='0';image.style.width='100%';image.style.height='100%';
      if(layer.clip)image.style.clipPath=layer.clip;
      wrapper.append(image);
      container.append(wrapper);
      continue;
    }
    image.style.left=`${layer.box.position.left/1080*100}%`;
    image.style.top=`${layer.box.position.top/1920*100}%`;
    image.style.width=`${layer.box.dimension.width/1080*100}%`;
    image.style.height=`${layer.box.dimension.height/1920*100}%`;
    if(className!=='v1-p3-art')image.style.zIndex='1';
    if(layer.clip)image.style.clipPath=layer.clip;
    container.append(image);
  }
}

function addMehendiHennaDrawing(container:HTMLElement){
  const ns='http://www.w3.org/2000/svg';
  const paths=[
    'M18 510 C82 454 35 412 70 363 C105 315 46 275 82 225 C116 178 60 133 91 87 C105 66 108 38 98 12',
    'M48 439 C22 435 9 416 8 394 C30 397 47 412 48 439 Z',
    'M47 439 C68 433 80 416 79 396 C60 402 47 417 47 439 Z',
    'M69 364 C45 360 34 343 35 324 C55 329 70 343 69 364 Z',
    'M69 364 C92 357 101 339 97 321 C78 329 68 345 69 364 Z',
    'M68 281 C44 276 35 259 38 241 C57 248 69 261 68 281 Z',
    'M68 281 C90 273 99 255 94 238 C76 246 67 263 68 281 Z',
    'M82 204 C60 198 53 181 58 164 C75 172 85 187 82 204 Z',
    'M82 204 C103 194 109 176 101 160 C85 170 79 187 82 204 Z',
    'M84 123 C67 115 64 99 70 85 C84 94 90 108 84 123 Z',
    'M84 123 C101 111 104 95 95 82 C83 93 80 108 84 123 Z',
    'M49 438 C42 424 31 411 17 401',
    'M49 438 C58 423 68 412 77 402',
    'M69 363 C61 348 51 336 41 329',
    'M69 363 C79 347 89 336 96 327',
    'M68 280 C59 266 49 254 43 246',
    'M68 280 C78 265 88 253 93 244',
    'M82 203 C76 189 68 178 62 169',
    'M82 203 C92 188 99 176 101 167',
    'M84 122 C79 110 74 99 72 91',
    'M84 122 C91 108 97 98 97 89',
    'M23 478 C4 465 5 447 19 438 C35 447 37 464 23 478 Z',
    'M23 478 C37 464 52 466 59 481 C49 494 34 494 23 478 Z',
    'M23 478 C8 482 3 496 12 507 C26 504 32 492 23 478 Z',
    'M23 478 C23 462 33 453 47 457 C50 471 40 481 23 478 Z',
    'M23 478 C29 489 39 498 51 499',
    'M23 478 C19 488 16 496 14 503',
    'M23 478 C31 470 38 464 45 461',
  ];
  for(const side of ['left','right'] as const){
    const svg=document.createElementNS(ns,'svg');
    svg.classList.add('v1-mehendi-henna',`v1-mehendi-henna-${side}`);
    svg.setAttribute('viewBox','0 0 120 520');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    for(const d of paths){
      const path=document.createElementNS(ns,'path');
      path.setAttribute('d',d);
      path.setAttribute('pathLength','1');
      svg.append(path);
    }
    container.append(svg);
  }
}

function addHaldiFallingPetals(container:HTMLElement){
  const overlay=document.createElement('div');
  overlay.className='v1-p5-petals';
  overlay.setAttribute('aria-hidden','true');
  const petals=[
    {left:9,delay:'.2s',duration:'17s',drift:'12cqw',midTurn:'135deg',turn:'280deg'},
    {left:22,delay:'3.8s',duration:'19s',drift:'-10cqw',midTurn:'-120deg',turn:'-250deg'},
    {left:78,delay:'6.1s',duration:'16s',drift:'-13cqw',midTurn:'130deg',turn:'275deg'},
    {left:91,delay:'9.3s',duration:'18s',drift:'9cqw',midTurn:'-140deg',turn:'-285deg'},
    {left:53,delay:'12.5s',duration:'20s',drift:'11cqw',midTurn:'145deg',turn:'300deg'},
  ];
  for(const [index,petal] of petals.entries()){
    const element=document.createElement('span');
    element.className='v1-p5-petal';
    element.dataset.petal=String(index+1);
    element.style.left=`${petal.left}%`;
    element.style.setProperty('--fall-delay',petal.delay);
    element.style.setProperty('--fall-duration',petal.duration);
    element.style.setProperty('--fall-drift',petal.drift);
    element.style.setProperty('--fall-mid-turn',petal.midTurn);
    element.style.setProperty('--fall-turn',petal.turn);
    overlay.append(element);
  }
  container.append(overlay);
}

function addWeddingFallingPetals(container:HTMLElement){
  const overlay=document.createElement('div');
  overlay.className='v1-wedding-petals';
  overlay.setAttribute('aria-hidden','true');
  const petals=[
    {left:7,delay:'.35s',duration:'12.8s',drift:'8cqw',turn:'235deg',size:'.9'},
    {left:19,delay:'3.4s',duration:'14.1s',drift:'-10cqw',turn:'-250deg',size:'1'},
    {left:82,delay:'5.7s',duration:'13.3s',drift:'-8cqw',turn:'250deg',size:'.82'},
    {left:93,delay:'8.1s',duration:'15.2s',drift:'10cqw',turn:'-230deg',size:'1.08'},
    {left:12,delay:'10.4s',duration:'13.7s',drift:'13cqw',turn:'265deg',size:'.78'},
    {left:87,delay:'12.9s',duration:'14.6s',drift:'-12cqw',turn:'-255deg',size:'.92'},
  ];
  for(const [index,petal] of petals.entries()){
    const element=document.createElement('span');
    element.className='v1-wedding-petal';
    element.dataset.petal=String(index+1);
    element.style.left=`${petal.left}%`;
    element.style.setProperty('--fall-delay',petal.delay);
    element.style.setProperty('--fall-duration',petal.duration);
    element.style.setProperty('--fall-drift',petal.drift);
    element.style.setProperty('--fall-turn',petal.turn);
    element.style.setProperty('--petal-size',petal.size);
    overlay.append(element);
  }
  container.append(overlay);
}

function addEventDetails(container:HTMLElement,options:EventDetailsOptions) {
  container.style.setProperty('--event-top',options.top);
  if(options.peach)container.classList.add('v1-event-details-peach');
  if(options.haldi)container.classList.add('v1-event-details-haldi');
  const schedule=document.createElement('section');
  schedule.className='v1-event-schedule';
  schedule.setAttribute('aria-label',`${options.weekday}, ${options.month} ${options.day}, ${options.year}, ${options.time}`);
  const weekday=document.createElement('p');weekday.className='v1-event-weekday';bindTranslation(weekday,options.weekday);
  const date=document.createElement('p');date.className='v1-event-date';
  const month=document.createElement('span');month.className='v1-event-month';bindTranslation(month,options.month);
  const day=document.createElement('b');day.className='v1-event-day';bindTranslation(day,options.day);
  const year=document.createElement('span');year.className='v1-event-year';bindTranslation(year,options.year);
  date.append(month,day,year);
  const time=document.createElement('p');time.className='v1-event-time';
  if(options.time==='MUHURTA – 11:34 AM'){
    const label=document.createElement('span');label.className='v1-wedding-muhurta';bindTranslation(label,'MUHURTA');
    const separator=document.createTextNode(' – ');
    const value=document.createElement('span');bindTranslation(value,'11:34 AM');
    time.append(label,separator,value);
  }else bindTranslation(time,options.time);
  schedule.append(weekday,date,time);
  if(options.reception){const reception=document.createElement('p');reception.className='v1-event-reception';bindTranslation(reception,options.reception);schedule.append(reception);}
  const venue=document.createElement('section');venue.className='v1-event-venue';venue.setAttribute('aria-label',options.locationLabel??'Venue');
  const label=document.createElement('h2');label.className='v1-event-venue-label';bindTranslation(label,options.locationLabel??'VENUE');
  const divider=document.createElement('div');divider.className='v1-event-divider';divider.setAttribute('aria-hidden','true');
  divider.innerHTML='<span></span><i>✧</i><span></span>';
  venue.append(label,divider);
  if(options.venue){
    const venueName=document.createElement('p');venueName.className='v1-event-venue-name';bindTranslation(venueName,options.venue);
    venue.append(venueName);
  }
  const address=document.createElement('address');address.className='v1-event-address';
  options.address.forEach((line,index)=>{if(index)address.append(document.createElement('br'));const part=document.createElement('span');bindTranslation(part,line);address.append(part);});
  venue.append(address);
  if(options.mapUrl){
    const map=document.createElement('a');map.className='v1-event-map';map.href=options.mapUrl;map.target='_blank';map.rel='noopener noreferrer';
    map.dataset.venue=options.venue;
    map.setAttribute('aria-label',`Open ${options.venue||'event venue'} in Google Maps`);
    map.innerHTML='<svg viewBox="0 0 40 52" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 49C16 43 4 29 4 19a16 16 0 0 1 32 0c0 10-12 24-16 30Z"/><circle cx="20" cy="19" r="6"/></svg>';
    venue.append(map);
  }
  container.append(schedule,venue);
  applyInviteLanguage();
}

const pageThreeReady=(async()=>{
  const pages=await eventPages;const data=pages.find(entry=>entry.number===3)!;
  appendArtwork(familyArt,familyLayers(data),'v1-p3-art');
  const layout:Record<string,{top:number;left?:number;width?:number;height?:number}>={
    'OUR BELOVED PARENTS':{top:274},
    'Mrs. Shweta & Mr. Abhay Subhedar':{top:373,height:58},
    'cordially invite you\nto celebrate the wedding of their daughter':{top:478},
    'Anushka':{top:656},'with':{top:818,height:60},'Suresh':{top:904,height:120},
    'son of':{top:1050,height:60},'Mrs. Sailee & Mr. Chandrakant Bhandari':{top:1138,height:58},
    'WITH YOUR BLESSINGS, WE BEGIN':{top:1290},
  };
  for(const item of data.text){
    const text=item.text;
    const isScript=['Anushka','with','Suresh','son of'].includes(text)||text.startsWith('cordially');
    const isHeading=/^(WITH |OUR )/.test(text);
    const isParents=text.startsWith('Mrs.');
    const element=document.createElement(['Anushka','Suresh'].includes(text)?'h1':'p');
    element.className=`v1-p3-text${isScript?' v1-p3-script':''}${text.startsWith('cordially')?' v1-p3-cordially':''}${isHeading?' v1-p3-heading':''}${isParents?' v1-p3-parents':''}`;
    // Keep the original layout and animation slots while changing displayed copy.
    const displayText=invitation.familyCopy[text]??text;
    bindTranslation(element,displayText,displayText==='Anushka'||displayText==='Suresh');element.dataset.layer=text;
    const position=layout[text]??{top:item.box.position.top};
    element.style.left=`${(position.left??item.box.position.left)/10.8}%`;
    element.style.top=`${position.top/19.2}%`;
    element.style.width=`${(position.width??item.box.dimension.width)/10.8}%`;
    element.style.height=`${(position.height??item.box.dimension.height)/19.2}%`;
    if(isHeading)element.style.fontSize='2.78cqw';
    else if(isParents)element.style.fontSize='4.45cqw';
    else if(text.startsWith('cordially'))element.style.fontSize='5cqw';
    else if(text==='Anushka'||text==='Suresh')element.style.fontSize='9.26cqw';
    else if(text==='with')element.style.fontSize='5cqw';
    else if(text==='son of')element.style.fontSize='4.54cqw';
    else element.style.fontSize=`${item.box.dimension.height/1.2/10.8}cqw`;
    familyCopy.append(element);
  }
  applyInviteLanguage();
  await waitForImages(familyArt.querySelectorAll('img'));
})();

const pageFourReady=(async()=>{
  if(!pageFour)return;
  const pages=await eventPages;const data=pages.find(entry=>entry.number===4)!;
  const art=pageFour.querySelector<HTMLElement>('.v1-mehendi-art')!;
  appendArtwork(art,mehendiLayers(data).filter(layer=>!['gold-divider','map-pin'].includes(layer.label)),'v1-p4-art');
  addMehendiHennaDrawing(art);
  addEventDetails(pageFour.querySelector<HTMLElement>('.v1-mehendi-details')!,{
    top:'33.7%',weekday:'THURSDAY',month:'DEC',day:'17',year:'2026',time:'12:00 PM ONWARDS',
    venue:'401 Ram Chs',address:['Maruti Nagar, Ashokvan','Dahisar East, Mumbai - 400068'],mapUrl:'https://maps.app.goo.gl/KEqnMNEmWQvNAJam9?g_st=iw',
  });
})();

const pageFiveReady=(async()=>{
  if(!pageFive)return;
  const pages=await eventPages;const data=pages.find(entry=>entry.number===5)!;
  const omitted=new Set(['MAHXVHwifJk','MAHXVINLTt4','MAHXVGhELHY','MAHXVI9F-ns']);
  const haldiArt=pageFive.querySelector<HTMLElement>('.v1-haldi-art')!;
  appendArtwork(haldiArt,haldiLayers(data).filter(layer=>!omitted.has(layer.asset??'')),'v1-p5-art');
  addHaldiFallingPetals(haldiArt);
  const details=pageFive.querySelector<HTMLElement>('.v1-haldi-details')!;
  addEventDetails(details,{
    top:'27%',weekday:'THURSDAY',month:'DEC',day:'17',year:'2026',time:'12:00 PM',venue:'Gokulanand Hotel',
    address:['Shankheshwar Nagar, Borivali','Mumbai - 400068'],mapUrl:'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiIi-mV_sKXAxUAAAAAHQAAAAAQBg..i&rlz=1C5OZZY_enAU1196AU1196&sca_esv=3f5bbf6b2af2913f&udm&fvr=1&pvq=CgwvZy8xamt5bTJjMTciFgoQZ29rdWxhbmFuZCBob3RlbBACGAM&lqi=ChBnb2t1bGFuYW5kIGhvdGVsSKfYxNnHkICACFoaEAAQARgAGAEiEGdva3VsYW5hbmQgaG90ZWySAQhidXNfc3RvcA&cs=0&um=1&ie=UTF-8&fb=1&gl=au&sa=X&ftid=0x3be7b0c2bd265787:0x5cbfe49639cad99c',peach:true,haldi:true,
    ...invitation.haldiLocation,
  });
})();

const pageSixReady=Promise.resolve().then(()=>{
  if(!pageSix)return;
  addEventDetails(pageSix.querySelector<HTMLElement>('.v1-sangeet-details')!,{
  top:'33%',weekday:'FRIDAY',month:'DEC',day:'18',year:'2026',time:'6:00 PM ONWARDS',venue:'Mumbai Metro Hotel',
  address:['Neelkanth Udyog Bhavan','Saki Vihar Road, Andheri East','Mumbai 400072'],mapUrl:'https://maps.app.goo.gl/wqjEXMRMQHr9sMa47',
  });
});

function addSangeetBackgroundTwinkles(){
  if(!pageSix)return;
  const layer=pageSix.querySelector<HTMLElement>('.v1-sangeet-background-twinkles')!;
  const points=[
    [5,25],[95,27],[8,33],[92,35],[4,42],[96,44],[9,50],[91,52],[5,60],[94,62],
    [8,68],[92,70],[5,78],[95,80],[18,29],[82,32],[17,43],[83,56],[14,75],[86,80],
  ];
  points.forEach(([left,top],index)=>{
    const twinkle=document.createElement('span');
    twinkle.className='v1-sangeet-bg-twinkle';
    twinkle.style.left=`${left}%`;
    twinkle.style.top=`${top}%`;
    twinkle.style.setProperty('--twinkle-size',`${3+index%3}px`);
    twinkle.style.setProperty('--twinkle-duration',`${2.4+(index%4)*.45}s`);
    twinkle.style.setProperty('--twinkle-delay',`${(index%7)*.24}s`);
    layer.append(twinkle);
  });
}
addSangeetBackgroundTwinkles();

let sangeetRevealStarted=false;
function revealSangeetPage(){
  if(!pageSix||sangeetRevealStarted)return;
  sangeetRevealStarted=true;
  pageSix.classList.add('v1-p6-entering');
  void pageSixReady.then(()=>{
    const canopy=pageSix.querySelector<HTMLElement>('.v1-sangeet-canopy')!;
    const stage=pageSix.querySelector<HTMLElement>('.v1-sangeet-stage')!;
    const title=pageSix.querySelector<HTMLElement>('.v1-sangeet-heading h1')!;
    const schedule=pageSix.querySelector<HTMLElement>('.v1-sangeet-details .v1-event-schedule')!;
    const venue=pageSix.querySelector<HTMLElement>('.v1-sangeet-details .v1-event-venue')!;
    const targets=[canopy,stage,title,schedule,venue];
    if(prefersReduced.matches){
      pageSix.classList.remove('v1-p6-entering');
      pageSix.classList.add('v1-p6-revealed');
      gsap.set(targets,{opacity:1,y:0});
      return;
    }
    gsap.set([canopy,stage],{opacity:0});
    gsap.set([stage,title,schedule,venue],{y:13});
    const reveal=gsap.timeline({onComplete:()=>{
      gsap.set(targets,{clearProps:'opacity,transform'});
      pageSix.classList.remove('v1-p6-entering');
      pageSix.classList.add('v1-p6-revealed');
    }})
      .to(canopy,{opacity:1,duration:.82,ease:'sine.out'},.35)
      .to(stage,{opacity:1,y:0,duration:.82,ease:'sine.out'},.35);
    revealEventText(reveal,title,schedule,venue,1.65);
  });
}

const pageSevenReady=(async()=>{
  type Geometry={size:number[];whole:number[];left:number[];right:number[]};
  const geometry=await fetch(assetUrl('independent-geometry.json')).then(response=>response.json() as Promise<Record<string,Geometry>>);
  const art=pageSeven.querySelector<HTMLElement>('.v1-wedding-art')!;
  const targets:Record<string,{whole?:number[];left?:number[];right?:number[]}>= {
    steps:{whole:[7,970,1341,1155]},canopy:{whole:[175,10,1240,420]},couple:{whole:[514,518,824,1063]},
    garlands:{whole:[350,195,1050,520]},bananas:{left:[10,342,462,920],right:[849,342,1310,920]},
    reeds:{left:[0,486,122,1120],right:[1220,486,1346,1120]},pampas:{left:[445,778,606,969],right:[740,778,903,969]},
    ferns:{left:[110,754,270,1040],right:[1080,754,1242,1040]},topiaries:{left:[207,731,423,977],right:[906,735,1114,983]},
    lamps:{left:[406,766,470,982],right:[850,766,914,982]},'pink-vases':{left:[101,892,209,1110],right:[1120,892,1228,1110]},
    daisies:{left:[218,947,353,1110],right:[991,944,1126,1110]},'corner-plants':{left:[0,960,105,1160],right:[1211,960,1346,1160]},
    trays:{left:[349,1019,459,1066],right:[870,1025,978,1069]},pots:{left:[336,1082,399,1135],right:[924,1088,989,1140]},
  };
  const singles=new Set(['steps','canopy','couple']);
  const sources=['steps','canopy','garlands','bananas','reeds','pampas','ferns','topiaries','lamps','couple','pink-vases','daisies','corner-plants','trays','pots'];
  for(const name of sources){
    const key=`wedding-${name}`;const geo=geometry[key];
    if(!geo)continue;
    if(name==='garlands'){
      const bounds=geo.whole;const target=targets[name].whole!;
      const sx=(target[2]-target[0])/(bounds[2]-bounds[0]);const sy=(target[3]-target[1])/(bounds[3]-bounds[1]);
      const strands:Array<[number,number,number]>=[
        [242,307,285],[307,415,330],[415,572,500],[572,695,645],[695,832,745],
        [832,968,920],[968,1050,1015],[1050,1122,1085],[1122,1202,1160],
      ];
      strands.forEach(([left,right,anchor],index)=>{
        const image=document.createElement('img');image.src=assetUrl(`assets/independent/${key}.png`);image.alt='';
        image.className='v1-wedding-garland-strand';image.dataset.layer=`${key}-strand-${index+1}`;
        image.style.clipPath=`inset(0 ${(geo.size[0]-right)/geo.size[0]*100}% 0 ${left/geo.size[0]*100}%)`;
        image.style.transformOrigin=`${anchor/geo.size[0]*100}% ${208/geo.size[1]*100}%`;
        image.style.setProperty('--strand-delay',`${-index*.28}s`);
        image.style.setProperty('--strand-duration',`${3.2+(index%3)*.25}s`);
        const direction=index%2===0?1:-1;
        image.style.setProperty('--strand-angle',`${direction*2.6}deg`);
        image.style.setProperty('--strand-reverse',`${direction*-1.9}deg`);
        image.style.setProperty('--strand-angle-mid',`${direction*1.45}deg`);
        image.style.setProperty('--strand-reverse-mid',`${direction*-.95}deg`);
        Object.assign(image.style,{left:`${(target[0]-bounds[0]*sx)/1346*100}%`,top:`${(target[1]-bounds[1]*sy)/1168*100}%`,width:`${sx*100}%`,height:`${sy*100}%`});
        art.append(image);
      });
      continue;
    }
    const sides=singles.has(name)?['whole' as const]:['left' as const,'right' as const];
    for(const side of sides){
      const target=targets[name][side];
      if(!geo||!target)continue;
      const bounds=geo[side];const sx=(target[2]-target[0])/(bounds[2]-bounds[0]);const sy=(target[3]-target[1])/(bounds[3]-bounds[1]);
      const image=document.createElement('img');image.src=assetUrl(`assets/independent/${key}.png`);image.alt='';
      image.dataset.layer=`${key}${side==='whole'?'':`-${side}`}`;
      if(side!=='whole')image.style.clipPath=side==='left'?'inset(0 50% 0 0)':'inset(0 0 0 50%)';
      Object.assign(image.style,{left:`${(target[0]-bounds[0]*sx)/1346*100}%`,top:`${(target[1]-bounds[1]*sy)/1168*100}%`,width:`${sx*100}%`,height:`${sy*100}%`});
      art.append(image);
    }
  }
  addEventDetails(pageSeven.querySelector<HTMLElement>('.v1-wedding-details')!,{
    top:'16%',weekday:'SATURDAY',month:'DEC',day:'19',year:'2026',time:'MUHURTA – 11:34 AM',venue:'Shree Manav Seva Sangh',
    reception:'Followed by Lunch and Reception',address:['255-257, Sion Main Rd, Opp Gandhi Market','Sion, Mumbai 400019'],mapUrl:'https://www.google.com/maps/search/?api=1&query=Shree+Manav+Seva+Sangh%2C+255%2C+257+Sion+Main+Road%2C+Sion+East%2C+Sion%2C+Mumbai%2C+Maharashtra+400019&query_place_id=ChIJS5SLZyzP5zsRDo_6RMB14TM',
  });
  addWeddingFallingPetals(pageSeven.querySelector<HTMLElement>('.v1-wedding-card')!);
  await waitForImages(art.querySelectorAll('img'));
})();

let weddingRevealStarted=false;
function revealWeddingPage(){
  if(weddingRevealStarted)return;
  weddingRevealStarted=true;
  pageSeven.classList.add('v1-p7-entering');
  void pageSevenReady.then(()=>{
    const garlands=Array.from(pageSeven.querySelectorAll<HTMLElement>('.v1-wedding-art [data-layer^="wedding-garlands-"]'));
    const couple=pageSeven.querySelector<HTMLElement>('.v1-wedding-art [data-layer="wedding-couple"]')!;
    const title=pageSeven.querySelector<HTMLElement>('.v1-wedding-heading h1')!;
    const schedule=pageSeven.querySelector<HTMLElement>('.v1-wedding-details .v1-event-schedule')!;
    const venue=pageSeven.querySelector<HTMLElement>('.v1-wedding-details .v1-event-venue')!;
    const targets=[...garlands,couple,title,schedule,venue];
    if(prefersReduced.matches){
      pageSeven.classList.remove('v1-p7-entering');
      pageSeven.classList.add('v1-p7-revealed');
      gsap.set(targets,{opacity:1,y:0});
      return;
    }
    gsap.set(garlands,{opacity:0,y:-26});
    gsap.set(couple,{opacity:0,y:12});
    gsap.set([title,schedule,venue],{opacity:0,y:13});
    const textStart=1.42;
    const reveal=gsap.timeline({onComplete:()=>{
      gsap.set(targets,{clearProps:'opacity,transform'});
      pageSeven.classList.remove('v1-p7-entering');
      pageSeven.classList.add('v1-p7-revealed');
    }})
      .to(garlands,{opacity:1,y:0,duration:.88,ease:'sine.out',stagger:.025},.2)
      .call(()=>pageSeven.classList.add('v1-p7-ambience'),[],1.34);
    reveal.to([couple,title],{opacity:1,y:0,duration:.8,ease:'sine.out'},textStart)
      .to(schedule,{opacity:1,y:0,duration:textRevealTiming.duration,ease:'sine.out'},textStart+textRevealTiming.step)
      .to(venue,{opacity:1,y:0,duration:textRevealTiming.duration,ease:'sine.out'},textStart+textRevealTiming.step*2);
  });
}

function finishIntro() {
  timeline?.kill();
  gsap.set([medallion, ganesh, prayer, ...later], {clearProps:'all'});
  gsap.set(floral,{opacity:1});
  gsap.set(medallion,{opacity:1});
  gsap.set(ganesh,{opacity:1,top:'6.2%'});
  gsap.set(prayer,{opacity:1,y:0});
  gsap.set(later,{opacity:1});
  gsap.set(logo,{scale:1});
  introFinished=true;
  opening.classList.add('v1-ready');
}
function navigateToScene(scene:HTMLElement,onComplete?:()=>void){
  if(tapLocked)return;
  tapLocked=true;
  scene.classList.add('v1-scene-visible');
  const html=document.documentElement;
  html.classList.add('v1-page-transition');
  const sceneOffset=()=>scene.getBoundingClientRect().top+window.scrollY;
  let finished=false;
  const finish=()=>{
    if(finished)return;
    finished=true;
    window.scrollTo({top:sceneOffset(),left:0,behavior:'instant'});
    html.classList.remove('v1-page-transition');
    activeSceneIndex=scenes.indexOf(scene);
    scenes.forEach(candidate=>candidate.classList.toggle('v1-scene-visible',candidate===scene));
    tapLocked=false;
    onComplete?.();
  };
  if(prefersReduced.matches){finish();return;}
  if(Math.abs(window.scrollY-sceneOffset())<1){finish();return;}
  const from=window.scrollY;
  const duration=850;
  const started=performance.now();
  const glide=(now:number)=>{
    if(finished)return;
    const progress=Math.min(1,(now-started)/duration);
    const eased=progress<.5?4*progress*progress*progress:1-Math.pow(-2*progress+2,3)/2;
    window.scrollTo({top:from+(sceneOffset()-from)*eased,left:0,behavior:'instant'});
    if(progress<1)window.requestAnimationFrame(glide);
    else finish();
  };
  window.requestAnimationFrame(glide);
}

let resizeAlignmentFrame=0;
function alignActiveSceneAfterResize(){
  if(tapLocked)return;
  window.cancelAnimationFrame(resizeAlignmentFrame);
  resizeAlignmentFrame=window.requestAnimationFrame(()=>{
    const activeScene=scenes[activeSceneIndex];
    if(!activeScene)return;
    window.scrollTo({top:activeScene.getBoundingClientRect().top+window.scrollY,left:0,behavior:'instant'});
  });
}
window.addEventListener('resize',alignActiveSceneAfterResize,{passive:true});
window.visualViewport?.addEventListener('resize',alignActiveSceneAfterResize,{passive:true});

function navigateByGesture(direction:1|-1){
  if(tapLocked)return;
  if(activeSceneIndex===0){if(direction>0)advance();return;}
  const targetIndex=Math.max(0,Math.min(scenes.length-1,activeSceneIndex+direction));
  if(targetIndex===activeSceneIndex)return;
  const target=scenes[targetIndex];
  target.setAttribute('aria-hidden','false');
  if(targetIndex===1){
    advancing=true;
    void pageTwoReady.then(()=>navigateToScene(target,()=>{advancing=false;}))
      .catch(error=>{advancing=false;console.error('Unable to load page 2 layers',error);});
    return;
  }
  navigateToScene(target);
}
function advance() {
  if (!introFinished || advancing || tapLocked) return;
  advancing=true;
  void pageTwoReady.then(() => {
    nextPage.setAttribute('aria-hidden','false');
    navigateToScene(nextPage,()=>{advancing=false;});
  }).catch(error => { advancing=false; console.error('Unable to load page 2 layers',error); });
}
function onKey(event: KeyboardEvent){if(event.key==='Enter'||event.key===' '){event.preventDefault();advance();}}
page.addEventListener('click',advance);
page.addEventListener('keydown',onKey);

root.addEventListener('click',event=>{
  if(Date.now()<ignoreClickUntil)return;
  const target=event.target;
  if(target instanceof Element&&target.closest('a,button,input,select,textarea,[role="button"]'))return;
  if(activeSceneIndex===0||tapLocked)return;
  navigateByGesture(1);
});

root.addEventListener('touchstart',event=>{
  if(event.touches.length!==1)return;
  const target=event.target;
  if(target instanceof Element&&target.closest('a,button,input,select,textarea'))return;
  touchStartX=event.touches[0].clientX;
  touchStartY=event.touches[0].clientY;
  trackingTouch=true;
},{passive:true});
root.addEventListener('touchmove',event=>{
  if(!trackingTouch||event.touches.length!==1)return;
  const dx=event.touches[0].clientX-touchStartX;
  const dy=event.touches[0].clientY-touchStartY;
  if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx))event.preventDefault();
},{passive:false});
root.addEventListener('touchend',event=>{
  if(!trackingTouch)return;
  trackingTouch=false;
  const touch=event.changedTouches[0];
  const dx=touch.clientX-touchStartX;
  const dy=touchStartY-touch.clientY;
  if(Math.abs(dy)<44||Math.abs(dy)<Math.abs(dx)*1.15)return;
  ignoreClickUntil=Date.now()+750;
  navigateByGesture(dy>0?1:-1);
},{passive:true});
root.addEventListener('touchcancel',()=>{trackingTouch=false;},{passive:true});

root.addEventListener('wheel',event=>{
  event.preventDefault();
  const target=event.target;
  if(target instanceof Element&&target.closest('a,button,input,select,textarea'))return;
  if(Math.abs(event.deltaY)>14&&!wheelGestureLocked){
    wheelGestureLocked=true;
    navigateByGesture(event.deltaY>0?1:-1);
  }
  window.clearTimeout(wheelUnlockTimer);
  wheelUnlockTimer=window.setTimeout(()=>{wheelGestureLocked=false;},300);
},{passive:false});

const sceneObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(entry=>entry.isIntersecting&&entry.intersectionRatio>=.55)
    .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  const index=scenes.indexOf(visible.target as HTMLElement);
  if(index<0)return;
  activeSceneIndex=index;
  const currentScene=scenes[index];
  pageSix?.classList.toggle('v1-p6-live',currentScene===pageSix);
  pageSeven.classList.toggle('v1-p7-live',currentScene===pageSeven);
  scenes.forEach((scene,sceneIndex)=>{
    const hidden=sceneIndex!==index&&sceneIndex!==index+1;
    if(hidden&&scene.contains(document.activeElement)) (document.activeElement as HTMLElement).blur();
    scene.setAttribute('aria-hidden',hidden?'true':'false');
  });
  if(index===0)return;
  page.tabIndex=-1;
  if(currentScene===familyPage)revealFamilyPage();
  if(currentScene===pageFour)revealMehendiPage();
  if(currentScene===pageFive)revealHaldiPage();
  if(currentScene===pageSix)revealSangeetPage();
  if(currentScene===pageSeven)revealWeddingPage();
},{threshold:[.55,.78]});
scenes.forEach(scene=>sceneObserver.observe(scene));

let familyRevealStarted=false;
function revealFamilyPage(){
  if(familyRevealStarted)return;
  familyRevealStarted=true;
  familyArt.classList.add('v1-p3-live');
  void pageThreeReady.then(()=>{
    if(prefersReduced.matches){
      familyArt.classList.add('v1-p3-landed');
      gsap.set(familyCopy.children,{opacity:1,y:0});
      return;
    }
    const strands=Array.from(familyArt.querySelectorAll<HTMLElement>('[data-layer^="jasmine-strand-"]'));
    gsap.set(strands,{opacity:0,y:-70});
    const drop=gsap.timeline({onComplete:()=>{
      familyArt.classList.add('v1-p3-landed');
      const text=Array.from(familyCopy.children) as HTMLElement[];
      const group=(...labels:string[])=>text.filter(element=>labels.includes(element.dataset.layer??''));
      const reveal=gsap.timeline();
      const show=(elements:HTMLElement[],at:number,fadeDuration=textRevealTiming.duration,movementDuration=fadeDuration)=>{
        reveal.to(elements,{opacity:1,duration:fadeDuration,ease:'sine.out'},at);
        reveal.to(elements,{y:0,duration:movementDuration,ease:'sine.out'},at);
      };
      const pageTwoTextStep=textRevealTiming.step;
      show(group('WITH THE BLESSINGS OF','OUR BELOVED PARENTS'),0,pageTwoTextStep);
      show(group('Mrs. Shweta & Mr. Abhay Subhedar','cordially invite you\nto celebrate the wedding of their daughter','Anushka','with','Suresh','son of','Mrs. Sailee & Mr. Chandrakant Bhandari'),pageTwoTextStep,pageTwoTextStep);
      show(group('WITH YOUR BLESSINGS, WE BEGIN'),pageTwoTextStep*2,textRevealTiming.closingFade,textRevealTiming.duration);
    }});
    strands.forEach(strand=>drop.to(strand,{opacity:1,y:0,duration:.85,ease:'sine.out'},(Number(strand.dataset.layer?.slice('jasmine-strand-'.length)??1)-1)*.075));
  });
}

let mehendiRevealStarted=false;
function revealMehendiPage(){
  if(!pageFour)return;
  pageFour.classList.add('v1-p4-live');
  if(mehendiRevealStarted)return;
  mehendiRevealStarted=true;
  void pageFourReady.then(()=>{
    const title=pageFour.querySelector<HTMLElement>('.v1-mehendi-title')!;
    const schedule=pageFour.querySelector<HTMLElement>('.v1-mehendi-details .v1-event-schedule')!;
    const venue=pageFour.querySelector<HTMLElement>('.v1-mehendi-details .v1-event-venue')!;
    const henna=Array.from(pageFour.querySelectorAll<SVGSVGElement>('.v1-mehendi-henna'));
    const hennaStrokes=henna.flatMap(motif=>Array.from(motif.querySelectorAll<SVGPathElement>('path')));
    const reveal=gsap.timeline();
    gsap.set([title,schedule,venue],{opacity:0,y:13});
    revealEventText(reveal,title,schedule,venue,0);
    if(prefersReduced.matches){
      gsap.set(henna,{opacity:1});
      gsap.set(hennaStrokes,{strokeDashoffset:0});
    }else{
      reveal.to(henna,{opacity:1,duration:.45,ease:'sine.out'},2.85)
        .to(hennaStrokes,{strokeDashoffset:0,duration:1.2,ease:'sine.inOut',stagger:{each:.045,from:'start'}},2.85);
    }
  });
}

let haldiRevealStarted=false;
function revealHaldiPage(){
  if(!pageFive||haldiRevealStarted)return;
  haldiRevealStarted=true;
  pageFive.classList.add('v1-p5-entering');
  void pageFiveReady.then(()=>{
    const art=Array.from(pageFive.querySelectorAll<HTMLElement>('.v1-haldi-art .v1-p5-art'));
    const garlandDrops=Array.from(pageFive.querySelectorAll<HTMLElement>('.v1-p5-garland-drop'));
    const background=art.find(element=>element.dataset.layer==='paper-background');
    const illustration=art.filter(element=>element!==background);
    const windLayers=illustration.filter(element=>element.matches('.v1-p5-sway,.v1-p5-breeze,.v1-p5-lantern-glow'));
    const settlingLayers=illustration.filter(element=>!windLayers.includes(element));
    const title=pageFive.querySelector<HTMLElement>('.v1-haldi-title')!;
    const schedule=pageFive.querySelector<HTMLElement>('.v1-haldi-details .v1-event-schedule')!;
    const venue=pageFive.querySelector<HTMLElement>('.v1-haldi-details .v1-event-venue')!;
    const revealTargets=[...illustration,title,schedule,venue];
    if(prefersReduced.matches){
      pageFive.classList.remove('v1-p5-entering');
      pageFive.classList.add('v1-p5-revealed','v1-p5-live');
      gsap.set(revealTargets,{opacity:1,y:0});
      return;
    }
    gsap.set(illustration,{opacity:0});
    gsap.set(settlingLayers,{y:10});
    gsap.set(garlandDrops,{yPercent:-24});
    gsap.set([title,schedule,venue],{opacity:0,y:12});
    const reveal=gsap.timeline({onComplete:()=>{
      pageFive.classList.remove('v1-p5-entering');
      pageFive.classList.add('v1-p5-revealed','v1-p5-live');
    }})
      .to(illustration,{opacity:1,duration:.62,stagger:.025,ease:'sine.out'},0)
      .to(settlingLayers,{y:0,duration:.72,stagger:.025,ease:'sine.out'},0)
      .to(garlandDrops,{yPercent:0,duration:1.15,stagger:.14,ease:'power2.out'},0);
    revealEventText(reveal,title,schedule,venue,.48);
  });
}

let pageTwoRevealed = false;
const pageTwoObserver = new IntersectionObserver(entries => {
  if (pageTwoRevealed || !entries.some(entry => entry.isIntersecting&&entry.intersectionRatio>=.55)) return;
  pageTwoRevealed = true;
  pageTwoObserver.disconnect();
  nextPage.classList.add('v1-p2-live');
  advancing = false;
  nextPage.setAttribute('aria-hidden','false');
  if(page.contains(document.activeElement)) (document.activeElement as HTMLElement).blur();
  page.setAttribute('aria-hidden','true');
  page.tabIndex = -1;
  void pageTwoReady.then(() => window.setTimeout(() => {
    const text = Array.from(announcementCopy.children) as HTMLElement[];
    const group = (...labels:string[]) => text.filter(element => labels.includes(element.dataset.layer ?? ''));
    const reveal = gsap.timeline();
    const show = (
      elements:HTMLElement[],
      position:number|string,
      fadeDuration=prefersReduced.matches ? .2 : textRevealTiming.duration,
      movementDuration=prefersReduced.matches ? .2 : textRevealTiming.duration,
    ) => {
      reveal.to(elements,{opacity:1,duration:fadeDuration,ease:'sine.out'},position);
      reveal.to(elements,{y:0,duration:movementDuration,ease:'sine.out'},position);
    };
    const headingEnd = prefersReduced.matches ? .2 : textRevealTiming.duration;
    const namesStart = headingEnd + (prefersReduced.matches ? .1 : 0);
    const namesEnd = namesStart + (prefersReduced.matches ? .2 : textRevealTiming.step);
    show(group('TOGETHER','A BEAUTIFUL BEGINNING'),0);
    show(group('Suresh','and','Anushka'),namesStart);
    show(group('ARE GETTING MARRIED'),namesEnd,prefersReduced.matches ? .2 : textRevealTiming.closingFade,prefersReduced.matches ? .2 : textRevealTiming.duration);
  }, prefersReduced.matches ? 40 : 450));
}, {threshold: .55});
pageTwoObserver.observe(nextPage);

familyArt.classList.add('v1-p3-live');
void Promise.all([pageThreeReady,pageFourReady,pageFiveReady,pageSixReady,pageSevenReady]).catch(error=>console.error('Unable to prepare the remaining V1 pages',error));

Promise.all(Array.from(page.querySelectorAll('img')).map(img=>img.complete?Promise.resolve():new Promise<void>(resolve=>{img.addEventListener('load',()=>resolve(),{once:true});img.addEventListener('error',()=>resolve(),{once:true});}))).then(()=>{
  if(prefersReduced.matches){gsap.set(page,{opacity:0});finishIntro();gsap.fromTo(page,{opacity:0},{opacity:1,duration:.45,ease:'sine.out'});return;}
  gsap.set([ganesh,medallion,prayer,...later, ...floral],{opacity:0});
  // Keep its final layout fixed and glide from the centre using a transform.
  gsap.set(ganesh,{top:'6.2%',yPercent:358});
  gsap.set(medallion,{top:'4.2%',scale:.94,transformOrigin:'50% 50%'});
  gsap.set(prayer,{y:14});
  gsap.set(logo,{scale:.985,transformOrigin:'50% 50%'});
  timeline=gsap.timeline({onComplete:finishIntro});
  timeline.to(ganesh,{opacity:1,duration:.75,ease:'sine.out'},.2)
    .to(ganesh,{yPercent:0,duration:1.45,ease:'sine.inOut'},1.0)
    .to(medallion,{opacity:1,scale:1,duration:1.0,ease:'sine.inOut'},1.8)
    .to(prayer,{opacity:1,y:0,duration:1.05,ease:'sine.inOut'},2.65)
    .to(later,{opacity:1,duration:1.35,stagger:.16,ease:'sine.inOut'},4.05)
    .to(logo,{scale:1,duration:1.35,ease:'sine.inOut'},4.05);
});
prefersReduced.addEventListener('change',()=>{if(prefersReduced.matches)finishIntro();});
window.addEventListener('pagehide',()=>timeline?.kill(),{once:true});
