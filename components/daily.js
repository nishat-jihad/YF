const D={k:dkey()};
const dlbl=k=>{const t=dkey();return k===t?'আজ':k<t?'আগের দিন (এডিট করা যাবে)':'ভবিষ্যৎ পরিকল্পনা'};
C.daily={render(){const k=D.k,t0=dkey(),lk=!!S.locked[k],tk=getDay(k),g=targetOf(k),st=sumDay(k),plan=tk.reduce((a,x)=>a+(+x.target||0),0),dn=tk.filter(x=>x.done).length;
const strip=[...Array(9)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-2+i);const kk=dkey(d),n=getDay(kk).length;
return`<button class="dc ${kk===k?'on':''} ${kk===t0?'t':''}" data-a="dgo" data-k="${kk}"><div class="lab">${DN[d.getDay()].slice(0,3)}</div><b>${d.getDate()}</b><div class="lab">${n?n+' টাস্ক':'—'}</div></button>`}).join('');
return`<div class="ph"><div><h1>Daily Tracker</h1><p class="sub">${pd(k).toLocaleDateString('bn-BD',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · <span class="tag ${k===t0?'slf':'cls'}">${dlbl(k)}</span></p></div>
<div class="row"><button class="btn ghost sm" data-a="dshift" data-n="-1" aria-label="Previous day">‹</button><input type="date" value="${k}" data-c="dpick" style="width:auto" aria-label="Pick date"><button class="btn ghost sm" data-a="dshift" data-n="1" aria-label="Next day">›</button><button class="btn ghost sm" data-a="dgo" data-k="${t0}">Today</button></div></div>
<div class="strip">${strip}</div>
<div class="g3" style="margin:16px 0"><div class="card"><div class="k">এই দিনের টার্গেট ${lk?'':'<button class="lnk" data-a="dtarget">Set</button>'}</div><div class="n">${g} ঘণ্টা</div><div class="prog"><i style="width:${g?Math.min(100,st/(g*3600)*100):0}%"></i></div><div class="k" style="margin-top:6px">${dm(st)} পড়া হয়েছে</div></div>
<div class="card"><div class="k">টাস্ক সম্পন্ন</div><div class="n">${dn} / ${tk.length}</div><div class="prog"><i style="width:${tk.length?dn/tk.length*100:0}%;background:var(--ok)"></i></div></div>
<div class="card"><div class="k">টাস্কের মোট সময়</div><div class="n">${plan} ঘণ্টা</div></div></div>
<div class="row" style="margin-bottom:14px">${lk?'<span class="tag ok">Saved permanently</span><span class="lab">এই দিনের তথ্য আর বদলানো যাবে না।</span>':`<button class="btn" data-a="dadd">Add task</button><button class="btn ghost" data-a="dreload">Load from routine</button>${k<=t0?'<button class="btn green" data-a="dlock">Save day permanently</button>':''}`}</div>
${ttable(tk,'d','data-k="'+k+'"',lk?{ro:1}:{chk:1})}`}};
A.dgo=d=>{D.k=d.k;go()};
A.dpick=v=>{if(v){D.k=v;go()}};
A.dshift=d=>{const x=pd(D.k);x.setDate(x.getDate()+ +d.n);D.k=dkey(x);go()};
A.dtarget=()=>lockd()||modal('Target for '+D.k,[{k:'h',l:'Study target (hours)',t:'number',v:targetOf(D.k)}],v=>{S.targets[D.k]=Math.max(0,+v.h);save();go()});
A.dadd=()=>lockd()||modal('Add task',TF(),v=>{mutDay(D.k).push({id:uid(),...v,done:false});save();go()});
A.dedit=d=>{if(lockd())return;const t=mutDay(D.k).find(x=>x.id===d.id);modal('Edit task',TF(t),v=>{Object.assign(t,v);save();go()})};
A.ddel=d=>{if(lockd())return;undoable('Task deleted',()=>{S.days[D.k]=mutDay(D.k).filter(x=>x.id!==d.id)})};
A.dtog=d=>{if(lockd())return;const t=mutDay(D.k).find(x=>x.id===d.id);t.done=!t.done;save();go()};
A.dreload=()=>{if(lockd())return;if(confirm('Replace this day\'s tasks with your weekly routine?')){delete S.days[D.k];save();go()}};
A.dstart=d=>{const t=getDay(D.k).find(x=>x.id===d.id),cl=t.type==='Class',m=cl?T.cls:T.self;if(SUBJ.includes(t.sub))m.sub=t.sub;m.ch=t.what||'';T.v=cl?'cls':'self';location.hash='#/timer'};
A.dopen=d=>{D.k=d.k;location.hash='#/daily'};
const lockd=()=>S.locked[D.k]&&(toast('এই দিনটি পাকাপাকিভাবে সেভ করা, বদলানো যাবে না'),true);
A.dlock=()=>{if(S.locked[D.k]||D.k>dkey())return;if(confirm('এই দিনের সব তথ্য পাকাপাকিভাবে সেভ হবে। পরে আর এডিট বা ডিলিট করা যাবে না। নিশ্চিত?')){mutDay(D.k);S.locked[D.k]=1;save();go()}};
