C.settings={render(){const ex=[...S.exams].sort((a,b)=>a.date.localeCompare(b.date));
return`<div class="ph"><div><h1>Settings</h1><p class="sub">পরীক্ষা, লক্ষ্য আর ডাটা ব্যাকআপ এখান থেকে।</p></div></div>
<div class="card pop b4"><h3 style="margin:0 0 4px">Default daily target</h3><p class="sub" style="font-size:14px">Daily Tracker-এ কোনো দিনের আলাদা টার্গেট না দিলে এটা ধরা হবে। Streak প্রতিদিনের নিজ নিজ টার্গেট ধরে গোনা হয়।</p><input type="number" min="0.5" step="0.5" value="${S.settings.goal}" data-c="goal" style="max-width:140px;margin-top:10px" aria-label="Daily goal hours"></div>
<h2>Layout</h2><div class="card"><p class="sub" style="font-size:14px;margin-bottom:12px">ডেস্কটপে মেনু ওপরে (Top navbar) থাকবে নাকি বাঁ পাশে (Sidebar)। মোবাইলে সবসময় হ্যামবার্গার মেনু।</p><div class="seg"><button class="${S.settings.layout!=='side'?'on':''}" data-a="layout" data-v="top">Top navbar</button><button class="${S.settings.layout==='side'?'on':''}" data-a="layout" data-v="side">Sidebar</button></div></div>
<h2>Exams</h2><div class="list">${ex.map(e=>`<div class="item"><div class="grow"><div class="t">${esc(e.name)}</div><div class="m">${esc(e.date)}</div></div><button class="lnk" data-a="eedit" data-id="${esc(e.id)}">Edit</button><button class="lnk red" data-a="edel" data-id="${esc(e.id)}">Delete</button></div>`).join('')}</div>
<div class="row" style="margin-top:14px"><button class="btn" data-a="eadd">Add exam</button></div>
<div class="sh"><span class="it sm">${IC.db}</span><h2>Backup &amp; Share</h2></div>
<p class="sub" style="margin-bottom:18px">ডাটা শুধু এই ব্রাউজারে থাকে। ${S.settings.lastBackup?'শেষ ব্যাকআপ: '+new Date(S.settings.lastBackup).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+'।':'এখনো ব্যাকআপ নেওয়া হয়নি।'} JSON ফাইল দিয়ে এক ডিভাইস থেকে আরেকটায় বা বন্ধুর কাছে পাঠাতে পারো।</p>
<div class="g2"><div class="card pop bkc"><div class="it">${IC.dl}</div><h3>Download Backup</h3><p><b>Export all:</b> সব ডাটা, stats সহ।<br><b>Export setup:</b> শুধু exams, routine, syllabus, classes আর goal। বন্ধুকে দিতে এটা ভালো।</p>
<button class="btn full" data-a="xall">${IC.dl}Export all</button><button class="btn ghost full" data-a="xsetup">${IC.dl}Export setup</button></div>
<div class="card pop bkc"><div class="it green">${IC.up}</div><h3>Import Backup</h3><p>আগে Export করা ফাইল দিলে তার সব ডাটা এখানে চলে আসবে। একই নামের বর্তমান ডাটা বদলে যাবে।</p>
<button class="btn green full" data-a="imp">${IC.up}Import file</button></div></div>
<div class="card danger"><div class="row"><span class="it red sm">${IC.warn}</span><h3>Danger Zone</h3></div><p>সব স্টাডি সেশন আর streak মুছে যাবে। এটা আর ফেরানো যাবে না।</p><button class="btn ghost red" data-a="delstats">Delete statistics</button></div>`},
init(){$('#file').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
f.text().then(t=>{try{const j=JSON.parse(t);if(j.app!=='yourfuture'||!j.data)throw 0;
if(!confirm('Import will replace the matching data. Continue?'))return;
const o=sanitize(j.data);if(!Object.keys(o).length)throw 0;
if(!confirm('Import will replace: '+Object.keys(o).join(', ')+'. Continue?'))return;
try{localStorage.setItem(KEY+'.preimport',JSON.stringify(S))}catch(e){}
if(o.settings)o.settings={...S.settings,...o.settings};
Object.assign(S,o);fixAll();save();toast('Imported');go()}catch(x){toast('Invalid backup file')}})}}};
const EF=(v={})=>[{k:'name',l:'University',v:v.name},{k:'date',l:'Exam date',t:'date',v:v.date}];
A.goal=v=>{S.settings.goal=Math.max(.5,+v||4);save()};
A.eadd=()=>modal('Add exam',EF(),v=>{S.exams.push({id:uid(),...v});save();go()});
A.eedit=d=>{const e=S.exams.find(x=>x.id===d.id);modal('Edit exam',EF(e),v=>{Object.assign(e,v);save();go()})};
A.edel=d=>undoable('Exam deleted',()=>{S.exams=S.exams.filter(x=>x.id!==d.id)});
A.xall=()=>{S.settings.lastBackup=new Date().toISOString();save();download('yourfuture-full-'+dkey()+'.json',{app:'yourfuture',v:1,data:S})};
A.xsetup=()=>{const{days,sessions,targets,locked,...d}=S;download('yourfuture-setup-'+dkey()+'.json',{app:'yourfuture',v:1,data:d})};
A.imp=()=>$('#file').click();
A.delstats=()=>{if(confirm('Delete all study statistics? This cannot be undone.')){undoable('Statistics deleted',()=>{S.sessions=[]})}};
A.layout=d=>{S.settings.layout=d.v;save();go()};
