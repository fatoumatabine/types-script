import { greet, calculateSum } from './utils';

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
    }

    public getName(): string {
        return this.name;
    }
}

// Point d'entrée de l'application
const app = new App('Mon Application TypeScript');
app.start();

export default App;
