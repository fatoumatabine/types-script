/**
 * TYPES DE RETOUR DE FONCTIONS EN TYPESCRIPT
 * ==========================================
 * 
 * TypeScript peut inférer ou vous pouvez spécifier explicitement
 * les types de retour des fonctions pour plus de clarté et de sécurité
 */

// ✅ TYPES DE RETOUR EXPLICITES
function additionner(a: number, b: number): number {
    return a + b;
}

function obtenirMessage(): string {
    return "Bonjour TypeScript!";
}

function estPair(nombre: number): boolean {
    return nombre % 2 === 0;
}

function neRienRetourner(): void {
    console.log("Cette fonction ne retourne rien");
}

// ✅ TYPES DE RETOUR INFÉRÉS
function multiplier(a: number, b: number) { // TypeScript infère: number
    return a * b;
}

function creerTableau() { // TypeScript infère: number[]
    return [1, 2, 3, 4, 5];
}

function obtenirConfig() { // TypeScript infère l'objet complet
    return {
        host: "localhost",
        port: 8080,
        ssl: false
    };
}

// ✅ TYPES DE RETOUR UNION
function diviser(a: number, b: number): number | string {
    if (b === 0) {
        return "Division par zéro impossible";
    }
    return a / b;
}

function traiterEntree(valeur: string): string | number | boolean {
    if (valeur === "true" || valeur === "false") {
        return valeur === "true";
    }
    if (!isNaN(Number(valeur))) {
        return Number(valeur);
    }
    return valeur;
}

// ✅ TYPES DE RETOUR AVEC GÉNÉRIQUES
function premierElement<T>(tableau: T[]): T | undefined {
    return tableau.length > 0 ? tableau[0] : undefined;
}

function creerPaire<T, U>(premier: T, second: U): [T, U] {
    return [premier, second];
}

function mapper<T, U>(tableau: T[], fn: (item: T) => U): U[] {
    return tableau.map(fn);
}

// ✅ TYPES DE RETOUR CONDITIONNELS
type RetourConditionnel<T> = T extends string ? number : string;

function traiterTypeConditionnel<T>(valeur: T): RetourConditionnel<T> {
    if (typeof valeur === "string") {
        return valeur.length as RetourConditionnel<T>;
    }
    return String(valeur) as RetourConditionnel<T>;
}

// ✅ TYPES DE RETOUR AVEC PROMESSES
async function chargerDonnees(): Promise<string[]> {
    // Simulation d'un appel API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["item1", "item2", "item3"]);
        }, 1000);
    });
}

async function obtenirUtilisateur(id: number): Promise<{ nom: string; age: number } | null> {
    if (id <= 0) {
        return null;
    }
    
    return {
        nom: `Utilisateur${id}`,
        age: 25 + id
    };
}

// ✅ FONCTIONS AVEC TYPES DE RETOUR NEVER
function lancerErreur(message: string): never {
    throw new Error(message);
}

function boucleInfinie(): never {
    while (true) {
        // Cette fonction ne se termine jamais normalement
        break; // On sort pour l'exemple
    }
    throw new Error("Ne devrait jamais arriver");
}

// ✅ TYPES DE RETOUR AVEC OVERLOADING
function formatter(valeur: string): string;
function formatter(valeur: number): string;
function formatter(valeur: boolean): string;
function formatter(valeur: string | number | boolean): string {
    if (typeof valeur === "string") {
        return valeur.toUpperCase();
    }
    if (typeof valeur === "number") {
        return valeur.toFixed(2);
    }
    return valeur ? "VRAI" : "FAUX";
}

// ✅ TYPES DE RETOUR AVEC TUPLES
function obtenirCoordonnees(): [number, number] {
    return [Math.random() * 100, Math.random() * 100];
}

function diviserAvecReste(a: number, b: number): [number, number] {
    return [Math.floor(a / b), a % b];
}

function analyserNom(nomComplet: string): [string, string, string?] {
    const parties = nomComplet.split(" ");
    return [
        parties[0] || "",
        parties[1] || "",
        parties[2] // optionnel
    ];
}

// ✅ TYPES DE RETOUR AVEC RECORD
function creerDictionnaire(cles: string[], valeurs: number[]): Record<string, number> {
    const resultat: Record<string, number> = {};
    cles.forEach((cle, index) => {
        if (index < valeurs.length) {
            resultat[cle] = valeurs[index];
        }
    });
    return resultat;
}

