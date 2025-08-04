// ============================================
// CONCAT - Concaténation
// ============================================

// Types pour concaténer des tuples
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];

// Types pour concaténer des chaînes
type StringConcat<T extends string, U extends string> = `${T}${U}`;

// Types pour concaténer plusieurs tuples
type ConcatMultiple<T extends readonly (readonly unknown[])[]> = 
    T extends readonly [infer First, ...infer Rest] ?
        First extends readonly unknown[] ?
            Rest extends readonly (readonly unknown[])[] ?
                Concat<First, ConcatMultiple<Rest>> :
                First :
            [] :
        [];

export class ConcatExamples {
    static concat<T extends readonly unknown[], U extends readonly unknown[]>(
        arr1: T, 
        arr2: U
    ): Concat<T, U> {
        return [...arr1, ...arr2];
    }

    static concatMultiple<T extends readonly unknown[][]>(...arrays: T): T[number][] {
        return arrays.reduce((acc, curr) => [...acc, ...curr], []);
    }

    static stringConcat<T extends string, U extends string>(str1: T, str2: U): StringConcat<T, U> {
        return `${str1}${str2}` as StringConcat<T, U>;
    }

    static concatWithSeparator<T extends readonly unknown[]>(
        arrays: T[],
        separator: T[number]
    ): T[number][] {
        if (arrays.length === 0) return [];
        if (arrays.length === 1) return [...arrays[0]];
        
        const result: T[number][] = [...arrays[0]];
        for (let i = 1; i < arrays.length; i++) {
            result.push(separator);
            result.push(...arrays[i]);
        }
        return result;
    }

    static concatObjects<T, U>(obj1: T, obj2: U): T & U {
        return { ...obj1, ...obj2 };
    }

    static deepConcat<T extends Record<string, any>>(
        obj1: T, 
        obj2: Partial<T>
    ): T {
        const result = { ...obj1 };
        
        for (const [key, value] of Object.entries(obj2)) {
            if (key in result && 
                typeof result[key] === 'object' && 
                typeof value === 'object' &&
                !Array.isArray(result[key]) &&
                !Array.isArray(value)) {
                result[key] = this.deepConcat(result[key], value);
            } else {
                (result as any)[key] = value;
            }
        }
        
        return result;
    }
}

export function demonstrateConcat() {
    const arr1 = [1, 2, 3] as const;
    const arr2 = [4, 5, 6] as const;
    const concatenated = ConcatExamples.concat(arr1, arr2); // [1, 2, 3, 4, 5, 6]

    const multiple = ConcatExamples.concatMultiple([1, 2], [3, 4], [5, 6]);

    const str1 = "Hello" as const;
    const str2 = "World" as const;
    const stringConcated = ConcatExamples.stringConcat(str1, str2); // "HelloWorld"

    const withSeparator = ConcatExamples.concatWithSeparator([[1, 2], [3, 4], [5, 6]], 0);

    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const objConcated = ConcatExamples.concatObjects(obj1, obj2);

    return { arr1, arr2, concatenated, multiple, stringConcated, withSeparator, objConcated };
}
