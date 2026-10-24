# RH·XR V14.1 — Avatar Mona Lisa sur le fauteuil RH

## Révision du 24 octobre 2026 — implantation compacte et DACI sur le mur

Ces choix remplacent les essais d'espacement et d'orientation décrits dans l'historique ci-dessous.

- **Mona Lisa orientée par défaut à 312°**, valeur jugée correcte lors de la vérification réelle de l'utilisateur dans Quest 3S. Le GLB reste statique, en taille 110 % de la première enveloppe.
- **Bureau principal** : toujours à `z=-2,35`, enveloppe réduite de 10 % : 3,195 × 1,035 × 1,575 m.
- **Fauteuil du responsable** : `z=-3,75`, avancé de 35 cm depuis l'essai précédent ; **chaise visiteur** : `z=-0,98`, avancée de 68 cm. Les séparations géométriques entre leurs enveloppes et celle du bureau sont **8,75 cm** et **7,25 cm** respectivement. Il s'agit de marges théoriques de boîtes englobantes, non d'une garantie contre des collisions avec les accoudoirs ou Mona Lisa.
- **Avatar Mona Lisa** aligné sur le fauteuil : position `[0,0,-3,75]`, assise visuelle `y=0,51`.
- **Panneaux pédagogiques DACI** : déplacés de l'ancrage devant le regard utilisateur vers **le mur derrière Mona Lisa** ; position du groupe `[0,72, 2,65, -7,18]` m, facteur d'échelle **0,82**, soit une réduction d'environ 18 %.
- Les fonds des textures des panneaux DACI sont **entièrement transparents**, avec bordures fines sur les caractères pour le contraste. Ces panneaux sont immobiles dans la salle : ils ne suivent plus le casque.
- Les deux petits contrôles de rotation de Mona Lisa sont aussi déplacés contre le mur, à `x=4,02`, `z=-7,17`, avec fond transparent et dimension réduite. Les boutons du guide restent disponibles sur ordinateur.
- Les commandes de rotation **±45°** restent disponibles, en partant désormais de 312° (par ex. 312° → 357° → 42°).
- Ces changements sont limités à **V14.1**, pas au bureau S02/V14 stable. Les imports JavaScript de la V14.1 utilisent de nouveaux identifiants de cache.

**Recette Quest à réaliser** : vérifier l'espacement réel des meubles (y compris les accoudoirs, les jambes et les vêtements), confirmer le visage de Mona Lisa à 312°, s'approcher du mur pour lire et sélectionner les contenus DACI, vérifier que les panneaux n'occultent plus la conversation ni la vue, tester les deux commandes de rotation et les quatre missions. Les marges de 7–9 cm doivent être ajustées si les modèles se traversent visiblement.

---


## Mise à jour du 24 octobre 2026 — mobilier rapproché et rotation à 45°

Le **réglage actuel** dans V14.1 est le suivant :

- Bureau `desk.glb` redimensionné uniformément à **90 %**, enveloppe de 3,55 × 1,15 × 1,75 m à **3,195 × 1,035 × 1,575 m**. Son centre reste au même endroit.
- Fauteuil du responsable `amrchair.glb` avancé de **35 cm** (z : −4,45 → **−4,10**).
- Chaise du visiteur `chair.glb` avancée de **35 cm** (z : +0,05 → **−0,30**).
- Mona Lisa reste centrée sur son fauteuil (z = −4,10), avec l'agrandissement précédent de 10 %, sans déformation.
- Deux commandes, **+45°** et **−45°** : une sélection ne tourne **jamais** le modèle de 180° directement. Les huit orientations successives possibles couvrent 360°.
- Les boutons sont disponibles dans le guide 2D et sous forme de **deux panneaux 3D** sélectionnables par les manettes Quest.
- La valeur initiale est conservée à 180°, mais on peut affiner progressivement par pas de 45° et lire l'angle réel affiché.
- Les routes S02 et V14 anciennes conservent leurs placements initiaux, grâce à un plan d'implantation spécifique V14.1.
- **46 tests GitHub Actions réussis** sur la version de code avant mise à jour de la présente documentation. Le rendu Quest reste à vérifier.

