/**
 * TYPE STRING EN TYPESCRIPT
 * =========================
 * 
 * Le type 'string' représente du texte en TypeScript
 * Supporte les chaînes simples, doubles guillemets, et template literals
 */

// ✅ DÉCLARATIONS BASIQUES
let nom: string = "modou";
let ville: string = 'niang';
let description: string = `Développeur TypeScript`;

// ✅ TEMPLATE LITERALS (chaînes template)
let age: number = 30;
let presentation: string = `Bonjour, je m'appelle ${nom}, j'ai ${age} ans et j'habite à ${ville}`;

// ✅ CHAÎNES MULTILIGNES
let adresse: string = `
    123 Rue de la Paix
    75001 Niang
    France
`;

// ✅ FONCTIONS DE MANIPULATION DE CHAÎNES
function capitaliser(texte: string): string {
    return texte.charAt(0).toUpperCase() + texte.slice(1).toLowerCase();
}

function inverser(texte: string): string {
    return texte.split('').reverse().join('');
}

function compterMots(texte: string): number {
    return texte.trim().split(/\s+/).length;
}

function extraireMots(phrase: string): string[] {
    return phrase.toLowerCase().match(/\b\w+\b/g) || [];
}

// ✅ VALIDATION DE CHAÎNES
function estEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function estTelephoneFrancais(telephone: string): boolean {
    const regex = /^0[1-9](\d{8})$/;
    return regex.test(telephone.replace(/\s/g, ''));
}

function estMotDePasseSecurise(motDePasse: string): boolean {
    // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(motDePasse);
}

// ✅ FORMATAGE DE CHAÎNES
function formaterNom(prenom: string, nom: string): string {
    return `${capitaliser(prenom)} ${nom.toUpperCase()}`;
}

function formaterPrix(prix: number, devise: string = "€"): string {
    return `${prix.toFixed(2)} ${devise}`;
}

function formaterDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('fr-FR', options);
}

// ✅ RECHERCHE ET REMPLACEMENT
function remplacerMotsInterdit(texte: string, motsInterdits: string[]): string {
    let resultat = texte;
    motsInterdits.forEach(mot => {
        const regex = new RegExp(mot, 'gi');
        resultat = resultat.replace(regex, '*'.repeat(mot.length));
    });
    return resultat;
}

function extraireNumeros(texte: string): number[] {
    const matches = texte.match(/\d+/g);
    return matches ? matches.map(Number) : [];
}

// ✅ CLASSE POUR MANIPULATION DE TEXTE
class TexteUtil {
    private texte: string;

    constructor(texte: string) {
        this.texte = texte;
    }

    get longueur(): number {
        return this.texte.length;
    }

    get motCount(): number {
        return compterMots(this.texte);
    }

    nettoyerEspaces(): TexteUtil {
        this.texte = this.texte.trim().replace(/\s+/g, ' ');
        return this;
    }

    vers_kebab_case(): string {
        return this.texte
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    versCamelCase(): string {
        return this.texte
            .split(/\s+/)
            .map((mot, index) => 
                index === 0 ? mot.toLowerCase() : capitaliser(mot)
            )
            .join('');
    }

    toString(): string {
        return this.texte;
    }
}

// ✅ TYPES LITTÉRAUX DE CHAÎNE (String Literal Types)
type StatusMessage = "en_attente" | "en_cours" | "termine" | "erreur";
type Langue = "fr" | "en" | "es" | "de";

function obtenirMessageStatus(status: StatusMessage, langue: Langue): string {
    const messages = {
        fr: {
            en_attente: "En attente",
            en_cours: "En cours",
            termine: "Terminé",
            erreur: "Erreur"
        },
        en: {
            en_attente: "Pending",
            en_cours: "In progress", 
            termine: "Completed",
            erreur: "Error"
        },
        es: {
            en_attente: "Pendiente",
            en_cours: "En progreso",
            termine: "Completado", 
            erreur: "Error"
        },
        de: {
            en_attente: "Wartend",
            en_cours: "In Bearbeitung",
            termine: "Abgeschlossen",
            erreur: "Fehler"
        }
    };
    
    return messages[langue][status];
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE STRING ===");

console.log(`Nom: ${nom}`);
console.log(`Présentation: ${presentation}`);

// Test des fonctions de manipulation
console.log(`Capitaliser "hello world": ${capitaliser("hello world")}`);
console.log(`Inverser "TypeScript": ${inverser("TypeScript")}`);
console.log(`Compter mots dans "${presentation}": ${compterMots(presentation)}`);

// Test des validations
console.log(`"test@example.com" est un email: ${estEmail("test@example.com")}`);
console.log(`"invalid-email" est un email: ${estEmail("invalid-email")}`);
console.log(`"0123456789" est un téléphone français: ${estTelephoneFrancais("0123456789")}`);
console.log(`"Password123" est sécurisé: ${estMotDePasseSecurise("Password123")}`);

// Test formatage
console.log(`Nom formaté: ${formaterNom("jean", "dupont")}`);
console.log(`Prix formaté: ${formaterPrix(19.99)}`);
console.log(`Date formatée: ${formaterDate(new Date())}`);

// Test recherche et remplacement
const texteAvecMotsInterdits = "Ce texte contient stupide et idiot";
console.log(`Texte censuré: ${remplacerMotsInterdit(texteAvecMotsInterdits, ["stupide", "idiot"])}`);

const texteAvecNumeros = "J'ai 25 ans et je mesure 175 cm";
console.log(`Numéros extraits: ${extraireNumeros(texteAvecNumeros)}`);

// Test classe TexteUtil
const util = new TexteUtil("  Hello World Example  ");
console.log(`Texte original: "${util.toString()}"`);
util.nettoyerEspaces();
console.log(`Après nettoyage: "${util.toString()}"`);
console.log(`En kebab-case: ${util.vers_kebab_case()}`);
console.log(`En camelCase: ${util.versCamelCase()}`);

// Test types littéraux
console.log(`Status en français: ${obtenirMessageStatus("en_cours", "fr")}`);
console.log(`Status en anglais: ${obtenirMessageStatus("termine", "en")}`);

// ✅ ÉCHAPPEMENT ET CARACTÈRES SPÉCIAUX
const texteAvecEchappement: string = "Ligne 1\nLigne 2\t\tAvec tabulation";
const texteAvecGuillemets: string = 'Il a dit: "Bonjour \'monde\'"';
const cheminFichier: string = "C:\\Utilisateurs\\Documents\\fichier.txt";

console.log("=== CARACTÈRES SPÉCIAUX ===");
console.log(texteAvecEchappement);
console.log(texteAvecGuillemets);
console.log(cheminFichier);

export {
    capitaliser,
    inverser,
    compterMots,
    extraireMots,
    estEmail,
    estTelephoneFrancais,
    estMotDePasseSecurise,
    formaterNom,
    formaterPrix,
    formaterDate,
    remplacerMotsInterdit,
    extraireNumeros,
    TexteUtil,
    obtenirMessageStatus
};
