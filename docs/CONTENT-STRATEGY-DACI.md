# RH·XR — stratégie de contenus et dispositif DACI

## Réorientation du projet (20 octobre 2026)
Les améliorations graphiques et l’intégration de nouveaux modèles 3D sont mises en attente.
La branche visuelle de la PR #2 reste isolée et **n’est pas fusionnée**.
La priorité devient le contenu RH de qualité : séquences, situations contextualisées,
ressources réutilisables et documents enrichissables à mesure que les médias seront disponibles.

## Ce qui est opérationnel dans le premier lot « Contenus »
- 8 modules RH structurés, 24 séquences pédagogiques avec objectifs, activités et productions.
- 12 mini-cas fictifs, 3 choix par cas, retours explicatifs sans sauvegarde ni classement.
- 6 documents pédagogiques DACI, 18 sections, annotations consultables, liens bidirectionnels
  via module/cas, export de métadonnées en JSON-LD et version imprimable.
- Moteur S02 et VR validée inchangés : cette PR ne touche ni la salle 3D, ni les manettes Quest.
- Recherche et filtres locaux ; aucune donnée nominative ni authentification requise.

## Grammaire pédagogique commune
Chaque module exprime : public cible, objectifs vérifiables, activité, production et mises
en situation associées. Chaque cas comprend un contexte fictif, une décision, des alternatives
plausibles, un feedback argumenté et une question de réflexion.
Les fiches ne sont pas des conseils juridiques et ne doivent pas remplacer les procédures
propres à un employeur ou aux obligations de sécurité applicables.

## DACI — Documents augmentés, connectés et intelligents
1. **Augmenté** : structure de document lisible, annotations visibles, points d’enrichissement
   destinés à de futurs médias 3D/RA/RV/audio/vidéo, impression et version accessible.
2. **Connecté** : identifiants documentaires permanents, parcours liés, cas associés,
   liens internes et métadonnées schema.org exportables (JSON-LD).
3. **Intelligent** : pour ce lot seulement, relations éditoriales et recommandations
   par règles explicites. **Aucun modèle génératif, RAG ou personnalisation automatique**
   n’est connecté. Ces fonctions seront soumises à validation des sources et de la protection
   des données avant intégration.

## Exemple de parcours transversal
Lire D02 « Conversation et feedback » -> apprendre M2 -> répondre à C04 ->
comparer avec S02 -> revenir à D02 pour annoter sa trame personnelle.
Une future expérience VR pourra déclencher la même trame à l’intérieur d’un bureau 3D ;
un QR code imprimé pourra pointer vers l’URL stable du document sur le domaine RH·XR
**une fois le domaine défini et vérifié**.

## Architecture de liaison future
- Contenu canonique en fichiers versionnés, puis éventuellement Payload CMS.
- Schémas de ressources : identifiant stable, traduction, version, objectifs,
  indicateurs d’accessibilité, licences, média, conditions d’usage, liens de compétences.
- Média : clé manifeste et référence R2 éventuelle, version Web et version Quest,
  repli texte/images pour chaque média immersif.
- RA : reconnaissance d’image / QR selon la nature de la tâche, permission caméra explicite.
- RV : scène/animation avec objectifs didactiques, confort et locomotion validés.
- IA : usages circonscrits aux cas fictifs et ressources autorisées ; réponse avec sources,
  supervision humaine, refus de catégoriser psychologiquement les salariés.
- 3D : modèles GLB optimisés accompagnés de licence, taille et fallback.

## Phases recommandées
A. Valider la justesse et l’utilité du catalogue RH auprès de formateurs.
B. Créer une vraie base éditoriale, des glossaires, des grilles d’observation et des
   traductions FR/EN/AR ; intégrer les cadres réglementaires par juridiction si nécessaire.
C. Développer un éditeur DACI : sections, relations, provenance, médias et QR vérifiés.
D. Ajouter médias AR/VR/3D à mesure que les modèles seront fournis, sans affecter le texte.
E. Tester un assistant IA sur des scénarios fictifs et des contenus validés, après revue
   de confidentialité, d’éthique et d’évaluation pédagogique.

## Non-régression avant fusion
- Vérifier que la page d’accueil, la simulation S02, le Studio et la Preview existante fonctionnent.
- Tester recherche des modules, navigation des 12 cas, export JSON-LD et impression d’un document.
- Vérifier les liens internes, le clavier, la lecture mobile et les aides de navigation.
- Tester l’absence de collecte de données personnelles et l’absence d’appels d’IA.
- Vérifier CI Github et Preview Vercel ; la branche graphique PR #2 reste distincte.
