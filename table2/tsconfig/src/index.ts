// ===== PROJET D'EXEMPLE AVEC TSCONFIG =====
// Démonstration d'un projet TypeScript bien configuré

import { greet, calculateSum } from './utils';

console.log('=== PROJET TYPESCRIPT AVEC TSCONFIG ===');

/**
 * Application principale
 */
class App {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public start(): void {
        console.log(greet(this.name));
        
        const numbers = [1, 2, 3, 4, 5];
        const sum = calculateSum(numbers);
        console.log(`La somme de ${numbers.join(', ')} est: ${sum}`);
        
        this.demonstrateFeatures();
    }
    
    private demonstrateFeatures(): void {
        console.log('\n=== FONCTIONNALITÉS TYPESCRIPT ===');
        
        // Types explicites
        const userName: string = "Alice";
        const userAge: number = 30;
        const isActive: boolean = true;
        
        console.log(`Utilisateur: ${userName}, Âge: ${userAge}, Actif: ${isActive}`);
        
        // Interface
        interface User {
            name: string;
            age: number;
            email?: string;
        }
        
        const user: User = {
            name: userName,
            age: userAge,
            email: "alice@example.com"
        };
        
        console.log('Objet utilisateur:', user);
        
        // Fonction avec types
        const processUser = (user: User): string => {
            return `Traitement de ${user.name} (${user.age} ans)`;
        };
        
        console.log(processUser(user));
        
        // Générics
        function createArray<T>(item: T, count: number): T[] {
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

export {};
