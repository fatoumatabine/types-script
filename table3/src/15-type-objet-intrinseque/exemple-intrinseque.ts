/**
 * TYPES OBJETS INTRINSÈQUES EN TYPESCRIPT
 * =======================================
 * 
 * Les types objets intrinsèques sont des types built-in de JavaScript/TypeScript
 * comme Object, Array, Date, RegExp, Map, Set, etc.
 */

// ✅ TYPE OBJECT GLOBAL
function manipulerObjetGenerique(obj: Object): string {
    return Object.prototype.toString.call(obj);
}

function obtenirClesObjet(obj: object): string[] {
    return Object.keys(obj);
}

function clonerObjet<T extends object>(obj: T): T {
    return Object.assign({}, obj);
}

// ✅ TYPE ARRAY INTRINSÈQUE
function travaillerAvecArray(): void {
    // Array constructor
    const tableauVide = new Array<number>();
    const tableauTaille = new Array<string>(5);
    const tableauElements = new Array(1, 2, 3, 4, 5);

    // Array methods avec types
    const nombres: Array<number> = [1, 2, 3, 4, 5];
    const chaines: Array<string> = ["a", "b", "c"];
    
    console.log(`Longueur: ${nombres.length}`);
    console.log(`Premier: ${nombres[0]}`);
    console.log(`Dernier: ${nombres[nombres.length - 1]}`);
}

function methodesArray<T>(arr: Array<T>): Array<T> {
    // Méthodes qui modifient le tableau
    const copie = [...arr];
    copie.push({} as T);
    copie.pop();
    copie.shift();
    copie.unshift({} as T);
    
    // Méthodes qui retournent un nouveau tableau
    const filtre = arr.filter(() => true);
    const mappe = arr.map(item => item);
    const reduit = arr.reduce((acc, curr) => acc, [] as T[]);
    
    return copie;
}

// ✅ TYPE DATE INTRINSÈQUE
function travaillerAvecDates(): void {
    // Différentes façons de créer des dates
    const maintenant = new Date();
    const dateSpecifique = new Date('2024-01-15');
    const dateTimestamp = new Date(1640995200000);
    const dateConstructeur = new Date(2024, 0, 15, 10, 30, 0);

    console.log(`Maintenant: ${maintenant.toISOString()}`);
    console.log(`Année: ${maintenant.getFullYear()}`);
    console.log(`Mois: ${maintenant.getMonth() + 1}`); // +1 car commence à 0
    console.log(`Jour: ${maintenant.getDate()}`);
}

function calculerAge(dateNaissance: Date): number {
    const maintenant = new Date();
    const diffMs = maintenant.getTime() - dateNaissance.getTime();
    const diffAnnees = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffAnnees);
}

function formaterDate(date: Date, locale: string = 'fr-FR'): string {
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// ✅ TYPE REGEXP INTRINSÈQUE
function travaillerAvecRegExp(): void {
    // Différentes façons de créer des RegExp
    const regex1 = new RegExp('\\d+', 'g');
    const regex2 = /\d+/g;
    const regex3 = new RegExp('[a-zA-Z]+', 'i');

    const texte = "J'ai 25 ans et je mesure 175cm";
    
    // Méthodes RegExp
    console.log(`Test: ${regex1.test(texte)}`);
    console.log(`Exec: ${regex2.exec(texte)}`);
    
    // Méthodes String avec RegExp
    console.log(`Match: ${texte.match(/\d+/g)}`);
    console.log(`Replace: ${texte.replace(/\d+/g, 'X')}`);
    console.log(`Split: ${texte.split(/\s+/)}`);
}

function validerAvecRegex(valeur: string, pattern: RegExp): boolean {
    return pattern.test(valeur);
}

function extraireNumeros(texte: string): number[] {
    const regex = /\d+/g;
    const matches = texte.match(regex);
    return matches ? matches.map(Number) : [];
}

// ✅ TYPE MAP INTRINSÈQUE
function travaillerAvecMap<K, V>(): Map<K, V> {
    const map = new Map<K, V>();
    
    // Méthodes Map
    // map.set(key, value);
    // map.get(key);
    // map.has(key);
    // map.delete(key);
    // map.clear();
    
    return map;
}

function creerCompteur<T>(elements: T[]): Map<T, number> {
    const compteur = new Map<T, number>();
    
    elements.forEach(element => {
        const count = compteur.get(element) || 0;
        compteur.set(element, count + 1);
    });
    
    return compteur;
}

function mapVersObjet<K extends string | number | symbol, V>(map: Map<K, V>): Record<K, V> {
    const obj = {} as Record<K, V>;
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}

// ✅ TYPE SET INTRINSÈQUE
function travaillerAvecSet<T>(): Set<T> {
    const set = new Set<T>();
    
    // Méthodes Set
    // set.add(value);
    // set.has(value);
    // set.delete(value);
    // set.clear();
    
    return set;
}

function supprimerDoublons<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

function intersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    return new Set([...set1].filter(x => set2.has(x)));
}

function union<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    return new Set([...set1, ...set2]);
}

