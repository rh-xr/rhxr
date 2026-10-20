# RH·XR — Liens pédagogiques au niveau des sections DACI (V1.3)

## Objectif
Transformer chaque section DACI en point d'entrée vers une situation pédagogique
précise, puis ramener l'apprenant à la même section après son exercice.

**Périmètre :** documentation et parcours RH uniquement ; WebXR, manettes Quest,
scènes 3D et production demeurent inchangés.

## Recette fonctionnelle
1. Ouvrir D02 dans la bibliothèque DACI.
2. Atteindre la section « Ouvrir le dialogue », puis lancer le dialogue S11.
3. Choisir successivement trois options et lire le débriefing.
4. Utiliser « Revenir à la section DACI » et vérifier que le défilement et le focus
   reviennent vers la section d'origine.
5. Répéter sur D01/C01, D03/S12 et D05/quiz M5.
6. Depuis D02 « Convenir du suivi », tester le lien vers la fiche M2 :
   l'atelier doit viser directement la section modèle.
7. Utiliser une valeur de retour forgée avec un site extérieur :
   aucun lien de retour externe ne doit s'afficher.

## Nouveautés implémentées
- Dix-huit correspondances explicites section → activité pédagogique.
- Pour chacune : objectif d'action, justification, question de transfert.
- Lien vers un cas, dialogue ramifié, quiz ou modèle pédagogique.
- Retour sûr fondé exclusivement sur les identifiants et ancres des documents connus.
- Restauration du focus clavier après le rendu dynamique du document.
- Dix-huit relations typées supplémentaires dans le réseau DACI :
  relation hasSectionActivity, provenance de l'ancre comprise.
- Réseau : 71 ressources et 92 relations explicites.
- Aucune conservation de réponses ou inférence de profil personnel.

## Contrôles à répéter
- npm test : cohérence des 18 chemins, ressources cibles, graphe sémantique,
  rejet des URL externes et de documents/ancres inventés.
- npm run audit-content : conformité structurelle et alertes de relecture métier.
- Preview : rendu mobile/ordinateur, clic réel, Tab, focus visible, ancre,
  retour et réentrée dans les exercices.
- Quest 3S : vérifier séparément que le scénario S02 n'a subi aucune régression.

## Limites et suite
Ces ressources sont des supports fictifs et génériques. La relecture professionnelle
reste nécessaire et un test de liens ne garantit pas l'efficacité pédagogique.
Les expériences RA, RV et IA générative ne sont pas activées dans ces nouveaux
parcours. Leur raccordement doit attendre la validation des modèles, licences,
sources et objectifs de formation.
