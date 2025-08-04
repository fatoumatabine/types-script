"use strict";
// ===== PROJET D'EXEMPLE AVEC TSCONFIG =====
// Démonstration d'un projet TypeScript bien configuré
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
console.log('=== PROJET TYPESCRIPT AVEC TSCONFIG ===');
/**
 * Application principale
 */
class App {
    constructor(name) {
        this.name = name;
    }
    start() {
        console.log((0, utils_1.greet)(this.name));
        const numbers = [1, 2, 3, 4, 5];
        const sum = (0, utils_1.calculateSum)(numbers);
        console.log(`La somme de ${numbers.join(', ')} est: ${sum}`);
        this.demonstrateFeatures();
    }
    demonstrateFeatures() {
        console.log('\n=== FONCTIONNALITÉS TYPESCRIPT ===');
        // Types explicites
        const userName = "Alice";
        const userAge = 30;
        const isActive = true;
        console.log(`Utilisateur: ${userName}, Âge: ${userAge}, Actif: ${isActive}`);
        const user = {
            name: userName,
            age: userAge,
            email: "alice@example.com"
        };
        console.log('Objet utilisateur:', user);
        // Fonction avec types
        const processUser = (user) => {
            return `Traitement de ${user.name} (${user.age} ans)`;
        };
        console.log(processUser(user));
        // Générics
        function createArray(item, count) {
            return new Array(count).fill(item);
        }
        const stringArray = createArray("hello", 3);
        const numberArray = createArray(42, 2);
        console.log('Tableau de chaînes:', stringArray);
        console.log('Tableau de nombres:', numberArray);
    }
}
// Point d'entrée de l'application
const app = new App('Mon Application TypeScript');
app.start();
console.log('\n=== AVANTAGES DE TSCONFIG ===');
console.log('✅ Configuration centralisée');
console.log('✅ Types vérifiés à la compilation');
console.log('✅ Auto-completion intelligente');
console.log('✅ Détection d\'erreurs précoce');
console.log('✅ Refactoring sécurisé');
