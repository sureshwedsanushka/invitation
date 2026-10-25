type PageBox = {position:{left:number;top:number};dimension:{width:number;height:number}};
import { assetUrl } from './asset-url';
type CanvaPage = {number:number;art:Array<{id:string;asset:string;label:string;src:string;box:PageBox}>};
export type AnnouncementLayer = {id?:string;asset?:string;label:string;src?:string;clip?:string;kind?:string;box:PageBox};

const source = assetUrl('assets/independent/');
const box = (left:number,top:number,width:number,height:number):PageBox => ({position:{left,top},dimension:{width,height}});
const art = (name:string,bounds:PageBox=box(0,0,1080,1920),clip?:string):AnnouncementLayer => ({label:name,src:`${source}${name}.png`,box:bounds,clip});

/** Reuses the exact editable, independent layer set from the established page 2 preview. */
export function announcementLayers(page:CanvaPage):AnnouncementLayer[] {
  const full=page.art[0].box;
  const layers:AnnouncementLayer[]=[
    {...page.art[0],label:'peach-paper-background',src:assetUrl('assets/canva/peach-background.png')},
    art('announcement-left-leaves',box(0,0,702,1440)),
    ...['announcement-right-leaf','announcement-rangoli','announcement-jasmine','announcement-couple'].map(name=>art(name,full)),
    art('announcement-lamp',box(0,11,732,1548)),
    art('announcement-bowl',full),
  ];
  const petals=[[0,80,60,50],[170,410,65,85],[467,550,55,70],[820,721,95,70],[174,727,80,70],[130,800,75,65],[165,845,80,70],[235,886,80,70],[841,827,75,72],[647,886,90,90],[757,891,64,66],[812,883,63,63],[5,900,65,70],[88,952,73,70],[0,999,90,100],[734,1008,79,85],[17,1174,79,78],[45,1100,54,62],[200,1118,73,73],[663,1111,64,64],[733,1114,63,64],[915,1116,24,90],[23,1300,76,76],[0,1398,40,78],[676,1464,82,74],[919,1430,20,75],[558,1543,78,78],[737,1528,76,78],[826,1592,90,78]];
  for(const [index,[x,y,width,height]] of petals.entries()) {
    layers.push({...art('announcement-petals',full,`inset(${y/1675*100}% ${(939-x-width)/939*100}% ${(1675-y-height)/1675*100}% ${x/939*100}%)`),label:`loose-flower-${index+1}`});
  }
  return layers;
}

/** Page 3 artwork as separate layers, matching the Canva family-page preview. */
export function familyLayers(page:CanvaPage):AnnouncementLayer[] {
  const full=page.art[0].box;
  const layers:AnnouncementLayer[]=[
    {...page.art[0],label:'peach-paper-background',src:assetUrl('assets/canva/peach-background.png')},
  ];
  for(const [index,[left,right]] of [[0,80],[80,135],[135,225],[225,285],[285,350],[600,665],[665,720],[730,795],[795,865],[865,941]].entries()) {
    layers.push({...art('family-garlands',full,`inset(0 ${100-right/941*100}% 75% ${left/941*100}%)`),label:`jasmine-strand-${index+1}`});
  }
  layers.push(
    art('family-left-leaves',full,'inset(74% 70% 0 0)'),
    art('family-right-leaves',full,'inset(76% 0 0 79%)'),
    art('family-couple',{...full,position:{...full.position,top:full.position.top+32}},'inset(71% 27% 0 21%)'),
    ...page.art.slice(1).map(layer=>({...layer,label:'ganesh-family'})),
  );
  return layers;
}

const fitted=(name:string,frame:PageBox,sourceBounds:number[],targetBounds:number[]):AnnouncementLayer=>{
  const sx=(targetBounds[2]-targetBounds[0])/(sourceBounds[2]-sourceBounds[0]);
  const sy=(targetBounds[3]-targetBounds[1])/(sourceBounds[3]-sourceBounds[1]);
  return art(name,box(frame.position.left+(targetBounds[0]-sourceBounds[0]*sx)/941*frame.dimension.width,
    frame.position.top+(targetBounds[1]-sourceBounds[1]*sy)/1672*frame.dimension.height,
    frame.dimension.width*sx,frame.dimension.height*sy));
};

