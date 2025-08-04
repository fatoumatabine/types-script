/**
 * Exemple : Décorateurs (Decorators) - VERSION SIMPLIFIÉE
 * Les décorateurs sont une fonctionnalité expérimentale de TypeScript
 * Cette version évite les erreurs de compatibilité
 */

// Décorateur de classe simple (version compatible)
export function Entite(nom: string) {
    return function<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            nomEntite = nom;
            dateCreation = new Date();
        };
    };
}

// Version simplifiée du décorateur de logging
export function creerDecoratorLog() {
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        
        descriptor.value = function(...args: any[]) {
            console.log(`[LOG] Appel de ${propertyName} avec arguments:`, args);
            const result = method.apply(this, args);
            console.log(`[LOG] Résultat de ${propertyName}:`, result);
            return result;
        };
    };
}

// Classe exemple sans décorateurs problématiques
@Entite("Utilisateur")
export class Utilisateur {
    public nom: string;
    public email: string;
    public age: number;

    constructor(nom: string, email: string, age: number) {
        this.nom = nom;
        this.email = email;
        this.age = age;
    }

    obtenirInfos(): string {
        return `${this.nom} (${this.email}) - ${this.age} ans`;
    }

    changerEmail(nouvelEmail: string): void {
        this.email = nouvelEmail;
    }

    calculerAge(anneeNaissance: number): number {
        return new Date().getFullYear() - anneeNaissance;
    }
}

// Exemple d'utilisation des décorateurs
export function exempleDecorators() {
    console.log("=== Exemple Décorateurs (Version Simplifiée) ===");
    
    try {
        const utilisateur = new Utilisateur("Alice", "alice@email.com", 25);
        console.log("Utilisateur créé:", utilisateur.obtenirInfos());
        
        utilisateur.changerEmail("alice.nouveau@email.com");
        console.log("Email changé:", utilisateur.obtenirInfos());
        
        // Vérification des propriétés ajoutées par le décorateur @Entite
        console.log("Nom entité:", (utilisateur as any).nomEntite);
        console.log("Date création:", (utilisateur as any).dateCreation);
        
    } catch (error) {
        console.error("Erreur:", error);
    }
}
