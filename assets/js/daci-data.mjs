/** RH·XR DACI: annotated, linked learning documents. No live AI calls. */
export const DOCUMENTS = [
  {
    "id": "D01",
    "title": "Guide d’intégration 30–60–90 jours",
    "moduleId": "M1",
    "caseId": "C01",
    "summary": "Un document de parcours pour préparer, accueillir et accompagner une personne nouvellement arrivée.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "avant",
        "title": "Avant l’arrivée",
        "text": "Vérifier les équipements, les accès, le référent, les aménagements nécessaires et le programme initial. Le responsable de l’accueil prépare les accès, les informations nécessaires et les interlocuteurs avant l’arrivée. Les éléments qui ne peuvent être fournis immédiatement sont distingués des éléments disponibles. Le parcours doit offrir une alternative aux personnes qui n’ont pas encore accès aux outils numériques et ne doit pas dépendre d’une seule personne. Un document d’accueil efficace précise le rôle de chaque interlocuteur et sa date de révision.",
        "augmentation": "Relier une check-list éditable à un futur parcours 3D d’accueil.",
        "connexion": "L’IA pourrait proposer des questions de clarification à partir de procédures approuvées.",
        "example": "Exemple fictif : les accès au portail ne sont pas activés lundi. Le référent propose une visite, présente l’équipe et explique quand les accès seront rétablis, plutôt que de laisser la personne attendre.",
        "question": "Quelles activités utiles restent accessibles le premier jour sans identifiants informatiques ?"
      },
      {
        "anchor": "premier",
        "title": "Premier jour",
        "text": "Présenter la mission, la culture de coopération, les règles de sécurité et les personnes ressources. Le premier jour associe des informations indispensables à des échanges humains. Il convient de présenter le rôle attendu, les règles de coopération, les lieux ou outils à connaître et le chemin pour poser une question. Les sujets complexes peuvent être répartis sur plusieurs jours pour éviter une surcharge. La fiche indique ce qui doit être compris maintenant et ce qui pourra être approfondi plus tard.",
        "augmentation": "Déclencher une vidéo ou une vue 360° à partir d’un chapitre imprimé, avec alternative textuelle.",
        "connexion": "Relier les services et leurs responsables via des fiches à jour.",
        "example": "Exemple fictif : un guide de vingt pages est remplacé par trois repères essentiels et une carte des interlocuteurs, avec accès facultatif aux compléments documentaires.",
        "question": "Comment vérifier la compréhension des repères sans interroger inutilement les informations personnelles ?"
      },
      {
        "anchor": "suivi",
        "title": "Suivi 30–60–90",
        "text": "Convenir de points d’étape, demander ce qui facilite le travail et adapter le soutien. Le suivi à trente, soixante et quatre-vingt-dix jours ne constitue pas une grille automatique de jugement. Il sert à discuter des obstacles, à clarifier les objectifs et à améliorer le soutien disponible. Chaque échange peut se conclure par une action de l’équipe et une date de révision, selon des modalités adaptées au contexte. La personne concernée doit savoir ce qui sera consigné.",
        "augmentation": "Ouvrir le cas pratique C01 et sa grille de débriefing.",
        "connexion": "Proposer des ressources selon les objectifs choisis explicitement par l’apprenant.",
        "example": "Exemple fictif : une collègue signale que les consignes changent souvent. Le référent prévoit un point de clarification hebdomadaire et met à jour les documents concernés.",
        "question": "Quelle action concrète pourriez-vous décider pour lever un obstacle récurrent ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D01-MEDIA1",
        "type": "3D/VR",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D01-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  },
  {
    "id": "D02",
    "title": "Trame de conversation et de feedback",
    "moduleId": "M2",
    "caseId": "C04",
    "summary": "Un guide pour distinguer faits, interprétations et actions lors d’un échange délicat.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "observations",
        "title": "Décrire une observation",
        "text": "Noter un fait daté et vérifiable plutôt qu’un jugement sur une personne. Une conversation constructive commence par ce que l’on peut décrire précisément. Une observation donne un contexte, un comportement ou un événement vérifiable ; elle ne résume pas la personnalité. Les conséquences doivent être examinées sans supposer les intentions. La reformulation sert ensuite à vérifier si les faits et le besoin ont été compris de la même manière par les interlocuteurs.",
        "augmentation": "Afficher un exemple annoté et écouter une reformulation audio.",
        "connexion": "Connecter les notions observation, impact et demande à une carte conceptuelle.",
        "example": "Exemple fictif : remplacer « vous ne respectez jamais les délais » par « les deux derniers livrables ont été reçus après la date convenue ; qu’est-ce qui a rendu ces échéances difficiles ? ».",
        "question": "Quelle différence voyez-vous entre un fait observable et une interprétation ?"
      },
      {
        "anchor": "dialogue",
        "title": "Ouvrir le dialogue",
        "text": "Poser une question ouverte, écouter les éléments nouveaux et vérifier la compréhension. Ouvrir le dialogue signifie laisser une place réelle aux réponses. Une question ouverte invite à préciser les faits, les contraintes et les options, sans suggérer d’emblée une faute. Reformuler ce qui a été entendu avant de proposer des actions. En cas de divergence, revenir à la question commune plutôt qu’augmenter la pression. Les informations sensibles sont traitées selon les règles de confidentialité applicables.",
        "augmentation": "Accéder à la simulation S02 ou à un futur interlocuteur virtuel.",
        "connexion": "Suggérer des reformulations issues d’un corpus pédagogique validé.",
        "example": "Exemple fictif : lors d’un désaccord sur les urgences, le responsable demande des exemples précis puis compare les critères de priorité utilisés par l’équipe.",
        "question": "Comment pourriez-vous reformuler la demande de l’autre personne sans la réduire à une accusation ?"
      },
      {
        "anchor": "suivi",
        "title": "Convenir du suivi",
        "text": "Définir une action réciproque et un point d’étape proportionné. Une conversation de feedback utile ne s’arrête pas à la formulation du problème. Les participants distinguent les engagements possibles, les responsabilités et les délais. Un compte rendu bref peut rappeler les décisions sans reproduire l’ensemble des propos. La date de revue vise à vérifier le fonctionnement du nouvel accord, et non à surveiller indéfiniment une personne. Adapter cette trame aux règles internes.",
        "augmentation": "Joindre une fiche de suivi imprimable sans données personnelles.",
        "connexion": "Proposer une grille de débriefing à compléter localement.",
        "example": "Exemple fictif : l’équipe décide de relire la répartition des tâches le vendredi suivant et de centraliser les urgences dans un tableau partagé.",
        "question": "À quelle date et avec quel critère pourrez-vous constater une amélioration ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D02-MEDIA1",
        "type": "3D/VR",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D02-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  },
  {
    "id": "D03",
    "title": "Fiche de prévention d’un risque",
    "moduleId": "M4",
    "caseId": "C06",
    "summary": "Une structure simple pour identifier, communiquer et prévenir un danger fictif.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "identifier",
        "title": "Identifier le danger",
        "text": "Décrire un environnement et le risque sans attribuer une faute. Identifier un risque demande de distinguer les faits observables, les hypothèses et les conséquences potentielles. L’apprenant peut examiner une image ou une description fictive et repérer les éléments à clarifier. Aucune activité ne doit créer un danger réel pour démontrer son existence. Les informations liées à des obligations de sécurité doivent être vérifiées par les professionnels habilités dans le contexte de travail concerné.",
        "augmentation": "Superposer ultérieurement une annotation RA sur un élément spatial pertinent.",
        "connexion": "Relier la consigne aux fiches d’équipement et au responsable compétent.",
        "example": "Exemple fictif : un passage est partiellement encombré. La description indique le lieu et l’obstacle, sans affirmer que la responsabilité incombe à une personne déterminée.",
        "question": "Quels éléments demanderiez-vous pour comprendre la situation sans vous mettre en danger ?"
      },
      {
        "anchor": "agir",
        "title": "Choisir une action immédiate",
        "text": "Sécuriser la zone et prévenir selon la procédure locale sans se mettre en danger. Une mesure immédiate peut réduire une exposition présente, tandis qu’une mesure organisationnelle agit sur les causes durables. Ces réponses ne sont pas interchangeables. Il convient d’identifier le circuit local d’alerte, les rôles habilités et les procédures existantes, puis de préparer une consigne claire et accessible. Les simulations doivent éviter de recommander un geste technique risqué hors contexte.",
        "augmentation": "Comparer plusieurs décisions dans le cas C06.",
        "connexion": "Présenter un arbre de décision pédagogique explicitement limité.",
        "example": "Exemple fictif : après un signalement, l’équipe sécurise temporairement le passage selon sa procédure puis revoit l’emplacement du rangement.",
        "question": "Comment distinguer une mesure temporaire d’un changement durable ?"
      },
      {
        "anchor": "ameliorer",
        "title": "Améliorer la situation",
        "text": "Documenter ce qui a été observé et réfléchir à une mesure préventive durable. L’amélioration continue examine si la mesure retenue est comprise et applicable. Une fiche de retour distingue ce qui a été observé, ce qui a changé et ce qui reste à vérifier. Les erreurs servent à identifier des fragilités du processus et non à attribuer automatiquement une faute. Le support pédagogique doit être daté et révisé lorsqu’une consigne locale évolue.",
        "augmentation": "Voir une reconstitution VR fictive avec option 2D.",
        "connexion": "Associer la mesure à une date de révision documentaire.",
        "example": "Exemple fictif : la zone semble dégagée mais un nouveau matériel est régulièrement posé au même endroit ; la cause organisationnelle n’a donc pas été supprimée.",
        "question": "Quelle preuve permettrait de vérifier que la situation a réellement changé ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D03-MEDIA1",
        "type": "RA",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D03-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  },
  {
    "id": "D04",
    "title": "Charte de collaboration hybride",
    "moduleId": "M6",
    "caseId": "C08",
    "summary": "Un référentiel d’équipe pour des échanges lisibles et une prise de décision équitable.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "cadre",
        "title": "Choisir les canaux",
        "text": "Définir les usages attendus des messages, réunions et documents communs. Des règles d’équipe utiles précisent quel canal sert à décider, demander de l’aide, archiver une information ou signaler une urgence. La réponse attendue dépend du contexte et des horaires convenus. Les conventions doivent rester compréhensibles pour les personnes à distance, notamment lorsque la connexion ou les fuseaux horaires diffèrent. La présence numérique ne constitue pas à elle seule une mesure de contribution.",
        "augmentation": "Insérer des exemples multimédias accessibles.",
        "connexion": "Relier chaque canal à ses règles et aux documents de référence.",
        "example": "Exemple fictif : l’équipe réserve le canal urgent à une procédure définie, tandis que les décisions courantes sont consignées dans un document consultable.",
        "question": "Quelle règle explicite réduirait le plus les interruptions ou malentendus dans cette équipe ?"
      },
      {
        "anchor": "reunion",
        "title": "Organiser une réunion inclusive",
        "text": "Communiquer le programme, faciliter la participation, vérifier les décisions. Une réunion hybride inclusive se prépare avant d’ouvrir la visioconférence. L’ordre du jour indique le résultat attendu et les informations à lire. Pendant l’échange, l’animation fait place aux personnes à distance, autorise la contribution écrite et reformule les décisions. Après la réunion, une trace courte et accessible limite les asymétries d’information. Une salle virtuelle pourra être utile seulement si elle ajoute une véritable interaction.",
        "augmentation": "Déployer ultérieurement une réunion simulée en VR.",
        "connexion": "Suggérer une check-list adaptée aux contraintes déclarées.",
        "example": "Exemple fictif : avant de conclure, l’animateur sollicite les participants qui n’ont pas encore eu la possibilité d’intervenir, sans leur imposer une prise de parole.",
        "question": "Comment assurer une contribution possible sans exposer les participants à une pression inutile ?"
      },
      {
        "anchor": "traces",
        "title": "Rendre les décisions consultables",
        "text": "Conserver une trace courte des décisions et un responsable d’action, sans données superflues. Les décisions gagnent à être faciles à retrouver : objet, justification principale, action, responsable par rôle et échéance. La charte précise où se trouve le document canonique et comment une mise à jour est signalée. Il n’est pas nécessaire de conserver toutes les conversations pour garantir une bonne coordination. Une chaîne de documents reliés réduit les versions contradictoires.",
        "augmentation": "Ouvrir le cas C08 depuis la charte augmentée.",
        "connexion": "Ajouter des liens bidirectionnels vers les actions associées.",
        "example": "Exemple fictif : un accord sur les horaires est relié à la charte d’équipe et à la prochaine date de revue, plutôt que disséminé dans des messages privés.",
        "question": "Que faudrait-il conserver pour qu’un nouveau membre comprenne une décision six mois plus tard ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D04-MEDIA1",
        "type": "3D/VR",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D04-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  },
  {
    "id": "D05",
    "title": "Plan personnel de développement",
    "moduleId": "M5",
    "caseId": "C07",
    "summary": "Un support volontaire de réflexion sur les compétences, les preuves et l’apprentissage.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "forces",
        "title": "Identifier une réalisation",
        "text": "Décrire une situation, l’action menée et son résultat observable. Un plan de développement peut commencer par un exemple volontaire de travail réalisé. On décrit la situation, les choix effectués et ce qu’ils ont produit, en précisant les limites de cette preuve. Une compétence ne se déduit pas directement d’un questionnaire de personnalité ou d’un seul résultat simulé. L’apprenant décide quelles pièces présenter et dans quelles conditions, sous réserve des règles professionnelles applicables.",
        "augmentation": "Associer une démonstration vidéo si la personne choisit de la partager.",
        "connexion": "Relier une compétence à plusieurs ressources de formation.",
        "example": "Exemple fictif : un collaborateur choisit de montrer un compte rendu de projet anonymisé pour illustrer sa capacité à structurer une réunion.",
        "question": "Quelle réalisation observable illustrerait une compétence sans révéler d’informations confidentielles ?"
      },
      {
        "anchor": "objectif",
        "title": "Formuler un objectif",
        "text": "Préciser un comportement à travailler, des moyens et une date de revue. Un objectif de progression doit correspondre à une activité que l’on peut pratiquer et examiner, avec des moyens adaptés. Le plan mentionne le délai, les ressources et le soutien nécessaire. Les recommandations de contenus restent des propositions, discutées avec la personne, et ne doivent pas devenir une décision automatisée sur son avenir. Une date de revue aide à ajuster les moyens selon les obstacles rencontrés.",
        "augmentation": "Simuler une conversation de développement sans score de recrutement.",
        "connexion": "Proposer des ressources fondées sur l’objectif explicitement sélectionné.",
        "example": "Exemple fictif : préparer une présentation courte, s’entraîner deux fois et demander un retour volontaire avant une échéance convenue.",
        "question": "Quels moyens réalistes aideraient à progresser plutôt que d’ajouter de la pression ?"
      },
      {
        "anchor": "bilan",
        "title": "Faire le point",
        "text": "Revenir sur l’expérience sans en inférer une personnalité ou un potentiel. Le bilan de progression compare l’expérience à l’objectif choisi, sans transformer chaque difficulté en verdict. Il peut relever ce qui a été appris, ce qui nécessite de l’aide et ce qui doit être reformulé. Le retour peut donner lieu à un nouveau support de formation ou à un ajustement du plan. Les informations personnelles ne sont conservées que lorsque cela est justifié et dans un cadre autorisé.",
        "augmentation": "Ouvrir le cas C07 et sa question réflexive.",
        "connexion": "Recommander un parcours sur la base d’une préférence déclarée, jamais d’une inférence cachée.",
        "example": "Exemple fictif : l’objectif initial était trop large. L’apprenant le transforme en deux étapes plus courtes avec un accompagnement défini.",
        "question": "Comment formuleriez-vous une amélioration observable sans qualifier la personnalité de la personne ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D05-MEDIA1",
        "type": "3D/VR",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D05-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  },
  {
    "id": "D06",
    "title": "Cadre de l’usage responsable de l’IA RH",
    "moduleId": "M8",
    "caseId": "C12",
    "summary": "Un document de vigilance sur les finalités, les données et les décisions humaines.",
    "version": "0.2",
    "status": "Prototype pédagogique fictif, non opposable",
    "sections": [
      {
        "anchor": "finalite",
        "title": "Définir la finalité",
        "text": "Spécifier la tâche pédagogique et les bénéfices attendus avant tout branchement à un modèle. Avant d’envisager un assistant IA, décrire une tâche clairement limitée et la raison pour laquelle elle nécessite une technologie nouvelle. Préciser le public, les informations utilisées, les résultats attendus et les limites de l’usage. Une démonstration avec des données fictives peut tester l’utilité sans exposer des dossiers RH réels. Les personnes habilitées doivent examiner la conformité aux politiques internes et au cadre applicable.",
        "augmentation": "Ajouter des annotations de contrôle et exemples fictifs.",
        "connexion": "Lier chaque usage à sa finalité, son responsable et ses limites.",
        "example": "Exemple fictif : un assistant explique un document d’accueil public plutôt que de rechercher des données individuelles sur les collaborateurs.",
        "question": "Quelles questions doivent être résolues avant de transmettre un document à un fournisseur externe ?"
      },
      {
        "anchor": "donnees",
        "title": "Limiter les données",
        "text": "Éviter les données RH identifiantes dans les démonstrations ; vérifier droits, conservation et sécurité. La minimisation consiste à ne traiter que les informations nécessaires à une finalité explicitée. Les données RH identifiantes peuvent comporter des risques élevés : déterminer les contrôles, les droits d’accès, le lieu de stockage et les durées de conservation avant toute collecte. Les documents augmentés doivent aussi signaler l’origine de leurs contenus et éviter de produire de faux liens de référence.",
        "augmentation": "Expliquer un chemin de données dans une animation accessible.",
        "connexion": "Détecter uniquement les références de politique connues, pas profiler les individus.",
        "example": "Exemple fictif : un prototype est évalué avec douze situations inventées, puis relu par des formateurs, sans comptes salariés et sans synchronisation externe.",
        "question": "Quels éléments de données pourraient être supprimés tout en conservant l’intérêt pédagogique ?"
      },
      {
        "anchor": "controle",
        "title": "Conserver le contrôle humain",
        "text": "Prévoir des erreurs possibles, un mécanisme de contestation et une revue humaine. L’usage d’une IA ne supprime pas la responsabilité humaine. Chaque réponse doit pouvoir être rapprochée d’une source connue, et les erreurs doivent pouvoir être corrigées. Les résultats d’un exercice formatif ne constituent pas un diagnostic individuel ni un outil de décision de recrutement ou de sanction. Prévoir des limites explicites, un canal de retour et une révision régulière des contenus avant mise à l’échelle.",
        "augmentation": "Ouvrir le cas C12 et discuter les différents choix.",
        "connexion": "Fournir une synthèse des passages sourcés plutôt qu’une décision automatique.",
        "example": "Exemple fictif : un assistant documentaire présente la section exacte qui soutient sa réponse et signale lorsqu’aucun texte validé ne répond à la question.",
        "question": "Comment permettre à l’utilisateur de vérifier une réponse et d’en contester l’interprétation ?"
      }
    ],
    "provenance": {
      "kind": "Ressource pédagogique de démonstration RH·XR",
      "reviewStatus": "Relecture experte RH à prévoir",
      "jurisdiction": "Générique, à contextualiser"
    },
    "mediaSlots": [
      {
        "id": "D06-MEDIA1",
        "type": "3D/VR",
        "status": "planned",
        "description": "Point d’enrichissement multimédia envisagé ; ressource non fournie"
      },
      {
        "id": "D06-MEDIA2",
        "type": "IA",
        "status": "planned",
        "description": "Assistant documentaire avec sources vérifiables ; non connecté"
      }
    ]
  }
];
export const DACI_CAPABILITIES = Object.freeze({augmented:'Texte enrichi d’annotations et de points d’accès vers des médias (RA/RV/3D envisagées).',connected:'Liens structurés entre documents, modules, cas et compétences pédagogiques.',intelligent:'Recommandations transparentes fondées sur des règles locales ; assistant IA futur, sous conditions de gouvernance.'});
export function getDocument(id){return DOCUMENTS.find(d=>d.id===id)||null;}
export function linkedDocuments(moduleId){return DOCUMENTS.filter(d=>d.moduleId===moduleId);}
export function semanticRecord(doc){return {'@context':'https://schema.org','@type':'LearningResource','@id':'urn:rhxr:learning:'+doc.id,'identifier':doc.id,'name':doc.title,'description':doc.summary,'inLanguage':'fr','educationalUse':'professional development','isBasedOn':doc.moduleId};}
export function validateDocuments(documents=DOCUMENTS,moduleIds=null,caseIds=null){const errors=[];const ids=new Set();for(const d of documents){if(ids.has(d.id))errors.push('duplicate '+d.id);ids.add(d.id);if(moduleIds&&!moduleIds.includes(d.moduleId))errors.push('unknown module '+d.id);if(caseIds&&!caseIds.includes(d.caseId))errors.push('unknown case '+d.id);if(!d.sections||d.sections.length<3)errors.push('incomplete '+d.id);const anchors=new Set();for(const s of d.sections){if(anchors.has(s.anchor))errors.push('duplicate anchor '+d.id);anchors.add(s.anchor);if(!s.text||!s.augmentation||!s.connexion)errors.push('incomplete section '+d.id)}}return errors;}
