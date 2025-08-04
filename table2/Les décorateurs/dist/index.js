"use strict";
// ===== LES DÉCORATEURS EN TYPESCRIPT =====
// Guide complet des décorateurs (decorators) en TypeScript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('=== DÉCORATEURS EN TYPESCRIPT ===');
// Note: Les décorateurs sont une fonctionnalité expérimentale
// Il faut activer "experimentalDecorators": true dans tsconfig.json
console.log('\n=== DÉCORATEUR DE CLASSE ===');
// 1. Décorateur de classe simple
function Component(target) {
    console.log(`🎯 Décorateur de classe appliqué à: ${target.name}`);
    target.prototype.isComponent = true;
    target.prototype.getComponentInfo = function () {
        return `Composant: ${this.constructor.name}`;
    };
}
let Button = class Button {
    constructor(label) {
        this.label = label;
    }
    click() {
        console.log(`Bouton "${this.label}" cliqué!`);
    }
};
Button = __decorate([
    Component,
    __metadata("design:paramtypes", [String])
], Button);
const button = new Button("Valider");
button.click();
console.log(button.getComponentInfo());
console.log('Est un composant:', button.isComponent);
console.log('\n=== DÉCORATEUR DE CLASSE AVEC PARAMÈTRES ===');
// 2. Décorateur de classe avec factory (paramètres)
function Entity(tableName) {
    return function (target) {
        console.log(`🏷️ Entité ${target.name} liée à la table: ${tableName}`);
        target.prototype.tableName = tableName;
        target.prototype.save = function () {
            console.log(`Sauvegarde dans la table: ${tableName}`);
        };
    };
}
let User = class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
};
User = __decorate([
    Entity("users"),
    __metadata("design:paramtypes", [String, String])
], User);
let Product = class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
};
Product = __decorate([
    Entity("products"),
    __metadata("design:paramtypes", [String, Number])
], Product);
const user = new User("Alice", "alice@example.com");
const product = new Product("Laptop", 999);
user.save();
product.save();
console.log('\n=== DÉCORATEUR DE MÉTHODE ===');
// 3. Décorateur de méthode
function Log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`📝 Appel de ${propertyKey} avec arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`📝 Résultat de ${propertyKey}:`, result);
        return result;
    };
}
class Calculator {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }
}
__decorate([
    Log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "add", null);
__decorate([
    Log,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "multiply", null);
const calc = new Calculator();
calc.add(5, 3);
calc.multiply(4, 7);
console.log('\n=== DÉCORATEUR DE PROPRIÉTÉ ===');
// 4. Décorateur de propriété
function MinLength(length) {
    return function (target, propertyKey) {
        console.log(`🔍 Validation MinLength(${length}) appliquée à: ${propertyKey}`);
        let value;
        const getter = () => value;
        const setter = (newValue) => {
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
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
__decorate([
    MinLength(3),
    __metadata("design:type", String)
], UserAccount.prototype, "username", void 0);
__decorate([
    MinLength(8),
    __metadata("design:type", String)
], UserAccount.prototype, "password", void 0);
try {
    const account1 = new UserAccount("alice", "motdepasse123");
    console.log(`✅ Compte créé pour: ${account1.username}`);
    const account2 = new UserAccount("ab", "123"); // Erreur attendue
}
catch (error) {
    console.log(`❌ Erreur de validation: ${error.message}`);
}
console.log('\n=== DÉCORATEUR DE PARAMÈTRE (VERSION SIMPLIFIÉE) ===');
// 5. Décorateur de paramètre simplifié (sans reflect-metadata)
// Stockage simple des métadonnées
const requiredParamsStorage = new Map();
function Required(target, propertyKey, parameterIndex) {
    console.log(`🔒 Paramètre ${parameterIndex} de ${propertyKey} marqué comme requis`);
    const key = `${target.constructor.name}.${propertyKey}`;
    const existingParams = requiredParamsStorage.get(key) || [];
    existingParams.push(parameterIndex);
    requiredParamsStorage.set(key, existingParams);
}
function Validate(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
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
    createOrder(customerId, amount, description) {
        console.log(`📦 Commande créée - Client: ${customerId}, Montant: ${amount}€`);
        if (description) {
            console.log(`   Description: ${description}`);
        }
        return { id: Math.random().toString(36), customerId, amount, description };
    }
}
__decorate([
    Validate,
    __param(0, Required),
    __param(1, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", void 0)
], OrderService.prototype, "createOrder", null);
const orderService = new OrderService();
try {
    orderService.createOrder("customer123", 99.99, "Achat en ligne");
    orderService.createOrder("customer456", 149.99); // Sans description (optionnel)
    // orderService.createOrder(null as any, 199.99); // Erreur attendue
}
catch (error) {
    console.log(`❌ Erreur de validation: ${error.message}`);
}
console.log('\n=== DÉCORATEUR DE PERFORMANCE ===');
// 6. Décorateur pour mesurer les performances
function Measure(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`⏱️ ${propertyKey} exécuté en ${(end - start).toFixed(2)}ms`);
        return result;
    };
}
class DataProcessor {
    processLargeArray(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.random() * 100);
        }
        return array.sort((a, b) => a - b);
    }
    fibonacci(n) {
        if (n <= 1)
            return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
}
__decorate([
    Measure,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Array)
], DataProcessor.prototype, "processLargeArray", null);
__decorate([
    Measure,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], DataProcessor.prototype, "fibonacci", null);
const processor = new DataProcessor();
processor.processLargeArray(10000);
processor.fibonacci(30);
console.log('\n=== COMBINAISON DE DÉCORATEURS ===');
// 7. Utilisation de plusieurs décorateurs
function Cache(target, propertyKey, descriptor) {
    const cache = new Map();
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
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
    expensiveCalculation(n) {
        // Simulation d'un calcul coûteux
        let result = 0;
        for (let i = 0; i < n * 1000000; i++) {
            result += Math.sqrt(i);
        }
        return result;
    }
}
__decorate([
    Log,
    Measure,
    Cache,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], MathService.prototype, "expensiveCalculation", null);
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
