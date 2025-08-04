# Projet TypeScript - Concepts Avancés

Ce projet démontre tous les concepts TypeScript essentiels avec des exemples pratiques et détaillés.

## 📋 Concepts Couverts

### 1. **Interfaces et Types** (`01-interfaces-types.ts`)
- Définition d'interfaces pour structurer les objets
- Types alias comme alternative aux interfaces
- Types littéraux et propriétés optionnelles
- Exemples : `Utilisateur`, `Produit`, `Statut`

### 2. **Intersection de Types** (`02-intersection-types.ts`)
- Combinaison de types avec l'opérateur `&`
- Interfaces qui étendent plusieurs types
- Types complexes combinant propriétés multiples
- Exemples : `Entite`, `EmployeComplet`

### 3. **Union de Types** (`03-union-types.ts`)
- Types union avec l'opérateur `|`
- Discriminated unions (unions discriminées)
- Pattern matching avec switch/case
- Exemples : `Vehicule`, `Forme`, `ResultatAPI`

### 4. **Héritage** (`04-heritage.ts`)
- Classes abstraites et méthodes abstraites
- Héritage avec `extends`
- Implémentation d'interfaces multiples
- Exemples : `Animal`, `Chien`, `Chat`, `Canard`

### 5. **Attributs et Méthodes de Classe** (`05-attributs-methodes-classe.ts`)
- Modificateurs d'accès (public, private, protected)
- Attributs et méthodes statiques
- Getters et setters
- Propriétés readonly
- Exemples : `Voiture`, `VoitureElectrique`

### 6. **Fonctions Génériques** (`06-fonction-generique.ts`)
- Fonctions avec paramètres de type
- Contraintes génériques avec `extends`
- Inférence de types
- Exemples : `identite`, `mapper`, `filtrer`, `obtenirPropriete`

### 7. **Types Génériques** (`07-types-generiques.ts`)
- Interfaces et classes génériques
- Types conditionnels et inférence
- Utility types personnalisés
- Exemples : `Conteneur<T>`, `Repository<T, ID>`, `MapGenerique<K, V>`

### 8. **Type Object** (`08-type-object.ts`)
- Types d'objets littéraux
- Index signatures et propriétés calculées
- Types imbriqués et conditionnels
- Utility types (Pick, Omit, Partial, Required)
- Exemples : `PersonneComplete`, `CalculatriceObjet`, `ReponseAPI<T>`

### 9. **Type Fonction** (`09-type-fonction.ts`)
- Types de fonction avec signatures diverses
- Fonctions avec callbacks et promises
- Surcharges de fonctions
- Fonctions d'ordre supérieur
- Exemples : `CalculatriceInterface`, `Middleware<T, U>`, `Validateur<T>`

### 10. **Attribut en tant que Clé** (`10-attribut-cle.ts`)
- Utilisation de `keyof` pour les clés de types
- Mapped types et template literal types
- Types conditionnels avec clés
- Pattern Builder et Proxy
- Exemples : `GestionnaireDonnees<T>`, `PersonneBuilder`

### 11. **Test Type Union** (`11-test-type-union.ts`)
- Type guards (gardes de type)
- Tests de types avec `instanceof` et `in`
- Narrowing et assertions de type
- Gestion de null/undefined
- Exemples : `TesteurUnion`, `ReponseBuilder`

## 🚀 Installation et Utilisation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

### Scripts Disponibles

```bash
# Compiler le projet
npm run build

# Exécuter le projet compilé
npm start

# Exécuter en mode développement avec ts-node
npm run dev

# Compiler en mode watch (recompilation automatique)
npm run watch
```

## 📁 Structure du Projet

```
src/
├── 01-interfaces-types.ts      # Interfaces et types de base
├── 02-intersection-types.ts    # Intersection de types avec &
├── 03-union-types.ts          # Union de types avec |
├── 04-heritage.ts             # Héritage et classes abstraites
├── 05-attributs-methodes-classe.ts # Classes avancées
├── 06-fonction-generique.ts   # Fonctions génériques
├── 07-types-generiques.ts     # Types et classes génériques
├── 08-type-object.ts          # Types d'objets complexes
├── 09-type-fonction.ts        # Types de fonctions
├── 10-attribut-cle.ts         # Clés d'objets comme types
├── 11-test-type-union.ts      # Tests et gardes de type
└── index.ts                   # Point d'entrée principal
```

## 🎯 Exemples d'Utilisation

### Interface et Type
```typescript
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  age?: number;
}

type Statut = "actif" | "inactif" | "en_attente";
```

### Fonction Générique
```typescript
function obtenirPropriete<T, K extends keyof T>(objet: T, cle: K): T[K] {
  return objet[cle];
}
```

### Type Union avec Test
```typescript
function traiterValeur(valeur: string | number): string {
  if (typeof valeur === 'string') {
    return valeur.toUpperCase();
  } else {
    return valeur.toString();
  }
}
```

### Classe Générique
```typescript
class Repository<T extends { id: number }> {
  private donnees: Map<number, T> = new Map();
  
  sauvegarder(entite: T): void {
    this.donnees.set(entite.id, entite);
  }
}
```

## 🔧 Configuration TypeScript

Le projet utilise une configuration TypeScript stricte pour assurer la qualité du code :

- **Mode strict** activé
- **Target ES2020** pour les fonctionnalités modernes
- **Source maps** pour le debugging
- **Déclarations** générées automatiquement

## 📖 Apprentissage

Chaque fichier contient :
- **Explications détaillées** des concepts
- **Exemples pratiques** d'implémentation
- **Cas d'usage réels** et patterns courants
- **Commentaires explicatifs** pour comprendre les mécanismes

## 🎓 Pour Aller Plus Loin

Ce projet couvre les concepts fondamentaux de TypeScript. Pour approfondir :

1. **Modules et Namespaces**
2. **Decorators et Metadata**
3. **Types avancés** (Conditional Types, Mapped Types)
4. **Intégration avec des frameworks** (React, Angular, etc.)
5. **Testing** avec Jest et types

## 🤝 Contribution

N'hésitez pas à :
- Ajouter des exemples supplémentaires
- Améliorer la documentation
- Signaler des erreurs ou suggestions
- Proposer de nouveaux concepts à couvrir

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation pour l'apprentissage et l'enseignement.
