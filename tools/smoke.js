// Loads the built page in headless Chrome and fails if it did not render or threw.
const {spawn}=require('child_process'),http=require('http'),fs=require('fs'),path=require('path');
const CANDIDATES=[process.env.CHROME,'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium-browser','/usr/bin/chromium'].filter(Boolean);
const CHROME=CANDIDATES.find(p=>{try{return require('fs').existsSync(p)}catch(e){return false}});
if(!CHROME){ console.error('no Chrome found; set CHROME=/path/to/chrome'); process.exit(1); }
const root=path.join(__dirname,'..','www');
const T={'.html':'text/html','.js':'text/javascript','.webmanifest':'application/manifest+json','.png':'image/png'};
const PORT=8791;
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';fs.readFile(path.join(root,p),(e,d)=>{if(e){r.statusCode=404;r.end('');return}r.setHeader('Content-Type',T[path.extname(p)]||'application/octet-stream');r.end(d)})}).listen(PORT);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function dom(url){
  const out=path.join(require('os').tmpdir(),'smoke-'+Date.now()+'.html'); const tmp=fs.mkdtempSync(require('os').tmpdir()+'/smokeprof-');
  const p=spawn(CHROME,['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--user-data-dir='+tmp,'--virtual-time-budget=4000','--dump-dom',url],{stdio:['ignore',fs.openSync(out,'w'),'ignore']});
  const t0=Date.now(); while(p.exitCode===null&&Date.now()-t0<45000) await sleep(200);
  try{p.kill('SIGKILL')}catch(e){} const html=fs.readFileSync(out,'utf8'); fs.rmSync(out,{force:true});
  try{fs.rmSync(tmp,{recursive:true,force:true,maxRetries:5})}catch(e){}
  return html;
}
(async()=>{
  let fail=0;
  const checks=[
    ['home','', h=>[[/<svg[^>]*id="heroSvg"/.test(h),'buddy not rendered'],[/class="world /.test(h),'worlds not rendered'],[/Wobbler of the Day/.test(h),'daily section missing'],[/id="wodPick"|Choose |Playing as |Not hatched/.test(h),'daily card empty']]],
    ['collection','?tab=me', h=>[[(h.match(/class="slot /g)||[]).length>50,'collection not rendered'],[/class="badge /.test(h),'badges not rendered']]],
    ['shop','?tab=shop', h=>[[/data-buy=/.test(h),'shop items not rendered']]],
    ['extras','?tab=shop&iaptest=1', h=>[[true,'']]],
    ['play','?tab=play', h=>[[/data-game="star"/.test(h),'game list not rendered']]],
  ];
  for(const [label,q,fn] of checks){
    const h=await dom(`http://localhost:${PORT}/${q}`);
    const err=h.match(/data-jserror="([^"]*)"/);
    if(err){ console.error(`✗ ${label}: uncaught JS error — ${err[1]}`); fail++; continue; }
    const problems=fn(h).filter(([ok])=>!ok).map(([,msg])=>msg);
    if(problems.length){ console.error(`✗ ${label}: ${problems.join('; ')}`); fail++; }
    else console.log(`✓ ${label}`);
  }
  srv.close();
  if(fail){ console.error(`\nsmoke test FAILED (${fail})`); process.exit(1); }
  console.log('\nsmoke test passed');
})().catch(e=>{console.error(e);srv.close();process.exit(1)});
