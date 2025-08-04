/**
 * FONCTIONS AVEC VALEURS DE RETOUR EN TYPESCRIPT
 * ==============================================
 * 
 * - Types de retour explicites et implicites
 * - Fonctions avec différents types de retour
 * - Génériques dans les retours
 * - Promesses et async/await
 */

// ✅ FONCTIONS AVEC TYPES DE RETOUR SIMPLES
function additionner(a: number, b: number): number {
    return a + b;
}

function concatener(str1: string, str2: string): string {
    return str1 + str2;
}

function estPair(nombre: number): boolean {
    return nombre % 2 === 0;
}

function obtenirDate(): Date {
    return new Date();
}

function creerTableau(taille: number): number[] {
    return Array.from({ length: taille }, (_, i) => i + 1);
}

// ✅ FONCTIONS AVEC TYPES DE RETOUR D'UNION
function diviser(a: number, b: number): number | string {
    if (b === 0) {
        return "Division par zéro impossible";
    }
    return a / b;
}

function trouverElement<T>(tableau: T[], predicat: (item: T) => boolean): T | undefined {
    return tableau.find(predicat);
}

function convertirEnNombre(valeur: string): number | null {
    const nombre = parseFloat(valeur);
    return isNaN(nombre) ? null : nombre;
}

function obtenirMessage(type: "succes" | "erreur" | "info"): string {
    switch (type) {
        case "succes":
            return "Opération réussie !";
        case "erreur":
            return "Une erreur s'est produite";
        case "info":
            return "Information importante";
        default:
            return "Message inconnu";
    }
}

// ✅ FONCTIONS AVEC OBJETS EN RETOUR
interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    actif: boolean;
}

interface ResultatOperation {
    succes: boolean;
    message: string;
    donnees?: any;
}

function creerUtilisateur(nom: string, email: string): Utilisateur {
    return {
        id: Math.floor(Math.random() * 10000),
        nom,
        email,
        actif: true
    };
}

function validerEmail(email: string): ResultatOperation {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regex.test(email)) {
        return {
            succes: true,
            message: "Email valide",
            donnees: { email }
        };
    }
    
    return {
        succes: false,
        message: "Format d'email invalide"
    };
}

function analyserTexte(texte: string): { mots: number; caracteres: number; lignes: number } {
    const lignes = texte.split('\n').length;
    const mots = texte.trim() ? texte.trim().split(/\s+/).length : 0;
    const caracteres = texte.length;
    
    return { mots, caracteres, lignes };
}

// ✅ FONCTIONS GÉNÉRIQUES AVEC RETOUR
function premier<T>(tableau: T[]): T | undefined {
    return tableau[0];
}

function dernier<T>(tableau: T[]): T | undefined {
    return tableau[tableau.length - 1];
}

function transformer<T, U>(valeur: T, transformateur: (item: T) => U): U {
    return transformateur(valeur);
}

function filtrerEtTransformer<T, U>(
    tableau: T[],
    filtre: (item: T) => boolean,
    transformateur: (item: T) => U
): U[] {
    return tableau.filter(filtre).map(transformateur);
}

function creerPaire<T, U>(premier: T, second: U): { premier: T; second: U } {
    return { premier, second };
}

function echangerPaire<T, U>(paire: { premier: T; second: U }): { premier: U; second: T } {
    return { premier: paire.second, second: paire.premier };
}

// ✅ FONCTIONS AVEC RETOUR CONDITIONNEL
function obtenirValeurOuDefaut<T>(valeur: T | null | undefined, defaut: T): T {
    return valeur ?? defaut;
}

function estValide<T>(
    valeur: T,
    validateur: (item: T) => boolean
): { valide: boolean; valeur: T } {
    return {
        valide: validateur(valeur),
        valeur
    };
}

function executerAvecGestionErreur<T>(
    operation: () => T
): { succes: boolean; resultat?: T; erreur?: string } {
    try {
        const resultat = operation();
        return { succes: true, resultat };
    } catch (error) {
        return {
            succes: false,
            erreur: error instanceof Error ? error.message : "Erreur inconnue"
        };
    }
}

function obtenirOuCreer<T>(
    cache: Map<string, T>,
    cle: string,
    createur: () => T
): T {
    const valeurExistante = cache.get(cle);
    if (valeurExistante !== undefined) {
        return valeurExistante;
    }
    
    const nouvelleValeur = createur();
    cache.set(cle, nouvelleValeur);
    return nouvelleValeur;
}

