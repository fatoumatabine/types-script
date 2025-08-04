/**
 * TYPE UNION EN TYPESCRIPT
 * ========================
 * 
 * Les types union permettent à une variable d'accepter plusieurs types
 * Utilisé avec le symbole | (pipe) pour combiner différents types
 */

// ✅ UNION BASIQUE DE TYPES PRIMITIFS
let identifiant: string | number;
identifiant = "ABC123";  // ✅ OK
identifiant = 12345;     // ✅ OK
// identifiant = true;   // ❌ Erreur: boolean n'est pas autorisé

// ✅ UNION AVEC TYPES LITTÉRAUX
type Statut = "actif" | "inactif" | "suspendu";
type Taille = "S" | "M" | "L" | "XL";
type Couleur = "rouge" | "vert" | "bleu" | "jaune";

function changerStatut(nouveauStatut: Statut): void {
    console.log(`Statut changé vers: ${nouveauStatut}`);
}

// ✅ UNION AVEC TYPES PERSONNALISÉS
interface Chien {
    type: "chien";
    race: string;
    aboie: () => void;
}

interface Chat {
    type: "chat";
    couleurPelage: string;
    miaule: () => void;
}

interface Oiseau {
    type: "oiseau";
    espece: string;
    vole: () => void;
}

type Animal = Chien | Chat | Oiseau;

// ✅ FONCTION AVEC PARAMÈTRE UNION
function traiterAnimal(animal: Animal): string {
    // Type guard avec discriminated union
    switch (animal.type) {
        case "chien":
            animal.aboie(); // TypeScript sait que c'est un Chien
            return `Chien de race ${animal.race}`;
        case "chat":
            animal.miaule(); // TypeScript sait que c'est un Chat
            return `Chat avec pelage ${animal.couleurPelage}`;
        case "oiseau":
            animal.vole(); // TypeScript sait que c'est un Oiseau
            return `Oiseau de l'espèce ${animal.espece}`;
        default:
            // TypeScript s'assure que tous les cas sont couverts
            const _exhaustiveCheck: never = animal;
            return _exhaustiveCheck;
    }
}

// ✅ UNION AVEC NULL ET UNDEFINED
type Valeur = string | number | null | undefined;

function traiterValeur(valeur: Valeur): string {
    if (valeur === null) {
        return "Valeur nulle";
    }
    if (valeur === undefined) {
        return "Valeur indéfinie";
    }
    if (typeof valeur === "string") {
        return `Chaîne: ${valeur}`;
    }
    if (typeof valeur === "number") {
        return `Nombre: ${valeur}`;
    }
    // Cette ligne ne sera jamais atteinte
    return "Type inconnu";
}

// ✅ UNION DE TYPES DE FONCTION
type OperationNombre = (a: number, b: number) => number;
type OperationTexte = (a: string, b: string) => string;

function executerNombre(operation: OperationNombre, a: number, b: number): number {
    return operation(a, b);
}

function executerTexte(operation: OperationTexte, a: string, b: string): string {
    return operation(a, b);
}

const addition: OperationNombre = (a: number, b: number) => a + b;
const concatenation: OperationTexte = (a: string, b: string) => a + b;

// ✅ UNION AVEC ARRAYS
type DonneesEntree = number[] | string[] | boolean[];

function traiterDonnees(donnees: DonneesEntree): string {
    if (typeof donnees[0] === "number") {
        // TypeScript infère que c'est number[]
        const nombres = donnees as number[];
        const somme = nombres.reduce((acc, val) => acc + val, 0);
        return `Somme des nombres: ${somme}`;
    }
    if (typeof donnees[0] === "string") {
        // TypeScript infère que c'est string[]
        const textes = donnees as string[];
        return `Textes joints: ${textes.join(", ")}`;
    }
    if (typeof donnees[0] === "boolean") {
        // TypeScript infère que c'est boolean[]
        const booleans = donnees as boolean[];
        const vrais = booleans.filter(b => b).length;
        return `Nombre de valeurs vraies: ${vrais}`;
    }
    return "Type de données non reconnu";
}

