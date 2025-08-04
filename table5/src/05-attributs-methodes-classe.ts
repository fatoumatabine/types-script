// 5. ATTRIBUTS ET MÉTHODES DE CLASSE
// ===================================

class Voiture {
  // Attributs publics (accessibles partout)
  public marque: string;
  public modele: string;

  // Attributs privés (accessibles uniquement dans cette classe)
  private _numeroSerie: string;
  private _moteurDemarre: boolean = false;

  // Attributs protégés (accessibles dans cette classe et ses sous-classes)
  protected annee: number;

  // Attribut statique (appartient à la classe, pas à l'instance)
  static nombreVoitures: number = 0;

  // Attribut readonly (lecture seule après initialisation)
  readonly identifiant: string;

  // Constructeur avec paramètres typés
  constructor(marque: string, modele: string, annee: number, numeroSerie: string) {
    this.marque = marque;
    this.modele = modele;
    this.annee = annee;
    this._numeroSerie = numeroSerie;
    this.identifiant = `${marque}-${modele}-${Date.now()}`;
    
    // Incrémenter le compteur statique
    Voiture.nombreVoitures++;
  }

  // Getter (propriété calculée)
  get description(): string {
    return `${this.marque} ${this.modele} (${this.annee})`;
  }

  // Setter (contrôle la modification d'une propriété)
  set numeroSerie(nouveau: string) {
    if (nouveau.length >= 10) {
      this._numeroSerie = nouveau;
    } else {
      throw new Error("Le numéro de série doit contenir au moins 10 caractères");
    }
  }

  // Getter pour accéder à un attribut privé
  get numeroSerie(): string {
    return this._numeroSerie;
  }

  // Méthode publique
  demarrer(): string {
    if (!this._moteurDemarre) {
      this._moteurDemarre = true;
      return `${this.description} a démarré!`;
    }
    return `${this.description} est déjà démarrée.`;
  }

  // Méthode publique
  arreter(): string {
    if (this._moteurDemarre) {
      this._moteurDemarre = false;
      return `${this.description} s'est arrêtée.`;
    }
    return `${this.description} est déjà arrêtée.`;
  }

  // Méthode privée (utilisable uniquement dans cette classe)
  private verifierEtat(): boolean {
    return this._moteurDemarre;
  }

  // Méthode protégée (utilisable dans cette classe et ses sous-classes)
  protected obtenirInfosMoteur(): string {
    return `Moteur ${this.verifierEtat() ? 'démarré' : 'arrêté'}`;
  }

  // Méthode statique (appartient à la classe)
  static obtenirNombreVoitures(): number {
    return Voiture.nombreVoitures;
  }

  // Méthode statique pour créer une voiture avec des valeurs par défaut
  static creerVoitureTest(): Voiture {
    return new Voiture("Test", "Model", 2023, "TEST123456789");
  }
}

// Classe qui hérite et utilise les attributs protégés
class VoitureElectrique extends Voiture {
  private niveauBatterie: number = 100;

  constructor(marque: string, modele: string, annee: number, numeroSerie: string) {
    super(marque, modele, annee, numeroSerie);
  }

  // Méthode qui utilise un attribut protégé
  obtenirStatutComplet(): string {
    return `${this.description} - ${this.obtenirInfosMoteur()} - Batterie: ${this.niveauBatterie}%`;
  }

  charger(): string {
    this.niveauBatterie = 100;
    return `${this.description} est chargée à 100%`;
  }
}

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
} catch (error) {
  console.error("Erreur:", error instanceof Error ? error.message : "Erreur inconnue");
}

export { Voiture, VoitureElectrique };
