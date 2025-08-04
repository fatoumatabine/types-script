// 8. TYPE OBJECT
// ==============

// Type object littéral
type PersonneObjet = {
  nom: string;
  age: number;
  email: string;
};

// Type object avec propriétés optionnelles
type ConfigurationObjet = {
  host: string;
  port?: number;
  ssl?: boolean;
  timeout?: number;
};

// Type object avec index signature
type DictionnaireString = {
  [cle: string]: string;
};

type DictionnaireGenerique<T> = {
  [cle: string]: T;
};

// Type object avec propriétés calculées
type ClesPersonne = 'nom' | 'age' | 'email';
type PersonneAvecCles = {
  [K in ClesPersonne]: K extends 'age' ? number : string;
};

// Type object imbriqué
type Adresse = {
  rue: string;
  ville: string;
  codePostal: string;
  pays: string;
};

type PersonneComplete = {
  informationsPersonnelles: {
    nom: string;
    prenom: string;
    age: number;
  };
  contact: {
    email: string;
    telephone?: string;
  };
  adresse: Adresse;
  preferences: {
    langue: 'fr' | 'en' | 'es';
    theme: 'clair' | 'sombre';
    notifications: boolean;
  };
};

// Type object avec méthodes
type CalculatriceObjet = {
  valeur: number;
  additionner(n: number): number;
  soustraire(n: number): number;
  multiplier(n: number): number;
  diviser(n: number): number;
  reinitialiser(): void;
};

// Type object readonly
type PersonneReadonly = {
  readonly id: number;
  readonly nom: string;
  age: number; // modifiable
  readonly dateCreation: Date;
};

// Type object avec propriétés conditionnelles
type ReponseAPI<T extends boolean> = {
  succes: T;
  message: string;
  donnees: T extends true ? any : null;
  erreur: T extends false ? string : null;
};

// Utility types pour objects
type ClesDePersonne = keyof PersonneObjet; // 'nom' | 'age' | 'email'
type TypesDeValeurs = PersonneObjet[keyof PersonneObjet]; // string | number

// Pick et Omit
type PersonneSansEmail = Omit<PersonneObjet, 'email'>;
type PersonneNomAge = Pick<PersonneObjet, 'nom' | 'age'>;

// Partial et Required
type PersonnePartielle = Partial<PersonneObjet>;
type ConfigurationComplete = Required<ConfigurationObjet>;

// Record type
type StatutsTaches = 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
type CompteurStatuts = Record<StatutsTaches, number>;

// Mapped types personnalisés
type RendreNullable<T> = {
  [K in keyof T]: T[K] | null;
};

type ObtenirTypes<T> = {
  [K in keyof T]: () => T[K];
};

// Classes qui implémentent les types object
class CalculatriceImpl implements CalculatriceObjet {
  constructor(public valeur: number = 0) {}

  additionner(n: number): number {
    this.valeur += n;
    return this.valeur;
  }

  soustraire(n: number): number {
    this.valeur -= n;
    return this.valeur;
  }

  multiplier(n: number): number {
    this.valeur *= n;
    return this.valeur;
  }

  diviser(n: number): number {
    if (n === 0) throw new Error("Division par zéro");
    this.valeur /= n;
    return this.valeur;
  }

  reinitialiser(): void {
    this.valeur = 0;
  }
}

// Exemples d'utilisation
console.log("Types Object:");

// Object littéral
const personne: PersonneObjet = {
  nom: "Jean Dupont",
  age: 30,
  email: "jean@example.com"
};

// Configuration avec propriétés optionnelles
const config: ConfigurationObjet = {
  host: "localhost",
  port: 3000,
  ssl: true
};

// Dictionnaire
const dictionnaire: DictionnaireString = {
  "bonjour": "hello",
  "merci": "thank you",
  "au revoir": "goodbye"
};

const scores: DictionnaireGenerique<number> = {
  "jean": 85,
  "marie": 92,
  "paul": 78
};

// Personne complète
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
const reponseSucces: ReponseAPI<true> = {
  succes: true,
  message: "Opération réussie",
  donnees: { id: 1, nom: "Test" },
  erreur: null
};

const reponseEchec: ReponseAPI<false> = {
  succes: false,
  message: "Erreur survenue",
  donnees: null,
  erreur: "Utilisateur non trouvé"
};

// Compteur de statuts
const compteurStatuts: CompteurStatuts = {
  en_attente: 5,
  en_cours: 3,
  terminee: 12,
  annulee: 1
};

// Types utilitaires
const personneSansEmail: PersonneSansEmail = {
  nom: "Marie Martin",
  age: 25
};

const personneNullable: RendreNullable<PersonneObjet> = {
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

export {
  PersonneObjet,
  ConfigurationObjet,
  DictionnaireString,
  DictionnaireGenerique,
  PersonneComplete,
  CalculatriceObjet,
  CalculatriceImpl,
  PersonneReadonly,
  ReponseAPI,
  CompteurStatuts,
  RendreNullable,
  ObtenirTypes
};
