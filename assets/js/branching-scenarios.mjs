/** RH·XR multistep fictional learning dialogues; outcomes are formative, never employee evaluations. */
export const BRANCHING_SCENARIOS=[
  {
    "id": "S10",
    "moduleId": "M1",
    "title": "Un accueil perturbé par des accès retardés",
    "role": "Nouvelle recrue",
    "objective": "Maintenir un accueil utile et transparent sans dévaloriser l'expérience de la personne.",
    "scene": "Dialogue fictif : mode texte opérationnel. Transposition VR/3D différée jusqu'aux modèles validés.",
    "nodes": [
      {
        "id": "start",
        "stage": 1,
        "speaker": "Nouvelle recrue",
        "text": "Je suis arrivé ce matin. Je n'ai ni ordinateur fonctionnel ni accès au portail ; je me demande si mon arrivée a vraiment été préparée.",
        "prompt": "Comment commenceriez-vous cet échange ?",
        "choices": [
          {
            "id": "explore",
            "text": "Vous avez raison de demander des repères. Voyons ensemble ce qui est disponible maintenant et qui peut vous accompagner.",
            "feedback": "Cette réponse reconnaît l'obstacle, propose un chemin praticable et évite de demander des informations non nécessaires.",
            "criterion": "Questionnement ouvert",
            "next": "calm"
          },
          {
            "id": "push",
            "text": "Nous avons beaucoup de choses à faire ; il faudra patienter sans poser trop de questions.",
            "feedback": "Le propos peut faire perdre confiance et masquer les mesures déjà possibles.",
            "criterion": "Respect du cadre",
            "next": "tense"
          },
          {
            "id": "partial",
            "text": "Les accès devraient arriver bientôt. Je vais me renseigner et revenir vers vous.",
            "feedback": "Vous esquissez une action mais sans préciser les alternatives immédiatement disponibles.",
            "criterion": "Clarification progressive",
            "next": "mixed"
          }
        ]
      },
      {
        "id": "calm",
        "stage": 2,
        "speaker": "Nouvelle recrue",
        "text": "Je peux commencer par rencontrer mon équipe et comprendre mes missions. Cela me rassurerait.",
        "prompt": "La discussion s'ouvre. Comment avancer ?",
        "choices": [
          {
            "id": "calm-a",
            "text": "Construisons un programme de première journée indépendant des accès, avec un référent et un point d'information fixé.",
            "feedback": "Vous proposez une adaptation concrète, soutenue par des responsabilités et un délai.",
            "criterion": "Construction d'un accord",
            "next": "closing"
          },
          {
            "id": "calm-b",
            "text": "Valider immédiatement une solution sans vérifier ses conditions de mise en œuvre.",
            "feedback": "L'accord est prématuré : les responsabilités et contraintes restent à expliciter.",
            "criterion": "Vérification",
            "next": "closing"
          },
          {
            "id": "calm-c",
            "text": "Résumer les faits connus et demander quels éléments restent à vérifier.",
            "feedback": "Cette option consolide la compréhension commune avant le plan d'action.",
            "criterion": "Synthèse",
            "next": "closing"
          }
        ]
      },
      {
        "id": "tense",
        "stage": 2,
        "speaker": "Nouvelle recrue",
        "text": "Je comprends que les accès ne soient pas prêts, mais j'ai besoin de savoir à qui m'adresser.",
        "prompt": "La tension augmente. Comment rouvrir un dialogue constructif ?",
        "choices": [
          {
            "id": "tense-a",
            "text": "Reconnaître l'effet de ma formulation et revenir à des exemples précis.",
            "feedback": "Vous rouvrez l'échange sans exiger que l'autre personne accepte votre première réaction.",
            "criterion": "Réparation de dialogue",
            "next": "closing"
          },
          {
            "id": "tense-b",
            "text": "Rappeler que votre position hiérarchique clôt la discussion.",
            "feedback": "Cette attitude empêche l'examen des faits et ne résout pas le problème.",
            "criterion": "Respect mutuel",
            "next": "closing"
          },
          {
            "id": "tense-c",
            "text": "Proposer une pause, une reprise cadrée et une question ouverte.",
            "feedback": "Une reprise convenue peut désamorcer une tension, si elle n'est pas utilisée pour éviter le sujet.",
            "criterion": "Apaisement",
            "next": "closing"
          }
        ]
      },
      {
        "id": "mixed",
        "stage": 2,
        "speaker": "Nouvelle recrue",
        "text": "Merci, mais je ne sais pas si quelqu'un peut m'aider à démarrer.",
        "prompt": "Des zones d'ombre persistent. Quelle est la prochaine étape ?",
        "choices": [
          {
            "id": "mixed-a",
            "text": "Demander une reformulation du besoin principal, puis vérifier les faits disponibles.",
            "feedback": "Vous distinguez la demande, les observations et les éléments à confirmer.",
            "criterion": "Clarification",
            "next": "closing"
          },
          {
            "id": "mixed-b",
            "text": "Choisir la première solution qui paraît rapide.",
            "feedback": "La rapidité ne remplace pas un accord sur le diagnostic.",
            "criterion": "Décision prudente",
            "next": "closing"
          },
          {
            "id": "mixed-c",
            "text": "Proposer de recueillir des informations complémentaires à une date précise.",
            "feedback": "Cette option peut être utile si la recherche d'informations reste proportionnée et concertée.",
            "criterion": "Planification",
            "next": "closing"
          }
        ]
      },
      {
        "id": "closing",
        "stage": 3,
        "speaker": "Nouvelle recrue",
        "text": "Je voudrais savoir ce qui se passera demain et à qui signaler une difficulté sans accès.",
        "prompt": "Comment terminer cette simulation ?",
        "choices": [
          {
            "id": "close-a",
            "text": "Reformuler les engagements réciproques, les ressources nécessaires et une date de revue.",
            "feedback": "La conclusion crée une référence commune et un suivi proportionné.",
            "criterion": "Suivi concret",
            "next": null
          },
          {
            "id": "close-b",
            "text": "Terminer sans confirmer qui fera quoi ni à quel moment.",
            "feedback": "Une fin imprécise expose à de nouvelles incompréhensions.",
            "criterion": "Responsabilités",
            "next": null
          },
          {
            "id": "close-c",
            "text": "Inviter chacun à vérifier le plan, puis consigner uniquement les décisions utiles.",
            "feedback": "La vérification collective et une trace sobre facilitent la suite sans surveillance.",
            "criterion": "Traçabilité responsable",
            "next": null
          }
        ]
      }
    ],
    "start": "start",
    "evidence": "Une mini-trame d'accueil alternatif et une check-list 30–60–90 jours.",
    "debrief": {
      "guidance": "Comparez les décisions sans additionner de points ni inférer un trait personnel.",
      "reflection": [
        "À quel moment la compréhension du problème a-t-elle changé ?",
        "Quelle option était plausible mais risquait de fermer l'échange ?",
        "Quelle action observable et proportionnée retenez-vous pour la suite ?"
      ]
    },
    "daci": "D01"
  },
  {
    "id": "S11",
    "moduleId": "M2",
    "title": "Une charge de travail ressentie comme injuste",
    "role": "Collaborateur",
    "objective": "Écouter, distinguer faits et ressentis, puis fixer un accord vérifiable.",
    "scene": "Dialogue fictif : mode texte opérationnel. Transposition VR/3D différée jusqu'aux modèles validés.",
    "nodes": [
      {
        "id": "start",
        "stage": 1,
        "speaker": "Collaborateur",
        "text": "J'ai l'impression que toutes les urgences finissent chez moi. J'ai essayé de tenir, mais cela devient pesant.",
        "prompt": "Comment commenceriez-vous cet échange ?",
        "choices": [
          {
            "id": "explore",
            "text": "Merci de l'exprimer. Pouvez-vous citer deux urgences récentes et expliquer ce qui a changé dans votre travail ?",
            "feedback": "Vous accueillez le vécu et recherchez des éléments concrets, sans supposer l'intention de vos collègues.",
            "criterion": "Questionnement ouvert",
            "next": "calm"
          },
          {
            "id": "push",
            "text": "Tout le monde est débordé ; il faut accepter l'organisation actuelle.",
            "feedback": "Vous minimisez le signal et risquez de compromettre une résolution collective.",
            "criterion": "Respect du cadre",
            "next": "tense"
          },
          {
            "id": "partial",
            "text": "Nous allons redistribuer les tâches dès demain, sans autre discussion.",
            "feedback": "Vous envisagez une solution mais sans diagnostic partagé.",
            "criterion": "Clarification progressive",
            "next": "mixed"
          }
        ]
      },
      {
        "id": "calm",
        "stage": 2,
        "speaker": "Collaborateur",
        "text": "Ces dernières semaines, j'ai repris plusieurs demandes non planifiées alors que mes échéances restaient inchangées.",
        "prompt": "La discussion s'ouvre. Comment avancer ?",
        "choices": [
          {
            "id": "calm-a",
            "text": "Comparons les critères de priorisation avec l'équipe et décidons ensemble des ajustements possibles.",
            "feedback": "Le cadre commun évite de désigner prématurément un responsable.",
            "criterion": "Construction d'un accord",
            "next": "closing"
          },
          {
            "id": "calm-b",
            "text": "Valider immédiatement une solution sans vérifier ses conditions de mise en œuvre.",
            "feedback": "L'accord est prématuré : les responsabilités et contraintes restent à expliciter.",
            "criterion": "Vérification",
            "next": "closing"
          },
          {
            "id": "calm-c",
            "text": "Résumer les faits connus et demander quels éléments restent à vérifier.",
            "feedback": "Cette option consolide la compréhension commune avant le plan d'action.",
            "criterion": "Synthèse",
            "next": "closing"
          }
        ]
      },
      {
        "id": "tense",
        "stage": 2,
        "speaker": "Collaborateur",
        "text": "Vous ne comprenez pas : ce ne sont pas seulement les urgences, c'est l'absence de discussion.",
        "prompt": "La tension augmente. Comment rouvrir un dialogue constructif ?",
        "choices": [
          {
            "id": "tense-a",
            "text": "Reconnaître l'effet de ma formulation et revenir à des exemples précis.",
            "feedback": "Vous rouvrez l'échange sans exiger que l'autre personne accepte votre première réaction.",
            "criterion": "Réparation de dialogue",
            "next": "closing"
          },
          {
            "id": "tense-b",
            "text": "Rappeler que votre position hiérarchique clôt la discussion.",
            "feedback": "Cette attitude empêche l'examen des faits et ne résout pas le problème.",
            "criterion": "Respect mutuel",
            "next": "closing"
          },
          {
            "id": "tense-c",
            "text": "Proposer une pause, une reprise cadrée et une question ouverte.",
            "feedback": "Une reprise convenue peut désamorcer une tension, si elle n'est pas utilisée pour éviter le sujet.",
            "criterion": "Apaisement",
            "next": "closing"
          }
        ]
      },
      {
        "id": "mixed",
        "stage": 2,
        "speaker": "Collaborateur",
        "text": "Oui, mais cela dépend aussi des projets qui arrivent au dernier moment.",
        "prompt": "Des zones d'ombre persistent. Quelle est la prochaine étape ?",
        "choices": [
          {
            "id": "mixed-a",
            "text": "Demander une reformulation du besoin principal, puis vérifier les faits disponibles.",
            "feedback": "Vous distinguez la demande, les observations et les éléments à confirmer.",
            "criterion": "Clarification",
            "next": "closing"
          },
          {
            "id": "mixed-b",
            "text": "Choisir la première solution qui paraît rapide.",
            "feedback": "La rapidité ne remplace pas un accord sur le diagnostic.",
            "criterion": "Décision prudente",
            "next": "closing"
          },
          {
            "id": "mixed-c",
            "text": "Proposer de recueillir des informations complémentaires à une date précise.",
            "feedback": "Cette option peut être utile si la recherche d'informations reste proportionnée et concertée.",
            "criterion": "Planification",
            "next": "closing"
          }
        ]
      },
      {
        "id": "closing",
        "stage": 3,
        "speaker": "Collaborateur",
        "text": "Je souhaite surtout que les prochaines urgences soient réparties selon des critères compréhensibles.",
        "prompt": "Comment terminer cette simulation ?",
        "choices": [
          {
            "id": "close-a",
            "text": "Reformuler les engagements réciproques, les ressources nécessaires et une date de revue.",
            "feedback": "La conclusion crée une référence commune et un suivi proportionné.",
            "criterion": "Suivi concret",
            "next": null
          },
          {
            "id": "close-b",
            "text": "Terminer sans confirmer qui fera quoi ni à quel moment.",
            "feedback": "Une fin imprécise expose à de nouvelles incompréhensions.",
            "criterion": "Responsabilités",
            "next": null
          },
          {
            "id": "close-c",
            "text": "Inviter chacun à vérifier le plan, puis consigner uniquement les décisions utiles.",
            "feedback": "La vérification collective et une trace sobre facilitent la suite sans surveillance.",
            "criterion": "Traçabilité responsable",
            "next": null
          }
        ]
      }
    ],
    "start": "start",
    "evidence": "Un protocole de clarification des faits et de revue des priorités.",
    "debrief": {
      "guidance": "Comparez les décisions sans additionner de points ni inférer un trait personnel.",
      "reflection": [
        "À quel moment la compréhension du problème a-t-elle changé ?",
        "Quelle option était plausible mais risquait de fermer l'échange ?",
        "Quelle action observable et proportionnée retenez-vous pour la suite ?"
      ]
    },
    "daci": "D02"
  },
  {
    "id": "S12",
    "moduleId": "M4",
    "title": "Un passage encombré après un presque-accident",
    "role": "Membre de l'équipe",
    "objective": "Analyser un risque fictif sans geste dangereux, identifier les mesures locales pertinentes.",
    "scene": "Dialogue fictif : mode texte opérationnel. Transposition VR/3D différée jusqu'aux modèles validés.",
    "nodes": [
      {
        "id": "start",
        "stage": 1,
        "speaker": "Membre de l'équipe",
        "text": "Hier, j'ai failli trébucher sur du matériel posé devant le passage. Personne n'a été blessé, mais cela peut se reproduire.",
        "prompt": "Comment commenceriez-vous cet échange ?",
        "choices": [
          {
            "id": "explore",
            "text": "Merci de l'avoir signalé. Vérifions les faits et déclenchons la procédure de signalement prévue pour ce site.",
            "feedback": "Vous examinez un signal préventif sans blâme ni improvisation technique.",
            "criterion": "Questionnement ouvert",
            "next": "calm"
          },
          {
            "id": "push",
            "text": "Comme il n'y a pas eu de blessé, inutile d'en parler davantage.",
            "feedback": "Un presque-accident justifie déjà une réflexion préventive.",
            "criterion": "Respect du cadre",
            "next": "tense"
          },
          {
            "id": "partial",
            "text": "Je vais demander immédiatement qui a posé les objets pour sanctionner la personne.",
            "feedback": "La recherche automatique de culpabilité peut masquer une cause organisationnelle.",
            "criterion": "Clarification progressive",
            "next": "mixed"
          }
        ]
      },
      {
        "id": "calm",
        "stage": 2,
        "speaker": "Membre de l'équipe",
        "text": "Le matériel était à cet endroit pour la première fois, à ma connaissance.",
        "prompt": "La discussion s'ouvre. Comment avancer ?",
        "choices": [
          {
            "id": "calm-a",
            "text": "Séparons l'action immédiate conforme à la procédure locale et l'analyse de rangement à plus long terme.",
            "feedback": "Vous distinguez sécurisation et prévention structurelle, selon des rôles habilités.",
            "criterion": "Construction d'un accord",
            "next": "closing"
          },
          {
            "id": "calm-b",
            "text": "Valider immédiatement une solution sans vérifier ses conditions de mise en œuvre.",
            "feedback": "L'accord est prématuré : les responsabilités et contraintes restent à expliciter.",
            "criterion": "Vérification",
            "next": "closing"
          },
          {
            "id": "calm-c",
            "text": "Résumer les faits connus et demander quels éléments restent à vérifier.",
            "feedback": "Cette option consolide la compréhension commune avant le plan d'action.",
            "criterion": "Synthèse",
            "next": "closing"
          }
        ]
      },
      {
        "id": "tense",
        "stage": 2,
        "speaker": "Membre de l'équipe",
        "text": "Cela arrive tout le temps : on ne m'écoute jamais.",
        "prompt": "La tension augmente. Comment rouvrir un dialogue constructif ?",
        "choices": [
          {
            "id": "tense-a",
            "text": "Reconnaître l'effet de ma formulation et revenir à des exemples précis.",
            "feedback": "Vous rouvrez l'échange sans exiger que l'autre personne accepte votre première réaction.",
            "criterion": "Réparation de dialogue",
            "next": "closing"
          },
          {
            "id": "tense-b",
            "text": "Rappeler que votre position hiérarchique clôt la discussion.",
            "feedback": "Cette attitude empêche l'examen des faits et ne résout pas le problème.",
            "criterion": "Respect mutuel",
            "next": "closing"
          },
          {
            "id": "tense-c",
            "text": "Proposer une pause, une reprise cadrée et une question ouverte.",
            "feedback": "Une reprise convenue peut désamorcer une tension, si elle n'est pas utilisée pour éviter le sujet.",
            "criterion": "Apaisement",
            "next": "closing"
          }
        ]
      },
      {
        "id": "mixed",
        "stage": 2,
        "speaker": "Membre de l'équipe",
        "text": "Je pense que le rangement a été déplacé récemment, mais je ne suis pas sûr.",
        "prompt": "Des zones d'ombre persistent. Quelle est la prochaine étape ?",
        "choices": [
          {
            "id": "mixed-a",
            "text": "Demander une reformulation du besoin principal, puis vérifier les faits disponibles.",
            "feedback": "Vous distinguez la demande, les observations et les éléments à confirmer.",
            "criterion": "Clarification",
            "next": "closing"
          },
          {
            "id": "mixed-b",
            "text": "Choisir la première solution qui paraît rapide.",
            "feedback": "La rapidité ne remplace pas un accord sur le diagnostic.",
            "criterion": "Décision prudente",
            "next": "closing"
          },
          {
            "id": "mixed-c",
            "text": "Proposer de recueillir des informations complémentaires à une date précise.",
            "feedback": "Cette option peut être utile si la recherche d'informations reste proportionnée et concertée.",
            "criterion": "Planification",
            "next": "closing"
          }
        ]
      },
      {
        "id": "closing",
        "stage": 3,
        "speaker": "Membre de l'équipe",
        "text": "Je préférerais que le passage reste utilisable pour tout le monde, sans qu'il soit nécessaire de chercher un coupable.",
        "prompt": "Comment terminer cette simulation ?",
        "choices": [
          {
            "id": "close-a",
            "text": "Reformuler les engagements réciproques, les ressources nécessaires et une date de revue.",
            "feedback": "La conclusion crée une référence commune et un suivi proportionné.",
            "criterion": "Suivi concret",
            "next": null
          },
          {
            "id": "close-b",
            "text": "Terminer sans confirmer qui fera quoi ni à quel moment.",
            "feedback": "Une fin imprécise expose à de nouvelles incompréhensions.",
            "criterion": "Responsabilités",
            "next": null
          },
          {
            "id": "close-c",
            "text": "Inviter chacun à vérifier le plan, puis consigner uniquement les décisions utiles.",
            "feedback": "La vérification collective et une trace sobre facilitent la suite sans surveillance.",
            "criterion": "Traçabilité responsable",
            "next": null
          }
        ]
      }
    ],
    "start": "start",
    "evidence": "Une fiche de prévention fictive : faits, hypothèses, action locale et revue.",
    "debrief": {
      "guidance": "Comparez les décisions sans additionner de points ni inférer un trait personnel.",
      "reflection": [
        "À quel moment la compréhension du problème a-t-elle changé ?",
        "Quelle option était plausible mais risquait de fermer l'échange ?",
        "Quelle action observable et proportionnée retenez-vous pour la suite ?"
      ]
    },
    "daci": "D03"
  },
  {
    "id": "S13",
    "moduleId": "M6",
    "title": "Une réunion hybride où les distants sont oubliés",
    "role": "Collègue à distance",
    "objective": "Faciliter une participation équitable et un relevé des décisions accessible.",
    "scene": "Dialogue fictif : mode texte opérationnel. Transposition VR/3D différée jusqu'aux modèles validés.",
    "nodes": [
      {
        "id": "start",
        "stage": 1,
        "speaker": "Collègue à distance",
        "text": "Pendant la réunion, plusieurs décisions ont été prises dans la salle sans que nous ayons pu intervenir.",
        "prompt": "Comment commenceriez-vous cet échange ?",
        "choices": [
          {
            "id": "explore",
            "text": "Merci de le signaler. Pouvez-vous préciser à quel moment la participation à distance est devenue difficile ?",
            "feedback": "Vous ouvrez une analyse des modalités de réunion plutôt que juger les participants.",
            "criterion": "Questionnement ouvert",
            "next": "calm"
          },
          {
            "id": "push",
            "text": "Vous auriez dû prendre la parole plus fort. Le groupe présent ne peut pas tout faire.",
            "feedback": "Cette réponse déplace la responsabilité sans traiter l'organisation de la réunion.",
            "criterion": "Respect du cadre",
            "next": "tense"
          },
          {
            "id": "partial",
            "text": "Nous allons annuler toutes les réunions hybrides immédiatement.",
            "feedback": "Une solution radicale risque de supprimer une possibilité de coopération utile.",
            "criterion": "Clarification progressive",
            "next": "mixed"
          }
        ]
      },
      {
        "id": "calm",
        "stage": 2,
        "speaker": "Collègue à distance",
        "text": "Lorsque la discussion s'accélère, nous n'avons plus le temps d'activer notre micro.",
        "prompt": "La discussion s'ouvre. Comment avancer ?",
        "choices": [
          {
            "id": "calm-a",
            "text": "Prévoyons un ordre du jour, des tours de parole et un document de décisions commun avant la prochaine réunion.",
            "feedback": "Vous proposez des changements testables, sans pénaliser les modalités de travail.",
            "criterion": "Construction d'un accord",
            "next": "closing"
          },
          {
            "id": "calm-b",
            "text": "Valider immédiatement une solution sans vérifier ses conditions de mise en œuvre.",
            "feedback": "L'accord est prématuré : les responsabilités et contraintes restent à expliciter.",
            "criterion": "Vérification",
            "next": "closing"
          },
          {
            "id": "calm-c",
            "text": "Résumer les faits connus et demander quels éléments restent à vérifier.",
            "feedback": "Cette option consolide la compréhension commune avant le plan d'action.",
            "criterion": "Synthèse",
            "next": "closing"
          }
        ]
      },
      {
        "id": "tense",
        "stage": 2,
        "speaker": "Collègue à distance",
        "text": "Nous avons essayé, mais j'ai l'impression que personne ne tient compte de nous.",
        "prompt": "La tension augmente. Comment rouvrir un dialogue constructif ?",
        "choices": [
          {
            "id": "tense-a",
            "text": "Reconnaître l'effet de ma formulation et revenir à des exemples précis.",
            "feedback": "Vous rouvrez l'échange sans exiger que l'autre personne accepte votre première réaction.",
            "criterion": "Réparation de dialogue",
            "next": "closing"
          },
          {
            "id": "tense-b",
            "text": "Rappeler que votre position hiérarchique clôt la discussion.",
            "feedback": "Cette attitude empêche l'examen des faits et ne résout pas le problème.",
            "criterion": "Respect mutuel",
            "next": "closing"
          },
          {
            "id": "tense-c",
            "text": "Proposer une pause, une reprise cadrée et une question ouverte.",
            "feedback": "Une reprise convenue peut désamorcer une tension, si elle n'est pas utilisée pour éviter le sujet.",
            "criterion": "Apaisement",
            "next": "closing"
          }
        ]
      },
      {
        "id": "mixed",
        "stage": 2,
        "speaker": "Collègue à distance",
        "text": "Le principal problème était peut-être l'absence de document partagé après la réunion.",
        "prompt": "Des zones d'ombre persistent. Quelle est la prochaine étape ?",
        "choices": [
          {
            "id": "mixed-a",
            "text": "Demander une reformulation du besoin principal, puis vérifier les faits disponibles.",
            "feedback": "Vous distinguez la demande, les observations et les éléments à confirmer.",
            "criterion": "Clarification",
            "next": "closing"
          },
          {
            "id": "mixed-b",
            "text": "Choisir la première solution qui paraît rapide.",
            "feedback": "La rapidité ne remplace pas un accord sur le diagnostic.",
            "criterion": "Décision prudente",
            "next": "closing"
          },
          {
            "id": "mixed-c",
            "text": "Proposer de recueillir des informations complémentaires à une date précise.",
            "feedback": "Cette option peut être utile si la recherche d'informations reste proportionnée et concertée.",
            "criterion": "Planification",
            "next": "closing"
          }
        ]
      },
      {
        "id": "closing",
        "stage": 3,
        "speaker": "Collègue à distance",
        "text": "Nous avons besoin d'un accès clair aux décisions, y compris lorsque nous ne pouvons pas être présents en direct.",
        "prompt": "Comment terminer cette simulation ?",
        "choices": [
          {
            "id": "close-a",
            "text": "Reformuler les engagements réciproques, les ressources nécessaires et une date de revue.",
            "feedback": "La conclusion crée une référence commune et un suivi proportionné.",
            "criterion": "Suivi concret",
            "next": null
          },
          {
            "id": "close-b",
            "text": "Terminer sans confirmer qui fera quoi ni à quel moment.",
            "feedback": "Une fin imprécise expose à de nouvelles incompréhensions.",
            "criterion": "Responsabilités",
            "next": null
          },
          {
            "id": "close-c",
            "text": "Inviter chacun à vérifier le plan, puis consigner uniquement les décisions utiles.",
            "feedback": "La vérification collective et une trace sobre facilitent la suite sans surveillance.",
            "criterion": "Traçabilité responsable",
            "next": null
          }
        ]
      }
    ],
    "start": "start",
    "evidence": "Une charte de réunion inclusive et un modèle de relevé de décisions.",
    "debrief": {
      "guidance": "Comparez les décisions sans additionner de points ni inférer un trait personnel.",
      "reflection": [
        "À quel moment la compréhension du problème a-t-elle changé ?",
        "Quelle option était plausible mais risquait de fermer l'échange ?",
        "Quelle action observable et proportionnée retenez-vous pour la suite ?"
      ]
    },
    "daci": "D04"
  },
  {
    "id": "S14",
    "moduleId": "M8",
    "title": "Une demande de classement RH à partir de quiz",
    "role": "Référent formation",
    "objective": "Préserver la valeur formative et recadrer une demande d'évaluation individuelle inappropriée.",
    "scene": "Dialogue fictif : mode texte opérationnel. Transposition VR/3D différée jusqu'aux modèles validés.",
    "nodes": [
      {
        "id": "start",
        "stage": 1,
        "speaker": "Référent formation",
        "text": "La direction voudrait classer les collaborateurs à partir des scores de nos exercices pour identifier les plus prometteurs.",
        "prompt": "Comment commenceriez-vous cet échange ?",
        "choices": [
          {
            "id": "explore",
            "text": "Les résultats sont formatifs. Clarifions plutôt le besoin d'amélioration du dispositif et les indicateurs agrégés possibles.",
            "feedback": "Vous rappelez la finalité initiale sans transformer l'activité en outil de sélection.",
            "criterion": "Questionnement ouvert",
            "next": "calm"
          },
          {
            "id": "push",
            "text": "Très bien, exportons tous les résultats nominativement.",
            "feedback": "Le détournement de finalité et le classement individuel introduisent des risques importants.",
            "criterion": "Respect du cadre",
            "next": "tense"
          },
          {
            "id": "partial",
            "text": "Supprimons toutes les évaluations et renonçons au retour pédagogique.",
            "feedback": "Cette réaction abandonne un outil utile au lieu d'en cadrer les usages.",
            "criterion": "Clarification progressive",
            "next": "mixed"
          }
        ]
      },
      {
        "id": "calm",
        "stage": 2,
        "speaker": "Référent formation",
        "text": "Nous voulions surtout savoir quelles parties du parcours méritaient davantage d'accompagnement.",
        "prompt": "La discussion s'ouvre. Comment avancer ?",
        "choices": [
          {
            "id": "calm-a",
            "text": "Proposons des critères d'amélioration de la formation, une politique de minimisation et une validation humaine du dispositif.",
            "feedback": "La proposition conserve la finalité pédagogique avec des garde-fous explicites.",
            "criterion": "Construction d'un accord",
            "next": "closing"
          },
          {
            "id": "calm-b",
            "text": "Valider immédiatement une solution sans vérifier ses conditions de mise en œuvre.",
            "feedback": "L'accord est prématuré : les responsabilités et contraintes restent à expliciter.",
            "criterion": "Vérification",
            "next": "closing"
          },
          {
            "id": "calm-c",
            "text": "Résumer les faits connus et demander quels éléments restent à vérifier.",
            "feedback": "Cette option consolide la compréhension commune avant le plan d'action.",
            "criterion": "Synthèse",
            "next": "closing"
          }
        ]
      },
      {
        "id": "tense",
        "stage": 2,
        "speaker": "Référent formation",
        "text": "La direction insiste : elle souhaiterait connaître le niveau de chaque personne.",
        "prompt": "La tension augmente. Comment rouvrir un dialogue constructif ?",
        "choices": [
          {
            "id": "tense-a",
            "text": "Reconnaître l'effet de ma formulation et revenir à des exemples précis.",
            "feedback": "Vous rouvrez l'échange sans exiger que l'autre personne accepte votre première réaction.",
            "criterion": "Réparation de dialogue",
            "next": "closing"
          },
          {
            "id": "tense-b",
            "text": "Rappeler que votre position hiérarchique clôt la discussion.",
            "feedback": "Cette attitude empêche l'examen des faits et ne résout pas le problème.",
            "criterion": "Respect mutuel",
            "next": "closing"
          },
          {
            "id": "tense-c",
            "text": "Proposer une pause, une reprise cadrée et une question ouverte.",
            "feedback": "Une reprise convenue peut désamorcer une tension, si elle n'est pas utilisée pour éviter le sujet.",
            "criterion": "Apaisement",
            "next": "closing"
          }
        ]
      },
      {
        "id": "mixed",
        "stage": 2,
        "speaker": "Référent formation",
        "text": "Nous pourrions analyser les difficultés des modules, mais les données disponibles sont très limitées.",
        "prompt": "Des zones d'ombre persistent. Quelle est la prochaine étape ?",
        "choices": [
          {
            "id": "mixed-a",
            "text": "Demander une reformulation du besoin principal, puis vérifier les faits disponibles.",
            "feedback": "Vous distinguez la demande, les observations et les éléments à confirmer.",
            "criterion": "Clarification",
            "next": "closing"
          },
          {
            "id": "mixed-b",
            "text": "Choisir la première solution qui paraît rapide.",
            "feedback": "La rapidité ne remplace pas un accord sur le diagnostic.",
            "criterion": "Décision prudente",
            "next": "closing"
          },
          {
            "id": "mixed-c",
            "text": "Proposer de recueillir des informations complémentaires à une date précise.",
            "feedback": "Cette option peut être utile si la recherche d'informations reste proportionnée et concertée.",
            "criterion": "Planification",
            "next": "closing"
          }
        ]
      },
      {
        "id": "closing",
        "stage": 3,
        "speaker": "Référent formation",
        "text": "Je comprends : les résultats doivent surtout nous aider à améliorer les activités, pas à juger les personnes.",
        "prompt": "Comment terminer cette simulation ?",
        "choices": [
          {
            "id": "close-a",
            "text": "Reformuler les engagements réciproques, les ressources nécessaires et une date de revue.",
            "feedback": "La conclusion crée une référence commune et un suivi proportionné.",
            "criterion": "Suivi concret",
            "next": null
          },
          {
            "id": "close-b",
            "text": "Terminer sans confirmer qui fera quoi ni à quel moment.",
            "feedback": "Une fin imprécise expose à de nouvelles incompréhensions.",
            "criterion": "Responsabilités",
            "next": null
          },
          {
            "id": "close-c",
            "text": "Inviter chacun à vérifier le plan, puis consigner uniquement les décisions utiles.",
            "feedback": "La vérification collective et une trace sobre facilitent la suite sans surveillance.",
            "criterion": "Traçabilité responsable",
            "next": null
          }
        ]
      }
    ],
    "start": "start",
    "evidence": "Une note de gouvernance : finalités, indicateurs agrégés et risques d'interprétation.",
    "debrief": {
      "guidance": "Comparez les décisions sans additionner de points ni inférer un trait personnel.",
      "reflection": [
        "À quel moment la compréhension du problème a-t-elle changé ?",
        "Quelle option était plausible mais risquait de fermer l'échange ?",
        "Quelle action observable et proportionnée retenez-vous pour la suite ?"
      ]
    },
    "daci": "D06"
  }
];
export function getBranchingScenario(id){return BRANCHING_SCENARIOS.find(s=>s.id===id)||null;}
export function startBranching(s){if(!s?.nodes?.length)throw new Error('Scénario invalide');return {scenarioId:s.id,nodeId:s.start,history:[],done:false};}
export function chooseBranch(s,state,choiceId){if(state.done||state.scenarioId!==s.id)throw new Error('État incompatible');const node=s.nodes.find(n=>n.id===state.nodeId);if(!node)throw new Error('Nœud inexistant');const c=node.choices.find(x=>x.id===choiceId);if(!c)throw new Error('Choix non autorisé');return {scenarioId:s.id,nodeId:c.next,history:[...state.history,{nodeId:node.id,stage:node.stage,choiceId:c.id,criterion:c.criterion,text:c.text,feedback:c.feedback}],done:c.next===null};}
export function pathSummary(s,state){return {title:s.title,steps:state.history.length,decisions:state.history.map(h=>({phase:h.stage,criterion:h.criterion,choice:h.text,feedback:h.feedback})),questions:s.debrief.reflection,evidence:s.evidence,notice:s.debrief.guidance};}
export function validateBranching(list=BRANCHING_SCENARIOS){const errors=[];for(const s of list){const ids=new Set(s.nodes.map(n=>n.id));if(ids.size!==s.nodes.length||!ids.has(s.start))errors.push('IDs '+s.id);for(const n of s.nodes){if(![1,2,3].includes(n.stage)||n.choices.length!==3||!n.text||!n.prompt)errors.push('Invalid node '+s.id+':'+n.id);for(const c of n.choices){if(c.next!==null&&!ids.has(c.next))errors.push('Broken link '+s.id+':'+c.id);if(!c.feedback||!c.criterion)errors.push('No feedback '+s.id+':'+c.id)}}for(const first of s.nodes[0].choices){let node=s.nodes.find(n=>n.id===first.next);if(!node||node.stage!==2||!node.choices.every(c=>s.nodes.some(n=>n.id===c.next&&n.stage===3)))errors.push('Unreachable final '+s.id)}}return errors;}