function grouperParProperty<T, K extends keyof T>(
    tableau: T[],
    property: K
): Record<string, T[]> {
    return tableau.reduce((acc, item) => {
        const cle = String(item[property]);
        if (!acc[cle]) {
            acc[cle] = [];
        }
        acc[cle].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}

// ✅ CLASSE AVEC TYPES DE RETOUR EXPLICITES
class Calculatrice {
    private valeur: number = 0;

    ajouter(nombre: number): this {
        this.valeur += nombre;
        return this;
    }

    soustraire(nombre: number): this {
        this.valeur -= nombre;
        return this;
    }

    obtenir(): number {
        return this.valeur;
    }

    reinitialiser(): void {
        this.valeur = 0;
    }

    estPositif(): boolean {
        return this.valeur > 0;
    }

    obtenirInfo(): { valeur: number; positif: boolean; pair: boolean } {
        return {
            valeur: this.valeur,
            positif: this.valeur > 0,
            pair: this.valeur % 2 === 0
        };
    }
}

// ✅ FACTORY FUNCTIONS AVEC TYPES DE RETOUR
interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    actif: boolean;
}

function creerUtilisateur(nom: string, email: string): Utilisateur {
    return {
        id: Math.floor(Math.random() * 10000),
        nom,
        email,
        actif: true
    };
}

function creerUtilisateurAdmin(nom: string, email: string): Utilisateur & { role: "admin" } {
    return {
        ...creerUtilisateur(nom, email),
        role: "admin"
    };
}

// ✅ TYPES DE RETOUR AVEC UTILITY TYPES
function extraireNomEtEmail(utilisateur: Utilisateur): Pick<Utilisateur, "nom" | "email"> {
    return {
        nom: utilisateur.nom,
        email: utilisateur.email
    };
}

function creerUtilisateurPartiel(donnees: Partial<Utilisateur>): Required<Pick<Utilisateur, "nom" | "email">> & Partial<Omit<Utilisateur, "nom" | "email">> {
    return {
        nom: donnees.nom || "Inconnu",
        email: donnees.email || "inconnu@example.com",
        ...donnees
    };
}

// ✅ TYPES DE RETOUR AVEC TYPE PREDICATES
function estString(valeur: unknown): valeur is string {
    return typeof valeur === "string";
}

function estUtilisateur(objet: unknown): objet is Utilisateur {
    return (
        typeof objet === "object" &&
        objet !== null &&
        "id" in objet &&
        "nom" in objet &&
        "email" in objet &&
        "actif" in objet
    );
}

function filtrerStrings(tableau: unknown[]): string[] {
    return tableau.filter(estString);
}

// ✅ FONCTIONS AVEC RETOUR RÉCURSIF
type ArbreNoeud<T> = {
    valeur: T;
    enfants: ArbreNoeud<T>[];
};

function parcourirArbre<T>(noeud: ArbreNoeud<T>): T[] {
    const resultats: T[] = [noeud.valeur];
    for (const enfant of noeud.enfants) {
        resultats.push(...parcourirArbre(enfant));
    }
    return resultats;
}

function profondeurArbre<T>(noeud: ArbreNoeud<T>): number {
    if (noeud.enfants.length === 0) {
        return 1;
    }
    return 1 + Math.max(...noeud.enfants.map(profondeurArbre));
}

// ✅ TYPES DE RETOUR AVEC ASSERTION
function obtenirElementParId(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Élément avec l'ID ${id} non trouvé`);
    }
    return element;
}

