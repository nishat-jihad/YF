C.home={render(){
const k=dkey(),g=targetOf(k),t=sumDay(k),tk=getDay(k),dn=tk.filter(x=>x.done).length;
const ex=[...S.exams].sort((a,b)=>a.date.localeCompare(b.date));
const up=ex.filter(e=>left(e.date)),nx=up[0],L=nx&&left(nx.date);
const ns=Object.keys(S.days).filter(d=>d>k&&S.days[d].length).sort()[0];
const rows=ex.map(e=>{const l=left(e.date);return`<tr><td><b>${esc(e.name)}</b></td><td>${new Date(e.date+'T00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</td><td>${l?(l.m?l.m+' মাস ':'')+l.d+' দিন '+l.h+' ঘণ্টা':'<span class="lab">শেষ</span>'}</td></tr>`}).join('');
return`<section class="hero"><div><h1>লক্ষ্য ঠিক রাখো,<br>প্রতিদিন একটু একটু করে এগোও।</h1>
<p class="sub">${nx?`${esc(nx.name)} পরীক্ষার আর <b>${L.total}</b> দিন বাকি। আজকের পড়াটা শুরু করে ফেলো।`:'Settings থেকে পরীক্ষার তারিখ যোগ করো।'}</p>
<a class="btn lg" href="#/timer">Start studying</a></div>
<div class="count">${nx?`<div class="lab">${esc(nx.name)}</div><div class="cn">${L.total}</div><div class="lab">দিন বাকি</div>${up.length>1?`<div class="cmini">${up.slice(1).map(e=>`<div><span>${esc(e.name)}</span><b>${left(e.date).total} দিন বাকি</b></div>`).join('')}</div>`:''}`:`<div class="lab">কোনো পরীক্ষা যোগ করা নেই</div><a class="btn ghost sm" href="#/settings" style="margin-top:12px">Add exam</a>`}</div></section>
<div class="g3"><div class="card"><div class="k">আজকের পড়া · টার্গেট ${g} ঘণ্টা</div><div class="n">${H(t)} ঘণ্টা</div><div class="prog"><i style="width:${g?Math.min(100,t/(g*3600)*100):0}%"></i></div></div>
<div class="card"><div class="k">Study streak</div><div class="n">${streak()} দিন</div><div class="k">প্রতিদিনের টার্গেট পূরণ করলে বাড়ে</div></div>
<div class="card"><div class="k">আজকের টাস্ক</div><div class="n">${dn} / ${tk.length}</div><a class="lnk" href="#/daily">Open tracker</a></div></div>
<h2>Exam Countdown</h2><div class="card tbl"><table><tr><th>University</th><th>Exam date</th><th>Time remaining</th></tr>${rows||'<tr><td colspan="3">কোনো পরীক্ষা যোগ করা হয়নি।</td></tr>'}</table></div>
<h2>আজকের পরিকল্পনা</h2>${tk.length?ttable(tk,'d','',{ro:1}):`<p class="empty">আজকের জন্য কোনো টাস্ক নেই।${ns?` <b>${pd(ns).toLocaleDateString('bn-BD',{day:'numeric',month:'long'})}</b> তারিখের জন্য ${S.days[ns].length}টি টাস্ক সেভ করা আছে। <button class="lnk" data-a="dopen" data-k="${ns}">দেখো</button>`:' Daily Tracker থেকে যোগ করো।'}</p>`}
<div class="vs"><span class="lab">ভর্তি সংক্রান্ত সকল তথ্যের জন্য ভিজিট করো।</span><a class="btn green sm" href="https://admissioninfo.vercel.app" target="_blank" rel="noopener">Visit site</a></div>`}};
