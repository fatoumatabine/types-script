/**
 * TYPE FUNCTION EN TYPESCRIPT
 * ===========================
 * 
 * Les fonctions en TypeScript peuvent avoir des types définis pour:
 * - Les paramètres d'entrée
 * - La valeur de retour
 * - Le type de la fonction elle-même
 */

// ✅ FONCTION AVEC TYPES EXPLICITES
function additionner(a: number, b: number): number {
    return a + b;
}

// ✅ FONCTION AVEC TYPE DE FONCTION
let multiplier: (x: number, y: number) => number = function(x, y) {
    return x * y;
};

// ✅ FONCTION FLÈCHE AVEC TYPES
const diviser = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
};

// ✅ FONCTION SANS RETOUR (void)
function afficherMessage(message: string): void {
    console.log(`Message: ${message}`);
}

// ✅ FONCTION AVEC PARAMÈTRES OPTIONNELS
function saluer(nom: string, titre?: string): string {
    if (titre) {
        return `Bonjour ${titre} ${nom}`;
    }
    return `Bonjour ${nom}`;
}

// ✅ FONCTION AVEC PARAMÈTRES PAR DÉFAUT
function creerCompte(nom: string, age: number = 18): string {
    return `Compte créé pour ${nom}, âge: ${age}`;
}

// ✅ FONCTION AVEC PARAMÈTRES REST
function calculerMoyenne(...nombres: number[]): number {
    if (nombres.length === 0) return 0;
    const somme = nombres.reduce((acc, num) => acc + num, 0);
    return somme / nombres.length;
}

// ✅ TYPE DE FONCTION COMME PARAMÈTRE (Callback)
function executerOperation(a: number, b: number, operation: (x: number, y: number) => number): number {
    return operation(a, b);
}

// ✅ TYPE DE FONCTION AVEC INTERFACE
interface CalculatriceFunction {
    (a: number, b: number): number;
}

const soustraire: CalculatriceFunction = (a, b) => a - b;

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE FUNCTION ===");
console.log(`Addition 5 + 3 = ${additionner(5, 3)}`);
console.log(`Multiplication 4 × 6 = ${multiplier(4, 6)}`);
console.log(`Division 15 ÷ 3 = ${diviser(15, 3)}`);

afficherMessage("Ceci est un test");

console.log(saluer("Jean"));
console.log(saluer("Marie", "Mme"));

console.log(creerCompte("Paul"));
console.log(creerCompte("Sophie", 25));

console.log(`Moyenne de [1,2,3,4,5] = ${calculerMoyenne(1, 2, 3, 4, 5)}`);

console.log(`Opération avec callback = ${executerOperation(10, 5, soustraire)}`);

// ✅ FONCTION GÉNÉRIQUE
function identite<T>(valeur: T): T {
    return valeur;
}

console.log(`Identité string: ${identite("Hello")}`);
console.log(`Identité number: ${identite(42)}`);

export { 
    additionner, 
    multiplier, 
    diviser, 
    saluer, 
    creerCompte, 
    calculerMoyenne, 
    executerOperation,
    soustraire,
    identite
};
