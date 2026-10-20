const $=(s,r=document)=>r.querySelector(s);
const pad=n=>String(n).padStart(2,'0');
const uid=()=>Math.random().toString(36).slice(2,9);
const dkey=d=>{d=d||new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const pd=k=>new Date(k+'T00:00:00');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SUBJ=['Physics','Chemistry','Biology','Math','English'];
const SC={Physics:'#3b82f6',Chemistry:'#f59e0b',Biology:'#16a34a',Math:'#8b5cf6',English:'#ec4899',Other:'#9ca3af'};
const PC={Physics:'#93c5fd',Chemistry:'#fcd34d',Biology:'#86efac',Math:'#c4b5fd',English:'#f9a8d4'};
const DP=['#93c5fd','#86efac','#c4b5fd','#fcd34d','#f9a8d4','#fdba74','#67e8f9'];
const DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const WEEK=[6,0,1,2,3,4,5];
const H=s=>(s/3600).toFixed(1);
const dm=s=>{const m=Math.round(s/60);if(m<1)return s>0?'<1 min':'0 min';const h=Math.floor(m/60),r=m%60;return h?h+' h'+(r?' '+r+' min':''):r+' min'};
const dh=s=>{const m=Math.round(s/60),h=Math.floor(m/60),r=m%60;return h?h+'h'+(r?' '+r+'m':''):r+'m'};
const clock=s=>{s=Math.max(0,Math.floor(s));return pad(Math.floor(s/3600))+':'+pad(Math.floor(s%3600/60))+':'+pad(s%60)};
const opts=(a,v)=>a.map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('');
const t12=t=>{const[h,m]=String(t||'00:00').split(':').map(Number);return(h%12||12)+':'+pad(m)+' '+(h>=12?'PM':'AM')};
const TF=(v={})=>[{k:'type',l:'Type',o:['Self Study','Class'],v:v.type},{k:'sub',l:'Subject',o:[...SUBJ,'Other'],v:v.sub||'Other'},{k:'what',l:'What to study (chapter / topic)',v:v.what,r:0},{k:'start',l:'Start time',t:'time',v:v.start||'07:00'},{k:'end',l:'End time',t:'time',v:v.end||'08:00'},{k:'target',l:'Hours (study target)',t:'number',v:v.target||1}];
const dur=(a,b)=>{const m=x=>{const[h,n]=x.split(':').map(Number);return h*60+n};let d=m(b)-m(a);if(d<=0)d+=1440;return +(d/60).toFixed(2)};
const sv_=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC={dl:sv_('<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v3h16v-3"/>'),up:sv_('<path d="M12 15V3m0 0L8 7m4-4l4 4M4 17v3h16v-3"/>'),warn:sv_('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h.01"/>'),db:sv_('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>')};
function left(ds){const n=new Date(),t=new Date(ds+'T00:00:00');if(isNaN(t)||t<=n)return null;
let m=(t.getFullYear()-n.getFullYear())*12+t.getMonth()-n.getMonth();
const add=k=>new Date(n.getFullYear(),n.getMonth()+k,n.getDate(),n.getHours(),n.getMinutes());
if(add(m)>t)m--;const r=t-add(m);
return{m,d:Math.floor(r/864e5),h:Math.floor(r%864e5/36e5),total:Math.floor((t-n)/864e5)}}
function fld(f){const n=f.k;let c;
if(f.t==='time'){const[h,m]=String(f.v||'07:00').split(':').map(Number),ms=[...Array(12)].map((_,i)=>i*5);if(!ms.includes(m))ms.push(m),ms.sort((a,b)=>a-b);
c=`<div class="tp"><select name="${n}_h" aria-label="Hour">${[...Array(12)].map((_,i)=>`<option ${i+1===(h%12||12)?'selected':''}>${i+1}</option>`).join('')}</select><select name="${n}_m" aria-label="Minute">${ms.map(v=>`<option ${v===m?'selected':''}>${pad(v)}</option>`).join('')}</select><select name="${n}_p" aria-label="AM or PM">${opts(['AM','PM'],h>=12?'PM':'AM')}</select></div>`}
else if(f.o)c=`<select name="${n}">${opts(f.o,f.v)}</select>`;
else if(f.t==='area')c=`<textarea name="${n}" rows="6" required>${esc(f.v)}</textarea>`;
else c=`<input name="${n}" type="${f.t||'text'}" step="any" value="${esc(f.v)}" ${f.r===0?'':'required'}>`;
return`<label>${f.l}${c}</label>`}
function modal(title,fs,cb){const d=document.createElement('dialog');
d.innerHTML=`<form method="dialog"><h3>${title}</h3>${fs.map(fld).join('')}<div class="row"><button value="x" class="btn ghost" formnovalidate>Cancel</button><button value="ok" class="btn">Save</button></div></form>`;
document.body.append(d);d.showModal();
d.onclose=()=>{if(d.returnValue==='ok'){const o=Object.fromEntries(new FormData($('form',d)));
fs.forEach(f=>{if(f.t==='time'){let h=+o[f.k+'_h']%12;if(o[f.k+'_p']==='PM')h+=12;o[f.k]=pad(h)+':'+o[f.k+'_m']}});cb(o)}d.remove()}}
function toast(m,u){document.querySelectorAll('.toast').forEach(x=>x.remove());const t=document.createElement('div');t.className='toast';t.textContent=m;if(u){const b=document.createElement('button');b.className='tundo';b.textContent='Undo';b.onclick=()=>{t.remove();u()};t.append(b)}document.body.append(t);setTimeout(()=>t.remove(),u?7000:2200)}
function beep(){try{const c=new AudioContext(),o=c.createOscillator();o.connect(c.destination);o.frequency.value=880;o.start();setTimeout(()=>{o.stop();c.close()},450)}catch(e){}}
function download(name,obj){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,1)],{type:'application/json'}));a.download=name;a.click()}
function ttable(l,pf,ex,o={}){l=l.slice().sort((a,b)=>(a.start||'').localeCompare(b.start||''));
if(!l.length)return`<p class="empty">${o.slot?'এই দিনের জন্য কোনো স্লট নেই। Add slot দিয়ে যোগ করো।':'কোনো টাস্ক নেই। Add task দিয়ে যোগ করো।'}</p>`;
const cn={};
const rows=l.map(x=>{const ty=x.type||'Self Study',n=cn[ty]=(cn[ty]||0)+1,lab=ty+' '+pad(n),id=esc(x.id),
tag=`<span class="tag ${ty==='Class'?'cls':'slf'}">${esc(ty)}</span>`,tm=`<td class="tm">${t12(x.start)} – ${t12(x.end)}</td>`,
act=`<td class="ac">${o.chk?`<button class="lnk g" data-a="${pf}start" ${ex} data-id="${id}">Start</button>`:''}<button class="lnk" data-a="${pf}edit" ${ex} data-id="${id}">Edit</button><button class="lnk red" data-a="${pf}del" ${ex} data-id="${id}">Delete</button></td>`;
if(o.slot)return`<tr>${tm}<td class="ty">${tag}</td><td class="wr"><b>${lab}</b>${x.what?' · '+esc(x.what):''}</td><td class="tg">${esc(x.target)}h</td>${act}</tr>`;
const st=o.chk?`<button class="chk" data-a="${pf}tog" ${ex} data-id="${id}" aria-label="Toggle done">${x.done?'✓':''}</button>`:`<span class="tag ${x.done?'ok':'pen'}">${x.done?'Done':'Pending'}</span>`;
const task=x.what?`${x.sub&&x.sub!=='Other'?`<b>${esc(x.sub)}</b> · `:''}${esc(x.what)}`:`<b>${lab}</b> <span class="lab">· কী পড়বে Edit দিয়ে বসাও</span>`;
return`<tr class="${x.done?'done':''}"><td class="st">${st}</td>${tm}<td class="ty">${tag}</td><td class="wr tk">${task}</td><td class="tg">${esc(x.target)}h</td>${o.ro?'':act}</tr>`}).join('');
const head=o.slot?'<th>Time</th><th>Type</th><th>Slot</th><th>Hours</th><th></th>':`<th class="st">Status</th><th>Time</th><th>Type</th><th>Task</th><th>Target</th>${o.ro?'':'<th></th>'}`;
return`<div class="card tbl"><table class="tt"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`}
