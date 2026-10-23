# RH·XR — ambition visuelle : bureau professionnel 3D / XR

## Vision
Passer progressivement d'une maquette procédurale à un environnement de formation 3D crédible,
avec architecture cohérente, matériaux détaillés, mobilier issu de modèles 3D réels
et personnages habillés, animés, capables d'interagir avec des séquences pédagogiques.

**Ne pas confondre les deux étapes** :
- **V2+ expérimentale (actuelle)** : textures PBR procédurales et chargement d'un fauteuil GLB réel. Avatar encore stylisé, architecture encore procédurale. Toutes les commandes Quest du Lot 0 doivent rester intactes.
- **V3 ambitieuse (objectif)** : salle architecturalement modélisée, mobilier premium optimisé, avatar assis riggé/animé, HDRI et éclairage précalculé, son spatial et mise en situation contextuelle.

## Asset tiers et licences
1. **Pilote licencié** : SheenChair.glb, © 2020 Wayfair LLC, CC0-1.0,
   collection Khronos glTF Sample Assets (fichier ≈ 4,13 Mo), URL figée sur commit
   15cd02d304e54cb42a4db4eefe719f76190f4b68.
   L'asset est téléchargé à la demande via jsDelivr ; aucune copie binaire n'est stockée dans ce dépôt.
   Voir assets/js/visual-assets.mjs.
2. **Sources envisageables (non intégrées)** : Poly Haven, modèles CC0 avec matériaux PBR ;
   vérifier la licence au niveau de chaque asset, son origine, ses dimensions, son maillage,
   sa compatibilité GLB et ses droits avant téléchargement.
3. **Personnages (non intégrés)** : préparer un personnage assis avec Blender / Meshy.ai puis
   rigging et animation appropriés. Réaliser des variantes légères, ne pas réutiliser des
   photographies RH identifiantes sans autorisation.
4. **Publication des assets** : pour la production, les assets approuvés devront être
   hébergés sous le contrôle du projet (ex. stockage d'objets privé/public selon usage),
   avec CORS, cache, manifest versionné, SHA-256, taille, licence et repli.
   L'utilisation directe du CDN de démonstration n'est pas l'architecture finale.

## Cibles de performance (à mesurer, pas des résultats acquis)
- Quest 3S : **viser 72 images/seconde stables** lors des déplacements et rotations.
- Profil Quest : ratio de pixels au maximum 1,25, ombres 512 px ; pas d'effets plein écran coûteux.
- Réduire les lumières dynamiques et préférer le light baking et les lightmaps.
- Préparer un pipeline d'optimisation Meshopt / Draco et de textures KTX2 (cibles 1K sur casque),
  avec manifest optimisé avant publication.
- Mesurer le pic de mémoire, les triangles, les draw calls et le temps de chargement réel.
- Pas d'affirmation de conformité Quest tant que la scène n'a pas été testée sur matériel réel.

## Environnement final envisagé
- Salle d'entretien RH : verrière et lumière naturelle, sol et cloisons architecturaux,
  table/bureau haut de gamme, fauteuils cohérents, objets crédibles, rangement discret.
- Personnage professionnel assis, animation des yeux, micro-mouvements, gestes,
  synchronisation labiale facultative et désactivable.
- Interaction : changement de posture, écoute, prise de parole et réponses pédagogiques
  fondées sur des scripts validés, sans surveillance émotionnelle.
- UX : mode 2D accessible maintenu, informations de navigation discrètes,
  commandes Quest inchangées, confort VR prioritaire.

## Méthode de validation
1. CI syntaxe/tests, Vercel Preview READY.
2. Visualisation desktop et mobile de la V2+, vérifier la disponibilité du modèle GLB.
3. Comparaison **avant/après** avec la Preview Lot 0 en contrôlant que le scénario S02 fonctionne.
4. Quest 3S : 2D, chargement 3D, entrée VR, stick gauche/droit, marche physique,
   rotation autour du casque, sortie/réentrée VR et orientation du siège visiteur.
5. Confirmer le gain esthétique et relever toute baisse de fluidité.
6. Ne fusionner la PR V2 qu'après validation explicite ; poursuivre la vraie V3
   par assets et optimisation dans une branche isolée si cette V2+ ne suffit pas.

## Risques spécifiques
- Import dynamique de GLTFLoader : vérifier compatibilité module / version Three.
- Chargement CDN : CORS, disponibilité, latence ; **modèle procédural de secours obligatoire**.
- Modèle GLB : orientation par défaut, largeur réelle, assise, ajustement avec
  l'avatar; refaire le test visuel avant toute publication.
- Ressources tierces : licences explicites et absence de marques exclues par les licences.
