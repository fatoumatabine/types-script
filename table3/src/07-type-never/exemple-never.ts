/**
 * TYPE NEVER EN TYPESCRIPT
 * ========================
 * 
 * Le type 'never' représente des valeurs qui ne peuvent jamais se produire
 * Utilisé pour les fonctions qui ne retournent jamais ou les cas impossibles
 */

// ✅ FONCTION QUI NE RETOURNE JAMAIS (LANCE UNE ERREUR)
function lancerErreur(message: string): never {
    throw new Error(message);
}

// ✅ FONCTION AVEC BOUCLE INFINIE
function boucleInfinie(): never {
    while (true) {
        console.log("Cette boucle ne se termine jamais");
        // En réalité, on évite les vraies boucles infinies
        break; // On sort pour l'exemple
    }
    // Cette ligne ne sera jamais atteinte
    throw new Error("Cette ligne ne devrait jamais être exécutée");
}

// ✅ UTILISATION AVEC DISCRIMINATED UNIONS
interface Cercle {
    type: "cercle";
    rayon: number;
}

interface Rectangle {
    type: "rectangle";
    largeur: number;
    hauteur: number;
}

interface Triangle {
    type: "triangle";
    base: number;
    hauteur: number;
}

type Forme = Cercle | Rectangle | Triangle;

function calculerAire(forme: Forme): number {
    switch (forme.type) {
        case "cercle":
            return Math.PI * forme.rayon * forme.rayon;
        case "rectangle":
            return forme.largeur * forme.hauteur;
        case "triangle":
            return (forme.base * forme.hauteur) / 2;
        default:
            // Cette fonction assure que tous les cas sont couverts
            const _exhaustiveCheck: never = forme;
            return _exhaustiveCheck;
    }
}

// ✅ FONCTION DE VALIDATION QUI LANCE DES ERREURS
function validerAge(age: number): number {
    if (age < 0) {
        lancerErreur("L'âge ne peut pas être négatif");
    }
    if (age > 150) {
        lancerErreur("L'âge ne peut pas dépasser 150 ans");
    }
    return age;
}

// ✅ TYPE GUARD QUI LANCE UNE ERREUR
function assertionNever(valeur: never): never {
    throw new Error(`Valeur inattendue: ${valeur}`);
}

// ✅ UTILISATION DANS UN SWITCH AVEC TYPES UNION
type Statut = "en_attente" | "en_cours" | "termine" | "erreur";

function traiterStatut(statut: Statut): string {
    switch (statut) {
        case "en_attente":
            return "Processus en attente";
        case "en_cours":
            return "Processus en cours d'exécution";
        case "termine":
            return "Processus terminé avec succès";
        case "erreur":
            return "Erreur dans le processus";
        default:
            // Si on ajoute un nouveau statut et qu'on oublie de l'implémenter,
            // TypeScript nous alertera ici
            return assertionNever(statut);
    }
}

// ✅ FONCTION QUI PEUT SOIT RETOURNER UNE VALEUR SOIT NEVER
function traiterEntree(entree: string | number): string {
    if (typeof entree === "string") {
        return `Chaîne reçue: ${entree}`;
    }
    if (typeof entree === "number") {
        return `Nombre reçu: ${entree}`;
    }
    // Cette ligne ne devrait jamais être atteinte si les types sont corrects
    return assertionNever(entree);
}

// ✅ UTILISATION AVEC TRY/CATCH
function divisionSecurisee(a: number, b: number): number {
    if (b === 0) {
        lancerErreur("Division par zéro impossible");
    }
    return a / b;
}

function executerDivision(a: number, b: number): string {
    try {
        const resultat = divisionSecurisee(a, b);
        return `Résultat: ${resultat}`;
    } catch (error) {
        return `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    }
}

// ✅ TYPE NEVER DANS LES PROMESSES
function promesseQuiEchoue(): Promise<never> {
    return Promise.reject(new Error("Cette promesse échoue toujours"));
}

async function gererPromesseQuiEchoue(): Promise<string> {
    try {
        await promesseQuiEchoue();
        // Cette ligne ne sera jamais atteinte
        return "Succès";
    } catch (error) {
        return `Erreur capturée: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
    }
}

// ✅ UTILISATION AVEC DES TYPES CONDITIONNELS
type ExclureNever<T> = T extends never ? never : T;

