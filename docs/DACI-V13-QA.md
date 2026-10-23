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

## Accès à la Preview et contrôle du repli 2D (audit du 23/10/2026)

La Preview Vercel de la branche est marquée **Ready**, mais les paramètres du projet indiquent une **protection SSO** sur les URL `*.vercel.app`. Un navigateur non authentifié (y compris Quest Browser) peut être redirigé vers une page Vercel avant de voir l'expérience. Cela ne constitue pas une erreur WebXR : tester d'abord l'accès authentifié sur ordinateur, puis sur le casque. Ne pas désactiver la protection globalement pour contourner ce contrôle.

Dans les environnements où WebGL est absent, perdu ou échoue lors de l'initialisation des shaders, vérifier que :
- les **choix, explications et citations DACI restent accessibles** en mode texte ;
- le statut annonce « WebGL indisponible · parcours textuel actif » ;
- le bouton **Entrer en VR** reste désactivé, plutôt que de proposer une session impossible ;
- le lien « Retour au portail RH·XR » permet de revenir à la page d'accueil.

**Preuve disponible :** contrôles Chromium en mode WebGL absent et en mode initialisation GL simulée en échec, sans exception JavaScript non gérée. **Limite :** aucune confirmation physique Quest 3S et aucun test HTTP du contenu de la Preview derrière SSO ; GitHub CI et l'état Ready de Vercel ne suffisent pas à les remplacer.

## Amélioration ergonomique V13 (23/10/2026)

Les retours d'utilisabilité ont motivé les points suivants sur la branche isolée :
- Commandes en VR pour parcourir les trois simulations sans retirer le casque (panneaux « parcours précédent/suivant »).
- Mise en évidence dorée du panneau visé par une manette, lorsque la pose de pointage est disponible.
- Extraits DACI affichés **en toutes lettres** sur un panneau VR temporaire, et non plus uniquement sous forme d'URN ; retour à la scène de décisions via « Fermer le document ».
- Panneaux de décision réhaussés pour être plus facilement visibles.
- Accès rapide aux choix et dialogues en mode mobile.

Contrôles obtenus : six parcours de bout en bout (trois scénarios x ordinateur/mobile) avec vérification des références et du mode WebGL indisponible. Le rendu VR physique, les mouvements des contrôleurs et la lisibilité dans Meta Quest 3S ne sont **pas encore validés** ; il faut les tester avant fusion.
