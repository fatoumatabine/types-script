"use strict";
// 3. UNION DE TYPES
// =================
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculerAire = calculerAire;
// Fonction qui utilise les types union
function calculerAire(forme) {
    switch (forme.kind) {
        case "carre":
            return forme.taille * forme.taille;
        case "rectangle":
            return forme.largeur * forme.hauteur;
        case "cercle":
            return Math.PI * forme.rayon * forme.rayon;
        default:
            // TypeScript s'assure que tous les cas sont couverts
            const _exhaustive = forme;
            return _exhaustive;
    }
}
// Exemples d'utilisation
const valeur = "Hello"; // ou 42
const voiture = {
    type: "voiture",
    marque: "Peugeot",
    nbPortes: 4
};
const succes = {
    donnees: { nom: "Test" },
    erreur: null
};
const carre = { kind: "carre", taille: 5 };
const aire = calculerAire(carre);
console.log("Union de types:", { valeur, voiture, succes, aire });
//# sourceMappingURL=03-union-types.js.map