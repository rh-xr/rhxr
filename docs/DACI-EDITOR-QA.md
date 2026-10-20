# RH·XR — Atelier DACI V1 : documentation et recette

## Portée
L'Atelier DACI fonctionne dans le navigateur et s'appuie sur les six documents pédagogiques
versionnés dans le code RH·XR. Il est uniquement destiné à la création de **brouillons locaux**
et à la préparation de futurs médias immersifs. **Aucune publication ou synchronisation n'est
réalisée.** Les améliorations de la salle 3D restent reportées.

## Procédure de rédaction
1. Ouvrir la Preview de la branche et aller sur la page daci-studio.html.
2. Choisir D01 à D06. Le titre, le résumé, les sections et les connexions du document
   source sont recopiés dans un brouillon, sans modifier le canon de la bibliothèque.
3. Modifier la présentation, le module, le cas, le contexte, les notes de relecture
   et les références proposées. Les références saisies **ne sont pas vérifiées automatiquement**.
4. Sélectionner une section, ajouter ou supprimer une section, en changer l'ordre.
   L'identifiant initial de chaque section reste stable lorsque son titre change.
5. Préparer des emplacements pour un futur média 3D, RA, RV, audio, vidéo, image ou
   un futur service IA. Tous portent obligatoirement le statut planned.
6. Ajouter une note de révision décrivant le changement.
7. Vérifier la structure et actualiser l'aperçu.
8. Exporter le brouillon JSON pour le réimporter plus tard, le Markdown pour
   une lecture humaine, et le JSON-LD pour décrire les ressources sémantiques.

## Principes de sécurité
- Aucune collecte de données personnelles, sauvegarde automatique ou connexion à un service IA.
- Les données sont éditées temporairement en mémoire et disparaissent à la fermeture.
- Export local déclenché directement par l'utilisateur.
- Import JSON limité à 200 Ko, contrôlé puis ramené à un schéma connu ; pas d'évaluation
  dynamique du fichier importé ni d'injection HTML depuis l'aperçu.
- Aucune URL de média n'est autorisée dans les emplacements prévus de ce format de brouillon.
  L'activation d'un asset nécessitera plus tard une procédure distincte de licence,
  provenance, manifeste, CORS et optimisation Quest.
- Aucune approbation implicite : la revue métier RH, l'accessibilité et les politiques
  organisationnelles sont requises avant toute utilisation opérationnelle.
- La validation technique vérifie la structure et les liens, pas la vérité des
  affirmations, la conformité légale ni la qualité pédagogique de fond.

## Test de non-régression recommandé
1. Éditer la première section D01 et actualiser l'aperçu.
2. Ajouter une quatrième section, remplir titre et texte, puis vérifier.
3. Monter et descendre cette section, contrôler le sommaire de sélection.
4. Préparer un emplacement 3D et un emplacement IA ; vérifier le statut inactif.
5. Ajouter une note de révision, exporter JSON, puis l'importer et comparer les valeurs.
6. Exporter Markdown puis JSON-LD ; confirmer leurs identifiants de document et leur
   statut de brouillon non publié.
7. Soumettre un JSON malformé, trop grand et comportant une URL de média : l'import
   doit être refusé sans modifier le brouillon courant.
8. Vérifier la navigation clavier, le focus visible, le contraste et l'ergonomie mobile.
9. Tester la bibliothèque DACI, le réseau des connaissances et les cinq dialogues
   ramifiés après cette modification.
10. Vérifier que la simulation S02 et les manettes Meta Quest 3S restent inchangées.

## Limites connues
- Les révisions stockent des notes et des numéros, pas des snapshots restaurables.
  Conserver les exports JSON successifs pour suivre les versions.
- L'atelier ne crée pas encore de nouveaux documents canoniques côté serveur ;
  il adapte uniquement des documents sources D01 à D06.
- Le mode hors-ligne de l'application complète n'est pas garanti : seul le calcul
  documentaire est local une fois la page chargée.
- L'interface n'a pas été certifiée WCAG 2.2 ; une recette au clavier et avec
  lecteur d'écran est à organiser.
- Aucun assistant IA, média 3D, RA, RV ou QR code n'est activé dans ce module.

## Évolutions DACI après validation
- Éditeur de nouveaux documents avec identifiants canoniques, CMS et rôles de relecture.
- Workflow de validation : brouillon, relecture, approbation, publication, retrait.
- Historique de versions avec snapshots, diff et possibilité de restauration.
- Manifeste des assets avec licences, provenance, empreintes SHA-256 et variantes
  légères Web/Quest 3S.
- QR codes générés uniquement après validation de la destination et du domaine.
- Graphe de connaissances enrichi et contrôles sémantiques entre contenus.
- Assistant documentaire avec RAG sur ressources approuvées, citations, supervision
  humaine et politiques adaptées aux données RH.

**Publication bloquée** jusqu'à la vérification sur navigateur et la revue éditoriale.
