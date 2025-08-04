"use strict";
// ===== NULLISH COALESCING OPERATOR (??) =====
// Guide complet de l'opérateur de coalescence nulle en TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
console.log('=== OPÉRATEUR NULLISH COALESCING (??) ===');
console.log('\n=== UTILISATION BASIQUE ===');
// 1. Utilisation basique avec null et undefined
let value1 = null;
let value2 = undefined;
let value3 = "valeur définie";
console.log('Valeurs de test:');
console.log('value1 (null):', value1);
console.log('value2 (undefined):', value2);
console.log('value3 (string):', value3);
// Utilisation de l'opérateur ??
const result1 = value1 !== null && value1 !== void 0 ? value1 : "valeur par défaut";
const result2 = value2 !== null && value2 !== void 0 ? value2 : "valeur par défaut";
const result3 = value3 !== null && value3 !== void 0 ? value3 : "valeur par défaut";
console.log('\nRésultats avec ?? :');
console.log('value1 ?? "défaut":', result1);
console.log('value2 ?? "défaut":', result2);
console.log('value3 ?? "défaut":', result3);
console.log('\n=== DIFFÉRENCE AVEC L\'OPÉRATEUR || ===');
// 2. Comparaison avec l'opérateur OR logique (||)
const testValues = [null, undefined, "", 0, false, "valeur", 42, true];
console.log('Comparaison ?? vs || pour différentes valeurs:');
testValues.forEach(val => {
    const withNullish = val !== null && val !== void 0 ? val : "défaut";
    const withLogicalOr = val || "défaut";
    console.log(`${String(val).padEnd(10)} | ?? => ${withNullish.toString().padEnd(10)} | || => ${withLogicalOr}`);
});
console.log('\n=== CONFIGURATION D\'APPLICATION ===');
function createConfig(userConfig = {}) {
    var _a, _b, _c, _d, _e, _f;
    return {
        host: (_a = userConfig.host) !== null && _a !== void 0 ? _a : "localhost",
        port: (_b = userConfig.port) !== null && _b !== void 0 ? _b : 3000,
        ssl: (_c = userConfig.ssl) !== null && _c !== void 0 ? _c : false,
        timeout: (_d = userConfig.timeout) !== null && _d !== void 0 ? _d : 5000,
        retries: (_e = userConfig.retries) !== null && _e !== void 0 ? _e : 3,
        debug: (_f = userConfig.debug) !== null && _f !== void 0 ? _f : false
    };
}
console.log('Configuration par défaut:');
console.log(createConfig());
console.log('\nConfiguration personnalisée:');
console.log(createConfig({
    host: "api.example.com",
    port: 8080,
    ssl: true
}));
console.log('\nConfiguration avec valeurs explicitement false/0:');
console.log(createConfig({
    port: 0, // Port 0 est valide
    debug: false, // Debug explicitement désactivé
    retries: 0 // Aucune retry
}));
console.log('\n=== CHAINING AVEC NULLISH COALESCING ===');
function getUserDisplayName(user) {
    var _a, _b, _c, _d, _e;
    return (_e = (_c = (_a = user.name) !== null && _a !== void 0 ? _a : (_b = user.profile) === null || _b === void 0 ? void 0 : _b.displayName) !== null && _c !== void 0 ? _c : (_d = user.profile) === null || _d === void 0 ? void 0 : _d.nickname) !== null && _e !== void 0 ? _e : "Utilisateur anonyme";
}
function getUserTheme(user) {
    var _a, _b;
    return (_b = (_a = user.settings) === null || _a === void 0 ? void 0 : _a.theme) !== null && _b !== void 0 ? _b : "light";
}
const users = [
    { name: "Alice" },
    { profile: { displayName: "Bob le Développeur" } },
    { profile: { nickname: "Charlie" } },
    { settings: { theme: "dark" } },
    {} // Utilisateur vide
];
console.log('Noms d\'affichage des utilisateurs:');
users.forEach((user, index) => {
    const displayName = getUserDisplayName(user);
    const theme = getUserTheme(user);
    console.log(`Utilisateur ${index + 1}: ${displayName} (thème: ${theme})`);
});
console.log('\n=== NULLISH COALESCING ASSIGNMENT (??=) ===');
class CacheManager {
    constructor() {
        this.cache = {};
    }
    get(key) {
        var _a;
        var _b;
        // Initialiser avec une valeur par défaut si n'existe pas
        (_a = (_b = this.cache)[key]) !== null && _a !== void 0 ? _a : (_b[key] = this.getDefaultValue(key));
        return this.cache[key];
    }
    getDefaultValue(key) {
        console.log(`🔧 Génération de la valeur par défaut pour: ${key}`);
        switch (key) {
            case "userPreferences":
                return { theme: "light", language: "fr" };
            case "notifications":
                return [];
            case "counter":
                return 0;
            default:
                return null;
        }
    }
    set(key, value) {
        this.cache[key] = value;
    }
    has(key) {
        return this.cache[key] !== null && this.cache[key] !== undefined;
    }
}
const cacheManager = new CacheManager();
console.log('Premier accès aux clés (génération des valeurs par défaut):');
console.log('userPreferences:', cacheManager.get("userPreferences"));
console.log('notifications:', cacheManager.get("notifications"));
console.log('counter:', cacheManager.get("counter"));
console.log('\nDeuxième accès (utilisation du cache):');
console.log('userPreferences:', cacheManager.get("userPreferences"));
console.log('notifications:', cacheManager.get("notifications"));
console.log('\n=== VALIDATION DE DONNÉES ===');
function validateFormData(data) {
    var _a, _b, _c, _d;
    return {
        username: (_a = data.username) !== null && _a !== void 0 ? _a : (() => { throw new Error("Nom d'utilisateur requis"); })(),
        email: (_b = data.email) !== null && _b !== void 0 ? _b : (() => { throw new Error("Email requis"); })(),
        age: (_c = data.age) !== null && _c !== void 0 ? _c : 18, // Âge par défaut
        newsletter: (_d = data.newsletter) !== null && _d !== void 0 ? _d : false // Newsletter opt-out par défaut
    };
}
const validFormData = {
    username: "alice",
    email: "alice@example.com",
    age: 25
};
const incompleteFormData = {
    username: "bob"
    // email manquant
};
console.log('Validation de données complètes:');
try {
    const validated = validateFormData(validFormData);
    console.log('✅ Données validées:', validated);
}
catch (error) {
    console.log('❌ Erreur:', error.message);
}
console.log('\nValidation de données incomplètes:');
try {
    const validated = validateFormData(incompleteFormData);
    console.log('✅ Données validées:', validated);
}
catch (error) {
    console.log('❌ Erreur:', error.message);
}
console.log('\n=== API RESPONSES ===');
function processApiResponse(response, defaultValue) {
    var _a, _b;
    if (response.error) {
        console.log(`❌ Erreur API: ${response.error}`);
    }
    const status = (_a = response.status) !== null && _a !== void 0 ? _a : 200;
    console.log(`📡 Status: ${status}`);
    return (_b = response.data) !== null && _b !== void 0 ? _b : defaultValue;
}
// Simulation de réponses API
const successResponse = {
    data: ["item1", "item2", "item3"],
    status: 200
};
const errorResponse = {
    error: "Données non trouvées",
    status: 404
};
const emptyResponse = {};
console.log('Réponse de succès:');
console.log(processApiResponse(successResponse, []));
console.log('\nRéponse d\'erreur:');
console.log(processApiResponse(errorResponse, ["valeur par défaut"]));
console.log('\nRéponse vide:');
console.log(processApiResponse(emptyResponse, ["fallback"]));
console.log('\n=== FONCTIONS AVEC PARAMÈTRES OPTIONNELS ===');
function log(message, options) {
    var _a, _b, _c;
    const level = (_a = options === null || options === void 0 ? void 0 : options.level) !== null && _a !== void 0 ? _a : "info";
    const showTimestamp = (_b = options === null || options === void 0 ? void 0 : options.timestamp) !== null && _b !== void 0 ? _b : true;
    const prefix = (_c = options === null || options === void 0 ? void 0 : options.prefix) !== null && _c !== void 0 ? _c : "[APP]";
    const timestamp = showTimestamp ? new Date().toISOString() : "";
    const levelTag = `[${level.toUpperCase()}]`;
    console.log(`${timestamp} ${prefix} ${levelTag} ${message}`);
}
console.log('Exemples de logging:');
log("Message avec options par défaut");
log("Message d'erreur", { level: "error" });
log("Message sans timestamp", { timestamp: false });
log("Message avec préfixe personnalisé", { prefix: "[CUSTOM]", level: "warn" });
console.log('\n=== PERFORMANCE ET LAZY EVALUATION ===');
// 9. Évaluation paresseuse avec fonctions
function expensiveCalculation() {
    console.log("🔄 Calcul coûteux en cours...");
    // Simulation d'un calcul long
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
}
function getValue(useCache, cachedValue) {
    // Le calcul coûteux n'est exécuté que si nécessaire
    return cachedValue !== null && cachedValue !== void 0 ? cachedValue : (useCache ? 0 : expensiveCalculation());
}
console.log('Utilisation du cache:');
console.log('Résultat avec cache:', getValue(true, 42));
console.log('\nSans cache (calcul coûteux):');
console.log('Résultat sans cache:', getValue(false));
console.log('\n=== BONNES PRATIQUES ===');
const bestPractices = [
    "✅ Utilisez ?? pour les valeurs null/undefined uniquement",
    "✅ Préférez ?? à || pour éviter les faux positifs (0, '', false)",
    "✅ Combinez avec optional chaining (?.) pour un code plus sûr",
    "✅ Utilisez ??= pour l'assignation conditionnelle",
    "✅ Documentez quand vous utilisez des valeurs par défaut",
    "✅ Attention aux fonctions dans les expressions ?? (évaluation paresseuse)",
    "✅ Testez avec toutes les valeurs falsy possibles",
    "✅ Utilisez TypeScript pour typer correctement les valeurs nullables"
];
bestPractices.forEach(practice => console.log(practice));
