# RH·XR — Ressources humaines, IA responsable et apprentissage immersif

Portail pédagogique indépendant qui réunit **documentation RH**, **outils locaux d'assistance**, **promptothèque** et **simulations 3D/WebXR**. Il n'est pas destiné à gérer des dossiers individuels ni à prendre des décisions RH.

## Espaces proposés

| Espace | Fonction |
|---|---|
| Accueil (`index.html`) | Orientation, accès aux ressources et au bureau immersif |
| Comprendre les RH (`ressources.html`) | 19 fiches pratiques dans huit domaines |
| Documentation (`bibliotheque.html`) | 20 sources sélectionnées, filtrables par juridiction et type |
| AI Studio (`ia.html`) | 22 prompts éditables, générateur de fiche de poste et trois trames RH locales |
| Formation & XR (`formation.html`) | Bureau V14.1, sept missions, simulation S02 et Studio pédagogique |
| Bureau immersif (`experiences/rhxr-v14-1/index.html`) | Expérience 3D/WebXR principale avec mobilier GLB, avatar Badr Han et guide textuel |
| S02 (`simulation.html`) | Simulation guidée en mode texte, option 3D facultative |
| Studio (`studio.html`) | Consultation pédagogique et export JSON |

Le catalogue documentaire est éditorial : **aucune actualisation automatique des textes juridiques n'est annoncée**. Les sources du Maroc, de la France, de l'Union européenne et de l'OIT doivent être replacées dans leur champ d'application. Les dates de consultation ne garantissent pas qu'un texte reste à jour.

## IA — capacités réelles

Les prompts préparent des demandes à copier vers un outil choisi par l'utilisateur. Les quatre générateurs locaux utilisent des modèles déterministes : ils ne sont **pas** connectés à un modèle d'IA générative et n'effectuent aucun appel API. La recherche de références officielle de l'AI Studio est également locale. Ne pas saisir de CV réel, d'informations confidentielles ni de données sensibles.

Les scénarios et avatars sont fictifs. Ni leurs choix ni leurs scores pédagogiques ne doivent servir au recrutement, à la promotion, à une sanction ou à la surveillance du personnel.

## Développement et vérification

Node.js >=20 recommandé.

```bash
npm test
npm start
# http://localhost:4173
```

Le site est statique (HTML, CSS, modules JavaScript). Le serveur local de développement ne conserve pas de résultats personnels. La 3D charge Three.js et ses outils de décodage depuis des CDN ; WebGL et Internet sont nécessaires. Le mode VR suppose un navigateur, un casque et un contexte sécurisé compatibles.

## Prévisualisation et validation

Les améliorations du portail sont proposées dans la PR [#8](https://github.com/rh-xr/rhxr/pull/8), branche `feature/rhxr-knowledge-ai-studio-v1`. La branche `main` n'est pas modifiée avant une fusion explicitement validée.

Avant toute publication en production : exécuter les tests, inspecter la Preview Vercel sur PC et smartphone, vérifier l'accès sans casque aux missions et contrôler le bureau V14.1 sur Quest 3S (avatar, fauteuil, collisions, performances).

Voir `docs/RHXR_EDITORIAL_V1_1.md`, `docs/RHXR_V14_OFFICE_INTEGRATION.md`, `docs/SECURITY.md` et `docs/ROADMAP.md`.
