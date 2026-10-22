# RH·XR — Revue itérative de la qualité des contenus (20 octobre 2026)

## Portée
Cette itération porte uniquement sur la branche de contenus et la PR #3. La PR #2 consacrée au graphisme est maintenue à l'écart, jusqu'à réception des modèles 3D préparés par le responsable du projet. Le code de locomotion validé sur Quest 3S reste inchangé.

## Ressources construites et contrôles automatiques
| Ressources | Quantité | Contrôle principal |
|---|---:|---|
| Modules de formation | 8 | Identifiants, objectifs et cohérence |
| Séquences pédagogiques | 24 | Activités et productions attendues |
| Dossiers détaillés | 8 | 3 chapitres, exemples et ateliers |
| Questions formatives | 24 | Explications et réponses de référence |
| Cas contextualisés | 12 | Alternatives, retours et questions |
| Modèles de travail | 8 | Édition locale et export texte |
| Termes de glossaire | 24 | Couverture de chaque domaine |
| Itinéraires guidés | 5 | Trois étapes et liens valides |
| Documents DACI | 6 | 18 sections enrichies |
| Réseau de connaissances | 66 nœuds, 64 liens | Aucun identifiant orphelin |
| Références institutionnelles | 4 | Sources officielles HTTPS |

Dernière suite de vérification observée avant création de cette note : **44 tests passés et 0 échec**, contrôles de syntaxe réussis. Utiliser les commandes npm test et npm run audit-content pour répéter les vérifications.

## Corrections déjà effectuées
1. Des chapitres ne respectaient pas le seuil de développement prévu : le contenu a été étoffé.
2. Deux pages étaient présentes dans un arbre de préparation mais absentes de la branche : elles ont été publiées effectivement.
3. Les documents DACI étaient trop succincts : ajout de textes explicatifs, exemples fictifs, questions et provenance.
4. Une erreur de syntaxe d'un test a été corrigée après lecture du journal CI.
5. Vérification des liens entre modules, séquences, cas, dossiers et documents.

## Ce que les outils ne prouvent pas
- La conformité complète WCAG 2.2 exige une recette humaine et un audit instrumenté.
- L'absence de toute anomalie visuelle ou d'interaction dans un navigateur n'est pas démontrée par des tests Node.
- La qualité, le caractère pertinent et l'actualité des conseils RH demandent une relecture professionnelle.
- Les nouveaux écrans n'activent pas l'IA générative, la RA, ni les modèles 3D à venir.
- Les contenus sont génériques, fictifs et non assimilables à des règles juridiques.

## Sources de contexte vérifiées
- OIT : https://www.ilo.org/skills/
- OIT 2026 : https://www.ilo.org/publications/flagship-reports/lifelong-learning-and-skills-future
- UNESCO : https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=67098
- W3C WCAG 2.2 : https://www.w3.org/Translations/WCAG22-fr/

Les contenus RH-XR ne sont pas des traductions officielles ni des recommandations émises par ces institutions.

## Critères à valider avant fusion
1. CI au vert et audit éditorial sans erreur, avec les avertissements de relecture visibles.
2. Preview fonctionnelle sur ordinateur et smartphone.
3. Navigation entre itinéraire, parcours, cours, cas et documents.
4. Questions répondables et réinitialisables, sans enregistrement ni score RH.
5. Fiches exportables en texte ; documents DACI imprimables et exportables en Markdown et JSON-LD.
6. Accessibilité clavier, mobile et technologies d'assistance examinée.
7. Scénario S02 et commandes Quest inchangés.
8. Relecture experte RH avant de qualifier le contenu de ressource professionnelle validée.

## Améliorations suivantes à prioriser
Des scénarios ramifiés plus longs, des spécialisations par secteur, des cadres locaux datés et vérifiés,
des traductions FR/EN/AR relues, un véritable éditeur DACI, des médias RA/RV/3D sur assets validés,
et un assistant IA documentaire avec sources vérifiables et supervision humaine.

La qualité prime sur le nombre de pages : chaque ressource doit présenter un objectif,
un contenu utile, une production attendue, une provenance et une vérification.
