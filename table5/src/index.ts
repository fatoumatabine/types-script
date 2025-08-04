// INDEX PRINCIPAL - DÉMONSTRATION DE TOUS LES CONCEPTS TYPESCRIPT
// ================================================================

import { Utilisateur, Produit, Statut } from './01-interfaces-types';
import { Entite, EmployeComplet } from './02-intersection-types';
import { Vehicule, calculerAire } from './03-union-types';
import { Chien, Chat, Canard } from './04-heritage';
import { Voiture, VoitureElectrique } from './05-attributs-methodes-classe';
import { identite, mapper, filtrer } from './06-fonction-generique';
import { Boite, MapGenerique, RepositoryEnMemoire } from './07-types-generiques';
import { PersonneComplete, CalculatriceImpl, ReponseAPI } from './08-type-object';
import { calculatrice, memoiser } from './09-type-fonction';
import { GestionnaireDonnees, PersonneBuilder } from './10-attribut-cle';
import { TesteurUnion, ReponseBuilder, traiterEtat } from './11-test-type-union';

console.log("=".repeat(60));
console.log("DÉMONSTRATION COMPLÈTE DES CONCEPTS TYPESCRIPT");
console.log("=".repeat(60));

// 1. INTERFACES ET TYPES
console.log("\n1. INTERFACES ET TYPES");
console.log("-".repeat(30));
const utilisateur: Utilisateur = {
  id: 1,
  nom: "Jean Dupont",
  email: "jean@example.com",
  age: 30
};
console.log("Utilisateur:", utilisateur);

// 2. INTERSECTION DE TYPES
console.log("\n2. INTERSECTION DE TYPES");
console.log("-".repeat(30));
const employe: EmployeComplet = {
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
const voiture: Vehicule = {
  type: "voiture",
  marque: "Peugeot",
  nbPortes: 4
};
const carre = { kind: "carre" as const, taille: 5 };
console.log("Véhicule:", voiture);
console.log("Aire du carré:", calculerAire(carre));

// 4. HÉRITAGE
console.log("\n4. HÉRITAGE");
console.log("-".repeat(30));
const monChien = new Chien("Rex", 3, "Labrador");
const monChat = new Chat("Minou", 2, "roux");
const monCanard = new Canard("Donald", 1);

console.log(monChien.faireDuBruit());
console.log(monChat.faireDuBruit());
console.log(monCanard.voler());

// 5. ATTRIBUTS ET MÉTHODES DE CLASSE
console.log("\n5. ATTRIBUTS ET MÉTHODES DE CLASSE");
console.log("-".repeat(30));
const maVoiture = new Voiture("Toyota", "Camry", 2023, "TOY1234567890");
const voitureElec = new VoitureElectrique("Tesla", "Model 3", 2023, "TES1122334455");

console.log(maVoiture.demarrer());
console.log("Nombre de voitures:", Voiture.obtenirNombreVoitures());
console.log(voitureElec.obtenirStatutComplet());

// 6. FONCTIONS GÉNÉRIQUES
console.log("\n6. FONCTIONS GÉNÉRIQUES");
console.log("-".repeat(30));
const nombres = [1, 2, 3, 4, 5];
const carres = mapper(nombres, x => x * x);
const nombresPairs = filtrer(nombres, x => x % 2 === 0);

console.log("Nombres:", nombres);
console.log("Carrés:", carres);
console.log("Pairs:", nombresPairs);
console.log("Identité:", identite("Hello TypeScript!"));

// 7. TYPES GÉNÉRIQUES
console.log("\n7. TYPES GÉNÉRIQUES");
console.log("-".repeat(30));
const boiteNombre = new Boite(42);
const boiteTexte = new Boite("Hello");

const mapUtilisateurs = new MapGenerique<number, string>();
mapUtilisateurs.definir(1, "Jean");
mapUtilisateurs.definir(2, "Marie");

interface UtilisateurRepo {
  id: number;
  nom: string;
  email: string;
}

const repo = new RepositoryEnMemoire<UtilisateurRepo, number>();
repo.sauvegarder({ id: 1, nom: "Paul", email: "paul@test.com" });

console.log("Boîte nombre:", boiteNombre.obtenirValeur());
console.log("Map utilisateurs:", mapUtilisateurs.obtenir(1));
console.log("Repository:", repo.trouverParId(1));

// 8. TYPE OBJECT
console.log("\n8. TYPE OBJECT");
console.log("-".repeat(30));
const personneComplete: PersonneComplete = {
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

const calc = new CalculatriceImpl(10);
const reponseSucces: ReponseAPI<true> = {
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
console.log("Addition:", calculatrice.additionner(10, 5));
console.log("Soustraction:", calculatrice.soustraire(10, 3));

const fonctionCouteuse = (n: number) => {
  console.log(`Calcul pour ${n}`);
  return n * n;
};
const fonctionMemorisee = memoiser(fonctionCouteuse);
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

const gestionnaire = new GestionnaireDonnees(personne);
console.log("Nom via gestionnaire:", gestionnaire.obtenir("nom"));

const nouvellePersonne = new PersonneBuilder()
  .definirNom("Marie Martin")
  .definirAge(25)
  .definirEmail("marie@example.com")
  .definirVille("Marseille")
  .construire();

console.log("Personne construite:", nouvellePersonne);

// 11. TEST TYPE UNION
console.log("\n11. TEST TYPE UNION");
console.log("-".repeat(30));
const valeursTest: unknown[] = ["hello", 42, true, null];
valeursTest.forEach(valeur => {
  console.log(TesteurUnion.testerType(valeur));
});

const etats = [
  { status: 'chargement' as const },
  { status: 'succes' as const, donnees: { nom: 'Test' } },
  { status: 'erreur' as const, message: 'Connexion échouée' }
];

etats.forEach(etat => {
  console.log(traiterEtat(etat));
});

const reponseTest = ReponseBuilder.succes({ id: 1, nom: 'Test' });
console.log(ReponseBuilder.traiter(reponseTest));

console.log("\n" + "=".repeat(60));
console.log("DÉMONSTRATION TERMINÉE !");
console.log("Tous les concepts TypeScript ont été illustrés avec succès.");
console.log("=".repeat(60));

export default function demonstrationComplete() {
  console.log("Fonction de démonstration exportée !");
}
