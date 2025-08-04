"use strict";
// INDEX PRINCIPAL - DÉMONSTRATION DE TOUS LES CONCEPTS TYPESCRIPT
// ================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = demonstrationComplete;
const _03_union_types_1 = require("./03-union-types");
const _04_heritage_1 = require("./04-heritage");
const _05_attributs_methodes_classe_1 = require("./05-attributs-methodes-classe");
const _06_fonction_generique_1 = require("./06-fonction-generique");
const _07_types_generiques_1 = require("./07-types-generiques");
const _08_type_object_1 = require("./08-type-object");
const _09_type_fonction_1 = require("./09-type-fonction");
const _10_attribut_cle_1 = require("./10-attribut-cle");
const _11_test_type_union_1 = require("./11-test-type-union");
console.log("=".repeat(60));
console.log("DÉMONSTRATION COMPLÈTE DES CONCEPTS TYPESCRIPT");
console.log("=".repeat(60));
// 1. INTERFACES ET TYPES
console.log("\n1. INTERFACES ET TYPES");
console.log("-".repeat(30));
const utilisateur = {
    id: 1,
    nom: "Jean Dupont",
    email: "jean@example.com",
    age: 30
};
console.log("Utilisateur:", utilisateur);
// 2. INTERSECTION DE TYPES
console.log("\n2. INTERSECTION DE TYPES");
console.log("-".repeat(30));
const employe = {
    id: 1,
    nom: "Marie Martin",
    poste: "Développeuse",
    salaire: 50000,
    dateCreation: new Date(),
    departement: "IT",
    competences: ["TypeScript", "React", "Node.js"]
};
console.log("Employé complet:", employe);
// 3. UNION DE TYPES
console.log("\n3. UNION DE TYPES");
console.log("-".repeat(30));
const voiture = {
    type: "voiture",
    marque: "Peugeot",
    nbPortes: 4
};
const carre = { kind: "carre", taille: 5 };
console.log("Véhicule:", voiture);
console.log("Aire du carré:", (0, _03_union_types_1.calculerAire)(carre));
// 4. HÉRITAGE
console.log("\n4. HÉRITAGE");
console.log("-".repeat(30));
const monChien = new _04_heritage_1.Chien("Rex", 3, "Labrador");
const monChat = new _04_heritage_1.Chat("Minou", 2, "roux");
const monCanard = new _04_heritage_1.Canard("Donald", 1);
console.log(monChien.faireDuBruit());
console.log(monChat.faireDuBruit());
console.log(monCanard.voler());
// 5. ATTRIBUTS ET MÉTHODES DE CLASSE
console.log("\n5. ATTRIBUTS ET MÉTHODES DE CLASSE");
console.log("-".repeat(30));
const maVoiture = new _05_attributs_methodes_classe_1.Voiture("Toyota", "Camry", 2023, "TOY1234567890");
const voitureElec = new _05_attributs_methodes_classe_1.VoitureElectrique("Tesla", "Model 3", 2023, "TES1122334455");
console.log(maVoiture.demarrer());
console.log("Nombre de voitures:", _05_attributs_methodes_classe_1.Voiture.obtenirNombreVoitures());
console.log(voitureElec.obtenirStatutComplet());
// 6. FONCTIONS GÉNÉRIQUES
console.log("\n6. FONCTIONS GÉNÉRIQUES");
console.log("-".repeat(30));
const nombres = [1, 2, 3, 4, 5];
const carres = (0, _06_fonction_generique_1.mapper)(nombres, x => x * x);
const nombresPairs = (0, _06_fonction_generique_1.filtrer)(nombres, x => x % 2 === 0);
console.log("Nombres:", nombres);
console.log("Carrés:", carres);
console.log("Pairs:", nombresPairs);
console.log("Identité:", (0, _06_fonction_generique_1.identite)("Hello TypeScript!"));
// 7. TYPES GÉNÉRIQUES
console.log("\n7. TYPES GÉNÉRIQUES");
console.log("-".repeat(30));
const boiteNombre = new _07_types_generiques_1.Boite(42);
const boiteTexte = new _07_types_generiques_1.Boite("Hello");
const mapUtilisateurs = new _07_types_generiques_1.MapGenerique();
mapUtilisateurs.definir(1, "Jean");
mapUtilisateurs.definir(2, "Marie");
const repo = new _07_types_generiques_1.RepositoryEnMemoire();
repo.sauvegarder({ id: 1, nom: "Paul", email: "paul@test.com" });
console.log("Boîte nombre:", boiteNombre.obtenirValeur());
console.log("Map utilisateurs:", mapUtilisateurs.obtenir(1));
console.log("Repository:", repo.trouverParId(1));
// 8. TYPE OBJECT
console.log("\n8. TYPE OBJECT");
console.log("-".repeat(30));
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
const calc = new _08_type_object_1.CalculatriceImpl(10);
const reponseSucces = {
    succes: true,
    message: "Opération réussie",
    donnees: { nom: "Test" },
    erreur: null
};
console.log("Personne complète:", personneComplete.informationsPersonnelles);
console.log("Calculatrice:", calc.additionner(5));
console.log("Réponse API:", reponseSucces.message);
// 9. TYPE FONCTION
console.log("\n9. TYPE FONCTION");
console.log("-".repeat(30));
console.log("Addition:", _09_type_fonction_1.calculatrice.additionner(10, 5));
console.log("Soustraction:", _09_type_fonction_1.calculatrice.soustraire(10, 3));
const fonctionCouteuse = (n) => {
    console.log(`Calcul pour ${n}`);
    return n * n;
};
const fonctionMemorisee = (0, _09_type_fonction_1.memoiser)(fonctionCouteuse);
console.log("Premier appel:", fonctionMemorisee(5));
console.log("Deuxième appel (cache):", fonctionMemorisee(5));
// 10. ATTRIBUT EN TANT QUE CLÉ
console.log("\n10. ATTRIBUT EN TANT QUE CLÉ");
console.log("-".repeat(30));
const personne = {
    nom: "Jean Dupont",
    age: 30,
    email: "jean@example.com",
    ville: "Paris"
};
const gestionnaire = new _10_attribut_cle_1.GestionnaireDonnees(personne);
console.log("Nom via gestionnaire:", gestionnaire.obtenir("nom"));
const nouvellePersonne = new _10_attribut_cle_1.PersonneBuilder()
    .definirNom("Marie Martin")
    .definirAge(25)
    .definirEmail("marie@example.com")
    .definirVille("Marseille")
    .construire();
console.log("Personne construite:", nouvellePersonne);
// 11. TEST TYPE UNION
console.log("\n11. TEST TYPE UNION");
console.log("-".repeat(30));
const valeursTest = ["hello", 42, true, null];
valeursTest.forEach(valeur => {
    console.log(_11_test_type_union_1.TesteurUnion.testerType(valeur));
});
const etats = [
    { status: 'chargement' },
    { status: 'succes', donnees: { nom: 'Test' } },
    { status: 'erreur', message: 'Connexion échouée' }
];
etats.forEach(etat => {
    console.log((0, _11_test_type_union_1.traiterEtat)(etat));
});
const reponseTest = _11_test_type_union_1.ReponseBuilder.succes({ id: 1, nom: 'Test' });
console.log(_11_test_type_union_1.ReponseBuilder.traiter(reponseTest));
console.log("\n" + "=".repeat(60));
console.log("DÉMONSTRATION TERMINÉE !");
console.log("Tous les concepts TypeScript ont été illustrés avec succès.");
console.log("=".repeat(60));
function demonstrationComplete() {
    console.log("Fonction de démonstration exportée !");
}
//# sourceMappingURL=index.js.map