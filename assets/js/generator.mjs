/** Offline deterministic template, not an AI model. Input never leaves the browser. */
export function cleanText(value,max=220){return String(value??'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max)}
export function splitItems(value,maxItems=8){return String(value??'').split(/[\n;,]+/).map(v=>cleanText(v,160)).filter(Boolean).slice(0,maxItems)}
export function buildJobSheet({title,sector,mission,activities,skills,reporting}={}){
 const role=cleanText(title,110),domain=cleanText(sector,110),goal=cleanText(mission,400),boss=cleanText(reporting,110);
 if(!role||!goal)throw new Error('Renseignez au minimum l’intitulé du poste et sa finalité.');
 const duties=splitItems(activities),abilities=splitItems(skills);
 const bullets=xs=>xs.length?xs.map(x=>'- '+x).join('\n'):'- À définir et à valider';
 return `FICHE DE POSTE — BROUILLON À VALIDER\n\nINTITULÉ\n${role}\n\nDOMAINE / SECTEUR\n${domain||'À préciser'}\n\nFINALITÉ DU POSTE\n${goal}\n\nMISSIONS ET ACTIVITÉS\n${bullets(duties)}\n\nCOMPÉTENCES PROFESSIONNELLES À VÉRIFIER\n${bullets(abilities)}\n\nRATTACHEMENT / COLLABORATIONS\n${boss||'À définir'}\n\nOBJECTIFS ET CRITÈRES DE RÉUSSITE\n- Définir des résultats observables liés aux missions\n- Préciser les moyens et les conditions de réalisation\n- Vérifier les attentes avec le responsable concerné\n\nPOINTS DE VIGILANCE\n- Distinguer compétences indispensables et souhaitables\n- Vérifier les formulations non discriminatoires\n- Adapter aux règles du pays et aux accords applicables\n- Relire et approuver le document avant toute diffusion\n\nGénéré localement par RH·XR, à partir des champs saisis. Ce modèle déterministe n’est ni un avis juridique ni une évaluation d’une personne.`;
}
