# RH·XR — Recette de la scène DACI WebXR V13

## Portée de la branche

Branche indépendante `feature/daci-webxr-v13` ajoutant `experiences/daci-v13/` et un accès depuis le portail. Aucun changement dans `assets/js/room.mjs`, `assets/js/locomotion.mjs` ou `assets/js/scenario.mjs`. Les PR #2, #3 et #4 conservent leurs historiques séparés.

## Contenu

- Trois parcours fictifs : intégration (Salma), entretien (Alex), conflit (Amina/Youssef).
- 54 possibilités de réponse avec conséquence et citation DACI ; 20 points d'interaction XR.
- Salle WebGL procédurale autonome ; aucun GLB, CDN, moteur IA ou accès aux RH réelles.
- Navigation 2D utilisable si la VR est indisponible.
- Lien direct depuis le tableau de bord : `/experiences/daci-v13/index.html`.

## Contrôles reproductibles

Exécuter `npm test` à la racine, puis vérifier que le script est servi en UTF-8 et que `/experiences/daci-v13/v13-bundle.json` répond avec un JSON valide.

Sur ordinateur : vérifier le chargement WebGL, les trois scénarios, les décisions, les feedbacks, les citations et les options de redémarrage. Simuler WebGL indisponible pour confirmer le mode texte. Tester aussi sur mobile.

Sur un Meta Quest 3S, depuis une **Preview HTTPS** (et non `127.0.0.1` du PC) :
1. Ouvrir la page dans Meta Quest Browser, contrôler la scène 2D et l'accès au bouton VR.
2. Entrer/sortir/rentrer en VR ; constater si `immersive-vr` est pris en charge.
3. Vérifier les deux gâchettes et les panneaux, le joystick gauche et la rotation par paliers au joystick droit.
4. Terminer les trois scénarios, consulter les DACI, puis revenir au portail.
5. Vérifier confort, fluidité, comportement après interruption de session et absence de régression de l'ancienne simulation S02.

## Limites

La présence d'un appel `requestSession('immersive-vr')` et les tests logiciels ne démontrent **pas** une validation réelle sur Meta Quest 3S. Les options sont strictement pédagogiques, fictives et non destinées aux décisions de carrière.

Ne pas fusionner avant confirmation de la Preview HTTPS et de l'essai matériel Quest 3S.
