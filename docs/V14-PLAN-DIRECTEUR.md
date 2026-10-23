# RH·XR V14 — Plan directeur : campus RH immersif premium

**État :** feuille de route et contrat de qualité, pas une implémentation déjà validée.  
**Date :** 23 octobre 2026.  
**Dépendance :** PR #5 `feature/daci-webxr-v13` (non fusionnée). Cette branche V14 est créée à partir de la tête de cette PR ; ne pas fusionner la V14 dans `main` avant résolution et validation du socle V13.

## 1. Diagnostic factuel

Le dépôt contient deux expériences ayant chacune son moteur :

- `/simulation.html?office=glb` : scénario S02 (désaccord professionnel) et bureau WebXR Three.js. Locomotion Quest existante dans `assets/js/locomotion.mjs` ; bureau dans `assets/js/room.mjs` ; meubles `desk.glb`, `amrchair.glb`, `chair.glb` dans `assets/models/`. Ces trois modèles sont glTF 2.0, Draco + WebP. La pièce et le personnage restent en grande partie procéduraux.
- `/experiences/daci-v13/index.html` : moteur WebGL autonome, trois parcours fictifs (intégration, entretien, conflit), 54 réponses documentées, 20 ancres XR, interface 2D de repli et visite 3D sur PC. Sa pièce 3D est procédurale et distincte du bureau S02.

Constats : expériences dédoublées, absence de direction artistique complète, interfaces VR trop basiques, absence d'un parcours RH unique, absence de mesures matérielles de fluidité/ergonomie sur Quest 3S. Une CI « verte » ne prouve ni la qualité du rendu ni la présence VR.

## 2. Vision cible et règles non négociables

**RH·XR V14 : un seul lieu immersif, plusieurs missions RH, une connaissance DACI accessible pendant l'action.**

Règles :
1. **Moteur 3D unique :** Three.js + WebXR pour la nouvelle expérience, sans maintenir un second pipeline WebGL dessiné manuellement. Conserver les anciennes URLs comme références de non-régression et les rediriger seulement après validation.
2. **Parité d'usage :** ordinateur 3D, casque VR et mode texte accessible suivent les mêmes états de simulation et les mêmes sources DACI.
3. **Préservation de l'existant :** S02, ses contrôleurs, les trois parcours V13 et leurs citations restent utilisables tant que leur équivalent V14 n'est pas validé.
4. **Données exclusivement fictives :** pas de collaborateurs réels, pas de scoring décisionnel RH, aucune collecte nominative. Les données du laboratoire restent pédagogiques.
5. **Performance et confort :** optimiser sur **Quest 3S physique**, pas uniquement sur émulateur/desktop ; critères instrumentés et jeux de tests manuels.
6. **Progressivité :** aucune obligation d'avoir un grand GLB complet avant de tester les interfaces ; les éléments visuels sont découplés du contenu.

## 3. Direction artistique et bureau de référence

**Style :** « bureau RH contemporain, chaleureux, haut de gamme, sobre ». Palette claire ivoire/grège, bois naturel, bleu pétrole pour l'identité RH·XR, laiton discret comme accent ; contrastes élevés sur le texte. Ne pas imiter une image de synthèse photoréaliste coûteuse par multiplication des lumières.

Zonage fonctionnel :
- **A — Accueil/orientation :** panneau mural RH·XR 3D, présentation de la mission et sélection du parcours ; éclairage doux.
- **B — Conversation :** bureau GLB, fauteuil RH, chaise visiteur ; perspective correcte assis/debout, zone libre devant le mobilier.
- **C — Ressources DACI :** présentoir/tablette documentaires, extraits consultables sans couvrir les visages ou les décisions.
- **D — Débriefing :** synthèse des choix, compétences, alternatives et références ; sortie claire, reprise/recommencer.

Décor permanent : murs et plafond propres, sol parquet ou pierre douce, plinthes, baies ou panneaux opaques cohérents, éclairage apparent discret, tapis, 1–2 plantes, bibliothèque aérée et logo mural. Éviter le bruit visuel et les micro-objets décoratifs.

