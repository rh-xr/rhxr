# RH·XR V14 — Grille de recette de qualité VR, 3D et DACI

**Statut initial :** à mesurer. Une case « non vérifié » n'est pas un échec et n'autorise pas à revendiquer une fonction validée.  
**Environnements :** Chrome/Edge desktop, mobile (fallback), Meta Quest Browser sur Quest 3S.

## A. Qualité visuelle — revue dans le casque

| ID | Critère observable | Preuve exigée | Seuil / résultat attendu |
| --- | --- | --- | --- |
| V-01 | Architecture cohérente | Captures casque face/arrière/gauche/droite | Pas de trous, clippings ou murs irréalistes |
| V-02 | Mobilier GLB authentique | Statut GLB, 3 vues par objet | Trois objets visibles, orientations cohérentes, pieds au sol |
| V-03 | Matériaux PBR | Captures comparées | Bois/tissu/métal identifiables, détails non scintillants |
| V-04 | Lumière stable | Captures à 4 points de vue | Pas d'ombres brûlées ou de clignotements dynamiques |
| V-05 | Texture/mipmapping | Vue proche et éloignée | Texte net, peu de moiré, matériaux stables |
| V-06 | Cohérence d'identité | Revue design | Marque RH·XR discrète et lisible |
| V-07 | Rendu sans décor | GLB volontairement indisponible | Scénarios accessibles, décor de secours compréhensible |

## B. Confort et ergonomie VR

| ID | Critère | Procédure | Réussite |
| --- | --- | --- | --- |
| E-01 | Entrée / sortie VR | Entrer, sortir, recommencer × 3 | Aucun écran noir durable, aucun état bloqué |
| E-02 | Stick gauche | Avancer, reculer, pas de côté | Mouvement cohérent avec orientation du regard |
| E-03 | Stick droit | Tourner par paliers, relâcher et répéter | 1 palier par impulsion, sans dérive |
| E-04 | HMD physique | Marcher un pas en zone sûre | Suivi correct, aucune double translation |
| E-05 | Sélection | Pointer, survoler, gâchette | Élément ciblé visible, aucune sélection accidentelle |
| E-06 | Aide/document | Choisir une option, ouvrir et fermer la preuve DACI | Retour en situation sans perdre la progression |
| E-07 | Texte | Lire à distance habituelle | Lisible assis/debout sans s'approcher excessivement |
| E-08 | Décor/modal | Ouvrir source au milieu du scénario | Aucun texte indispensable caché durablement |
| E-09 | Recentrage | Changer de posture initiale | Panneaux restaurés dans une position accessible |
| E-10 | Mobile/desktop | Parcours sans casque | Fonctionnalités critiques maintenues hors VR |
| E-11 | Erreur WebXR | Retirer support WebXR simulé | Message clair + mode texte, aucun bouton trompeur |

## C. Performance Quest 3S

Mesurer **sur Quest** en situation simple et lourde : accueil, conversation, document ouvert, navigation, rotation, sortie VR.

| ID | Indicateur | Cible interne | État |
| --- | --- | --- | --- |
| P-01 | Fréquence affichée | ≥ 72 FPS soutenus (cible principale) | Non mesuré |
| P-02 | Budget de frame | ≤ 13,9 ms à 72 Hz | Non mesuré |
| P-03 | Objectif supérieur | 90 FPS seulement si réellement possible | Non mesuré |
| P-04 | Draw calls | Objectif initial ≤ 150, à ajuster par profiling | Non mesuré |
| P-05 | Triangles | Objectif initial ≤ 400 k, à ajuster après échantillonnage | Non mesuré |
| P-06 | Textures | 1K usuelles, 2K uniquement quand justifié ; KTX2 testé | Non mesuré |
| P-07 | Réseau et décompression | Relever chargements initial et Draco/KTX2 | Non mesuré |
| P-08 | Ressources perdues | GLB/CDN/VR simulés indisponibles | Repli utilisable |
| P-09 | Mémoire/pertes de contexte | Entrer/sortir VR, changer de mission | Pas de croissance incontrôlée ni contexte perdu non géré |

Ne pas réduire la qualité sur simple intuition : **prioriser le temps GPU/CPU mesuré et les défauts visibles**. Les quotas P-04/P-05 sont des hypothèses initiales, non des recommandations matérielles garanties.

## D. Cohérence pédagogique et documentaire

| ID | Test | Critère |
| --- | --- | --- |
| C-01 | Trois parcours V13 disponibles | Intégration, entretien, conflit ; progression conservée |
| C-02 | S02 présent | Formation désaccord professionnel, sans score décisionnel RH réel |
| C-03 | Corpus V13 | Cartographie de 54 réponses et de 20 ancres, aucune perte silencieuse |
| C-04 | Décisions déterministes | Identiques sur desktop/VR/texte pour même état et choix |
| C-05 | Justification contextualisée | Raison + effet + recommandation + extrait cité |
| C-06 | Référence DACI vérifiée | Identifiant stable, titre, section et passage exact du corpus |
| C-07 | Fin de parcours | Bilan constructif, alternatives, compétences entraînées |
| C-08 | Difficulté | Niveau débutant avant variantes avancées |
| C-09 | Sécurité/éthique | Scénarios fictifs ; pas de PII, pas de décisions RH automatisées |
| C-10 | Aide optionnelle | La consultation DACI n'est pas nécessaire à chaque clic ; disponible en contexte |

## E. Protocole de validation

1. Fixer un commit de référence de la branche et créer une fiche « Test Quest 3S — date, version navigateur, appareil, fréquence ciblée ».
2. Exécuter les contrôles Node de régression et enregistrer le résultat CI GitHub.
3. Enregistrer un parcours complet avec une décision pertinente puis une option moins pertinente dans chaque mission.
4. Tester VR avec contrôleurs, puis desktop avec souris/clavier, puis mode texte.
5. Comparer les extraits DACI et choix entre modes (même identifiant de nœud et même citation).
6. Tester réseau lent, ressource GLB manquante, moteur XR absent, perte de contexte WebGL et retour au portail.
7. Accepter le lot seulement si les anomalies bloquantes sont corrigées et les métriques et captures sont annexées à la PR.

### Définition de « prêt à fusionner »

- CI réussie **et** démonstration réelle sur Quest 3S.
- Les contrôles du casque, la lecture documentaire et tous les parcours de base sont validés.
- Les performances de la scène cible sont mesurées, non seulement estimées.
- La version de production et les liens V13/S02 restent stables, sans régression.
- Droits des nouveaux modèles et médias vérifiés avant diffusion publique.
