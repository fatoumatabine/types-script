// ============================================
// UNSHIFT - Manipulation de tableaux
// ============================================

// Types pour ajouter des éléments au début d'un tuple
type Unshift<T extends readonly unknown[], U> = [U, ...T];

// Types pour manipuler plusieurs éléments
type UnshiftMultiple<T extends readonly unknown[], U extends readonly unknown[]> = [...U, ...T];

// Types pour l'opération inverse (shift)
type Shift<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : [];

export class UnshiftExamples {
    static unshift<T extends readonly unknown[], U>(arr: T, item: U): Unshift<T, U> {
        return [item, ...arr];
    }

    static unshiftMultiple<T extends readonly unknown[], U extends readonly unknown[]>(
        arr: T, 
        items: U
    ): UnshiftMultiple<T, U> {
        return [...items, ...arr];
    }

    static shift<T extends readonly unknown[]>(arr: T): Shift<T> {
        return arr.slice(1) as Shift<T>;
    }
}

export function demonstrateUnshift() {
    const numbers = [2, 3, 4] as const;
    const unshifted = UnshiftExamples.unshift(numbers, 1); // [1, 2, 3, 4]
    const multiple = UnshiftExamples.unshiftMultiple(numbers, [0, 1] as const); // [0, 1, 2, 3, 4]
    const shifted = UnshiftExamples.shift(unshifted); // [2, 3, 4]
    
    return { numbers, unshifted, multiple, shifted };
}
