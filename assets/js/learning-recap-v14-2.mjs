/** RH·XR V14.2 — pedagogical recap generator; no account, scoring profile or data upload.
 * Content comes only from authored fictional scenario steps and educational feedback.
 */
const safe=value=>String(value??'').replaceAll('\r',' ').trim();
export function buildLearningRecap(view){
  if(!view?.ending||!Array.isArray(view.history)||!view.caseFile||!view.debrief)
    throw Error('Le bilan est disponible uniquement à la fin de la mission.');
  const lines=[
    '# RH·XR — Fiche pédagogique de transfert',
    '',
    '> Démonstrateur fictif. Exercice de formation uniquement ; ne pas utiliser pour des décisions RH individuelles.',
    '',
    '## Situation',
    '',
    '**Mission :** '+safe(view.title),
    '',
    safe(view.setting),
    '',
    '**Rôle :** '+safe(view.caseFile.role),
    '',
    '**Support pédagogique :** '+safe(view.caseFile.artefact),
    '',
    '## Objectifs et compétences',
    '',
    safe(view.objective),
    '',
    ...view.competencies.map(x=>'- '+safe(x)),
    '',
    '## Retour sur les décisions',
    ''
  ];
  for(let i=0;i<view.history.length;i++){
    const decision=view.history[i];
    lines.push('### Décision '+(i+1)+' — '+safe(decision.node_id),'',
      '**Choix :** '+safe(decision.choice_id),
      '',
      '**Retour :** '+safe(decision.feedback),'');
    if(decision.citation){
      lines.push('**Référence pédagogique du corpus fictif :** '+safe(decision.citation),'');
    }
  }
  lines.push('## Bilan formatif et transfert','',
    ...view.debrief.takeaways.map(x=>'- '+safe(x)),
    '',
    '**Exercice à réaliser :** '+safe(view.debrief.recommendedAction),
    '',
    '**Point de vigilance :** '+safe(view.debrief.warning),
    '',
    '---',
    '',
    'RH·XR / DACI — Fiche générée localement, sans transmission vers un serveur.',
    '');
  return lines.join('\n');
}
export function recapFilename(view){
  const safeId=String(view?.mission||'mission').replace(/[^a-z0-9_-]/gi,'').slice(0,40)||'mission';
  return 'rhxr-daci-fiche-'+safeId+'.md';
}
