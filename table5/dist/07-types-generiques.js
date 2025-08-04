"use strict";
// 7. TYPES GÉNÉRIQUES
// ===================
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryEnMemoire = exports.MapGenerique = exports.PaireImpl = exports.NombreComparable = exports.Boite = void 0;
// Classe générique implémentant l'interface
class Boite {
    constructor(_valeur) {
        this._valeur = _valeur;
    }
    get valeur() {
        return this._valeur;
    }
    obtenirValeur() {
        return this._valeur;
    }
    definirValeur(nouvelleValeur) {
        this._valeur = nouvelleValeur;
    }
}
exports.Boite = Boite;
class NombreComparable {
    constructor(valeur) {
        this.valeur = valeur;
    }
    comparer(autre) {
        return this.valeur - autre.valeur;
    }
    obtenirValeur() {
        return this.valeur;
    }
}
exports.NombreComparable = NombreComparable;
class PaireImpl {
    constructor(premier, second) {
        this.premier = premier;
        this.second = second;
    }
    echanger() {
        return { premier: this.second, second: this.premier };
    }
}
exports.PaireImpl = PaireImpl;
// Map générique
class MapGenerique {
    constructor() {
        this.items = new Map();
    }
    definir(cle, valeur) {
        this.items.set(cle, valeur);
    }
    obtenir(cle) {
        return this.items.get(cle);
    }
    contient(cle) {
        return this.items.has(cle);
    }
    supprimer(cle) {
        return this.items.delete(cle);
    }
    obtenirToutesLesCles() {
        return Array.from(this.items.keys());
    }
    obtenirToutesLesValeurs() {
        return Array.from(this.items.values());
    }
    taille() {
        return this.items.size;
    }
}
exports.MapGenerique = MapGenerique;
class RepositoryEnMemoire {
    constructor() {
        this.donnees = new Map();
    }
    trouverParId(id) {
        return this.donnees.get(id);
    }
    sauvegarder(entite) {
        this.donnees.set(entite.id, entite);
    }
    supprimer(id) {
        return this.donnees.delete(id);
    }
    trouverTous() {
        return Array.from(this.donnees.values());
    }
}
exports.RepositoryEnMemoire = RepositoryEnMemoire;
// Exemples d'utilisation
console.log("Types génériques:");
// Boîte générique
const boiteNombre = new Boite(42);
const boiteTexte = new Boite("Hello");
const boiteObjet = new Boite({ nom: "Test" });
console.log("Boîtes:", {
    nombre: boiteNombre.obtenirValeur(),
    texte: boiteTexte.obtenirValeur(),
    objet: boiteObjet.obtenirValeur()
});
// Nombres comparables
const nb1 = new NombreComparable(10);
const nb2 = new NombreComparable(20);
console.log("Comparaison:", nb1.comparer(nb2)); // -10
// Paires
const paire = new PaireImpl("nom", 25);
const paireEchangee = paire.echanger();
console.log("Paires:", { original: paire, echangee: paireEchangee });
// Map générique
const mapUtilisateurs = new MapGenerique();
mapUtilisateurs.definir(1, "Jean");
mapUtilisateurs.definir(2, "Marie");
console.log("Map:", {
    utilisateur1: mapUtilisateurs.obtenir(1),
    taille: mapUtilisateurs.taille(),
    cles: mapUtilisateurs.obtenirToutesLesCles()
});
// Repository
const repoUtilisateurs = new RepositoryEnMemoire();
const utilisateur1 = { id: 1, nom: "Jean", email: "jean@test.com" };
const utilisateur2 = { id: 2, nom: "Marie", email: "marie@test.com", age: 30 };
repoUtilisateurs.sauvegarder(utilisateur1);
repoUtilisateurs.sauvegarder(utilisateur2);
console.log("Repository:", {
    utilisateur: repoUtilisateurs.trouverParId(1),
    tous: repoUtilisateurs.trouverTous()
});
//# sourceMappingURL=07-types-generiques.js.map