# Essai Meta Quest 3S — RH·XR Lot 0

## Comportement attendu après le correctif V0.1.1

La scène reste un **démonstrateur low-poly**, sans interaction entre manettes et objets.

| Dispositif | Commande | Comportement attendu |
|---|---|---|
| Quest 3S | stick gauche ↑/↓ | avance / recule, dans la direction du regard |
| Quest 3S | stick gauche ←/→ | déplacement latéral |
| Quest 3S | stick droit → | rotation instantanée de **45° vers la droite** |
| Quest 3S | stick droit ← | rotation instantanée de **45° vers la gauche** |
| Quest 3S | stick droit recentré puis repoussé | nouvelle rotation, sans déclenchement en boucle |
| Quest 3S | mouvements corporels | suivi 6DoF conservé |
| Desktop | ↑/↓ et W/S | avancer / reculer |
| Desktop | ←/→ et A/D | tourner |
| Mobile 2D | boutons en superposition | déplacement et rotation |
| Tous | chaise visiteur | dossier côté entrée, siège orienté vers le bureau |

## Protocole de recette

1. Ouvrir la **Preview de la PR #1** ; ne pas tester l'URL de production encore liée au README seul.
2. Tester la page \`simulation.html\` en navigateur normal, dérouler S02 jusqu'au débriefing.
3. Cliquer **Activer la 3D**, vérifier la scène et l'orientation de la chaise vide (dossier derrière le siège, côté entrée).
4. Sur Quest 3S, activer la 3D, puis **Entrer en RV**.
5. Sans marcher physiquement, pousser le stick **gauche** dans les quatre directions ; la translation doit s'effectuer dans la salle.
6. Pousser le stick **droit** à droite : un quart de 90° (45°) une seule fois ; le recentrer puis répéter. Réaliser le même essai à gauche.
7. Pendant l'essai, faire un petit pas physique : l'origine virtuelle ne doit pas se décaler brutalement.
8. Quitter la RV puis vérifier que le mode 3D sur écran fonctionne toujours ; réentrer en RV.
9. Si les manettes restent inactives, relever le modèle de contrôleur, version du navigateur Meta Quest et comportement du stick gauche/droit. Aucun enregistrement personnel ne doit être envoyé.

## Limites connues

- Ce Lot 0 ne propose ni téléportation, ni collisions contre le bureau/chaises, ni mains virtuelles.
- Le déplacement virtuel est borné approximativement aux murs, sans navigation physique sécurisée : respecter la limite Guardian du Quest.
- La qualité graphique reste provisoire. Priorités futures : proportions des meubles, éclairage et matériaux réalistes, avatars et animation, optimisation GLB et tests de performance sur Quest 3S.
- Les contrôles sont implémentés pour les manettes standard Quest via WebXR Gamepad (stick sur axes 2/3, repli axes 0/1). **Les essais réels sur matériel sont indispensables.**
