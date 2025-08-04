declare function identite<T>(valeur: T): T;
declare function cloner<T extends object>(objet: T): T;
declare function echanger<T, U>(premier: T, second: U): [U, T];
interface AvecLongueur {
    length: number;
}
declare function obtenirLongueur<T extends AvecLongueur>(element: T): number;
declare function obtenirPropriete<T, K extends keyof T>(objet: T, cle: K): T[K];
declare function creerTableau<T = string>(longueur: number, valeurParDefaut: T): T[];
declare function mapper<T, U>(tableau: T[], transformateur: (element: T) => U): U[];
declare function filtrer<T>(tableau: T[], predicat: (element: T) => boolean): T[];
declare function estDefini<T>(valeur: T | null | undefined): valeur is T;
declare function aplatir<T>(tableau: (T | T[])[]): T[];
export { identite, cloner, echanger, obtenirLongueur, obtenirPropriete, creerTableau, mapper, filtrer, estDefini, aplatir };
//# sourceMappingURL=06-fonction-generique.d.ts.map