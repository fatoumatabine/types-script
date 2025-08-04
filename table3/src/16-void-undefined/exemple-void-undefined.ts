/**
 * TYPES VOID ET UNDEFINED EN TYPESCRIPT
 * =====================================
 * 
 * - void : indique qu'une fonction ne retourne rien
 * - undefined : valeur primitive qui représente l'absence de valeur
 */

// ✅ TYPE VOID - FONCTIONS QUI NE RETOURNENT RIEN
function afficherMessage(message: string): void {
    console.log(message);
    // Pas de return explicite
}

function effacerConsole(): void {
    console.clear();
    return; // return sans valeur est autorisé
}

function executerCallback(callback: () => void): void {
    callback();
}

// ✅ FONCTIONS AVEC SIDE EFFECTS
function modifierTableau(arr: number[], valeur: number): void {
    arr.push(valeur);
    // Modifie le tableau passé en paramètre
}

function definirProprieteObjet(obj: any, cle: string, valeur: any): void {
    obj[cle] = valeur;
}

function ecrireFichier(chemin: string, contenu: string): void {
    // Simulation d'écriture de fichier
    console.log(`Écriture dans ${chemin}: ${contenu}`);
}

// ✅ TYPE UNDEFINED EXPLICITE
function obtenirValeurOptionnelle(condition: boolean): string | undefined {
    if (condition) {
        return "Valeur disponible";
    }
    return undefined;
}

function trouverElement<T>(tableau: T[], predicat: (item: T) => boolean): T | undefined {
    for (const item of tableau) {
        if (predicat(item)) {
            return item;
        }
    }
    return undefined;
}

function obtenirPropriete(obj: any, cle: string): any | undefined {
    return obj[cle];
}

// ✅ GESTION DES VALEURS UNDEFINED
function verifierUndefined(valeur: any): boolean {
    return valeur === undefined;
}

function estDefini<T>(valeur: T | undefined): valeur is T {
    return valeur !== undefined;
}

function valeurParDefaut<T>(valeur: T | undefined, defaut: T): T {
    return valeur !== undefined ? valeur : defaut;
}

function filtrerUndefined<T>(tableau: (T | undefined)[]): T[] {
    return tableau.filter(estDefini);
}

// ✅ FONCTIONS AVEC PARAMÈTRES OPTIONNELS
function creerUtilisateur(
    nom: string,
    age?: number,        // Peut être undefined
    email?: string       // Peut être undefined
): { nom: string; age?: number; email?: string } {
    const utilisateur: { nom: string; age?: number; email?: string } = { nom };
    
    if (age !== undefined) {
        utilisateur.age = age;
    }
    
    if (email !== undefined) {
        utilisateur.email = email;
    }
    
    return utilisateur;
}

function saluer(nom: string, titre?: string): void {
    if (titre !== undefined) {
        console.log(`Bonjour ${titre} ${nom}`);
    } else {
        console.log(`Bonjour ${nom}`);
    }
}

// ✅ INTERFACES AVEC PROPRIÉTÉS OPTIONNELLES
interface Configuration {
    host: string;
    port: number;
    ssl?: boolean;        // undefined par défaut
    timeout?: number;     // undefined par défaut
    debug?: boolean;      // undefined par défaut
}

function initialiserServeur(config: Configuration): void {
    console.log(`Serveur sur ${config.host}:${config.port}`);
    
    if (config.ssl !== undefined) {
        console.log(`SSL: ${config.ssl ? "activé" : "désactivé"}`);
    }
    
    const timeout = config.timeout || 5000;
    console.log(`Timeout: ${timeout}ms`);
    
    if (config.debug) {
        console.log("Mode debug activé");
    }
}

// ✅ CLASSES AVEC VOID ET UNDEFINED
class Logger {
    private logs: string[] = [];
    
    log(message: string): void {
        this.logs.push(`${new Date().toISOString()}: ${message}`);
        console.log(message);
    }
    
    error(message: string): void {
        const errorMsg = `ERROR: ${message}`;
        this.logs.push(`${new Date().toISOString()}: ${errorMsg}`);
        console.error(errorMsg);
    }
    
    clear(): void {
        this.logs = [];
        console.log("Logs effacés");
    }
    
    obtenirDernierLog(): string | undefined {
        return this.logs.length > 0 ? this.logs[this.logs.length - 1] : undefined;
    }
    
    obtenirLogParIndex(index: number): string | undefined {
        return index >= 0 && index < this.logs.length ? this.logs[index] : undefined;
    }
}

// ✅ CALLBACKS AVEC VOID
function executerApresDelai(callback: () => void, delai: number): void {
    setTimeout(callback, delai);
}

function traiterDonnees<T>(
    donnees: T[],
    traitement: (item: T) => void
): void {
    donnees.forEach(traitement);
}

