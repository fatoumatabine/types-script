// ===== LES DÉCORATEURS EN TYPESCRIPT =====
// Guide complet des décorateurs (decorators) en TypeScript

console.log('=== DÉCORATEURS EN TYPESCRIPT ===');

// Note: Les décorateurs sont une fonctionnalité expérimentale
// Il faut activer "experimentalDecorators": true dans tsconfig.json

console.log('\n=== DÉCORATEUR DE CLASSE ===');

// 1. Décorateur de classe simple
function Component(target: any) {
    console.log(`🎯 Décorateur de classe appliqué à: ${target.name}`);
    target.prototype.isComponent = true;
    target.prototype.getComponentInfo = function() {
        return `Composant: ${this.constructor.name}`;
    };
}

@Component
class Button {
    constructor(public label: string) {}
    
    click() {
        console.log(`Bouton "${this.label}" cliqué!`);
    }
}

const button = new Button("Valider");
button.click();
console.log((button as any).getComponentInfo());
console.log('Est un composant:', (button as any).isComponent);

console.log('\n=== DÉCORATEUR DE CLASSE AVEC PARAMÈTRES ===');

// 2. Décorateur de classe avec factory (paramètres)
function Entity(tableName: string) {
    return function(target: any) {
        console.log(`🏷️ Entité ${target.name} liée à la table: ${tableName}`);
        target.prototype.tableName = tableName;
        target.prototype.save = function() {
            console.log(`Sauvegarde dans la table: ${tableName}`);
        };
    };
}

@Entity("users")
class User {
    constructor(public name: string, public email: string) {}
}

@Entity("products") 
class Product {
    constructor(public name: string, public price: number) {}
}

const user = new User("Alice", "alice@example.com");
const product = new Product("Laptop", 999);

(user as any).save();
(product as any).save();

console.log('\n=== DÉCORATEUR DE MÉTHODE ===');

// 3. Décorateur de méthode
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`📝 Appel de ${propertyKey} avec arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`📝 Résultat de ${propertyKey}:`, result);
        return result;
    };
}

class Calculator {
    @Log
    add(a: number, b: number): number {
        return a + b;
    }
    
    @Log
    multiply(a: number, b: number): number {
        return a * b;
    }
}

const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);

console.log('\n=== DÉCORATEUR DE PROPRIÉTÉ ===');

// 4. Décorateur de propriété
function MinLength(length: number) {
    return function(target: any, propertyKey: string) {
        console.log(`🔍 Validation MinLength(${length}) appliquée à: ${propertyKey}`);
        
        let value: string;
        
        const getter = () => value;
        const setter = (newValue: string) => {
            if (newValue.length < length) {
                throw new Error(`${propertyKey} doit contenir au moins ${length} caractères`);
            }
            value = newValue;
        };
        
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}

class UserAccount {
    @MinLength(3)
    username!: string;
    
    @MinLength(8)
    password!: string;
    
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

try {
    const account1 = new UserAccount("alice", "motdepasse123");
    console.log(`✅ Compte créé pour: ${account1.username}`);
    
    const account2 = new UserAccount("ab", "123"); // Erreur attendue
} catch (error) {
    console.log(`❌ Erreur de validation: ${(error as Error).message}`);
}

console.log('\n=== DÉCORATEUR DE PARAMÈTRE (VERSION SIMPLIFIÉE) ===');

// 5. Décorateur de paramètre simplifié (sans reflect-metadata)
// Stockage simple des métadonnées
const requiredParamsStorage = new Map<string, number[]>();

function Required(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`🔒 Paramètre ${parameterIndex} de ${propertyKey} marqué comme requis`);
    
    const key = `${target.constructor.name}.${propertyKey}`;
    const existingParams = requiredParamsStorage.get(key) || [];
    existingParams.push(parameterIndex);
    requiredParamsStorage.set(key, existingParams);
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        const key = `${target.constructor.name}.${propertyKey}`;
        const requiredParams = requiredParamsStorage.get(key) || [];
        
        for (const paramIndex of requiredParams) {
            if (args[paramIndex] === undefined || args[paramIndex] === null) {
                throw new Error(`Le paramètre ${paramIndex} de ${propertyKey} est requis`);
            }
        }
        
        return originalMethod.apply(this, args);
    };
}

class OrderService {
    @Validate
    createOrder(@Required customerId: string, @Required amount: number, description?: string) {
        console.log(`📦 Commande créée - Client: ${customerId}, Montant: ${amount}€`);
        if (description) {
            console.log(`   Description: ${description}`);
        }
        return { id: Math.random().toString(36), customerId, amount, description };
    }
}

const orderService = new OrderService();

try {
    orderService.createOrder("customer123", 99.99, "Achat en ligne");
    orderService.createOrder("customer456", 149.99); // Sans description (optionnel)
    // orderService.createOrder(null as any, 199.99); // Erreur attendue
} catch (error) {
    console.log(`❌ Erreur de validation: ${(error as Error).message}`);
}

console.log('\n=== DÉCORATEUR DE PERFORMANCE ===');

// 6. Décorateur pour mesurer les performances
function Measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        
        console.log(`⏱️ ${propertyKey} exécuté en ${(end - start).toFixed(2)}ms`);
        
        return result;
    };
}

class DataProcessor {
    @Measure
    processLargeArray(size: number): number[] {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.random() * 100);
        }
        return array.sort((a, b) => a - b);
    }
    
    @Measure
    fibonacci(n: number): number {
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
}

const processor = new DataProcessor();
processor.processLargeArray(10000);
processor.fibonacci(30);

console.log('\n=== COMBINAISON DE DÉCORATEURS ===');

// 7. Utilisation de plusieurs décorateurs
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const cache = new Map();
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(`💾 Cache hit pour ${propertyKey}`);
            return cache.get(key);
        }
        
        console.log(`🔄 Cache miss pour ${propertyKey}`);
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        
        return result;
    };
}

class MathService {
    @Log
    @Measure
    @Cache
    expensiveCalculation(n: number): number {
        // Simulation d'un calcul coûteux
        let result = 0;
        for (let i = 0; i < n * 1000000; i++) {
            result += Math.sqrt(i);
        }
        return result;
    }
}

const mathService = new MathService();
console.log('Premier appel:');
mathService.expensiveCalculation(10);
console.log('\nDeuxième appel (même paramètre):');
mathService.expensiveCalculation(10);

console.log('\n=== BONNES PRATIQUES ===');

const bestPractices = [
    "✅ Activez 'experimentalDecorators' et 'emitDecoratorMetadata' dans tsconfig.json",
    "✅ Utilisez des décorateurs pour des préoccupations transversales (logging, validation, etc.)",
    "✅ Documentez clairement l'effet de vos décorateurs",
    "✅ Préférez les factory functions pour des décorateurs paramétrables",
    "✅ Testez vos décorateurs avec différents scénarios",
    "✅ Attention à l'ordre d'application des décorateurs multiples",
    "✅ Utilisez reflect-metadata pour des métadonnées avancées",
    "✅ Considérez les alternatives sans décorateurs pour une meilleure compatibilité"
];

bestPractices.forEach(practice => console.log(practice));

// Note: Pour un usage avancé avec reflect-metadata :
// npm install reflect-metadata
// puis: import "reflect-metadata"; au début du fichier
console.log('\n📝 Note: Cette version utilise un stockage simplifié pour les métadonnées');
console.log('   Pour un usage avancé, installez reflect-metadata');

// Export pour éviter les erreurs de module
export {};
