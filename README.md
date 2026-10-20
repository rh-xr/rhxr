# RH·XR — Human Resources Extended Reality

Plateforme indépendante de formation immersive RA/RV/IA appliquée aux ressources humaines.

## Lot 0 — démonstrateur pédagogique

- Portail Web responsive et huit modules décrits (les modules futurs sont explicitement signalés).
- Simulation **S02 — Gérer un désaccord professionnel** : 3 phases, 9 décisions, débriefing et score *strictement formatif*.
- Studio de consultation et export JSON du scénario.
- Salle 3D Three.js expérimentale avec entrée WebXR si le matériel le permet ; l'exercice textuel reste disponible.
- Aucune authentification, collecte nominative, conservation d'audio ou publication de résultat personnel.

## Lancer en local

Prérequis : Node.js >= 20.

```bash
npm test
npm start
# http://localhost:4173
```

La simulation 2D fonctionne sans dépendance externe. La scène 3D facultative nécessite Internet pour charger Three.js depuis un CDN.

## État

Ceci est **un prototype Lot 0**, pas un logiciel RH de production : les comptes, Payload CMS, PostgreSQL, l'IA conversationnelle, les analytics et les modules RA sont des extensions futures. Les scènes, situations et personnages sont fictifs. Le score ne doit jamais servir à l'embauche, à la promotion, à la sanction ou à la surveillance d'employés.

Développement par branches/PR ; ne pas ajouter de données RH réelles. Voir `docs/`.

## Déploiement de démonstration (Vercel)

Le projet Vercel est connecté au dépôt `rh-xr/rhxr`. La branche de production `main` ne contient pour l'instant que le document d'initialisation ; une erreur 404 sur sa racine est donc attendue.

**Pour examiner la version exécutable sans fusionner :** utiliser le déploiement **Preview** de la branche `feature/lot0-prototype`, qui comporte `index.html`, `simulation.html`, `studio.html` et les ressources dans `assets/`.

Le site est statique : Application Preset = Other, Root Directory = `./`, sans variables d'environnement et sans commande de construction spécifique. Vérifier la Preview sur ordinateur, smartphone puis Quest 3S avant de fusionner la Pull Request.
