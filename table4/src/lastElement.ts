// ============================================
// LAST ELEMENT - Utilitaires de types
// ============================================

// Types utilitaires pour récupérer le dernier élément
type LastElement<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;

// Variantes pour différents cas
type LastElementOrUndefined<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : undefined;

type NonEmptyArray<T> = readonly [T, ...T[]];
type LastElementNonEmpty<T extends NonEmptyArray<unknown>> = LastElement<T>;

// Types pour récupérer les éléments sauf le dernier
type AllButLast<T extends readonly unknown[]> = T extends readonly [...infer Rest, unknown] ? Rest : [];

// Types pour manipuler des tuples
type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : [];

// Types pour la longueur et l'accès indexé
type Length<T extends readonly unknown[]> = T['length'];
type IsEmpty<T extends readonly unknown[]> = T extends readonly [] ? true : false;

// Types pour reverser un tuple
type Reverse<T extends readonly unknown[]> = T extends readonly [...infer Rest, infer L] 
    ? [L, ...Reverse<Rest>] 
    : [];

// Types pour prendre/ignorer des éléments
type Take<T extends readonly unknown[], N extends number> = T extends readonly unknown[] 
    ? N extends 0 
        ? [] 
        : T extends readonly [infer H, ...infer Rest]
            ? [H, ...Take<Rest, Decrement<N>>]
            : []
    : never;

type Drop<T extends readonly unknown[], N extends number> = N extends 0 
    ? T 
    : T extends readonly [unknown, ...infer Rest] 
        ? Drop<Rest, Decrement<N>>
        : [];

// Helper type pour décrementer (limité pour la démo)
type Decrement<N extends number> = N extends 1 ? 0 
    : N extends 2 ? 1 
    : N extends 3 ? 2 
    : N extends 4 ? 3 
    : N extends 5 ? 4 
    : number;

export class LastElementExamples {
    // Récupérer le dernier élément d'un tableau
    static getLastElement<T extends readonly unknown[]>(arr: T): LastElement<T> {
        if (arr.length === 0) {
            throw new Error("Cannot get last element of empty array");
        }
        return arr[arr.length - 1] as LastElement<T>;
    }

    // Version safe qui retourne undefined pour tableau vide
    static getLastElementSafe<T extends readonly unknown[]>(arr: T): LastElementOrUndefined<T> {
        if (arr.length === 0) {
            return undefined as LastElementOrUndefined<T>;
        }
        return arr[arr.length - 1] as LastElementOrUndefined<T>;
    }

    // Récupérer tous les éléments sauf le dernier
    static getAllButLast<T extends readonly unknown[]>(arr: T): AllButLast<T> {
        return arr.slice(0, -1) as AllButLast<T>;
    }

    // Récupérer le premier élément
    static getHead<T extends readonly unknown[]>(arr: T): Head<T> {
        if (arr.length === 0) {
            throw new Error("Cannot get head of empty array");
        }
        return arr[0] as Head<T>;
    }

    // Récupérer tous les éléments sauf le premier
    static getTail<T extends readonly unknown[]>(arr: T): Tail<T> {
        return arr.slice(1) as Tail<T>;
    }

    // Vérifier si un tableau est vide
    static isEmpty<T extends readonly unknown[]>(arr: T): IsEmpty<T> {
        return (arr.length === 0) as IsEmpty<T>;
    }

    // Reverser un tableau en préservant les types
    static reverseArray<T extends readonly unknown[]>(arr: T): Reverse<T> {
        return [...arr].reverse() as Reverse<T>;
    }

    // Prendre les N premiers éléments
    static take<T extends readonly unknown[], N extends number>(
        arr: T, 
        n: N
    ): Take<T, N> {
        return arr.slice(0, n) as Take<T, N>;
    }

    // Ignorer les N premiers éléments
    static drop<T extends readonly unknown[], N extends number>(
        arr: T, 
        n: N
    ): Drop<T, N> {
        return arr.slice(n) as Drop<T, N>;
    }

    // Fonction de mapping qui préserve les types
    static mapLast<T extends readonly unknown[], U>(
        arr: T,
        mapper: (item: LastElement<T>) => U
    ): T extends readonly [...infer Rest, unknown] ? [...Rest, U] : never {
        if (arr.length === 0) {
            throw new Error("Cannot map last element of empty array");
        }
        
        const lastIndex = arr.length - 1;
        const lastElement = arr[lastIndex] as LastElement<T>;
        const mappedLast = mapper(lastElement);
        
        return [...arr.slice(0, -1), mappedLast] as any;
    }

    // Ajouter un élément à la fin
    static append<T extends readonly unknown[], U>(
        arr: T,
        item: U
    ): [...T, U] {
        return [...arr, item];
    }

