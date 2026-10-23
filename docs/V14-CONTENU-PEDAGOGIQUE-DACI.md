# RH·XR V14 — Architecture pédagogique RH + DACI

**Base vérifiée dans V13 :** le corpus DACI expose trois parcours : **conflit** (6 nœuds de décision), **entretien** (7) et **onboarding** (7). Ensemble : 20 nœuds de décision / 20 ancres XR, avec 54 réponses alternatives. Le prototype S02 séparé comprend 3 étapes et 9 choix. Tous ces contenus sont fictifs.

## 1. Architecture commune des missions

Chaque parcours doit réutiliser une structure documentaire plutôt que coder les réponses dans le moteur 3D :

```text
mission
  id, version, objectifs, public, difficultés
  situation, rôles, règles de sécurité (fiction uniquement)
  nœuds [introduction, décision, réaction, remédiation, conclusion]
    consigne
    choix plausibles
      conséquence pour le personnage
      analyse de l'option (argumentée)
      texte DACI source + citation stable
      destination de progression
  débriefing final
    compétences exercées
    erreurs fréquentes
    alternatives possibles
    réflexion personnelle guidée
```

Les **données de formation** appartiennent à `content/rhxr-v14/scenarios` et `content/rhxr-v14/daci`. Le moteur de scénario doit pouvoir être testé sans chargement Three.js ni session WebXR.

## 2. Catalogue initial (sans perdre l'existant)

| Mission | Scène de départ | Compétences visées | Débriefing attendu |
| --- | --- | --- | --- |
| Intégration de Salma | Première semaine de Salma | accueil, clarification, autonomie, orientation | points d'incertitude et aide utile à un nouveau collaborateur |
| Entretien avec Alex | Entretien constructif | questionnement, écoute, objectifs réalistes, feedback | qualité du cadre, formulation d'objectifs, actions convenues |
| Conflit Amina–Youssef | Tension autour des tâches | impartialité, écoute des faits, désescalade, suivi | séparation faits/interprétations, méthode de médiation |
| Désaccord S02 | Collaborateur contestant les urgences | écoute active, clarification des faits, solutions | retour sur les trois compétences, choix alternatifs |

### Plusieurs niveaux de profondeur

- **Initiation :** expliciter les enjeux, trois options pertinentes, remédiation guidée.
- **Pratique :** conséquences nuancées, informations partielles, justifications à expliciter.
- **Avancé :** plusieurs contraintes simultanées, alternatives défendables, gestion des tensions avec contrôle des biais ; pas de score global assimilé à une évaluation professionnelle.

Les niveaux avancés sont **une cible V14**, pas une propriété du corpus V13 déjà livrée. Ne pas ajouter mécaniquement des réponses sans améliorer la crédibilité.

## 3. Exemple concret : conflit, C1

**Source existante V13 :** Amina déclare : « Youssef ne fait jamais sa part, c’est insupportable. » La question demande une première intervention professionnelle. Le corpus comprend notamment une option qui écoute chacun et examine les faits, ainsi qu'une option de sanction immédiate ; cette dernière entraîne un retour pédagogique indiquant qu'un parti pris prématuré compromet l'écoute équitable.

**Citation documentaire existante :** `urn:rhxr:daci:mediation@1.0.0#MED-01`, titre *Écoute équitable*, passage sur la description des faits sans présumer des responsabilités.

### Transcription d'usage cible V14

1. Dans la salle : personnage et émotion verbale, contexte non accusatoire ; sous-titres accessibles.
2. Au moment de décider : **une consigne visible, puis trois cartes d'options** lisibles dans le casque.
3. Après le choix : réaction contextualisée du personnage, pas un simple « correct/incorrect ».
4. En arrière-plan, un indicateur « Document DACI disponible » ; ouvrir et consulter **titre, extrait, référence, explication**, puis revenir au dialogue sans perdre l'état.
5. Au débriefing : identifier la compétence exercée (écoute équitable), le risque de réaction prématurée et une alternative professionnelle.

**Amélioration éditoriale à rédiger et faire valider :** davantage de contexte sur la répartition des tâches, possibilité de demander des exemples à chacun, explicitation de la distinction entre conflit interpersonnel et organisation du travail. Ceci est une proposition pédagogique V14 **et non un contenu déjà présent dans la V13**.

## 4. Qualité des choix et retours

Revue éditoriale de chaque nœud :
- Les choix doivent être linguistiquement naturels pour un responsable RH ou un formateur ; éviter les distracteurs caricaturaux trop faciles.
- Les conséquences doivent être proportionnées, pas moralistes ; éviter qu'une option soit annoncée comme universellement correcte sans contexte.
- Les personnages doivent pouvoir réagir de manière plausible à la décision.
- La remédiation doit expliquer « pourquoi », relier la décision à un élément du DACI, et proposer un acte professionnel constructif.
- La bibliographie/les politiques fictives doivent être affichées comme fictives, sans les faire passer pour du droit du travail applicable.
- Éviter la répétition automatique des messages dans 3 modalités d'accès.
- Accessibilité : sous-titres, réglages de taille, version texte complète, langue source explicite.

## 5. Intelligence / adaptation progressive

**V14 socle :** scénarios déterministes traçables et sélection de remédiations selon erreurs/état du parcours ; ce n'est pas un moteur d'IA générative.

**V14+ optionnel :** dialogue génératif sur corpus DACI vérifié, uniquement si validation explicite, garde-fous, consentement, absence de données réelles et sources citées. L'IA ne doit pas modifier silencieusement la grille de progression ni produire des jugements RH individuels.

## 6. Revue de qualité

Valider par scénarisation complète des quatre missions, revue d'un spécialiste pédagogique RH, contrôle humain des citations et test de compréhension dans le casque. Évaluer la connaissance par protocole indépendant plutôt que déduire l'efficacité éducative du simple nombre de clics ou de la performance graphique.
