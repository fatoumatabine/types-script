/**
 * TYPE BOOLEAN EN TYPESCRIPT
 * ==========================
 * 
 * Le type 'boolean' ne peut avoir que deux valeurs: true ou false
 * Très utilisé pour les conditions et la logique
 */

// ✅ DÉCLARATIONS EXPLICITES
let estActif: boolean = true;
let estTermine: boolean = false;
let utilisateurConnecte: boolean = true;

// ✅ DÉCLARATIONS IMPLICITES
let estValide = true; // TypeScript infère boolean
let aDesErreurs = false; // TypeScript infère boolean

// ✅ FONCTIONS RETOURNANT UN BOOLEAN
function estMajeur(age: number): boolean {
    return age >= 18;
}

function estPair(nombre: number): boolean {
    return nombre % 2 === 0;
}

function estVide(texte: string): boolean {
    return texte.length === 0;
}

// ✅ OPÉRATIONS LOGIQUES
function etLogique(a: boolean, b: boolean): boolean {
    return a && b; // AND logique
}

function ouLogique(a: boolean, b: boolean): boolean {
    return a || b; // OR logique
}

function nonLogique(valeur: boolean): boolean {
    return !valeur; // NOT logique
}

// ✅ UTILISATION DANS DES CONDITIONS
function verifierAcces(estConnecte: boolean, aPermission: boolean): string {
    if (estConnecte && aPermission) {
        return "Accès autorisé";
    } else if (estConnecte && !aPermission) {
        return "Permissions insuffisantes";
    } else {
        return "Veuillez vous connecter";
    }
}

// ✅ CONVERSION EN BOOLEAN
function convertirEnBoolean(valeur: any): boolean {
    return Boolean(valeur);
}

// ✅ VALIDATION AVEC BOOLEAN
interface Utilisateur {
    nom: string;
    email: string;
    estActif: boolean;
}

function validerUtilisateur(user: Utilisateur): boolean {
    return user.nom.length > 0 && 
           user.email.includes('@') && 
           user.estActif;
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE BOOLEAN ===");
console.log(`Est majeur (20 ans): ${estMajeur(20)}`);
console.log(`Est majeur (16 ans): ${estMajeur(16)}`);
console.log(`8 est pair: ${estPair(8)}`);
console.log(`7 est pair: ${estPair(7)}`);
console.log(`Chaîne vide: ${estVide("")}`);
console.log(`Chaîne "hello" vide: ${estVide("hello")}`);

// Test des opérations logiques
console.log(`true ET false = ${etLogique(true, false)}`);
console.log(`true OU false = ${ouLogique(true, false)}`);
console.log(`NON true = ${nonLogique(true)}`);

// Test de vérification d'accès
console.log(verifierAcces(true, true));
console.log(verifierAcces(true, false));
console.log(verifierAcces(false, true));

// Test de conversion
console.log(`Boolean(1) = ${convertirEnBoolean(1)}`);
console.log(`Boolean(0) = ${convertirEnBoolean(0)}`);
console.log(`Boolean("hello") = ${convertirEnBoolean("hello")}`);
console.log(`Boolean("") = ${convertirEnBoolean("")}`);

// Test de validation
const utilisateur1: Utilisateur = {
    nom: "Jean Dupont",
    email: "jean@example.com",
    estActif: true
};

const utilisateur2: Utilisateur = {
    nom: "",
    email: "invalid-email",
    estActif: false
};

console.log(`Utilisateur 1 valide: ${validerUtilisateur(utilisateur1)}`);
console.log(`Utilisateur 2 valide: ${validerUtilisateur(utilisateur2)}`);

// ✅ BOOLEAN COMME FLAG
class GestionnaireEtat {
    private _chargement: boolean = false;
    private _erreur: boolean = false;

    commencerChargement(): void {
        this._chargement = true;
        this._erreur = false;
    }

    terminerChargement(): void {
        this._chargement = false;
    }

    marquerErreur(): void {
        this._chargement = false;
        this._erreur = true;
    }

    get estEnChargement(): boolean {
        return this._chargement;
    }

    get aUneErreur(): boolean {
        return this._erreur;
    }
}

const gestionnaire = new GestionnaireEtat();
console.log(`En chargement: ${gestionnaire.estEnChargement}`);
gestionnaire.commencerChargement();
console.log(`En chargement: ${gestionnaire.estEnChargement}`);

export { 
    estMajeur, 
    estPair, 
    estVide, 
    etLogique, 
    ouLogique, 
    nonLogique,
    verifierAcces,
    convertirEnBoolean,
    validerUtilisateur,
    GestionnaireEtat
};
