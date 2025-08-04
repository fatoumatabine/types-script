/**
 * Fichier principal - Point d'entrée de tous les exemples TypeScript
 * Importe et exécute tous les exemples des différents concepts
 */

// Imports de tous les exemples
import { exempleConstructeur } from './01-constructeur-methodes/constructeur';
import { exempleConstructeurPrive } from './02-constructeur-prive/constructeur-prive';
import { exempleModificateursAcces } from './03-modificateurs-acces/modificateurs-acces';
import { exempleInterfaceClasse } from './04-interface-classe/interface-classe';
import { exempleHeritage } from './05-heritage/heritage';
import { exemplesGeneriques } from './06-generiques-types/generiques';
import { exempleDecorators } from './07-decorators/decorators';
import { exemplesTypesAvances } from './08-types-avances/types-avances';
import { exempleAsynchrone } from './09-asynchrone/asynchrone';

/**
 * Fonction principale qui exécute tous les exemples
 */
async function executerTousLesExemples(): Promise<void> {
    console.log("🚀 DÉMARRAGE DES EXEMPLES TYPESCRIPT");
    console.log("=====================================");
    
    try {
        // 1. Constructeur et méthodes
        console.log("\n📝 1. CONSTRUCTEUR ET MÉTHODES");
        exempleConstructeur();
        
        // 2. Constructeur privé
        console.log("\n🔒 2. CONSTRUCTEUR PRIVÉ");
        exempleConstructeurPrive();
        
        // 3. Modificateurs d'accès
        console.log("\n🔐 3. MODIFICATEURS D'ACCÈS");
        exempleModificateursAcces();
        
        // 4. Interface et classe concrète
        console.log("\n📋 4. INTERFACE ET CLASSE CONCRÈTE");
        exempleInterfaceClasse();
        
        // 5. Héritage
        console.log("\n🧬 5. HÉRITAGE");
        exempleHeritage();
        
        // 6. Génériques et Types
        console.log("\n🎯 6. GÉNÉRIQUES ET TYPES");
        exemplesGeneriques();
        
        // 7. Décorateurs
        console.log("\n✨ 7. DÉCORATEURS");
        exempleDecorators();
        
        // 8. Types avancés
        console.log("\n🔬 8. TYPES AVANCÉS");
        exemplesTypesAvances();
        
        // 9. Code asynchrone
        console.log("\n⚡ 9. CODE ASYNCHRONE");
        await exempleAsynchrone();
        
    } catch (error) {
        console.error("❌ Erreur lors de l'exécution des exemples:", error);
    }
    
    console.log("\n✅ TOUS LES EXEMPLES ONT ÉTÉ EXÉCUTÉS");
    console.log("=====================================");
}

/**
 * Fonction utilitaire pour créer une séparation visuelle
 */
function afficherSeparateur(titre: string): void {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`  ${titre}`);
    console.log(`${'='.repeat(50)}`);
}

/**
 * Démonstration de concepts TypeScript additionnels
 */
function conceptsSupplementaires(): void {
    afficherSeparateur("CONCEPTS SUPPLÉMENTAIRES");
    
    // Types littéraux
    type Direction = 'haut' | 'bas' | 'gauche' | 'droite';
    const direction: Direction = 'haut';
    console.log(`Direction choisie: ${direction}`);
    
    // Types d'assertion (exemple pour le DOM - non disponible en Node.js)
    // const element = document.getElementById('monElement') as HTMLInputElement;
    // console.log("Element:", element?.value);
    console.log("Types d'assertion démontrés (DOM non disponible en Node.js)");
    
    // Types de garde (Type Guards)
    function estString(valeur: any): valeur is string {
        return typeof valeur === 'string';
    }
    
    function traiterValeur(valeur: string | number): void {
        if (estString(valeur)) {
            console.log(`Traitement d'une chaîne: ${valeur.toUpperCase()}`);
        } else {
            console.log(`Traitement d'un nombre: ${valeur * 2}`);
        }
    }
    
    traiterValeur("hello");
    traiterValeur(42);
    
    // Types mappés
    interface PersonneBase {
        nom: string;
        age: number;
        email: string;
    }
    
    type PersonneOptionnelle = {
        [K in keyof PersonneBase]?: PersonneBase[K];
    };
    
    const personnPartielle: PersonneOptionnelle = {
        nom: "Alice"
        // age et email sont optionnels
    };
    
    console.log("Personne partielle:", personnPartielle);
    
    // Keyof et Lookup Types
    type ClefsPersonne = keyof PersonneBase; // "nom" | "age" | "email"
    type TypeAge = PersonneBase['age']; // number
    
    console.log("Démonstration des types avancés terminée");
}

// Point d'entrée du programme
if (require.main === module) {
    executerTousLesExemples().then(() => {
        conceptsSupplementaires();
    }).catch(error => {
        console.error("Erreur fatale:", error);
    });
}

// Exports pour utilisation dans d'autres modules
export {
    executerTousLesExemples,
    conceptsSupplementaires,
    afficherSeparateur
};
