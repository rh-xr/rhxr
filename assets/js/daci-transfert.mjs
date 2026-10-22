import {parseDraft} from './daci-editor-core.mjs';
import {reviewPreflight} from './daci-review-core.mjs';
import {createHandoff,parseHandoff,verifyHandoff,handoffReport,MAX_HANDOFF_BYTES} from './daci-handoff-core.mjs';
const $=id=>document.getElementById(id);
let draft=null,packet=null,lastCheck=null;
const nav=[['index.html','Accueil'],['parcours.html','Parcours RH'],['daci.html','Bibliothèque DACI'],['daci-studio.html','Studio DACI'],['daci-transfert.html','Transmission DACI'],['reseau.html','Réseau de connaissances']];
const escape=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
$('app').innerHTML='<div class="shell"><aside class="side"><div><a class="brand" href="index.html">RH<span>·</span>XR <small>LAB</small></a><div class="brand-sub">Transmission documentaire · contrôle local</div></div><div class="navlabel">RESSOURCES</div><nav class="nav" aria-label="Navigation principale">'+nav.map(([href,label])=>'<a href="'+href+'" class="'+(href==='daci-transfert.html'?'active':'')+'">'+escape(label)+'</a>').join('')+'</nav><div class="side-foot">Aucune publication et aucune approbation depuis cet écran.</div></aside><main class="main"><header class="top"><span>RH·XR / <strong>Transmission DACI</strong></span><span class="pill neutral">Prépublication</span></header><div class="eyebrow">Document connecté · traçabilité</div><h1 class="title">Dossier de transmission DACI</h1><p class="lead">Préparez un brouillon pour la revue indépendante et vérifiez qu’un dossier reçu contient la même version du document.</p><div class="notice"><strong>Attention :</strong> SHA-256 vérifie une cohérence de contenu, mais ne prouve ni l’identité du relecteur, ni une signature, ni une autorisation de publication. Aucun fichier n’est envoyé à un serveur.</div><div class="daci-handoff-grid"><section class="panel"><h2>1. Préparer le dossier</h2><label class="daci-handoff-label">Brouillon JSON exporté du Studio<input id="draft-file" type="file" class="input" accept=".json,application/json"></label><div id="draft-status" class="notice" role="status" aria-live="polite">Aucun brouillon importé.</div><label class="daci-handoff-label">Objectif et périmètre de la revue<textarea id="purpose" class="input" rows="3" maxlength="500" placeholder="Décrivez les vérifications RH et documentaires nécessaires."></textarea></label><label class="daci-handoff-label">Rôle du relecteur pressenti (facultatif)<input id="role" class="input" maxlength="120" placeholder="Formateur RH, documentaliste…"></label><div class="btnrow"><button id="preflight" type="button" class="secondary">Vérifier le brouillon</button><button id="create" type="button" class="primary">Exporter le dossier JSON</button></div><div id="create-status" class="notice" role="status" aria-live="polite">Contrôle préalable non effectué.</div></section><section class="panel"><h2>2. Vérifier un dossier reçu</h2><label class="daci-handoff-label">Dossier de transmission JSON<input id="packet-file" type="file" class="input" accept=".json,application/json"></label><div class="btnrow"><button id="verify" type="button" class="secondary">Contrôler l’intégrité</button><button id="report" type="button" class="secondary" disabled>Exporter le rapport</button></div><div id="verify-status" class="notice" role="status" aria-live="polite">Aucun dossier contrôlé.</div><h3>Contrôle humain indispensable</h3><p>Les sources, les licences, le contexte RH et l’habilitation du relecteur doivent être vérifiés hors de cet outil. Seul un futur système éditorial authentifié pourra gérer une approbation puis une publication.</p><a class="textlink" href="daci-studio.html">← Revenir au Studio DACI</a></section></div><footer class="footer">Aucun stockage distant · Aucune IA générative · Aucune décision RH individuelle.</footer></main></div>';
const status=(id,msg,ok=false)=>{const el=$(id);el.textContent=msg;el.dataset.kind=ok?'ok':'info';};
async function readFile(input,max){const file=input.files?.[0];if(!file)throw Error('Sélectionnez un fichier JSON.');if(file.size>max)throw Error('Fichier trop volumineux.');return file.text();}
function download(name,text,mime){const url=URL.createObjectURL(new Blob([text],{type:mime}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);}
$('draft-file').addEventListener('change',async()=>{
 draft=null;
 try{draft=parseDraft(await readFile($('draft-file'),200_000));status('draft-status','Brouillon '+draft.documentId+' · révision '+draft.revision+' importé.',true);status('create-status','Effectuez le contrôle préalable avant de préparer la revue.');}
 catch(e){status('draft-status','Import refusé : '+e.message);}
});
$('preflight').addEventListener('click',()=>{
 if(!draft){status('create-status','Importez d’abord un brouillon.');return;}
 const result=reviewPreflight(draft);
 status('create-status',result.readyForReview?'Structure recevable pour soumission à une revue humaine ; aucune approbation.':'Préparation incomplète : '+result.errors.join(' ; '),result.readyForReview);
});
$('create').addEventListener('click',async()=>{
 if(!draft){status('create-status','Importez d’abord un brouillon.');return;}
 try{const handoff=await createHandoff(draft,{purpose:$('purpose').value,reviewerRole:$('role').value});download('RHXR-'+draft.documentId+'-r'+draft.revision+'.handoff.json',JSON.stringify(handoff,null,2),'application/json;charset=utf-8');status('create-status','Dossier non approuvé exporté localement : prêt à être transmis à un véritable relecteur.',true);}
 catch(e){status('create-status','Export refusé : '+e.message);}
});
$('packet-file').addEventListener('change',async()=>{
 packet=null;lastCheck=null;$('report').disabled=true;
 try{packet=parseHandoff(await readFile($('packet-file'),MAX_HANDOFF_BYTES));status('verify-status','Dossier chargé. Lancez le contrôle d’intégrité.');}
 catch(e){status('verify-status','Import refusé : '+e.message);}
});
$('verify').addEventListener('click',async()=>{
 if(!packet){status('verify-status','Importez d’abord un dossier de transmission.');return;}
 lastCheck=await verifyHandoff(packet);$('report').disabled=false;
 status('verify-status',lastCheck.valid?'Structure et SHA-256 cohérents ; revue humaine NON EFFECTUÉE.':'Contrôle échoué : '+lastCheck.errors.join(' ; '),lastCheck.valid);
});
$('report').addEventListener('click',()=>{
 if(lastCheck)download('RHXR-DACI-rapport-verification.md',handoffReport(lastCheck),'text/markdown;charset=utf-8');
});
