interface Conteneur<T> {
    valeur: T;
    obtenirValeur(): T;
    definirValeur(nouvelleValeur: T): void;
}
declare class Boite<T> implements Conteneur<T> {
    private _valeur;
    constructor(_valeur: T);
    get valeur(): T;
    obtenirValeur(): T;
    definirValeur(nouvelleValeur: T): void;
}
interface Comparable<T> {
    comparer(autre: T): number;
}
declare class NombreComparable implements Comparable<NombreComparable> {
    private valeur;
    constructor(valeur: number);
    comparer(autre: NombreComparable): number;
    obtenirValeur(): number;
}
interface Paire<T, U> {
    premier: T;
    second: U;
}
declare class PaireImpl<T, U> implements Paire<T, U> {
    premier: T;
    second: U;
    constructor(premier: T, second: U);
    echanger(): Paire<U, T>;
}
type EstTableau<T> = T extends any[] ? true : false;
type ElementDuTableau<T> = T extends (infer U)[] ? U : never;
type RendreOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RendreRequis<T, K extends keyof T> = T & Required<Pick<T, K>>;
declare class MapGenerique<K, V> {
    private items;
    definir(cle: K, valeur: V): void;
    obtenir(cle: K): V | undefined;
    contient(cle: K): boolean;
    supprimer(cle: K): boolean;
    obtenirToutesLesCles(): K[];
    obtenirToutesLesValeurs(): V[];
    taille(): number;
}
interface Repository<T, ID> {
    trouverParId(id: ID): T | undefined;
    sauvegarder(entite: T): void;
    supprimer(id: ID): boolean;
    trouverTous(): T[];
}
declare class RepositoryEnMemoire<T extends {
    id: ID;
}, ID> implements Repository<T, ID> {
    private donnees;
    trouverParId(id: ID): T | undefined;
    sauvegarder(entite: T): void;
    supprimer(id: ID): boolean;
    trouverTous(): T[];
}
export { Conteneur, Boite, Comparable, NombreComparable, Paire, PaireImpl, MapGenerique, Repository, RepositoryEnMemoire, EstTableau, ElementDuTableau, RendreOptional, RendreRequis };
//# sourceMappingURL=07-types-generiques.d.ts.map