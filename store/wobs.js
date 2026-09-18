const WOBBLERS = [
  {id:'bloop',name:'Bloop',color:'#4FB0FF',rarity:'common'},{id:'peachy',name:'Peachy',color:'#FFB08A',rarity:'common'},
  {id:'minty',name:'Minty',color:'#6FE0A4',rarity:'common'},{id:'sunny',name:'Sunny',color:'#FFD84D',rarity:'common'},
  {id:'berry',name:'Berry',color:'#B07CFF',rarity:'common'},{id:'pebble',name:'Pebble',color:'#B8C2D6',rarity:'common'},
  {id:'coco',name:'Coco',color:'#B9865E',rarity:'common'},{id:'limey',name:'Limey',color:'#C6F04D',rarity:'common'},
  {id:'rosie',name:'Rosie',color:'#FF8FB8',rarity:'common'},{id:'skye',name:'Skye',color:'#9FE3FF',rarity:'common'},
  {id:'captain',name:'Captain',color:'#5C8DFF',rarity:'rare',acc:'hat'},{id:'bowie',name:'Bowie',color:'#FF9BC9',rarity:'rare',acc:'bow'},
  {id:'nerdy',name:'Nerdy',color:'#7FD97F',rarity:'rare',acc:'glasses'},{id:'chef',name:'Chef',color:'#FFF1D6',rarity:'rare',acc:'chef'},
  {id:'pirate',name:'Pirate',color:'#FF7B6B',rarity:'rare',acc:'patch'},{id:'ninja',name:'Ninja',color:'#5A5F8C',rarity:'rare',acc:'band'},
  {id:'sprout',name:'Sprout',color:'#A8E063',rarity:'rare',acc:'leaf'},{id:'frosty',name:'Frosty',color:'#CFF3FF',rarity:'rare',acc:'scarf'},
  {id:'royal',name:'Royal',color:'#9B6BFF',rarity:'epic',acc:'crown'},{id:'robo',name:'Robo',color:'#C9D3E0',rarity:'epic',acc:'antenna'},
  {id:'zappy',name:'Zappy',color:'#FFE14D',rarity:'epic',acc:'bolt'},{id:'ghostly',name:'Ghostly',color:'#F4F6FF',rarity:'epic',acc:'ghost'},
  {id:'rainbow',name:'Rainbow',color:'url(#gRainbow)',rarity:'legendary',acc:'sparkle'},{id:'galaxy',name:'Galaxy',color:'url(#gGalaxy)',rarity:'legendary',acc:'stars'},
  {id:'lemon',name:'Lemon',color:'#FFF176',rarity:'common'},{id:'aqua',name:'Aqua',color:'#7FE7DD',rarity:'common'},
  {id:'plum',name:'Plum',color:'#C58AF9',rarity:'common'},{id:'cloudy',name:'Cloudy',color:'#EEF0F7',rarity:'common'},
  {id:'party',name:'Party',color:'#FFB4E6',rarity:'rare',acc:'party'},{id:'cowgirl',name:'Dusty',color:'#F4C28B',rarity:'rare',acc:'cowboy'},
  {id:'dj',name:'DJ Wob',color:'#6C8CFF',rarity:'rare',acc:'headphones'},{id:'cool',name:'Coolio',color:'#FF8A5B',rarity:'rare',acc:'shades'},
  {id:'wizard',name:'Wizzo',color:'#7A5CFF',rarity:'epic',acc:'wizard'},{id:'angel',name:'Angel',color:'#FFF8E1',rarity:'epic',acc:'wings'},
  {id:'princess',name:'Princess',color:'#FFC1E3',rarity:'epic',acc:'tiara'},{id:'phoenix',name:'Phoenix',color:'url(#gFire)',rarity:'legendary',acc:'sparkle'},
];
function wearLayers(wear){
  if(!wear) return {back:'',front:''};
  let back='',front='';
  const H={
    party:`<path d="M50 -2 L36 28 H64 Z" fill="#FF6F61"/><path d="M41 18 L59 18 M44 10 L56 10" stroke="#FFD84D" stroke-width="3"/><circle cx="50" cy="-2" r="4.5" fill="#FFD84D"/>`,
    beanie:`<path d="M27 28 Q50 -4 73 28 Z" fill="#4FB0FF"/><rect x="25" y="23" width="50" height="9" rx="4.5" fill="#2A7FD1"/><circle cx="50" cy="1" r="5.5" fill="#fff"/>`,
    cowboy:`<ellipse cx="50" cy="26" rx="32" ry="6" fill="#A8713F"/><path d="M35 26 V8 Q50 1 65 8 V26 Z" fill="#B9865E"/><rect x="35" y="19" width="30" height="4" fill="#5E3A1E"/>`,
    wizard:`<path d="M50 -8 L31 30 H69 Z" fill="#6D4BFF"/><path d="M24 30 h52" stroke="#6D4BFF" stroke-width="7" stroke-linecap="round"/><path d="M50 8 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" fill="#FFD84D"/>`,
    halo:`<ellipse cx="50" cy="4" rx="18" ry="5" fill="none" stroke="#FFD84D" stroke-width="4"/>`,
    tiara:`<path d="M34 24 L38 10 L45 18 L50 6 L55 18 L62 10 L66 24 Z" fill="#FFD84D"/><circle cx="50" cy="15" r="3" fill="#FF3D7F"/>`,
    headphones:`<path d="M22 46 Q22 12 50 12 Q78 12 78 46" fill="none" stroke="#22305A" stroke-width="5"/><rect x="14" y="40" width="14" height="20" rx="6" fill="#FF6F61"/><rect x="72" y="40" width="14" height="20" rx="6" fill="#FF6F61"/>`,
  };
  const F={
    shades:`<rect x="26" y="40" width="22" height="15" rx="6" fill="#22305A"/><rect x="52" y="40" width="22" height="15" rx="6" fill="#22305A"/><path d="M48 46 h4 M26 44 L18 40 M74 44 L82 40" stroke="#22305A" stroke-width="3"/><path d="M30 44 h10" stroke="#fff" stroke-width="2" opacity=".5"/>`,
    stache:`<path d="M50 62 Q44 56 36 60 Q40 66 50 63 Q60 66 64 60 Q56 56 50 62 Z" fill="#5E3A1E"/>`,
    monocle:`<circle cx="62" cy="48" r="12" fill="none" stroke="#FFD84D" stroke-width="3"/><path d="M72 56 Q78 70 74 82" stroke="#FFD84D" stroke-width="2" fill="none"/>`,
    sticker:`<path d="M28 54 l2 4.5 5 .5 -3.7 3.3 1.1 4.9 -4.4 -2.5 -4.4 2.5 1.1 -4.9 -3.7 -3.3 5 -.5 z" fill="#FFD84D" stroke="#FFB300"/>`,
  };
  const X={
    bowtie:`<path d="M50 80 L36 72 V88 Z M50 80 L64 72 V88 Z" fill="#FF3D7F"/><circle cx="50" cy="80" r="3.5" fill="#FF8FB8"/>`,
    beads:`<g fill="#FF8FB8"><circle cx="30" cy="76" r="3"/><circle cx="37" cy="80" r="3"/><circle cx="44" cy="82" r="3"/><circle cx="50" cy="83" r="3.5" fill="#FFD84D"/><circle cx="56" cy="82" r="3"/><circle cx="63" cy="80" r="3"/><circle cx="70" cy="76" r="3"/></g>`,
  };
  const B={
    cape:`<path d="M20 40 Q10 70 14 96 L86 96 Q90 70 80 40 Z" fill="#FF3D3D"/><path d="M26 44 Q18 70 22 92 L78 92 Q82 70 74 44 Z" fill="#FF6F61"/>`,
    wings:`<path d="M22 44 Q-4 30 4 60 Q-2 74 22 72 Z M78 44 Q104 30 96 60 Q102 74 78 72 Z" fill="#fff" stroke="#DCE3EE" stroke-width="2"/>`,
  };
  if(wear.hat&&H[wear.hat]) front+=H[wear.hat];
  if(wear.face&&F[wear.face]) front+=F[wear.face];
  if(wear.extra){ if(X[wear.extra]) front+=X[wear.extra]; if(B[wear.extra]) back+=B[wear.extra]; }
  return {back,front};
}
function wobblerSVG(w, attrs='', wear=null){
  const defs = `<defs><linearGradient id="gRainbow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF6F61"/><stop offset=".3" stop-color="#FFD84D"/><stop offset=".55" stop-color="#5FD68A"/><stop offset=".8" stop-color="#4FB0FF"/><stop offset="1" stop-color="#9B6BFF"/></linearGradient><radialGradient id="gGalaxy" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#6D4BFF"/><stop offset=".6" stop-color="#2B1E6B"/><stop offset="1" stop-color="#140F3A"/></radialGradient><linearGradient id="gFire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FF3D3D"/><stop offset=".5" stop-color="#FF8A00"/><stop offset="1" stop-color="#FFD84D"/></linearGradient></defs>`;
  const ghost = w.acc==='ghost';
  const body = `<path d="M50 12 C 78 12, 94 40, 90 66 C 87 88, 13 88, 10 66 C 6 40, 22 12, 50 12 Z" fill="${w.color}" ${ghost?'opacity=".9" stroke="#C9D2FF" stroke-width="2"':''}/>`;
  const shine = `<ellipse cx="34" cy="28" rx="9" ry="5" fill="#fff" opacity=".35" transform="rotate(-25 34 28)"/>`;
  const dark = w.id==='ninja'||w.id==='galaxy';
  const eyes = `<circle cx="38" cy="48" r="9" fill="#fff"/><circle cx="62" cy="48" r="9" fill="#fff"/><circle cx="40" cy="49" r="4.6" fill="#22305A"/><circle cx="64" cy="49" r="4.6" fill="#22305A"/><circle cx="41.5" cy="47.3" r="1.6" fill="#fff"/><circle cx="65.5" cy="47.3" r="1.6" fill="#fff"/>`;
  const cheeks = `<circle cx="27" cy="60" r="5" fill="#FF8FB8" opacity=".55"/><circle cx="73" cy="60" r="5" fill="#FF8FB8" opacity=".55"/>`;
  const mouth = `<path d="M42 64 Q50 73 58 64" stroke="${dark?'#fff':'#22305A'}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const ACC={
    hat:`<rect x="26" y="16" width="48" height="8" rx="4" fill="#22305A"/><path d="M34 17 L36 4 H64 L66 17 Z" fill="#22305A"/><rect x="36" y="9" width="28" height="4" fill="#FFD84D"/>`,
    bow:`<path d="M72 20 L58 27 L72 34 Z" fill="#FF3D7F"/><path d="M72 20 L86 13 L84 34 Z" fill="#FF3D7F"/><circle cx="72" cy="27" r="4" fill="#FF6FA5"/>`,
    glasses:`<circle cx="38" cy="48" r="12" fill="none" stroke="#22305A" stroke-width="3"/><circle cx="62" cy="48" r="12" fill="none" stroke="#22305A" stroke-width="3"/><path d="M26 46 L18 42 M74 46 L82 42" stroke="#22305A" stroke-width="3" stroke-linecap="round"/>`,
    chef:`<rect x="34" y="10" width="32" height="10" rx="3" fill="#fff" stroke="#DCE3EE"/><circle cx="36" cy="8" r="9" fill="#fff" stroke="#DCE3EE"/><circle cx="50" cy="4" r="10" fill="#fff" stroke="#DCE3EE"/><circle cx="64" cy="8" r="9" fill="#fff" stroke="#DCE3EE"/>`,
    patch:`<circle cx="62" cy="48" r="10" fill="#22305A"/><path d="M52 40 L26 30 M72 40 L88 34" stroke="#22305A" stroke-width="3" stroke-linecap="round"/>`,
    band:`<rect x="12" y="30" width="76" height="8" rx="4" fill="#FF3D3D"/><path d="M86 34 L98 26 M86 34 L98 40" stroke="#FF3D3D" stroke-width="5" stroke-linecap="round"/>`,
    leaf:`<path d="M50 12 Q52 2 60 0 Q62 10 52 14 Z" fill="#3FA34D"/><path d="M50 12 Q46 4 40 2 Q38 10 48 14 Z" fill="#5FD68A"/>`,
    scarf:`<rect x="14" y="74" width="72" height="10" rx="5" fill="#FF6F61"/><path d="M70 80 L78 96 L86 82 Z" fill="#FF6F61"/><path d="M20 78 h60" stroke="#FFD84D" stroke-width="2" stroke-dasharray="4 4"/>`,
    crown:`<path d="M28 20 L34 4 L44 14 L50 0 L56 14 L66 4 L72 20 Z" fill="#FFB300"/><rect x="28" y="18" width="44" height="6" fill="#FFD84D"/><circle cx="50" cy="12" r="3" fill="#FF3D7F"/>`,
    antenna:`<line x1="50" y1="12" x2="50" y2="2" stroke="#8592A8" stroke-width="3"/><circle cx="50" cy="2" r="4" fill="#FF3D3D"/><rect x="30" y="72" width="40" height="6" rx="3" fill="#8592A8"/><circle cx="38" cy="75" r="2" fill="#5FD68A"/><circle cx="50" cy="75" r="2" fill="#FFD84D"/><circle cx="62" cy="75" r="2" fill="#FF6F61"/>`,
    bolt:`<path d="M82 20 L70 40 L78 40 L68 60 L88 34 L80 34 Z" fill="#FF8A00" stroke="#22305A" stroke-width="2" stroke-linejoin="round"/>`,
    ghost:`<path d="M12 70 Q18 80 24 70 Q30 80 36 70 Q42 80 48 70 Q54 80 60 70 Q66 80 72 70 Q78 80 84 70 Q88 80 90 70" fill="none" stroke="#C9D2FF" stroke-width="2"/>`,
    sparkle:`<path d="M16 24 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z M84 18 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z M80 70 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" fill="#fff"/>`,
    stars:`<g fill="#fff"><circle cx="24" cy="30" r="1.5"/><circle cx="72" cy="24" r="1.2"/><circle cx="80" cy="66" r="1.5"/><circle cx="20" cy="70" r="1"/><circle cx="50" cy="80" r="1.3"/><path d="M76 34 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z"/></g>`,
  };
  const wl=wearLayers(wear);
  return `<svg viewBox="-6 -10 112 112" ${attrs}>${attrs.includes("xmlns")?defs:""}${wl.back}${body}${shine}${eyes}${cheeks}${mouth}${ACC[w.acc]||(w.acc?(()=>{const a=wearLayers({hat:w.acc,face:w.acc,extra:w.acc});return a.back+a.front})():'')}${wl.front}</svg>`;
}

const pick=['royal','rainbow','captain','bowie','phoenix','dj'];const pos=[[500,28],[670,12],[830,50],[530,268],[695,252],[835,282]];const rot=[-8,6,-4,5,-6,8];
const defs='<svg width=0 height=0 style=position:absolute><defs><linearGradient id="gRainbow" x1=0 y1=0 x2=1 y2=1><stop offset=0 stop-color="#FF6F61"/><stop offset=.3 stop-color="#FFD84D"/><stop offset=.55 stop-color="#5FD68A"/><stop offset=.8 stop-color="#4FB0FF"/><stop offset=1 stop-color="#9B6BFF"/></linearGradient><linearGradient id="gFire" x1=0 y1=1 x2=0 y2=0><stop offset=0 stop-color="#FF3D3D"/><stop offset=.5 stop-color="#FF8A00"/><stop offset=1 stop-color="#FFD84D"/></linearGradient></defs></svg>';
document.getElementById('wobs').innerHTML=defs+pick.map((id,i)=>{const w=WOBBLERS.find(x=>x.id===id);return '<div class="w" style="left:'+pos[i][0]+'px;top:'+pos[i][1]+'px;transform:rotate('+rot[i]+'deg)">'+wobblerSVG(w,'',i===0?{hat:'party',face:'shades'}:null)+'</div>'}).join('');
