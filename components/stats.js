const W={o:0},LG={open:null,all:false};
C.stats={render(){
const n=new Date();n.setDate(n.getDate()-(n.getDay()+1)%7+W.o*7);
const rng=off=>[...Array(7)].map((_,i)=>{const d=new Date(n);d.setDate(n.getDate()+off+i);return d});
const days=rng(0),keys=days.map(dkey),pk=rng(-7).map(dkey),tk=dkey();
const vals=keys.map(sumDay),tg=keys.map(k=>targetOf(k)*3600),tot=vals.reduce((a,b)=>a+b,0);
const prev=S.sessions.filter(x=>pk.includes(x.date)).reduce((a,x)=>a+x.sec,0);
const bi=vals.indexOf(Math.max(...vals));
const M=Math.max(1,Math.ceil(Math.max(...vals,...tg)/3600)),step=[1,2,4,5,10].find(q=>M/q<=5)||20,AH=Math.ceil(M/step)*step,mx=AH*3600;
const ticks=[];for(let t=0;t<=AH;t+=step)ticks.push(t);
const ORD=[...SUBJ,'Other'];
const seg=keys.map(k=>{const o={};S.sessions.forEach(x=>{if(x.date===k){const q=ORD.includes(x.sub)?x.sub:'Other';o[q]=(o[q]||0)+x.sec}});return o});
const sub=SUBJ.map(s=>[s,S.sessions.filter(x=>keys.includes(x.date)&&x.sub===s).reduce((a,x)=>a+x.sec,0)]);
const sm=Math.max(...sub.map(x=>x[1]),1),diff=tot-prev;
const f=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const ws=new Date();ws.setDate(ws.getDate()-(ws.getDay()+1)%7);const cells=[];
for(let w=11;w>=0;w--)for(let i=0;i<7;i++){const d=new Date(ws);d.setDate(ws.getDate()-w*7+i);const k=dkey(d),s=sumDay(k),g=targetOf(k)*3600,r=g?s/g:0;
cells.push(`<i class="hc" style="background:${d>new Date()?'transparent':!s?'#e5e7eb':r<.5?'#bfdbfe':r<1?'#60a5fa':'#2563eb'}" title="${k}: ${dh(s)}"></i>`)}
const byd={};S.sessions.forEach(x=>(byd[x.date]=byd[x.date]||[]).push(x));
const dts=Object.keys(byd).sort().reverse(),shown=LG.all?dts:dts.slice(0,14);
return`<div class="ph"><div><h1>Statistics</h1><p class="sub">দিন বনাম পড়ার ঘণ্টা, রঙ = বিষয় · ডটেড দাগ = সেই দিনের টার্গেট</p></div>
<div class="row"><button class="btn ghost sm" data-a="wk" data-o="-1">‹ Prev</button><b>${f(days[0])} – ${f(days[6])}</b><button class="btn ghost sm" data-a="wk" data-o="1" ${W.o>=0?'disabled':''}>Next ›</button></div></div>
<div class="card"><div class="plot"><div class="yax">${ticks.map(t=>`<span style="bottom:${t/AH*100}%">${t}h</span>`).join('')}</div>${days.map((d,i)=>`<div class="col ${keys[i]===tk?'t':''}"><div class="bw">${ticks.slice(1).map(t=>`<i class="gr" style="bottom:${t/AH*100}%"></i>`).join('')}<div class="gl" style="bottom:${tg[i]/mx*100}%"></div><div class="cbar" style="height:${vals[i]/mx*100}%"><div class="stk">${ORD.filter(q=>seg[i][q]).map(q=>`<i style="height:${seg[i][q]/vals[i]*100}%;background:${SC[q]}" title="${q}: ${dh(seg[i][q])}"></i>`).join('')}</div>${vals[i]?`<span>${dh(vals[i])}</span>`:''}</div></div><div style="padding-top:6px">${DN[d.getDay()].slice(0,3)}</div></div>`).join('')}</div>
<div class="leg">${ORD.map(q=>`<span><i class="dot" style="background:${SC[q]}"></i>${q}</span>`).join('')}</div></div>
<div class="g3" style="margin-top:16px"><div class="card"><div class="k">এই সপ্তাহে মোট</div><div class="n">${dm(tot)}</div></div>
<div class="card"><div class="k">আগের সপ্তাহের সাথে</div><div class="n" style="color:${diff>=0?'var(--ok)':'var(--rd)'}">${diff>=0?'+':'−'}${dm(Math.abs(diff))}</div></div>
<div class="card"><div class="k">সেরা দিন</div><div class="n">${tot?DN[days[bi].getDay()]:'—'}</div></div></div>
<h2>Subject breakdown</h2><div class="card">${sub.map(x=>`<div class="sb"><span><i class="dot" style="background:${SC[x[0]]}"></i>${x[0]}</span><div class="prog"><i style="width:${x[1]/sm*100}%;background:${PC[x[0]]}"></i></div><span>${dh(x[1])}</span></div>`).join('')}</div>
<h2>শেষ ১২ সপ্তাহ</h2><div class="card"><div class="hm">${cells.join('')}</div><div class="lab" style="margin-top:10px">গাঢ় নীল = টার্গেট পূরণ, হালকা = আংশিক</div></div>
<h2>Study log</h2><p class="lab" style="margin:-4px 0 12px">আগের দিনের তথ্য পাকাপাকিভাবে সেভ থাকে, ডিলিট করা যায় না।</p>${dts.length?`<div class="list" style="gap:8px">${shown.map(k=>{const l=byd[k],o=LG.open===k,del=k>=dkey()&&!S.locked[k];return`<div><button class="lgb ${o?'on':''}" data-a="lgopen" data-k="${k}"><span>See your ${pd(k).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})} study log</span><span class="lab">${dm(l.reduce((a,x)=>a+x.sec,0))}</span></button>${o?`<div class="card tbl" style="margin-top:8px"><table><thead><tr><th>Subject</th><th>Chapter</th><th>Type</th><th>Time</th>${del?'<th></th>':''}</tr></thead><tbody>${l.slice().reverse().map(x=>`<tr><td><i class="dot" style="background:${SC[x.sub]||SC.Other}"></i>${esc(x.sub)}</td><td class="wr">${esc(x.ch||'—')}</td><td>${x.type==='cls'?'Class':'Self Study'}</td><td>${dm(x.sec)}</td>${del?`<td class="ac"><button class="lnk red" data-a="ldel" data-id="${esc(x.id)}">Delete</button></td>`:''}</tr>`).join('')}</tbody></table></div>`:''}</div>`}).join('')}</div>${dts.length>14?`<div class="row" style="margin-top:10px"><button class="btn ghost sm" data-a="lgall">${LG.all?'Show less':'Show all dates'}</button></div>`:''}`:'<p class="empty">এখনো কোনো সেশন নেই।</p>'}`}};
A.wk=d=>{W.o=Math.min(0,W.o+ +d.o);go()};
A.ldel=d=>{const x=S.sessions.find(y=>y.id===d.id);if(!x||x.date<dkey()||S.locked[x.date]){toast('আগের দিনের তথ্য ডিলিট করা যায় না');return}undoable('Session deleted',()=>{S.sessions=S.sessions.filter(y=>y.id!==d.id)})};
A.lgopen=d=>{LG.open=LG.open===d.k?null:d.k;go()};
A.lgall=()=>{LG.all=!LG.all;go()};
