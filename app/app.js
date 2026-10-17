const C={},A={};
const PAGES=[['home','Home'],['daily','Daily'],['timer','Timer'],['routine','Routine'],['stats','Statistics'],['syllabus','Syllabus'],['classes','Classes'],['settings','Settings']];
let cur='home';
function layout(){const b=document.body.classList;b.toggle('side',S.settings.layout==='side');b.toggle('sbc',!!S.settings.sbc)}
function go(){cur=location.hash.slice(2)||'home';if(!C[cur])cur='home';layout();
$('#nav').innerHTML=PAGES.map(p=>`<a href="#/${p[0]}" class="${p[0]===cur?'on':''}">${p[1]}</a>`).join('');
$('#view').innerHTML=C[cur].render();C[cur].init&&C[cur].init()}
window.addEventListener('hashchange',()=>{document.body.classList.remove('menu');go();window.scrollTo(0,0)});
window.addEventListener('DOMContentLoaded',go);
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(el&&A[el.dataset.a])A[el.dataset.a](el.dataset,el)});
document.addEventListener('change',e=>{const el=e.target.closest('[data-c]');if(el&&A[el.dataset.c])A[el.dataset.c](el.value,el)});
A.menu=()=>document.body.classList.toggle('menu');
A.sbtoggle=()=>{S.settings.sbc=!S.settings.sbc;save();layout()};
setInterval(()=>{if(cur==='home')go()},30000);
