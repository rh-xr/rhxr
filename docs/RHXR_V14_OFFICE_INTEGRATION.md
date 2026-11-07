# RH·XR — Réintégration du bureau immersif V14.1
Date : 7 novembre 2026

## Origine
- Branche conservée : `feature/v14-1-immersive-daci`, commit `84820f459ce1e2794fc806de4efd75c1961e2981`.
- Expérience source : `experiences/rhxr-v14-1/index.html`.
- Modèle Badr Han + fauteuil : `assets/models/badr-han-ch_c.glb`, objet Git intact `4dbb45fa169373bd366918628b163de06f43f28e`.
- Les modèles desk.glb, chair.glb et les modèles de secours existaient déjà dans main ; ils sont conservés sans modification.

## Intégration
- Une entrée principale « Bureau 3D » figure dans la navigation du nouveau portail RH·XR.
- La page Formation & XR présente l'expérience et permet d'ouvrir directement certaines missions.
- La simulation S02 charge par défaut le bureau premium V14.1 lors de l'activation de la 3D ; le parcours textuel demeure indépendant.
- Le paramètre `?office=classic` restaure le bureau classique de S02 ; `?office=v14` permet le prototype premium précédent.
- Les pages V13 et V14, les documents et les sept missions fictives restent accessibles depuis l'expérience.
- Les imports Three.js et Draco utilisent les CDN préexistants. La 3D exige WebGL et une connexion réseau ; la fonction WebXR requiert du matériel compatible et un contexte sécurisé.

## Limites
- L'avatar Badr Han est une ressource 3D visuelle : ni conversation générative, ni reconnaissance vocale.
- L'exercice n'envoie pas de dossiers RH nominatifs et ne doit servir ni à l'embauche ni à la sanction.
- Vérifier visuellement l'échelle du modèle, le contact des chaussures et du fauteuil avec le plancher, la fluidité du Quest et les collisions sur matériel réel. Le test automatisé ne garantit pas ces points.
- La production n'est pas modifiée sans validation distincte.
