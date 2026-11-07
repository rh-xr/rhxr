/** Ressources additionnelles, vérification éditoriale du 7 novembre 2026. */
export const additionalSources=[
  {
    "id": "code-travail-maroc",
    "topic": "personnel",
    "title": "Code du travail marocain — loi n°65-99",
    "org": "Ministère de la Justice",
    "area": "Maroc",
    "kind": "Réglementation",
    "url": "https://adala.justice.gov.ma/api/uploads/2024/04/30/code%20du%20travail-1714463246806.pdf",
    "desc": "Texte officiel de référence, à confronter aux versions et modifications applicables.",
    "date": "PDF officiel, 2024",
    "verifiedOn": "2026-11-07",
    "scope": "Maroc — vérifier le champ d’application"
  },
  {
    "id": "oit-manuel-rh",
    "topic": "management",
    "title": "Manuel de gestion RH — sept outils",
    "org": "OIT",
    "area": "International",
    "kind": "Guide",
    "url": "https://researchrepository.ilo.org/esploro/outputs/manual/Human-resource-management-a-manual-for/995331820502676",
    "desc": "Manuel international de méthodes RH, publié en 2023 et destiné aux organisations d’employeurs.",
    "date": "2023",
    "verifiedOn": "2026-11-07",
    "scope": "Méthodologie générale, non normative"
  },
  {
    "id": "oit-recrutement",
    "topic": "recrutement",
    "title": "Tool 2: Staffing and recruitment",
    "org": "OIT",
    "area": "International",
    "kind": "Guide",
    "url": "https://www.ilo.org/publications/tool-2-staffing-and-recruitment",
    "desc": "Outil sur les pratiques de recrutement du manuel de gestion RH de l’OIT.",
    "date": "3 octobre 2023",
    "verifiedOn": "2026-11-07",
    "scope": "Méthodologie générale, non normative"
  },
  {
    "id": "oit-formation",
    "topic": "formation",
    "title": "Tool 5: Development and training",
    "org": "OIT",
    "area": "International",
    "kind": "Guide",
    "url": "https://www.ilo.org/publications/tool-5-development-and-training",
    "desc": "Outil pour organiser le développement des compétences et la formation.",
    "date": "3 octobre 2023",
    "verifiedOn": "2026-11-07",
    "scope": "Méthodologie générale, non normative"
  },
  {
    "id": "fr-formation",
    "topic": "formation",
    "title": "Plan de développement des compétences",
    "org": "Service-Public.fr",
    "area": "France",
    "kind": "Guide",
    "url": "https://www.service-public.fr/particuliers/vosdroits/F11267",
    "desc": "Cadre français des actions de formation à l’initiative de l’employeur.",
    "date": "Page institutionnelle actualisable",
    "verifiedOn": "2026-11-07",
    "scope": "France — vérifier le champ d’application"
  },
  {
    "id": "fr-conges",
    "topic": "personnel",
    "title": "Congés payés — salariés du secteur privé",
    "org": "Service-Public.fr",
    "area": "France",
    "kind": "Guide",
    "url": "https://www.service-public.fr/particuliers/vosdroits/F2258",
    "desc": "Présentation officielle des congés payés ; droit français uniquement.",
    "date": "Page institutionnelle actualisable",
    "verifiedOn": "2026-11-07",
    "scope": "France — vérifier le champ d’application"
  },
  {
    "id": "cnil-ia-questions",
    "topic": "ia",
    "title": "Questions-réponses sur l’IA générative",
    "org": "CNIL",
    "area": "France",
    "kind": "Guide",
    "url": "https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative",
    "desc": "Conseils sur les risques et les garanties à examiner avant d’utiliser un système d’IA générative.",
    "date": "Page institutionnelle actualisable",
    "verifiedOn": "2026-11-07",
    "scope": "France — vérifier le champ d’application"
  },
  {
    "id": "inrs-risques",
    "topic": "qvct",
    "title": "Évaluation des risques professionnels",
    "org": "INRS",
    "area": "France",
    "kind": "Guide",
    "url": "https://www.inrs.fr/media.html?refINRS=TJ+29",
    "desc": "Aide-mémoire juridique sur l’évaluation des risques professionnels et le DUERP en France.",
    "date": "Mai 2026",
    "verifiedOn": "2026-11-07",
    "scope": "France — vérifier le champ d’application"
  },
  {
    "id": "anact-qvct-etapes",
    "topic": "qvct",
    "title": "Animer une démarche QVCT en quatre étapes",
    "org": "ARACT / ANACT",
    "area": "France",
    "kind": "Guide",
    "url": "https://www.anact.fr/sites/default/files/2024-09/fiches-repere-qvct-attractivite-aract_vf.pdf",
    "desc": "Cadrage, état des lieux, expérimentation et évaluation d’une démarche participative.",
    "date": "2024",
    "verifiedOn": "2026-11-07",
    "scope": "France — vérifier le champ d’application"
  }
];
export const additionalGuides=[
  {
    "id": "choisir-cadre-juridique",
    "topic": "personnel",
    "title": "Identifier le droit applicable à une procédure RH",
    "intro": "Une pratique générale ne remplace jamais une obligation juridique propre à un pays ou à un statut.",
    "sections": [
      {
        "h": "Identifier la juridiction",
        "p": "Définir le pays, le secteur et la situation de travail. Les fiches françaises n’établissent pas les règles applicables au Maroc."
      },
      {
        "h": "Examiner les textes",
        "p": "Partir des sources officielles, puis vérifier les règles particulières, les versions à jour et les conventions applicables."
      },
      {
        "h": "Valider avant application",
        "p": "Demander un avis humain compétent pour les contrats, sanctions, paies, droits, délais et situations individuelles."
      }
    ],
    "actions": [
      "Noter le pays et le statut",
      "Répertorier les textes pertinents",
      "Prévoir une validation humaine"
    ],
    "sourceIds": [
      "code-travail-maroc",
      "fr-conges",
      "cndp-lois"
    ],
    "level": "Pratique",
    "minutes": 7
  },
  {
    "id": "conges-absences",
    "topic": "personnel",
    "title": "Organiser la gestion des congés et absences",
    "intro": "Une procédure explicite réduit les erreurs et respecte la confidentialité des informations du personnel.",
    "sections": [
      {
        "h": "Préparer le circuit",
        "p": "Définir les étapes de demande, validation, traçabilité, réponse et continuité du service."
      },
      {
        "h": "Limiter les données",
        "p": "N’exiger que les justificatifs nécessaires selon le cadre applicable et protéger les éventuelles données sensibles."
      },
      {
        "h": "Contrôler la conformité locale",
        "p": "Vérifier les droits, les délais, les pièces et la conservation dans les textes de la juridiction concernée."
      }
    ],
    "actions": [
      "Décrire les étapes et responsabilités",
      "Identifier les accès aux dossiers",
      "Vérifier la réglementation locale"
    ],
    "sourceIds": [
      "fr-conges",
      "code-travail-maroc",
      "cndp-traitements"
    ],
    "level": "Pratique",
    "minutes": 7
  },
  {
    "id": "recrutement-questions",
    "topic": "recrutement",
    "title": "Préparer un entretien de recrutement structuré",
    "intro": "Des questions comparables et fondées sur le travail aident à limiter les impressions subjectives.",
    "sections": [
      {
        "h": "Partir des missions",
        "p": "Élaborer des questions sur des situations concrètes et directement utiles au poste."
      },
      {
        "h": "Noter des faits",
        "p": "Documenter des observations professionnelles pertinentes sans déduire des traits psychologiques ni collecter des données superflues."
      },
      {
        "h": "Éviter la décision automatisée",
        "p": "L’IA peut aider à rédiger les questions ; l’évaluation et les décisions sur les personnes exigent un contrôle humain et une analyse juridique."
      }
    ],
    "actions": [
      "Sélectionner cinq tâches clés",
      "Formuler des questions communes",
      "Informer les personnes de l’usage de leurs données"
    ],
    "sourceIds": [
      "cnil-recrutement",
      "oit-recrutement",
      "eu-ai-act"
    ],
    "level": "Pratique",
    "minutes": 7
  },
  {
    "id": "developpement-competences",
    "topic": "formation",
    "title": "Préparer un entretien de développement des compétences",
    "intro": "Un échange de formation cherche à progresser, non à sanctionner ou catégoriser des collaborateurs.",
    "sections": [
      {
        "h": "Établir les besoins",
        "p": "Relier les évolutions du travail et les aspirations professionnelles à des compétences observables."
      },
      {
        "h": "Choisir les modalités",
        "p": "Associer tutorat, atelier, exercices, parcours autonomes ou simulation XR lorsqu’elle apporte une valeur pédagogique."
      },
      {
        "h": "Prévoir le suivi",
        "p": "Formaliser des actions et un bilan partagé, avec vérification des modalités légales locales."
      }
    ],
    "actions": [
      "Préparer des questions ouvertes",
      "Définir des actions réalisables",
      "Prévoir un suivi partagé"
    ],
    "sourceIds": [
      "oit-formation",
      "fr-formation"
    ],
    "level": "Pratique",
    "minutes": 7
  },
  {
    "id": "audit-risques-ia-rh",
    "topic": "ia",
    "title": "Évaluer les risques d’un outil d’IA en RH",
    "intro": "L’assistance rédactionnelle et la classification automatique des candidats n’ont pas le même profil de risque.",
    "sections": [
      {
        "h": "Décrire précisément l’usage",
        "p": "Documenter la finalité, les données traitées, les personnes affectées et les alternatives sans IA."
      },
      {
        "h": "Examiner les risques",
        "p": "Évaluer confidentialité, biais, erreurs, explicabilité, décisions automatisées et réglementation locale. Certains systèmes IA RH relèvent du haut risque en Europe."
      },
      {
        "h": "Organiser la supervision",
        "p": "Définir contrôle humain, tests, possibilité de rectification et validation juridique avant déploiement."
      }
    ],
    "actions": [
      "Établir une fiche de cas d’usage",
      "Vérifier les exigences du fournisseur",
      "Prévoir supervision et recours"
    ],
    "sourceIds": [
      "cnil-ia-questions",
      "eu-ai-act",
      "ilo-ia-rh"
    ],
    "level": "Approfondissement",
    "minutes": 9
  },
  {
    "id": "qvct-experimenter",
    "topic": "qvct",
    "title": "Tester une amélioration des conditions de travail",
    "intro": "L’amélioration collective du travail demande d’observer, tester et évaluer les solutions.",
    "sections": [
      {
        "h": "Cadrer le problème",
        "p": "Décrire une difficulté de travail réelle sans exiger d’informations médicales individuelles."
      },
      {
        "h": "Expérimenter",
        "p": "Choisir une action faisable, une durée limitée et des indicateurs collectifs."
      },
      {
        "h": "Réévaluer",
        "p": "Échanger sur le résultat et décider d’ajuster, généraliser ou arrêter l’expérimentation."
      }
    ],
    "actions": [
      "Animer un échange sur le travail",
      "Tester une solution limitée",
      "Évaluer les effets collectifs"
    ],
    "sourceIds": [
      "anact-qvct-etapes",
      "inrs-risques"
    ],
    "level": "Pratique",
    "minutes": 7
  }
];
export const additionalPrompts=[
  {
    "id": "p17",
    "topic": "personnel",
    "title": "Contrôler une juridiction RH",
    "desc": "Séparer méthode générale et droit applicable.",
    "text": "Pour la procédure RH fictive [PROCÉDURE] dans [PAYS], dresse une liste des sources officielles à contrôler, des pièces, droits et délais à vérifier. N’invente aucune règle et ne rends aucun avis juridique personnalisé."
  },
  {
    "id": "p18",
    "topic": "personnel",
    "title": "Circuit de congés et absences",
    "desc": "Préparer une démarche prudente.",
    "text": "Conçois le circuit fictif des demandes de congés : demande, validation, information, confidentialité et archivage. Distingue la procédure interne des obligations à vérifier dans [PAYS]. N’utilise aucune donnée réelle."
  },
  {
    "id": "p19",
    "topic": "recrutement",
    "title": "Entretien RH structuré",
    "desc": "Préparer des questions équitables.",
    "text": "Élabore six questions communes pour le poste fictif [POSTE] à partir de ses missions. Indique des observations professionnelles pertinentes, sans notation automatique ni questions sur la vie privée."
  },
  {
    "id": "p20",
    "topic": "formation",
    "title": "Développement à 30/60/90 jours",
    "desc": "Planifier un accompagnement progressif.",
    "text": "Crée un programme de développement fictif pour [POSTE] à 30, 60 et 90 jours avec objectifs, ressources, temps d’échange et critères pédagogiques. N’utilise pas ce programme pour sanctionner une personne."
  },
  {
    "id": "p21",
    "topic": "ia",
    "title": "Audit fournisseur d’IA RH",
    "desc": "Élaborer des questions de diligence.",
    "text": "Pour l’outil d’IA RH fictif [OUTIL], propose une check-list : finalité, types de données, biais, hébergement, conservation, contrôle humain, audit, recours et droit applicable à vérifier dans [PAYS]. Ne conclue pas automatiquement à une conformité."
  },
  {
    "id": "p22",
    "topic": "qvct",
    "title": "Expérimentation QVCT",
    "desc": "Passer du diagnostic à l’essai.",
    "text": "Organise un atelier collectif fictif sur [PROBLÈME D’ORGANISATION], avec discussion sur le travail, idée de test pendant quatre semaines et évaluation des résultats agrégés. Écarte toute information de santé nominative."
  }
];
