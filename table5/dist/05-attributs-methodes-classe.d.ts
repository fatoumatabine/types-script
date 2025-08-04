declare class Voiture {
    marque: string;
    modele: string;
    private _numeroSerie;
    private _moteurDemarre;
    protected annee: number;
    static nombreVoitures: number;
    readonly identifiant: string;
    constructor(marque: string, modele: string, annee: number, numeroSerie: string);
    get description(): string;
    set numeroSerie(nouveau: string);
    get numeroSerie(): string;
    demarrer(): string;
    arreter(): string;
    private verifierEtat;
    protected obtenirInfosMoteur(): string;
    static obtenirNombreVoitures(): number;
    static creerVoitureTest(): Voiture;
}
declare class VoitureElectrique extends Voiture {
    private niveauBatterie;
    constructor(marque: string, modele: string, annee: number, numeroSerie: string);
    obtenirStatutComplet(): string;
    charger(): string;
}
export { Voiture, VoitureElectrique };
//# sourceMappingURL=05-attributs-methodes-classe.d.ts.map