const Y={s:'Physics'};
const SK=[['c','Class'],['s','Study'],['p','Practice'],['r','Revision']];
const spc=l=>l.length?Math.round(l.reduce((a,x)=>a+x.c+x.s+x.p+x.r,0)/(4*l.length)*100):0;
C.syllabus={render(){const l=S.syllabus[Y.s],all=SUBJ.flatMap(s=>S.syllabus[s]),full=l.filter(x=>x.c+x.s+x.p+x.r===4).length;
return`<div class="ph"><div><h1>Syllabus Checklist</h1><p class="sub">প্রতিটি চ্যাপ্টারে Class, Study, Practice আর Revision আলাদাভাবে টিক দাও।</p></div><button class="btn" data-a="yadd">Add chapters</button></div>
<div class="tabs">${SUBJ.map(s=>`<button class="tb ${Y.s===s?'on':''}" data-a="ytab" data-s="${s}"><i class="dot" style="background:${SC[s]}"></i>${s} <span class="lab">${spc(S.syllabus[s])}%</span></button>`).join('')}</div>
<div class="g3" style="margin-bottom:16px"><div class="card"><div class="k">সব বিষয়ে অগ্রগতি</div><div class="n">${spc(all)}%</div><div class="prog"><i style="width:${spc(all)}%"></i></div></div>
<div class="card"><div class="k">${Y.s} অগ্রগতি</div><div class="n">${spc(l)}%</div><div class="prog"><i style="width:${spc(l)}%;background:${SC[Y.s]}"></i></div></div>
<div class="card"><div class="k">${Y.s} · সম্পূর্ণ চ্যাপ্টার</div><div class="n">${full} / ${l.length}</div></div></div>
${l.length?`<div class="card tbl"><table><tr><th>Chapter</th>${SK.map(k=>`<th class="ck">${k[1]}</th>`).join('')}<th>Progress</th><th></th></tr>${l.map(x=>{const p=Math.round((x.c+x.s+x.p+x.r)*25);return`<tr><td class="wr"><b>${esc(x.name)}</b></td>${SK.map(k=>`<td class="ck"><button class="chk ${x[k[0]]?'on':''}" data-a="ytog" data-k="${k[0]}" data-id="${esc(x.id)}" aria-label="${k[1]}">${x[k[0]]?'✓':''}</button></td>`).join('')}<td style="min-width:90px"><div class="prog" style="margin:0"><i style="width:${p}%;background:${SC[Y.s]}"></i></div></td><td class="ac"><button class="lnk" data-a="yedit" data-id="${esc(x.id)}">Edit</button><button class="lnk red" data-a="ydel" data-id="${esc(x.id)}">Delete</button></td></tr>`}).join('')}</table></div>`:'<p class="empty">এই বিষয়ে কোনো চ্যাপ্টার নেই। Add chapters দিয়ে পুরো তালিকা একসাথে পেস্ট করতে পারো।</p>'}`}};
const yf=id=>S.syllabus[Y.s].find(x=>x.id===id);
A.ytab=d=>{Y.s=d.s;go()};
A.yadd=()=>modal('Add chapters – '+Y.s,[{k:'t',l:'Chapter names (এক লাইনে একটা)',t:'area'}],v=>{v.t.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).forEach(n=>S.syllabus[Y.s].push({id:uid(),name:n,c:0,s:0,p:0,r:0}));save();go()});
A.yedit=d=>{const c=yf(d.id);modal('Edit chapter',[{k:'name',l:'Chapter',v:c.name}],v=>{c.name=v.name;save();go()})};
A.ydel=d=>undoable('Chapter deleted',()=>{S.syllabus[Y.s]=S.syllabus[Y.s].filter(x=>x.id!==d.id)});
A.ytog=d=>{const c=yf(d.id);c[d.k]=c[d.k]?0:1;save();go()};
