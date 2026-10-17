const R={d:new Date().getDay()};
const rh=(i,ty)=>(S.routine[i]||[]).filter(x=>!ty||(x.type==='Class')===(ty==='Class')).reduce((a,x)=>a+(+x.target||0),0);
const RF=(v={})=>[{k:'type',l:'Type',o:['Class','Self Study'],v:v.type},{k:'start',l:'Start time',t:'time',v:v.start||'07:00'},{k:'end',l:'End time',t:'time',v:v.end||'08:00'}];
C.routine={render(){const wk=WEEK.reduce((a,i)=>a+rh(i),0),l=S.routine[R.d]||[];
return`<div class="ph"><div><h1>Weekly Routine</h1><p class="sub">এখানে শুধু ফরম্যাট রাখো: কখন, Class না Self Study, কত ঘণ্টা। কী পড়বে সেটা Daily Tracker-এ বসাও। সপ্তাহে মোট <b>${+wk.toFixed(2)}</b> ঘণ্টা।</p></div>
<div class="row"><button class="btn ghost" data-a="rcopy">Copy to all days</button><button class="btn" data-a="radd">Add slot</button></div></div>
<div class="tabs">${WEEK.map(i=>`<button class="tb ${R.d===i?'on':''}" data-a="rday" data-d="${i}">${DN[i].slice(0,3)} <span class="lab">${+rh(i).toFixed(2)}h</span></button>`).join('')}</div>
<div class="g3" style="margin-bottom:16px"><div class="card"><div class="k">${DN[R.d]} · মোট</div><div class="n">${+rh(R.d).toFixed(2)} ঘণ্টা</div></div><div class="card"><div class="k">Class</div><div class="n">${+rh(R.d,'Class').toFixed(2)} ঘণ্টা</div></div><div class="card"><div class="k">Self Study</div><div class="n">${+rh(R.d,'Self Study').toFixed(2)} ঘণ্টা</div></div></div>
${ttable(l,'r','data-d="'+R.d+'"',{slot:1})}`}};
A.rday=d=>{R.d=+d.d;go()};
A.radd=()=>modal('Add slot – '+DN[R.d],RF(),v=>{S.routine[R.d].push({id:uid(),type:v.type,start:v.start,end:v.end,target:dur(v.start,v.end)});save();go()});
A.redit=d=>{const t=S.routine[R.d].find(x=>x.id===d.id);modal('Edit slot',RF(t),v=>{Object.assign(t,{type:v.type,start:v.start,end:v.end,target:dur(v.start,v.end)});save();go()})};
A.rdel=d=>{S.routine[R.d]=S.routine[R.d].filter(x=>x.id!==d.id);save();go()};
A.rcopy=()=>{if(confirm('Copy '+DN[R.d]+' routine to all other days? Their current routine will be replaced.')){const src=S.routine[R.d];WEEK.forEach(i=>{if(i!==R.d)S.routine[i]=src.map(x=>({...x,id:uid()}))});save();go()}};
