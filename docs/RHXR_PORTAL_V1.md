# RH·XR — portail éditorial V1 (6 novembre 2026)

## Ce que cette version apporte

- Nouvelle page d'accueil orientée visiteurs et besoins, moins centrée sur la technologie XR.
- Une base de connaissances de **13 fiches pédagogiques** couvrant huit domaines RH, avec fiches complètes et actions concrètes.
- Une bibliothèque filtrable de **11 ressources institutionnelles** (Maroc / France / UE / International). Chaque lien externe s'ouvre explicitement dans un onglet séparé ; la validité des obligations doit être contrôlée dans la juridiction concernée.
- **16 prompts RH** filtrables, personnalisables et copiables.
- Un générateur **déterministe et local** de fiche de poste : prévisualisation, copie et téléchargement `.txt`, sans API ni transmission serveur.
- Une page dédiée à la formation qui renvoie à la simulation S02 et au Studio. `simulation.html` et `studio.html` restent basés sur le moteur existant et ne changent que leur navigation.
- Une page d'explication des limites, usages et confidentialité.

## Statut d'intégration

Ce paquet est un **overlay** à déposer à la racine du dépôt `rh-xr/rhxr` :

1. Copier les fichiers fournis dans le dépôt en conservant les chemins.
2. **Ne pas supprimer** `assets/js/app.mjs`, `assets/js/scenario.mjs`, `assets/js/room.mjs`, `assets/css/app.css`, les modèles `.glb` ni les tests existants.
3. `index.html`, `simulation.html` et `studio.html` sont remplacés ; tous les autres fichiers sont ajoutés.
4. Exécuter `npm test` puis ouvrir le site et vérifier `index.html`, `ressources.html`, `fiche.html`, `bibliotheque.html`, `ia.html`, `formation.html`, `simulation.html`, `studio.html`.
5. Créer une branche `feature/rhxr-knowledge-ai-studio-v1`, ouvrir une PR, vérifier la Preview Vercel, puis fusionner après validation.

Les fichiers dans ce paquet ne contiennent pas les éléments existants du Lot 0 : il ne s'agit **pas d'une archive autonome du dépôt**. Elle doit être appliquée au dépôt existant.

## Choix technologiques

- Site statique, HTML/CSS et modules JavaScript ES2022 ; aucun service tiers IA requis.
- Les documents et champs sont assemblés en mémoire par le navigateur. Aucun compte, stockage utilisateur ou requête métier externe.
- La bibliothèque est une sélection éditoriale contrôlée au **6 novembre 2026**, pas un flux d'actualité ni une vérification juridique automatique.
- Aucun classement, score nominatif, prise de décision RH, ou service d'assistance juridique.
- Polices Google Fonts facultatives : si elles sont bloquées, les polices système prennent le relais. Le CSS les charge actuellement depuis une ressource externe : adapter pour une politique sans services tiers si souhaité.

## Prochaines évolutions

- Tests utilisateurs (mobile, clavier, contrastes, flux d'apprentissage).
- Plus de fiches, actualisation régulière et comité éditorial.
- Éditeur de contenus géré et versionné, sous réserve de besoin réel.
- Recherche documentaire contextualisée avec citations, après analyse de coûts, qualité, sécurité et traitement des données.
- Versions EN/AR et outils de personnalisation.
