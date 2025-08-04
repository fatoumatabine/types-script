"use strict";
// ===== LES DÉCORATEURS EN TYPESCRIPT =====
// Guide complet des décorateurs (decorators) en TypeScript
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
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
let Button = (() => {
    let _classDecorators = [Component];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Button = _classThis = class {
        constructor(label) {
            this.label = label;
        }
        click() {
            console.log(`Bouton "${this.label}" cliqué!`);
        }
    };
    __setFunctionName(_classThis, "Button");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Button = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Button = _classThis;
})();
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
let User = (() => {
    let _classDecorators = [Entity("users")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var User = _classThis = class {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
    };
    __setFunctionName(_classThis, "User");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
})();
let Product = (() => {
    let _classDecorators = [Entity("products")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Product = _classThis = class {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }
    };
    __setFunctionName(_classThis, "Product");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
})();
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
let Calculator = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _add_decorators;
    let _multiply_decorators;
    return _a = class Calculator {
            add(a, b) {
                return a + b;
            }
            multiply(a, b) {
                return a * b;
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _add_decorators = [Log];
            _multiply_decorators = [Log];
            __esDecorate(_a, null, _add_decorators, { kind: "method", name: "add", static: false, private: false, access: { has: obj => "add" in obj, get: obj => obj.add }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _multiply_decorators, { kind: "method", name: "multiply", static: false, private: false, access: { has: obj => "multiply" in obj, get: obj => obj.multiply }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
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
let UserAccount = (() => {
    var _a;
    let _username_decorators;
    let _username_initializers = [];
    let _username_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    return _a = class UserAccount {
            constructor(username, password) {
                this.username = __runInitializers(this, _username_initializers, void 0);
                this.password = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                __runInitializers(this, _password_extraInitializers);
                this.username = username;
                this.password = password;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _username_decorators = [MinLength(3)];
            _password_decorators = [MinLength(8)];
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: obj => "username" in obj, get: obj => obj.username, set: (obj, value) => { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
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
let OrderService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _createOrder_decorators;
    return _a = class OrderService {
            createOrder(customerId, amount, description) {
                console.log(`📦 Commande créée - Client: ${customerId}, Montant: ${amount}€`);
                if (description) {
                    console.log(`   Description: ${description}`);
                }
                return { id: Math.random().toString(36), customerId, amount, description };
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createOrder_decorators = [Validate];
            __esDecorate(_a, null, _createOrder_decorators, { kind: "method", name: "createOrder", static: false, private: false, access: { has: obj => "createOrder" in obj, get: obj => obj.createOrder }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
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
let DataProcessor = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _processLargeArray_decorators;
    let _fibonacci_decorators;
    return _a = class DataProcessor {
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
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _processLargeArray_decorators = [Measure];
            _fibonacci_decorators = [Measure];
            __esDecorate(_a, null, _processLargeArray_decorators, { kind: "method", name: "processLargeArray", static: false, private: false, access: { has: obj => "processLargeArray" in obj, get: obj => obj.processLargeArray }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _fibonacci_decorators, { kind: "method", name: "fibonacci", static: false, private: false, access: { has: obj => "fibonacci" in obj, get: obj => obj.fibonacci }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
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
let MathService = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _expensiveCalculation_decorators;
    return _a = class MathService {
            expensiveCalculation(n) {
                // Simulation d'un calcul coûteux
                let result = 0;
                for (let i = 0; i < n * 1000000; i++) {
                    result += Math.sqrt(i);
                }
                return result;
            }
            constructor() {
                __runInitializers(this, _instanceExtraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _expensiveCalculation_decorators = [Log, Measure, Cache];
            __esDecorate(_a, null, _expensiveCalculation_decorators, { kind: "method", name: "expensiveCalculation", static: false, private: false, access: { has: obj => "expensiveCalculation" in obj, get: obj => obj.expensiveCalculation }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
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
