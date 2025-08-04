/**
 * Exemple : Constructeur privé (Pattern Singleton)
 * Montre comment utiliser un constructeur privé pour contrôler l'instanciation
 */

export class ConfigurationApp {
    private static instance: ConfigurationApp;
    private parametres: Map<string, any>;

    // Constructeur privé - ne peut pas être appelé depuis l'extérieur
    private constructor() {
        this.parametres = new Map();
        this.parametres.set('theme', 'dark');
        this.parametres.set('langue', 'fr');
        this.parametres.set('debug', false);
    }

    // Méthode statique pour obtenir l'instance unique (Singleton)
    public static getInstance(): ConfigurationApp {
        if (!ConfigurationApp.instance) {
            ConfigurationApp.instance = new ConfigurationApp();
        }
        return ConfigurationApp.instance;
    }

    public setParametre(cle: string, valeur: any): void {
        this.parametres.set(cle, valeur);
    }

    public getParametre(cle: string): any {
        return this.parametres.get(cle);
    }

    public afficherTousLesParametres(): void {
        console.log("Configuration actuelle:");
        this.parametres.forEach((valeur, cle) => {
            console.log(`  ${cle}: ${valeur}`);
        });
    }
}

// Classe avec constructeur privé pour factory pattern
export class Produit {
    private constructor(
        private nom: string,
        private prix: number,
        private type: 'physique' | 'numerique'
    ) {}

    // Factory methods - façons contrôlées de créer des instances
    public static creerProduitPhysique(nom: string, prix: number): Produit {
        return new Produit(nom, prix, 'physique');
    }

    public static creerProduitNumerique(nom: string, prix: number): Produit {
        return new Produit(nom, prix, 'numerique');
    }

    public obtenirInfos(): string {
        return `${this.nom} (${this.type}) - ${this.prix}€`;
    }
}

// Exemple d'utilisation
export function exempleConstructeurPrive() {
    console.log("=== Exemple Constructeur Privé ===");
    
    // Singleton pattern
    const config1 = ConfigurationApp.getInstance();
    const config2 = ConfigurationApp.getInstance();
    
    console.log("Les deux instances sont identiques:", config1 === config2);
    
    config1.setParametre('theme', 'light');
    console.log("Thème depuis config2:", config2.getParametre('theme'));
    
    config1.afficherTousLesParametres();

    // Factory pattern
    const livre = Produit.creerProduitPhysique("TypeScript Guide", 29.99);
    const logiciel = Produit.creerProduitNumerique("VS Code Extension", 9.99);
    
    console.log(livre.obtenirInfos());
    console.log(logiciel.obtenirInfos());
    
    // Ceci ne fonctionnerait pas (constructeur privé):
    // const produit = new Produit("Test", 10, "physique"); // Erreur!
}
