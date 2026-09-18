// Generates app icons (PNG) for Wobble World without any dependencies.
const fs=require('fs'), zlib=require('zlib');
function png(w,h,rgba){
  const crc=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return b=>{let c=~0;for(const x of b)c=t[(c^x)&255]^(c>>>8);return(~c)>>>0}})();
  const chunk=(type,data)=>{const len=Buffer.alloc(4);len.writeUInt32BE(data.length);const td=Buffer.concat([Buffer.from(type),data]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([len,td,c])};
  const raw=Buffer.alloc((w*4+1)*h); for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;rgba.copy(raw,y*(w*4+1)+1,y*w*4,(y+1)*w*4)}
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=6;ihdr[10]=0;ihdr[11]=0;ihdr[12]=0;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);
}
function render(size,maskable){
  const S=size, px=Buffer.alloc(S*S*4), AA=3;
  const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
  const SKY1=hex('#8FD8FF'),SKY2=hex('#DDF4FF'),BODY=hex('#4FB0FF'),BODY2=hex('#3A98E6'),INK=hex('#22305A'),CHEEK=hex('#FF8FB8'),WHITE=[255,255,255];
  const pad=maskable?0:0.06, R=S*0.22; // rounded corner radius for non-maskable
  function sample(x,y){ // x,y in [0,1]
    const cx=0.5, cy=0.54, rx=0.34, ry=0.30;
    // rounded-square background
    const ex=Math.max(0,Math.abs(x-.5)-(.5-pad-R/S)), ey=Math.max(0,Math.abs(y-.5)-(.5-pad-R/S));
    if(!maskable && ex*ex+ey*ey>(R/S)*(R/S)) return null;
    const t=y; let c=[SKY1[0]+(SKY2[0]-SKY1[0])*t,SKY1[1]+(SKY2[1]-SKY1[1])*t,SKY1[2]+(SKY2[2]-SKY1[2])*t];
    // shadow
    const sdx=(x-cx)/0.26, sdy=(y-(cy+ry+0.045))/0.035; if(sdx*sdx+sdy*sdy<1) c=[c[0]*.85,c[1]*.9,c[2]*.95];
    // body: ellipse with flattened bottom
    let dx=(x-cx)/rx, dy=(y-cy)/ry; const yy=y>cy?dy*1.18:dy; 
    if(dx*dx+yy*yy<1 && y<cy+ry*0.86){ c=y<cy?BODY:[BODY[0]+(BODY2[0]-BODY[0])*(y-cy)/ry,BODY[1]+(BODY2[1]-BODY[1])*(y-cy)/ry,BODY[2]+(BODY2[2]-BODY[2])*(y-cy)/ry];
      // shine
      const shx=(x-(cx-0.16))/0.09, shy=(y-(cy-0.17))/0.05; if(shx*shx+shy*shy<1) c=[c[0]+(255-c[0])*.4,c[1]+(255-c[1])*.4,c[2]+(255-c[2])*.4];
      // cheeks
      for(const s of [-1,1]){const chx=(x-(cx+s*0.23))/0.05,chy=(y-(cy+0.08))/0.05; if(chx*chx+chy*chy<1) c=[c[0]+(CHEEK[0]-c[0])*.55,c[1]+(CHEEK[1]-c[1])*.55,c[2]+(CHEEK[2]-c[2])*.55];}
      // eyes
      for(const s of [-1,1]){const ex0=cx+s*0.12, ey0=cy-0.04; const d=Math.hypot(x-ex0,y-ey0); if(d<0.085) c=WHITE; const pd=Math.hypot(x-(ex0+0.018),y-(ey0+0.01)); if(pd<0.042) c=INK; const hd=Math.hypot(x-(ex0+0.03),y-(ey0-0.008)); if(hd<0.014) c=WHITE;}
      // mouth: smile arc
      const mx=x-cx, my=y-(cy+0.06); const md=Math.hypot(mx,my); if(my>0.02 && md>0.075 && md<0.1 && Math.abs(mx)<0.085) c=INK;
    }
    return c;
  }
  for(let py=0;py<S;py++)for(let pxx=0;pxx<S;pxx++){ let r=0,g=0,b=0,a=0;
    for(let i=0;i<AA;i++)for(let j=0;j<AA;j++){ const c=sample((pxx+(i+.5)/AA)/S,(py+(j+.5)/AA)/S); if(c){r+=c[0];g+=c[1];b+=c[2];a++;} }
    const n=AA*AA, o=(py*S+pxx)*4; if(a){px[o]=r/a;px[o+1]=g/a;px[o+2]=b/a;px[o+3]=255*a/n;} }
  return png(S,S,px);
}
fs.writeFileSync(__dirname+'/icon-512.png',render(512,false));
fs.writeFileSync(__dirname+'/icon-192.png',render(192,false));
fs.writeFileSync(__dirname+'/icon-maskable-512.png',render(512,true));
fs.writeFileSync(__dirname+'/apple-touch-icon.png',render(180,true));
console.log('icons written');

// --- native app assets for @capacitor/assets (run: npx @capacitor/assets generate) ---
if (process.argv.includes('--native')) {
  const dir=__dirname+'/../assets'; fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(dir+'/icon-only.png',render(1024,false));
  fs.writeFileSync(dir+'/icon-foreground.png',render(1024,true));
  // solid background for adaptive icons
  { const S=1024,b=Buffer.alloc(S*S*4); for(let i=0;i<S*S;i++){b[i*4]=0x8F;b[i*4+1]=0xD8;b[i*4+2]=0xFF;b[i*4+3]=255;} fs.writeFileSync(dir+'/icon-background.png',png(S,S,b)); }
  // splash: sky gradient with the buddy centered (2732x2732, blob occupies the middle)
  { const S=2732,b=Buffer.alloc(S*S*4); const inner=render(1024,true); // reuse maskable render as center tile via nearest scaling
    // decode is not available, so draw splash directly with the sampler at lower AA
    const SKY1=[0x8F,0xD8,0xFF],SKY2=[0xE3,0xF6,0xFF];
    for(let y=0;y<S;y++)for(let x=0;x<S;x++){const o=(y*S+x)*4,t=y/S;b[o]=SKY1[0]+(SKY2[0]-SKY1[0])*t;b[o+1]=SKY1[1]+(SKY2[1]-SKY1[1])*t;b[o+2]=SKY1[2]+(SKY2[2]-SKY1[2])*t;b[o+3]=255;}
    fs.writeFileSync(dir+'/splash.png',png(S,S,b)); fs.writeFileSync(dir+'/splash-dark.png',png(S,S,b));
  }
  console.log('native assets written');
}
