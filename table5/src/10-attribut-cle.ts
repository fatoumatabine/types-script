// 10. ATTRIBUT EN TANT QUE CLÉ
// =============================

// Utilisation de keyof pour obtenir les clés d'un type
interface Personne {
  nom: string;
  age: number;
  email: string;
  ville: string;
}

type ClesPersonne = keyof Personne; // "nom" | "age" | "email" | "ville"

// Fonction qui utilise une clé comme paramètre
function obtenirValeur<T, K extends keyof T>(objet: T, cle: K): T[K] {
  return objet[cle];
}

function definirValeur<T, K extends keyof T>(objet: T, cle: K, valeur: T[K]): void {
  objet[cle] = valeur;
}

// Type mapped avec clés conditionnelles
type RendreOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Type pour créer un objet avec des getters
type AvecGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Type pour créer un objet avec des setters
type AvecSetters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (valeur: T[K]) => void;
};

// Combinaison getters et setters
type AvecAccesseurs<T> = AvecGetters<T> & AvecSetters<T>;

// Type pour renommer les clés
type RenommerCles<T, M extends Partial<Record<keyof T, string>>> = {
  [K in keyof T as K extends keyof M 
    ? M[K] extends string 
      ? M[K] 
      : K 
    : K]: T[K];
};

// Type pour filtrer les clés par type de valeur
type ClesParType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type ClesString<T> = ClesParType<T, string>;
type ClesNumber<T> = ClesParType<T, number>;

// Type pour créer un dictionnaire à partir des clés
type Dictionnaire<T> = {
  [K in keyof T]: string;
};

// Index signature dynamique
type DonneesDynamiques = {
  [cle: string]: any;
  id: number; // propriété fixe
  nom: string; // propriété fixe
};

// Template literal types avec clés
type CleAvecPrefixe<T, P extends string> = {
  [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

// Type pour grouper les propriétés
type GrouperPar<T, G extends string> = {
  [groupe in G]: {
    [K in keyof T]: T[K];
  };
};

// Record avec clés calculées
type StatutTache = 'nouvelle' | 'en_cours' | 'terminee';
type CompteurStatuts = Record<StatutTache, number>;
type ActionStatut = Record<`traiter_${StatutTache}`, () => void>;

// Classe qui utilise les clés comme attributs
class GestionnaireDonnees<T extends Record<string, any>> {
  private donnees: T;

  constructor(donneesInitiales: T) {
    this.donnees = { ...donneesInitiales };
  }

  obtenir<K extends keyof T>(cle: K): T[K] {
    return this.donnees[cle];
  }

  definir<K extends keyof T>(cle: K, valeur: T[K]): void {
    this.donnees[cle] = valeur;
  }

  mettreAJour(miseAJour: Partial<T>): void {
    Object.assign(this.donnees, miseAJour);
  }

  obtenirCles(): (keyof T)[] {
    return Object.keys(this.donnees);
  }

  obtenirValeurs(): T[keyof T][] {
    return Object.values(this.donnees);
  }

  obtenirEntrees(): [keyof T, T[keyof T]][] {
    return Object.entries(this.donnees) as [keyof T, T[keyof T]][];
  }

  filtrerPar<K extends keyof T>(cle: K, valeur: T[K]): boolean {
    return this.donnees[cle] === valeur;
  }

  obtenirTout(): T {
    return { ...this.donnees };
  }
}

// Classe builder qui utilise les clés
class PersonneBuilder {
  private donnees: Partial<Personne> = {};

  definirNom(nom: string): this {
    this.donnees.nom = nom;
    return this;
  }

  definirAge(age: number): this {
    this.donnees.age = age;
    return this;
  }

  definirEmail(email: string): this {
    this.donnees.email = email;
    return this;
  }

  definirVille(ville: string): this {
    this.donnees.ville = ville;
    return this;
  }

  // Méthode générique pour définir n'importe quelle propriété
  definir<K extends keyof Personne>(cle: K, valeur: Personne[K]): this {
    this.donnees[cle] = valeur;
    return this;
  }

  construire(): Personne {
    // Vérifier que toutes les propriétés requises sont définies
    const { nom, age, email, ville } = this.donnees;
    if (!nom || age === undefined || !email || !ville) {
      throw new Error('Toutes les propriétés sont requises');
    }
    return { nom, age, email, ville };
  }
}

// Proxy pour accès dynamique aux propriétés
function creerProxy<T extends Record<string, any>>(objet: T): T {
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
        (target as any)[prop] = valeur;
        return true;
      }
      return false;
    }
  });
}

// Exemples d'utilisation
console.log("Attribut en tant que clé:");

const personne: Personne = {
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
const compteur: CompteurStatuts = {
  nouvelle: 5,
  en_cours: 3,
  terminee: 10
};

const actions: ActionStatut = {
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

// Tests de types avec clés string et number
type TestClesString = ClesString<Personne>; // "nom" | "email" | "ville"
type TestClesNumber = ClesNumber<Personne>; // "age"

// Dictionnaire des traductions
const traductions: Dictionnaire<Personne> = {
  nom: "Name",
  age: "Age", 
  email: "Email",
  ville: "City"
};

console.log("Traductions:", traductions);

// Données dynamiques
const donneesDynamiques: DonneesDynamiques = {
  id: 1,
  nom: "Test",
  proprieteCustom: "valeur",
  autrePropriete: 42
};

console.log("Données dynamiques:", donneesDynamiques);

export {
  Personne,
  ClesPersonne,
  obtenirValeur,
  definirValeur,
  RendreOptional,
  AvecGetters,
  AvecSetters,
  AvecAccesseurs,
  ClesParType,
  GestionnaireDonnees,
  PersonneBuilder,
  CompteurStatuts,
  ActionStatut,
  creerProxy
};
