/**
 * TYPE NUMBER EN TYPESCRIPT
 * ========================
 * 
 * Le type 'number' représente tous les nombres (entiers et décimaux)
 * TypeScript utilise le même type pour les entiers et les nombres à virgule flottante
 */

// ✅ DÉCLARATIONS EXPLICITES
let age: number = 25;
let prix: number = 19.99;
let negatif: number = -42;
let scientifique: number = 1.23e-4;

// ✅ DÉCLARATIONS IMPLICITES (TypeScript infère le type)
let compteur = 0; // TypeScript sait que c'est un number
let total = 100.5; // TypeScript sait que c'est un number

// ✅ OPÉRATIONS MATHÉMATIQUES
function calculerSomme(a: number, b: number): number {
    return a + b;
}

function calculerPourcentage(valeur: number, pourcentage: number): number {
    return (valeur * pourcentage) / 100;
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE NUMBER ===");
console.log(`Age: ${age}`);
console.log(`Prix: ${prix}€`);
console.log(`Somme 10 + 5 = ${calculerSomme(10, 5)}`);
console.log(`20% de 150 = ${calculerPourcentage(150, 20)}`);

// ✅ VALEURS SPÉCIALES
let infini: number = Infinity;
let infiniNegatif: number = -Infinity;
let paUnNombre: number = NaN; // Not a Number

console.log(`Infini: ${infini}`);
console.log(`Pas un nombre: ${paUnNombre}`);

// ✅ VÉRIFICATIONS
function estUnNombreValide(valeur: number): boolean {
    return !isNaN(valeur) && isFinite(valeur);
}

console.log(`5 est valide: ${estUnNombreValide(5)}`);
console.log(`NaN est valide: ${estUnNombreValide(NaN)}`);

// ❌ ERREURS COMMUNES (décommentez pour voir les erreurs)
// let erreur: number = "123"; // Erreur: Type 'string' is not assignable to type 'number'
// let autreErreur: number = true; // Erreur: Type 'boolean' is not assignable to type 'number'

export { age, prix, calculerSomme, calculerPourcentage };
