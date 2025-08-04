"use strict";
// 6. FONCTION GÉNÉRIQUE
// =====================
Object.defineProperty(exports, "__esModule", { value: true });
exports.identite = identite;
exports.cloner = cloner;
exports.echanger = echanger;
exports.obtenirLongueur = obtenirLongueur;
exports.obtenirPropriete = obtenirPropriete;
exports.creerTableau = creerTableau;
exports.mapper = mapper;
exports.filtrer = filtrer;
exports.estDefini = estDefini;
exports.aplatir = aplatir;
// Fonction générique simple
function identite(valeur) {
    return valeur;
}
// Fonction générique avec contraintes
function cloner(objet) {
    return { ...objet };
}
// Fonction générique avec plusieurs paramètres de type
function echanger(premier, second) {
    return [second, premier];
}
function obtenirLongueur(element) {
    return element.length;
}
// Fonction générique avec contraintes de clé
function obtenirPropriete(objet, cle) {
    return objet[cle];
}
// Fonction générique avec valeur par défaut
function creerTableau(longueur, valeurParDefaut) {
    return Array(longueur).fill(valeurParDefaut);
}
// Fonction générique pour mapper un tableau
function mapper(tableau, transformateur) {
    return tableau.map(transformateur);
}
// Fonction générique pour filtrer
function filtrer(tableau, predicat) {
    return tableau.filter(predicat);
}
// Fonction générique avec garde de type
function estDefini(valeur) {
    return valeur !== null && valeur !== undefined;
}
// Fonction générique récursive
function aplatir(tableau) {
    const resultat = [];
    for (const element of tableau) {
        if (Array.isArray(element)) {
            resultat.push(...aplatir(element));
        }
        else {
            resultat.push(element);
        }
    }
    return resultat;
}
// Exemples d'utilisation
console.log("Fonctions génériques:");
// Identité
const nombre = identite(42);
const texte = identite("Hello");
const objet = identite({ nom: "Test" });
// Cloner
const original = { nom: "Jean", age: 30 };
const copie = cloner(original);
// Échanger
const [b, a] = echanger("hello", 42);
// Longueur
const longueurTexte = obtenirLongueur("Hello World");
const longueurTableau = obtenirLongueur([1, 2, 3, 4, 5]);
// Propriété
const personne = { nom: "Marie", age: 25, ville: "Paris" };
const nom = obtenirPropriete(personne, "nom");
const age = obtenirPropriete(personne, "age");
// Créer tableau
const tableauNombres = creerTableau(5, 0);
const tableauTextes = creerTableau(3, "default");
// Mapper
const nombres = [1, 2, 3, 4, 5];
const carres = mapper(nombres, x => x * x);
const textes = mapper(nombres, x => `Nombre: ${x}`);
// Filtrer
const nombresPairs = filtrer(nombres, x => x % 2 === 0);
// Test de définition
const valeurs = [1, null, 2, undefined, 3];
const valeursdefinies = valeurs.filter(estDefini);
// Aplatir
const tableauNeste = [1, [2, 3], [4, [5, 6]]];
const tableauAplati = aplatir(tableauNeste);
console.log({
    nombre, texte, objet,
    original, copie,
    a, b,
    longueurTexte, longueurTableau,
    nom, age,
    tableauNombres, tableauTextes,
    carres, textes,
    nombresPairs,
    valeursdefinies,
    tableauAplati
});
//# sourceMappingURL=06-fonction-generique.js.map