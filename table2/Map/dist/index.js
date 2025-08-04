"use strict";
// ===== LA CLASSE MAP EN TYPESCRIPT =====
// Guide complet de la classe Map et ses utilisations
Object.defineProperty(exports, "__esModule", { value: true });
console.log('=== LA CLASSE MAP EN TYPESCRIPT ===');
// 1. Création et utilisation basique de Map
console.log('\n=== CRÉATION ET UTILISATION BASIQUE ===');
const userPreferences = new Map();
// Ajouter des éléments
userPreferences.set("theme", "dark");
userPreferences.set("language", "fr");
userPreferences.set("notifications", "enabled");
console.log('Préférences utilisateur:');
console.log(`Thème: ${userPreferences.get("theme")}`);
console.log(`Langue: ${userPreferences.get("language")}`);
console.log(`Notifications: ${userPreferences.get("notifications")}`);
// Vérifier l'existence d'une clé
console.log(`Thème configuré: ${userPreferences.has("theme")}`);
console.log(`Son configuré: ${userPreferences.has("sound")}`);
console.log('\n=== MAP AVEC DIFFÉRENTS TYPES ===');
const userDatabase = new Map();
// Ajouter des utilisateurs
userDatabase.set(1, { id: 1, name: "Alice", email: "alice@example.com" });
userDatabase.set(2, { id: 2, name: "Bob", email: "bob@example.com" });
userDatabase.set(3, { id: 3, name: "Charlie", email: "charlie@example.com" });
console.log('Base de données utilisateurs:');
userDatabase.forEach((user, id) => {
    console.log(`ID ${id}: ${user.name} (${user.email})`);
});
console.log('\n=== INITIALISATION AVEC DES DONNÉES ===');
// 3. Initialisation avec un tableau de tuples
const statusCodes = new Map([
    [200, "OK"],
    [201, "Created"],
    [400, "Bad Request"],
    [401, "Unauthorized"],
    [404, "Not Found"],
    [500, "Internal Server Error"]
]);
console.log('Codes de statut HTTP:');
for (const [code, message] of statusCodes) {
    console.log(`${code}: ${message}`);
}
console.log('\n=== OPÉRATIONS SUR LES MAPS ===');
// 4. Opérations diverses
const inventory = new Map();
// Ajouter des produits
inventory.set("laptop", 10);
inventory.set("mouse", 25);
inventory.set("keyboard", 15);
inventory.set("monitor", 8);
console.log(`Taille de l'inventaire: ${inventory.size}`);
// Mettre à jour une quantité
const currentLaptops = inventory.get("laptop") || 0;
inventory.set("laptop", currentLaptops + 5);
console.log('Inventaire après mise à jour:');
inventory.forEach((quantity, product) => {
    console.log(`${product}: ${quantity} unités`);
});
// Supprimer un produit
inventory.delete("mouse");
console.log(`Souris supprimée. Nouvelle taille: ${inventory.size}`);
console.log('\n=== MAP VS OBJECT ===');
// 5. Comparaison Map vs Object
console.log('Avantages de Map par rapport à Object:');
// Clés de n'importe quel type
const mixedKeyMap = new Map();
mixedKeyMap.set(1, "nombre");
mixedKeyMap.set("1", "chaîne");
mixedKeyMap.set(true, "booléen");
mixedKeyMap.set({}, "objet");
console.log('Map avec clés mixtes:');
for (const [key, value] of mixedKeyMap) {
    console.log(`Clé (${typeof key}): ${String(key)} => ${value}`);
}
// Taille directement accessible
console.log(`Taille de Map: ${mixedKeyMap.size}`);
// Pas de clés par défaut (comme prototype)
const obj = {};
const map = new Map();
console.log(`Clés dans Object vide: ${Object.keys(obj).length}`);
console.log(`Clés dans Map vide: ${map.size}`);
console.log('\n=== ITÉRATION SUR LES MAPS ===');
// 6. Différentes méthodes d'itération
const colors = new Map([
    ["red", "#FF0000"],
    ["green", "#00FF00"],
    ["blue", "#0000FF"]
]);
console.log('Itération avec for...of sur entries:');
for (const [name, hex] of colors.entries()) {
    console.log(`${name}: ${hex}`);
}
console.log('\nItération sur les clés:');
for (const colorName of colors.keys()) {
    console.log(`Couleur: ${colorName}`);
}
console.log('\nItération sur les valeurs:');
for (const hexValue of colors.values()) {
    console.log(`Code hex: ${hexValue}`);
}
console.log('\nUtilisation de forEach:');
colors.forEach((hex, name) => {
    console.log(`${name} = ${hex}`);
});
console.log('\n=== MAP COMME CACHE ===');
// 7. Utilisation de Map comme cache
class CacheService {
    constructor() {
        this.cache = new Map();
        this.ttl = 5000; // 5 secondes
    }
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
        console.log(`💾 Données mises en cache pour: ${key}`);
    }
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) {
            console.log(`❌ Cache miss pour: ${key}`);
            return null;
        }
        // Vérifier l'expiration
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            console.log(`⏰ Cache expiré pour: ${key}`);
            return null;
        }
        console.log(`✅ Cache hit pour: ${key}`);
        return cached.data;
    }
    clear() {
        this.cache.clear();
        console.log('🧹 Cache vidé');
    }
    size() {
        return this.cache.size;
    }
    keys() {
        return Array.from(this.cache.keys());
    }
}
const cache = new CacheService();
cache.set("user:1", { name: "Alice", age: 30 });
cache.set("user:2", { name: "Bob", age: 25 });
console.log('Données en cache:', cache.get("user:1"));
console.log('Clés en cache:', cache.keys());
console.log('Taille du cache:', cache.size());
console.log('\n=== MAP AVEC OBJETS COMME CLÉS ===');
const productPrices = new Map();
const laptop = { id: 1, name: "Laptop" };
const mouse = { id: 2, name: "Mouse" };
const keyboard = { id: 3, name: "Keyboard" };
productPrices.set(laptop, 999);
productPrices.set(mouse, 29);
productPrices.set(keyboard, 79);
console.log('Prix des produits:');
productPrices.forEach((price, product) => {
    console.log(`${product.name}: ${price}€`);
});
console.log(`Prix du laptop: ${productPrices.get(laptop)}€`);
console.log('\n=== CONVERSION MAP ↔ ARRAY/OBJECT ===');
// 9. Conversions entre Map, Array et Object
const originalMap = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);
// Map to Array
const mapToArray = Array.from(originalMap);
console.log('Map vers Array:', mapToArray);
// Map to Object (clés string uniquement)
const mapToObject = Object.fromEntries(originalMap);
console.log('Map vers Object:', mapToObject);
// Array to Map
const arrayToMap = new Map([["x", 10], ["y", 20]]);
console.log('Array vers Map:', Array.from(arrayToMap));
// Object to Map
const objectToMap = new Map(Object.entries({ foo: "bar", baz: 42 }));
console.log('Object vers Map:', Array.from(objectToMap));
console.log('\n=== MÉTHODES UTILITAIRES AVANCÉES ===');
// 10. Méthodes utilitaires personnalisées
class AdvancedMap extends Map {
    // Filtrer les entrées
    filter(predicate) {
        const filtered = new AdvancedMap();
        for (const [key, value] of this) {
            if (predicate(value, key)) {
                filtered.set(key, value);
            }
        }
        return filtered;
    }
    // Mapper les valeurs
    mapValues(mapper) {
        const mapped = new AdvancedMap();
        for (const [key, value] of this) {
            mapped.set(key, mapper(value, key));
        }
        return mapped;
    }
    // Obtenir toutes les valeurs comme array
    valuesArray() {
        return Array.from(this.values());
    }
    // Obtenir toutes les clés comme array
    keysArray() {
        return Array.from(this.keys());
    }
}
const advancedMap = new AdvancedMap();
advancedMap.set("a", 1);
advancedMap.set("b", 2);
advancedMap.set("c", 3);
advancedMap.set("d", 4);
const filtered = advancedMap.filter(value => value > 2);
console.log('Valeurs > 2:', filtered.valuesArray());
const doubled = advancedMap.mapValues(value => value * 2);
console.log('Valeurs doublées:', doubled.valuesArray());
console.log('\n=== BONNES PRATIQUES ===');
const bestPractices = [
    "✅ Utilisez Map quand vous avez besoin de clés dynamiques",
    "✅ Map préserve l'ordre d'insertion des clés",
    "✅ Map est plus performant pour des ajouts/suppressions fréquents",
    "✅ Utilisez Map.size au lieu d'Object.keys(obj).length",
    "✅ Map permet des clés de n'importe quel type",
    "✅ Utilisez Map pour éviter les conflits avec les propriétés héritées",
    "✅ Map est iterable par défaut (for...of)",
    "✅ Considérez WeakMap pour éviter les fuites mémoire avec des objets"
];
bestPractices.forEach(practice => console.log(practice));
