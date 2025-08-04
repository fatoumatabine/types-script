type StringOuNumber = string | number;
type BooleanOuNull = boolean | null;
type StatusCode = 200 | 404 | 500;
declare function estString(valeur: unknown): valeur is string;
declare function estNumber(valeur: unknown): valeur is number;
declare function estBoolean(valeur: unknown): valeur is boolean;
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
declare function estUtilisateur(personne: Personne): personne is Utilisateur;
declare function estAdmin(personne: Personne): personne is Admin;
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
declare function traiterEtat(etat: EtatAPI): string;
type Reponse<T> = {
    succes: true;
    donnees: T;
    erreur?: never;
} | {
    succes: false;
    donnees?: never;
    erreur: string;
};
declare function traiterValeur(valeur: StringOuNumber): string;
declare function estDefini<T>(valeur: T | null | undefined): valeur is T;
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
declare class Voiture {
    marque: string;
    constructor(marque: string);
    demarrer(): string;
}
declare class Moto {
    marque: string;
    constructor(marque: string);
    accelerer(): string;
}
type Vehicule = Voiture | Moto;
type Taille = 'petit' | 'moyen' | 'grand';
type Couleur = 'rouge' | 'vert' | 'bleu';
type TailleEtCouleur = `${Taille}-${Couleur}`;
declare class TesteurUnion {
    static testerType(valeur: unknown): string;
    static testerPersonne(personne: Personne): string;
    static testerAnimal(animal: Animal): string;
    static filtrerValeurs<T>(valeurs: (T | null | undefined)[]): T[];
}
declare class ReponseBuilder {
    static succes<T>(donnees: T): Reponse<T>;
    static erreur<T>(erreur: string): Reponse<T>;
    static traiter<T>(reponse: Reponse<T>): string;
}
export { StringOuNumber, BooleanOuNull, StatusCode, Personne, EtatAPI, Reponse, Animal, Vehicule, TailleEtCouleur, estString, estNumber, estBoolean, estUtilisateur, estAdmin, estDefini, TesteurUnion, ReponseBuilder, traiterEtat, traiterValeur };
//# sourceMappingURL=11-test-type-union.d.ts.map