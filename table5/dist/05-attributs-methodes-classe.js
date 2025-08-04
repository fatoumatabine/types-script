"use strict";
// 5. ATTRIBUTS ET MÉTHODES DE CLASSE
// ===================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoitureElectrique = exports.Voiture = void 0;
class Voiture {
    // Constructeur avec paramètres typés
    constructor(marque, modele, annee, numeroSerie) {
        this._moteurDemarre = false;
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this._numeroSerie = numeroSerie;
        this.identifiant = `${marque}-${modele}-${Date.now()}`;
        // Incrémenter le compteur statique
        Voiture.nombreVoitures++;
    }
    // Getter (propriété calculée)
    get description() {
        return `${this.marque} ${this.modele} (${this.annee})`;
    }
    // Setter (contrôle la modification d'une propriété)
    set numeroSerie(nouveau) {
        if (nouveau.length >= 10) {
            this._numeroSerie = nouveau;
        }
        else {
            throw new Error("Le numéro de série doit contenir au moins 10 caractères");
        }
    }
    // Getter pour accéder à un attribut privé
    get numeroSerie() {
        return this._numeroSerie;
    }
    // Méthode publique
    demarrer() {
        if (!this._moteurDemarre) {
            this._moteurDemarre = true;
            return `${this.description} a démarré!`;
        }
        return `${this.description} est déjà démarrée.`;
    }
    // Méthode publique
    arreter() {
        if (this._moteurDemarre) {
            this._moteurDemarre = false;
            return `${this.description} s'est arrêtée.`;
        }
        return `${this.description} est déjà arrêtée.`;
    }
    // Méthode privée (utilisable uniquement dans cette classe)
    verifierEtat() {
        return this._moteurDemarre;
    }
    // Méthode protégée (utilisable dans cette classe et ses sous-classes)
    obtenirInfosMoteur() {
        return `Moteur ${this.verifierEtat() ? 'démarré' : 'arrêté'}`;
    }
    // Méthode statique (appartient à la classe)
    static obtenirNombreVoitures() {
        return Voiture.nombreVoitures;
    }
    // Méthode statique pour créer une voiture avec des valeurs par défaut
    static creerVoitureTest() {
        return new Voiture("Test", "Model", 2023, "TEST123456789");
    }
}
exports.Voiture = Voiture;
// Attribut statique (appartient à la classe, pas à l'instance)
Voiture.nombreVoitures = 0;
// Classe qui hérite et utilise les attributs protégés
class VoitureElectrique extends Voiture {
    constructor(marque, modele, annee, numeroSerie) {
        super(marque, modele, annee, numeroSerie);
        this.niveauBatterie = 100;
    }
    // Méthode qui utilise un attribut protégé
    obtenirStatutComplet() {
        return `${this.description} - ${this.obtenirInfosMoteur()} - Batterie: ${this.niveauBatterie}%`;
    }
    charger() {
        this.niveauBatterie = 100;
        return `${this.description} est chargée à 100%`;
    }
}
exports.VoitureElectrique = VoitureElectrique;
// Exemples d'utilisation
const voiture1 = new Voiture("Toyota", "Camry", 2023, "TOY1234567890");
const voiture2 = new Voiture("Honda", "Civic", 2022, "HON0987654321");
const voitureElec = new VoitureElectrique("Tesla", "Model 3", 2023, "TES1122334455");
console.log("Attributs et méthodes de classe:");
console.log("Description:", voiture1.description);
console.log(voiture1.demarrer());
console.log("Numéro de série:", voiture1.numeroSerie);
console.log("Nombre total de voitures:", Voiture.obtenirNombreVoitures());
console.log(voitureElec.obtenirStatutComplet());
console.log(voitureElec.charger());
// Test du setter
try {
    voiture1.numeroSerie = "NOUVEAU123456789";
    console.log("Nouveau numéro:", voiture1.numeroSerie);
}
catch (error) {
    console.error("Erreur:", error instanceof Error ? error.message : "Erreur inconnue");
}
//# sourceMappingURL=05-attributs-methodes-classe.js.map