"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
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
    }
    getName() {
        return this.name;
    }
}
// Point d'entrée de l'application
const app = new App('Mon Application TypeScript');
app.start();
exports.default = App;
