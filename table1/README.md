# Exemples TypeScript - Concepts Fondamentaux

Ce projet contient des exemples pratiques de tous les concepts fondamentaux de TypeScript, organisés par thème dans des dossiers séparés.

## 📁 Structure du Projet

```
src/
├── 01-constructeur-methodes/     # Constructeurs, méthodes et 'this'
├── 02-constructeur-prive/        # Constructeur privé et patterns Singleton/Factory
├── 03-modificateurs-acces/       # private, public, protected, readonly
├── 04-interface-classe/          # Interfaces et classes concrètes
├── 05-heritage/                  # Héritage de classes et polymorphisme
├── 06-generiques-types/          # Génériques et types avancés
├── 07-decorators/                # Décorateurs (expérimental)
└── index.ts                      # Point d'entrée principal
```

## 🚀 Installation et Exécution

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Compilation
```bash
npm run build
```

### Exécution
```bash
# Avec ts-node (développement)
npm run dev

# Avec le code compilé
npm start
```

### Mode watch (recompilation automatique)
```bash
npm run watch
```

## 📚 Concepts Couverts

### 1. 🏗️ Constructeur et Méthodes
- Création de classes avec constructeur
- Définition de méthodes
- Utilisation du mot-clé `this`
- Accès aux propriétés d'instance

**Fichier:** `src/01-constructeur-methodes/constructeur.ts`

### 2. 🔒 Constructeur Privé
- Pattern Singleton avec constructeur privé
- Factory methods
- Contrôle de l'instanciation

**Fichier:** `src/02-constructeur-prive/constructeur-prive.ts`

### 3. 🔐 Modificateurs d'Accès
- `public` : accessible partout
- `private` : accessible seulement dans la classe
- `protected` : accessible dans la classe et ses sous-classes
- `readonly` : lecture seule après initialisation

**Fichier:** `src/03-modificateurs-acces/modificateurs-acces.ts`

### 4. 📋 Interface et Classe Concrète
- Définition d'interfaces comme contrats
- Implémentation d'interfaces dans des classes
- Polymorphisme avec interfaces
- Héritage d'interfaces

**Fichier:** `src/04-interface-classe/interface-classe.ts`

### 5. 🧬 Héritage
- Héritage avec `extends`
- Appel du constructeur parent avec `super()`
- Redéfinition de méthodes (override)
- Classes abstraites
- Polymorphisme

**Fichier:** `src/05-heritage/heritage.ts`

### 6. 🎯 Génériques et Types
- Types génériques (`<T>`)
- Contraintes sur les génériques
- Types d'union (`|`)
- Types littéraux
- Types utilitaires (`Partial`, `Required`, `Omit`, `Pick`)
- Types conditionnels

**Fichier:** `src/06-generiques-types/generiques.ts`

### 7. ✨ Décorateurs (Expérimental)
- Décorateurs de classe
- Décorateurs de méthode
- Décorateurs de propriété
- Décorateurs factory

**Fichier:** `src/07-decorators/decorators.ts`

## 🔧 Configuration TypeScript

Le projet utilise une configuration TypeScript stricte avec :
- Target ES2020
- Strict mode activé
- Source maps pour le debugging
- Déclarations de types générées

## 📋 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run build` | Compile le TypeScript vers JavaScript |
| `npm run start` | Lance le code compilé |
| `npm run dev` | Lance avec ts-node (pas de compilation) |
| `npm run watch` | Mode watch pour recompilation automatique |

## 🎯 Exemples d'Usage

Chaque dossier contient des exemples pratiques et des fonctions de démonstration. Pour voir tous les exemples en action :

```typescript
import { executerTousLesExemples } from './src/index';

executerTousLesExemples();
```

## 🔍 Points Clés à Retenir

1. **Encapsulation** : Utilisez les modificateurs d'accès appropriés
2. **Abstraction** : Définissez des interfaces claires
3. **Héritage** : Réutilisez le code avec `extends`
4. **Polymorphisme** : Une interface, plusieurs implémentations
5. **Types sûrs** : Exploitez le système de types de TypeScript
6. **Génériques** : Créez du code réutilisable et type-safe

## 🚨 Notes Importantes

- Les décorateurs sont une fonctionnalité expérimentale
- Certains exemples nécessitent Node.js (pas le navigateur)
- Le strict mode est activé pour une meilleure sécurité des types

## 📖 Ressources Supplémentaires

- [Documentation officielle TypeScript](https://www.typescriptlang.org/docs/)
- [Handbook TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Types utilitaires](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

**Créé comme exemple pédagogique pour apprendre les concepts TypeScript** 🎓
