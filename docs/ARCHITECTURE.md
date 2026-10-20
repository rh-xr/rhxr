# Architecture — RH·XR Lot 0

- Application HTML/CSS/ESM statique, sans serveur métier ni authentification.
- `assets/js/scenario.mjs` : moteur d'états versionné ; logique indépendante de l'interface.
- `assets/js/app.mjs` : portail, simulation et inspecteur pédagogique.
- `assets/js/room.mjs` : visualisation 3D Three.js chargée à la demande depuis un CDN ; WebXR expérimental.
- `tests/` : sept vérifications automatisées du modèle pédagogique.
- `scripts/serve.mjs` : serveur HTTP de développement, sans persistance.

Futures couches (non implémentées) : CMS Payload, API métier, comptes/rôles, PostgreSQL, R2 privé/public selon classification, moteur d'avatars IA et observabilité. Ne pas confondre cette maquette avec le produit final.
