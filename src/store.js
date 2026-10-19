const KEY='yourfuture.v1';
const DEF=()=>({exams:[{id:'a',name:'Dhaka University',date:'2026-12-12'},{id:'b',name:'CU',date:'2027-01-30'},{id:'c',name:'GST',date:'2027-03-27'}],
routine:{0:[],1:[],2:[],3:[],4:[],5:[],6:[]},days:{},targets:{},locked:{},sessions:[],classes:Object.fromEntries(SUBJ.map(x=>[x,[]])),syllabus:Object.fromEntries(SUBJ.map(x=>[x,[]])),settings:{goal:4,layout:'top',sbc:false}});
let S;try{S={...DEF(),...JSON.parse(localStorage.getItem(KEY))}}catch(e){S=DEF()}
S.settings={...DEF().settings,...S.settings};
function fixAll(){if(!S.targets||typeof S.targets!=='object')S.targets={};if(!S.locked||typeof S.locked!=='object')S.locked={};if(!S.classes||typeof S.classes!=='object')S.classes={};if(!S.syllabus||typeof S.syllabus!=='object')S.syllabus={};
SUBJ.forEach(s=>{let v=S.classes[s];if(!Array.isArray(v))v=v>0?[{id:uid(),name:'General',n:+v}]:[];
S.classes[s]=v.map(x=>x.total==null?{id:x.id,name:x.name,total:+x.n||0,done:0}:x);
let y=S.syllabus[s];if(!Array.isArray(y))y=[];
S.syllabus[s]=y.map(x=>x.c==null?{id:x.id,name:x.name,c:+!!x.done,s:+!!x.done,p:+!!x.done,r:+!!x.done}:x)})}
fixAll();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Could not save data')}};
const sumDay=k=>S.sessions.reduce((a,x)=>x.date===k?a+x.sec:a,0);
function addSession(sec,sub,type,ch){S.sessions.push({id:uid(),date:dkey(),sec:Math.round(sec),sub,type,ch:ch||''});save();toast('Session saved')}
const genDay=k=>(S.routine[pd(k).getDay()]||[]).map(t=>({...t,id:'r'+t.id,done:false}));
const getDay=k=>S.days[k]||genDay(k);
const mutDay=k=>S.days[k]||(S.days[k]=genDay(k));
const targetOf=k=>S.targets[k]!=null?+S.targets[k]:+S.settings.goal;
function streak(){const by={};S.sessions.forEach(x=>by[x.date]=(by[x.date]||0)+x.sec);
const ok=d=>{const k=dkey(d),g=targetOf(k);return g>0&&(by[k]||0)>=g*3600};
let n=0,d=new Date();if(!ok(d))d.setDate(d.getDate()-1);
while(ok(d)){n++;d.setDate(d.getDate()-1)}return n}