    // Ajouter un élément au début
    static prepend<T extends readonly unknown[], U>(
        arr: T,
        item: U
    ): [U, ...T] {
        return [item, ...arr];
    }

    // Analyser une structure de données avec types
    static analyzeTuple<T extends readonly unknown[]>(arr: T): {
        length: Length<T>;
        isEmpty: IsEmpty<T>;
        head: T extends readonly [infer H, ...unknown[]] ? H : undefined;
        last: LastElementOrUndefined<T>;
        tail: Tail<T>;
        allButLast: AllButLast<T>;
    } {
        return {
            length: arr.length as Length<T>,
            isEmpty: (arr.length === 0) as IsEmpty<T>,
            head: (arr.length > 0 ? arr[0] : undefined) as any,
            last: this.getLastElementSafe(arr),
            tail: this.getTail(arr),
            allButLast: this.getAllButLast(arr)
        };
    }

    // Fonction pour créer un path typé
    static createPath<T extends readonly string[]>(...segments: T): T {
        return segments;
    }

    // Joindre un path
    static joinPath<T extends readonly string[]>(path: T): string {
        return path.join('/');
    }

    // Récupérer le nom de fichier (dernier segment)
    static getFileName<T extends readonly string[]>(path: T): LastElement<T> {
        return this.getLastElement(path);
    }

    // Récupérer le dossier parent (tous sauf le dernier)
    static getParentDir<T extends readonly string[]>(path: T): AllButLast<T> {
        return this.getAllButLast(path);
    }
}

// Types de démonstration
type MyTuple = readonly [string, number, boolean, Date];
type Colors = readonly ["red", "green", "blue"];
type Numbers = readonly [1, 2, 3, 4, 5];

// Tests de types pour vérification
type TestLast = LastElement<MyTuple>; // Date
type TestHead = Head<Colors>; // "red"
type TestTail = Tail<Numbers>; // [2, 3, 4, 5]
type TestAllButLast = AllButLast<Colors>; // ["red", "green"]
type TestReverse = Reverse<Colors>; // ["blue", "green", "red"]

// Exemples d'usage
export function demonstrateLastElement() {
    // console.log("=== DÉMONSTRATION DE LAST ELEMENT ===");

    // Tuples de test
    const myTuple = ["hello", 42, true, new Date()] as const;
    const colors = ["red", "green", "blue"] as const;
    const numbers = [1, 2, 3, 4, 5] as const;
    const emptyArray = [] as const;

    // Tests des fonctions
    const lastElement = LastElementExamples.getLastElement(myTuple); // Date
    const lastColor = LastElementExamples.getLastElement(colors); // "blue"
    const lastNumber = LastElementExamples.getLastElement(numbers); // 5

    // Tests safe
    const lastSafe = LastElementExamples.getLastElementSafe(emptyArray); // undefined
    const lastColorSafe = LastElementExamples.getLastElementSafe(colors); // "blue"

    // Manipulation des tuples
    const head = LastElementExamples.getHead(colors); // "red"
    const tail = LastElementExamples.getTail(numbers); // [2, 3, 4, 5]
    const allButLast = LastElementExamples.getAllButLast(colors); // ["red", "green"]

    // Vérifications
    const isEmpty = LastElementExamples.isEmpty(emptyArray); // true
    const isNotEmpty = LastElementExamples.isEmpty(colors); // false

    // Reverser
    const reversed = LastElementExamples.reverseArray(colors); // ["blue", "green", "red"]

    // Take et Drop
    const taken = LastElementExamples.take(numbers, 3); // [1, 2, 3]
    const dropped = LastElementExamples.drop(numbers, 2); // [3, 4, 5]

    // Mapping du dernier élément
    const mappedLast = LastElementExamples.mapLast(
        numbers, 
        (last) => last * 2
    ); // [1, 2, 3, 4, 10]

    // Append et Prepend
    const appended = LastElementExamples.append(colors, "yellow"); // ["red", "green", "blue", "yellow"]
    const prepended = LastElementExamples.prepend(numbers, 0); // [0, 1, 2, 3, 4, 5]

    // Analyse complète
    const analysis = LastElementExamples.analyzeTuple(myTuple);

    // Exemples avec paths
    const path = LastElementExamples.createPath("home", "user", "documents", "file.txt");
    const fileName = LastElementExamples.getFileName(path); // "file.txt"
    const parentDir = LastElementExamples.getParentDir(path); // ["home", "user", "documents"]
    const fullPath = LastElementExamples.joinPath(path); // "home/user/documents/file.txt"

    return {
        lastElement,
        lastColor,
        lastNumber,
        lastSafe,
        lastColorSafe,
        head,
        tail,
        allButLast,
        isEmpty,
        isNotEmpty,
        reversed,
        taken,
        dropped,
        mappedLast,
        appended,
        prepended,
        analysis,
        fileName,
        parentDir,
        fullPath
    };
}
