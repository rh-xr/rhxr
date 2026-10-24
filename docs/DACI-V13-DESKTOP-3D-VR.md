# RH·XR DACI V13 — 3D sur PC et WebXR immersif

## Pourquoi le bouton VR peut être grisé sur un ordinateur

La méthode `navigator.xr.isSessionSupported('immersive-vr')` peut retourner `false` si le navigateur ne voit aucun système XR immersif exploitable. Une Preview HTTPS est nécessaire mais ne suffit pas à rendre un PC sans casque compatible avec le mode WebXR immersif. Ne pas créer de fausse session immersive ou forcer le bouton `Entrer en VR` dans cet état.

## Fonctionnement nouveau : visite 3D sur PC

Sur `/experiences/daci-v13/index.html` :

- Le bouton **« Visite 3D sur PC · plein écran »** agrandit la scène sans exiger de casque ; quitter le plein écran avec Échap.
- **W/S** ou flèches haut/bas : avancer / reculer.
- **A/D** : déplacement latéral.
- **Q/E** ou flèches gauche/droite : tourner.
- Cliquer et faire glisser sur la scène : regarder autour.
- Pointer puis cliquer sur un panneau de décision : choisir ; les explications et références DACI restent dans le panneau latéral.
- Un clic simple sur un panneau ne doit pas être confondu avec un mouvement de caméra. L'action directe est conditionnée à un mouvement inférieur à 9 pixels.
- Le mode texte et le bouton de lecture des passages DACI restent utilisables si WebGL échoue.

Sur un PC sans casque reconnu, le bouton `Entrer en VR (casque)` reste intentionnellement désactivé. C'est un contrôle correct, pas une erreur.

## Utilisation réellement immersive

Ouvrir la même URL HTTPS dans Meta Quest Browser, ou dans une configuration PC/casque/navigateur avec un runtime OpenXR/WebXR reconnu, puis vérifier la détection `immersive-vr`. Pour une entrée VR réelle, le navigateur doit être compatible, l'application doit être en contexte sécurisé et la session doit être lancée par un geste de l'utilisateur.

## Scénarios de recette

1. PC sans casque : vérifier **Visite 3D sur PC**, W/S/A/D/Q/E, rotation souris, clic sur les panneaux, affichage des retours et citations, choix des trois scénarios.
2. Plein écran : entrer, sortir avec Échap, vérifier les dimensions du canvas et l'absence de blocage des touches.
3. Écran tactile : test des dialogues et décisions hors WebGL et navigation 3D non obligatoire.
4. WebGL indisponible : les scénarios textuels fonctionnent, les deux boutons graphiques sont désactivés correctement.
5. Quest 3S réel : entrer/sortir de WebXR, manettes, locomotion, rotation et lecture des citations.
6. Également vérifier la simulation S02 dans le bureau GLB (route séparée : `/simulation.html?office=glb`).

Les tests CI valident l'intégrité des références et des points d'entrée, mais **pas les interactions VR physiques**. La Preview est protégée par l'authentification Vercel et peut demander une connexion.

N'effectuer aucune fusion tant que les essais Quest 3S ne sont pas validés.
