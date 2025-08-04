# Projet TypeScript

Ce projet présente une structure TypeScript basique avec des tests.

## Structure du projet

```
/
├── src/
│   ├── app.ts              # Application principale
│   ├── utils.ts            # Fonctions utilitaires
│   ├── tests/
│   │   ├── app.test.ts     # Tests pour app.ts
│   │   └── utils.spec.ts   # Tests pour utils.ts
├── node_modules/
│   └── some-library.js     # Exemple de bibliothèque externe
├── tsconfig.json           # Configuration TypeScript
└── package.json            # Configuration du projet Node.js
```

## Installation

```bash
npm install
```

## Scripts disponibles

- `npm run build` - Compile le TypeScript vers JavaScript
- `npm run dev` - Mode développement avec rechargement automatique
- `npm start` - Lance l'application compilée
- `npm test` - Exécute les tests
- `npm run test:watch` - Exécute les tests en mode watch
- `npm run clean` - Nettoie le dossier de sortie

## Utilisation

1. Compiler le projet :
   ```bash
   npm run build
   ```

2. Lancer l'application :
   ```bash
   npm start
   ```

3. Exécuter les tests :
   ```bash
   npm test
   ```
