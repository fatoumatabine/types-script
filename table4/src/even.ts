// ============================================
// EVEN - Types conditionnels
// ============================================

// Types pour déterminer si un nombre est pair/impair au niveau des types
type IsEven<N extends number> = N extends 0 ? true
    : N extends 1 ? false
    : N extends 2 ? true
    : N extends 3 ? false
    : N extends 4 ? true
    : N extends 5 ? false
    : N extends 6 ? true
    : N extends 7 ? false
    : N extends 8 ? true
    : N extends 9 ? false
    : N extends 10 ? true
    : boolean; // Pour les nombres > 10, on utilise boolean

type IsOdd<N extends number> = IsEven<N> extends true ? false : true;

// Types conditionnels pour filtrer les éléments
type FilterEven<T extends readonly number[]> = T extends readonly [infer First, ...infer Rest]
    ? First extends number
        ? IsEven<First> extends true
            ? [First, ...FilterEven<Rest extends readonly number[] ? Rest : []>]
            : FilterEven<Rest extends readonly number[] ? Rest : []>
        : []
    : [];

type FilterOdd<T extends readonly number[]> = T extends readonly [infer First, ...infer Rest]
    ? First extends number
        ? IsOdd<First> extends true
            ? [First, ...FilterOdd<Rest extends readonly number[] ? Rest : []>]
            : FilterOdd<Rest extends readonly number[] ? Rest : []>
        : []
    : [];

// Types conditionnels pour les objets
type EvenProperties<T> = {
    [K in keyof T]: T[K] extends number ? IsEven<T[K]> extends true ? T[K] : never : never
};

// Types pour créer des ranges de nombres pairs/impairs
type EvenRange<Start extends number, End extends number> = 
    Start extends End ? []
    : IsEven<Start> extends true 
        ? [Start, ...EvenRange<Increment<Start>, End>]
        : EvenRange<Increment<Start>, End>;

// Helper types (simplifiés pour la démo)
type Increment<N extends number> = N extends 0 ? 1
    : N extends 1 ? 2
    : N extends 2 ? 3
    : N extends 3 ? 4
    : N extends 4 ? 5
    : N extends 5 ? 6
    : N extends 6 ? 7
    : N extends 7 ? 8
    : N extends 8 ? 9
    : N extends 9 ? 10
    : number;

// Types conditionnels pour la validation
type ValidEvenNumber<T> = T extends number ? IsEven<T> extends true ? T : never : never;
type ValidOddNumber<T> = T extends number ? IsOdd<T> extends true ? T : never : never;

// Types pour les configurations conditionnelles
type EventConfig<T extends "even" | "odd"> = T extends "even" ? {
    type: "even";
    processEvenNumbers: true;
    skipOddNumbers: true;
} : {
    type: "odd";
    processEvenNumbers: false;
    skipOddNumbers: false;
};

export class EvenExamples {
    // Vérifier si un nombre est pair
    static isEven(n: number): boolean {
        return n % 2 === 0;
    }

    // Vérifier si un nombre est impair
    static isOdd(n: number): boolean {
        return n % 2 !== 0;
    }

    // Filtrer les nombres pairs d'un tableau
    static filterEven(numbers: number[]): number[] {
        return numbers.filter(n => this.isEven(n));
    }

    // Filtrer les nombres impairs d'un tableau
    static filterOdd(numbers: number[]): number[] {
        return numbers.filter(n => this.isOdd(n));
    }

    // Partitionner un tableau en pairs et impairs
    static partitionByParity(numbers: number[]): { even: number[], odd: number[] } {
        const even: number[] = [];
        const odd: number[] = [];
        
        for (const num of numbers) {
            if (this.isEven(num)) {
                even.push(num);
            } else {
                odd.push(num);
            }
        }
        
        return { even, odd };
    }

    // Générer une séquence de nombres pairs
    static generateEvenSequence(start: number, length: number): number[] {
        const result: number[] = [];
        let current = this.isEven(start) ? start : start + 1;
        
        for (let i = 0; i < length; i++) {
            result.push(current);
            current += 2;
        }
        
        return result;
    }

    // Générer une séquence de nombres impairs
    static generateOddSequence(start: number, length: number): number[] {
        const result: number[] = [];
        let current = this.isOdd(start) ? start : start + 1;
        
        for (let i = 0; i < length; i++) {
            result.push(current);
            current += 2;
        }
        
        return result;
    }

    // Valider qu'un nombre est pair avec type guard
    static validateEven<T extends number>(n: T): n is ValidEvenNumber<T> {
        return this.isEven(n);
    }

    // Valider qu'un nombre est impair avec type guard
    static validateOdd<T extends number>(n: T): n is ValidOddNumber<T> {
        return this.isOdd(n);
    }

