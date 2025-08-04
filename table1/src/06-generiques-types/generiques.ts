/**
 * Exemple : Génériques (Generics) et Types
 * Montre comment créer des types réutilisables et flexibles
 */

// Type générique simple
export class Conteneur<T> {
    private elements: T[] = [];

    ajouter(element: T): void {
        this.elements.push(element);
    }

    obtenirTous(): T[] {
        return [...this.elements]; // Copie pour éviter la mutation
    }

    obtenirPar(index: number): T | undefined {
        return this.elements[index];
    }

    taille(): number {
        return this.elements.length;
    }

    vider(): void {
        this.elements = [];
    }
}

// Interface générique
export interface Paire<T, U> {
    premier: T;
    second: U;
}

// Fonction générique
export function echanger<T, U>(paire: Paire<T, U>): Paire<U, T> {
    return {
        premier: paire.second,
        second: paire.premier
    };
}

// Contraintes sur les génériques
export interface Identifiable {
    id: number;
}

export class GestionnaireEntites<T extends Identifiable> {
    private entites: Map<number, T> = new Map();

    ajouter(entite: T): void {
        this.entites.set(entite.id, entite);
    }

    obtenirParId(id: number): T | undefined {
        return this.entites.get(id);
    }

    supprimer(id: number): boolean {
        return this.entites.delete(id);
    }

    obtenirToutesLesEntites(): T[] {
        return Array.from(this.entites.values());
    }
}

// Types d'union et littéraux
export type StatutCommande = 'en_attente' | 'traitement' | 'expediee' | 'livree' | 'annulee';
export type MoyenPaiement = 'carte' | 'especes' | 'virement' | 'cheque';

export interface Commande extends Identifiable {
    id: number;
    produits: string[];
    total: number;
    statut: StatutCommande;
    paiement: MoyenPaiement;
    dateCreation: Date;
}

// Types conditionnels
export type ApiResponse<T> = T extends string 
    ? { message: T; code: number }
    : { data: T; success: boolean };

// Types utilitaires
export type CommandePartielle = Partial<Commande>;
export type CommandeRequise = Required<Commande>;
export type CommandeSansId = Omit<Commande, 'id'>;
export type InfosCommande = Pick<Commande, 'id' | 'total' | 'statut'>;

// Exemples d'utilisation
export function exemplesGeneriques() {
    console.log("=== Exemples Génériques et Types ===");

    // Conteneur générique avec différents types
    const conteneurNombres = new Conteneur<number>();
    conteneurNombres.ajouter(1);
    conteneurNombres.ajouter(2);
    conteneurNombres.ajouter(3);
    console.log("Nombres:", conteneurNombres.obtenirTous());

    const conteneurTextes = new Conteneur<string>();
    conteneurTextes.ajouter("Hello");
    conteneurTextes.ajouter("World");
    console.log("Textes:", conteneurTextes.obtenirTous());

    // Paires génériques
    const paire1: Paire<string, number> = { premier: "Age", second: 25 };
    const paire2 = echanger(paire1);
    console.log("Paire originale:", paire1);
    console.log("Paire échangée:", paire2);

    // Gestionnaire d'entités avec contraintes
    const gestionnaireCommandes = new GestionnaireEntites<Commande>();
    
    const commande1: Commande = {
        id: 1,
        produits: ["Livre TypeScript", "Souris"],
        total: 59.99,
        statut: 'en_attente',
        paiement: 'carte',
        dateCreation: new Date()
    };

    gestionnaireCommandes.ajouter(commande1);
    console.log("Commande ajoutée:", gestionnaireCommandes.obtenirParId(1));

    // Types d'union
    const changerStatut = (commande: Commande, nouveauStatut: StatutCommande): void => {
        commande.statut = nouveauStatut;
        console.log(`Statut changé vers: ${nouveauStatut}`);
    };

    changerStatut(commande1, 'traitement');
    changerStatut(commande1, 'expediee');

    // Types utilitaires
    const commandePartielle: CommandePartielle = {
        id: 2,
        total: 29.99
    };
    
    const infosCommande: InfosCommande = {
        id: commande1.id,
        total: commande1.total,
        statut: commande1.statut
    };
    
    console.log("Commande partielle:", commandePartielle);
    console.log("Infos commande:", infosCommande);
}
