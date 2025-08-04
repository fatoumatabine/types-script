"use strict";
// 11. TEST TYPE UNION
// ===================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReponseBuilder = exports.TesteurUnion = void 0;
exports.estString = estString;
exports.estNumber = estNumber;
exports.estBoolean = estBoolean;
exports.estUtilisateur = estUtilisateur;
exports.estAdmin = estAdmin;
exports.estDefini = estDefini;
exports.traiterEtat = traiterEtat;
exports.traiterValeur = traiterValeur;
// Type guards (gardes de type)
function estString(valeur) {
    return typeof valeur === 'string';
}
function estNumber(valeur) {
    return typeof valeur === 'number';
}
function estBoolean(valeur) {
    return typeof valeur === 'boolean';
}
function estUtilisateur(personne) {
    return personne.type === 'utilisateur';
}
function estAdmin(personne) {
    return personne.type === 'admin';
}
// Type guards avec in operator
function aPermissions(personne) {
    return 'permissions' in personne;
}
// Fonction pour tester les états
function traiterEtat(etat) {
    switch (etat.status) {
        case 'chargement':
            return 'Chargement en cours...';
        case 'succes':
            return `Données reçues: ${JSON.stringify(etat.donnees)}`;
        case 'erreur':
            return `Erreur: ${etat.message}`;
        default:
            // TypeScript s'assure que tous les cas sont couverts
            const _exhaustive = etat;
            return _exhaustive;
    }
}
// Type assertions et narrowing
function traiterValeur(valeur) {
    if (typeof valeur === 'string') {
        // TypeScript sait que valeur est string ici
        return valeur.toUpperCase();
    }
    else {
        // TypeScript sait que valeur est number ici
        return valeur.toString();
    }
}
// Fonctions pour tester null/undefined
function estDefini(valeur) {
    return valeur !== null && valeur !== undefined;
}
function estNull(valeur) {
    return valeur === null;
}
function estUndefined(valeur) {
    return valeur === undefined;
}
// Tests avec instanceof
class Voiture {
    constructor(marque) {
        this.marque = marque;
    }
    demarrer() { return `${this.marque} démarre`; }
}
class Moto {
    constructor(marque) {
        this.marque = marque;
    }
    accelerer() { return `${this.marque} accélère`; }
}
function testerVehicule(vehicule) {
    if (vehicule instanceof Voiture) {
        return vehicule.demarrer();
    }
    else {
        return vehicule.accelerer();
    }
}
// Classe pour gérer les unions
class TesteurUnion {
    static testerType(valeur) {
        if (estString(valeur)) {
            return `String: ${valeur}`;
        }
        if (estNumber(valeur)) {
            return `Number: ${valeur}`;
        }
        if (estBoolean(valeur)) {
            return `Boolean: ${valeur}`;
        }
        return 'Type inconnu';
    }
    static testerPersonne(personne) {
        if (estUtilisateur(personne)) {
            return `Utilisateur: ${personne.nom} (${personne.email})`;
        }
        if (estAdmin(personne)) {
            return `Admin: ${personne.nom} avec ${personne.permissions.length} permissions`;
        }
        return 'Type de personne inconnu';
    }
    static testerAnimal(animal) {
        switch (animal.espece) {
            case 'chat':
                return `Chat qui ${animal.ronronne ? 'ronronne' : 'ne ronronne pas'}`;
            case 'chien':
                return `Chien qui ${animal.aboie ? 'aboie' : 'n\'aboie pas'}`;
            case 'oiseau':
                return `Oiseau ${animal.couleurPlumes} qui ${animal.vole ? 'vole' : 'ne vole pas'}`;
            default:
                const _exhaustive = animal;
                return _exhaustive;
        }
    }
    static filtrerValeurs(valeurs) {
        return valeurs.filter(estDefini);
    }
}
exports.TesteurUnion = TesteurUnion;
// Utility pour créer des réponses
class ReponseBuilder {
    static succes(donnees) {
        return { succes: true, donnees };
    }
    static erreur(erreur) {
        return { succes: false, erreur };
    }
    static traiter(reponse) {
        if (reponse.succes) {
            return `Succès: ${JSON.stringify(reponse.donnees)}`;
        }
        else {
            return `Erreur: ${reponse.erreur}`;
        }
    }
}
exports.ReponseBuilder = ReponseBuilder;
// Exemples d'utilisation
console.log("Test type union:");
// Test de types basiques
const valeurs = ["hello", 42, true, null, undefined];
valeurs.forEach(valeur => {
    console.log(TesteurUnion.testerType(valeur));
});
// Test de traitement de valeur
console.log(traiterValeur("hello")); // HELLO
console.log(traiterValeur(42)); // "42"
// Test de personnes
const utilisateur = {
    type: 'utilisateur',
    nom: 'Jean',
    email: 'jean@example.com'
};
const admin = {
    type: 'admin',
    nom: 'Marie',
    permissions: ['read', 'write', 'delete']
};
console.log(TesteurUnion.testerPersonne(utilisateur));
console.log(TesteurUnion.testerPersonne(admin));
// Test d'états API
const etats = [
    { status: 'chargement' },
    { status: 'succes', donnees: { nom: 'Test' } },
    { status: 'erreur', message: 'Connexion échouée' }
];
etats.forEach(etat => {
    console.log(traiterEtat(etat));
});
// Test d'animaux
const animaux = [
    { espece: 'chat', ronronne: true, griffes: true },
    { espece: 'chien', aboie: false, queue: 'longue' },
    { espece: 'oiseau', vole: true, couleurPlumes: 'rouge' }
];
animaux.forEach(animal => {
    console.log(TesteurUnion.testerAnimal(animal));
});
// Test de véhicules
const voiture = new Voiture("Toyota");
const moto = new Moto("Yamaha");
console.log(testerVehicule(voiture));
console.log(testerVehicule(moto));
// Test de réponses
const reponseSucces = ReponseBuilder.succes({ id: 1, nom: 'Test' });
const reponseErreur = ReponseBuilder.erreur('Utilisateur non trouvé');
console.log(ReponseBuilder.traiter(reponseSucces));
console.log(ReponseBuilder.traiter(reponseErreur));
// Test de filtrage
const valeursAvecNull = [1, null, 2, undefined, 3, null, 4];
const valeursFilrees = TesteurUnion.filtrerValeurs(valeursAvecNull);
console.log("Valeurs filtrées:", valeursFilrees);
// Test de types littéraux
const tailleCouleur = "moyen-rouge";
console.log("Taille et couleur:", tailleCouleur);
// Test avec null et undefined
const nullable = Math.random() > 0.5 ? "valeur" : null;
const optional = Math.random() > 0.5 ? "valeur" : undefined;
if (estDefini(nullable)) {
    console.log("Nullable défini:", nullable.toUpperCase());
}
if (estDefini(optional)) {
    console.log("Optional défini:", optional.toUpperCase());
}
//# sourceMappingURL=11-test-type-union.js.map