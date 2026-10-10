# ZEDUC-SP@CE — Front-end React V4

Cette version reprend le prototype Stitch et les principes techniques d'Archiva React : React/Vite, React Router, Context API, Bootstrap, composants réutilisables, responsive design et persistance localStorage.

## Interfaces et rôles

- **Étudiant** : catalogue, recherche, catégories, panier, quantités, commande, historique, fidélité, classement, événements, réclamations et profil.
- **Employé** : KDS, filtrage des tickets, progression des statuts, menu et portions, ruptures, réclamations et production.
- **Gérant** : supervision des commandes, CA, nombre de tickets, panier moyen, canaux de vente, personnel et arbitrage des réclamations.
- **Direction Réseau** : gouvernance des équipes, cockpit réseau, catalogue maître, événements/promotions, qualité/HACCP et paramètres.

Le rôle choisi à la connexion détermine automatiquement l'interface et les routes accessibles. `RoleGate.jsx` empêche l'accès direct à une interface d'un autre rôle.

## Données fonctionnelles

Le panier et les commandes utilisent `AppContext.jsx`. Les commandes étudiant alimentent aussi le tableau opérationnel partagé avec le KDS et les tableaux du gérant. Les actions « Faire avancer », « Résoudre », « Ajouter collaborateur », « +10 portions », création d'événement, rotation de clé et sauvegarde de configuration ont un comportement local de démonstration.

Les statistiques sont recalculées à partir des données opérationnelles : nombre de tickets, chiffre d'affaires, panier moyen, répartition des statuts et canaux.

## Images

Les nouvelles ressources sont locales dans `public/assets/menu/` :
- burger-zeduc.png
- wrap-poulet.png
- boisson-menthe.png
- lait-fermente.png
- beignets-sucre.png

Elles ont été ajoutées au catalogue avec les produits correspondants.

## Lancement

```bash
npm install
npm run dev
```

Puis ouvrir l'URL Vite affichée, généralement `http://localhost:5173`.

## Production

```bash
npm run build
npm run preview
```

Les données sont actuellement locales. Pour une mise en production, les rôles, permissions, commandes, paiements et statistiques doivent être validés côté serveur via l'API.
