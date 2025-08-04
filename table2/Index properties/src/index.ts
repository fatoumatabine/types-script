// ===== INDEX PROPERTIES (SIGNATURES D'INDEX) =====
// Guide complet des signatures d'index en TypeScript

console.log('=== SIGNATURES D\'INDEX EN TYPESCRIPT ===');

// 1. Signature d'index basique avec string
interface StringDictionary {
    [key: string]: string;
}

const colors: StringDictionary = {
    red: "rouge",
    blue: "bleu",
    green: "vert"
};

console.log('Dictionnaire de couleurs:');
console.log(colors["red"]); // rouge
console.log(colors.blue); // bleu
colors["yellow"] = "jaune"; // Ajout dynamique
console.log(colors);

console.log('\n=== SIGNATURE D\'INDEX AVEC TYPES MULTIPLES ===');

// 2. Signature d'index avec union de types
interface MixedDictionary {
    [key: string]: string | number | boolean;
}

const config: MixedDictionary = {
    appName: "MonApp",
    version: 1.2,
    isProduction: true,
    author: "Développeur"
};

console.log('Configuration mixte:');
Object.entries(config).forEach(([key, value]) => {
    console.log(`${key}: ${value} (${typeof value})`);
});

console.log('\n=== SIGNATURE D\'INDEX NUMÉRIQUE ===');

// 3. Signature d'index avec des clés numériques
interface NumberIndexed {
    [index: number]: string;
}

const fruits: NumberIndexed = {
    0: "pomme",
    1: "banane",
    2: "orange"
};

// Peut aussi être utilisé comme un tableau
console.log('Fruits indexés:');
for (let i = 0; i < 3; i++) {
    console.log(`Fruit ${i}: ${fruits[i]}`);
}

console.log('\n=== COMBINAISON DE SIGNATURES ===');

// 4. Interface avec propriétés nommées ET signature d'index
interface UserProfile {
    name: string;          // Propriété obligatoire
    age: number;           // Propriété obligatoire
    [key: string]: any;    // Propriétés dynamiques
}

const user: UserProfile = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",  // Propriété dynamique
    city: "Paris",               // Propriété dynamique
    hobbies: ["lecture", "sport"] // Propriété dynamique
};

console.log('Profil utilisateur:');
console.log(`Nom: ${user.name}, Âge: ${user.age}`);
console.log('Propriétés dynamiques:');
Object.entries(user)
    .filter(([key]) => !['name', 'age'].includes(key))
    .forEach(([key, value]) => {
        console.log(`  ${key}: ${Array.isArray(value) ? value.join(', ') : value}`);
    });

console.log('\n=== SIGNATURE D\'INDEX AVEC GÉNÉRIQUES ===');

// 5. Signature d'index avec types génériques
interface Repository<T> {
    [id: string]: T;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

const productRepo: Repository<Product> = {
    "prod1": { id: "prod1", name: "Laptop", price: 999 },
    "prod2": { id: "prod2", name: "Mouse", price: 29 },
    "prod3": { id: "prod3", name: "Keyboard", price: 79 }
};

console.log('Repository de produits:');
Object.values(productRepo).forEach(product => {
    console.log(`${product.name}: ${product.price}€`);
});

console.log('\n=== SIGNATURE D\'INDEX READONLY ===');

// 6. Signature d'index en lecture seule
interface ReadonlyConfig {
    readonly [key: string]: string;
}

const appConfig: ReadonlyConfig = {
    database: "postgresql://localhost:5432",
    apiUrl: "https://api.example.com",
    version: "1.0.0"
};

console.log('Configuration en lecture seule:');
console.log(appConfig.database);
// appConfig.database = "nouvelle valeur"; // ❌ Erreur: Cannot assign to 'database'

console.log('\n=== RECORD UTILITY TYPE ===');

// 7. Utilisation du type utilitaire Record
type UserRole = 'admin' | 'user' | 'guest';
type Permission = 'read' | 'write' | 'delete';

const rolePermissions: Record<UserRole, Permission[]> = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};

console.log('Permissions par rôle:');
Object.entries(rolePermissions).forEach(([role, permissions]) => {
    console.log(`${role}: ${permissions.join(', ')}`);
});

console.log('\n=== SIGNATURE D\'INDEX AVEC CONTRAINTES ===');

// 8. Signature d'index avec contraintes sur les clés
interface ApiEndpoints {
    [endpoint: `/${string}`]: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        description: string;
    };
}

const apiRoutes: ApiEndpoints = {
    "/users": { method: "GET", description: "Récupérer tous les utilisateurs" },
    "/users/create": { method: "POST", description: "Créer un utilisateur" },
    "/products": { method: "GET", description: "Récupérer tous les produits" },
    "/products/update": { method: "PUT", description: "Mettre à jour un produit" }
};

console.log('Routes API:');
Object.entries(apiRoutes).forEach(([endpoint, config]) => {
    console.log(`${config.method} ${endpoint}: ${config.description}`);
});

console.log('\n=== SIGNATURE D\'INDEX CONDITIONNELLE ===');

// 9. Signature d'index avec types conditionnels
type FlexibleObject<T> = {
    [K in keyof T]: T[K] extends string ? string : T[K] extends number ? number : any;
};

interface OriginalData {
    id: number;
    name: string;
    active: boolean;
}

const flexibleData: FlexibleObject<OriginalData> = {
    id: 123,
    name: "Test",
    active: true // any type accepté pour boolean
};

console.log('Objet flexible:', flexibleData);

console.log('\n=== VALIDATION D\'INDEX ===');

// 10. Classe avec validation des propriétés dynamiques
class ValidatedDictionary {
    private data: { [key: string]: any } = {};

    set(key: string, value: any): void {
        if (typeof key !== 'string' || key.length === 0) {
            throw new Error('La clé doit être une chaîne non vide');
        }
        this.data[key] = value;
        console.log(`✅ Ajouté: ${key} = ${value}`);
    }

    get(key: string): any {
        return this.data[key];
    }

    has(key: string): boolean {
        return key in this.data;
    }

    keys(): string[] {
        return Object.keys(this.data);
    }

    values(): any[] {
        return Object.values(this.data);
    }
}

const validatedDict = new ValidatedDictionary();
validatedDict.set("username", "alice");
validatedDict.set("score", 95);
validatedDict.set("isActive", true);

console.log('Dictionnaire validé:');
console.log('Clés:', validatedDict.keys());
console.log('Valeurs:', validatedDict.values());
console.log('username existe:', validatedDict.has("username"));

console.log('\n=== BONNES PRATIQUES ===');

const bestPractices = [
    "✅ Utilisez Record<K, V> quand les clés sont connues",
    "✅ Préférez les interfaces nommées aux signatures d'index génériques",
    "✅ Combinez propriétés nommées et signatures d'index prudemment",
    "✅ Utilisez readonly pour des configurations immutables",
    "✅ Validez les données avant l'assignation dynamique",
    "✅ Documentez le format attendu des clés dynamiques",
    "✅ Considérez Map<K, V> pour des besoins plus avancés",
    "✅ Utilisez des types d'union pour limiter les valeurs possibles"
];

bestPractices.forEach(practice => console.log(practice));

// Export pour éviter les erreurs de module
export {};
