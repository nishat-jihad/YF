const K={s:'Physics'};
const kr=l=>l.reduce((a,x)=>a+Math.max(0,x.total-x.done),0);
C.classes={render(){const l=S.classes[K.s],tot=SUBJ.reduce((a,s)=>a+kr(S.classes[s]),0),tt=l.reduce((a,x)=>a+x.total,0),dn=l.reduce((a,x)=>a+x.done,0);
return`<div class="ph"><div><h1>Online Classes</h1><p class="sub">প্রতিটি বিষয়ের চ্যাপ্টারে মোট ক্লাস কয়টা আর কয়টা দেখা হয়ে গেছে তা রাখো।</p></div><button class="btn" data-a="kadd">Add chapter</button></div>
<div class="tabs">${SUBJ.map(s=>`<button class="tb ${K.s===s?'on':''}" data-a="ktab" data-s="${s}"><i class="dot" style="background:${SC[s]}"></i>${s} <span class="lab">${kr(S.classes[s])} বাকি</span></button>`).join('')}</div>
<div class="g3" style="margin-bottom:16px"><div class="card"><div class="k">সব বিষয়ে মোট বাকি</div><div class="n">${tot} টি</div></div><div class="card"><div class="k">${K.s} · বাকি</div><div class="n">${kr(l)} টি</div></div><div class="card"><div class="k">${K.s} · দেখা হয়েছে</div><div class="n">${dn} / ${tt}</div><div class="prog"><i style="width:${tt?dn/tt*100:0}%;background:${SC[K.s]}"></i></div></div></div>
${l.length?`<div class="card tbl"><table><tr><th>Chapter</th><th>Total</th><th>Done</th><th>Remaining</th><th>Progress</th><th></th></tr>${l.map(x=>{const r=Math.max(0,x.total-x.done);return`<tr class="${r?'':'done'}"><td class="wr tk"><b>${esc(x.name)}</b></td><td>${x.total}</td><td><button class="rb" data-a="kdec" data-id="${esc(x.id)}" aria-label="Decrease done">−</button> <b class="cn2">${x.done}</b> <button class="rb" data-a="kinc" data-id="${esc(x.id)}" aria-label="Increase done">+</button></td><td><b>${r}</b></td><td style="min-width:110px"><div class="prog" style="margin:0"><i style="width:${x.total?x.done/x.total*100:0}%;background:${SC[K.s]}"></i></div></td><td class="ac"><button class="lnk" data-a="kedit" data-id="${esc(x.id)}">Edit</button><button class="lnk red" data-a="kdel" data-id="${esc(x.id)}">Delete</button></td></tr>`}).join('')}</table></div>`:'<p class="empty">এই বিষয়ে কোনো চ্যাপ্টার নেই। Add chapter দিয়ে শুরু করো।</p>'}`}};
const CF=(v={})=>[{k:'name',l:'Chapter',v:v.name},{k:'total',l:'Total classes',t:'number',v:v.total==null?1:v.total},{k:'done',l:'Already watched',t:'number',v:v.done||0}];
const cl_=v=>{const t=Math.max(0,Math.round(+v.total)),d=Math.min(t,Math.max(0,Math.round(+v.done)));return{name:v.name,total:t,done:d}};
const kf=id=>S.classes[K.s].find(x=>x.id===id);
A.ktab=d=>{K.s=d.s;go()};
A.kadd=()=>modal('Add chapter – '+K.s,CF(),v=>{S.classes[K.s].push({id:uid(),...cl_(v)});save();go()});
A.kedit=d=>{const c=kf(d.id);modal('Edit chapter',CF(c),v=>{Object.assign(c,cl_(v));save();go()})};
A.kdel=d=>{S.classes[K.s]=S.classes[K.s].filter(x=>x.id!==d.id);save();go()};
A.kinc=d=>{const c=kf(d.id);c.done=Math.min(c.total,c.done+1);save();go()};
A.kdec=d=>{const c=kf(d.id);c.done=Math.max(0,c.done-1);save();go()};
