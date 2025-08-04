interface Personne {
    nom: string;
    age: number;
    email: string;
    ville: string;
}
type ClesPersonne = keyof Personne;
declare function obtenirValeur<T, K extends keyof T>(objet: T, cle: K): T[K];
declare function definirValeur<T, K extends keyof T>(objet: T, cle: K, valeur: T[K]): void;
type RendreOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type AvecGetters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type AvecSetters<T> = {
    [K in keyof T as `set${Capitalize<string & K>}`]: (valeur: T[K]) => void;
};
type AvecAccesseurs<T> = AvecGetters<T> & AvecSetters<T>;
type ClesParType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type StatutTache = 'nouvelle' | 'en_cours' | 'terminee';
type CompteurStatuts = Record<StatutTache, number>;
type ActionStatut = Record<`traiter_${StatutTache}`, () => void>;
declare class GestionnaireDonnees<T extends Record<string, any>> {
    private donnees;
    constructor(donneesInitiales: T);
    obtenir<K extends keyof T>(cle: K): T[K];
    definir<K extends keyof T>(cle: K, valeur: T[K]): void;
    mettreAJour(miseAJour: Partial<T>): void;
    obtenirCles(): (keyof T)[];
    obtenirValeurs(): T[keyof T][];
    obtenirEntrees(): [keyof T, T[keyof T]][];
    filtrerPar<K extends keyof T>(cle: K, valeur: T[K]): boolean;
    obtenirTout(): T;
}
declare class PersonneBuilder {
    private donnees;
    definirNom(nom: string): this;
    definirAge(age: number): this;
    definirEmail(email: string): this;
    definirVille(ville: string): this;
    definir<K extends keyof Personne>(cle: K, valeur: Personne[K]): this;
    construire(): Personne;
}
declare function creerProxy<T extends Record<string, any>>(objet: T): T;
export { Personne, ClesPersonne, obtenirValeur, definirValeur, RendreOptional, AvecGetters, AvecSetters, AvecAccesseurs, ClesParType, GestionnaireDonnees, PersonneBuilder, CompteurStatuts, ActionStatut, creerProxy };
//# sourceMappingURL=10-attribut-cle.d.ts.map