/** Independent elements for the existing Mehendi page preview. */
export function mehendiLayers(page:CanvaPage):AnnouncementLayer[] {
  const full=box(44.76089266737512,80.04273383618613,990.4782146652498,1760.557);
  const replaced=new Set(['MAHXU8t78fM','MAHXUxuZ42E','MAHXU0338lQ','MAHXU-UPB2A','MAHXU8OfHNw']);
  const layers:AnnouncementLayer[]=[art('opening-clean'),art('mehendi-floor',full),art('mehendi-rug',full),art('mehendi-railing',full)];
  for(const layer of page.art){
    if(layer.asset==='MAHXU-UPB2A')layers.push(
      fitted('mehendi-pink-seated',full,[266,667,907,1431],[433,1025,697,1460]),
      fitted('mehendi-pink-standing',full,[202,484,941,1603],[524,1015,898,1538]),
    );
    else if(layer.asset==='MAHXU8OfHNw')layers.push(...['bowl','lantern','foliage'].map(name=>art(`mehendi-bottom-right-${name}`,full)));
    else if(!replaced.has(layer.asset)){
      const names:Record<string,string>={
        MAHXU17RKeE:'top-left-foliage','MAHXU3-Oq4o':'top-right-foliage',MAHXU0jYGts:'left-beaded-strand',
        MAHXUx5MSRI:'left-hanging-lamp',MAHXUwU6Q0g:'small-hanging-bell',MAHXU2NNw84:'right-beaded-strand',
        MAHXUzHVTPw:'right-hanging-lamp','MAHXU2y-Atg':'map-pin',MAHXU4yr1AM:'left-side-foliage',
        MAHXUzquMW0:'orange-dressed-woman',MAHXU0orhhg:'left-drum',MAHXU4VkY2I:'left-lantern',
        MAHXU6Tmg2I:'right-drum',MAHXUzRBSXg:'yellow-dressed-woman',MAHXU56qBLM:'left-flower-bowl',
        MAHXU1zG8SI:'right-side-foliage','MAGczNakt-4':'gold-divider',
      };
      layers.push({...layer,label:names[layer.asset]||layer.label});
    }
  }
  const edge={left:44.76089266737512,top:80.04273383618613,width:990.4782146652498,height:1760.557};
  const bottomScene=new Set(['mehendi-pink-seated','mehendi-pink-standing','mehendi-bottom-right-bowl','mehendi-bottom-right-lantern','mehendi-bottom-right-foliage','left-side-foliage','orange-dressed-woman','left-drum','left-lantern','right-drum','yellow-dressed-woman','left-flower-bowl','right-side-foliage']);
  return layers.map(layer=>{
    if(['opening-clean','map-pin','gold-divider'].includes(layer.label))return layer;
    const b=layer.box;
    let adjusted:AnnouncementLayer={...layer,box:{...b,
      position:{...b.position,left:(b.position.left-edge.left)*1080/edge.width,top:(b.position.top-edge.top)*1920/edge.height},
      dimension:{...b.dimension,width:b.dimension.width*1080/edge.width,height:b.dimension.height*1920/edge.height}}};
    if(bottomScene.has(layer.label)){
      const scale=.792,p=adjusted.box.position,d=adjusted.box.dimension;
      const anchor=layer.label.startsWith('left-')?0:(layer.label.startsWith('right-')||layer.label.startsWith('mehendi-bottom-right-'))?1080:540;
      adjusted={...adjusted,box:{...adjusted.box,position:{...p,left:anchor+(p.left-anchor)*scale,top:1920-(1920-p.top)*scale},dimension:{...d,width:d.width*scale,height:d.height*scale}}};
    }
    if(['mehendi-floor','mehendi-railing','mehendi-rug'].includes(layer.label)){
      const p=adjusted.box.position,d=adjusted.box.dimension;
      adjusted={...adjusted,box:{...adjusted.box,position:{...p,top:1920-(1920-p.top)*.88},dimension:{...d,height:d.height*.88}}};
    }
    if(layer.label==='mehendi-railing')adjusted={...adjusted,box:box(-65,adjusted.box.position.top,1210,adjusted.box.dimension.height)};
    return adjusted;
  });
}

/** Independent elements for the existing Haldi page preview. */
export function haldiLayers(page:CanvaPage):AnnouncementLayer[] {
  const labels:Record<string,string>={
    MAHXakwRj08:'top-left-garland',
    MAHXaoh7l8c:'top-right-garland',
    MAHXavfPvwk:'right-tree-foliage',
    MAHXagQaask:'left-jasmine-plant',
    MAHXasSxLqk:'left-yellow-drape',
    MAHXagQvpt8:'right-yellow-drape',
    MAHXa5ocDQ4:'brass-lantern',
    MAHXapqmAS8:'left-vase-floral-arrangement',
    MAHXavIqYBo:'right-vase-floral-arrangement',
  };
  return page.art.flatMap((layer,index)=>layer.asset==='MAHXanr_F5g'
    ? ['haldi-flower-bowl','haldi-turmeric-bowl','haldi-bowl-flowers'].map(name=>art(name,layer.box))
    : [{...layer,label:index===0?'paper-background':labels[layer.asset]??layer.label}]);
}