function difference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
    return new Set([...set1].filter(x => !set2.has(x)));
}

// ✅ TYPE PROMISE INTRINSÈQUE
async function travaillerAvecPromises(): Promise<void> {
    // Création de promesses
    const promesse1 = new Promise<number>((resolve) => {
        setTimeout(() => resolve(42), 1000);
    });

    const promesse2 = Promise.resolve("Immédiat");
    const promesse3 = Promise.reject(new Error("Erreur"));

    try {
        // Méthodes Promise
        const resultats = await Promise.all([promesse1, promesse2]);
        console.log(`Promise.all: ${resultats}`);

        const premierResultat = await Promise.race([promesse1, promesse2]);
        console.log(`Promise.race: ${premierResultat}`);

        const tousResultats = await Promise.allSettled([promesse1, promesse2, promesse3]);
        console.log(`Promise.allSettled: ${tousResultats.length} résultats`);
    } catch (error) {
        console.error(`Erreur: ${error}`);
    }
}

function creerPromiseAvecTimeout<T>(valeur: T, delai: number): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(valeur), delai);
    });
}

// ✅ TYPE ERROR INTRINSÈQUE
function travaillerAvecError(): void {
    // Différents types d'erreurs
    const erreurGenerique = new Error("Message d'erreur");
    const erreurType = new TypeError("Type incorrect");
    const erreurReference = new ReferenceError("Référence non définie");
    const erreurRange = new RangeError("Valeur hors limites");

    console.log(`Error name: ${erreurGenerique.name}`);
    console.log(`Error message: ${erreurGenerique.message}`);
    console.log(`Error stack: ${erreurGenerique.stack}`);
}

class ErreurPersonnalisee extends Error {
    public code: number;
    public timestamp: Date;

    constructor(message: string, code: number = 500) {
        super(message);
        this.name = 'ErreurPersonnalisee';
        this.code = code;
        this.timestamp = new Date();
        
        // Maintenir la stack trace (seulement en V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErreurPersonnalisee);
        }
    }
}

// ✅ TYPE JSON INTRINSÈQUE
function travaillerAvecJSON(): void {
    const objet = {
        nom: "TypeScript",
        version: 5.0,
        features: ["types", "generics", "interfaces"],
        config: { strict: true }
    };

    // Sérialisation
    const json = JSON.stringify(objet, null, 2);
    console.log(`JSON: ${json}`);

    // Désérialisation
    const parsed = JSON.parse(json);
    console.log(`Parsed: ${parsed.nom}`);

    // Avec replacer/reviver
    const jsonAvecReplacer = JSON.stringify(objet, ['nom', 'version']);
    console.log(`JSON filtré: ${jsonAvecReplacer}`);
}

function serialiserAvecDates(obj: any): string {
    return JSON.stringify(obj, (key, value) => {
        if (value instanceof Date) {
            return { __type: 'Date', value: value.toISOString() };
        }
        return value;
    });
}

function deserialiserAvecDates(json: string): any {
    return JSON.parse(json, (key, value) => {
        if (value && value.__type === 'Date') {
            return new Date(value.value);
        }
        return value;
    });
}

// ✅ TYPE WEAKMAP ET WEAKSET
function travaillerAvecWeakMap(): void {
    const weakMap = new WeakMap<object, string>();
    const weakSet = new WeakSet<object>();

    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    // WeakMap - clés doivent être des objets
    weakMap.set(obj1, "Valeur pour obj1");
    weakMap.set(obj2, "Valeur pour obj2");

    console.log(`WeakMap has obj1: ${weakMap.has(obj1)}`);
    console.log(`WeakMap get obj1: ${weakMap.get(obj1)}`);

    // WeakSet - valeurs doivent être des objets
    weakSet.add(obj1);
    weakSet.add(obj2);

    console.log(`WeakSet has obj1: ${weakSet.has(obj1)}`);
}

// ✅ CLASSE UTILITAIRE POUR TYPES INTRINSÈQUES
class TypesIntrinsèques {
    static obtenirType(valeur: unknown): string {
        if (valeur === null) return 'null';
        if (valeur === undefined) return 'undefined';
        
        const type = typeof valeur;
        if (type === 'object') {
            return Object.prototype.toString.call(valeur).slice(8, -1);
        }
        return type;
    }

    static estArray(valeur: unknown): valeur is Array<any> {
        return Array.isArray(valeur);
    }

    static estDate(valeur: unknown): valeur is Date {
        return valeur instanceof Date;
    }

    static estRegExp(valeur: unknown): valeur is RegExp {
        return valeur instanceof RegExp;
    }

    static estMap(valeur: unknown): valeur is Map<any, any> {
        return valeur instanceof Map;
    }

    static estSet(valeur: unknown): valeur is Set<any> {
        return valeur instanceof Set;
    }

    static estPromise(valeur: unknown): valeur is Promise<any> {
        return valeur instanceof Promise;
    }

    static estError(valeur: unknown): valeur is Error {
        return valeur instanceof Error;
    }

