# RH·XR V14 — Lot A : prototype de bureau et diagnostic

**État au 23/10/2026 :** prototype codé sur `design/v14-premium-unified-vr`, non fusionné. Les contrôles CI vérifient la syntaxe et des invariants ; les tests réels Quest 3S, la qualité perceptuelle et le coût GPU sont en attente.

## Ce qui fonctionne dans le code

- Mode opt-in `/simulation.html?office=v14` : architecture plus riche générée par `assets/js/premium-office-v14.mjs` (murs, lattes en bois, fenêtre décorative, rangements, tapis, plantes, enseigne RH·XR).
- La scène ne remplace pas le moteur de locomotion : `room.mjs` conserve `readSticks`, `snapAroundHead`, les limites de salle et l'intégration VR.
- Le bureau, le fauteuil et la chaise GLB originaux sont toujours chargés par `office-furniture.mjs` (Draco + WebP), avec mobilier de secours si un fichier échoue.
- Matériaux `MeshStandardMaterial`, lumière d'ambiance et directionnelle non ombrées, `ACESFilmicToneMapping` pour V14 seulement ; décor opaque et textures procédurales minimales.
- Mode de diagnostic opt-in `/simulation.html?office=v14&metrics=1`, sans réseau, stockage ou identifiant personnel.
- Page d'accès `/experiences/rhxr-v14/index.html` disponible depuis le portail ; lien de comparaison vers `/simulation.html?office=glb`.

## Diagnostic : interprétation exacte

Le module `assets/js/metrics-v14.mjs` recueille :
- intervalles entre rappels de l'animation Three.js, et FPS *estimées* `1000 / moyenne des intervalles`, p95 des intervalles, fenêtres limitées à 120 samples ;
- `renderer.info.render.calls`, `renderer.info.render.triangles`, géométries et textures au dernier rendu ;
- état du chargement des 3 meubles (réussi ou repli).

Les compteurs sont visibles sur la page et sur un panneau discret dans la scène **uniquement en mode diagnostic**. Un bouton permet d'exporter sur le navigateur un JSON local avec un schéma et des valeurs agrégées, sans identifiant RH ou stockage automatique.

**Limite importante :** ce compteur ne mesure ni les durées CPU/GPU réelles ni le temps de présentation/compositing. Il n'indique pas si l'application est limitée par le CPU ou le GPU et n'est pas une preuve de fluidité du casque. Pour cette analyse, utiliser les outils de performance Quest (OVR Metrics Tool, Chrome tracing, etc.) et comparer les données.

## Comparatif à réaliser sur Meta Quest 3S

1. Accéder à la Preview V14 HTTPS (SSO Vercel, si nécessaire), puis à `/simulation.html?office=glb` : état de référence.
2. Passer au prototype `/simulation.html?office=v14`, vérifier l'orientation et l'échelle des 3 meubles et observer matériaux et éclairages sous plusieurs angles.
3. Entrer en VR : commandes Quest stick gauche et rotation 45° droite, test de marche physique et retour en mode navigateur.
4. Tester la référence et V14 **dans le même casque, avec durée et conditions similaires**, en évitant de tirer des conclusions à partir du PC.
5. Réouvrir `/simulation.html?office=v14&metrics=1`, relever 30 à 60 secondes d'activité stationnaire, déplacement, rotation et lecture des panneaux ; exporter le diagnostic local.
6. Observer dans OVR Metrics Tool la fréquence et le budget GPU/CPU ; comparer avec la cible interne 72 FPS/13,9 ms. Si 72 Hz n'est pas la fréquence de la session, noter la fréquence effective avant tout verdict.
7. Vérifier S02 jusqu'au débriefing et absence de régression de la page DACI V13, qui demeure distincte.

## Suite des lots

- **Fin Lot A :** disposer des relevés Quest et d'une comparaison visuelle avant/après ; ajuster la salle et les matériaux à partir des observations.
- **Lot B :** remplacer progressivement le reste des éléments trop stylisés par une architecture 3D plus aboutie, valider des textures et lightmaps optimisées, vérifier les droits des assets.
- **Lots C à E :** interfaces VR contextuelles réellement lisibles, puis moteur pédagogique unifié pour S02 et les 3 parcours DACI (54 réponses / 20 ancres), enrichissement narratif. Ces lots ne sont **pas encore implémentés**.

**La validation du Lot A exige une évaluation physique Quest 3S ; une Preview verte n'est pas une validation matérielle.**

## Documentation externe (informations susceptibles d'évoluer)

- Meta, *WebXR performance optimization workflow*: https://developers.meta.com/vr/documentation/web/webxr-perf-workflow/
- Meta, *WebXR Performance Tools*: https://developers.meta.com/vr/documentation/web/webxr-perf-tools/
- Three.js, *WebGLRenderer.info*: https://threejs.org/docs/pages/WebGLRenderer
