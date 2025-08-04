"use strict";
// ===== TYPES PRIMITIFS VS TYPES DE RÉFÉRENCE =====
// Guide complet de la différence entre types primitifs et types de référence
Object.defineProperty(exports, "__esModule", { value: true });
console.log('=== TYPES PRIMITIFS VS TYPES DE RÉFÉRENCE ===');
console.log('\n=== LES TYPES PRIMITIFS ===');
// 1. Les 7 types primitifs en JavaScript/TypeScript
console.log('Types primitifs en TypeScript:');
// String
const myString = "Bonjour TypeScript";
console.log(`String: ${myString} (type: ${typeof myString})`);
// Number
const myNumber = 42;
console.log(`Number: ${myNumber} (type: ${typeof myNumber})`);
// Boolean
const myBoolean = true;
console.log(`Boolean: ${myBoolean} (type: ${typeof myBoolean})`);
// Undefined
const myUndefined = undefined;
console.log(`Undefined: ${myUndefined} (type: ${typeof myUndefined})`);
// Null (attention: typeof null === "object" en JavaScript)
const myNull = null;
console.log(`Null: ${myNull} (type: ${typeof myNull})`);
// Symbol
const mySymbol = Symbol("identifiant");
console.log(`Symbol: ${mySymbol.toString()} (type: ${typeof mySymbol})`);
// BigInt
const myBigInt = 123456789012345678901234567890n;
console.log(`BigInt: ${myBigInt} (type: ${typeof myBigInt})`);
console.log('\n=== COMPORTEMENT DES TYPES PRIMITIFS ===');
// 2. Assignation par valeur avec les primitifs
let primitiveA = 10;
let primitiveB = primitiveA; // Copie de la valeur
console.log('Avant modification:');
console.log(`primitiveA: ${primitiveA}`);
console.log(`primitiveB: ${primitiveB}`);
primitiveB = 20; // Modification de primitiveB
console.log('Après modification de primitiveB:');
console.log(`primitiveA: ${primitiveA}`); // Reste inchangé
console.log(`primitiveB: ${primitiveB}`); // A changé
console.log('\n=== COMPARAISON DES PRIMITIFS ===');
// 3. Comparaison des valeurs primitives
const string1 = "test";
const string2 = "test";
const string3 = "TEST";
console.log(`"${string1}" == "${string2}":`, string1 == string2); // true
console.log(`"${string1}" === "${string2}":`, string1 === string2); // true
console.log(`"${string1}" === "${string3}":`, string1 === string3); // false
const num1 = 42;
const num2 = 42;
const num3 = 24;
console.log(`${num1} === ${num2}:`, num1 === num2); // true
console.log(`${num1} === ${num3}:`, num1 === num3); // false
console.log('\n=== LES TYPES DE RÉFÉRENCE ===');
// 4. Les types de référence (objets)
console.log('Types de référence en TypeScript:');
// Object
const myObject = { name: "Alice", age: 30 };
console.log('Object:', myObject, `(type: ${typeof myObject})`);
// Array
const myArray = [1, 2, 3, 4, 5];
console.log('Array:', myArray, `(type: ${typeof myArray})`);
// Function
const myFunction = function () { return "Hello"; };
console.log('Function:', myFunction.toString(), `(type: ${typeof myFunction})`);
// Date
const myDate = new Date();
console.log('Date:', myDate, `(type: ${typeof myDate})`);
console.log('\n=== COMPORTEMENT DES TYPES DE RÉFÉRENCE ===');
// 5. Assignation par référence avec les objets
const objetA = { nom: "Alice", age: 25 };
const objetB = objetA; // Copie de la référence, pas de la valeur
console.log('Avant modification:');
console.log('objetA:', objetA);
console.log('objetB:', objetB);
objetB.age = 26; // Modification via objetB
console.log('Après modification de objetB.age:');
console.log('objetA:', objetA); // A aussi changé !
console.log('objetB:', objetB);
console.log('objetA === objetB:', objetA === objetB); // true (même référence)
console.log('\n=== COMPARAISON DES TYPES DE RÉFÉRENCE ===');
// 6. Comparaison des objets (par référence)
const obj1 = { x: 1, y: 2 };
const obj2 = { x: 1, y: 2 }; // Même contenu mais référence différente
const obj3 = obj1; // Même référence
console.log('obj1:', obj1);
console.log('obj2:', obj2);
console.log('obj3 = obj1');
console.log('obj1 === obj2:', obj1 === obj2); // false (références différentes)
console.log('obj1 === obj3:', obj1 === obj3); // true (même référence)
// Même chose avec les tableaux
const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const array3 = array1;
console.log('array1 === array2:', array1 === array2); // false
console.log('array1 === array3:', array1 === array3); // true
console.log('\n=== MODIFICATION DES OBJETS ===');
// 7. Mutation des objets
const personne = {
    nom: "Bob",
    age: 30,
    adresse: {
        rue: "123 Main St",
        ville: "Paris"
    }
};
const copiePersonne = personne; // Référence
const autreCopie = personne; // Autre référence vers le même objet
console.log('Objet original:', personne);
// Modification via copiePersonne
copiePersonne.nom = "Robert";
autreCopie.adresse.ville = "Lyon";
console.log('Après modifications:');
console.log('personne:', personne);
console.log('copiePersonne:', copiePersonne);
console.log('autreCopie:', autreCopie);
console.log('\n=== FONCTIONS ET PASSAGE DE PARAMÈTRES ===');
// 8. Passage de paramètres primitifs vs référence
function modifierPrimitif(valeur) {
    valeur = valeur * 2;
    console.log('Dans la fonction, valeur =', valeur);
    return valeur;
}
function modifierObjet(obj) {
    obj.valeur = obj.valeur * 2;
    console.log('Dans la fonction, obj.valeur =', obj.valeur);
}
let nombrePrimitif = 10;
let objetAvecValeur = { valeur: 10 };
console.log('Avant appel des fonctions:');
console.log('nombrePrimitif:', nombrePrimitif);
console.log('objetAvecValeur:', objetAvecValeur);
modifierPrimitif(nombrePrimitif);
modifierObjet(objetAvecValeur);
console.log('Après appel des fonctions:');
console.log('nombrePrimitif:', nombrePrimitif); // Inchangé
console.log('objetAvecValeur:', objetAvecValeur); // Modifié
console.log('\n=== TECHNIQUES DE COPIE ===');
// 9. Différentes techniques de copie
const originalObj = {
    nom: "Charlie",
    age: 35,
    hobbies: ["lecture", "sport"],
    adresse: {
        rue: "456 Oak Ave",
        ville: "Marseille"
    }
};
// Copie superficielle (shallow copy)
const copieSup1 = { ...originalObj };
const copieSup2 = Object.assign({}, originalObj);
// Copie profonde (deep copy) - méthode simple
const copieProfonde = JSON.parse(JSON.stringify(originalObj));
console.log('Test des copies:');
// Modification du niveau supérieur
copieSup1.nom = "Charles";
copieProfonde.nom = "Chuck";
// Modification d'un objet imbriqué
copieSup1.adresse.ville = "Nice"; // Affecte l'original
copieProfonde.adresse.ville = "Toulouse"; // N'affecte pas l'original
// Modification d'un tableau
copieSup2.hobbies.push("musique"); // Affecte l'original
copieProfonde.hobbies.push("voyage"); // N'affecte pas l'original
console.log('Original après modifications:', originalObj);
console.log('Copie superficielle 1:', copieSup1);
console.log('Copie superficielle 2:', copieSup2);
console.log('Copie profonde:', copieProfonde);
console.log('\n=== IMMUTABILITÉ ===');
// 10. Techniques d'immutabilité
const etatInitial = {
    compteur: 0,
    utilisateurs: ["Alice", "Bob"],
    configuration: {
        theme: "dark",
        langue: "fr"
    }
};
// Modification immutable - retourne un nouvel objet
function incrementerCompteur(etat) {
    return {
        ...etat,
        compteur: etat.compteur + 1
    };
}
function ajouterUtilisateur(etat, nouvelUtilisateur) {
    return {
        ...etat,
        utilisateurs: [...etat.utilisateurs, nouvelUtilisateur]
    };
}
function changerTheme(etat, nouveauTheme) {
    return {
        ...etat,
        configuration: {
            ...etat.configuration,
            theme: nouveauTheme
        }
    };
}
console.log('État initial:', etatInitial);
const etat1 = incrementerCompteur(etatInitial);
console.log('Après incrément:', etat1);
const etat2 = ajouterUtilisateur(etat1, "Charlie");
console.log('Après ajout utilisateur:', etat2);
const etat3 = changerTheme(etat2, "light");
console.log('Après changement thème:', etat3);
console.log('État initial toujours intact:', etatInitial);
console.log('\n=== PERFORMANCE ET MÉMOIRE ===');
// 11. Considérations de performance
function demonstrationPerformance() {
    const debut = performance.now();
    // Création de nombreux primitifs
    const primitifs = [];
    for (let i = 0; i < 100000; i++) {
        primitifs.push(i);
    }
    const milieu = performance.now();
    // Création de nombreux objets
    const objets = [];
    for (let i = 0; i < 100000; i++) {
        objets.push({ id: i });
    }
    const fin = performance.now();
    console.log(`Création de 100k primitifs: ${(milieu - debut).toFixed(2)}ms`);
    console.log(`Création de 100k objets: ${(fin - milieu).toFixed(2)}ms`);
}
demonstrationPerformance();
console.log('\n=== VÉRIFICATION DE TYPES ===');
// 12. Vérification de types à l'exécution
function estPrimitif(valeur) {
    const type = typeof valeur;
    return type !== "object" && type !== "function";
}
function estObjet(valeur) {
    return valeur !== null && typeof valeur === "object";
}
const valeursTest = [
    42,
    "string",
    true,
    null,
    undefined,
    Symbol("test"),
    {},
    [],
    function () { },
    new Date()
];
console.log('Vérification des types:');
valeursTest.forEach(valeur => {
    console.log(`${String(valeur).padEnd(15)} | Primitif: ${estPrimitif(valeur).toString().padEnd(5)} | Objet: ${estObjet(valeur)}`);
});
console.log('\n=== BONNES PRATIQUES ===');
const bonnesPratiques = [
    "✅ Comprenez que les primitifs sont copiés par valeur",
    "✅ Les objets sont copiés par référence",
    "✅ Utilisez Object.freeze() pour l'immutabilité superficielle",
    "✅ Préférez les techniques immutables pour éviter les effets de bord",
    "✅ Utilisez spread operator pour les copies superficielles",
    "✅ JSON.parse(JSON.stringify()) pour copies profondes simples",
    "✅ Attention aux performances avec de nombreux objets",
    "✅ Documentez quand vous modifiez des objets passés en paramètre",
    "✅ Utilisez TypeScript readonly pour des types immutables",
    "✅ Testez vos fonctions pour éviter les mutations non désirées"
];
bonnesPratiques.forEach(pratique => console.log(pratique));
