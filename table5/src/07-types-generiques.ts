// 7. TYPES GÉNÉRIQUES
// ===================

// Interface générique simple
interface Conteneur<T> {
  valeur: T;
  obtenirValeur(): T;
  definirValeur(nouvelleValeur: T): void;
}

// Classe générique implémentant l'interface
class Boite<T> implements Conteneur<T> {
  constructor(private _valeur: T) {}

  get valeur(): T {
    return this._valeur;
  }

  obtenirValeur(): T {
    return this._valeur;
  }

  definirValeur(nouvelleValeur: T): void {
    this._valeur = nouvelleValeur;
  }
}

// Type générique avec contraintes
interface Comparable<T> {
  comparer(autre: T): number;
}

class NombreComparable implements Comparable<NombreComparable> {
  constructor(private valeur: number) {}

  comparer(autre: NombreComparable): number {
    return this.valeur - autre.valeur;
  }

  obtenirValeur(): number {
    return this.valeur;
  }
}

// Type générique avec plusieurs paramètres
interface Paire<T, U> {
  premier: T;
  second: U;
}

class PaireImpl<T, U> implements Paire<T, U> {
  constructor(public premier: T, public second: U) {}

  echanger(): Paire<U, T> {
    return { premier: this.second, second: this.premier };
  }
}

// Type générique conditionnel
type EstTableau<T> = T extends any[] ? true : false;

// Type générique avec inférence
type ElementDuTableau<T> = T extends (infer U)[] ? U : never;

// Type générique récursif
type Json = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: Json; }
interface JsonArray extends Array<Json> {}

// Utility types personnalisés
type RendreOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RendreRequis<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Map générique
class MapGenerique<K, V> {
  private items: Map<K, V> = new Map();

  definir(cle: K, valeur: V): void {
    this.items.set(cle, valeur);
  }

  obtenir(cle: K): V | undefined {
    return this.items.get(cle);
  }

  contient(cle: K): boolean {
    return this.items.has(cle);
  }

  supprimer(cle: K): boolean {
    return this.items.delete(cle);
  }

  obtenirToutesLesCles(): K[] {
    return Array.from(this.items.keys());
  }

  obtenirToutesLesValeurs(): V[] {
    return Array.from(this.items.values());
  }

  taille(): number {
    return this.items.size;
  }
}

// Repository générique
interface Repository<T, ID> {
  trouverParId(id: ID): T | undefined;
  sauvegarder(entite: T): void;
  supprimer(id: ID): boolean;
  trouverTous(): T[];
}

class RepositoryEnMemoire<T extends { id: ID }, ID> implements Repository<T, ID> {
  private donnees: Map<ID, T> = new Map();

  trouverParId(id: ID): T | undefined {
    return this.donnees.get(id);
  }

  sauvegarder(entite: T): void {
    this.donnees.set(entite.id, entite);
  }

  supprimer(id: ID): boolean {
    return this.donnees.delete(id);
  }

  trouverTous(): T[] {
    return Array.from(this.donnees.values());
  }
}

// Types pour tester
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  age?: number;
}

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
const mapUtilisateurs = new MapGenerique<number, string>();
mapUtilisateurs.definir(1, "Jean");
mapUtilisateurs.definir(2, "Marie");
console.log("Map:", {
  utilisateur1: mapUtilisateurs.obtenir(1),
  taille: mapUtilisateurs.taille(),
  cles: mapUtilisateurs.obtenirToutesLesCles()
});

// Repository
const repoUtilisateurs = new RepositoryEnMemoire<Utilisateur, number>();
const utilisateur1: Utilisateur = { id: 1, nom: "Jean", email: "jean@test.com" };
const utilisateur2: Utilisateur = { id: 2, nom: "Marie", email: "marie@test.com", age: 30 };

repoUtilisateurs.sauvegarder(utilisateur1);
repoUtilisateurs.sauvegarder(utilisateur2);

console.log("Repository:", {
  utilisateur: repoUtilisateurs.trouverParId(1),
  tous: repoUtilisateurs.trouverTous()
});

// Tests de types conditionnels
type TestTableau1 = EstTableau<string[]>; // true
type TestTableau2 = EstTableau<string>;   // false
type TestElement1 = ElementDuTableau<string[]>; // string
type TestElement2 = ElementDuTableau<number>;   // never

// Test d'utility types
type UtilisateurOptionalAge = RendreOptional<Utilisateur, 'age'>;
type UtilisateurRequiredAge = RendreRequis<Utilisateur, 'age'>;

export {
  Conteneur,
  Boite,
  Comparable,
  NombreComparable,
  Paire,
  PaireImpl,
  MapGenerique,
  Repository,
  RepositoryEnMemoire,
  EstTableau,
  ElementDuTableau,
  RendreOptional,
  RendreRequis
};
