// ============================================
// SKIP - Ignorer des éléments
// ============================================

// Types pour ignorer des éléments
type Skip<T extends readonly unknown[], N extends number> = 
    N extends 0 ? T :
    T extends readonly [unknown, ...infer Rest] ? 
        Skip<Rest, Decrement<N>> : 
        [];

type SkipWhile<T extends readonly unknown[], Condition> = 
    T extends readonly [infer First, ...infer Rest] ?
        First extends Condition ?
            SkipWhile<Rest, Condition> :
            T :
        [];

// Helper pour décrémenter
type Decrement<N extends number> = N extends 1 ? 0 : N extends 2 ? 1 : N extends 3 ? 2 : number;

export class SkipExamples {
    static skip<T extends readonly unknown[], N extends number>(arr: T, n: N): Skip<T, N> {
        return arr.slice(n) as Skip<T, N>;
    }

    static skipWhile<T>(arr: T[], predicate: (item: T) => boolean): T[] {
        let index = 0;
        while (index < arr.length && predicate(arr[index])) {
            index++;
        }
        return arr.slice(index);
    }

    static skipUntil<T>(arr: T[], predicate: (item: T) => boolean): T[] {
        return this.skipWhile(arr, (item) => !predicate(item));
    }
}

export function demonstrateSkip() {
    const numbers = [1, 2, 3, 4, 5] as const;
    const skipped = SkipExamples.skip(numbers, 2); // [3, 4, 5]
    
    const nums = [1, 2, 3, 4, 5];
    const skippedWhile = SkipExamples.skipWhile(nums, x => x < 3); // [3, 4, 5]
    const skippedUntil = SkipExamples.skipUntil(nums, x => x > 3); // [4, 5]
    
    return { numbers, skipped, skippedWhile, skippedUntil };
}