// ✅ FONCTIONS ASYNCHRONES AVEC PROMESSES
async function obtenirDonneesUtilisateur(id: number): Promise<Utilisateur | null> {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (id > 0) {
        return {
            id,
            nom: `Utilisateur${id}`,
            email: `user${id}@example.com`,
            actif: true
        };
    }
    
    return null;
}

async function sauvegarderUtilisateur(utilisateur: Utilisateur): Promise<ResultatOperation> {
    try {
        // Simulation de sauvegarde
        await new Promise(resolve => setTimeout(resolve, 200));
        
        return {
            succes: true,
            message: "Utilisateur sauvegardé avec succès",
            donnees: { id: utilisateur.id }
        };
    } catch (error) {
        return {
            succes: false,
            message: "Erreur lors de la sauvegarde"
        };
    }
}

async function traiterListeUtilisateurs(ids: number[]): Promise<Utilisateur[]> {
    const promesses = ids.map(id => obtenirDonneesUtilisateur(id));
    const resultats = await Promise.all(promesses);
    
    return resultats.filter((utilisateur): utilisateur is Utilisateur => 
        utilisateur !== null
    );
}

async function executerEnParallele<T>(
    operations: (() => Promise<T>)[]
): Promise<{ resultats: T[]; erreurs: string[] }> {
    const promesses = operations.map(async (operation, index) => {
        try {
            const resultat = await operation();
            return { succes: true, resultat, index };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erreur inconnue";
            return { succes: false, erreur: `Opération ${index}: ${message}`, index };
        }
    });
    
    const resultats = await Promise.all(promesses);
    
    return {
        resultats: resultats
            .filter(r => r.succes)
            .map(r => (r as any).resultat),
        erreurs: resultats
            .filter(r => !r.succes)
            .map(r => (r as any).erreur)
    };
}

// ✅ FONCTIONS D'ORDRE SUPÉRIEUR
function creerComparateur<T>(
    obtenirValeur: (item: T) => number | string
): (a: T, b: T) => number {
    return (a: T, b: T) => {
        const valeurA = obtenirValeur(a);
        const valeurB = obtenirValeur(b);
        
        if (typeof valeurA === "number" && typeof valeurB === "number") {
            return valeurA - valeurB;
        }
        
        return String(valeurA).localeCompare(String(valeurB));
    };
}

function creerValidateur<T>(
    regles: ((item: T) => boolean)[]
): (item: T) => { valide: boolean; erreurs: string[] } {
    return (item: T) => {
        const erreurs: string[] = [];
        
        regles.forEach((regle, index) => {
            if (!regle(item)) {
                erreurs.push(`Règle ${index + 1} échouée`);
            }
        });
        
        return {
            valide: erreurs.length === 0,
            erreurs
        };
    };
}

function creerTransformateur<T, U>(
    transformations: ((item: T) => T)[]
): (item: T) => T {
    return (item: T) => {
        return transformations.reduce((valeur, transformation) => 
            transformation(valeur), item
        );
    };
}

function composer<T>(...fonctions: ((arg: T) => T)[]): (arg: T) => T {
    return (arg: T) => {
        return fonctions.reduce((valeur, fonction) => fonction(valeur), arg);
    };
}

// ✅ CLASSES AVEC MÉTHODES RETOURNANT DIFFÉRENTS TYPES
class CalculatriceAvancee {
    private historique: string[] = [];
    
    additionner(a: number, b: number): number {
        const resultat = a + b;
        this.historique.push(`${a} + ${b} = ${resultat}`);
        return resultat;
    }
    
    diviserSecure(a: number, b: number): { succes: boolean; resultat?: number; erreur?: string } {
        if (b === 0) {
            return {
                succes: false,
                erreur: "Division par zéro"
            };
        }
        
        const resultat = a / b;
        this.historique.push(`${a} / ${b} = ${resultat}`);
        
        return {
            succes: true,
            resultat
        };
    }
    
    obtenirHistorique(): readonly string[] {
        return [...this.historique];
    }
    
    obtenirStatistiques(): { nombreOperations: number; derniereOperation?: string } {
        return {
            nombreOperations: this.historique.length,
            derniereOperation: this.historique[this.historique.length - 1]
        };
    }
    