function abonnerEvenement(
    evenement: string,
    handler: (data: any) => void
): void {
    console.log(`Abonnement à l'événement: ${evenement}`);
    // Simulation d'abonnement
    setTimeout(() => handler({ type: evenement, timestamp: Date.now() }), 1000);
}

// ✅ PROMESSES AVEC VOID
async function operationAsynchrone(): Promise<void> {
    console.log("Début de l'opération");
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Opération terminée");
    // Pas de return de valeur
}

async function sauvegarderDonnees(donnees: any): Promise<void> {
    console.log("Sauvegarde en cours...");
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Données sauvegardées");
}

function obtenirDonneesAsync(id: number): Promise<any | undefined> {
    return new Promise(resolve => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, nom: `Utilisateur${id}` });
            } else {
                resolve(undefined);
            }
        }, 100);
    });
}

// ✅ GÉNÉRATEURS AVEC VOID
function* generateur(): Generator<number, void, unknown> {
    yield 1;
    yield 2;
    yield 3;
    // Pas de return de valeur finale
}

function* generateurAvecTraitement<T>(
    donnees: T[],
    traitement: (item: T) => void
): Generator<T, void, unknown> {
    for (const item of donnees) {
        traitement(item);
        yield item;
    }
}

// ✅ UTILITY FUNCTIONS POUR VOID ET UNDEFINED
function ignorer<T>(valeur: T): void {
    // Fonction utilitaire pour ignorer une valeur
    // Utile quand on veut explicitement ignorer un retour
}

function assertDefini<T>(valeur: T | undefined, message?: string): asserts valeur is T {
    if (valeur === undefined) {
        throw new Error(message || "Valeur ne doit pas être undefined");
    }
}

function mapperSansUndefined<T, U>(
    tableau: T[],
    mapper: (item: T) => U | undefined
): U[] {
    return tableau
        .map(mapper)
        .filter(estDefini);
}

// ✅ GESTIONNAIRE D'ÉTAT AVEC UNDEFINED
class GestionnaireEtat<T> {
    private etat: T | undefined = undefined;
    private observateurs: ((etat: T | undefined) => void)[] = [];
    
    definir(nouvelEtat: T): void {
        this.etat = nouvelEtat;
        this.notifierObservateurs();
    }
    
    effacer(): void {
        this.etat = undefined;
        this.notifierObservateurs();
    }
    
    obtenir(): T | undefined {
        return this.etat;
    }
    
    estDefini(): boolean {
        return this.etat !== undefined;
    }
    
    souscrire(observateur: (etat: T | undefined) => void): void {
        this.observateurs.push(observateur);
    }
    
    desabonner(observateur: (etat: T | undefined) => void): void {
        const index = this.observateurs.indexOf(observateur);
        if (index > -1) {
            this.observateurs.splice(index, 1);
        }
    }
    
    private notifierObservateurs(): void {
        this.observateurs.forEach(obs => obs(this.etat));
    }
}

// ✅ BUILDER PATTERN AVEC VOID
class ConstructeurObjet {
    private objet: any = {};
    
    ajouter(cle: string, valeur: any): this {
        this.objet[cle] = valeur;
        return this;
    }
    
    supprimer(cle: string): this {
        delete this.objet[cle];
        return this;
    }
    
    reinitialiser(): void {
        this.objet = {};
    }
    
    construire(): any {
        return { ...this.objet };
    }
    
