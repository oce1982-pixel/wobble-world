// Copies the app files into www/ (the folder Capacitor bundles into the native apps).
const fs=require('fs'),path=require('path');
fs.rmSync('www',{recursive:true,force:true}); fs.mkdirSync('www/icons',{recursive:true});
for(const f of ['index.html','privacy.html','terms.html','manifest.webmanifest','sw.js']) fs.copyFileSync(f,path.join('www',f));
for(const f of fs.readdirSync('icons').filter(f=>f.endsWith('.png'))) fs.copyFileSync(path.join('icons',f),path.join('www/icons',f));
console.log('www/ ready');