Pipeline des assets : relevé des unités en mètres, pivots, front faces et collisions ; contrôle à 360°, ombres de contact pré-calculées, PBR avec roughness/metalness mesurés ; UV non chevauchants si lightmaps ; bake Blender quand possible. Vérifier les droits/licences des modèles source avant diffusion élargie. Préparer éventuellement un modèle de pièce depuis un outil image→monde, mais **ne pas publier de géométrie brute non nettoyée**.

Le mobilier actuel (3 GLB) est conservé comme point de départ. Leur orientation esthétique et dimension réelle doivent être validées dans le casque, avec correction au besoin.

## 4. Architecture cible

```text
experiences/rhxr-v14/
  index.html               # point d'entrée unique
  app.mjs                  # orchestration et états
  scene/room.mjs           # géométrie et éléments de décor
  scene/furniture.mjs      # import des GLB, emplacements, secours
  xr/locomotion.mjs        # réutilise le code Quest validé
  xr/interaction.mjs       # raycast, hover, sélection, haptique facultatif
  ui/panels.mjs            # systèmes d'interfaces lisibles VR/PC
  content/engine.mjs       # progression pédagogique sans renderer
  content/daci.mjs         # chargement/citation/extraits
content/rhxr-v14/
  scenarios/*.json         # source unique des scénarios fictifs
  daci/*.json              # passages et métadonnées de source
  schema/*.json            # contrôles d'intégrité
assets/models/             # modèles préexistants ; variantes Quest au besoin
tests/                     # CI d'intégrité et d'états
docs/                      # QA desktop, Quest, scénarios, performances
```

Il s'agit du **contrat de structure proposé**, pas de fichiers créés à ce stade. L'engine décide des états, le renderer montre l'état, et DACI cite la base documentaire. Le code de la scène n'encode pas en dur les réponses.

Ne pas ajouter tout de suite un backend IA ni une connexion RH. Une extension IA future devra être explicite, consentie et indépendante des mécanismes de progression déterministes.

## 5. Plans de livraison par lots et critères « terminé »

### Lot A — Socle de mesure et design system
- Instrumenter temps de frame, triangles, appels de dessin, dimensions/poids des ressources et pertes de WebGL sans stocker d'identifiants individuels.
- Créer une feuille « état initial » sur Quest 3S (S02 et DACI V13) ; distinguer GPU, CPU et réseau si mesurable.
- Valider palettes, matériaux de référence, gabarits de panneaux et hiérarchie typographique avec captures en VR.
- **Terminé quand :** scénarios d'étalonnage reproductibles, mesures comparables et critères lisibilité/confort validés.

### Lot B — Bureau premium WebXR unique
- Remplacer la boîte procédurale par une salle cohérente optimisée ; conserver les 3 meubles GLB en cas de rendu correct.
- Charger les objets de façon progressive, garder une version de secours ; intégrer éclairage pré-calculé et PBR contrôlé.
- Ajouter une version Quest basse/moyenne/haute si la mesure le justifie.
- **Terminé quand :** bureau crédible dans les six directions, textures nettes, pas de trous/clignotements ni pop-in gênant, cible de performances atteinte sur Quest.

### Lot C — Ergonomie des interactions
- Accueil, choix de mission, sélection de réponse, aide DACI, débriefing, recommencer et retour accessibles **dans le casque**.
- Gâchette avec retour de survol, déblocage de clic, hauteur assis/debout, joystick gauche, snap turn 30°/45°, téléportation si utile.
- Mettre les panneaux dans une zone confortable de pointage, 0,8 à 3 m en interaction indirecte, vérifier leur taille angulaire et l'espacement.
- **Terminé quand :** utilisateur novice réalise le chemin complet sans retirer le Quest ni quitter la VR pour lire un texte indispensable.

### Lot D — Fusion des scénarios S02 + V13
- Unifier les modèles de progression et lier les 3 parcours DACI avec le scénario S02.
- Les mêmes options, conséquences et citations doivent produire des résultats identiques en VR, 3D desktop et mode texte.
- **Terminé quand :** tous les chemins déterministes passent les tests et au moins une session intégrale de chaque mission est validée sur Quest.