    executer(action: (objet: any) => void): this {
        action(this.objet);
        return this;
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES VOID ET UNDEFINED ===");

// Test fonctions void
afficherMessage("Hello TypeScript!");
executerCallback(() => {
    console.log("Callback exécuté");
});

// Test modification par référence
const tableau = [1, 2, 3];
modifierTableau(tableau, 4);
console.log(`Tableau modifié: [${tableau.join(", ")}]`);

// Test valeurs undefined
const valeur1 = obtenirValeurOptionnelle(true);
const valeur2 = obtenirValeurOptionnelle(false);
console.log(`Valeur 1: ${valeur1 || "undefined"}`);
console.log(`Valeur 2: ${valeur2 || "undefined"}`);

// Test recherche avec undefined
const nombres = [1, 2, 3, 4, 5];
const premierPair = trouverElement(nombres, n => n % 2 === 0);
const premierNegatif = trouverElement(nombres, n => n < 0);
console.log(`Premier pair: ${premierPair || "Non trouvé"}`);
console.log(`Premier négatif: ${premierNegatif || "Non trouvé"}`);

// Test type guards
const valeurs: (string | undefined)[] = ["a", undefined, "b", undefined, "c"];
const valeursDefinies = filtrerUndefined(valeurs);
console.log(`Valeurs définies: [${valeursDefinies.join(", ")}]`);

// Test paramètres optionnels
const utilisateur1 = creerUtilisateur("Alice", 30, "alice@test.com");
const utilisateur2 = creerUtilisateur("Bob");
console.log(`Utilisateur 1:`, utilisateur1);
console.log(`Utilisateur 2:`, utilisateur2);

saluer("Jean", "M.");
saluer("Marie");

// Test configuration
const config: Configuration = {
    host: "localhost",
    port: 8080,
    ssl: true
};

initialiserServeur(config);

// Test logger
const logger = new Logger();
logger.log("Application démarrée");
logger.error("Erreur de test");

const dernierLog = logger.obtenirDernierLog();
console.log(`Dernier log: ${dernierLog || "Aucun log"}`);

const logInexistant = logger.obtenirLogParIndex(10);
console.log(`Log inexistant: ${logInexistant || "Non trouvé"}`);

// Test callbacks
executerApresDelai(() => {
    console.log("Callback après délai exécuté");
}, 100);

const fruits = ["pomme", "banane", "orange"];
traiterDonnees(fruits, fruit => {
    console.log(`Traitement de: ${fruit}`);
});

// Test promesses
operationAsynchrone().then(() => {
    console.log("Opération asynchrone terminée");
});

obtenirDonneesAsync(1).then(donnees => {
    console.log(`Données reçues: ${donnees ? donnees.nom : "Aucune donnée"}`);
});

obtenirDonneesAsync(-1).then(donnees => {
    console.log(`Données reçues: ${donnees ? donnees.nom : "Aucune donnée"}`);
});

// Test générateur
const gen = generateur();
console.log("Valeurs du générateur:");
for (const valeur of gen) {
    console.log(`  ${valeur}`);
}

// Test gestionnaire d'état
const gestionnaire = new GestionnaireEtat<number>();

gestionnaire.souscrire(etat => {
    console.log(`État changé: ${etat !== undefined ? etat : "undefined"}`);
});

gestionnaire.definir(42);
console.log(`État actuel: ${gestionnaire.obtenir() || "undefined"}`);
console.log(`Est défini: ${gestionnaire.estDefini()}`);

gestionnaire.effacer();
console.log(`Après effacement: ${gestionnaire.obtenir() || "undefined"}`);

// Test builder pattern
const constructeur = new ConstructeurObjet();
constructeur
    .ajouter("nom", "Test")
    .ajouter("valeur", 42)
    .executer(obj => {
        console.log("Objet en construction:", obj);
    })
    .ajouter("actif", true);

const objetFinal = constructeur.construire();
console.log("Objet final:", objetFinal);

// Test mapping sans undefined
const textes = ["hello", "", "world", ""];
const longueurs = mapperSansUndefined(textes, texte => 
    texte.length > 0 ? texte.length : undefined
);
console.log(`Longueurs (sans vides): [${longueurs.join(", ")}]`);

// Test assertion
try {
    const valeurIncertaine: string | undefined = Math.random() > 0.5 ? "valeur" : undefined;
    assertDefini(valeurIncertaine, "La valeur doit être définie");
    console.log(`Valeur assurée: ${valeurIncertaine.toUpperCase()}`);
} catch (error) {
    console.log(`Assertion échouée: ${error}`);
}

// Test avec valeur par défaut
const configIncomplete: { host: string; port: number; timeout?: number } = { host: "test", port: 3000 };
const timeout = valeurParDefaut(configIncomplete.timeout, 5000);
console.log(`Timeout avec défaut: ${timeout}ms`);

// ✅ DIFFÉRENCE ENTRE VOID ET UNDEFINED
function retourneVoid(): void {
    console.log("Cette fonction retourne void");
    // return; // Optionnel
}

function retourneUndefined(): undefined {
    console.log("Cette fonction retourne explicitement undefined");
    return undefined;
}

function retourneUndefinedImplicite() {
    console.log("Cette fonction retourne undefined implicitement");
    // Pas de return = return undefined
}

// void peut être assigné à undefined, mais pas l'inverse en mode strict
const resultVoid: void = retourneVoid();
const resultUndefined: undefined = retourneUndefined();

console.log(`Result void: ${resultVoid}`); // undefined
console.log(`Result undefined: ${resultUndefined}`); // undefined

export {
    afficherMessage,
    effacerConsole,
    executerCallback,
    modifierTableau,
    definirProprieteObjet,
    ecrireFichier,
    obtenirValeurOptionnelle,
    trouverElement,
    obtenirPropriete,
    verifierUndefined,
    estDefini,
    valeurParDefaut,
    filtrerUndefined,
    creerUtilisateur,
    saluer,
    initialiserServeur,
    Logger,
    executerApresDelai,
    traiterDonnees,
    abonnerEvenement,
    operationAsynchrone,
    sauvegarderDonnees,
    obtenirDonneesAsync,
    generateur,
    generateurAvecTraitement,
    ignorer,
    assertDefini,
    mapperSansUndefined,
    GestionnaireEtat,
    ConstructeurObjet,
    retourneVoid,
    retourneUndefined,
    retourneUndefinedImplicite
};
