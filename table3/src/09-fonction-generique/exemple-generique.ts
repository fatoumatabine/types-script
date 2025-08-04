/**
 * FONCTIONS GÉNÉRIQUES EN TYPESCRIPT
 * ==================================
 * 
 * Les génériques permettent de créer des fonctions réutilisables
 * qui fonctionnent avec différents types tout en conservant la sécurité de type
 */

// ✅ FONCTION GÉNÉRIQUE BASIQUE
function identite<T>(valeur: T): T {
    return valeur;
}

// ✅ FONCTION AVEC PLUSIEURS PARAMÈTRES GÉNÉRIQUES
function echanger<T, U>(premier: T, deuxieme: U): [U, T] {
    return [deuxieme, premier];
}

// ✅ FONCTION GÉNÉRIQUE AVEC TABLEAU
function premierElement<T>(tableau: T[]): T | undefined {
    return tableau.length > 0 ? tableau[0] : undefined;
}

function dernierElement<T>(tableau: T[]): T | undefined {
    return tableau.length > 0 ? tableau[tableau.length - 1] : undefined;
}

// ✅ FONCTION GÉNÉRIQUE AVEC CONTRAINTES
interface Longueur {
    length: number;
}

function afficherLongueur<T extends Longueur>(valeur: T): string {
    return `La longueur est: ${valeur.length}`;
}

// ✅ FONCTION GÉNÉRIQUE POUR FILTRAGE
function filtrer<T>(
    tableau: T[], 
    predicat: (element: T) => boolean
): T[] {
    const resultat: T[] = [];
    for (const element of tableau) {
        if (predicat(element)) {
            resultat.push(element);
        }
    }
    return resultat;
}

// ✅ FONCTION GÉNÉRIQUE POUR MAPPING
function mapper<T, U>(
    tableau: T[], 
    transformateur: (element: T) => U
): U[] {
    const resultat: U[] = [];
    for (const element of tableau) {
        resultat.push(transformateur(element));
    }
    return resultat;
}

// ✅ FONCTION GÉNÉRIQUE POUR RÉDUCTION
function reduire<T, U>(
    tableau: T[], 
    accumulateur: (acc: U, element: T) => U,
    valeurInitiale: U
): U {
    let resultat = valeurInitiale;
    for (const element of tableau) {
        resultat = accumulateur(resultat, element);
    }
    return resultat;
}

// ✅ FONCTION GÉNÉRIQUE AVEC KEYOF
function obtenirPropriete<T, K extends keyof T>(objet: T, cle: K): T[K] {
    return objet[cle];
}

function definirPropriete<T, K extends keyof T>(
    objet: T, 
    cle: K, 
    valeur: T[K]
): void {
    objet[cle] = valeur;
}

// ✅ FONCTION GÉNÉRIQUE POUR CLONAGE
function cloner<T>(objet: T): T {
    if (objet === null || typeof objet !== "object") {
        return objet;
    }
    
    if (objet instanceof Date) {
        return new Date(objet.getTime()) as T;
    }
    
    if (Array.isArray(objet)) {
        return objet.map(item => cloner(item)) as T;
    }
    
    const clone = {} as T;
    for (const cle in objet) {
        if (objet.hasOwnProperty(cle)) {
            clone[cle] = cloner(objet[cle]);
        }
    }
    return clone;
}

// ✅ FONCTION GÉNÉRIQUE AVEC TYPES CONDITIONNELS
type Deballer<T> = T extends Array<infer U> ? U : T;

function deballerSiTableau<T>(valeur: T): Deballer<T> {
    if (Array.isArray(valeur)) {
        return valeur[0] as Deballer<T>;
    }
    return valeur as Deballer<T>;
}

// ✅ FONCTION GÉNÉRIQUE POUR VALIDATION
interface Validateur<T> {
    valider(valeur: T): boolean;
    messageErreur: string;
}

