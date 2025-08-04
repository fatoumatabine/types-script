// ============================================
// SOME - Vérifications conditionnelles
// ============================================

// Types pour vérifier si au moins un élément satisfait une condition
type Some<T extends readonly unknown[], U> = T extends readonly [infer First, ...infer Rest] ?
    First extends U ? true : Some<Rest, U> : false;

// Types pour vérifier des propriétés d'objets
type SomeKeys<T, U> = {
    [K in keyof T]: T[K] extends U ? true : false;
}[keyof T] extends false ? false : true;

// Types pour vérifier des conditions complexes
type SomeMatches<T extends readonly unknown[], Condition> = T extends readonly [infer First, ...infer Rest] ?
    First extends Condition ? true : SomeMatches<Rest, Condition> : false;

export class SomeExamples {
    // Vérifier si au moins un élément satisfait une condition
    static some<T>(arr: T[], predicate: (item: T) => boolean): boolean {
        return arr.some(predicate);
    }

    // Vérifier si au moins un élément est d'un type donné
    static someOfType<T, U>(arr: T[], typeGuard: (item: T) => item is U): boolean {
        return arr.some(typeGuard);
    }

    // Vérifier si au moins une propriété satisfait une condition
    static someProperty<T>(
        obj: T, 
        predicate: (value: T[keyof T]) => boolean
    ): boolean {
        return Object.values(obj).some(predicate);
    }

    // Vérifier si au moins un objet dans un tableau a une propriété
    static someHasProperty<T, K extends PropertyKey>(
        arr: T[], 
        property: K
    ): boolean {
        return arr.some(item => 
            typeof item === 'object' && 
            item !== null && 
            property in item
        );
    }

    // Vérifier des conditions multiples
    static someMatch<T>(
        arr: T[], 
        conditions: Array<(item: T) => boolean>
    ): boolean {
        return conditions.some(condition => arr.some(condition));
    }

    // Vérifier si au moins un élément satisfait toutes les conditions
    static someMatchAll<T>(
        arr: T[], 
        conditions: Array<(item: T) => boolean>
    ): boolean {
        return arr.some(item => conditions.every(condition => condition(item)));
    }

    // Validation partielle d'objet
    static someValidation<T>(
        obj: T,
        validators: Partial<{ [K in keyof T]: (value: T[K]) => boolean }>
    ): boolean {
        return Object.entries(validators).some(([key, validator]) => {
            if (validator && key in obj) {
                return validator((obj as any)[key]);
            }
            return false;
        });
    }

    // Recherche floue
    static someFuzzyMatch(
        strings: string[], 
        query: string, 
        threshold: number = 0.7
    ): boolean {
        return strings.some(str => {
            const similarity = this.calculateSimilarity(str.toLowerCase(), query.toLowerCase());
            return similarity >= threshold;
        });
    }

    // Calcul de similarité simple (Dice coefficient)
    private static calculateSimilarity(str1: string, str2: string): number {
        if (str1.length === 0 && str2.length === 0) return 1;
        if (str1.length === 0 || str2.length === 0) return 0;

        const bigrams1 = this.getBigrams(str1);
        const bigrams2 = this.getBigrams(str2);
        
        const intersection = bigrams1.filter(bigram => bigrams2.includes(bigram));
        
        return (2 * intersection.length) / (bigrams1.length + bigrams2.length);
    }

    private static getBigrams(str: string): string[] {
        const bigrams: string[] = [];
        for (let i = 0; i < str.length - 1; i++) {
            bigrams.push(str.substring(i, i + 2));
        }
        return bigrams;
    }

    // Vérification de range
    static someInRange<T extends number>(
        numbers: T[], 
        min: number, 
        max: number
    ): boolean {
        return numbers.some(num => num >= min && num <= max);
    }

    // Vérification de pattern
    static someMatchPattern(
        strings: string[], 
        pattern: RegExp
    ): boolean {
        return strings.some(str => pattern.test(str));
    }

    // Vérification asynchrone
    static async someAsync<T>(
        arr: T[], 
        asyncPredicate: (item: T) => Promise<boolean>
    ): Promise<boolean> {
        for (const item of arr) {
            if (await asyncPredicate(item)) {
                return true;
            }
        }
        return false;
    }

    // Vérification avec timeout
    static async someWithTimeout<T>(
        arr: T[], 
        predicate: (item: T) => boolean,
        timeoutMs: number
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`Timeout after ${timeoutMs}ms`));
            }, timeoutMs);

            try {
                const result = arr.some(predicate);
                clearTimeout(timeout);
                resolve(result);
            } catch (error) {
                clearTimeout(timeout);
                reject(error);
            }
        });
    }
}

// Types de test
type TestArray = readonly [1, "hello", true, null];
type HasString = Some<TestArray, string>; // true
type HasDate = Some<TestArray, Date>; // false

type TestObject = { a: string; b: number; c: boolean };
type HasStringProp = SomeKeys<TestObject, string>; // true
type HasDateProp = SomeKeys<TestObject, Date>; // false

export function demonstrateSome() {
    const numbers = [1, 3, 5, 7, 9];
    const mixed = [1, "hello", true, null];
    const users = [
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 35, email: "charlie@example.com" }
    ];

    // Tests basiques
    const hasEven = SomeExamples.some(numbers, n => n % 2 === 0); // false
    const hasString = SomeExamples.someOfType(mixed, (x): x is string => typeof x === 'string'); // true

    // Tests d'objets
    const user = { name: "Alice", age: 25, active: true };
    const hasLongString = SomeExamples.someProperty(user, val => 
        typeof val === 'string' && val.length > 4
    ); // false (Alice = 5 chars, mais > 4)

    // Tests de propriétés
    const hasEmail = SomeExamples.someHasProperty(users, 'email'); // true

    // Tests de conditions multiples
    const conditions = [
        (n: number) => n > 5,
        (n: number) => n < 0
    ];
    const matchesCondition = SomeExamples.someMatch(numbers, conditions); // true (7, 9 > 5)

    // Tests de validation
    const validators = {
        name: (name: string) => name.length > 3,
        age: (age: number) => age >= 18
    };
    const passesValidation = SomeExamples.someValidation(user, validators); // true

    // Tests de recherche floue
    const names = ["Alice", "Bob", "Charlie", "David"];
    const fuzzyMatch = SomeExamples.someFuzzyMatch(names, "Alic", 0.6); // true

    // Tests de range
    const inRange = SomeExamples.someInRange(numbers, 5, 10); // true (7, 9)

    // Tests de pattern
    const emails = ["test@example.com", "invalid-email", "user@domain.org"];
    const hasValidEmail = SomeExamples.someMatchPattern(
        emails, 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    ); // true

    return {
        numbers,
        mixed,
        users,
        hasEven,
        hasString,
        hasLongString,
        hasEmail,
        matchesCondition,
        passesValidation,
        fuzzyMatch,
        inRange,
        hasValidEmail
    };
}
