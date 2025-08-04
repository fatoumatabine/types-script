# 📚 Guide Complet TypeScript - Concepts Fondamentaux

Ce projet présente tous les concepts fondamentaux de TypeScript avec des exemples pratiques et commentés.

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Installer TypeScript globalement (optionnel)
npm install -g typescript ts-node
```

### Lancement
```bash
# Compiler le projet
npm run build

# Lancer en mode développement
npm run dev

# Lancer le fichier compilé
npm start
```

## 📁 Structure du Projet

```
src/
├── 01-number/           # Types numériques
├── 02-function-type/    # Types de fonctions
├── 03-boolean/          # Types booléens
├── 04-enum/            # Énumérations
├── 05-string/          # Types chaînes
├── 06-type-union/      # Types union
├── 07-type-never/      # Type never
├── 08-extends/         # Héritage et extension
├── 09-fonction-generique/ # Fonctions génériques
├── 10-type-object/     # Types objets
└── index.ts            # Fichier principal
```

## 📖 Concepts Couverts

### 1. 🔢 Type Number
- **Fichier**: `src/01-number/exemple-number.ts`
- **Concepts**: Nombres entiers, décimaux, opérations mathématiques, valeurs spéciales (Infinity, NaN)
- **Exemples**: Calculs de somme, pourcentages, validations

### 2. 🔧 Types Function
- **Fichier**: `src/02-function-type/exemple-function.ts`
- **Concepts**: Signatures de fonctions, paramètres optionnels, valeurs par défaut, callbacks
- **Exemples**: Fonctions pures, fonctions génériques, composition

### 3. ✅ Type Boolean
- **Fichier**: `src/03-boolean/exemple-boolean.ts`
- **Concepts**: Valeurs vraies/fausses, opérations logiques, conditions
- **Exemples**: Validation, flags d'état, contrôles d'accès

### 4. 📋 Enum
- **Fichier**: `src/04-enum/exemple-enum.ts`
- **Concepts**: Énumérations numériques, string, mixtes, const enum
- **Exemples**: Status codes, directions, permissions, jours de la semaine

### 5. 📝 Type String
- **Fichier**: `src/05-string/exemple-string.ts`
- **Concepts**: Chaînes littérales, template literals, manipulation de texte
- **Exemples**: Validation email, formatage, expressions régulières

### 6. 🔀 Types Union
- **Fichier**: `src/06-type-union/exemple-union.ts`
- **Concepts**: Union de types, discriminated unions, type guards
- **Exemples**: Polymorphisme, gestion d'états, validation de types

### 7. 🚫 Type Never
- **Fichier**: `src/07-type-never/exemple-never.ts`
- **Concepts**: Fonctions qui ne retournent jamais, exhaustive checking
- **Exemples**: Gestion d'erreurs, vérifications exhaustives, assertions

### 8. 🔗 Extends
- **Fichier**: `src/08-extends/exemple-extends.ts`
- **Concepts**: Héritage de classes, extension d'interfaces, contraintes génériques
- **Exemples**: Classes dérivées, interfaces étendues, mixins

### 9. 🎯 Fonctions Génériques
- **Fichier**: `src/09-fonction-generique/exemple-generique.ts`
- **Concepts**: Paramètres génériques, contraintes, types conditionnels
- **Exemples**: Fonctions utilitaires, cache générique, retry pattern

### 10. 🏗️ Types Object
- **Fichier**: `src/10-type-object/exemple-object.ts`
- **Concepts**: Interfaces, index signatures, manipulation d'objets
- **Exemples**: CRUD operations, sérialisation, factory pattern

## 🔧 Fonctionnalités Avancées

### Validation de Types
```typescript
function validerEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

### Génériques avec Contraintes
```typescript
function obtenirPropriete<T, K extends keyof T>(objet: T, cle: K): T[K] {
    return objet[cle];
}
```

### Types Utilitaires
```typescript
type PartielProfond<T> = {
    [P in keyof T]?: T[P] extends object ? PartielProfond<T[P]> : T[P];
};
```

## 🎮 Exemples d'Utilisation

### Utilisation du Cache Générique
```typescript
import { Cache } from './src/09-fonction-generique/exemple-generique';

const cache = new Cache<string, User>(100);
cache.definirCache("user1", { id: 1, nom: "Alice" });
const user = cache.obtenirCache("user1");
```

### Gestionnaire de Personnes
```typescript
import { GestionnairePersonnes } from './src/10-type-object/exemple-object';

const gestionnaire = new GestionnairePersonnes();
gestionnaire.ajouter({ id: 1, nom: "Jean", age: 30 });
const personnes = gestionnaire.rechercher(p => p.age > 25);
```

### Types Union avec Discrimination
```typescript
import { utiliserVehicule, Voiture, Velo } from './src/06-type-union/exemple-union';

const voiture = new Voiture("Toyota", "Prius");
const message = utiliserVehicule(voiture); // Polymorphisme
```

## 🧪 Tests et Performance

Le projet inclut des tests de performance pour mesurer l'efficacité des différentes opérations :

```typescript
// Test de clonage profond avec 1000 éléments
// Test de filtrage avec 10000 éléments  
// Test de validation avec 1000 personnes
```

## 📝 Bonnes Pratiques

### 1. Typage Explicite
```typescript
// ✅ Bon
function calculer(a: number, b: number): number {
    return a + b;
}

// ❌ À éviter
function calculer(a: any, b: any): any {
    return a + b;
}
```

### 2. Immutabilité
```typescript
// ✅ Bon - retourne un nouvel objet
function mettreAJourAge(personne: Personne, nouvelAge: number): Personne {
    return { ...personne, age: nouvelAge };
}

// ❌ À éviter - mutation directe
function mettreAJourAge(personne: Personne, nouvelAge: number): void {
    personne.age = nouvelAge;
}
```

### 3. Type Guards
```typescript
function estNombre(valeur: unknown): valeur is number {
    return typeof valeur === "number";
}

if (estNombre(valeur)) {
    // TypeScript sait maintenant que valeur est number
    console.log(valeur.toFixed(2));
}
```

## 🛠️ Configuration TypeScript

Le projet utilise une configuration stricte pour maximiser la sécurité de type :

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

## 📚 Ressources Supplémentaires

- [Documentation officielle TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 🤝 Contribution

N'hésitez pas à :
- Proposer des améliorations
- Ajouter de nouveaux exemples
- Corriger des erreurs
- Améliorer la documentation

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

**Note**: Ce projet est conçu pour l'apprentissage et la référence. Chaque concept est accompagné d'exemples pratiques et de commentaires explicatifs pour faciliter la compréhension.
