# RH·XR V14.2 — Remplacement du fauteuil RH et de Mona Lisa par un ensemble GLB

## Demande et provenance

L'utilisateur a demandé de remplacer **les deux éléments** précédemment présents au poste du responsable RH — `mona-lisa.glb` et `amrchair.glb` — par un seul modèle source :

`https://github.com/rh-xr/rhxr/blob/765f2ce11f30af869db98c9473224e9e26e0126b/assets/models/badr-han-ch_c.glb`

- Copie binaire **intacte** (réutilisation exacte du Git blob `4dbb45fa169373bd366918628b163de06f43f28e`).
- Taille : **4 846 664 octets** (4,85 Mo).
- GLB / glTF 2.0 avec **1 mesh, 1 matériau, 3 textures** ; extensions requises **`KHR_draco_mesh_compression`** et **`EXT_texture_webp`**.
- Aucune animation, aucun squelette relevé dans les métadonnées du GLB.
- Le nom « Badr Han » provient du fichier fourni ; la géométrie détaillée (pose, collision, caractère assis, orientation visuelle) **doit être examinée dans le casque** : les tests de métadonnées ne suffisent pas à la vérifier.

L'original se trouve sous `assets/models/badr-han-ch_c.glb` sur la branche expérimentale. Les anciens GLB restent dans le dépôt, sans suppression, à des fins de repli.

## Intégration technique

1. `assets/js/office-executive-v14-2.mjs` importe le GLB en glTF 2.0, configure Draco à un worker pour Quest, puis crée un seul pivot `rhxr-executive-chair-assembly`.
2. Position initiale du pivot : **[0,0,−4.10]**. Le nouvel ensemble étant plus profond que l'ancien fauteuil, son centre est reculé d'environ 35 cm pour maintenir son **bord avant près du bureau**. Il est aligné sur le plancher, centré sur sa boîte englobante, puis **redimensionné uniformément**, en tenant compte de la rotation avant de vérifier une enveloppe cible de **1,80 × 1,85 × 1,75 m**. Les proportions restent intactes. À 312°, l'estimation issue des bornes géométriques donne une hauteur d'environ **1,82 m** et une marge d'environ **8,75 cm** avant le bureau. Ce sont des estimations de boîtes englobantes, pas des mesures de collision en VR.
3. Orientation initiale : **312°** par continuité avec la dernière implantation validée. La nouvelle géométrie peut toutefois posséder un axe avant différent de celui de Mona Lisa. Tester `?executiveYaw=0`, `?executiveYaw=90` ou `?executiveYaw=180` si nécessaire, ainsi que les commandes **±45°** dans le Quest.
4. La salle V14.1 charge toujours `desk.glb` et `chair.glb`, **mais ne télécharge plus `amrchair.glb` ni `mona-lisa.glb` tant que l'ensemble intégré se charge correctement**. Les mannequins procéduraux sont visibles uniquement pendant l'attente.
5. Dès que le nouveau GLB est ajouté à la scène, les géométries procédurales **du fauteuil occupé et du personnage** sont masquées. Le statut indique le chargement du nouveau modèle et les commandes de rotation agissent sur son pivot.
6. En cas d'échec (réseau, WebP, Draco), la salle charge l'ancien fauteuil GLB et l'ancien modèle Mona Lisa et les rend visibles, avec les commandes ±45° conservées.
7. Le prototype V14 précédent et S02 gardent l'ancien système de mobilier et ne sont pas affectés. Les sept parcours RH, DACI et le texte spatial gardent leur contenu et leurs dispositions.

## Recette de validation sur Meta Quest 3S

- Ouvrir la Preview V14.1 **du dernier commit** dans Quest Browser.
- Attendre l'état « Badr Han · fauteuil intégré chargé » ou observer explicitement l'état de repli.
- Vérifier qu'il y a **un seul personnage et un seul fauteuil au poste RH**, sans superposition du modèle Mona Lisa ni d'un second fauteuil.
- Confirmer taille, pose et position par rapport au bureau proche, vérifier absence de pénétration du bureau et du plancher. Un réglage de position pourra être nécessaire selon la silhouette réelle du modèle.
- Vérifier l'orientation du visage. Le 312° de Mona Lisa n'est pas nécessairement correct pour le nouveau GLB ; calibrer par pas de ±45°, ou `executiveYaw` pour les essais.
- Vérifier la fluidité lors de l'approche du modèle, les trois textures WebP, l'absence d'artefacts.
- Tester la chaise visiteur, les commandes gauche/droite, les panneaux documentaires DACI et au moins une mission complète.
- Tester le repli en cas d'indisponibilité simulée de `badr-han-ch_c.glb`.

**Validation automatisée ≠ validation visuelle** : tests Node + Vercel Ready confirment la structure et la livraison du code, mais non l'alignement perçu dans un Quest physique.

## Déploiement

La PR #7 (`feature/v14-1-immersive-daci`) reste en brouillon. Ne pas fusionner dans `main` avant le contrôle visuel.
