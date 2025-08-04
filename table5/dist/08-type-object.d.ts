type PersonneObjet = {
    nom: string;
    age: number;
    email: string;
};
type ConfigurationObjet = {
    host: string;
    port?: number;
    ssl?: boolean;
    timeout?: number;
};
type DictionnaireString = {
    [cle: string]: string;
};
type DictionnaireGenerique<T> = {
    [cle: string]: T;
};
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
type CalculatriceObjet = {
    valeur: number;
    additionner(n: number): number;
    soustraire(n: number): number;
    multiplier(n: number): number;
    diviser(n: number): number;
    reinitialiser(): void;
};
type PersonneReadonly = {
    readonly id: number;
    readonly nom: string;
    age: number;
    readonly dateCreation: Date;
};
type ReponseAPI<T extends boolean> = {
    succes: T;
    message: string;
    donnees: T extends true ? any : null;
    erreur: T extends false ? string : null;
};
type StatutsTaches = 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
type CompteurStatuts = Record<StatutsTaches, number>;
type RendreNullable<T> = {
    [K in keyof T]: T[K] | null;
};
type ObtenirTypes<T> = {
    [K in keyof T]: () => T[K];
};
declare class CalculatriceImpl implements CalculatriceObjet {
    valeur: number;
    constructor(valeur?: number);
    additionner(n: number): number;
    soustraire(n: number): number;
    multiplier(n: number): number;
    diviser(n: number): number;
    reinitialiser(): void;
}
export { PersonneObjet, ConfigurationObjet, DictionnaireString, DictionnaireGenerique, PersonneComplete, CalculatriceObjet, CalculatriceImpl, PersonneReadonly, ReponseAPI, CompteurStatuts, RendreNullable, ObtenirTypes };
//# sourceMappingURL=08-type-object.d.ts.map