// ✅ TYPE GUARDS PERSONNALISÉS
function estNombre(valeur: string | number): valeur is number {
    return typeof valeur === "number";
}

function estChaine(valeur: string | number): valeur is string {
    return typeof valeur === "string";
}

function traiterAvecTypeGuard(valeur: string | number): void {
    if (estNombre(valeur)) {
        // TypeScript sait maintenant que valeur est number
        console.log(`C'est un nombre: ${valeur.toFixed(2)}`);
    } else if (estChaine(valeur)) {
        // TypeScript sait maintenant que valeur est string
        console.log(`C'est une chaîne: ${valeur.toUpperCase()}`);
    }
}

// ✅ UNION AVEC OBJETS OPTIONNELS
interface ConfigurationBase {
    nom: string;
    version: string;
}

interface ConfigurationAvancee extends ConfigurationBase {
    debug: boolean;
    timeout: number;
}

type Configuration = ConfigurationBase | ConfigurationAvancee;

function initialiserApp(config: Configuration): void {
    console.log(`App: ${config.nom} v${config.version}`);
    
    // Vérification si c'est la configuration avancée
    if ('debug' in config && 'timeout' in config) {
        console.log(`Mode debug: ${config.debug}`);
        console.log(`Timeout: ${config.timeout}ms`);
    }
}

// ✅ UNION AVEC CLASSES
class Voiture {
    constructor(public marque: string, public modele: string) {}
    
    demarrer(): string {
        return `La voiture ${this.marque} ${this.modele} démarre`;
    }
}

class Velo {
    constructor(public type: string, public vitesses: number) {}
    
    pedaler(): string {
        return `Pédalage sur le vélo ${this.type} à ${this.vitesses} vitesses`;
    }
}

type Vehicule = Voiture | Velo;

function utiliserVehicule(vehicule: Vehicule): string {
    if (vehicule instanceof Voiture) {
        return vehicule.demarrer();
    } else {
        return vehicule.pedaler();
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE UNION ===");

// Test union basique
console.log(`Identifiant string: ${identifiant}`);

// Test statuts
changerStatut("actif");
changerStatut("suspendu");

// Test animaux
const monChien: Chien = {
    type: "chien",
    race: "Labrador",
    aboie: () => console.log("Woof!")
};

const monChat: Chat = {
    type: "chat", 
    couleurPelage: "gris",
    miaule: () => console.log("Miaou!")
};

console.log(traiterAnimal(monChien));
console.log(traiterAnimal(monChat));

// Test valeurs nullables
console.log(traiterValeur("Hello"));
console.log(traiterValeur(42));
console.log(traiterValeur(null));
console.log(traiterValeur(undefined));

// Test opérations
console.log(`Addition: ${executerNombre(addition, 5, 3)}`);
console.log(`Concaténation: ${executerTexte(concatenation, "Hello", " World")}`);

// Test données
console.log(traiterDonnees([1, 2, 3, 4, 5]));
console.log(traiterDonnees(["pomme", "banane", "orange"]));
console.log(traiterDonnees([true, false, true, true]));

// Test type guards
traiterAvecTypeGuard(42);
traiterAvecTypeGuard("TypeScript");

// Test configuration
const configSimple: ConfigurationBase = {
    nom: "MonApp",
    version: "1.0.0"
};

const configAvancee: ConfigurationAvancee = {
    nom: "MonApp Pro",
    version: "2.0.0",
    debug: true,
    timeout: 5000
};

initialiserApp(configSimple);
initialiserApp(configAvancee);

// Test véhicules
const maVoiture = new Voiture("Toyota", "Prius");
const monVelo = new Velo("VTT", 21);

console.log(utiliserVehicule(maVoiture));
console.log(utiliserVehicule(monVelo));

export {
    changerStatut,
    traiterAnimal,
    traiterValeur,
    executerNombre,
    executerTexte,
    traiterDonnees,
    estNombre,
    estChaine,
    traiterAvecTypeGuard,
    initialiserApp,
    utiliserVehicule,
    Voiture,
    Velo
};