function validerAvec<T>(
    valeur: T, 
    validateurs: Validateur<T>[]
): { valide: boolean; erreurs: string[] } {
    const erreurs: string[] = [];
    
    for (const validateur of validateurs) {
        if (!validateur.valider(valeur)) {
            erreurs.push(validateur.messageErreur);
        }
    }
    
    return {
        valide: erreurs.length === 0,
        erreurs
    };
}

// ✅ FONCTION GÉNÉRIQUE POUR COMPARAISON
function sontEgaux<T>(a: T, b: T): boolean {
    if (a === b) return true;
    
    if (a === null || b === null) return false;
    if (a === undefined || b === undefined) return false;
    
    if (typeof a !== typeof b) return false;
    
    if (typeof a === "object") {
        const clesA = Object.keys(a as object);
        const clesB = Object.keys(b as object);
        
        if (clesA.length !== clesB.length) return false;
        
        for (const cle of clesA) {
            if (!sontEgaux((a as any)[cle], (b as any)[cle])) {
                return false;
            }
        }
        return true;
    }
    
    return false;
}

// ✅ FONCTION GÉNÉRIQUE CURRY
function curry<T, U, V>(
    fn: (a: T, b: U) => V
): (a: T) => (b: U) => V {
    return (a: T) => (b: U) => fn(a, b);
}

// ✅ FONCTION GÉNÉRIQUE POUR COMPOSITION
function composer<T, U, V>(
    f: (x: T) => U,
    g: (x: U) => V
): (x: T) => V {
    return (x: T) => g(f(x));
}

// ✅ CLASSE GÉNÉRIQUE POUR CACHE
class Cache<K, V> {
    private donnees = new Map<K, V>();
    private maxTaille: number;

    constructor(maxTaille: number = 100) {
        this.maxTaille = maxTaille;
    }

    obtenirCache<T extends V>(cle: K): T | undefined {
        return this.donnees.get(cle) as T;
    }

    definirCache<T extends V>(cle: K, valeur: T): void {
        if (this.donnees.size >= this.maxTaille) {
            const premiereCle = this.donnees.keys().next().value;
            if (premiereCle !== undefined) {
                this.donnees.delete(premiereCle);
            }
        }
        this.donnees.set(cle, valeur);
    }

    viderCache(): void {
        this.donnees.clear();
    }

    obtenirTaille(): number {
        return this.donnees.size;
    }
}

