/**
 * Exemple : Constructeur, méthodes et this
 * Montre comment créer une classe avec constructeur et méthodes
 */

export class Personne {
    // Propriétés de la classe
    private nom: string;
    private age: number;
    private email: string;

    // Constructeur - méthode spéciale pour initialiser l'objet
    constructor(nom: string, age: number, email: string) {
        this.nom = nom;        // 'this' fait référence à l'instance courante
        this.age = age;
        this.email = email;
        console.log(`Nouvelle personne créée: ${this.nom}`);
    }

    // Méthodes de la classe
    sePresenter(): string {
        return `Bonjour, je suis ${this.nom}, j'ai ${this.age} ans.`;
    }

    changerEmail(nouvelEmail: string): void {
        this.email = nouvelEmail;
        console.log(`Email mis à jour pour ${this.nom}: ${this.email}`);
    }

    obtenirInfos(): object {
        return {
            nom: this.nom,
            age: this.age,
            email: this.email
        };
    }

    // Méthode avec utilisation de 'this' pour accéder aux propriétés
    estMajeur(): boolean {
        return this.age >= 18;
    }
}

// Exemple d'utilisation
export function exempleConstructeur() {
    console.log("=== Exemple Constructeur et Méthodes ===");
    
    const personne1 = new Personne("Alice", 25, "alice@email.com");
    const personne2 = new Personne("Bob", 17, "bob@email.com");

    console.log(personne1.sePresenter());
    console.log(personne2.sePresenter());
    
    console.log(`Alice est majeure: ${personne1.estMajeur()}`);
    console.log(`Bob est majeur: ${personne2.estMajeur()}`);

    personne1.changerEmail("alice.nouveau@email.com");
    console.log(personne1.obtenirInfos());
}