    // Traitement conditionnel basé sur la parité
    static processNumber(n: number, evenHandler: (n: number) => string, oddHandler: (n: number) => string): string {
        return this.isEven(n) ? evenHandler(n) : oddHandler(n);
    }

    // Créer une configuration basée sur le type
    static createConfig<T extends "even" | "odd">(type: T): EventConfig<T> {
        if (type === "even") {
            return {
                type: "even",
                processEvenNumbers: true,
                skipOddNumbers: true
            } as EventConfig<T>;
        } else {
            return {
                type: "odd",
                processEvenNumbers: false,
                skipOddNumbers: false
            } as EventConfig<T>;
        }
    }

    // Appliquer une transformation conditionnelle
    static transformNumbers(
        numbers: number[],
        evenTransform: (n: number) => number,
        oddTransform: (n: number) => number
    ): number[] {
        return numbers.map(n => 
            this.isEven(n) ? evenTransform(n) : oddTransform(n)
        );
    }

    // Calculer des statistiques de parité
    static calculateParityStats(numbers: number[]): {
        total: number;
        even: { count: number; sum: number; average: number };
        odd: { count: number; sum: number; average: number };
        ratio: number;
    } {
        const even = this.filterEven(numbers);
        const odd = this.filterOdd(numbers);
        
        const evenSum = even.reduce((sum, n) => sum + n, 0);
        const oddSum = odd.reduce((sum, n) => sum + n, 0);
        
        return {
            total: numbers.length,
            even: {
                count: even.length,
                sum: evenSum,
                average: even.length > 0 ? evenSum / even.length : 0
            },
            odd: {
                count: odd.length,
                sum: oddSum,
                average: odd.length > 0 ? oddSum / odd.length : 0
            },
            ratio: odd.length > 0 ? even.length / odd.length : Infinity
        };
    }

    // Créer une matrice de parité
    static createParityMatrix(size: number): boolean[][] {
        const matrix: boolean[][] = [];
        
        for (let i = 0; i < size; i++) {
            const row: boolean[] = [];
            for (let j = 0; j < size; j++) {
                row.push(this.isEven(i + j));
            }
            matrix.push(row);
        }
        
        return matrix;
    }

    // Algorithme de tri par parité
    static sortByParity(numbers: number[]): number[] {
        const even = this.filterEven(numbers).sort((a, b) => a - b);
        const odd = this.filterOdd(numbers).sort((a, b) => a - b);
        return [...even, ...odd];
    }
}

// Types de test pour validation
type Test1 = IsEven<2>; // true
type Test2 = IsEven<3>; // false
type Test3 = IsOdd<5>; // true
type Test4 = ValidEvenNumber<4>; // 4
type Test5 = ValidEvenNumber<3>; // never

type TestNumbers = readonly [1, 2, 3, 4, 5, 6];
type TestFilterEven = FilterEven<TestNumbers>; // [2, 4, 6]
type TestFilterOdd = FilterOdd<TestNumbers>; // [1, 3, 5]

// Exemples d'usage
export function demonstrateEven() {
    // console.log("=== DÉMONSTRATION DES TYPES CONDITIONNELS (EVEN) ===");

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Filtrage
    const evenNumbers = EvenExamples.filterEven(numbers);
    const oddNumbers = EvenExamples.filterOdd(numbers);

    // Partition
    const partition = EvenExamples.partitionByParity(numbers);

    // Génération de séquences
    const evenSequence = EvenExamples.generateEvenSequence(0, 5); // [0, 2, 4, 6, 8]
    const oddSequence = EvenExamples.generateOddSequence(1, 5); // [1, 3, 5, 7, 9]

    // Traitement conditionnel
    const processedNumbers = numbers.map(n => 
        EvenExamples.processNumber(
            n,
            (even) => `${even} est pair`,
            (odd) => `${odd} est impair`
        )
    );

    // Transformation
    const transformedNumbers = EvenExamples.transformNumbers(
        numbers,
        (even) => even * 2, // Doubler les pairs
        (odd) => odd + 1   // Ajouter 1 aux impairs
    );

    // Statistiques
    const stats = EvenExamples.calculateParityStats(numbers);

    // Matrice de parité
    const parityMatrix = EvenExamples.createParityMatrix(4);

    // Tri par parité
    const sortedByParity = EvenExamples.sortByParity([7, 2, 9, 4, 1, 6]);

    // Configurations
    const evenConfig = EvenExamples.createConfig("even");
    const oddConfig = EvenExamples.createConfig("odd");

    return {
        original: numbers,
        evenNumbers,
        oddNumbers,
        partition,
        evenSequence,
        oddSequence,
        processedNumbers,
        transformedNumbers,
        stats,
        parityMatrix,
        sortedByParity,
        evenConfig,
        oddConfig
    };
}