    static clonerProfond<T>(obj: T): T {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Date) {
            return new Date(obj.getTime()) as T;
        }

        if (obj instanceof Array) {
            return obj.map(item => this.clonerProfond(item)) as T;
        }

        if (obj instanceof Map) {
            const cloneMap = new Map();
            obj.forEach((value, key) => {
                cloneMap.set(key, this.clonerProfond(value));
            });
            return cloneMap as T;
        }

        if (obj instanceof Set) {
            const cloneSet = new Set();
            obj.forEach(value => {
                cloneSet.add(this.clonerProfond(value));
            });
            return cloneSet as T;
        }

        const cloneObj = {} as T;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloneObj[key] = this.clonerProfond(obj[key]);
            }
        }

        return cloneObj;
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPES INTRINSÈQUES ===");

// Test Object
const objetTest = { nom: "Test", valeur: 42 };
console.log(`Type objet: ${manipulerObjetGenerique(objetTest)}`);
console.log(`Clés: [${obtenirClesObjet(objetTest).join(", ")}]`);

// Test Array
const tableau = [1, 2, 3, 4, 5];
methodesArray(tableau);
console.log(`Tableau modifié: [${tableau.join(", ")}]`);

// Test Date
const dateNaissance = new Date('1990-05-15');
const age = calculerAge(dateNaissance);
const dateFormatee = formaterDate(new Date());
console.log(`Âge: ${age} ans`);
console.log(`Date formatée: ${dateFormatee}`);

// Test RegExp
const email = "test@example.com";
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValide = validerAvecRegex(email, regexEmail);
console.log(`Email valide: ${emailValide}`);

const texteAvecNombres = "J'ai 25 ans, je mesure 175cm et pèse 70kg";
const nombres = extraireNumeros(texteAvecNombres);
console.log(`Nombres extraits: [${nombres.join(", ")}]`);

// Test Map
const fruits = ["pomme", "banane", "pomme", "orange", "banane"];
const compteurFruits = creerCompteur(fruits);
console.log(`Compteur pommes: ${compteurFruits.get("pomme")}`);

const objetCompteur = mapVersObjet(compteurFruits);
console.log(`Objet compteur:`, objetCompteur);

// Test Set
const tableauAvecDoublons = [1, 2, 2, 3, 3, 3, 4, 5];
const sansDoublons = supprimerDoublons(tableauAvecDoublons);
console.log(`Sans doublons: [${sansDoublons.join(", ")}]`);

const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);
const intersectionSets = intersection(set1, set2);
console.log(`Intersection: [${Array.from(intersectionSets).join(", ")}]`);

// Test Promise
travaillerAvecPromises();

creerPromiseAvecTimeout("Résultat", 100).then(resultat => {
    console.log(`Promise avec timeout: ${resultat}`);
});

// Test Error
try {
    throw new ErreurPersonnalisee("Test d'erreur personnalisée", 404);
} catch (error) {
    if (error instanceof ErreurPersonnalisee) {
        console.log(`Erreur: ${error.message}, Code: ${error.code}, Date: ${error.timestamp}`);
    }
}

// Test JSON
const objetAvecDate = {
    nom: "Test",
    date: new Date(),
    valeur: 42
};

const jsonAvecDates = serialiserAvecDates(objetAvecDate);
console.log(`JSON avec dates: ${jsonAvecDates}`);

const objetRestore = deserialiserAvecDates(jsonAvecDates);
console.log(`Date restaurée: ${objetRestore.date instanceof Date}`);

// Test WeakMap/WeakSet
travaillerAvecWeakMap();

// Test classe utilitaire
const valeurs = [
    "string",
    42,
    true,
    null,
    undefined,
    [],
    {},
    new Date(),
    /regex/,
    new Map(),
    new Set(),
    Promise.resolve(),
    new Error()
];

valeurs.forEach(valeur => {
    console.log(`${JSON.stringify(valeur)} est de type: ${TypesIntrinsèques.obtenirType(valeur)}`);
});

// Test clonage profond
const objetComplexe = {
    nom: "Test",
    date: new Date(),
    tableau: [1, 2, { a: 3 }],
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3])
};

const clone = TypesIntrinsèques.clonerProfond(objetComplexe);
console.log(`Clonage réussi: ${clone.nom === objetComplexe.nom && clone !== objetComplexe}`);

export {
    manipulerObjetGenerique,
    obtenirClesObjet,
    clonerObjet,
    travaillerAvecArray,
    methodesArray,
    travaillerAvecDates,
    calculerAge,
    formaterDate,
    travaillerAvecRegExp,
    validerAvecRegex,
    extraireNumeros,
    travaillerAvecMap,
    creerCompteur,
    mapVersObjet,
    travaillerAvecSet,
    supprimerDoublons,
    intersection,
    union,
    difference,
    travaillerAvecPromises,
    creerPromiseAvecTimeout,
    travaillerAvecError,
    ErreurPersonnalisee,
    travaillerAvecJSON,
    serialiserAvecDates,
    deserialiserAvecDates,
    travaillerAvecWeakMap,
    TypesIntrinsèques
};
