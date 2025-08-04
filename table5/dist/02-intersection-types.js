"use strict";
// 2. INTERSECTION DE TYPES
// ========================
Object.defineProperty(exports, "__esModule", { value: true });
// Exemples d'utilisation
const entite = {
    id: 1,
    nom: "Mon Entité",
    dateCreation: new Date()
};
const employe = {
    id: 1,
    nom: "Marie Martin",
    poste: "Développeuse",
    salaire: 50000,
    dateCreation: new Date(),
    departement: "IT",
    competences: ["TypeScript", "React", "Node.js"]
};
console.log("Intersection de types:", { entite, employe });
//# sourceMappingURL=02-intersection-types.js.map