    reinitialiser(): this {
        this.historique = [];
        return this;
    }
    
    clone(): CalculatriceAvancee {
        const clone = new CalculatriceAvancee();
        clone.historique = [...this.historique];
        return clone;
    }
}

// ✅ FACTORY FUNCTIONS
function creerConfigurationDefaut(): Configuration {
    return {
        debug: false,
        timeout: 5000,
        retries: 3,
        url: "https://api.example.com"
    };
}

interface Configuration {
    debug: boolean;
    timeout: number;
    retries: number;
    url: string;
}

function creerConfigurationPersonnalisee(
    options: Partial<Configuration>
): Configuration {
    return {
        ...creerConfigurationDefaut(),
        ...options
    };
}

function creerConnexionAPI(config: Configuration): {
    get: (endpoint: string) => Promise<any>;
    post: (endpoint: string, data: any) => Promise<any>;
    configuration: Configuration;
} {
    return {
        async get(endpoint: string) {
            console.log(`GET ${config.url}${endpoint}`);
            // Simulation d'appel API
            await new Promise(resolve => setTimeout(resolve, config.timeout));
            return { status: 200, data: {} };
        },
        
        async post(endpoint: string, data: any) {
            console.log(`POST ${config.url}${endpoint}`, data);
            // Simulation d'appel API
            await new Promise(resolve => setTimeout(resolve, config.timeout));
            return { status: 201, data: { id: Math.random() } };
        },
        
        configuration: { ...config }
    };
}

// ✅ CURRYING ET FONCTIONS PARTIELLES
function multiplier(a: number): (b: number) => number {
    return (b: number) => a * b;
}

function creerFormateur(prefixe: string): (message: string) => string {
    return (message: string) => `${prefixe}: ${message}`;
}

function creerFiltreur<T>(predicat: (item: T) => boolean): (tableau: T[]) => T[] {
    return (tableau: T[]) => tableau.filter(predicat);
}

function applicationPartielle<T, U, V>(
    fn: (a: T, b: U) => V,
    premierArg: T
): (b: U) => V {
    return (b: U) => fn(premierArg, b);
}

// ✅ MEMOIZATION
function memoiser<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map();
    
    return ((...args: Parameters<T>): ReturnType<T> => {
        const cle = JSON.stringify(args);
        
        if (cache.has(cle)) {
            return cache.get(cle);
        }
        
        const resultat = fn(...args);
        cache.set(cle, resultat);
        return resultat;
    }) as T;
}

// Fonction coûteuse à mémoriser
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibonacciMemorise = memoiser(fibonacci);

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES FONCTIONS AVEC RETOUR ===");

// Test des fonctions simples
const somme = additionner(5, 3);
const texte = concatener("Hello", " World");
const pairVerification = estPair(4);

console.log(`Somme: ${somme}`);
console.log(`Texte: ${texte}`);
console.log(`4 est pair: ${pairVerification}`);

// Test des fonctions avec union types
const resultatDivision = diviser(10, 2);
const resultatDivisionErreur = diviser(10, 0);
console.log(`Division réussie: ${resultatDivision}`);
console.log(`Division échouée: ${resultatDivisionErreur}`);

// Test avec objets
const nouvelUtilisateur = creerUtilisateur("Jean Dupont", "jean@example.com");
console.log("Nouvel utilisateur:", nouvelUtilisateur);

const validationEmail = validerEmail("test@example.com");
const validationEmailInvalide = validerEmail("email-invalide");
console.log("Validation email valide:", validationEmail);
console.log("Validation email invalide:", validationEmailInvalide);

// Test des génériques
const nombres = [1, 2, 3, 4, 5];
const premierNombre = premier(nombres);
const dernierNombre = dernier(nombres);
console.log(`Premier: ${premierNombre}, Dernier: ${dernierNombre}`);

const paire = creerPaire("Hello", 42);
const paireEchangee = echangerPaire(paire);
console.log("Paire originale:", paire);
console.log("Paire échangée:", paireEchangee);

// Test des fonctions d'ordre supérieur
const multiplierPar2 = multiplier(2);
const multiplierPar10 = multiplier(10);
console.log(`5 × 2 = ${multiplierPar2(5)}`);
console.log(`5 × 10 = ${multiplierPar10(5)}`);

