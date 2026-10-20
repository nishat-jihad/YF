const KEY='yourfuture.v1',VER=3,DK=/^\d{4}-\d{2}-\d{2}$/,TM=/^\d\d:\d\d$/;
const isO=x=>x&&typeof x==='object'&&!Array.isArray(x);
const DEF=()=>({v:VER,exams:[{id:'a',name:'Dhaka University',date:'2026-12-12'},{id:'b',name:'CU',date:'2027-01-30'},{id:'c',name:'GST',date:'2027-03-27'}],
routine:{0:[],1:[],2:[],3:[],4:[],5:[],6:[]},days:{},targets:{},locked:{},sessions:[],classes:Object.fromEntries(SUBJ.map(x=>[x,[]])),syllabus:Object.fromEntries(SUBJ.map(x=>[x,[]])),settings:{goal:4,layout:'top',sbc:false,fsDark:false,lastBackup:null}});
let S;
try{const raw=localStorage.getItem(KEY);let old=null;
if(raw){try{old=JSON.parse(raw)}catch(e){localStorage.setItem(KEY+'.corrupt',raw)}}
if(isO(old)&&old.v!==VER)localStorage.setItem(KEY+'.bak',raw); /* safety copy before a schema upgrade */
S={...DEF(),...(isO(old)?old:{})}}catch(e){S=DEF()}
function fixAll(){S.v=VER;
['targets','locked','days','classes','syllabus'].forEach(k=>{if(!isO(S[k]))S[k]={}});
for(const k in S.days)if(!Array.isArray(S.days[k]))delete S.days[k];
if(!isO(S.routine))S.routine={};for(let i=0;i<7;i++)if(!Array.isArray(S.routine[i]))S.routine[i]=[];
if(!Array.isArray(S.exams))S.exams=[];if(!Array.isArray(S.sessions))S.sessions=[];
S.settings={...DEF().settings,...(isO(S.settings)?S.settings:{})};
SUBJ.forEach(s=>{let v=S.classes[s];if(!Array.isArray(v))v=v>0?[{id:uid(),name:'General',n:+v}]:[];
S.classes[s]=v.filter(isO).map(x=>x.total==null?{id:x.id||uid(),name:String(x.name||''),total:+x.n||0,done:0}:{...x,id:x.id||uid()});
let y=S.syllabus[s];if(!Array.isArray(y))y=[];
S.syllabus[s]=y.filter(isO).map(x=>x.c==null?{id:x.id||uid(),name:String(x.name||''),c:+!!x.done,s:+!!x.done,p:+!!x.done,r:+!!x.done}:{...x,id:x.id||uid()})})}
fixAll();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast('Could not save data')}};
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
/* import validation: keep only well-formed parts of a backup */
function sanitize(d){const o={},str=x=>typeof x==='string';if(!isO(d))return o;
if(Array.isArray(d.exams))o.exams=d.exams.filter(e=>isO(e)&&str(e.name)&&DK.test(e.date)).map(e=>({id:str(e.id)?e.id:uid(),name:e.name,date:e.date}));
if(isO(d.routine)){o.routine={};for(let i=0;i<7;i++)o.routine[i]=Array.isArray(d.routine[i])?d.routine[i].filter(x=>isO(x)&&TM.test(x.start)&&TM.test(x.end)).map(x=>({...x,id:str(x.id)?x.id:uid(),target:+x.target||0})):[]}
if(Array.isArray(d.sessions))o.sessions=d.sessions.filter(x=>isO(x)&&DK.test(x.date)&&+x.sec>0&&str(x.sub)).map(x=>({id:str(x.id)?x.id:uid(),date:x.date,sec:Math.round(+x.sec),sub:x.sub,type:x.type==='cls'?'cls':'self',ch:str(x.ch)?x.ch:''}));
if(isO(d.days)){o.days={};for(const k in d.days)if(DK.test(k)&&Array.isArray(d.days[k]))o.days[k]=d.days[k].filter(x=>isO(x)&&TM.test(x.start)&&TM.test(x.end)).map(x=>({...x,id:str(x.id)?x.id:uid()}))}
['targets','locked'].forEach(k=>{if(isO(d[k])){o[k]={};for(const x in d[k])if(DK.test(x))o[k][x]=k==='targets'?Math.max(0,+d[k][x]||0):1}});
if(isO(d.classes))o.classes=d.classes;
if(isO(d.syllabus))o.syllabus=d.syllabus;
if(isO(d.settings))o.settings={goal:Math.max(.5,+d.settings.goal||4)};
return o}
/* run a destructive change with a 7-second Undo */
function undoable(msg,fn){const snap=JSON.stringify(S);fn();save();go();toast(msg,()=>{S=JSON.parse(snap);fixAll();save();go()})}
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
