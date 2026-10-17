const W={o:0};
C.stats={render(){
const n=new Date();n.setDate(n.getDate()-(n.getDay()+1)%7+W.o*7);
const rng=off=>[...Array(7)].map((_,i)=>{const d=new Date(n);d.setDate(n.getDate()+off+i);return d});
const days=rng(0),keys=days.map(dkey),pk=rng(-7).map(dkey),tk=dkey();
const vals=keys.map(sumDay),tg=keys.map(k=>targetOf(k)*3600),tot=vals.reduce((a,b)=>a+b,0);
const prev=S.sessions.filter(x=>pk.includes(x.date)).reduce((a,x)=>a+x.sec,0);
const mx=Math.max(...vals,...tg,3600),bi=vals.indexOf(Math.max(...vals));
const sub=SUBJ.map(s=>[s,S.sessions.filter(x=>keys.includes(x.date)&&x.sub===s).reduce((a,x)=>a+x.sec,0)]);
const sm=Math.max(...sub.map(x=>x[1]),1),diff=tot-prev;
const f=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const ws=new Date();ws.setDate(ws.getDate()-(ws.getDay()+1)%7);const cells=[];
for(let w=11;w>=0;w--)for(let i=0;i<7;i++){const d=new Date(ws);d.setDate(ws.getDate()-w*7+i);const k=dkey(d),s=sumDay(k),g=targetOf(k)*3600,r=g?s/g:0;
cells.push(`<i class="hc" style="background:${d>new Date()?'transparent':!s?'#e5e7eb':r<.5?'#bfdbfe':r<1?'#60a5fa':'#2563eb'}" title="${k}: ${H(s)}h"></i>`)}
const log=S.sessions.slice(-8).reverse();
return`<div class="ph"><div><h1>Statistics</h1><p class="sub">দিন বনাম পড়ার ঘণ্টা · ডটেড দাগ = সেই দিনের টার্গেট</p></div>
<div class="row"><button class="btn ghost sm" data-a="wk" data-o="-1">‹ Prev</button><b>${f(days[0])} – ${f(days[6])}</b><button class="btn ghost sm" data-a="wk" data-o="1" ${W.o>=0?'disabled':''}>Next ›</button></div></div>
<div class="card"><div class="plot">${days.map((d,i)=>`<div class="col ${keys[i]===tk?'t':''}"><div class="bw"><div class="gl" style="bottom:${tg[i]/mx*100}%"></div><div class="cbar" style="height:${vals[i]/mx*100}%;background:${DP[i]}">${vals[i]?`<span>${H(vals[i])}</span>`:''}</div></div><div style="padding-top:6px">${DN[d.getDay()].slice(0,3)}</div></div>`).join('')}</div></div>
<div class="g3" style="margin-top:16px"><div class="card"><div class="k">এই সপ্তাহে মোট</div><div class="n">${H(tot)} ঘণ্টা</div></div>
<div class="card"><div class="k">আগের সপ্তাহের সাথে</div><div class="n" style="color:${diff>=0?'var(--ok)':'var(--rd)'}">${diff>=0?'+':'−'}${H(Math.abs(diff))} ঘণ্টা</div></div>
<div class="card"><div class="k">সেরা দিন</div><div class="n">${tot?DN[days[bi].getDay()]:'—'}</div></div></div>
<h2>Subject breakdown</h2><div class="card">${sub.map(x=>`<div class="sb"><span><i class="dot" style="background:${SC[x[0]]}"></i>${x[0]}</span><div class="prog"><i style="width:${x[1]/sm*100}%;background:${PC[x[0]]}"></i></div><span>${H(x[1])}h</span></div>`).join('')}</div>
<h2>শেষ ১২ সপ্তাহ</h2><div class="card"><div class="hm">${cells.join('')}</div><div class="lab" style="margin-top:10px">গাঢ় নীল = টার্গেট পূরণ, হালকা = আংশিক</div></div>
<h2>Study log</h2>${log.length?`<div class="card tbl"><table><tr><th>Date</th><th>Subject</th><th>Chapter</th><th>Type</th><th>Time</th><th></th></tr>${log.map(x=>`<tr><td>${esc(x.date)}</td><td><i class="dot" style="background:${SC[x.sub]||SC.Other}"></i>${esc(x.sub)}</td><td class="wr">${esc(x.ch||'—')}</td><td>${x.type==='cls'?'Class':'Self Study'}</td><td>${Math.round(x.sec/60)} min</td><td class="ac"><button class="lnk red" data-a="ldel" data-id="${esc(x.id)}">Delete</button></td></tr>`).join('')}</table></div>`:'<p class="empty">এখনো কোনো সেশন নেই।</p>'}`}};
A.wk=d=>{W.o=Math.min(0,W.o+ +d.o);go()};
A.ldel=d=>{S.sessions=S.sessions.filter(x=>x.id!==d.id);save();go()};
