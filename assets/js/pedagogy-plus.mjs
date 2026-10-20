/** Editorial extension — human-readable teaching packs, not HR policy or legal advice. */
export const DOSSIERS=[
  {
    "moduleId": "M1",
    "title": "Une intégration qui rend autonome",
    "introduction": "L’intégration ne se réduit pas à transmettre des procédures. Elle commence avant le premier jour, donne des repères sociaux et professionnels, puis se réajuste selon les besoins exprimés.",
    "chapters": [
      {
        "id": "M1-P1",
        "title": "Préparer sans présumer",
        "text": "Construire une check-list qui distingue ce qui relève de l’équipe, de l’informatique et de l’accueil. Vérifier les équipements, les accès et les documents indispensables. Prévoir des supports accessibles sans demander d’informations personnelles qui ne sont pas nécessaires.",
        "example": "Erreur fréquente : croire que transmettre cent pages suffit à donner des repères. Un nouveau collaborateur a surtout besoin de priorités, d’un référent et d’occasions de poser des questions."
      },
      {
        "id": "M1-P2",
        "title": "Rendre visibles les interlocuteurs",
        "text": "Présenter les rôles plutôt qu’une liste de noms sans contexte : qui décide, qui accompagne, qui aide en cas de difficulté ? Mettre à disposition un parcours progressif en petites unités. Prévoir les personnes travaillant à distance ou avec des contraintes d’accessibilité.",
        "example": "Une carte d’équipe efficace indique le rôle, le type de demande et le canal conseillé, mais évite de publier des coordonnées privées."
      },
      {
        "id": "M1-P3",
        "title": "Suivre et améliorer",
        "text": "Organiser plusieurs conversations courtes au lieu d’un unique bilan final. Demander ce qui est clair, ce qui reste difficile et ce qui pourrait être amélioré. Les échanges doivent conduire à des actions concrètes, sans transformer le parcours d’intégration en surveillance.",
        "example": "Lors d’un point à trente jours, demander : « Qu’est-ce qui vous aiderait à travailler plus sereinement ? » plutôt que d’inférer des motivations à partir de traces numériques."
      }
    ],
    "workshop": {
      "instruction": "En groupes de deux, préparer une feuille d’accueil en trois temporalités : avant l’arrivée, premier jour et premier mois. Chaque groupe identifie ensuite deux informations inutiles et deux obstacles d’accessibilité, puis améliore son support.",
      "expected": "Le participant repart avec une trame d’accueil contextualisable et sait expliquer à un collègue comment l’actualiser.",
      "criteria": [
        "Les responsabilités sont attribuées sans ambiguïté",
        "Le plan prévoit des échanges et un suivi",
        "L’information nécessaire reste accessible et proportionnée"
      ]
    }
  },
  {
    "moduleId": "M2",
    "title": "Écoute, désaccord et feedback",
    "introduction": "Un dialogue professionnel de qualité distingue les faits des interprétations, reconnaît les besoins, clarifie ce qui peut être décidé et se conclut par un suivi explicite.",
    "chapters": [
      {
        "id": "M2-P1",
        "title": "Écouter avant d’expliquer",
        "text": "Une personne exprime une inquiétude ou un désaccord : accueillir ce qui est dit, reformuler la demande et vérifier que cette reformulation convient. Éviter de chercher immédiatement qui a tort ou raison. L’écoute n’implique pas d’accepter toutes les propositions.",
        "example": "Reformulation possible : « Si je vous comprends, vous avez repris plusieurs urgences non prévues ; examinons ensemble leur origine et leur répartition. »"
      },
      {
        "id": "M2-P2",
        "title": "Appuyer la conversation sur des faits",
        "text": "Demander des exemples, la période concernée et les conséquences professionnelles observables. Séparer les éléments vérifiés des impressions, sans minimiser ces dernières. Définir le problème à résoudre ensemble avant de discuter de solutions.",
        "example": "Plutôt que « Vous êtes désorganisé », préciser : « Deux échéances convenues n’ont pas été tenues ; quelles difficultés avons-nous sous-estimées ? »"
      },
      {
        "id": "M2-P3",
        "title": "Conclure sans imposer",
        "text": "Mettre sur la table deux ou trois options réalistes et transparentes. Déterminer qui fait quoi, avec quel délai et comment vérifier si la solution fonctionne. Consigner uniquement ce qui est nécessaire à l’action et préserver la confidentialité du dialogue.",
        "example": "Un suivi utile consiste en une décision, une responsabilité explicite et une date de revue, et non une promesse imprécise."
      }
    ],
    "workshop": {
      "instruction": "Conduire un jeu de rôle de sept minutes entre manager et collaborateur à partir d’un conflit fictif. Une troisième personne observe les questions ouvertes, les reformulations et les décisions. Inverser les rôles et comparer les formulations.",
      "expected": "L’apprenant sait préparer une conversation délicate structurée et produire un bref compte rendu factuel.",
      "criteria": [
        "La reformulation reflète le message sans jugement",
        "Les faits et hypothèses sont explicitement distingués",
        "La solution comprend un engagement et une date de revue"
      ]
    }
  },
  {
    "moduleId": "M3",
    "title": "Concevoir une formation vraiment augmentée",
    "introduction": "La meilleure technologie est celle qui rend un geste, une procédure ou un concept plus compréhensible. Commencer par la tâche et les critères d’apprentissage, puis décider si la 3D, la RA, la RV ou un document classique apporte une valeur.",
    "chapters": [
      {
        "id": "M3-P1",
        "title": "Analyser les objectifs avant le média",
        "text": "Décrire la tâche cible, ses prérequis, les erreurs possibles et la preuve attendue de maîtrise. Choisir un support textuel pour les règles simples, une illustration pour des repères visuels et une vue 3D quand la compréhension de l’espace est essentielle.",
        "example": "Un casque immersif n’est pas justifié si une liste claire et un court exercice suffisent à l’objectif."
      },
      {
        "id": "M3-P2",
        "title": "Construire un guidage multimodal",
        "text": "Découper l’activité en étapes compréhensibles. Associer à chacune une consigne, un exemple, un risque et une vérification. Si la RA est envisagée, prévoir des annotations précisément associées à des objets ou zones, ainsi qu’une alternative accessible hors caméra.",
        "example": "Une annotation RA utile indique exactement quel composant inspecter ; une bulle décorative n’est pas une augmentation pédagogique."
      },
      {
        "id": "M3-P3",
        "title": "Faire essayer et réviser",
        "text": "Tester l’activité auprès de personnes ayant différents niveaux de familiarité avec le sujet et le matériel. Observer les confusions, les détours et les contraintes d’accessibilité. Réduire la complexité technique avant de multiplier les fonctionnalités.",
        "example": "Mesurer le taux de réalisation d’une tâche fictive et demander un retour qualitatif ; ne pas déduire une compétence professionnelle à partir d’un seul clic."
      }
    ],
    "workshop": {
      "instruction": "Choisir une procédure fictive de cinq étapes. Produire un storyboard avec la consigne, le média, l’alternative non immersive et le critère de vérification de chaque étape.",
      "expected": "Le groupe repart avec un tableau de décision justifiant l’usage ou non de chaque technologie immersive.",
      "criteria": [
        "Chaque média est justifié par un objectif",
        "Une alternative non immersive reste exploitable",
        "La vérification de maîtrise est observable et explicite"
      ]
    }
  },
  {
    "moduleId": "M4",
    "title": "Prévenir plutôt que réagir",
    "introduction": "La prévention se construit sur l’identification d’une situation dangereuse, la réduction du risque et une communication adaptée aux contextes locaux. Les supports pédagogiques ne remplacent pas les règles de sécurité propres au site.",
    "chapters": [
      {
        "id": "M4-P1",
        "title": "Observer sans mettre en danger",
        "text": "Décrire les faits observables : lieu, situation, tâche et type d’exposition. Ne pas demander aux apprenants de reproduire une situation risquée. Utiliser des scènes fictives et des exemples examinés par un responsable compétent.",
        "example": "Un presque-accident est un signal utile pour améliorer une organisation, pas une occasion de rechercher automatiquement un fautif."
      },
      {
        "id": "M4-P2",
        "title": "Proposer une action proportionnée",
        "text": "Distinguer une mesure immédiate pour sécuriser la situation et une mesure durable pour en réduire la fréquence. Lorsque l’environnement réel est concerné, se référer à la procédure locale et aux personnes habilitées. Distinguer une réaction d’urgence, qui limite une exposition dans l’instant, d’une transformation organisationnelle qui réduit durablement le risque. Documenter les deux réponses avec leurs responsables, une échéance et une façon de vérifier leur application. Les situations de formation doivent rester fictives et ne remplacent jamais l’analyse de risque propre au site.",
        "example": "Le contenu ne prescrit pas un geste d’urgence spécifique sans contexte ni validation par un professionnel compétent."
      },
      {
        "id": "M4-P3",
        "title": "Rendre les consignes vérifiables",
        "text": "Rédiger une consigne avec un objectif, un responsable, un chemin d’alerte et une confirmation de compréhension. Le visuel, la RA ou la VR peuvent illustrer un risque fictif, mais la version textuelle doit rester disponible.",
        "example": "Faire reformuler la consigne et demander une action observable sur une simulation sans danger."
      }
    ],
    "workshop": {
      "instruction": "Analyser en équipe une description fictive d’un passage encombré. Identifier trois faits, deux hypothèses à vérifier, une action immédiate et une mesure de prévention. Faire relire la consigne par un pair.",
      "expected": "Chaque participant peut contribuer à une fiche claire de prévention soumise à validation locale.",
      "criteria": [
        "Faits et hypothèses sont séparés",
        "La consigne mentionne le bon circuit de remontée",
        "Aucun geste dangereux n’est requis dans l’exercice"
      ]
    }
  },
  {
    "moduleId": "M5",
    "title": "Accompagner le développement professionnel",
    "introduction": "Le développement professionnel ne doit pas devenir une prédiction opaque du potentiel. Il relie les expériences observables aux objectifs choisis, aux occasions d’apprentissage et à une discussion régulière.",
    "chapters": [
      {
        "id": "M5-P1",
        "title": "Décrire les compétences observables",
        "text": "Partir de réalisations et de situations concrètes : le contexte, l’action et la valeur produite. Les compétences ne se réduisent pas à un score de quiz ou à une inférence psychologique. Les exemples personnels ne doivent pas être exposés sans consentement.",
        "example": "Une compétence peut être illustrée par un travail commenté plutôt que par un qualificatif tel que « talentueux »."
      },
      {
        "id": "M5-P2",
        "title": "Choisir une cible de progression",
        "text": "Décrire une action future, un moyen, une ressource et un délai réaliste. Vérifier que le résultat dépend suffisamment de la personne pour être pertinent. Prévoir les possibilités d’accessibilité et les aménagements disponibles.",
        "example": "« Présenter un compte rendu structuré en cinq minutes après deux répétitions » est plus opérationnel que « devenir charismatique »."
      },
      {
        "id": "M5-P3",
        "title": "Installer un bilan respectueux",
        "text": "Convenir d’un point de revue où l’on échange sur les difficultés et les aides utiles. Ne pas confondre une recommandation de ressource et une décision sur la mobilité. La décision professionnelle reste une responsabilité humaine encadrée.",
        "example": "Une ressource personnalisée peut être proposée sur la base d’un besoin déclaré, et non d’un profil inféré."
      }
    ],
    "workshop": {
      "instruction": "Rédiger un objectif de progression à partir d’un profil fictif. Les pairs examinent sa clarté, sa faisabilité et l’absence de jugements implicites. Élaborer un plan de soutien associé.",
      "expected": "Le participant dispose d’une trame de plan d’apprentissage à discuter volontairement.",
      "criteria": [
        "L’objectif est observable et temporellement défini",
        "Les moyens d’apprentissage sont identifiés",
        "Aucune inférence sur la personnalité n’est utilisée"
      ]
    }
  },
  {
    "moduleId": "M6",
    "title": "Coopérer en présentiel et à distance",
    "introduction": "Le travail hybride exige des règles explicites pour que les décisions, les tâches et les échanges demeurent accessibles aux personnes présentes comme à distance.",
    "chapters": [
      {
        "id": "M6-P1",
        "title": "Expliciter les règles d’équipe",
        "text": "Clarifier quels échanges relèvent d’un canal instantané, d’un document, d’une réunion ou d’une décision tracée. Prévoir les décalages horaires et les contraintes de connexion. Les règles doivent aider la coordination sans créer une surveillance de disponibilité.",
        "example": "Une réponse hors horaires convenus ne doit pas être déduite automatiquement d’un indicateur de présence."
      },
      {
        "id": "M6-P2",
        "title": "Préparer une réunion inclusive",
        "text": "Envoyer le sujet, le résultat attendu et les documents avant la réunion. Donner une possibilité de participation écrite et prendre le temps de recueillir les avis éloignés. Distinguer décisions, propositions et questions non résolues.",
        "example": "Une salle VR peut faciliter une simulation future de réunion, mais n’est pas nécessaire pour expliquer un ordre du jour."
      },
      {
        "id": "M6-P3",
        "title": "Garder une trace utile",
        "text": "Rédiger un relevé court : décision, justification, action, personne ou rôle responsable et délai, selon la confidentialité de la situation. Lier le relevé aux documents de référence sans collecter les comportements individuels.",
        "example": "Un lien vers une décision versionnée est plus utile qu’une longue transcription de conversations."
      }
    ],
    "workshop": {
      "instruction": "Reconcevoir une réunion hybride fictive qui exclut les membres à distance. Produire un ordre du jour, une procédure de prise de parole et un relevé de décision sur une page.",
      "expected": "Le groupe est capable de créer une charte de coopération adaptable au contexte de son équipe.",
      "criteria": [
        "La participation à distance est réellement possible",
        "Les décisions sont accessibles après la réunion",
        "La charte respecte les horaires et la confidentialité"
      ]
    }
  },
  {
    "moduleId": "M7",
    "title": "Écrire des scénarios pour apprendre",
    "introduction": "Un scénario efficace propose des alternatives plausibles, explique leurs conséquences et rend visibles les critères pédagogiques. Il doit être accessible et révisable avant d’être transposé en RV ou en dialogue avec une IA.",
    "chapters": [
      {
        "id": "M7-P1",
        "title": "Définir la situation et l’objectif",
        "text": "Décrire un contexte professionnel fictif, le rôle de l’apprenant et une compétence qui pourra être observée. Séparer l’objectif de la narration. Éviter d’utiliser des situations personnelles réelles non autorisées. Définir aussi la durée de l’activité et les conditions de réussite que l’animateur pourra expliciter avant le premier choix.",
        "example": "Une bonne consigne annonce « clarifier le désaccord » plutôt que « deviner la personnalité du collègue »."
      },
      {
        "id": "M7-P2",
        "title": "Dessiner des choix pédagogiques",
        "text": "Créer deux à quatre options réellement différentes, sans proposition caricaturale. Définir pour chaque choix une conséquence compréhensible et un feedback argumenté. Montrer les critères de décision et vérifier l’absence de biais de statut.",
        "example": "Une option de qualité moyenne peut être plausible, mais doit susciter une réflexion sur ses limites."
      },
      {
        "id": "M7-P3",
        "title": "Tester et publier avec prudence",
        "text": "Vérifier les enchaînements, la présence d’un retour sur chaque option et le repli accessible. Faire relire le cas par un formateur RH. Ne pas convertir automatiquement les résultats en jugement sur les individus. Organiser un essai complet avec les réponses moins favorables et consigner les ambiguïtés relevées avant publication.",
        "example": "Avant d’ajouter un avatar 3D ou une IA, le scénario textuel doit déjà être jouable et utile."
      }
    ],
    "workshop": {
      "instruction": "Choisir un cas parmi C01 à C12 et écrire un embranchement supplémentaire. Les pairs vérifient que les options sont plausibles et que le feedback porte sur la décision, jamais sur la personne.",
      "expected": "L’apprenant repart avec une fiche de scénario versionnable prête pour une future interface WebXR.",
      "criteria": [
        "L’objectif et le critère d’apprentissage sont clairement énoncés",
        "Chaque option fournit un feedback explicatif",
        "Le parcours textuel est complet et testable"
      ]
    }
  },
  {
    "moduleId": "M8",
    "title": "Évaluer l’apprentissage sans surveiller",
    "introduction": "Une évaluation responsable distingue l’amélioration d’un dispositif pédagogique, la compréhension d’une tâche et les décisions individuelles réservées aux procédures humaines autorisées.",
    "chapters": [
      {
        "id": "M8-P1",
        "title": "Choisir des preuves pertinentes",
        "text": "Partir de l’objectif de formation et déterminer quel résultat permet d’apprécier la compréhension : explication, production ou mise en situation. Les métriques de clic ou de temps ne suffisent pas à conclure qu’une compétence est acquise.",
        "example": "Une démonstration réalisée sur un cas fictif peut montrer une compréhension, mais ne justifie pas une décision de recrutement."
      },
      {
        "id": "M8-P2",
        "title": "Minimiser les données",
        "text": "Privilégier des exercices sans compte ni stockage lorsque c’est possible. Si des données sont nécessaires plus tard, documenter leur finalité, leur durée de conservation, les droits d’accès et une revue adaptée au contexte juridique.",
        "example": "Un indicateur agrégé sur une difficulté de consigne est plus adapté qu’un tableau de classement nominatif."
      },
      {
        "id": "M8-P3",
        "title": "Interpréter avec prudence",
        "text": "Rechercher les facteurs de contexte : familiarité avec le numérique, lisibilité, contraintes matérielles et diversité des apprenants. Faire vérifier les conclusions par les parties compétentes. L’IA peut assister la recherche documentaire, jamais produire un verdict automatique sur un salarié.",
        "example": "La fiabilité d’un retour dépend autant de la situation pédagogique que de l’algorithme de notation."
      }
    ],
    "workshop": {
      "instruction": "Construire un protocole fictif d’évaluation d’une activité S02. Proposer trois indicateurs utiles pour améliorer l’exercice et retirer deux indicateurs intrusifs ou ambigus.",
      "expected": "L’équipe sait justifier chaque donnée pédagogique réellement nécessaire et les limites de son interprétation.",
      "criteria": [
        "Les critères portent sur des compétences observables",
        "La collecte est proportionnée et justifiée",
        "Aucune décision RH individuelle ne découle d’un score de simulation"
      ]
    }
  }
];
export const QUESTIONS=[
  {
    "id": "M1-Q1",
    "moduleId": "M1",
    "prompt": "Quel élément manque le plus souvent lorsqu’un guide d’accueil reste purement documentaire ?",
    "answers": [
      "Un référent identifiable et des moments de dialogue",
      "Un document encore plus long",
      "Une notation des nouveaux collègues"
    ],
    "correct": 0,
    "explanation": "Un dispositif d’intégration utile associe information, échanges et accompagnement."
  },
  {
    "id": "M1-Q2",
    "moduleId": "M1",
    "prompt": "Un accès informatique n’est pas prêt le premier jour. Quelle approche est préférable ?",
    "answers": [
      "Annuler toute la première semaine",
      "Planifier des activités utiles sans l’accès et communiquer un calendrier",
      "Laisser la personne attendre sans explication"
    ],
    "correct": 1,
    "explanation": "Un plan alternatif maintient le lien et limite l’incertitude."
  },
  {
    "id": "M1-Q3",
    "moduleId": "M1",
    "prompt": "Quel retour permet d’améliorer l’intégration sans surveiller les personnes ?",
    "answers": [
      "Un questionnaire volontaire sur la clarté des étapes et les obstacles rencontrés",
      "Un classement des salariés selon leur vitesse de lecture",
      "La collecte de tous les clics individuels"
    ],
    "correct": 0,
    "explanation": "Le retour qualitatif volontaire permet d’ajuster le parcours sans classement."
  },
  {
    "id": "M2-Q1",
    "moduleId": "M2",
    "prompt": "Quelle phrase relève d’une observation plutôt que d’un jugement ?",
    "answers": [
      "Vous n’êtes jamais attentif",
      "Le document transmis hier utilisait la version précédente",
      "Vous manquez d’implication"
    ],
    "correct": 1,
    "explanation": "Une observation décrit un fait identifiable sans assigner de trait personnel."
  },
  {
    "id": "M2-Q2",
    "moduleId": "M2",
    "prompt": "Pourquoi reformuler une plainte avant de proposer une solution ?",
    "answers": [
      "Pour démontrer son autorité",
      "Pour gagner du temps en interrompant",
      "Pour vérifier la compréhension et clarifier le besoin"
    ],
    "correct": 2,
    "explanation": "La reformulation permet de corriger une compréhension incomplète."
  },
  {
    "id": "M2-Q3",
    "moduleId": "M2",
    "prompt": "Quel élément rend un accord de médiation vérifiable ?",
    "answers": [
      "Des actions convenues, des responsabilités et une échéance",
      "Une promesse générale d’amélioration",
      "Un avertissement sans discussion"
    ],
    "correct": 0,
    "explanation": "Une action datée permet un retour sans jugement sur la personne."
  },
  {
    "id": "M3-Q1",
    "moduleId": "M3",
    "prompt": "Quand une scène 3D apporte-t-elle un intérêt didactique évident ?",
    "answers": [
      "Quand la relation spatiale entre pièces est difficile à décrire",
      "Dans toute présentation, sans exception",
      "Uniquement pour donner une impression de modernité"
    ],
    "correct": 0,
    "explanation": "Les relations spatiales complexes peuvent justifier une représentation 3D."
  },
  {
    "id": "M3-Q2",
    "moduleId": "M3",
    "prompt": "Quelle condition doit accompagner une annotation RA ?",
    "answers": [
      "Un abonnement obligatoire",
      "Une consigne compréhensible et une alternative accessible",
      "Une animation automatique longue"
    ],
    "correct": 1,
    "explanation": "L’augmentation doit rester intelligible et accessible."
  },
  {
    "id": "M3-Q3",
    "moduleId": "M3",
    "prompt": "Quelle première étape précède le choix entre VR et vidéo ?",
    "answers": [
      "L’achat d’un casque",
      "Le choix d’une couleur d’interface",
      "La définition de la tâche et des preuves d’apprentissage"
    ],
    "correct": 2,
    "explanation": "Les objectifs pédagogiques pilotent le choix du support."
  },
  {
    "id": "M4-Q1",
    "moduleId": "M4",
    "prompt": "Comment considérer un presque-accident ?",
    "answers": [
      "Comme un signal à examiner et à prévenir",
      "Comme un événement à ignorer en l’absence de blessure",
      "Comme une preuve automatique de faute individuelle"
    ],
    "correct": 0,
    "explanation": "L’analyse des situations à risque aide à réduire les expositions futures."
  },
  {
    "id": "M4-Q2",
    "moduleId": "M4",
    "prompt": "Pourquoi une fiche de sécurité doit-elle être contextualisée ?",
    "answers": [
      "Pour compliquer la formation",
      "Parce que les règles et acteurs compétents dépendent de l’activité et du lieu",
      "Pour éviter toute discussion"
    ],
    "correct": 1,
    "explanation": "Une consigne doit être cohérente avec la procédure locale."
  },
  {
    "id": "M4-Q3",
    "moduleId": "M4",
    "prompt": "Quelle activité pédagogique est préférable ?",
    "answers": [
      "Reproduire un geste dangereux en situation réelle",
      "Imposer une réaction sans exposer les consignes",
      "Étudier un cas fictif et vérifier la compréhension de mesures validées"
    ],
    "correct": 2,
    "explanation": "Une simulation sûre permet l’apprentissage sans créer d’exposition réelle."
  },
  {
    "id": "M5-Q1",
    "moduleId": "M5",
    "prompt": "Quel exemple est un objectif réellement observable ?",
    "answers": [
      "Mieux être soi-même",
      "Préparer et présenter un bilan court devant un groupe dans six semaines",
      "Avoir plus de talent"
    ],
    "correct": 1,
    "explanation": "Un résultat concret et une date facilitent la progression."
  },
  {
    "id": "M5-Q2",
    "moduleId": "M5",
    "prompt": "Que doit-on éviter avec les scores des simulations RH ?",
    "answers": [
      "Les utiliser pour recommander une ressource volontaire",
      "Les commenter comme indices de questions à discuter",
      "Les transformer en verdict sur la valeur ou l’évolution d’une personne"
    ],
    "correct": 2,
    "explanation": "Les scores formatifs ne justifient pas une décision de carrière."
  },
  {
    "id": "M5-Q3",
    "moduleId": "M5",
    "prompt": "Quel élément fonde un plan d’apprentissage pertinent ?",
    "answers": [
      "Un besoin explicite, des ressources et des étapes de revue",
      "Une prédiction automatisée de personnalité",
      "Un classement des collègues"
    ],
    "correct": 0,
    "explanation": "Le plan doit rester transparent et discuté."
  },
  {
    "id": "M6-Q1",
    "moduleId": "M6",
    "prompt": "Quelle mesure améliore une réunion hybride ?",
    "answers": [
      "Un ordre du jour communiqué et des tours de parole organisés",
      "Laisser uniquement les présents physiquement décider",
      "Interdire les contributions écrites"
    ],
    "correct": 0,
    "explanation": "Des règles de participation explicites réduisent l’asymétrie."
  },
  {
    "id": "M6-Q2",
    "moduleId": "M6",
    "prompt": "Quelle trace est la plus utile après une réunion ?",
    "answers": [
      "Un classement de participation nominative",
      "Une synthèse des décisions, actions et échéances",
      "L’historique complet de tous les messages privés"
    ],
    "correct": 1,
    "explanation": "Un relevé utile privilégie les décisions nécessaires."
  },
  {
    "id": "M6-Q3",
    "moduleId": "M6",
    "prompt": "Comment gérer un malentendu dans un message écrit ?",
    "answers": [
      "Répliquer publiquement immédiatement",
      "Supprimer tous les canaux écrits",
      "Demander une clarification puis expliciter les règles communes"
    ],
    "correct": 2,
    "explanation": "La clarification limite l’escalade des interprétations."
  },
  {
    "id": "M7-Q1",
    "moduleId": "M7",
    "prompt": "Quel signe indique un bon distracteur pédagogique ?",
    "answers": [
      "Il est manifestement absurde",
      "Il semble plausible mais permet d’examiner une limite réelle",
      "Il ridiculise l’apprenant"
    ],
    "correct": 1,
    "explanation": "Des choix plausibles soutiennent la réflexion."
  },
  {
    "id": "M7-Q2",
    "moduleId": "M7",
    "prompt": "Quelle propriété est obligatoire pour chaque branche ?",
    "answers": [
      "Un feedback explicatif lié à l’objectif",
      "Une animation spectaculaire",
      "Une notation sur la personnalité"
    ],
    "correct": 0,
    "explanation": "Le feedback est au cœur de l’apprentissage."
  },
  {
    "id": "M7-Q3",
    "moduleId": "M7",
    "prompt": "Avant d’intégrer un avatar conversationnel, que doit-on avoir testé ?",
    "answers": [
      "La popularité du graphisme",
      "Le nom de marque du personnage",
      "La cohérence du scénario et son accessibilité en mode texte"
    ],
    "correct": 2,
    "explanation": "La valeur du dialogue doit précéder la sophistication du média."
  },
  {
    "id": "M8-Q1",
    "moduleId": "M8",
    "prompt": "Quel indicateur convient pour améliorer une activité de formation ?",
    "answers": [
      "Le nombre de personnes ayant trouvé une consigne ambiguë dans un retour volontaire",
      "Un classement des salariés selon les scores",
      "Une analyse automatique de personnalité"
    ],
    "correct": 0,
    "explanation": "Un signal sur l’activité permet de mieux la concevoir."
  },
  {
    "id": "M8-Q2",
    "moduleId": "M8",
    "prompt": "Quand envisager un assistant IA sur des données RH ?",
    "answers": [
      "Avant toute définition de besoin",
      "Après cadrage de finalité, minimisation et revue des risques",
      "En important d’abord des dossiers réels pour essayer"
    ],
    "correct": 1,
    "explanation": "Le cadrage et la protection des données précèdent l’expérimentation."
  },
  {
    "id": "M8-Q3",
    "moduleId": "M8",
    "prompt": "Que conclure d’un faible score à une seule simulation ?",
    "answers": [
      "Un diagnostic stable de personnalité",
      "Une inaptitude professionnelle certaine",
      "Une occasion de revoir le contexte et de proposer de l’aide"
    ],
    "correct": 2,
    "explanation": "Un résultat isolé n’est pas une mesure exhaustive d’une compétence."
  }
];
export const TEMPLATES=[
  {
    "id": "T1",
    "moduleId": "M1",
    "title": "Fiche de travail — Une intégration qui rend autonome",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Informations indispensables avant l’arrivée : [à compléter]",
      "Référent et interlocuteurs par sujet : [à compléter]",
      "Trois priorités du premier jour : [à compléter]",
      "Ressources accessibles sans accès informatique : [à compléter]",
      "Questions pour le point de suivi : [à compléter]"
    ]
  },
  {
    "id": "T2",
    "moduleId": "M2",
    "title": "Fiche de travail — Écoute, désaccord et feedback",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Situation observable et date : [à compléter]",
      "Point de vue exprimé par chacun : [à compléter]",
      "Question de clarification retenue : [à compléter]",
      "Options discutées : [à compléter]",
      "Décision et responsable d’action : [à compléter]",
      "Date et modalités du suivi : [à compléter]"
    ]
  },
  {
    "id": "T3",
    "moduleId": "M3",
    "title": "Fiche de travail — Concevoir une formation vraiment augmentée",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Tâche professionnelle fictive : [à compléter]",
      "Étapes et difficultés identifiées : [à compléter]",
      "Objectif et critère observable : [à compléter]",
      "Support choisi et justification : [à compléter]",
      "Alternative sans RA/RV : [à compléter]",
      "Question de contrôle : [à compléter]"
    ]
  },
  {
    "id": "T4",
    "moduleId": "M4",
    "title": "Fiche de travail — Prévenir plutôt que réagir",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Situation et lieu fictifs : [à compléter]",
      "Faits vérifiés : [à compléter]",
      "Hypothèses à explorer : [à compléter]",
      "Sécurisation immédiate selon la procédure locale : [à compléter]",
      "Prévention durable et responsable : [à compléter]",
      "Validation de la fiche par : [à compléter]"
    ]
  },
  {
    "id": "T5",
    "moduleId": "M5",
    "title": "Fiche de travail — Accompagner le développement professionnel",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Compétence ciblée : [à compléter]",
      "Situation de départ observable : [à compléter]",
      "Objectif réalisable et date : [à compléter]",
      "Ressources ou accompagnements nécessaires : [à compléter]",
      "Indicateur de progression choisi : [à compléter]",
      "Échange de suivi volontaire : [à compléter]"
    ]
  },
  {
    "id": "T6",
    "moduleId": "M6",
    "title": "Fiche de travail — Coopérer en présentiel et à distance",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Objectif de notre réunion : [à compléter]",
      "Documents transmis à l’avance : [à compléter]",
      "Règles de parole et contribution écrite : [à compléter]",
      "Décision et justification : [à compléter]",
      "Action, rôle responsable et date : [à compléter]",
      "Point de réexamen : [à compléter]"
    ]
  },
  {
    "id": "T7",
    "moduleId": "M7",
    "title": "Fiche de travail — Écrire des scénarios pour apprendre",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Objectif observable : [à compléter]",
      "Contexte et rôle fictifs : [à compléter]",
      "Déclencheur du dialogue : [à compléter]",
      "Option A / conséquence / feedback : [à compléter]",
      "Option B / conséquence / feedback : [à compléter]",
      "Critères du débriefing : [à compléter]",
      "Relecture et version : [à compléter]"
    ]
  },
  {
    "id": "T8",
    "moduleId": "M8",
    "title": "Fiche de travail — Évaluer l’apprentissage sans surveiller",
    "usage": "À utiliser uniquement avec des situations fictives ou des informations autorisées. Personnalisation locale, non enregistrée sur RH·XR.",
    "sections": [
      "Objectif pédagogique mesuré : [à compléter]",
      "Trace minimale réellement utile : [à compléter]",
      "Indicateurs agrégés envisagés : [à compléter]",
      "Facteurs de biais ou de contexte : [à compléter]",
      "Durée de conservation si applicable : [à compléter]",
      "Personnes chargées de la revue : [à compléter]"
    ]
  }
];
export const GLOSSARY=[
  {
    "id": "G01",
    "moduleId": "M1",
    "term": "Parcours d’intégration",
    "definition": "Séquence d’accueil progressive qui donne les repères nécessaires à la prise de fonction."
  },
  {
    "id": "G02",
    "moduleId": "M1",
    "term": "Référent d’accueil",
    "definition": "Personne identifiée pour faciliter les questions et l’orientation, sans se substituer aux rôles officiels."
  },
  {
    "id": "G03",
    "moduleId": "M1",
    "term": "Point d’étape",
    "definition": "Conversation périodique qui permet d’adapter un dispositif plutôt que d’évaluer une personne à son insu."
  },
  {
    "id": "G04",
    "moduleId": "M2",
    "term": "Reformulation",
    "definition": "Restitution d’un message avec ses propres mots pour en vérifier la compréhension."
  },
  {
    "id": "G05",
    "moduleId": "M2",
    "term": "Observation factuelle",
    "definition": "Description d’un événement vérifiable, distincte d’un jugement sur une personne."
  },
  {
    "id": "G06",
    "moduleId": "M2",
    "term": "Feedback constructif",
    "definition": "Retour sur un fait et ses effets qui ouvre une amélioration possible."
  },
  {
    "id": "G07",
    "moduleId": "M3",
    "term": "Storyboard pédagogique",
    "definition": "Organisation séquencée des objectifs, consignes, médias et vérifications."
  },
  {
    "id": "G08",
    "moduleId": "M3",
    "term": "Réalité augmentée",
    "definition": "Superposition contextualisée d’informations numériques à une perception du monde réel."
  },
  {
    "id": "G09",
    "moduleId": "M3",
    "term": "Accessibilité multimodale",
    "definition": "Possibilité d’atteindre un objectif sans dépendre d’un seul canal sensoriel ou appareil."
  },
  {
    "id": "G10",
    "moduleId": "M4",
    "term": "Presque-accident",
    "definition": "Événement sans dommage déclaré qui signale une situation pouvant conduire à un accident."
  },
  {
    "id": "G11",
    "moduleId": "M4",
    "term": "Mesure préventive",
    "definition": "Action visant à réduire une exposition ou une probabilité de dommage."
  },
  {
    "id": "G12",
    "moduleId": "M4",
    "term": "Validation locale",
    "definition": "Contrôle d’une consigne par les personnes compétentes selon le contexte du travail."
  },
  {
    "id": "G13",
    "moduleId": "M5",
    "term": "Compétence observable",
    "definition": "Capacité décrite par une réalisation ou un comportement contextualisé."
  },
  {
    "id": "G14",
    "moduleId": "M5",
    "term": "Objectif de développement",
    "definition": "Résultat d’apprentissage explicite, assorti de moyens et d’un horizon temporel."
  },
  {
    "id": "G15",
    "moduleId": "M5",
    "term": "Portfolio de preuves",
    "definition": "Sélection volontaire d’exemples de travaux illustrant des acquis."
  },
  {
    "id": "G16",
    "moduleId": "M6",
    "term": "Travail asynchrone",
    "definition": "Collaboration où les échanges ne nécessitent pas une présence simultanée."
  },
  {
    "id": "G17",
    "moduleId": "M6",
    "term": "Charte d’équipe",
    "definition": "Accords de fonctionnement explicitant les attentes de communication et de coopération."
  },
  {
    "id": "G18",
    "moduleId": "M6",
    "term": "Relevé de décisions",
    "definition": "Trace concise des actions convenues, des rôles responsables et des échéances."
  },
  {
    "id": "G19",
    "moduleId": "M7",
    "term": "Embranchement pédagogique",
    "definition": "Alternative offerte à l’apprenant dont les effets et retours sont définis."
  },
  {
    "id": "G20",
    "moduleId": "M7",
    "term": "Débriefing",
    "definition": "Temps d’analyse qui transforme une réponse ou une action en occasion d’apprentissage."
  },
  {
    "id": "G21",
    "moduleId": "M7",
    "term": "Critère d’observation",
    "definition": "Indication explicite de ce qui sera examiné dans une production ou une activité."
  },
  {
    "id": "G22",
    "moduleId": "M8",
    "term": "Évaluation formative",
    "definition": "Retour destiné à soutenir les apprentissages, sans décision RH automatisée."
  },
  {
    "id": "G23",
    "moduleId": "M8",
    "term": "Minimisation des données",
    "definition": "Principe de limitation des données aux éléments nécessaires à une finalité définie."
  },
  {
    "id": "G24",
    "moduleId": "M8",
    "term": "Biais de contexte",
    "definition": "Influence du contexte de la tâche ou de l’outil sur l’interprétation des résultats."
  }
];
export const REFERENCES=[
  {
    "id": "S-ILO",
    "name": "OIT — Skills and lifelong learning",
    "url": "https://www.ilo.org/skills/",
    "purpose": "Contexte général de la formation et du développement continu. Les fiches RH·XR ne sont pas des reproductions officielles."
  },
  {
    "id": "S-ILO26",
    "name": "OIT — Lifelong learning and skills for the future (2026)",
    "url": "https://www.ilo.org/publications/flagship-reports/lifelong-learning-and-skills-future",
    "purpose": "Repères sur la qualité, l’inclusion et l’accès à la formation."
  },
  {
    "id": "S-UNESCO",
    "name": "UNESCO — Guidance for generative AI in education and research",
    "url": "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=67098",
    "purpose": "Repères pour une utilisation centrée sur l’humain et un traitement prudent des données."
  },
  {
    "id": "S-WCAG",
    "name": "W3C — WCAG 2.2 (traduction française)",
    "url": "https://www.w3.org/Translations/WCAG22-fr/",
    "purpose": "Référence pour l’accessibilité des interfaces et alternatives aux médias immersifs."
  }
];
export function teachingPack(moduleId){return DOSSIERS.find(d=>d.moduleId===moduleId)||null;}
export function quizFor(moduleId){return QUESTIONS.filter(q=>q.moduleId===moduleId);}
export function templateFor(moduleId){return TEMPLATES.find(t=>t.moduleId===moduleId)||null;}
export function checkAnswer(id,choice){const q=QUESTIONS.find(q=>q.id===id);if(!q||!Number.isInteger(choice)||choice<0||choice>=q.answers.length)return null;return {correct:choice===q.correct,explanation:q.explanation,answer:q.answers[q.correct]};}
export function auditPedagogy(){const errors=[];for(const d of DOSSIERS){if(d.chapters.length!==3||d.workshop.criteria.length!==3)errors.push('incomplete dossier '+d.moduleId);}for(const q of QUESTIONS){if(q.answers.length!==3||q.correct<0||q.correct>2||!q.explanation)errors.push('bad question '+q.id);}for(const t of TEMPLATES){if(t.sections.length<5)errors.push('bad template '+t.id);}return errors;}
