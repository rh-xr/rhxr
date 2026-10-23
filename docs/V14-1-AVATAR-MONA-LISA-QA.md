# RH·XR V14.1 — Avatar Mona Lisa sur le fauteuil RH

## Provenance et intégrité

Le fichier `assets/models/mona-lisa.glb` est repris **sans conversion** depuis le commit GitHub `8587c40216a1bcbc881445b9123fe0168058f6ab` du dépôt `rh-xr/rhxr`.

- **Blob Git original :** `b49417c0050d7e1c7dfe4773c8ea8d65806f4f6d`.
- **Taille :** 3 020 580 octets (environ 3,02 Mo).
- **Format :** glTF 2.0 GLB, compression `KHR_draco_mesh_compression`, 1 maille et 2 textures.
- **Animation :** aucun squelette, aucune animation intégrée, **pose statique**.
- **Dimensions géométriques brutes (accessors) :** boîte approximative 1,39 × 1,90 × 1,15 unités. Les unités artistiques réelles et la pose doivent être confirmées au casque.
- La licence et les droits de diffusion hors dépôt/démonstrateur ne sont pas documentés par le modèle fourni.

## Implantation

Le fauteuil du responsable RH est `amrchair.glb`, centré à `x=0, z=-4.45`.

Le modèle Mona Lisa :
- est placé au même centre horizontal `[0, -4.45]` ;
- est réduit uniformément, sans déformation, dans une enveloppe maximale **1,001 × 1,463 × 1,012 m** (soit +10 % par dimension, sans déformation) ;
- a sa base apparente alignée à la hauteur `y=0.51 m` (hauteur de coussin estimée, à confirmer sur Quest) ;
- possède une orientation nominale de **180°**, modifiable temporairement à 0° pour comparer via `?avatarYaw=0`.

**Important :** l'ajustement de la base du GLB sur l'assise n'est pas une opération d'animation ni de rigging. Le modèle peut représenter une personne dont les jambes, le siège intégré ou les vêtements ne correspondent pas exactement au fauteuil fourni. Seul un véritable modèle adapté à la pose assise ou un rigging correctif peut garantir l'absence d'interpénétrations.

## Fonctionnement sécurisé

Le nouveau module `assets/js/office-avatar-v14-1.mjs` réutilise la chaîne glTF/Draco (Three.js 0.169.0, décodeur Draco limité à un worker).

Le chargement de Mona Lisa commence **après celui des trois meubles GLB** afin de limiter la concurrence de décompression sur Quest 3S. L'avatar géométrique précédent reste visible pendant le chargement et uniquement si le modèle final échoue ; il est masqué lorsque la scène GLB a été ajoutée correctement.

Cette modification est limitée à `/experiences/rhxr-v14-1/index.html` et au paramètre `office=v14-1`. Les routes V14, V13 et S02 sont conservées telles quelles.

## Validation sur Meta Quest 3S

1. Ouvrir `/experiences/rhxr-v14-1/index.html` dans le navigateur du Quest et entrer en VR.
2. Attendre l'état « Avatar Mona Lisa GLB ... chargé » dans le guide. Le personnage géométrique ne doit plus apparaître.
3. Approcher le fauteuil du responsable et vérifier que Mona Lisa semble bien assise, non flottante, que le dossier et les vêtements ne se traversent pas visiblement et que le personnage est tourné vers le visiteur.
4. Vérifier l'orientation **180° par défaut** sur `/experiences/rhxr-v14-1/index.html` ; pour comparer l'ancienne position, ouvrir `/experiences/rhxr-v14-1/index.html?avatarYaw=0`. Le réglage `?avatarYaw=180` reste équivalent à la valeur par défaut.
5. Contrôler la fluidité et la tenue des matériaux à proximité de l'avatar, avant/après VR.
6. Simuler la défaillance réseau/Draco et confirmer le repli vers le mannequin géométrique.
7. Vérifier également une mission DACI et une consultation de référence pour garantir l'absence de régression.

Les tests GitHub Actions contrôlent la présence des octets originaux, l'enveloppe d'assise calculée et le repli sur échec simulé. **Ils ne confirment pas l'apparence réelle dans le casque.**