function parsерJSON<T>(json: string): T {
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        throw new Error(`JSON invalide: ${error}`);
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPES DE RETOUR ===");

// Test fonctions basiques
console.log(`Addition: ${additionner(5, 3)}`);
console.log(`Message: ${obtenirMessage()}`);
console.log(`Est pair (4): ${estPair(4)}`);

// Test inférence
const produit = multiplier(4, 5); // TypeScript sait que c'est number
const tableau = creerTableau(); // TypeScript sait que c'est number[]
const config = obtenirConfig(); // TypeScript connaît la structure

console.log(`Produit: ${produit}`);
console.log(`Premier élément: ${tableau[0]}`);
console.log(`Config port: ${config.port}`);

// Test union types
const resultatDivision = diviser(10, 2);
if (typeof resultatDivision === "number") {
    console.log(`Division réussie: ${resultatDivision}`);
} else {
    console.log(`Erreur: ${resultatDivision}`);
}

// Test génériques
const premiers = [1, 2, 3, 4, 5];
const premierNombre = premierElement(premiers);
console.log(`Premier élément: ${premierNombre || "Aucun"}`);

const paireMixte = creerPaire("TypeScript", 2024);
console.log(`Paire: ${paireMixte[0]} - ${paireMixte[1]}`);

// Test mapping
const doubles = mapper([1, 2, 3], x => x * 2);
console.log(`Doubles: [${doubles.join(", ")}]`);

// Test promesses
chargerDonnees().then(donnees => {
    console.log(`Données chargées: [${donnees.join(", ")}]`);
});

obtenirUtilisateur(1).then(utilisateur => {
    if (utilisateur) {
        console.log(`Utilisateur: ${utilisateur.nom}, âge ${utilisateur.age}`);
    }
});

// Test overloading
console.log(`Formatter string: ${formatter("hello")}`);
console.log(`Formatter number: ${formatter(3.14159)}`);
console.log(`Formatter boolean: ${formatter(true)}`);

// Test tuples
const [x, y] = obtenirCoordonnees();
console.log(`Coordonnées: (${x.toFixed(1)}, ${y.toFixed(1)})`);

const [quotient, reste] = diviserAvecReste(17, 5);
console.log(`17 ÷ 5 = ${quotient} reste ${reste}`);

const [prenom, nom, surnom] = analyserNom("Jean Paul Dupont");
console.log(`Prénom: ${prenom}, Nom: ${nom}, Surnom: ${surnom || "Aucun"}`);

// Test Record
const dict = creerDictionnaire(["a", "b", "c"], [1, 2, 3]);
console.log(`Dictionnaire a: ${dict.a}`);

// Test classe avec méthodes chainées
const calc = new Calculatrice();
const resultat = calc.ajouter(10).soustraire(3).ajouter(5).obtenir();
console.log(`Résultat calculatrice: ${resultat}`);

const info = calc.obtenirInfo();
console.log(`Info: valeur=${info.valeur}, positif=${info.positif}, pair=${info.pair}`);

// Test factory
const utilisateur = creerUtilisateur("Alice", "alice@example.com");
const admin = creerUtilisateurAdmin("Admin", "admin@example.com");

console.log(`Utilisateur: ${utilisateur.nom} (${utilisateur.actif ? "actif" : "inactif"})`);
console.log(`Admin: ${admin.nom}, rôle: ${admin.role}`);

// Test utility types
const nomEtEmail = extraireNomEtEmail(utilisateur);
console.log(`Extrait: ${nomEtEmail.nom} - ${nomEtEmail.email}`);

// Test type predicates
const valeursInconnues: unknown[] = ["hello", 42, "world", true, "TypeScript"];
const chainesUniquement = filtrerStrings(valeursInconnues);
console.log(`Chaînes seulement: [${chainesUniquement.join(", ")}]`);

// Test arbre récursif
const arbre: ArbreNoeud<number> = {
    valeur: 1,
    enfants: [
        {
            valeur: 2,
            enfants: [
                { valeur: 4, enfants: [] },
                { valeur: 5, enfants: [] }
            ]
        },
        {
            valeur: 3,
            enfants: [
                { valeur: 6, enfants: [] }
            ]
        }
    ]
};

const valeurs = parcourirArbre(arbre);
const profondeur = profondeurArbre(arbre);
console.log(`Valeurs de l'arbre: [${valeurs.join(", ")}]`);
console.log(`Profondeur de l'arbre: ${profondeur}`);

// Test avec type conditionnel
const longueurString = traiterTypeConditionnel("Hello"); // retourne number
const versionString = traiterTypeConditionnel(42); // retourne string
console.log(`Longueur: ${longueurString}, Version: ${versionString}`);

// ✅ FONCTIONS AVEC RETOUR DÉPENDANT DU CONTEXTE
function obtenirValeurParDefaut<T>(type: "string"): string;
function obtenirValeurParDefaut<T>(type: "number"): number;
function obtenirValeurParDefaut<T>(type: "boolean"): boolean;
function obtenirValeurParDefaut<T>(type: "string" | "number" | "boolean"): string | number | boolean {
    switch (type) {
        case "string":
            return "";
        case "number":
            return 0;
        case "boolean":
            return false;
        default:
            throw new Error(`Type non supporté: ${type}`);
    }
}

const defaultString = obtenirValeurParDefaut("string"); // Type: string
const defaultNumber = obtenirValeurParDefaut("number"); // Type: number
const defaultBoolean = obtenirValeurParDefaut("boolean"); // Type: boolean

console.log(`Défauts: "${defaultString}", ${defaultNumber}, ${defaultBoolean}`);

export {
    additionner,
    obtenirMessage,
    estPair,
    neRienRetourner,
    multiplier,
    creerTableau,
    obtenirConfig,
    diviser,
    traiterEntree,
    premierElement,
    creerPaire,
    mapper,
    traiterTypeConditionnel,
    chargerDonnees,
    obtenirUtilisateur,
    lancerErreur,
    formatter,
    obtenirCoordonnees,
    diviserAvecReste,
    analyserNom,
    creerDictionnaire,
    grouperParProperty,
    Calculatrice,
    creerUtilisateur,
    creerUtilisateurAdmin,
    extraireNomEtEmail,
    creerUtilisateurPartiel,
    estString,
    estUtilisateur,
    filtrerStrings,
    parcourirArbre,
    profondeurArbre,
    parsерJSON,
    obtenirValeurParDefaut
};
