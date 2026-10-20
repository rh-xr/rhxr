# RH·XR V3 — Executive Suite : architecture et optimisation WebXR

## Objectif et état
La V3 est une **branche exploratoire**, construite au-dessus de la V2+ en PR #2.
Son ambition est d'offrir un espace plus crédible visuellement pour les simulations RH,
tout en conservant les déplacements de référence validés physiquement sur Quest 3S.

**Livré dans cette branche :**
- habillage architectural enrichi (moulures, lames de bois instanciées, alcôve, suspensions,
  perspective urbaine générée localement, espace salon et détails de matériaux) ;
- canapé PBR GLB facultatif, chargé progressivement, licence vérifiée CC BY 4.0 ;
- reflet PBR d'un environnement de studio synthétique (PMREM), **pas un HDRI photographique** ;
- profils visuels Éco / Équilibrée / Immersive, détection du casque et changement avant immersion ;
- indicateur approximatif images/s et draw calls visible en mode 2D ;
- repli systématique en cas d'échec d'un asset facultatif.

**Pas encore livré :** géométrie architecturale entièrement importée d'un logiciel 3D,
textures photogrammétriques, avatar humain riggé photoréaliste, synchronisation labiale,
véritables collisions ou audio spatial. N'étiqueter cette Preview ni « photoréaliste »
ni « optimisée Quest certifiée » tant que ces travaux et essais réels ne sont pas réalisés.

## Provenance des modèles
- SheenChair — Khronos glTF Sample Assets, © 2020 Wayfair LLC,
  CC0-1.0, environ 4,1 Mo, source et licence consignées dans assets/js/visual-assets.mjs.
- GlamVelvetSofa — Khronos glTF Sample Assets, © 2021 Wayfair LLC,
  Eric Chadwick pour le traitement du modèle, CC BY 4.0,
  3 149 844 octets. Source :
  https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/GlamVelvetSofa
  Licence :
  https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/GlamVelvetSofa/LICENSE.md
- La source téléchargée est fixée au commit Git
  15cd02d304e54cb42a4db4eefe719f76190f4b68 de Khronos.
- Aucun binaire n'est copié dans le dépôt ; jsDelivr fournit les modèles à la demande
  depuis un commit immuable. Attention : latence, disponibilité CORS et continuité de
  service ne sont pas garanties. Déplacer les assets validés vers un hébergement contrôlé
  par RH·XR, avec sha256 et budget optimisé, avant une publication finale.

## Configurations initiales
| Profil | Ratio d'affichage maximum | Décor architectural V3 | Canapé PBR | Réflexions IBL |
| --- | ---: | --- | --- | --- |
| Éco | 1,00 | non | non | non |
| Équilibrée (Quest 3S par défaut) | 1,15 | oui | non | non |
| Immersive (desktop par défaut) | 1,60 | oui | oui | oui |

Le fauteuil GLB de V2+ reste facultatif et conserve son repli.
Les options graphiques ne modifient ni la logique S02, ni les mappings des manettes.

## Recette non négociable
1. Preview Vercel : page 2D, scénario S02, Studio et liens opérationnels.
2. Mode 3D sur ordinateur : avatar, fauteuils, murs, fenêtres, perspective urbaine,
   alcôve, suspensions et canapé réaliste si disponible en profil Immersive.
3. Profil Éco : passage en mode de repli sans exception JavaScript.
4. Changement Équilibrée -> Immersive : chargement non bloquant du GLB.
5. Crédits visibles en mode Immersive si le canapé est réellement chargé.
6. Sur Quest 3S : affiche, démarrage WebXR, translations gauche,
   rotations droites par pas de 45 degrés, marche physique et sortie/réentrée VR.
7. Contrôler que les deux chaises restent orientées vers le bureau, avec
   l'avatar correctement placé. Vérifier visuellement la taille du canapé.
8. Comparer la fluidité aux PR #1 et #2 et vérifier que la barre de qualité
   n'interfère pas avec le bouton VR ou les commandes du scénario.
9. Les métriques FPS sont indicatives. Mesurer réellement frame time GPU/CPU
   avec des outils de profilage sur appareil avant de garantir un seuil (cible 72 Hz).
10. Ne pas fusionner la PR tant que les essais matériels ne sont pas validés.

## Suite prioritaire : vrai niveau premium
1. Obtenir un **GLB de l'ensemble de la salle**, conçu sous Blender ou Meshy,
   en conservant des origin/échelles mètres et un système d'axes standard.
2. Produire meubles optimisés, textures PBR 1K/KTX2 + lightmaps
   et LOD haute définition sur desktop / léger sur Quest.
3. Intégrer un **avatar fictif riggé assis** dans la scène puis idle, écoute,
   mouvement des mains et lèvres ; vérifier autorisations et licences.
4. Prévoir une capture visuelle de référence sur PC et Quest, tests automatiques
   plus spécifiques et correctifs d'accessibilité (textes, sous-titres, confort).
5. Enrichir enfin les scénarios pédagogiques et interactions ; les scores restent
   formatifs et ne servent pas à la sélection ou à la notation RH.