// ✅ FONCTION GÉNÉRIQUE AVEC PROMESSES
async function retenterAsyncJusquaSucces<T>(
    operation: () => Promise<T>,
    maxTentatives: number = 3
): Promise<T> {
    let derniereErreur: any;
    
    for (let tentative = 1; tentative <= maxTentatives; tentative++) {
        try {
            return await operation();
        } catch (erreur) {
            derniereErreur = erreur;
            console.log(`Tentative ${tentative} échouée:`, erreur);
            
            if (tentative === maxTentatives) {
                throw derniereErreur;
            }
            
            // Attendre avant la prochaine tentative
            await new Promise(resolve => setTimeout(resolve, 1000 * tentative));
        }
    }
    
    throw derniereErreur;
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES FONCTIONS GÉNÉRIQUES ===");

// Test fonction identité
console.log(`Identité string: ${identite("Hello")}`);
console.log(`Identité number: ${identite(42)}`);
console.log(`Identité boolean: ${identite(true)}`);

// Test échange
const [a, b] = echanger("TypeScript", 2024);
console.log(`Échangé: ${a} (${typeof a}), ${b} (${typeof b})`);

// Test premier/dernier élément
const nombres = [1, 2, 3, 4, 5];
const mots = ["hello", "world", "typescript"];

console.log(`Premier nombre: ${premierElement(nombres)}`);
console.log(`Dernier mot: ${dernierElement(mots)}`);

// Test contraintes
console.log(afficherLongueur("Hello World"));
console.log(afficherLongueur([1, 2, 3, 4]));

// Test filtrage, mapping, réduction
const pairs = filtrer(nombres, n => n % 2 === 0);
console.log(`Nombres pairs: ${pairs}`);

const doubles = mapper(nombres, n => n * 2);
console.log(`Nombres doublés: ${doubles}`);

const somme = reduire(nombres, (acc, n) => acc + n, 0);
console.log(`Somme: ${somme}`);

// Test propriétés d'objets
interface Personne {
    nom: string;
    age: number;
    email: string;
}

const personne: Personne = {
    nom: "Alice",
    age: 30,
    email: "alice@example.com"
};

console.log(`Nom: ${obtenirPropriete(personne, "nom")}`);
definirPropriete(personne, "age", 31);
console.log(`Nouvel âge: ${personne.age}`);

// Test clonage
const copiePersonne = cloner(personne);
copiePersonne.nom = "Bob";
console.log(`Original: ${personne.nom}, Copie: ${copiePersonne.nom}`);

// Test déballage
console.log(`Déballer tableau: ${deballerSiTableau([1, 2, 3])}`);
console.log(`Déballer non-tableau: ${deballerSiTableau("Hello")}`);

// Test validation
const validateurAge: Validateur<number> = {
    valider: (age) => age >= 0 && age <= 120,
    messageErreur: "L'âge doit être entre 0 et 120"
};

const validateurPositif: Validateur<number> = {
    valider: (n) => n > 0,
    messageErreur: "Le nombre doit être positif"
};

const resultValidation = validerAvec(25, [validateurAge, validateurPositif]);
console.log(`Validation 25: ${resultValidation.valide ? "Valide" : "Invalide"}`);

const resultValidationInvalide = validerAvec(-5, [validateurAge, validateurPositif]);
console.log(`Validation -5: ${resultValidationInvalide.valide ? "Valide" : "Invalide"}`);
console.log(`Erreurs: ${resultValidationInvalide.erreurs.join(", ")}`);

// Test égalité
const obj1 = { a: 1, b: "test" };
const obj2 = { a: 1, b: "test" };
const obj3 = { a: 2, b: "test" };

console.log(`obj1 === obj2: ${sontEgaux(obj1, obj2)}`);
console.log(`obj1 === obj3: ${sontEgaux(obj1, obj3)}`);

// Test curry
const addition = (a: number, b: number) => a + b;
const additionCurry = curry(addition);
const ajouter5 = additionCurry(5);
console.log(`5 + 3 avec curry: ${ajouter5(3)}`);

// Test composition
const doubler = (x: number) => x * 2;
const ajouter1 = (x: number) => x + 1;
const doublerPuisAjouter = composer(doubler, ajouter1);
console.log(`(5 * 2) + 1 = ${doublerPuisAjouter(5)}`);

// Test cache
const cache = new Cache<string, any>(3);
cache.definirCache("user1", { nom: "Alice", age: 30 });
cache.definirCache("user2", { nom: "Bob", age: 25 });

const utilisateur = cache.obtenirCache<Personne>("user1");
console.log(`Utilisateur en cache: ${utilisateur?.nom}`);

// Test retry avec promesse
async function operationQuiPeutEchouer(): Promise<string> {
    if (Math.random() < 0.7) {
        throw new Error("Échec aléatoire");
    }
    return "Succès!";
}

retenterAsyncJusquaSucces(operationQuiPeutEchouer, 3)
    .then(resultat => console.log(`Résultat: ${resultat}`))
    .catch(erreur => console.log(`Échec final: ${erreur.message}`));

export {
    identite,
    echanger,
    premierElement,
    dernierElement,
    afficherLongueur,
    filtrer,
    mapper,
    reduire,
    obtenirPropriete,
    definirPropriete,
    cloner,
    deballerSiTableau,
    validerAvec,
    sontEgaux,
    curry,
    composer,
    Cache,
    retenterAsyncJusquaSucces
};
