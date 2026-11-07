# RH·XR — Recette ergonomique et WebXR
Date : 7 novembre 2026.

## Stratégie d'essai
La CI `browser-qa.yml` ouvre les pages depuis le serveur statique de la branche, dans Chromium réel, à 1440 × 900 (desktop) et 390 × 844 (mobile). Elle contrôle les titres, les liens internes, l’absence de débordements horizontaux, les filtres de fiches et de documents, le prompt ciblé, la génération locale d'une trame, le lien vers la mission 3D, et les erreurs JavaScript.

Les captures d'écran sont déposées dans l'artifact GitHub Actions **rhxr-desktop-mobile-screenshots**, conservé sept jours. Ces captures documentent le rendu de test mais ne constituent pas un audit WCAG exhaustif ni une preuve que le contenu est ergonomiquement parfait.

Les tests automatisés portent sur la version servie localement depuis le commit de la branche ; Vercel confirme séparément l'état de déploiement. Une Preview protégée ne doit pas être rendue publique pour permettre des contrôles automatiques.

## Contrôles qui nécessitent un humain
- Lecture réelle sur téléphone (Android / iOS), rendu selon navigateurs, zoom à 200 % et navigation au clavier.
- Dans **Meta Quest 3S**, ouvrir `experiences/rhxr-v14-1/index.html`, entrer en mode VR, utiliser les deux manettes, sélectionner les panneaux, parcourir les sept missions, vérifier la lisibilité et la fluidité sans nausée.
- Inspecter visuellement le contact des chaussures et du fauteuil Badr Han avec le sol, l'orientation à 312° et les distances de sécurité entre mobilier et avatar.
- Signaler les erreurs réseau CDN (Three.js, Draco) ; les modèles GLB restent intacts.

Ne pas fusionner la PR avant validation manuelle des points matériels. Aucune mesure de fps réel Quest ne peut être inférée d'un test Chromium sur GitHub Actions.
