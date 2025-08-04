"use strict";
// 10. ATTRIBUT EN TANT QUE CLÉ
// =============================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonneBuilder = exports.GestionnaireDonnees = void 0;
exports.obtenirValeur = obtenirValeur;
exports.definirValeur = definirValeur;
exports.creerProxy = creerProxy;
// Fonction qui utilise une clé comme paramètre
function obtenirValeur(objet, cle) {
    return objet[cle];
}
function definirValeur(objet, cle, valeur) {
    objet[cle] = valeur;
}
// Classe qui utilise les clés comme attributs
class GestionnaireDonnees {
    constructor(donneesInitiales) {
        this.donnees = { ...donneesInitiales };
    }
    obtenir(cle) {
        return this.donnees[cle];
    }
    definir(cle, valeur) {
        this.donnees[cle] = valeur;
    }
    mettreAJour(miseAJour) {
        Object.assign(this.donnees, miseAJour);
    }
    obtenirCles() {
        return Object.keys(this.donnees);
    }
    obtenirValeurs() {
        return Object.values(this.donnees);
    }
    obtenirEntrees() {
        return Object.entries(this.donnees);
    }
    filtrerPar(cle, valeur) {
        return this.donnees[cle] === valeur;
    }
    obtenirTout() {
        return { ...this.donnees };
    }
}
exports.GestionnaireDonnees = GestionnaireDonnees;
// Classe builder qui utilise les clés
class PersonneBuilder {
    constructor() {
        this.donnees = {};
    }
    definirNom(nom) {
        this.donnees.nom = nom;
        return this;
    }
    definirAge(age) {
        this.donnees.age = age;
        return this;
    }
    definirEmail(email) {
        this.donnees.email = email;
        return this;
    }
    definirVille(ville) {
        this.donnees.ville = ville;
        return this;
    }
    // Méthode générique pour définir n'importe quelle propriété
    definir(cle, valeur) {
        this.donnees[cle] = valeur;
        return this;
    }
    construire() {
        // Vérifier que toutes les propriétés requises sont définies
        const { nom, age, email, ville } = this.donnees;
        if (!nom || age === undefined || !email || !ville) {
            throw new Error('Toutes les propriétés sont requises');
        }
        return { nom, age, email, ville };
    }
}
exports.PersonneBuilder = PersonneBuilder;
// Proxy pour accès dynamique aux propriétés
function creerProxy(objet) {
    return new Proxy(objet, {
        get(target, prop) {
            if (typeof prop === 'string' && prop in target) {
                console.log(`Accès à la propriété: ${prop}`);
                return target[prop];
            }
            throw new Error(`Propriété ${String(prop)} n'existe pas`);
        },
        set(target, prop, valeur) {
            if (typeof prop === 'string') {
                console.log(`Modification de la propriété: ${prop} = ${valeur}`);
                target[prop] = valeur;
                return true;
            }
            return false;
        }
    });
}
// Exemples d'utilisation
console.log("Attribut en tant que clé:");
const personne = {
    nom: "Jean Dupont",
    age: 30,
    email: "jean@example.com",
    ville: "Paris"
};
// Utilisation des fonctions avec clés
const nom = obtenirValeur(personne, "nom");
const age = obtenirValeur(personne, "age");
console.log("Valeurs obtenues:", { nom, age });
definirValeur(personne, "age", 31);
console.log("Après modification:", personne);
// Gestionnaire de données
const gestionnaire = new GestionnaireDonnees(personne);
console.log("Nom via gestionnaire:", gestionnaire.obtenir("nom"));
gestionnaire.definir("ville", "Lyon");
console.log("Après modification ville:", gestionnaire.obtenirTout());
// Utilisation du builder
const nouvellePersonne = new PersonneBuilder()
    .definirNom("Marie Martin")
    .definirAge(25)
    .definirEmail("marie@example.com")
    .definirVille("Marseille")
    .construire();
console.log("Personne construite:", nouvellePersonne);
// Builder avec méthode générique
const personneGenerique = new PersonneBuilder()
    .definir("nom", "Paul Durand")
    .definir("age", 35)
    .definir("email", "paul@example.com")
    .definir("ville", "Nice")
    .construire();
console.log("Personne générique:", personneGenerique);
// Compteur de statuts
const compteur = {
    nouvelle: 5,
    en_cours: 3,
    terminee: 10
};
const actions = {
    traiter_nouvelle: () => console.log("Traiter nouvelle tâche"),
    traiter_en_cours: () => console.log("Traiter tâche en cours"),
    traiter_terminee: () => console.log("Traiter tâche terminée")
};
console.log("Compteur:", compteur);
actions.traiter_nouvelle();
// Test du proxy
const personneProxy = creerProxy({ ...personne });
console.log("Via proxy:", personneProxy.nom);
personneProxy.age = 32;
// Dictionnaire des traductions
const traductions = {
    nom: "Name",
    age: "Age",
    email: "Email",
    ville: "City"
};
console.log("Traductions:", traductions);
// Données dynamiques
const donneesDynamiques = {
    id: 1,
    nom: "Test",
    proprieteCustom: "valeur",
    autrePropriete: 42
};
console.log("Données dynamiques:", donneesDynamiques);
//# sourceMappingURL=10-attribut-cle.js.map