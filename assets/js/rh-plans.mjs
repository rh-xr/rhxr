/** Trames déterministes, exécutées dans le navigateur. Aucun appel API. */
export const planTypes=[{"id":"entretien","label":"Trame d’entretien structuré"},{"id":"integration","label":"Parcours d’intégration 30 / 60 / 90 jours"},{"id":"formation","label":"Plan de développement des compétences"}];
function scrubText(value){return String(value??"").replace(/[\u0000-\u001f\u007f]/g," ").replace(/\s+/g," ").trim().slice(0,350);}
export function buildRHPlan({kind,role,objective,skills}={}){
 const job=scrubText(role),goal=scrubText(objective);
 const competencyList=String(skills??"").split(/[,;\n]+/).map(scrubText).filter(Boolean).slice(0,8);
 const items=competencyList.length?competencyList:["Une compétence métier à préciser","Une compétence de coopération"];
 if(job.length<3||goal.length<8)throw Error("Précisez un rôle (3 caractères) et un objectif (8 caractères minimum).");
 if(!["entretien","integration","formation"].includes(kind))throw Error("Modèle de document inconnu.");
 let output="RH·XR — DOCUMENT TYPE GÉNÉRÉ LOCALEMENT\n"+
   "Contexte / poste : "+job+"\nObjectif : "+goal+"\n\n";
 if(kind==="entretien"){
  output+="TRAME D’ENTRETIEN STRUCTURÉ\n1. Présenter les missions, le déroulement et le traitement des informations.\n2. Poser des questions de base identiques pour les candidatures comparables :\n";
  output+=items.map((item,i)=>(i+1)+". Compétence : "+item+"\n   Question : Décrivez une situation professionnelle où vous avez mobilisé cette compétence. Qu’avez-vous concrètement réalisé ?\n   Élément à noter : faits pertinents pour la mission, sans inférence psychologique.").join("\n");
  output+="\n3. Présenter les conditions objectives de la fonction et répondre aux questions.\n4. Confier la décision à des personnes responsables ; aucun classement automatique.\n";
 } else if(kind==="integration"){
  output+="PARCOURS D’INTÉGRATION 30 / 60 / 90 JOURS\n";
  output+="Avant l’arrivée : préparer équipements, accès, programme et personne référente.\n";
  output+="J+30 : clarification des missions, premières pratiques accompagnées et point de dialogue.\n";
  output+="J+60 : mise en pratique progressive, soutien adapté et revue des besoins.\n";
  output+="J+90 : échange de bilan, prochaines étapes et ressources de développement.\n";
  output+="Compétences à accompagner : "+items.join(", ")+".\n";
 }else{
  output+="PLAN DE DÉVELOPPEMENT DES COMPÉTENCES\n";
  output+="Compétences visées : "+items.join(", ")+".\n";
  output+="1. Diagnostiquer les besoins et identifier les objectifs d’apprentissage observables.\n";
  output+="2. Choisir les modalités : tutorat, atelier, ressources en autonomie ou simulation XR si utile.\n";
  output+="3. Planifier les actions, les moyens et les moments de mise en pratique.\n";
  output+="4. Prévoir une évaluation pédagogique et un suivi collectif, sans utiliser de scores pour sanctionner.\n";
 }
 return output+"\nRELECTURE : modèle de travail générique sans valeur juridique, à adapter à la juridiction, au secteur et aux procédures applicables.\nDONNÉES : privilégier des situations fictives ; ne pas transférer de données sensibles dans un service d’IA externe.\n";
}
