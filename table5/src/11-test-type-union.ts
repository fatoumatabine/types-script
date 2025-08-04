// 11. TEST TYPE UNION
// ===================

// Types union de base
type StringOuNumber = string | number;
type BooleanOuNull = boolean | null;
type StatusCode = 200 | 404 | 500;

// Type guards (gardes de type)
function estString(valeur: unknown): valeur is string {
  return typeof valeur === 'string';
}

function estNumber(valeur: unknown): valeur is number {
  return typeof valeur === 'number';
}

function estBoolean(valeur: unknown): valeur is boolean {
  return typeof valeur === 'boolean';
}

// Type guards pour types personnalisés
interface Utilisateur {
  type: 'utilisateur';
  nom: string;
  email: string;
}

interface Admin {
  type: 'admin';
  nom: string;
  permissions: string[];
}

type Personne = Utilisateur | Admin;

function estUtilisateur(personne: Personne): personne is Utilisateur {
  return personne.type === 'utilisateur';
}

function estAdmin(personne: Personne): personne is Admin {
  return personne.type === 'admin';
}

// Type guards avec in operator
function aPermissions(personne: Personne): personne is Admin {
  return 'permissions' in personne;
}

// Discriminated Union (Union discriminée)
interface EtatChargement {
  status: 'chargement';
}

interface EtatSucces {
  status: 'succes';
  donnees: any;
}

interface EtatErreur {
  status: 'erreur';
  message: string;
}

type EtatAPI = EtatChargement | EtatSucces | EtatErreur;

// Fonction pour tester les états
function traiterEtat(etat: EtatAPI): string {
  switch (etat.status) {
    case 'chargement':
      return 'Chargement en cours...';
    case 'succes':
      return `Données reçues: ${JSON.stringify(etat.donnees)}`;
    case 'erreur':
      return `Erreur: ${etat.message}`;
    default:
      // TypeScript s'assure que tous les cas sont couverts
      const _exhaustive: never = etat;
      return _exhaustive;
  }
}

// Union avec types optionnels
type Reponse<T> = 
  | { succes: true; donnees: T; erreur?: never }
  | { succes: false; donnees?: never; erreur: string };

// Type assertions et narrowing
function traiterValeur(valeur: StringOuNumber): string {
  if (typeof valeur === 'string') {
    // TypeScript sait que valeur est string ici
    return valeur.toUpperCase();
  } else {
    // TypeScript sait que valeur est number ici
    return valeur.toString();
  }
}

// Union avec null et undefined
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

// Fonctions pour tester null/undefined
function estDefini<T>(valeur: T | null | undefined): valeur is T {
  return valeur !== null && valeur !== undefined;
}

function estNull<T>(valeur: T | null): valeur is null {
  return valeur === null;
}

function estUndefined<T>(valeur: T | undefined): valeur is undefined {
  return valeur === undefined;
}

// Union de types complexes
interface Chat {
  espece: 'chat';
  ronronne: boolean;
  griffes: boolean;
}

interface Chien {
  espece: 'chien';
  aboie: boolean;
  queue: 'longue' | 'courte';
}

interface Oiseau {
  espece: 'oiseau';
  vole: boolean;
  couleurPlumes: string;
}

type Animal = Chat | Chien | Oiseau;

// Tests avec instanceof
class Voiture {
  constructor(public marque: string) {}
  demarrer() { return `${this.marque} démarre`; }
}

class Moto {
  constructor(public marque: string) {}
  accelerer() { return `${this.marque} accélère`; }
}

type Vehicule = Voiture | Moto;

function testerVehicule(vehicule: Vehicule): string {
  if (vehicule instanceof Voiture) {
    return vehicule.demarrer();
  } else {
    return vehicule.accelerer();
  }
}

// Union avec types littéraux
type Taille = 'petit' | 'moyen' | 'grand';
type Couleur = 'rouge' | 'vert' | 'bleu';
type TailleEtCouleur = `${Taille}-${Couleur}`;

// Classe pour gérer les unions
class TesteurUnion {
  static testerType(valeur: unknown): string {
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

  static testerPersonne(personne: Personne): string {
    if (estUtilisateur(personne)) {
      return `Utilisateur: ${personne.nom} (${personne.email})`;
    }
    if (estAdmin(personne)) {
      return `Admin: ${personne.nom} avec ${personne.permissions.length} permissions`;
    }
    return 'Type de personne inconnu';
  }

  static testerAnimal(animal: Animal): string {
    switch (animal.espece) {
      case 'chat':
        return `Chat qui ${animal.ronronne ? 'ronronne' : 'ne ronronne pas'}`;
      case 'chien':
        return `Chien qui ${animal.aboie ? 'aboie' : 'n\'aboie pas'}`;
      case 'oiseau':
        return `Oiseau ${animal.couleurPlumes} qui ${animal.vole ? 'vole' : 'ne vole pas'}`;
      default:
        const _exhaustive: never = animal;
        return _exhaustive;
    }
  }

  static filtrerValeurs<T>(valeurs: (T | null | undefined)[]): T[] {
    return valeurs.filter(estDefini);
  }
}

// Utility pour créer des réponses
class ReponseBuilder {
  static succes<T>(donnees: T): Reponse<T> {
    return { succes: true, donnees };
  }

  static erreur<T>(erreur: string): Reponse<T> {
    return { succes: false, erreur };
  }

  static traiter<T>(reponse: Reponse<T>): string {
    if (reponse.succes) {
      return `Succès: ${JSON.stringify(reponse.donnees)}`;
    } else {
      return `Erreur: ${reponse.erreur}`;
    }
  }
}

// Exemples d'utilisation
console.log("Test type union:");

// Test de types basiques
const valeurs: unknown[] = ["hello", 42, true, null, undefined];
valeurs.forEach(valeur => {
  console.log(TesteurUnion.testerType(valeur));
});

// Test de traitement de valeur
console.log(traiterValeur("hello")); // HELLO
console.log(traiterValeur(42));     // "42"

// Test de personnes
const utilisateur: Utilisateur = {
  type: 'utilisateur',
  nom: 'Jean',
  email: 'jean@example.com'
};

const admin: Admin = {
  type: 'admin',
  nom: 'Marie',
  permissions: ['read', 'write', 'delete']
};

console.log(TesteurUnion.testerPersonne(utilisateur));
console.log(TesteurUnion.testerPersonne(admin));

// Test d'états API
const etats: EtatAPI[] = [
  { status: 'chargement' },
  { status: 'succes', donnees: { nom: 'Test' } },
  { status: 'erreur', message: 'Connexion échouée' }
];

etats.forEach(etat => {
  console.log(traiterEtat(etat));
});

// Test d'animaux
const animaux: Animal[] = [
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
const tailleCouleur: TailleEtCouleur = "moyen-rouge";
console.log("Taille et couleur:", tailleCouleur);

// Test avec null et undefined
const nullable: Nullable<string> = Math.random() > 0.5 ? "valeur" : null;
const optional: Optional<string> = Math.random() > 0.5 ? "valeur" : undefined;

if (estDefini(nullable)) {
  console.log("Nullable défini:", nullable.toUpperCase());
}

if (estDefini(optional)) {
  console.log("Optional défini:", optional.toUpperCase());
}

export {
  StringOuNumber,
  BooleanOuNull,
  StatusCode,
  Personne,
  EtatAPI,
  Reponse,
  Animal,
  Vehicule,
  TailleEtCouleur,
  estString,
  estNumber,
  estBoolean,
  estUtilisateur,
  estAdmin,
  estDefini,
  TesteurUnion,
  ReponseBuilder,
  traiterEtat,
  traiterValeur
};
