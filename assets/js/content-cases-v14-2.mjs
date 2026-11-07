/** RH·XR V14.2 — additional fictional HR teaching cases, not legal advice or HR decisions.
 * The 54 original V13 answers remain authoritative for their original three stories.
 * New excerpts below are authored internal educational exercise cards, never real policies.
 */
const entry=(slug,label,topic,setting,persona,skills,steps)=>({
  slug,label,topic,setting,persona,skills,steps
});
const choice=(id,label,quality,character_reaction,feedback)=>({id,label,quality,character_reaction,feedback});
const stage=(id,phase,actor,dialogue,question,principle,options)=>({
  id,phase,actor,dialogue,question,principle,options
});
export const EXTRA_CASES=Object.freeze([
  entry('recrutement','05  Recrutement responsable','Recrutement',
    'Vous participez au recrutement fictif de Lina pour un poste de chargée de projet. Une équipe utilise des outils numériques pour présélectionner les candidatures. Les critères doivent rester pertinents et explicables.',
    'Lina, Sofia (recruteuse), Karim (manager)',
    ['critères de sélection','contrôle humain','accessibilité','traçabilité'],[
    stage('R1','Préparer · Critères','Sofia',
      '« Nous avons beaucoup de candidatures. On peut choisir celles qui nous ressemblent le plus ? »',
      'Comment établissez-vous une présélection professionnelle ?',
      'Définir avant l’examen des candidatures des critères liés aux tâches et aux compétences attendues.',
      [
        choice('a','Définir avec le manager une grille de compétences liées au poste avant d’examiner les dossiers.','appropriate',
          'Sofia : « Nous aurons une base commune pour justifier chaque choix. »','Vous évitez d’improviser des préférences personnelles et rendez l’examen comparable.'),
        choice('b','Privilégier les parcours qui ressemblent à ceux de l’équipe actuelle.','risky',
          'Lina : « Comment saurais-je quels critères ont réellement été appliqués ? »','La similarité avec l’équipe ne remplace pas des exigences professionnelles explicites.'),
        choice('c','Lancer les entretiens puis inventer les critères selon les profils reçus.','incomplete',
          'Karim : « Nous risquons d’évaluer les candidats différemment. »','Il manque une grille commune préalable à la décision.')
      ]),
    stage('R2','Outil d’IA · Supervision','Karim',
      '« Notre outil propose un classement automatique. Écartons directement les dix derniers. »',
      'Que faites-vous du classement proposé ?',
      'Un classement produit par un outil est une aide à examiner ; il ne constitue pas, à lui seul, une justification suffisante.',
      [
        choice('a','Contrôler les critères, rechercher des erreurs, puis laisser une personne responsable examiner les dossiers.','appropriate',
          'Karim : « Le classement devient une indication vérifiable, pas une décision automatique. »','Vous limitez la dépendance à l’outil et conservez une justification humaine.'),
        choice('b','Refuser sans lecture toutes les candidatures mal classées.','risky',
          'Sofia : « Une erreur de données pourrait exclure un bon profil. »','L’exclusion automatique prive de vérification une proposition potentiellement erronée.'),
        choice('c','Garder le classement, sans documenter comment il a été obtenu.','incomplete',
          'Karim : « Nous ne pourrons pas expliquer un écart éventuel. »','Vous devez encore examiner les paramètres, limites et critères du classement.')
      ]),
    stage('R3','Entretien · Accessibilité','Lina',
      '« Puis-je recevoir le déroulé de l’entretien à l’avance et utiliser un format accessible ? »',
      'Quelle réponse favorise un échange équitable ?',
      'Prévoir un échange accessible et des modalités adaptées sans déduire les compétences d’une préférence de format.',
      [
        choice('a','Clarifier le besoin lié à l’entretien, proposer un format accessible et évaluer les mêmes compétences.','appropriate',
          'Lina : « Je pourrai démontrer mes compétences sur une base comparable. »','Vous distinguez l’adaptation du dispositif de l’évaluation du poste.'),
        choice('b','Refuser car tous les candidats doivent utiliser exactement le même support.','risky',
          'Lina : « Le format m’empêchera peut-être d’exposer mon expérience. »','L’égalité de traitement ne signifie pas nécessairement identité stricte de supports.'),
        choice('c','Accepter, mais sans prévenir les évaluateurs ni préparer le support.','incomplete',
          'Sofia : « Nous devons assurer la préparation pratique de l’entretien. »','L’intention est positive, mais les modalités restent insuffisamment préparées.')
      ]),
    stage('R4','Décider · Compte rendu','Sofia',
      '« Nous avons choisi un profil. Que faut-il conserver du processus ? »',
      'Quelle trace de décision constitue le meilleur exercice ?',
      'Conserver, dans le cadre fictif de l’exercice, des motifs liés aux compétences, limiter les accès et organiser la suite.',
      [
        choice('a','Rédiger une justification centrée sur les critères du poste, vérifier les accès et définir le suivi.','appropriate',
          'Karim : « La décision est expliquée par les besoins du poste et le processus suivi. »','Vous associez cohérence des critères, confidentialité et traçabilité pédagogique.'),
        choice('b','Partager à toute l’entreprise les impressions personnelles sur les candidats.','risky',
          'Lina : « Mes informations ne sont pas utiles à tous les collaborateurs. »','La diffusion d’appréciations personnelles non nécessaires est à proscrire dans cette simulation.'),
        choice('c','Annoncer uniquement le nom retenu sans relier le choix aux critères.','incomplete',
          'Sofia : « L’équipe ne saura pas retracer notre raisonnement. »','Il manque une justification proportionnée, centrée sur les compétences.')
      ])
  ]),
  entry('confidentialite','06  Données et confidentialité','Confidentialité',
    'Vous êtes référent RH fictif. Des documents d’intégration, des échanges personnels et un assistant IA circulent entre les équipes. Vous devez limiter l’accès aux informations utiles.',
    'Nadia (référente RH), Adam (nouvel arrivant)',
    ['minimisation','contrôle des accès','prudence avec l’IA','alerte'],[
    stage('P1','Collecter · Justifier','Nadia',
      '« Pour préparer l’arrivée d’Adam, demandons-lui toutes ses informations personnelles. »',
      'Comment choisissez-vous les informations à recueillir ?',
      'Demander uniquement les éléments nécessaires à l’étape, en identifiant leur finalité et le responsable du traitement.',
      [
        choice('a','Lister les seules données nécessaires à la formalité et faire valider cette liste par le service compétent.','appropriate',
          'Adam : « Je comprends mieux ce qui est demandé et pourquoi. »','La collecte reste ciblée et la vérification est confiée au bon interlocuteur.'),
        choice('b','Réclamer toutes les données disponibles au cas où elles serviraient un jour.','risky',
          'Adam : « Certaines demandes semblent sans rapport avec ma prise de poste. »','Une éventuelle utilité future ne justifie pas une collecte indéfinie.'),
        choice('c','Réutiliser la liste d’un autre salarié sans regarder ses champs.','incomplete',
          'Nadia : « Ce formulaire peut contenir des éléments non nécessaires. »','Le formulaire doit être contrôlé avant d’être réutilisé.')
      ]),
    stage('P2','Partager · Destinataires','Adam',
      '« J’ai reçu un lien vers le dossier RH complet de l’équipe. Est-ce normal ? »',
      'Quelle action adoptez-vous face à l’accès trop large ?',
      'Donner accès à chaque personne aux seules informations nécessaires pour sa tâche ; vérifier les droits des espaces partagés.',
      [
        choice('a','Faire vérifier les droits du dossier, restreindre les accès et orienter Adam vers les seuls documents utiles.','appropriate',
          'Adam : « Je dispose des informations nécessaires sans voir celles des autres. »','Vous traitez le risque de partage sans attribuer de faute prématurément.'),
        choice('b','Dire que le partage est normal parce que le lien est interne à l’entreprise.','risky',
          'Nadia : « Un accès interne peut quand même être excessif. »','L’emplacement d’un lien ne prouve pas la légitimité de tous ses lecteurs.'),
        choice('c','Laisser l’accès ouvert puis vérifier à la fin du mois.','incomplete',
          'Adam : « D’autres personnes peuvent peut-être consulter ces fichiers entre-temps. »','Le contrôle des droits mérite une action plus rapide.')
      ]),
    stage('P3','IA · Données sensibles','Nadia',
      '« Collons les dossiers des nouveaux arrivants dans un chatbot public pour créer un résumé. »',
      'Quelle décision est la plus prudente ?',
      'Éviter de transmettre des données personnelles identifiantes à un service non autorisé ; privilégier un exemple fictif ou un outil approuvé.',
      [
        choice('a','Refuser l’envoi des dossiers, demander la procédure d’outil approuvé et utiliser un exemple fictif.','appropriate',
          'Nadia : « Nous pouvons préparer le résumé sans exposer les personnes concernées. »','Vous maintenez une frontière claire entre expérimentation IA et données RH réelles.'),
        choice('b','Envoyer les dossiers en retirant seulement les prénoms.','risky',
          'Adam : « D’autres détails pourraient encore permettre de nous reconnaître. »','Supprimer les prénoms ne garantit pas l’anonymat des autres données.'),
        choice('c','Utiliser le chatbot puis effacer l’historique local.','incomplete',
          'Nadia : « Cela ne garantit pas ce qui a été traité par le service. »','L’effacement local ne remplace pas l’autorisation et le contrôle du transfert.')
      ]),
    stage('P4','Incident · Réaction','Adam',
      '« J’ai peut-être envoyé le mauvais document à un destinataire externe. »',
      'Quelle première démarche est la plus appropriée ?',
      'Agir rapidement : limiter la diffusion si possible, consigner les faits utiles et prévenir le canal compétent sans cacher l’incident.',
      [
        choice('a','Sécuriser ce qui peut l’être, conserver les éléments factuels et avertir le référent habilité.','appropriate',
          'Nadia : « Nous pouvons évaluer l’incident et organiser une réponse proportionnée. »','Vous ne masquez pas le problème et permettez une prise en charge ordonnée.'),
        choice('b','Supprimer les messages envoyés et ne rien signaler.','risky',
          'Adam : « Nous risquons de perdre des informations nécessaires pour comprendre l’erreur. »','Cacher une transmission ne supprime pas ses conséquences.'),
        choice('c','Attendre qu’un destinataire se plaigne avant de vérifier.','incomplete',
          'Nadia : « Un signalement précoce peut éviter une diffusion plus large. »','L’inaction retarde la maîtrise du risque et empêche le service compétent de limiter la diffusion du document.')
      ])
  ]),
  entry('hybride','07  Coopération hybride','Travail hybride',
    'Vous animez une équipe fictive réunissant des collègues au bureau et à distance. Des consignes dispersées et des réunions inaccessibles provoquent des malentendus.',
    'Inès (à distance), Omar (au bureau), Leïla (manager)',
    ['coordination asynchrone','équité de participation','reformulation','suivi partagé'],[
    stage('H1','Coordonner · Consignes','Inès',
      '« J’apprends les décisions après les réunions informelles du bureau. »',
      'Que mettez-vous en place ?',
      'Établir un canal commun où les décisions, responsables et échéances sont accessibles aux membres concernés.',
      [
        choice('a','Publier les décisions utiles dans un espace commun et identifier un responsable des mises à jour.','appropriate',
          'Inès : « Je pourrai retrouver les mêmes décisions que mes collègues sur site. »','Le dispositif réduit la dépendance aux conversations informelles.'),
        choice('b','Demander aux salariés à distance de se renseigner par hasard.','risky',
          'Omar : « Ils risquent de manquer une décision importante. »','La transmission de l’information ne doit pas reposer sur la chance.'),
        choice('c','Créer un nouveau canal sans indiquer à quoi il servira.','incomplete',
          'Leïla : « Nous devons préciser quelles informations publier et qui les met à jour. »','L’outil ne suffit pas sans règle de fonctionnement.')
      ]),
    stage('H2','Réunions · Participation','Omar',
      '« Les collègues à distance n’arrivent pas à intervenir pendant nos réunions. »',
      'Quelle pratique améliore l’inclusion dans la discussion ?',
      'Prévoir un tour de parole équilibré, le partage des supports et un compte rendu consultable.',
      [
        choice('a','Partager l’ordre du jour, solliciter tous les participants et diffuser les décisions.','appropriate',
          'Inès : « Je peux préparer mes questions et participer aux décisions. »','Le cadre facilite une participation équilibrée, quel que soit le lieu.'),
        choice('b','Donner la parole uniquement aux personnes présentes dans la salle.','risky',
          'Inès : « Mes contraintes restent invisibles dans les choix. »','La proximité physique ne justifie pas une priorité systématique de parole.'),
        choice('c','Envoyer un compte rendu sans permettre de poser des questions.','incomplete',
          'Leïla : « La compréhension réciproque nécessite aussi une possibilité de retour. »','Le document aide, mais ne remplace pas l’échange.')
      ]),
    stage('H3','Tensions · Clarifier','Leïla',
      '« Omar pense qu’Inès n’est jamais disponible ; Inès reçoit pourtant les demandes le soir. »',
      'Quelle réponse aide à comprendre ce désaccord ?',
      'Identifier les horaires convenus, les canaux et les faits concrets avant d’attribuer une intention aux personnes.',
      [
        choice('a','Comparer des exemples d’horaires et clarifier collectivement les délais de réponse attendus.','appropriate',
          'Omar : « Nous n’avions pas la même compréhension des urgences. »','Vous reformulez la tension en problèmes de coordination observables.'),
        choice('b','Déclarer que le télétravail est nécessairement la cause du conflit.','risky',
          'Inès : « Cette conclusion ignore les consignes reçues hors horaires. »','Le lieu de travail ne constitue pas une preuve de responsabilité.'),
        choice('c','Demander à chacun de faire plus d’efforts sans préciser les attentes.','incomplete',
          'Leïla : « Nous risquons de revenir au même malentendu. »','Les engagements doivent être observables et partagés.')
      ]),
    stage('H4','Suivi · Engagements','Inès',
      '« Comment saurons-nous si notre fonctionnement s’améliore ? »',
      'Quel suivi proposez-vous ?',
      'Convenir d’un indicateur de coordination, d’un responsable et d’un point de révision proportionné.',
      [
        choice('a','Choisir deux indicateurs simples, un responsable par action et une date courte de bilan.','appropriate',
          'Leïla : « Nous pourrons ajuster notre organisation à partir de faits partagés. »','Vous transformez les bonnes intentions en engagement mesurable et révisable.'),
        choice('b','Installer un suivi individuel permanent des connexions des salariés.','risky',
          'Inès : « Cela ne mesure pas forcément la qualité de notre coopération. »','La surveillance constante ne remplace pas des indicateurs de coordination adaptés.'),
        choice('c','Conclure que tout ira mieux sans prévoir de bilan.','incomplete',
          'Omar : « Nous ne vérifierons jamais si le nouveau canal fonctionne. »','Il manque une étape de vérification des effets.')
      ])
  ])
]);
export const CASE_FILES=Object.freeze({
  onboarding:{role:'Référent d’accueil',artefact:'Fiche de poste validée et parcours d’accueil fictifs',prepare:'Quelles informations doivent être confirmées avant le premier échange ?',practice:'Présenter la fiche de mission, nommer un interlocuteur et convenir d’un point de suivi.',vigilance:'Ne pas présumer des procédures ni réclamer des données sans nécessité.'},
  entretien:{role:'Responsable menant un entretien de suivi',artefact:'Trame d’entretien et consignes contradictoires fictives',prepare:'Comment ouvrir l’échange sans mettre Alex sur la défensive ?',practice:'Reformuler deux faits, décider une action précise et fixer une date de revue.',vigilance:'Ne pas confondre impressions sur la personne et faits de travail.'},
  conflit:{role:'Médiateur de premier niveau',artefact:'Planning et signalement fictifs',prepare:'Comment garantir à Amina et Youssef une écoute équitable ?',practice:'Faire une reformulation neutre et identifier quand arrêter une médiation informelle.',vigilance:'Face à des menaces alléguées, passer par le canal institutionnel prévu.'},
  s02:{role:'Manager de proximité',artefact:'Tableau fictif de répartition de tâches',prepare:'Quelle question ouvrirait un dialogue constructif ?',practice:'Demander deux faits, reformuler, convenir d’une action et d’un suivi.',vigilance:'Éviter de promettre une solution avant la vérification.'},
  recrutement:{role:'Recruteur et manager',artefact:'Grille fictive de présélection et classement proposé par une IA',prepare:'Quels critères pertinents définiriez-vous avant de lire les candidatures ?',practice:'Rédiger trois critères du poste et une justification de choix sans données inutiles.',vigilance:'Ne pas transformer un score logiciel en décision automatique.'},
  confidentialite:{role:'Référent RH chargé des accès',artefact:'Formulaire fictif, espace partagé et assistant IA non approuvé',prepare:'Quelles données et quels accès sont réellement nécessaires ?',practice:'Écrire une règle simple de minimisation et une action de signalement.',vigilance:'Ne pas transférer de données réelles vers un outil non autorisé.'},
  hybride:{role:'Manager d’une équipe hybride',artefact:'Ordre du jour, décisions et canaux fictifs de l’équipe',prepare:'Comment les personnes à distance retrouveront-elles les décisions ?',practice:'Formuler une règle de publication et un contrôle d’accès équitable aux échanges.',vigilance:'Ne pas assimiler présence en ligne et contribution professionnelle.'}
});
export const EXTRA_DESCRIPTORS=Object.freeze(EXTRA_CASES.map((c,i)=>({
  id:c.slug,label:c.label,topic:c.topic
})));
const cloneChoice=(c,next)=>({id:c.id,label:c.label,next_node_id:next});
export function extendDaciBundle(original){
  if(original?.version!=='V13'||original.fictional_only!==true||!Array.isArray(original.stories)||!original.answers)
    throw Error('A verified fictional V13 bundle is required');
  const stories=[...original.stories];
  const answers={...original.answers};
  for(const c of EXTRA_CASES){
    const nodes=c.steps.map((s,i)=>({
      id:s.id,kind:'decision',phase:s.phase,actor:s.actor,dialogue:s.dialogue,
      question:s.question,choices:s.options.map(o=>cloneChoice(o,c.steps[i+1]?.id||c.slug.toUpperCase()+'-END'))
    }));
    nodes.push({id:c.slug.toUpperCase()+'-END',kind:'ending',phase:'Bilan',actor:'Formateur',dialogue:'',question:'',choices:[]});
    stories.push({slug:c.slug,title:c.label,setting:c.setting,persona:c.persona,
      skills:c.skills,start:c.steps[0].id,nodes});
    for(let i=0;i<c.steps.length;i++){
      const s=c.steps[i];const next=c.steps[i+1]?.id||c.slug.toUpperCase()+'-END';
      for(const o of s.options){
        const key=c.slug+':'+s.id+':'+o.id;
        if(answers[key])throw Error('Duplicated authored exercise answer '+key);
        answers[key]={
          status:'completed_step',node_id:s.id,next_node_id:next,finished:!c.steps[i+1],
          quality:o.quality,character_reaction:o.character_reaction,
          feedback:o.feedback,
          pedagogical_note:'Exercice fictif : '+s.principle,
          citation:'urn:rhxr:daci:fiche-exercice-v14@1.0.0#'+c.slug.toUpperCase()+'-'+s.id,
          source_title:'Fiche pédagogique fictive RH·XR — '+s.phase,
          quote:s.principle,next_dialogue:c.steps[i+1]?.dialogue||'',next_question:c.steps[i+1]?.question||'',
          fictional_only:true,no_automated_hr_evaluation:true
        };
      }
    }
  }
  return {...original,stories,answers,enhancement_version:'V14.2',extended_fictional_only:true};
}
