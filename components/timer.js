const T={v:'self',self:{mode:'sw',acc:0,st:0,sub:'Physics',ph:'work',w:25,b:5,done:0,ch:''},cls:{acc:0,st:0,sub:'Physics',ch:''}};
const el=t=>t.acc+(t.st?(Date.now()-t.st)/1e3:0);
const sv=()=>{const s=T.self;return s.mode==='pom'?Math.ceil((s.ph==='work'?s.w:s.b)*60-el(s)):el(s)};
function ticker(f){let ok=0;const fb=()=>setInterval(f,250);try{const w=new Worker(URL.createObjectURL(new Blob(['setInterval(()=>postMessage(0),250)'])));w.onmessage=()=>{ok=1;f()};w.onerror=()=>{if(!ok)fb()};setTimeout(()=>{if(!ok)fb()},1500)}catch(e){fb()}}
let pipWin=null,pipV=null,pipDraw=null;
const pipSrc=()=>(T.cls.st&&!T.self.st)||(!T.self.st&&T.v==='cls')?T.cls:T.self;
const pipText=()=>clock(pipSrc()===T.cls?el(T.cls):sv());
async function pipOpen(){const dk=!!S.settings.fsDark;
try{
if(window.documentPictureInPicture){const w=await documentPictureInPicture.requestWindow({width:380,height:200}),d=w.document;
d.title='Timer';d.body.style.cssText='margin:0;height:100vh;display:grid;place-items:center;font-weight:700;font-family:"Noto Sans Bengali",system-ui,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:-.04em;font-size:min(17vw,40vh);background:'+(dk?'#000;color:#fff':'#fff;color:#111827');
d.body.innerHTML='<div id="p"></div>';const up=()=>{d.getElementById('p').textContent=pipText()};up();w.setInterval(up,250);
pipWin=w;w.addEventListener('pagehide',()=>{pipWin=null});return}
const cv=document.createElement('canvas');cv.width=480;cv.height=270;const cx=cv.getContext('2d');
pipDraw=()=>{cx.fillStyle=dk?'#000':'#fff';cx.fillRect(0,0,480,270);cx.fillStyle=dk?'#fff':'#111827';cx.font='700 96px system-ui,sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(pipText(),240,135)};pipDraw();
const v=document.createElement('video');v.muted=true;v.playsInline=true;v.srcObject=cv.captureStream(10);await v.play();
if(v.requestPictureInPicture)await v.requestPictureInPicture();else if(v.webkitSetPresentationMode)v.webkitSetPresentationMode('picture-in-picture');else throw 0;
pipV=v;v.addEventListener('leavepictureinpicture',()=>{pipV=null;pipDraw=null})
}catch(e){pipDraw=null;toast('এই ব্রাউজারে Picture in Picture চালু করা যায়নি। Chrome বা Edge ব্যবহার করো।')}}
A.tpip=()=>{if(pipWin)pipWin.close();else if(pipV&&document.pictureInPictureElement)document.exitPictureInPicture();else pipOpen()};
const pp=()=>{const s=T.self,L=(s.ph==='work'?s.w:s.b)*60;return Math.min(100,el(s)/L*100)};
function paint(){pipDraw&&pipDraw();const pb=$('#t-bar');pb&&(pb.style.width=pp()+'%');const a=$('#t-self'),b=$('#t-cls'),f=$('#fs');a&&(a.textContent=clock(sv()));b&&(b.textContent=clock(el(T.cls)));
f&&!f.hidden&&($('#fs-t').textContent=clock(sv()));
const r=T.self.st?clock(sv()):T.cls.st?clock(el(T.cls)):'';document.title=r?r+' · Your Future':'Your Future'}
function openFS(){const f=$('#fs');f.hidden=false;f.dataset.soft='';f.classList.toggle('dk',!!S.settings.fsDark);$('#fs-t').textContent=clock(sv());const r=f.requestFullscreen||f.webkitRequestFullscreen;
if(r)Promise.resolve(r.call(f)).catch(()=>{f.dataset.soft='1'});else f.dataset.soft='1'}
function closeFS(){const f=$('#fs');if(f.hidden)return;f.hidden=true;if(document.fullscreenElement)document.exitFullscreen();go()}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)closeFS()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeFS()});
document.addEventListener('click',e=>{const f=$('#fs');if(!f.hidden&&f.dataset.soft==='1'&&f.contains(e.target))closeFS()});
ticker(()=>{const s=T.self;
if(s.mode==='pom'&&s.st){const L=(s.ph==='work'?s.w:s.b)*60;if(el(s)>=L){if(s.ph==='work'){addSession(L,s.sub,'self',s.ch);s.done++}s.ph=s.ph==='work'?'break':'work';s.acc=0;s.st=Date.now();beep();if(cur==='timer')go()}}
paint()});
C.timer={render(){const s=T.self,c=T.cls,p=s.mode==='pom',self=T.v==='self',t=self?s:c;
const chs=[...new Set([...(S.syllabus[t.sub]||[]).map(x=>x.name),...(S.classes[t.sub]||[]).map(x=>x.name)])];
const form=`<div class="row c fm"><select data-c="tsub" data-t="${T.v}" aria-label="Subject">${opts(SUBJ,t.sub)}</select><input list="chl" placeholder="Chapter / topic (optional)" value="${esc(t.ch)}" data-c="tch" data-t="${T.v}" style="max-width:280px" aria-label="Chapter"><datalist id="chl">${chs.map(x=>`<option value="${esc(x)}">`).join('')}</datalist></div>`;
const theme=`<div class="seg" title="Fullscreen &amp; PiP theme" role="group" aria-label="Fullscreen and PiP theme"><button class="${S.settings.fsDark?'':'on'}" data-a="fstheme" data-v="light" title="Light theme" aria-label="Light theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button><button class="${S.settings.fsDark?'on':''}" data-a="fstheme" data-v="dark" title="Dark theme" aria-label="Dark theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button></div>`;
const ctl=`<div class="row c"><button class="btn green lg" data-a="tgo" data-t="${T.v}">${t.st?'Pause':(t.acc?'Resume':'Start')}</button><button class="btn ghost lg" data-a="treset" data-t="${T.v}">Reset</button><button class="btn lg" data-a="tsave" data-t="${T.v}">Finish &amp; Save</button><button class="btn ghost lg ico" data-a="tpip" title="Picture in Picture" aria-label="Picture in Picture"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><rect x="12" y="12" width="7" height="5" rx="1" fill="currentColor"/></svg></button>${theme}</div>`;
const td=S.sessions.filter(x=>x.date===dkey());
return`<div class="ph"><div><h1>Timer</h1><p class="sub">Self Study শুরু করলে টাইমার ফুল স্ক্রিনে চলবে। বের হতে Esc চাপো।</p></div>
<div class="seg"><button class="${self?'on':''}" data-a="tview" data-v="self">Self Study</button><button class="${self?'':'on'}" data-a="tview" data-v="cls">Class</button></div></div>
${form}
${self?`<div class="card big"><div class="seg"><button class="${p?'':'on'}" data-a="tmode" data-m="sw">Stopwatch</button><button class="${p?'on':''}" data-a="tmode" data-m="pom">Pomodoro</button></div>
<div class="lab" style="margin-top:14px">${p?(s.ph==='work'?'Focus time':'Break time'):'Self Study'}</div><div class="bigtime" id="t-self">${clock(sv())}</div>${p?`<div class="prog" style="max-width:420px;margin:0 auto 6px"><i id="t-bar" style="width:${pp()}%"></i></div>`:''}

${p?`<div class="row c" style="margin-top:0"><button class="chip ${s.w==25?'on':''}" data-a="tpre" data-w="25" data-b="5">25 / 5</button><button class="chip ${s.w==45?'on':''}" data-a="tpre" data-w="45" data-b="10">45 / 10</button><button class="chip ${s.w==50?'on':''}" data-a="tpre" data-w="50" data-b="10">50 / 10</button><span class="lab">Completed: ${s.done}</span></div>`:''}</div><div class="tc">${ctl}</div>`
:`<div class="card big" style="max-width:600px;margin:0 auto"><div class="lab">Class Timer</div><div class="midtime" id="t-cls">${clock(el(c))}</div></div><div class="tc">${ctl}</div>`}
<h2>আজকের সেশন · ${dm(sumDay(dkey()))}</h2>
${td.length?`<div class="card tbl"><table><tr><th>Subject</th><th>Chapter</th><th>Type</th><th>Time</th></tr>${td.slice().reverse().map(x=>`<tr><td><i class="dot" style="background:${SC[x.sub]||SC.Other}"></i>${esc(x.sub)}</td><td class="wr">${esc(x.ch||'—')}</td><td>${x.type==='cls'?'Class':'Self Study'}</td><td>${dm(x.sec)}</td></tr>`).join('')}</table></div>`:'<p class="empty">আজ এখনো কোনো সেশন সেভ হয়নি।</p>'}`}};
A.tview=d=>{T.v=d.v;go()};
A.tmode=d=>{const s=T.self;if(s.mode!==d.m){s.mode=d.m;s.acc=0;s.st=0;s.ph='work';go()}};
A.tpre=d=>{const s=T.self;s.w=+d.w;s.b=+d.b;s.acc=0;s.st=0;s.ph='work';go()};
A.tsub=(v,e)=>{const t=T[e.dataset.t];t.sub=v;t.ch='';go()};
A.tch=(v,e)=>{T[e.dataset.t].ch=v.trim()};
A.tgo=d=>{const t=T[d.t];if(t.st){t.acc=el(t);t.st=0}else{t.st=Date.now();if(d.t==='self')openFS()}go()};
A.treset=d=>{const t=T[d.t];if(el(t)>10&&!confirm('Reset timer? This session will not be saved.'))return;t.acc=0;t.st=0;if(d.t==='self')t.ph='work';go()};
A.tsave=d=>{const t=T[d.t],sec=el(t),brk=d.t==='self'&&t.mode==='pom'&&t.ph!=='work';
if(!brk&&sec>=10)addSession(sec,t.sub,d.t,t.ch);t.acc=0;t.st=0;if(d.t==='self')t.ph='work';go()};
A.fstheme=d=>{S.settings.fsDark=d.v==='dark';save();go()};
