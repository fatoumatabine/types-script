# 🎓 Guide de Démarrage Rapide

Ce projet contient des exemples complets de tous les concepts TypeScript essentiels.

## 🚀 Exécution Rapide

```bash
# Installation
npm install

# Exécution directe
npm run dev

# Compilation puis exécution
npm run build
npm start
```

## 📖 Concepts Couverts

| Dossier | Concept | Description |
|---------|---------|-------------|
| `01-constructeur-methodes/` | **Constructeurs & Méthodes** | Classes de base, `this`, propriétés |
| `02-constructeur-prive/` | **Constructeur Privé** | Singleton, Factory Pattern |
| `03-modificateurs-acces/` | **Visibilité** | `private`, `public`, `protected`, `readonly` |
| `04-interface-classe/` | **Interfaces** | Contrats, implémentation, polymorphisme |
| `05-heritage/` | **Héritage** | `extends`, `super()`, classes abstraites |
| `06-generiques-types/` | **Génériques** | `<T>`, contraintes, types utilitaires |
| `07-decorators/` | **Décorateurs** | Métadonnées, annotations (expérimental) |
| `08-types-avances/` | **Types Avancés** | Unions, intersections, types conditionnels |
| `09-asynchrone/` | **Async/Await** | Promises, code asynchrone, générateurs |

## 🎯 Points Clés par Concept

### 1. **Constructeur & Méthodes**
```typescript
class Personne {
    constructor(private nom: string) {}
    sePresenter(): string {
        return `Je suis ${this.nom}`;
    }
}
```

### 2. **Constructeur Privé (Singleton)**
```typescript
class Config {
    private static instance: Config;
    private constructor() {}
    static getInstance(): Config {
        return Config.instance ??= new Config();
    }
}
```

### 3. **Modificateurs d'Accès**
```typescript
class Compte {
    public titulaire: string;      // Accessible partout
    private solde: number;         // Classe uniquement
    protected numero: string;      // Classe + sous-classes
    readonly banque: string;       // Lecture seule
}
```

### 4. **Interfaces**
```typescript
interface IVehicule {
    demarrer(): void;
    arreter(): void;
}

class Voiture implements IVehicule {
    demarrer() { console.log("Démarrage"); }
    arreter() { console.log("Arrêt"); }
}
```

### 5. **Héritage**
```typescript
abstract class Animal {
    constructor(protected nom: string) {}
    abstract faireDuBruit(): void;
}

class Chien extends Animal {
    faireDuBruit() { console.log("Wouf!"); }
}
```

### 6. **Génériques**
```typescript
class Conteneur<T> {
    private items: T[] = [];
    ajouter(item: T): void {
        this.items.push(item);
    }
}

const nombres = new Conteneur<number>();
const textes = new Conteneur<string>();
```

### 7. **Types Avancés**
```typescript
// Union
type Status = 'success' | 'error' | 'loading';

// Intersection
type User = Person & Employee;

// Conditionnel
type IsArray<T> = T extends any[] ? true : false;

// Utilitaires
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
```

### 8. **Asynchrone**
```typescript
async function fetchUser(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

// Parallèle
const users = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
]);
```

## 🔧 Commandes Utiles

```bash
# Mode développement avec rechargement
npm run watch

# Compilation seule
npm run build

# Nettoyage
rm -rf dist node_modules
npm install
```

## 💡 Bonnes Pratiques

1. **Types stricts** : Activez `strict: true` dans `tsconfig.json`
2. **Interfaces d'abord** : Définissez les contrats avant l'implémentation
3. **Modificateurs appropriés** : Utilisez `private`/`protected` pour l'encapsulation
4. **Génériques pour la réutilisabilité** : Types flexibles et type-safe
5. **Async/await** : Préférez aux callbacks et `.then()`

## 🎨 Structure Recommandée

```
src/
├── types/          # Définitions de types
├── interfaces/     # Interfaces communes
├── classes/        # Classes métier
├── services/       # Services et API
├── utils/          # Utilitaires
└── index.ts        # Point d'entrée
```

---

**🎯 Objectif** : Maîtriser TypeScript par l'exemple pratique !
