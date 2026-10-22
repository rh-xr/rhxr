# RH·XR — Circuit documentaire DACI : préparation de revue (V1.4)

## Décision d'architecture
Le Studio DACI produit des **brouillons locaux**. Une demande de revue n'est ni une
validation humaine réelle, ni une signature, ni une habilitation à publier.
Une publication devra, plus tard, passer par un CMS doté d'une authentification,
de rôles, d'un journal d'audit vérifiable et d'une approbation métier effective.

Ne jamais confondre « structure prête pour être examinée » et « approuvé ».

## Étape 1 — Préparer un brouillon
- Ouvrir un document source parmi D01–D06, puis l'adapter dans le Studio.
- Renseigner un contexte d'application explicite (une formule générique ne suffit pas).
- Développer la provenance et le raisonnement éditorial ; éviter les données RH identifiantes.
- Renseigner au moins une référence HTTPS comme piste à examiner.
  La saisie d'une URL **ne démontre ni son existence actuelle, ni sa fiabilité,
  ni une autorisation de reproduction**.
- Vérifier que chaque section comporte un texte, un exemple fictif, une question de
  vérification, une possibilité d'augmentation et une relation documentaire.
- Conserver les médias en statut planned : ils ne sont pas chargés ni accessibles.

## Étape 2 — Préparer la demande de revue
Dans la zone « Préparer une revue éditoriale » :
1. Cliquer sur « Contrôler avant revue » : erreurs bloquantes et avertissements s'affichent.
2. Corriger les champs signalés. Chaque section doit notamment présenter un texte
   de 120 caractères ou plus, un exemple, une question et des liens contextualisés.
3. Décrire le périmètre de la revue (au moins 30 caractères).
4. Indiquer facultativement le **rôle** du relecteur pressenti, sans saisir de donnée privée.
5. Exporter la demande de revue au format JSON et sa checklist au format Markdown.
6. Exporter séparément le **brouillon JSON** : le paquet de revue n'est pas
   un substitut intégral au document source.

Les sorties portent explicitement les marqueurs :
- schemaVersion : rhxr.daci-review-request.v1
- status : editorial-review-request-only
- publicationAuthorized : false
- technicalValidationOnly : true
- humanReview : éléments marqués not-reviewed

Aucun contrôle du navigateur ne peut établir l'identité ou l'habilitation
d'un relecteur. Les cases de la checklist ne sont pas des signatures numériques.

## Étape 3 — Revue humaine (processus externe)
La checklist comporte six axes :
1. Exactitude RH et pertinence pédagogique ;
2. Contexte organisationnel / juridique ;
3. Accessibilité et alternatives non immersives ;
4. Confidentialité et minimisation ;
5. Provenance des sources et licences ;
6. Versions, relations et liens documentaires.

Le relecteur doit vérifier les documents, les citations, les droits sur les médias
et les contenus normatifs effectivement applicables. Les changements acceptés
doivent être retracés ; l'éditeur pourra importer un nouveau brouillon versionné.

## Étape 4 — Publication future (NON implémentée)
Une phase ultérieure pourra intégrer un CMS et une API de publication avec :
- connexion authentifiée et rôle d'approbateur explicite ;
- séparation auteur/relecteur/éditeur selon l'organisation ;
- état projet / en revue / corrections requises / approuvé / publié / retiré ;
- verrouillage de version et empreinte du contenu approuvé ;
- publication des ressources et des médias uniquement après contrôle des droits,
  de l'accessibilité, de l'hébergement et des URL exactes ;
- historique d'audit et procédure de dépublication ;
- références documentaires persistantes pour les QR codes et futurs médias RA/RV/3D ;
- revue juridique et de protection des données selon la juridiction réelle.

Ces fonctions ne doivent jamais être simulées comme déjà effectives dans la Preview.

## Recette manuelle de la Preview
- D02 : ouvrir le Studio DACI, lancer l'audit sans modifications : la demande doit
  être bloquée (référence absente et contexte générique).
- Saisir un contexte fictif précis, une référence HTTPS et des notes détaillées.
- Compléter, si nécessaire, les sections insuffisantes.
- Contrôler avant revue : aucune erreur bloquante ne doit persister.
- Exporter JSON et Markdown, inspecter les marqueurs ci-dessus.
- Vérifier que toutes les cases de validation humaine sont non cochées dans
  le Markdown et que publicationAuthorized reste false dans le JSON.
- Remplacer une référence par une URL HTTP : le contrôle doit bloquer.
- Tenter de rendre un média actif en important un JSON modifié : l'import doit refuser.
- Refaire les tests en navigation clavier, petit écran et sans casque.
- Confirmer que le scénario VR S02 et ses commandes Quest sont inchangés.

## Vérifications automatiques
- Tests unitaires : sept tests dédiés à la préparation de revue, dont refus des références
  non HTTPS et absence de statut d'approbation.
- Intégrité du Studio et du schéma local : tests de brouillons, liens, révisions et médias.
- GitHub Actions : vérifications de syntaxe et suite Node.js.
- Vercel : publication de la Preview de travail seulement.

Les tests structurels ne remplacent pas la consultation réelle des sites cités,
la vérification des licences ni un audit externe d'accessibilité.