Le point visuel important est désormais la marge restante entre le bureau réduit et les deux sièges, et l'absence d'intersections entre Mona Lisa et le fauteuil après chaque rotation.

### Instructions actuelles de recette

1. Ouvrir `/experiences/rhxr-v14-1/index.html` dans Quest Browser et entrer en VR.
2. À droite du fauteuil RH, sélectionner « MONA LISA +45° » ou « MONA LISA −45° » avec une manette.
3. Vérifier chaque déplacement angulaire de **45°**, et les angles affichés (par ex. 180° → 225° → 270°).
4. Vérifier la proximité des meubles, leur absence d'intersections et la liberté de mouvement autour du bureau.
5. Si les boutons ne semblent pas mis à jour, rouvrir la Preview du dernier commit plutôt qu'une ancienne URL mémorisée.

---


## Provenance et intégrité

Le fichier `assets/models/mona-lisa.glb` est repris **sans conversion** depuis le commit GitHub `8587c40216a1bcbc881445b9123fe0168058f6ab` du dépôt `rh-xr/rhxr`.

- **Blob Git original :** `b49417c0050d7e1c7dfe4773c8ea8d65806f4f6d`.
- **Taille :** 3 020 580 octets (environ 3,02 Mo).
- **Format :** glTF 2.0 GLB, compression `KHR_draco_mesh_compression`, 1 maille et 2 textures.
- **Animation :** aucun squelette, aucune animation intégrée, **pose statique**.
- **Dimensions géométriques brutes (accessors) :** boîte approximative 1,39 × 1,90 × 1,15 unités. Les unités artistiques réelles et la pose doivent être confirmées au casque.
- La licence et les droits de diffusion hors dépôt/démonstrateur ne sont pas documentés par le modèle fourni.

## Implantation

Le fauteuil du responsable RH est `amrchair.glb`, centré à `x=0, z=-4.10` (V14.1, avancé de 35 cm).

Le modèle Mona Lisa :
- est placé au même centre horizontal `[0, -4.10]` ;
- est réduit uniformément, sans déformation, dans une enveloppe maximale **1,001 × 1,463 × 1,012 m** (soit +10 % par dimension, sans déformation) ;
- a sa base apparente alignée à la hauteur `y=0.51 m` (hauteur de coussin estimée, à confirmer sur Quest) ;
- possède une orientation nominale de **180°**, modifiable temporairement à 0° pour comparer via `?avatarYaw=0`.

**Important :** l'ajustement de la base du GLB sur l'assise n'est pas une opération d'animation ni de rigging. Le modèle peut représenter une personne dont les jambes, le siège intégré ou les vêtements ne correspondent pas exactement au fauteuil fourni. Seul un véritable modèle adapté à la pose assise ou un rigging correctif peut garantir l'absence d'interpénétrations.

## Fonctionnement sécurisé

Le nouveau module `assets/js/office-avatar-v14-1.mjs` réutilise la chaîne glTF/Draco (Three.js 0.169.0, décodeur Draco limité à un worker).

Le chargement de Mona Lisa commence **après celui des trois meubles GLB** afin de limiter la concurrence de décompression sur Quest 3S. L'avatar géométrique précédent reste visible pendant le chargement et uniquement si le modèle final échoue ; il est masqué lorsque la scène GLB a été ajoutée correctement.

Cette modification est limitée à `/experiences/rhxr-v14-1/index.html` et au paramètre `office=v14-1`. Les routes V14, V13 et S02 sont conservées telles quelles.

## Correctif de calibration interactive (23/10/2026)

