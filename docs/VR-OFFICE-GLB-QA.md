# RH·XR — Intégration de trois GLB dans le bureau VR

## Origine des fichiers
Les objets proviennent du commit Git `e9a337318157864cdbfef5aa70f68de6f0784e6b` dans le dépôt `rh-xr/rhxr`. Les GLB sont copiés par **réutilisation de leurs objets Git d'origine**, sans conversion ni modification.

| Objet GLB | Rôle | Enveloppe maximale de placement | Centre au sol |
| --- | --- | --- | --- |
| `desk.glb` | bureau principal | 3,55 × 1,15 × 1,75 m | (0, 0, −2,35) |
| `amrchair.glb` | fauteuil du responsable RH | 1,12 × 1,42 × 1,05 m | (0, 0, −4,45) |
| `chair.glb` | chaise du visiteur | 1,02 × 1,18 × 1,02 m | (0, 0, 0,05) |

Le placement est calculé depuis la boîte englobante du modèle GLB, avec conservation des proportions et appui au sol. **L'orientation de façade de chaque fichier n'a pas encore été confirmée visuellement sur Quest.** Pour l'instant, la chaise visiteur reçoit une rotation de 180° autour de Y.

## Chargement et dépendances

Le bureau 3D S02 est monté par `assets/js/room.mjs` ; le module `assets/js/office-furniture.mjs` charge les trois GLB depuis `assets/models/`.

L'analyse des trois fichiers glTF signale des textures WebP et une géométrie compressée **KHR_draco_mesh_compression**. Cette dernière exige un décodeur Draco, raccordé via les versions fixes de Three.js 0.169.0. Le module Three.js et le décodeur sont chargés depuis des CDN pour le prototype. Les GLB restent sur l'hébergement RH·XR ; aucune URL GitHub de contenu brut n'est nécessaire à l'exécution.

Chaque GLB remplace sa seule contrepartie procédurale après son chargement. Le mode texte et les commandes WebXR demeurent fonctionnels lorsqu'un chargement échoue.

## Accès à l'expérience

Depuis le portail : ouvrir **Simulations RH**, puis « Activer la 3D ». Depuis la page WebXR DACI V13 : lien **Bureau VR meublé (S02)**, qui ouvre `/simulation.html?office=glb` et active automatiquement le bureau.

Ce nouveau bureau meublé est celui de la simulation **S02**. La salle indépendante des trois dialogues DACI V13, située sous `/experiences/daci-v13/`, reste encore procédurale. Ne pas les présenter comme une même salle ni comme une intégration complète des GLB au moteur WebXR V13.

## Recette à effectuer sur Meta Quest 3S

1. Authentifier l'accès à la Preview HTTPS protégée par Vercel.
2. Ouvrir `/simulation.html?office=glb`, confirmer le chargement des trois objets et le compteur « mobilier GLB 3/3 ».
3. Inspecter chaque objet sous tous les angles : orientation des dossiers, taille, base au sol, textures, absence de déformation et collision visuelle.
4. Activer « Entrer en RV » et vérifier déplacements par stick gauche, rotation par stick droit et marche réelle.
5. Tester les options pédagogiques S02, sortir/rentrer en RV, observer la fluidité.
6. Simuler l'indisponibilité de Draco ou d'un GLB : le modèle simplifié doit rester visible sans bloquer la simulation.
7. Vérifier le navigateur d'ordinateur et sur smartphone, puis la scène DACI V13 indépendante.

## Contrôles automatiques et limites

Les contrôles CI vérifient les signatures GLB, la version glTF, les tailles, les références locales, les extensions requises, le chargement de secours, la composition de la salle et la conservation du moteur de locomotion.

Ces contrôles **ne prouvent pas** que les trois modèles sont esthétiquement orientés ou chargent sans difficulté sur Quest 3S. Les GLB ne sont pas accompagnés de métadonnées de licence dans le dossier source fourni : leurs droits d'utilisation et de diffusion devront être confirmés avant toute publication hors contexte de démonstration.

Ne pas fusionner la PR #5 avant validation sur le casque.
