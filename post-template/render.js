const p=require('/tmp/claude-0/-home-user/a53374f7-50ea-58c9-b258-757816ad6d2d/scratchpad/engine/node_modules/puppeteer-core');
const V=[['post-template-green','أخبار الطيران','',false],['post-template-breaking','عاجل','amber',false],['post-template-empty-pill','','',false],['post-template-transparent','','',true]];
(async()=>{const b=await p.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox'],headless:true});
for(const [name,label,cls,t] of V){for(const s of [2,1]){const pg=await b.newPage();await pg.setViewport({width:1080,height:1080,deviceScaleFactor:s});await pg.goto('file://'+__dirname+'/post.html');
await pg.evaluate((label,cls,t)=>{document.getElementById('pill').textContent=label;document.getElementById('pill').className='pill '+cls;if(!label)document.getElementById('pill').style.visibility=label===''&&!t?'visible':'visible';if(t){document.body.classList.add('t');document.querySelector('.wm').style.display='none';}},label,cls,t);
await pg.evaluate('document.fonts.ready');await new Promise(r=>setTimeout(r,400));
await pg.screenshot({path:__dirname+'/'+name+(s===2?'-2160':'-1080')+'.png',omitBackground:t});await pg.close();}}
await b.close();})();
