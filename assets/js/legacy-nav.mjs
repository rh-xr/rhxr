/** Add public portal links to the existing Lot 0 experience, without rewriting its simulation engine. */
const nav=document.querySelector('.nav');
if(nav){
 const modules=Array.from(nav.querySelectorAll('a')).find(a=>a.textContent.includes('Modules et parcours'));
 if(modules){modules.href='./formation.html';modules.innerHTML='<span aria-hidden="true">▦</span>Formation & XR';}
 for(const [href,label,icon] of [['./ressources.html','Comprendre les RH','▤'],['./bibliotheque.html','Documentation','▣'],['./ia.html','AI Studio','✦'],['./experiences/rhxr-v14-1/index.html','Bureau 3D V14.1','◎']]){
  const a=document.createElement('a');a.href=href;a.innerHTML='<span aria-hidden="true">'+icon+'</span>'+label;nav.append(a);
 }
}
