type StringOuNumber = string | number;
type Vehicule = {
    type: "voiture";
    marque: string;
    nbPortes: number;
} | {
    type: "moto";
    marque: string;
    cylindree: number;
} | {
    type: "velo";
    marque: string;
    vitesses: number;
};
type ResultatAPI = {
    donnees: any;
    erreur: null;
} | {
    donnees: null;
    erreur: string;
};
interface Carre {
    kind: "carre";
    taille: number;
}
interface Rectangle {
    kind: "rectangle";
    largeur: number;
    hauteur: number;
}
interface Cercle {
    kind: "cercle";
    rayon: number;
}
type Forme = Carre | Rectangle | Cercle;
declare function calculerAire(forme: Forme): number;
export { StringOuNumber, Vehicule, ResultatAPI, Forme, calculerAire };
//# sourceMappingURL=03-union-types.d.ts.map