# RH·XR — Dialogue Lab et DACI : protocole de recette (itération V1.2)

## Périmètre
Cinq simulations RH en texte, à embranchements réels (S10 à S14), avec guides formateurs.
Cette itération n'ajoute **aucun** modèle 3D et **ne change pas** le moteur Quest du Lot 0.
Le contenu est fictif et strictement pédagogique, sans décision RH individuelle.

## Scénarios
| ID | Domaine | Situation | DACI associé |
| --- | --- | --- | --- |
| S10 | M1 | Accueil sans accès informatiques | D01 |
| S11 | M2 | Répartition des urgences | D02 |
| S12 | M4 | Presque-accident sans blessure | D03 |
| S13 | M6 | Réunion hybride déséquilibrée | D04 |
| S14 | M8 | Demande de classement nominatif | D06 |

Tous les scénarios prévoient trois phases. La première décision conduit à l'une des trois
réactions alternatives de phase 2, puis à une phase 3 de conclusion. Trois choix par phase.
On obtient **27 parcours de décisions par scénario**, soit **135 combinaisons testées**.
Le parcours suit des conséquences explicitement écrites, non générées aléatoirement.

## Référentiel pédagogique
- Contexte et rôle fictif
- Objectif explicite et critères non psychométriques
- Choix plausibles et feedback immédiatement explicatif
- Débriefing sans note, avec trois questions de transfert
- Export Markdown d'une synthèse anonyme de la session
- Guide du formateur : rôles, timing, difficultés et observables, exportable en Markdown
- Liens au dossier pédagogique et aux documents DACI existants
- Modalité texte pleinement opérationnelle ; future transposition VR indiquée sans fausse promesse

## Revue DACI V1.2
Le réseau contient désormais 71 ressources et 74 relations éditoriales.
Le JSON-LD généré présente un seul objet par ressource identifiée par URN ; les liens sortants
sont consolidés et accompagnés d'un type de relation.
Aucun nom de domaine non attribué n'est présenté comme une URL de production.

## Parcours fonctionnel à vérifier manuellement
1. Ouvrir la Preview sur ordinateur ou mobile, puis la page dialogues.html.
2. Choisir S11, répondre en privilégiant une demande d'exemple ; vérifier la réaction de phase 2.
3. Recommencer, choisir une réponse directive ; la réaction doit être différente.
4. Terminer chacune des deux branches, comparer les débriefings, puis exporter un fichier Markdown.
5. Changer de scénario : la simulation doit recommencer sans conserver les choix précédents.
6. Ouvrir « Guide de facilitation pour formateurs », lire les critères et exporter le guide.
7. Suivre les liens vers le module M2, l'atelier et D02.
8. Tester le réseau DACI : le dialogue S11 doit être relié à M2 et D02 ; exporter JSON-LD.
9. Vérifier l'usage au clavier : Tab, Entrée/Espace, état des choix et débriefing annoncé.
10. Recharger la page : aucune réponse personnelle ne doit être restaurée.
11. Confirmer le rendu mobile, les textes de feedback, les défilements et la lisibilité.
12. Réouvrir la simulation VR S02 stable sans changement visuel ou de contrôleurs.

## Critères automatiques
- 135 chemins de décision complets et sans lien mort.
- Les cinq scénarios ont chacun un guide formateur avec au moins trois critères.
- Cohérence des identifiants de modules et des documents DACI.
- Absence de collecte de données, de prédiction de personnalité et de score de carrière.
- État du workflow GitHub Actions et Preview Vercel Ready sur le dernier commit.
- Maintien d'une revue métier RH et d'un contrôle d'accessibilité manuels avant fusion.

## Limites
Ce n'est pas une simulation psychométrique ou un outil de recrutement.
Les dialogues utilisent des réponses prédéfinies, non une IA générative.
L'avatar, la reconnaissance d'image, la RA et les interactions spatiales seront ajoutés
uniquement lorsque des modèles 3D adéquats et des objectifs pédagogiques validés existeront.
Le mode texte constitue la modalité de référence accessible.
