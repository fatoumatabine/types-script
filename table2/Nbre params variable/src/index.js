"use strict";
// ===== NOMBRE DE PARAMÈTRES VARIABLE (REST PARAMETERS) =====
// Guide complet des paramètres rest et des fonctions variadiques
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('=== PARAMÈTRES REST EN TYPESCRIPT ===');
console.log('\n=== FONCTION AVEC PARAMÈTRES REST BASIQUE ===');
// 1. Fonction basique avec rest parameters
function sum(...numbers) {
    console.log(`Calcul de la somme de ${numbers.length} nombres:`, numbers);
    return numbers.reduce((total, num) => total + num, 0);
}
console.log('Somme de 1, 2, 3:', sum(1, 2, 3));
console.log('Somme de 10, 20, 30, 40, 50:', sum(10, 20, 30, 40, 50));
console.log('Somme sans paramètres:', sum());
console.log('\n=== FONCTION AVEC PARAMÈTRES MIXTES ===');
// 2. Combinaison de paramètres normaux et rest
function greetUsers(greeting, ...userNames) {
    console.log(`Message: "${greeting}" pour ${userNames.length} utilisateurs`);
    return userNames.map(name => `${greeting}, ${name}!`);
}
const greetings = greetUsers("Bonjour", "Alice", "Bob", "Charlie");
greetings.forEach(greeting => console.log(greeting));
console.log('\n=== FONCTION AVEC TYPES COMPLEXES ===');
function processTasks(status, ...tasks) {
    console.log(`\nTraitement de ${tasks.length} tâches avec le statut: ${status}`);
    tasks.forEach(task => {
        console.log(`📋 Tâche ${task.id}: ${task.title} - ${task.completed ? '✅' : '❌'}`);
    });
}
const tasks = [
    { id: 1, title: "Écrire documentation", completed: true },
    { id: 2, title: "Réviser code", completed: false },
    { id: 3, title: "Tests unitaires", completed: false }
];
processTasks("En cours", ...tasks);
console.log('\n=== FONCTION GÉNÉRIQUE AVEC REST ===');
// 4. Fonction générique avec rest parameters
function createArray(...items) {
    console.log(`Création d'un tableau de ${items.length} éléments de type ${typeof items[0]}`);
    return [...items];
}
const numberArray = createArray(1, 2, 3, 4, 5);
const stringArray = createArray("a", "b", "c");
const booleanArray = createArray(true, false, true);
console.log('Tableau de nombres:', numberArray);
console.log('Tableau de chaînes:', stringArray);
console.log('Tableau de booléens:', booleanArray);
console.log('\n=== FONCTION AVEC VALIDATION ===');
// 5. Validation des paramètres rest
function calculateAverage(...scores) {
    if (scores.length === 0) {
        throw new Error("Au moins un score est requis");
    }
    // Valider que tous les scores sont valides
    const invalidScores = scores.filter(score => score < 0 || score > 100);
    if (invalidScores.length > 0) {
        throw new Error(`Scores invalides: ${invalidScores.join(", ")}`);
    }
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    console.log(`Moyenne de ${scores.length} scores:`, scores);
    console.log(`Total: ${total}, Moyenne: ${average.toFixed(2)}`);
    return average;
}
try {
    calculateAverage(85, 92, 78, 96, 88);
    calculateAverage(75, 80, 85);
    // calculateAverage(); // Erreur: aucun score
}
catch (error) {
    console.error('Erreur:', error.message);
}
console.log('\n=== DESTRUCTURATION AVEC REST ===');
// 6. Destructuration avec rest dans les paramètres
function processUserData(_a) {
    var { name, email } = _a, otherData = __rest(_a, ["name", "email"]);
    console.log(`\nUtilisateur: ${name}`);
    console.log(`Email: ${email}`);
    const additionalFields = Object.keys(otherData);
    if (additionalFields.length > 0) {
        console.log('Données supplémentaires:');
        Object.entries(otherData).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
    }
}
processUserData({
    name: "Alice",
    email: "alice@example.com",
    age: 30,
    city: "Paris",
    occupation: "Développeuse"
});
console.log('\n=== OVERLOADING AVEC REST PARAMETERS ===');
// 7. Surcharge de fonction avec rest parameters
class Logger {
    log(levelOrMessage, message, ...details) {
        if (message === undefined) {
            // Un seul argument = message simple
            console.log(`📝 ${levelOrMessage}`);
        }
        else if (details.length === 0) {
            // Deux arguments = level + message
            console.log(`📝 [${levelOrMessage.toUpperCase()}] ${message}`);
        }
        else {
            // Trois arguments ou plus = level + message + détails
            console.log(`📝 [${levelOrMessage.toUpperCase()}] ${message}`);
            console.log('   Détails:', details);
        }
    }
}
const logger = new Logger();
logger.log("Application démarrée");
logger.log("info", "Utilisateur connecté");
logger.log("error", "Erreur de connexion", { code: 500, url: "/api/users" });
console.log('\n=== TRANSFORMATION DE DONNÉES ===');
// 8. Transformation de données avec rest
function transformData(transformer, ...items) {
    console.log(`\nTransformation de ${items.length} éléments`);
    return items.map(transformer);
}
// Transformer des nombres en chaînes
const numberToString = (num) => `Nombre: ${num}`;
const transformedNumbers = transformData(numberToString, 1, 2, 3, 4, 5);
console.log('Nombres transformés:', transformedNumbers);
const getFullName = (person) => `${person.firstName} ${person.lastName}`;
const people = [
    { firstName: "Jean", lastName: "Dupont" },
    { firstName: "Marie", lastName: "Martin" },
    { firstName: "Pierre", lastName: "Durand" }
];
const fullNames = transformData(getFullName, ...people);
console.log('Noms complets:', fullNames);
console.log('\n=== OPÉRATEURS MATHÉMATIQUES ===');
// 9. Opérateurs mathématiques avec rest
class MathOperations {
    static min(...numbers) {
        if (numbers.length === 0)
            throw new Error("Au moins un nombre requis");
        return Math.min(...numbers);
    }
    static max(...numbers) {
        if (numbers.length === 0)
            throw new Error("Au moins un nombre requis");
        return Math.max(...numbers);
    }
    static multiply(...numbers) {
        return numbers.reduce((product, num) => product * num, 1);
    }
    static geometricMean(...numbers) {
        if (numbers.length === 0)
            throw new Error("Au moins un nombre requis");
        if (numbers.some(n => n <= 0))
            throw new Error("Tous les nombres doivent être positifs");
        const product = this.multiply(...numbers);
        return Math.pow(product, 1 / numbers.length);
    }
}
const testNumbers = [2, 4, 8, 16];
console.log('Nombres de test:', testNumbers);
console.log('Minimum:', MathOperations.min(...testNumbers));
console.log('Maximum:', MathOperations.max(...testNumbers));
console.log('Produit:', MathOperations.multiply(...testNumbers));
console.log('Moyenne géométrique:', MathOperations.geometricMean(...testNumbers).toFixed(2));
console.log('\n=== CONSTRUCTION D\'OBJETS DYNAMIQUES ===');
// 10. Construction d'objets avec propriétés dynamiques
function createConfig(baseConfig, ...overrides) {
    console.log(`\nCréation de configuration avec ${overrides.length} surcharges`);
    const finalConfig = Object.assign({}, baseConfig);
    overrides.forEach((override, index) => {
        console.log(`Application de la surcharge ${index + 1}:`, override);
        Object.assign(finalConfig, override);
    });
    return finalConfig;
}
const baseConfig = {
    host: "localhost",
    port: 3000,
    ssl: false
};
const finalConfig = createConfig(baseConfig, { port: 8080 }, { ssl: true }, { timeout: 5000 });
console.log('Configuration finale:', finalConfig);
console.log('\n=== UTILITAIRES POUR TABLEAUX ===');
// 11. Utilitaires pour manipulation de tableaux
class ArrayUtils {
    static concat(...arrays) {
        return arrays.flat();
    }
    static intersection(...arrays) {
        if (arrays.length === 0)
            return [];
        if (arrays.length === 1)
            return [...arrays[0]];
        return arrays[0].filter(item => arrays.slice(1).every(array => array.includes(item)));
    }
    static union(...arrays) {
        const combined = this.concat(...arrays);
        return [...new Set(combined)];
    }
}
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const array3 = [4, 5, 6, 7];
console.log('Tableaux:', { array1, array2, array3 });
console.log('Concaténation:', ArrayUtils.concat(array1, array2, array3));
console.log('Intersection:', ArrayUtils.intersection(array1, array2, array3));
console.log('Union:', ArrayUtils.union(array1, array2, array3));
console.log('\n=== BONNES PRATIQUES ===');
const bestPractices = [
    "✅ Utilisez rest parameters pour des fonctions flexibles",
    "✅ Placez toujours les rest parameters en dernière position",
    "✅ Documentez le type attendu des rest parameters",
    "✅ Validez les paramètres rest quand nécessaire",
    "✅ Utilisez TypeScript pour typer les rest parameters",
    "✅ Préférez rest parameters aux arguments object",
    "✅ Combinez avec la destructuration pour plus de flexibilité",
    "✅ Considérez les performances avec de nombreux paramètres",
    "✅ Utilisez spread operator pour passer des tableaux",
    "✅ Évitez les rest parameters avec des types différents"
];
bestPractices.forEach(practice => console.log(practice));
