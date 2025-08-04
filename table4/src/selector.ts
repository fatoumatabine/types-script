// ============================================
// SELECTOR - Sélection de types
// ============================================

// Types pour sélectionner des propriétés
type Selector<T, K extends keyof T> = T[K];
type MultiSelector<T, K extends keyof T> = Pick<T, K>;

// Sélecteurs conditionnels
type SelectByType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type SelectValuesByType<T, U> = {
    [K in keyof T]: T[K] extends U ? T[K] : never;
};

export class SelectorExamples {
    static select<T, K extends keyof T>(obj: T, key: K): Selector<T, K> {
        return obj[key];
    }

    static multiSelect<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        for (const key of keys) {
            result[key] = obj[key];
        }
        return result;
    }

    static selectByType<T, U>(obj: T, typeGuard: (value: any) => value is U): Partial<T> {
        const result: Partial<T> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeGuard(value)) {
                (result as any)[key] = value;
            }
        }
        return result;
    }
}

type User = { name: string; age: number; isAdmin: boolean; };
type StringKeys = SelectByType<User, string>; // "name"
type NumberKeys = SelectByType<User, number>; // "age"

export function demonstrateSelector() {
    const user: User = { name: "Alice", age: 30, isAdmin: true };
    
    const name = SelectorExamples.select(user, "name");
    const basicInfo = SelectorExamples.multiSelect(user, ["name", "age"]);
    const strings = SelectorExamples.selectByType(user, (x): x is string => typeof x === 'string');
    
    return { user, name, basicInfo, strings };
}
