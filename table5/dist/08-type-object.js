"use strict";
// 8. TYPE OBJECT
// ==============
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatriceImpl = void 0;
// Classes qui implémentent les types object
class CalculatriceImpl {
    constructor(valeur = 0) {
        this.valeur = valeur;
    }
    additionner(n) {
        this.valeur += n;
        return this.valeur;
    }
    soustraire(n) {
        this.valeur -= n;
        return this.valeur;
    }
    multiplier(n) {
        this.valeur *= n;
        return this.valeur;
    }
    diviser(n) {
        if (n === 0)
            throw new Error("Division par zéro");
        this.valeur /= n;
        return this.valeur;
    }
    reinitialiser() {
        this.valeur = 0;
    }
}
exports.CalculatriceImpl = CalculatriceImpl;
// Exemples d'utilisation
console.log("Types Object:");
// Object littéral
const personne = {
    nom: "Jean Dupont",
    age: 30,
    email: "jean@example.com"
};
// Configuration avec propriétés optionnelles
const config = {
    host: "localhost",
    port: 3000,
    ssl: true
};
// Dictionnaire
const dictionnaire = {
    "bonjour": "hello",
    "merci": "thank you",
    "au revoir": "goodbye"
};
const scores = {
    "jean": 85,
    "marie": 92,
    "paul": 78
};
// Personne complète
const personneComplete = {
    informationsPersonnelles: {
        nom: "Dupont",
        prenom: "Jean",
        age: 30
    },
    contact: {
        email: "jean@example.com",
        telephone: "+33123456789"
    },
    adresse: {
        rue: "123 Rue de la Paix",
        ville: "Paris",
        codePostal: "75001",
        pays: "France"
    },
    preferences: {
        langue: "fr",
        theme: "clair",
        notifications: true
    }
};
// Calculatrice
const calc = new CalculatriceImpl(10);
console.log("Calculatrice:", {
    initial: calc.valeur,
    apresAddition: calc.additionner(5),
    apresSoustraction: calc.soustraire(3),
    apresMultiplication: calc.multiplier(2),
    apresDivision: calc.diviser(4)
});
// Réponses API
const reponseSucces = {
    succes: true,
    message: "Opération réussie",
    donnees: { id: 1, nom: "Test" },
    erreur: null
};
const reponseEchec = {
    succes: false,
    message: "Erreur survenue",
    donnees: null,
    erreur: "Utilisateur non trouvé"
};
// Compteur de statuts
const compteurStatuts = {
    en_attente: 5,
    en_cours: 3,
    terminee: 12,
    annulee: 1
};
// Types utilitaires
const personneSansEmail = {
    nom: "Marie Martin",
    age: 25
};
const personneNullable = {
    nom: "Paul",
    age: null,
    email: "paul@example.com"
};
console.log({
    personne,
    config,
    dictionnaire,
    scores,
    personneComplete,
    reponseSucces,
    reponseEchec,
    compteurStatuts,
    personneSansEmail,
    personneNullable
});
//# sourceMappingURL=08-type-object.js.map