// Captures store screenshots with headless Chrome. Usage: node store/shoot.js
const {spawn}=require('child_process'),http=require('http'),fs=require('fs'),path=require('path');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root=path.join(__dirname,'..');
const T={'.html':'text/html','.js':'text/javascript','.webmanifest':'application/manifest+json','.png':'image/png'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';fs.readFile(path.join(root,p),(e,d)=>{if(e){r.statusCode=404;r.end();return}r.setHeader('Content-Type',T[path.extname(p)]||'application/octet-stream');r.end(d)})}).listen(8766);
const shots=[['home','?demo=1'],['play','?demo=1&tab=play'],['star','?demo=1&game=star'],['shop','?demo=1&tab=shop'],['room','?demo=1&tab=room'],['jump','?demo=1&game=jump'],['me','?demo=1&tab=me']];
const devices={iphone:[430,932,3],android:[360,780,3]}; // -> 1290x2796 and 1080x2340
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function shoot(url,w,h,scale,out,budget=3000){
  fs.rmSync(out,{force:true}); const tmp=fs.mkdtempSync('/tmp/wobshot-');
  const p=spawn(CHROME,['--headless=new','--disable-gpu','--hide-scrollbars','--no-first-run','--user-data-dir='+tmp,`--window-size=${w},${h}`,`--force-device-scale-factor=${scale}`,`--virtual-time-budget=${budget}`,'--screenshot='+out,url],{stdio:'ignore'});
  const t0=Date.now(); while(!fs.existsSync(out)&&Date.now()-t0<45000) await sleep(300);
  await sleep(500); p.kill('SIGKILL'); try{fs.rmSync(tmp,{recursive:true,force:true,maxRetries:5,retryDelay:200});}catch(e){}
  if(!fs.existsSync(out)) throw new Error('no screenshot for '+url);
}
(async()=>{
  for(const [dev,[w,h,s]] of Object.entries(devices)) for(const [name,q] of shots){ const out=path.join(__dirname,'screenshots',dev,`${name}.png`); await shoot(`http://localhost:8766/store/frame.html?w=${w}&h=${h}&s=${s}&url=`+encodeURIComponent('/'+q),w*s,h*s,1,out); console.log('✓',dev,name); }
  await shoot('http://localhost:8766/store/feature.html',1024,500,1,path.join(__dirname,'feature-graphic.png')); console.log('✓ feature graphic');
  srv.close();
})().catch(e=>{console.error(e.message);srv.close();process.exit(1)});