type ExempleType = ExclureNever<string | never | number>; // string | number

// ✅ FONCTION QUI UTILISE NEVER POUR LA SÉCURITÉ DE TYPE
function analyserCode(code: "A" | "B" | "C"): string {
    switch (code) {
        case "A":
            return "Code Alpha";
        case "B":  
            return "Code Beta";
        case "C":
            return "Code Charlie";
        default:
            // Si quelqu'un ajoute un nouveau code sans mettre à jour cette fonction,
            // TypeScript générera une erreur de compilation
            const _exhaustive: never = code;
            throw new Error(`Code non géré: ${_exhaustive}`);
    }
}

// ✅ CLASSE AVEC MÉTHODES QUI PEUVENT LANCER DES ERREURS
class GestionnaireErreur {
    private erreurs: string[] = [];

    ajouterErreur(erreur: string): void {
        this.erreurs.push(erreur);
    }

    obtenirErreurs(): string[] {
        return [...this.erreurs];
    }

    lancerSiErreurs(): never | void {
        if (this.erreurs.length > 0) {
            const message = `Erreurs détectées: ${this.erreurs.join(", ")}`;
            throw new Error(message);
        }
        // Si pas d'erreurs, la fonction retourne void (implicitement)
    }

    viderErreurs(): void {
        this.erreurs = [];
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE NEVER ===");

// Test calcul d'aire
const cercle: Cercle = { type: "cercle", rayon: 5 };
const rectangle: Rectangle = { type: "rectangle", largeur: 10, hauteur: 6 };

console.log(`Aire du cercle: ${calculerAire(cercle).toFixed(2)}`);
console.log(`Aire du rectangle: ${calculerAire(rectangle)}`);

// Test validation d'âge
try {
    console.log(`Âge valide: ${validerAge(25)}`);
    console.log(`Âge invalide: ${validerAge(-5)}`); // Lancera une erreur
} catch (error) {
    console.log(`Erreur capturée: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
}

// Test traitement de statut
console.log(traiterStatut("en_cours"));
console.log(traiterStatut("termine"));

// Test traitement d'entrée
console.log(traiterEntree("Hello"));
console.log(traiterEntree(42));

// Test division sécurisée
console.log(executerDivision(10, 2));
console.log(executerDivision(10, 0));

// Test promesse qui échoue
gererPromesseQuiEchoue().then(result => {
    console.log(`Résultat de la promesse: ${result}`);
});

// Test analyse de code
console.log(analyserCode("A"));
console.log(analyserCode("B"));

// Test gestionnaire d'erreur
const gestionnaire = new GestionnaireErreur();
console.log("Aucune erreur initialement");

try {
    gestionnaire.lancerSiErreurs(); // Ne lance pas d'erreur
    console.log("Aucune erreur à lancer");
} catch (error) {
    console.log("Une erreur aurait dû être lancée ici");
}

gestionnaire.ajouterErreur("Erreur 1");
gestionnaire.ajouterErreur("Erreur 2");

try {
    gestionnaire.lancerSiErreurs(); // Lance une erreur
} catch (error) {
    console.log(`Erreurs détectées: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
}

// ✅ UTILISATION AVEC FILTRE
function filtrerEtValider<T>(
    tableau: T[], 
    predicat: (item: T) => boolean,
    messageErreur: string
): T[] | never {
    const resultats = tableau.filter(predicat);
    if (resultats.length === 0) {
        lancerErreur(messageErreur);
    }
    return resultats;
}

try {
    const nombres = [1, 2, 3, 4, 5];
    const pairs = filtrerEtValider(nombres, n => n % 2 === 0, "Aucun nombre pair trouvé");
    console.log(`Nombres pairs: ${pairs}`);
    
    const grandsNombres = filtrerEtValider(nombres, n => n > 10, "Aucun grand nombre trouvé");
    console.log(`Grands nombres: ${grandsNombres}`); // Ne sera pas exécuté
} catch (error) {
    console.log(`Erreur de filtrage: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
}

export {
    lancerErreur,
    calculerAire,
    validerAge,
    assertionNever,
    traiterStatut,
    traiterEntree,
    divisionSecurisee,
    executerDivision,
    gererPromesseQuiEchoue,
    analyserCode,
    GestionnaireErreur,
    filtrerEtValider
};
