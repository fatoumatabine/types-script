type FonctionSimple = () => void;
type FonctionAvecParametres = (a: number, b: number) => number;
type FonctionAvecRetour = (nom: string) => string;
type FonctionParametresOptionnels = (nom: string, age?: number) => string;
type FonctionRest = (premier: number, ...autres: number[]) => number;
type FonctionGenerique<T> = (valeur: T) => T;
type FonctionAvecCallback<T> = (donnees: T[], callback: (element: T) => boolean) => T[];
type FonctionAsync<T> = (id: number) => Promise<T>;
interface FonctionSurchargee {
    (valeur: number): string;
    (valeur: string): number;
    (valeur: boolean): boolean;
}
interface CalculatriceInterface {
    additionner: (a: number, b: number) => number;
    soustraire: (a: number, b: number) => number;
    multiplier: (a: number, b: number) => number;
    diviser: (a: number, b: number) => number;
}
type GestionnaireEvenement<T> = (evenement: T) => void;
type Middleware<T, U> = (entree: T, suivant: (valeur: T) => U) => U;
type Validateur<T> = (valeur: T) => {
    valide: boolean;
    erreurs: string[];
};
type Transformateur<T, U> = {
    transformer: (valeur: T) => U;
    inverser: (valeur: U) => T;
};
declare const calculatrice: CalculatriceInterface;
type FonctionOrdreSuperier = <T, U>(fn: (valeur: T) => U) => (valeur: T) => U;
declare const memoiser: FonctionOrdreSuperier;
export { FonctionSimple, FonctionAvecParametres, FonctionAvecRetour, FonctionParametresOptionnels, FonctionRest, FonctionGenerique, FonctionAvecCallback, FonctionAsync, FonctionSurchargee, CalculatriceInterface, GestionnaireEvenement, Middleware, Validateur, Transformateur, calculatrice, memoiser };
//# sourceMappingURL=09-type-fonction.d.ts.map