const formateurErreur = creerFormateur("ERREUR");
const formateurInfo = creerFormateur("INFO");
console.log(formateurErreur("Quelque chose s'est mal passé"));
console.log(formateurInfo("Opération réussie"));

// Test de la calculatrice
const calc = new CalculatriceAvancee();
calc.additionner(5, 3);
calc.additionner(10, 7);

const divisionResult = calc.diviserSecure(15, 3);
const divisionErreur = calc.diviserSecure(10, 0);

console.log("Division réussie:", divisionResult);
console.log("Division échoué:", divisionErreur);

const stats = calc.obtenirStatistiques();
console.log("Statistiques calculatrice:", stats);

// Test de mémorisation
console.log("Fibonacci sans mémorisation:");
console.time("fibonacci-normal");
const fib1 = fibonacci(35);
console.timeEnd("fibonacci-normal");
console.log(`Fibonacci(35) = ${fib1}`);

console.log("Fibonacci avec mémorisation:");
console.time("fibonacci-memorise");
const fib2 = fibonacciMemorise(35);
console.timeEnd("fibonacci-memorise");
console.log(`Fibonacci mémorisé(35) = ${fib2}`);

// Test d'execution avec gestion d'erreur
const operationReussie = executerAvecGestionErreur(() => {
    return "Opération réussie";
});

const operationEchouee = executerAvecGestionErreur(() => {
    throw new Error("Erreur simulée");
});

console.log("Opération réussie:", operationReussie);
console.log("Opération échouée:", operationEchouee);

// Test des factory functions
const configDefaut = creerConfigurationDefaut();
const configPersonnalisee = creerConfigurationPersonnalisee({
    debug: true,
    timeout: 10000
});

console.log("Config par défaut:", configDefaut);
console.log("Config personnalisée:", configPersonnalisee);

// Test des promesses
(async () => {
    console.log("=== TESTS ASYNCHRONES ===");
    
    const utilisateur = await obtenirDonneesUtilisateur(123);
    console.log("Utilisateur récupéré:", utilisateur);
    
    if (utilisateur) {
        const sauvegarde = await sauvegarderUtilisateur(utilisateur);
        console.log("Résultat sauvegarde:", sauvegarde);
    }
    
    const utilisateurs = await traiterListeUtilisateurs([1, 2, 3, 4, 5]);
    console.log(`${utilisateurs.length} utilisateurs traités`);
    
    const operationsParalleles = await executerEnParallele([
        async () => "Opération 1",
        async () => "Opération 2",
        async () => {
            throw new Error("Opération 3 échouée");
        },
        async () => "Opération 4"
    ]);
    
    console.log("Résultats parallèles:", operationsParalleles.resultats);
    console.log("Erreurs parallèles:", operationsParalleles.erreurs);
})();

// Test de composition de fonctions
const ajouterUn = (n: number) => n + 1;
const multiplierParDeux = (n: number) => n * 2;
const mettreAuCarre = (n: number) => n * n;

const transformation = composer(ajouterUn, multiplierParDeux, mettreAuCarre);
const resultatComposition = transformation(3); // ((3 + 1) * 2)² = 64
console.log(`Composition f(3) = ${resultatComposition}`);

export {
    additionner,
    concatener,
    estPair,
    obtenirDate,
    creerTableau,
    diviser,
    trouverElement,
    convertirEnNombre,
    obtenirMessage,
    creerUtilisateur,
    validerEmail,
    analyserTexte,
    premier,
    dernier,
    transformer,
    filtrerEtTransformer,
    creerPaire,
    echangerPaire,
    obtenirValeurOuDefaut,
    estValide,
    executerAvecGestionErreur,
    obtenirOuCreer,
    obtenirDonneesUtilisateur,
    sauvegarderUtilisateur,
    traiterListeUtilisateurs,
    executerEnParallele,
    creerComparateur,
    creerValidateur,
    creerTransformateur,
    composer,
    CalculatriceAvancee,
    creerConfigurationDefaut,
    creerConfigurationPersonnalisee,
    creerConnexionAPI,
    multiplier,
    creerFormateur,
    creerFiltreur,
    applicationPartielle,
    memoiser,
    fibonacci,
    fibonacciMemorise
};
