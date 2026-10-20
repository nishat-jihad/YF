/* Network-first: always the newest files when online, cached copy when offline. */
const V='yf-v1',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','src/styles.css','src/utils.js','src/store.js','app/app.js','components/home.js','components/daily.js','components/routine.js','components/timer.js','components/stats.js','components/classes.js','components/syllabus.js','components/settings.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
const mine=u.origin===location.origin;if(!mine&&u.hostname!=='fonts.googleapis.com'&&u.hostname!=='fonts.gstatic.com')return;
e.respondWith(fetch(r,mine?{cache:'no-cache'}:undefined).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
