# Concepts TypeScript Avancés

Ce projet démontre 15 concepts avancés de TypeScript avec des exemples pratiques et des implémentations complètes.

## 📋 Concepts Couverts

### 1. **Tuples** - Types de données ordonnées
Types pour des collections ordonnées avec types spécifiques pour chaque position.
```typescript
type Coordinates = [number, number]; // [x, y]
type RGBColor = [number, number, number]; // [r, g, b]
```

### 2. **Unions** - Types combinés
Combinaison de plusieurs types avec l'opérateur `|`.
```typescript
type Status = "loading" | "success" | "error";
type StringOrNumber = string | number;
```

### 3. **Intersections** - Types fusionnés
Fusion de plusieurs types avec l'opérateur `&`.
```typescript
type EmployeePerson = Person & Employee;
type ReadWrite = Readable & Writable;
```

### 4. **Parsable** - Analyse de données
Interfaces pour analyser et valider des données depuis des chaînes.
```typescript
interface Parser<T> {
    parse(input: string): T | null;
    stringify(value: T): string;
    validate(value: unknown): value is T;
}
```

### 5. **LastElement** - Utilitaires de types
Types utilitaires pour manipuler les éléments de tuples.
```typescript
type LastElement<T extends readonly unknown[]> = 
    T extends readonly [...unknown[], infer L] ? L : never;
```

### 6. **Even** - Types conditionnels
Logique conditionnelle au niveau des types.
```typescript
type IsEven<N extends number> = N extends 0 ? true
    : N extends 1 ? false
    : N extends 2 ? true
    : boolean;
```

### 7. **Unshift** - Manipulation de tableaux
Ajout d'éléments au début des tuples.
```typescript
type Unshift<T extends readonly unknown[], U> = [U, ...T];
```

### 8. **Selector** - Sélection de types
Sélection et extraction de propriétés d'objets.
```typescript
type Selector<T, K extends keyof T> = T[K];
type MultiSelector<T, K extends keyof T> = Pick<T, K>;
```

### 9. **Skip** - Ignorer des éléments
Ignorer des éléments dans des collections.
```typescript
type Skip<T extends readonly unknown[], N extends number> = 
    N extends 0 ? T : T extends readonly [unknown, ...infer Rest] ? 
        Skip<Rest, Decrement<N>> : [];
```

### 10. **Reducer** - Réduction de données
Patterns pour réduire des collections à des valeurs uniques.
```typescript
type Reducer<T, U> = (accumulator: U, current: T, index: number) => U;
```

### 11. **Join** - Jointure de types
Concatenation de chaînes au niveau des types.
```typescript
type Join<T extends readonly string[], Separator extends string = ","> = 
    T extends readonly [infer First, ...infer Rest] ?
        // Logique de jointure récursive
        string : "";
```

### 12. **RecursivePoint** - Types récursifs
Structures de données récursives comme les arbres.
```typescript
type TreeNode<T> = {
    value: T;
    children: TreeNode<T>[];
};
```

### 13. **Concat** - Concaténation
Fusion de tuples et de types.
```typescript
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];
```

### 14. **Some** - Vérifications conditionnelles
Vérification de conditions sur des collections.
```typescript
type Some<T extends readonly unknown[], U> = 
    T extends readonly [infer First, ...infer Rest] ?
        First extends U ? true : Some<Rest, U> : false;
```

### 15. **Try** - Gestion d'erreurs
Pattern pour la gestion des erreurs sans exceptions.
```typescript
type Try<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };
```

## 🚀 Installation et Utilisation

### Prérequis
- Node.js (version 16+)
- TypeScript (version 5.0+)

### Installation
```bash
npm install
```

### Compilation
```bash
npm run build
```

### Exécution
```bash
npm start
```

### Mode développement
```bash
npm run dev
```

## 📁 Structure du Projet

```
src/
├── tuples.ts           # Exemples de tuples
├── unions.ts           # Types union
├── intersections.ts    # Types intersection
├── parsable.ts         # Interfaces d'analyse
├── lastElement.ts      # Utilitaires de tuples
├── even.ts             # Types conditionnels
├── unshift.ts          # Manipulation de tableaux
├── selector.ts         # Sélection de types
├── skip.ts             # Ignorer des éléments
├── reducer.ts          # Réduction de données
├── join.ts             # Jointure de types
├── recursivePoint.ts   # Types récursifs
├── concat.ts           # Concaténation
├── some.ts             # Vérifications conditionnelles
├── try.ts              # Gestion d'erreurs
└── index.ts            # Point d'entrée principal
```

## 🎯 Exemples d'Usage

Chaque fichier contient une fonction de démonstration qui peut être exécutée individuellement :

```typescript
import { demonstrateTuples } from './src/tuples';
import { demonstrateUnions } from './src/unions';
// ... autres imports

// Exécuter un concept spécifique
const tupleResults = demonstrateTuples();

// Ou exécuter tous les concepts
import { main } from './src/index';
const allResults = main();
```

## 🔧 Configuration TypeScript

Le projet utilise une configuration TypeScript stricte :
- Mode strict activé
- Types explicites requis
- Vérifications de nullabilité
- Détection des variables non utilisées

## 📚 Apprentissage

Ce projet est conçu pour l'apprentissage progressif :

1. **Débutant** : Commencez par `tuples.ts` et `unions.ts`
2. **Intermédiaire** : Explorez `intersections.ts` et `parsable.ts`
3. **Avancé** : Plongez dans `recursivePoint.ts` et les types conditionnels

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ajouter des exemples
- Améliorer la documentation
- Optimiser les implémentations
- Proposer de nouveaux concepts

## 📄 Licence

MIT License - Libre d'utilisation pour l'apprentissage et les projets personnels.
