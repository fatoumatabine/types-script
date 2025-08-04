// ============================================
// REDUCER - Réduction de données
// ============================================

// Types pour les réducteurs
type Reducer<T, U> = (accumulator: U, current: T, index: number) => U;

type ReduceResult<T extends readonly unknown[], U, R extends Reducer<T[number], U>> = U;

// Réducteurs spécialisés
type SumReducer = Reducer<number, number>;
type ConcatReducer<T> = Reducer<T, T[]>;
type GroupByReducer<T, K extends keyof T> = Reducer<T, Record<string, T[]>>;

export class ReducerExamples {
    // Réducteur générique
    static reduce<T, U>(arr: T[], reducer: Reducer<T, U>, initialValue: U): U {
        return arr.reduce((acc, current, index) => reducer(acc, current, index), initialValue);
    }

    // Réducteurs prédéfinis
    static sum(numbers: number[]): number {
        return this.reduce(numbers, (acc, current) => acc + current, 0);
    }

    static product(numbers: number[]): number {
        return this.reduce(numbers, (acc, current) => acc * current, 1);
    }

    static concat<T>(arrays: T[][]): T[] {
        return this.reduce(arrays, (acc, current) => [...acc, ...current], []);
    }

    static groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
        return this.reduce(arr, (acc, current) => {
            const groupKey = String(current[key]);
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(current);
            return acc;
        }, {} as Record<string, T[]>);
    }

    static countBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, number> {
        return this.reduce(arr, (acc, current) => {
            const key = keyFn(current);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }

    // Réducteurs avancés
    static findMinMax(numbers: number[]): { min: number; max: number } | null {
        if (numbers.length === 0) return null;
        
        return this.reduce(numbers, (acc, current) => ({
            min: Math.min(acc.min, current),
            max: Math.max(acc.max, current)
        }), { min: numbers[0], max: numbers[0] });
    }

    static partition<T>(arr: T[], predicate: (item: T) => boolean): { passed: T[]; failed: T[] } {
        return this.reduce(arr, (acc, current) => {
            if (predicate(current)) {
                acc.passed.push(current);
            } else {
                acc.failed.push(current);
            }
            return acc;
        }, { passed: [] as T[], failed: [] as T[] });
    }
}

export function demonstrateReducer() {
    const numbers = [1, 2, 3, 4, 5];
    const words = ["hello", "world", "typescript"];
    const users = [
        { name: "Alice", age: 25, city: "Paris" },
        { name: "Bob", age: 30, city: "London" },
        { name: "Charlie", age: 25, city: "Paris" }
    ];

    const sum = ReducerExamples.sum(numbers);
    const product = ReducerExamples.product(numbers);
    const grouped = ReducerExamples.groupBy(users, "city");
    const counted = ReducerExamples.countBy(users, u => u.city);
    const minMax = ReducerExamples.findMinMax(numbers);
    const partitioned = ReducerExamples.partition(numbers, x => x % 2 === 0);

    return { sum, product, grouped, counted, minMax, partitioned };
}