### Lot E — Enrichissement scientifique et pédagogique
- Rédiger les objectifs, compétences, variantes et débriefings des quatre missions de départ.
- Enrichir les interactions, expliquer les décisions et l'ancrage documentaire, ajouter des erreurs professionnelles plausibles et une remédiation constructive.
- Ajouter plusieurs niveaux (initiation / pratique / avancé) *après* validation du niveau de base ; pas de fausse mesure de compétence ni de verdict RH.
- **Terminé quand :** revue par un formateur RH, citations vérifiées, absence de biais manifestes et comparabilité des parcours 2D/VR.

### Lot F — Recette finale et livraison contrôlée
- Recette sur navigateur desktop et **Meta Quest 3S** : fluidité, entrée/sortie, reprise, joysticks, gâchettes, parcours complets, textes, DACI.
- Audit des modèles, licences, sécurité, accessibilité, taille des assets ; comparaison avant/après avec captures dans le casque.
- **Terminé quand :** les preuves de test réelles et les indicateurs de performance figurent dans la PR, et que la version stable n'a aucune régression.

## 6. Objectifs de performance et limites

**Cible principale :** 72 FPS soutenus sur Quest 3S (environ 13,9 ms/frame), tester 90 FPS seulement si le casque, la session WebXR et la charge le permettent.

**Budgets provisoires, à ajuster par mesure réelle :**
- 100 à 150 draw calls visibles comme objectif de départ pour le bureau statique ; relever la valeur réelle avant optimisation.
- 200 000 à 400 000 triangles visibles pour le décor/bureau initial, à mesurer en VR stéréoscopique.
- Textures des objets principaux 1K ; réserver 2K aux surfaces dont le gain est visible dans le casque ; KTX2/Basis et mipmaps pour les variantes optimisées.
- Décor majoritairement statique, éclairage baked ; éviter les ombres de lumières ponctuelles dynamiques et les matériaux translucides en excès.
- Progressive enhancement : si GLB/Draco/texture/VR indisponible, continuer le scénario et afficher un statut explicite.

Ces chiffres sont des **budgets internes de conception, pas des limites matérielles officielles**, ni des performances mesurées. Les optimiser contre les captures/metrics relevées sur Quest.

Références de travail :
- Meta, *WebXR performance optimization workflow*, https://developers.meta.com/vr/documentation/web/webxr-perf-workflow/
- Meta, *WebXR Performance Best Practices*, https://developers.meta.com/vr/documentation/web/webxr-perf-bp/
- Meta, *Hands UI best practices*, https://developers.meta.com/vr/design/hands-ui-best-practices/
- Meta, *Typography*, https://developers.meta.com/vr/design/styles_typography/

## 7. Critères pédagogiques transversaux

Chaque parcours doit publier :
- compétence/objectif clairement formulé ; rôle, situation, enjeux et règles du cadre fictif ;
- choix plausibles, conséquences situées, réaction du personnage et question suivante ;
- référence DACI en contexte (titre, section, passage, identifiant stable et justification) ;
- mode « En savoir plus » optionnel, sans occlusion de la scène ;
- bilan narratif de compétences entraînées, décisions, alternatives à tester, et aucune qualification RH d'une personne réelle.

La priorité est la **pertinence** plutôt que l'augmentation brute du nombre d'options. Les 54 réponses existantes ne doivent pas disparaître sans cartographie explicite.

## 8. Politique de branches et publication

- PR #5 V13 reste ouverte et non fusionnée tant que les essais Quest requis ne sont pas satisfaits.
- La branche `design/v14-premium-unified-vr` sert aux spécifications puis à la V14 sur une PR dédiée dont la base initiale est `feature/daci-webxr-v13`.
- Ne pas faire de remplacement silencieux des moteurs S02 ou DACI V13, ni changer les URL publiques avant recette.
- Les activités de conception ne prouvent pas la qualité du rendu. On publie et valide **lot par lot**, sans affirmer « premium » avant les tests VR réels.
