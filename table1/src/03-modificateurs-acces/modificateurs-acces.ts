/**
 * Exemple : Modificateurs d'accès (private, public, protected)
 * Montre les différents niveaux de visibilité des propriétés et méthodes
 */

export class CompteBancaire {
    public titulaire: string;              // Accessible partout
    private solde: number;                 // Accessible seulement dans cette classe
    protected numeroCompte: string;       // Accessible dans cette classe et ses sous-classes
    readonly banque: string;               // Lecture seule après initialisation

    constructor(titulaire: string, soldeInitial: number, banque: string) {
        this.titulaire = titulaire;
        this.solde = soldeInitial;
        this.numeroCompte = this.genererNumeroCompte();
        this.banque = banque;
    }

    // Méthode publique - accessible depuis l'extérieur
    public deposer(montant: number): void {
        if (this.validerMontant(montant)) {
            this.solde += montant;
            console.log(`Dépôt de ${montant}€ effectué. Nouveau solde: ${this.solde}€`);
        }
    }

    // Méthode publique
    public retirer(montant: number): boolean {
        if (this.validerMontant(montant) && this.solde >= montant) {
            this.solde -= montant;
            console.log(`Retrait de ${montant}€ effectué. Nouveau solde: ${this.solde}€`);
            return true;
        } else {
            console.log("Retrait impossible: solde insuffisant ou montant invalide");
            return false;
        }
    }

    // Méthode publique pour accéder au solde privé
    public obtenirSolde(): number {
        return this.solde;
    }

    // Méthode privée - utilisable seulement dans cette classe
    private validerMontant(montant: number): boolean {
        return montant > 0 && montant <= 10000;
    }

    // Méthode privée
    private genererNumeroCompte(): string {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // Méthode protégée - accessible dans les sous-classes
    protected calculerFrais(montant: number): number {
        return montant * 0.01; // 1% de frais
    }

    // Méthode publique utilisant une méthode protégée
    public effectuerVirement(montant: number, compteDest: CompteBancaire): void {
        const frais = this.calculerFrais(montant);
        const montantTotal = montant + frais;
        
        if (this.retirer(montantTotal)) {
            compteDest.deposer(montant);
            console.log(`Virement de ${montant}€ effectué (frais: ${frais}€)`);
        }
    }
}

// Sous-classe montrant l'héritage des modificateurs d'accès
export class ComptePremium extends CompteBancaire {
    private limiteDeCreditPrivee: number;

    constructor(titulaire: string, soldeInitial: number, banque: string, limiteCredit: number) {
        super(titulaire, soldeInitial, banque);
        this.limiteDeCreditPrivee = limiteCredit;
    }

    // Peut accéder aux membres protégés de la classe parent
    public obtenirNumeroCompte(): string {
        return this.numeroCompte; // Accessible car protégé
    }

    // Redéfinition de la méthode protégée
    protected calculerFrais(montant: number): number {
        return montant * 0.005; // 0.5% de frais pour les comptes premium
    }

    // Nouvelle méthode utilisant les limites de crédit
    public retirerAvecCredit(montant: number): boolean {
        const soldeActuel = this.obtenirSolde();
        const montantDisponible = soldeActuel + this.limiteDeCreditPrivee;
        
        if (montant <= montantDisponible) {
            // Utilise les méthodes publiques car ne peut pas accéder aux propriétés privées
            return this.retirer(montant);
        } else {
            console.log("Retrait impossible: limite de crédit dépassée");
            return false;
        }
    }
}

// Exemple d'utilisation
export function exempleModificateursAcces() {
    console.log("=== Exemple Modificateurs d'accès ===");
    
    const compte1 = new CompteBancaire("Alice Dupont", 1000, "BNP Paribas");
    const compte2 = new CompteBancaire("Bob Martin", 500, "Crédit Agricole");
    
    // Accès aux propriétés et méthodes publiques
    console.log(`Titulaire: ${compte1.titulaire}`);
    console.log(`Banque: ${compte1.banque}`);
    console.log(`Solde: ${compte1.obtenirSolde()}€`);
    
    // Ces lignes provoqueraient des erreurs (propriétés privées/protégées):
    // console.log(compte1.solde);           // Erreur: propriété privée
    // console.log(compte1.numeroCompte);    // Erreur: propriété protégée
    // compte1.validerMontant(100);          // Erreur: méthode privée
    
    compte1.deposer(200);
    compte1.retirer(150);
    compte1.effectuerVirement(100, compte2);
    
    console.log(`Solde final Alice: ${compte1.obtenirSolde()}€`);
    console.log(`Solde final Bob: ${compte2.obtenirSolde()}€`);
    
    // Compte Premium
    const comptePremium = new ComptePremium("Charlie Riche", 2000, "LCL", 1000);
    console.log(`Numéro de compte premium: ${comptePremium.obtenirNumeroCompte()}`);
    comptePremium.retirerAvecCredit(2500); // Utilise le crédit
}
