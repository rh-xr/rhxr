# Sécurité, vie privée et usage responsable

## État du démonstrateur

Les modules du portail sont statiques. La promptothèque, les modèles RH locaux, la recherche documentaire et les simulations textuelles utilisent le navigateur. Ils n'ont pas de base de données de salariés, ni de compte, ni de système de décision sur les personnes.

Les résultats de simulation et textes saisis ne sont pas persistés par le code du portail. Les boutons d'export ou de copie sont des actions explicites de l'utilisateur. Le site charge toutefois des ressources externes (notamment polices, Three.js / Draco et hébergement), susceptibles de relever de leurs propres mécanismes techniques ou journaux. Une revue indépendante demeure nécessaire avant un usage réel.

## Garde-fous

- Ne pas saisir de données RH réelles, de CV identifiants, de salaires individuels, de données de santé, de secrets professionnels ou de documents internes confidentiels dans le prototype.
- Les sources institutionnelles sont des références à consulter et à vérifier ; elles ne constituent ni une veille juridique automatique ni un conseil personnalisé. Le droit applicable dépend de la juridiction.
- Les prompts ne doivent pas demander un classement automatisé des candidats, une inférence psychologique ou des décisions individualisées sans base légale et contrôle humain appropriés.
- Les avatars, dialogues et documents d'exercice sont fictifs. Le score formatif ne doit servir ni à l'embauche, ni à la promotion, ni à la sanction ou à la surveillance d'employés.
- L'outil de génération de trames est déterministe et ne contacte pas d'API de modèle IA. La copie d'un prompt vers un autre service est une démarche indépendante, à évaluer séparément.

## Avant une évolution vers un produit RH

Étudier la base légale, l'information des personnes, les accès et habilitations, la durée de conservation, la sécurité et l'auditabilité, la séparation des organisations, la qualité des sources et les risques liés aux usages IA. Prévoir des tests d'accessibilité et des tests WebXR sur matériel réel.

Voir `docs/RHXR_EDITORIAL_V1_1.md`.
