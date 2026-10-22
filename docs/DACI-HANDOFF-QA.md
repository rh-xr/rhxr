# RH·XR — Transmission DACI (V1.5)

Le Studio produit un brouillon local ; l'écran de transmission crée un dossier JSON avec la version, une demande de revue et une empreinte SHA-256.

## Recette
1. Dans le Studio, renseigner une source HTTPS, un contexte fictif, la provenance et les notes de relecture.
2. Exporter le brouillon JSON ; ouvrir daci-transfert.html.
3. Importer le brouillon, indiquer la finalité de la revue et exporter le dossier JSON.
4. Réimporter le dossier et vérifier l'intégrité ; exporter le rapport Markdown.
5. Modifier manuellement le texte d'une section dans le fichier : le vérificateur doit refuser.
6. Modifier approved, published ou un critère de revue : le vérificateur doit refuser.
7. Vérifier que tous les médias restent « planned ».

## Limites
Le SHA-256 n'authentifie personne et n'est pas une signature. Un acteur peut recalculer une empreinte. Les références HTTPS ne sont pas vérifiées à distance. Une relecture RH, juridique, documentaire et accessibilité reste indispensable.

Un futur CMS devra authentifier auteurs et approbateurs, contrôler les permissions côté serveur et maintenir des versions approuvées immuables. Aucune publication réelle n'est implémentée.
