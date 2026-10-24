# RH·XR V14.2 — Enrichissement pédagogique intégré dans le bureau V14.1

**Statut :** branche expérimentale `feature/v14-1-immersive-daci`, PR #7 en brouillon. Programme éducatif fictif, non destiné à prendre ou automatiser des décisions RH réelles.

## 1. Contenu préexistant conservé

| Source | Parcours | Décisions | Alternatives |
|---|---|---:|---:|
| DACI V13, inchangé | Médiation Amina/Youssef | 6 | Incluses dans les 54 V13 |
| DACI V13, inchangé | Entretien Alex | 7 | Incluses dans les 54 V13 |
| DACI V13, inchangé | Onboarding Salma | 7 | Incluses dans les 54 V13 |
| S02, inchangé | Désaccord professionnel | 3 | 9 |

Le corpus V13 conserve **20 décisions, 54 réponses rédigées, ses références fictives et son schéma d’origine**. S02 conserve ses trois étapes et ses neuf choix, sans lui attribuer de citations DACI qu’il ne possède pas.

## 2. Trois parcours pédagogiques supplémentaires

| Nouveau parcours | Problème joué | Quatre étapes d’apprentissage |
|---|---|---|
| Recrutement responsable | Présélection de Lina avec propositions produites par un outil d’IA | Critères avant les candidatures ; contrôle humain des classements ; accessibilité de l’entretien ; justification et confidentialité |
| Données et confidentialité | Dossier d’intégration d’Adam et partage excessif de données | Minimisation ; droits d’accès ; vigilance face au chatbot public ; signalement d’une erreur de diffusion |
| Coopération hybride | Collaborateurs au bureau et à distance reçoivent des informations différentes | Décisions communes ; participation équitable ; clarification des horaires et des urgences ; plan de suivi |

Chaque situation propose quatre scènes et trois choix écrits par scène, avec **conséquence dialoguée, qualité formative du choix, rétroaction et fiche-repère interne à l’exercice**. Total des trois parcours : **12 étapes et 36 réponses commentées**.

Les fiches repères ajoutées portent explicitement le titre **« Fiche pédagogique fictive RH·XR »** et des identifiants locaux `urn:rhxr:daci:fiche-exercice-v14@1.0.0#...`. Ce ne sont ni des textes de loi, ni des politiques d’entreprise vérifiées, ni des citations académiques externes.

## 3. Expérience pédagogique enrichie

L’interface V14.1 conserve la scène validée par l'utilisateur (Mona Lisa **312°**, mobilier rapproché, bureau à 90 %, panneaux DACI premium derrière Mona Lisa), tout en offrant :

1. **Sept missions** : 3 missions DACI V13 + S02 + 3 nouveaux cas. Les missions sont paginées par quatre dans le Quest, pour éviter des panneaux trop nombreux dans une même rangée.
2. **Dossier avant l’action** : rôle, situation, support fictif à consulter, objectif, compétences à exercer, question de préparation et point de vigilance. Accessible en VR et dans le guide HTML.
3. **Décision interactive** : choix à la gâchette en VR ou au bouton dans le guide. Le retour comprend la réaction du personnage, l’explication formative et le repère DACI fictif disponible.
4. **Progression visible** : nombre d’étapes effectuées sur le total de la mission, sans score d'employé.
5. **Débriefing par compétences** : nombre de choix appropriés, à approfondir et à réexaminer ; synthèse des observations et exercice de transfert.
6. **Fiche exportable** : génération locale `.md` d’un bilan pédagogique anonymisé basé uniquement sur le parcours fictif. Aucune sauvegarde serveur ni entrée de données personnelles.
7. **Catalogue imprimable** : `/experiences/rhxr-v14-1/parcours.html`, accès direct à chaque mission via `?mission=`.

## 4. Articulation XR, IA et DACI

- **VR / 3D :** les décisions, briefings et sources sont intégrés aux panneaux cliquables de la scène Quest, avec équivalent accessible sur ordinateur.
- **DACI — augmenté :** le support pédagogique est associé à des scènes, réactions et actions plutôt qu’à une simple lecture.
- **DACI — connecté :** les identifiants de sources internes de démonstration lient chaque alternative à son repère d’exercice, et les parcours disposent de liens dédiés.
- **DACI — intelligent (niveau actuel) :** règles déterministes de branchement, qualité formative, rappel du dossier, retour contextualisé et synthèse des décisions. **Ce n’est pas une IA générative active** : l’utilisation d’une IA en recrutement fait partie de l’exercice, pas d’un classement réel.
- **AR :** aucune nouvelle activité AR n’est implémentée par ce lot. L'intégration AR de documents physiques reste une future piste distincte.

## 5. Modèle d’évaluation recommandé pour la recette

Tester chaque mission au moins une fois dans le Quest et sur ordinateur. Pour les trois nouvelles missions, explorer les réponses appropriées, incomplètes et risquées. Vérifier que les extraits portent la mention fictive, que les données personnelles ne sont jamais demandées et que le bilan ne se présente pas comme une décision RH.

Vérifier la pagination des sept missions, la lisibilité de la page de briefing près du mur, les commandes Quest, la navigation, la génération locale du `.md`, la consultation du catalogue et les liens `?mission=`.

## 6. Sources internes et statut

- `experiences/daci-v13/v13-bundle.json` : source V13 originelle, non modifiée.
- `assets/js/scenario.mjs` : source S02 originelle, non modifiée.
- `assets/js/content-cases-v14-2.mjs` : cas ajoutés, consignes et dossiers pédagogiques.
- `assets/js/learning-v14-1.mjs` : moteur des sept parcours, états et retours.
- `assets/js/spatial-learning-v14-1.mjs` : interactions VR par panneaux.
- `assets/js/learning-recap-v14-2.mjs` : synthèse locale imprimable.
- `experiences/rhxr-v14-1/index.html` et `parcours.html` : guide, progression et catalogue.

**Ce contenu est un prototype pédagogique.** Les valeurs affichées dans les scénarios ne sont ni des normes juridiques, ni des procédures réelles validées. Les adaptations à un employeur devront être relues par les professionnels compétents avant emploi institutionnel.
