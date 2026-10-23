# RH·XR — V2 visuelle du bureau de médiation (preview)

## Objectif
Améliorer l'aspect du bureau d'entraînement sans réintroduire la régression WebXR sur Meta Quest 3S.

## Changements visuels
- Palette architecturale professionnelle : murs clairs, mur d'accent bleu, parquet, tapis, moulures.
- Bureau détaillé : piétement métal, plateau bois, sous-main, tablette/écran, rangements.
- Deux fauteuils rembourrés : le siège visiteur reste orienté vers le bureau (rotation 180°).
- Avatar de manager assis **stylisé** : tenue professionnelle, visage et mains simplifiés.
- Fenêtre décorative, luminaires, tableaux, plantes et rangements.
- Matériaux PBR MeshStandardMaterial, tone mapping et éclairage à ombres volontairement limitées (512 px).
- Textures procédurales seulement ; **aucun modèle 3D externe** ni animation complexe pour cette étape.

## Non-régression obligatoire
1. Ouvrir Preview S02 sur ordinateur : scénario, choix, débriefing et Studio inchangés.
2. Cliquer « Activer la 3D ». Confirmer qu'il n'existe ni écran noir, ni échec console.
3. Vérifier l'orientation du fauteuil visiteur, le bureau, l'avatar et la fluidité.
4. Sur Quest 3S : démarrer la même scène, vérifier l'entrée VR.
5. Stick gauche : avant/arrière, déplacement latéral.
6. Stick droit : rotations de 45° sans rotation continue incontrôlée.
7. Vérifier que la marche réelle et la rotation autour de la tête restent possibles.
8. Quitter puis réentrer en VR ; vérifier la stabilité.
9. Juger confort, lisibilité, scintillement, framerate. Si moins fluide que le Lot 0, rejeter la fusion.
10. Vérifier que la version production issue du Lot 0 fonctionne toujours pendant la recette.

## Limites de la V2
Cette V2 est un **premier enrichissement graphique procédural**, pas encore un bureau photoréaliste. Des modèles GLB réalistes, textures KTX2, animations crédibles et interactions avec l'avatar seraient traités dans une phase ultérieure, avec leurs propres budgets mémoire et droits de licence.

L'étape de validation matérielle sur Quest 3S reste ouverte jusqu'à confirmation de l'utilisateur.
