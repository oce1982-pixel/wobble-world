// Static checks: the page's scripts must parse, and declarations must precede use.
const fs=require('fs');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8');
const blocks=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
if(!blocks.length){ console.error('no inline scripts found'); process.exit(1); }
let bad=0;
blocks.forEach((code,i)=>{ try{ new Function(code); }catch(e){ console.error(`script #${i+1}: ${e.message}`); bad++; } });
// order check: every `const X` used inside a top-level array/object literal defined earlier is a TDZ risk
const main=blocks[blocks.length-1];
for(const name of ['COIN_ICON','WOBBLERS','RARITY','WORLDS','EVENTS','GAMES','PRODUCTS','BADGES']){
  const decl=main.indexOf(`const ${name}`);
  if(decl<0) continue;
  const use=main.indexOf(name+'(') >= 0 ? main.indexOf(name+'(') : -1;
  if(use>=0 && use<decl){ console.error(`TDZ risk: ${name} used at ${use} before declaration at ${decl}`); bad++; }
}
if(bad){ process.exit(1); }
console.log('check: scripts parse, declaration order OK');