Après observation dans le Quest indiquant que Mona Lisa regardait toujours dans le sens opposé malgré le changement du défaut à 180°, la seule configuration numérique a été jugée insuffisante pour démontrer l'orientation du modèle.

Le correctif ajoute :
- un **bouton « Tourner Mona Lisa de 180° »** accessible dans le guide V14.1 sur ordinateur et dans le navigateur du Quest avant l'entrée VR ;
- un **panneau 3D** « TOURNER MONA LISA » positionné à droite du fauteuil RH (x≈2,15 m, y≈1,80 m, z≈-3,85 m), sélectionnable par pointage + gâchette sur Quest ;
- une rotation **à chaud du pivot Three.js de l'avatar déjà chargé** (0° ↔ 180°), sans rechargement du GLB, sans changement d'échelle ni déplacement du fauteuil ;
- un statut affichant l'**angle effectivement lu sur le pivot** après chaque rotation ; l'étiquette n'annonce pas un angle théorique indépendant de la scène ;
- un nouvel identifiant de chargement du module `room.mjs` sur la page V14.1 et de `office-avatar-v14-1.mjs` pour éviter la réutilisation d'une ancienne version mise en cache par le navigateur Quest.

**L'orientation par défaut reste 180°**, avec `?avatarYaw=0` comme comparaison facultative. Il ne faut pas conclure que Mona Lisa regarde le visiteur simplement parce que l'angle vaut 180° : son axe visuel natif dans le GLB doit être confirmé visuellement sur Quest.

### Vérification immédiate

1. Ouvrir une nouvelle Preview de la PR #7 et **attendre « Mona Lisa GLB chargé »** dans le guide.
2. Dans le casque, regarder le fauteuil et repérer le petit panneau **« TOURNER MONA LISA »** à sa droite.
3. Le viser avec la manette et presser la gâchette **une fois** : Mona Lisa doit pivoter visiblement de 180° sur place. Le panneau indique son nouvel angle ; presser une seconde fois pour revenir.
4. Hors VR, essayer également le bouton du guide. Vérifier que les deux commandes modifient le même objet 3D et qu'aucune ne multiplie la taille du personnage.
5. Si l'orientation souhaitée est celle de 0°, cette observation permettra de corriger ensuite la valeur par défaut sans tâtonner ; si le modèle ne tourne pas malgré l'angle qui change, il faudra examiner sa géométrie d'origine dans Blender.
6. S'assurer que les interactions DACI, les joysticks et le retour à la 3D restent fonctionnels.

Les tests CI vérifient la variation de `rotation.y` du pivot et son maintien d'échelle, mais **la preuve perceptuelle de la rotation sur Quest exige le test matériel**.

## Validation sur Meta Quest 3S

1. Ouvrir `/experiences/rhxr-v14-1/index.html` dans le navigateur du Quest et entrer en VR.
2. Attendre l'état « Avatar Mona Lisa GLB ... chargé » dans le guide. Le personnage géométrique ne doit plus apparaître.
3. Approcher le fauteuil du responsable et vérifier que Mona Lisa semble bien assise, non flottante, que le dossier et les vêtements ne se traversent pas visiblement et que le personnage est tourné vers le visiteur.
4. Vérifier l'orientation **180° par défaut** sur `/experiences/rhxr-v14-1/index.html` ; pour comparer l'ancienne position, ouvrir `/experiences/rhxr-v14-1/index.html?avatarYaw=0`. Le réglage `?avatarYaw=180` reste équivalent à la valeur par défaut.
5. Contrôler la fluidité et la tenue des matériaux à proximité de l'avatar, avant/après VR.
6. Simuler la défaillance réseau/Draco et confirmer le repli vers le mannequin géométrique.
7. Vérifier également une mission DACI et une consultation de référence pour garantir l'absence de régression.

Les tests GitHub Actions contrôlent la présence des octets originaux, l'enveloppe d'assise calculée et le repli sur échec simulé. **Ils ne confirment pas l'apparence réelle dans le casque.**
