/**
 * Exemple : Interface et classe concrète
 * Montre comment définir des contrats avec les interfaces et les implémenter
 */

// Interface définissant un contrat pour les véhicules
export interface IVehicule {
    marque: string;
    modele: string;
    annee: number;
    
    demarrer(): void;
    arreter(): void;
    obtenirInfos(): string;
}

// Interface pour les véhicules électriques
export interface IVehiculeElectrique {
    autonomie: number;
    niveauBatterie: number;
    
    charger(duree: number): void;
    obtenirAutonomieRestante(): number;
}

// Interface pour les services de maintenance
export interface IServiceMaintenance {
    effectuerMaintenance(vehicule: IVehicule): void;
    calculerCoutMaintenance(vehicule: IVehicule): number;
}

// Classe concrète implémentant l'interface IVehicule
export class Voiture implements IVehicule {
    public marque: string;
    public modele: string;
    public annee: number;
    private enMarche: boolean = false;
    private kilometrage: number;

    constructor(marque: string, modele: string, annee: number, kilometrage: number = 0) {
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.kilometrage = kilometrage;
    }

    // Implémentation obligatoire des méthodes de l'interface
    demarrer(): void {
        if (!this.enMarche) {
            this.enMarche = true;
            console.log(`${this.marque} ${this.modele} démarrée`);
        } else {
            console.log("La voiture est déjà en marche");
        }
    }

    arreter(): void {
        if (this.enMarche) {
            this.enMarche = false;
            console.log(`${this.marque} ${this.modele} arrêtée`);
        } else {
            console.log("La voiture est déjà arrêtée");
        }
    }

    obtenirInfos(): string {
        return `${this.marque} ${this.modele} (${this.annee}) - ${this.kilometrage} km`;
    }

    // Méthodes spécifiques à la classe Voiture
    rouler(distance: number): void {
        if (this.enMarche) {
            this.kilometrage += distance;
            console.log(`Parcouru ${distance} km. Kilométrage total: ${this.kilometrage} km`);
        } else {
            console.log("Démarrez d'abord la voiture");
        }
    }
}

// Classe implémentant plusieurs interfaces
export class VoitureElectrique implements IVehicule, IVehiculeElectrique {
    public marque: string;
    public modele: string;
    public annee: number;
    public autonomie: number;
    public niveauBatterie: number;
    private enMarche: boolean = false;

    constructor(marque: string, modele: string, annee: number, autonomie: number) {
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.autonomie = autonomie;
        this.niveauBatterie = 100; // Commence avec batterie pleine
    }

    // Implémentation de IVehicule
    demarrer(): void {
        if (this.niveauBatterie > 0) {
            this.enMarche = true;
            console.log(`${this.marque} ${this.modele} électrique démarrée`);
        } else {
            console.log("Batterie vide, impossible de démarrer");
        }
    }

    arreter(): void {
        this.enMarche = false;
        console.log(`${this.marque} ${this.modele} électrique arrêtée`);
    }

    obtenirInfos(): string {
        return `${this.marque} ${this.modele} (${this.annee}) - Électrique - Batterie: ${this.niveauBatterie}%`;
    }

    // Implémentation de IVehiculeElectrique
    charger(duree: number): void {
        const chargementParHeure = 20; // 20% par heure
        const chargement = Math.min(duree * chargementParHeure, 100 - this.niveauBatterie);
        this.niveauBatterie += chargement;
        console.log(`Chargé pendant ${duree}h. Niveau de batterie: ${this.niveauBatterie}%`);
    }

    obtenirAutonomieRestante(): number {
        return (this.autonomie * this.niveauBatterie) / 100;
    }

    // Méthode spécifique
    roulerElectrique(distance: number): void {
        if (!this.enMarche) {
            console.log("Démarrez d'abord la voiture");
            return;
        }

        const consommation = (distance / this.autonomie) * 100;
        if (consommation <= this.niveauBatterie) {
            this.niveauBatterie -= consommation;
            console.log(`Parcouru ${distance} km. Batterie restante: ${this.niveauBatterie.toFixed(1)}%`);
        } else {
            console.log("Autonomie insuffisante pour cette distance");
        }
    }
}

// Classe concrète implémentant un service
export class ServiceMaintenanceAuto implements IServiceMaintenance {
    private tarifHoraire: number;

    constructor(tarifHoraire: number = 75) {
        this.tarifHoraire = tarifHoraire;
    }

    effectuerMaintenance(vehicule: IVehicule): void {
        console.log(`Début de la maintenance pour ${vehicule.obtenirInfos()}`);
        console.log("- Vérification des niveaux");
        console.log("- Contrôle des freins");
        console.log("- Vérification des pneus");
        console.log("Maintenance terminée");
    }

    calculerCoutMaintenance(vehicule: IVehicule): number {
        const ageVehicule = new Date().getFullYear() - vehicule.annee;
        const heuresBase = 2;
        const heuresSupplementaires = ageVehicule > 5 ? 1 : 0;
        
        return (heuresBase + heuresSupplementaires) * this.tarifHoraire;
    }

    // Méthode spécialisée pour les véhicules électriques
    effectuerMaintenanceElectrique(vehicule: IVehiculeElectrique & IVehicule): void {
        this.effectuerMaintenance(vehicule);
        console.log("- Vérification de la batterie");
        console.log("- Contrôle du système électrique");
        console.log("Maintenance électrique terminée");
    }
}

// Exemple d'utilisation
export function exempleInterfaceClasse() {
    console.log("=== Exemple Interface et Classe Concrète ===");
    
    // Utilisation d'une voiture classique
    const voiture: IVehicule = new Voiture("Toyota", "Corolla", 2020, 25000);
    console.log(voiture.obtenirInfos());
    voiture.demarrer();
    
    if (voiture instanceof Voiture) {
        voiture.rouler(50); // Méthode spécifique à la classe Voiture
    }
    
    voiture.arreter();
    
    // Utilisation d'une voiture électrique
    const tesla: IVehicule & IVehiculeElectrique = new VoitureElectrique("Tesla", "Model 3", 2023, 500);
    console.log(tesla.obtenirInfos());
    console.log(`Autonomie restante: ${tesla.obtenirAutonomieRestante()} km`);
    
    tesla.demarrer();
    
    if (tesla instanceof VoitureElectrique) {
        tesla.roulerElectrique(100);
        tesla.charger(2);
    }
    
    tesla.arreter();
    
    // Service de maintenance
    const service = new ServiceMaintenanceAuto(80);
    
    console.log(`\nCoût maintenance voiture: ${service.calculerCoutMaintenance(voiture)}€`);
    service.effectuerMaintenance(voiture);
    
    console.log(`\nCoût maintenance Tesla: ${service.calculerCoutMaintenance(tesla)}€`);
    service.effectuerMaintenanceElectrique(tesla);
    
    // Polymorphisme - traiter différents types via la même interface
    const vehicules: IVehicule[] = [voiture, tesla];
    console.log("\n=== Liste des véhicules ===");
    vehicules.forEach((v, index) => {
        console.log(`${index + 1}. ${v.obtenirInfos()}`);
    });
}
