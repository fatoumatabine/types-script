/**
 * TYPES OBJETS ANONYMES EN TYPESCRIPT
 * ===================================
 * 
 * Les types objets anonymes sont définis directement sans nom
 * Très utiles pour des structures temporaires ou des paramètres de fonctions
 */

// ✅ OBJETS ANONYMES BASIQUES
let personneAnonyme: { nom: string; age: number; actif: boolean } = {
    nom: "Jean",
    age: 30,
    actif: true
};

let coordonnees: { x: number; y: number; z?: number } = {
    x: 10,
    y: 20
};

// ✅ FONCTIONS AVEC PARAMÈTRES OBJETS ANONYMES
function afficherPersonne(personne: { nom: string; age: number; email?: string }): string {
    let message = `${personne.nom}, ${personne.age} ans`;
    if (personne.email) {
        message += ` (${personne.email})`;
    }
    return message;
}

function calculerAire(rectangle: { largeur: number; hauteur: number }): number {
    return rectangle.largeur * rectangle.hauteur;
}

function configurer(options: {
    host: string;
    port: number;
    ssl?: boolean;
    timeout?: number;
}): string {
    const protocole = options.ssl ? "https" : "http";
    const timeout = options.timeout || 5000;
    return `${protocole}://${options.host}:${options.port} (timeout: ${timeout}ms)`;
}

// ✅ FONCTIONS RETOURNANT DES OBJETS ANONYMES
function creerUtilisateur(nom: string, age: number): {
    id: number;
    nom: string;
    age: number;
    dateCreation: Date;
    actif: boolean;
} {
    return {
        id: Math.floor(Math.random() * 10000),
        nom,
        age,
        dateCreation: new Date(),
        actif: true
    };
}

function obtenirStatistiques(nombres: number[]): {
    count: number;
    sum: number;
    average: number;
    min: number;
    max: number;
} {
    if (nombres.length === 0) {
        return { count: 0, sum: 0, average: 0, min: 0, max: 0 };
    }

    const sum = nombres.reduce((acc, num) => acc + num, 0);
    return {
        count: nombres.length,
        sum,
        average: sum / nombres.length,
        min: Math.min(...nombres),
        max: Math.max(...nombres)
    };
}

// ✅ OBJETS ANONYMES AVEC MÉTHODES
function creerCalculatrice(): {
    valeur: number;
    ajouter: (n: number) => void;
    soustraire: (n: number) => void;
    multiplier: (n: number) => void;
    diviser: (n: number) => void;
    reset: () => void;
    obtenir: () => number;
} {
    let valeur = 0;

    return {
        valeur,
        ajouter: (n: number) => valeur += n,
        soustraire: (n: number) => valeur -= n,
        multiplier: (n: number) => valeur *= n,
        diviser: (n: number) => {
            if (n !== 0) valeur /= n;
        },
        reset: () => valeur = 0,
        obtenir: () => valeur
    };
}

// ✅ OBJETS ANONYMES IMBRIQUÉS
function creerReponseAPI<T>(data: T, success: boolean = true): {
    status: { code: number; message: string };
    data: T | null;
    meta: { timestamp: Date; version: string };
    pagination?: { page: number; limit: number; total: number };
} {
    return {
        status: {
            code: success ? 200 : 400,
            message: success ? "Succès" : "Erreur"
        },
        data: success ? data : null,
        meta: {
            timestamp: new Date(),
            version: "1.0.0"
        }
    };
}

// ✅ TABLEAUX D'OBJETS ANONYMES
let employes: Array<{
    id: number;
    nom: string;
    poste: string;
    salaire: number;
    competences: string[];
}> = [
    {
        id: 1,
        nom: "Alice",
        poste: "Développeur",
        salaire: 50000,
        competences: ["TypeScript", "React", "Node.js"]
    },
    {
        id: 2,
        nom: "Bob",
        poste: "Designer",
        salaire: 45000,
        competences: ["Photoshop", "Figma", "CSS"]
    }
];

// ✅ FONCTIONS AVEC CALLBACKS D'OBJETS ANONYMES
function traiterDonnees<T>(
    donnees: T[],
    callbacks: {
        onProgress: (progress: { current: number; total: number; percent: number }) => void;
        onComplete: (result: { processed: number; errors: number; duration: number }) => void;
        onError: (error: { message: string; item: T; index: number }) => void;
    }
): T[] {
    const debut = Date.now();
    const resultats: T[] = [];
    let erreurs = 0;

    donnees.forEach((item, index) => {
        try {
            // Simulation du traitement
            callbacks.onProgress({
                current: index + 1,
                total: donnees.length,
                percent: Math.round(((index + 1) / donnees.length) * 100)
            });

            resultats.push(item);
        } catch (error) {
            erreurs++;
            callbacks.onError({
                message: error instanceof Error ? error.message : "Erreur inconnue",
                item,
                index
            });
        }
    });

    const fin = Date.now();
    callbacks.onComplete({
        processed: resultats.length,
        errors: erreurs,
        duration: fin - debut
    });

    return resultats;
}

// ✅ VALIDATION AVEC OBJETS ANONYMES
function validerFormulaire(donnees: {
    nom: string;
    email: string;
    age: number;
}): {
    valide: boolean;
    erreurs: { champ: string; message: string }[];
} {
    const erreurs: { champ: string; message: string }[] = [];

    if (!donnees.nom || donnees.nom.length < 2) {
        erreurs.push({ champ: "nom", message: "Le nom doit contenir au moins 2 caractères" });
    }

    if (!donnees.email.includes("@")) {
        erreurs.push({ champ: "email", message: "Email invalide" });
    }

    if (donnees.age < 0 || donnees.age > 120) {
        erreurs.push({ champ: "age", message: "L'âge doit être entre 0 et 120" });
    }

    return {
        valide: erreurs.length === 0,
        erreurs
    };
}

// ✅ GESTIONNAIRE D'ÉTAT AVEC OBJET ANONYME
function creerGestionnaireEtat<T>(valeurInitiale: T): {
    obtenir: () => T;
    definir: (nouvelleValeur: T) => void;
    modifier: (modificateur: (valeur: T) => T) => void;
    reinitialiser: () => void;
    souscrire: (callback: (valeur: T) => void) => () => void;
} {
    let valeur = valeurInitiale;
    const observateurs: ((valeur: T) => void)[] = [];

    const notifierObservateurs = () => {
        observateurs.forEach(callback => callback(valeur));
    };

    return {
        obtenir: () => valeur,
        definir: (nouvelleValeur: T) => {
            valeur = nouvelleValeur;
            notifierObservateurs();
        },
        modifier: (modificateur: (valeur: T) => T) => {
            valeur = modificateur(valeur);
            notifierObservateurs();
        },
        reinitialiser: () => {
            valeur = valeurInitiale;
            notifierObservateurs();
        },
        souscrire: (callback: (valeur: T) => void) => {
            observateurs.push(callback);
            // Retourne une fonction pour se désabonner
            return () => {
                const index = observateurs.indexOf(callback);
                if (index > -1) {
                    observateurs.splice(index, 1);
                }
            };
        }
    };
}

// ✅ CACHE AVEC OBJET ANONYME
function creerCache<K, V>(maxTaille: number = 100): {
    obtenir: (cle: K) => V | undefined;
    definir: (cle: K, valeur: V) => void;
    supprimer: (cle: K) => boolean;
    vider: () => void;
    taille: () => number;
    cles: () => K[];
    valeurs: () => V[];
} {
    const donnees = new Map<K, V>();

    return {
        obtenir: (cle: K) => donnees.get(cle),
        definir: (cle: K, valeur: V) => {
            if (donnees.size >= maxTaille && !donnees.has(cle)) {
                const premiereCle = donnees.keys().next().value;
                if (premiereCle !== undefined) {
                    donnees.delete(premiereCle);
                }
            }
            donnees.set(cle, valeur);
        },
        supprimer: (cle: K) => donnees.delete(cle),
        vider: () => donnees.clear(),
        taille: () => donnees.size,
        cles: () => Array.from(donnees.keys()),
        valeurs: () => Array.from(donnees.values())
    };
}

// ✅ BUILDER PATTERN AVEC OBJETS ANONYMES
function creerQueryBuilder(): {
    select: (champs: string[]) => any;
    from: (table: string) => any;
    where: (condition: string) => any;
    orderBy: (champ: string, direction?: "ASC" | "DESC") => any;
    limit: (nombre: number) => any;
    build: () => string;
} {
    let query = {
        select: [] as string[],
        from: "",
        where: [] as string[],
        orderBy: "",
        limit: 0
    };

    const builder = {
        select: (champs: string[]) => {
            query.select = champs;
            return builder;
        },
        from: (table: string) => {
            query.from = table;
            return builder;
        },
        where: (condition: string) => {
            query.where.push(condition);
            return builder;
        },
        orderBy: (champ: string, direction: "ASC" | "DESC" = "ASC") => {
            query.orderBy = `${champ} ${direction}`;
            return builder;
        },
        limit: (nombre: number) => {
            query.limit = nombre;
            return builder;
        },
        build: (): string => {
            let sql = `SELECT ${query.select.join(", ")} FROM ${query.from}`;
            
            if (query.where.length > 0) {
                sql += ` WHERE ${query.where.join(" AND ")}`;
            }
            
            if (query.orderBy) {
                sql += ` ORDER BY ${query.orderBy}`;
            }
            
            if (query.limit > 0) {
                sql += ` LIMIT ${query.limit}`;
            }
            
            return sql;
        }
    };

    return builder;
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES OBJETS ANONYMES ===");

// Test objets basiques
console.log(`Personne: ${afficherPersonne({ nom: "Alice", age: 30, email: "alice@test.com" })}`);
console.log(`Aire rectangle: ${calculerAire({ largeur: 10, hauteur: 5 })}`);

// Test configuration
const config = configurer({
    host: "localhost",
    port: 8080,
    ssl: true,
    timeout: 3000
});
console.log(`Configuration: ${config}`);

// Test création d'utilisateur
const utilisateur = creerUtilisateur("Bob", 25);
console.log(`Utilisateur créé: ID ${utilisateur.id}, ${utilisateur.nom}`);

// Test statistiques
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stats = obtenirStatistiques(nombres);
console.log(`Statistiques: Moyenne=${stats.average}, Min=${stats.min}, Max=${stats.max}`);

// Test calculatrice
const calc = creerCalculatrice();
calc.ajouter(10);
calc.multiplier(2);
calc.soustraire(5);
console.log(`Résultat calculatrice: ${calc.obtenir()}`);

// Test réponse API
const reponse = creerReponseAPI({ message: "Bonjour!" }, true);
console.log(`Réponse API: ${reponse.status.message}, Data: ${JSON.stringify(reponse.data)}`);

// Test employés
const developpeursTS = employes.filter(emp => 
    emp.competences.includes("TypeScript")
);
console.log(`Développeurs TypeScript: ${developpeursTS.length}`);

// Test traitement de données
const donneesTest = ["item1", "item2", "item3"];
traiterDonnees(donneesTest, {
    onProgress: (progress) => {
        console.log(`Progression: ${progress.percent}% (${progress.current}/${progress.total})`);
    },
    onComplete: (result) => {
        console.log(`Traitement terminé: ${result.processed} éléments en ${result.duration}ms`);
    },
    onError: (error) => {
        console.log(`Erreur: ${error.message} sur l'élément ${error.index}`);
    }
});

// Test validation
const formulaireValide = validerFormulaire({
    nom: "Jean Dupont",
    email: "jean@example.com",
    age: 30
});

const formulaireInvalide = validerFormulaire({
    nom: "A",
    email: "invalide",
    age: -5
});

console.log(`Formulaire valide: ${formulaireValide.valide}`);
console.log(`Formulaire invalide: ${formulaireInvalide.valide}, Erreurs: ${formulaireInvalide.erreurs.length}`);

// Test gestionnaire d'état
const gestionnaireCompteur = creerGestionnaireEtat(0);

const desabonner = gestionnaireCompteur.souscrire((valeur) => {
    console.log(`Compteur mis à jour: ${valeur}`);
});

gestionnaireCompteur.definir(5);
gestionnaireCompteur.modifier(val => val + 3);
console.log(`Valeur finale du compteur: ${gestionnaireCompteur.obtenir()}`);

desabonner(); // Se désabonner

// Test cache
const cache = creerCache<string, number>(3);
cache.definir("a", 1);
cache.definir("b", 2);
cache.definir("c", 3);
cache.definir("d", 4); // Devrait évincer "a"

console.log(`Cache taille: ${cache.taille()}`);
console.log(`Cache clés: [${cache.cles().join(", ")}]`);
console.log(`Valeur "a": ${cache.obtenir("a") || "Non trouvée"}`);
console.log(`Valeur "d": ${cache.obtenir("d")}`);

// Test query builder
const sqlQuery = creerQueryBuilder()
    .select(["nom", "email", "age"])
    .from("utilisateurs")
    .where("age > 18")
    .where("actif = true")
    .orderBy("nom", "ASC")
    .limit(10)
    .build();

console.log(`Query SQL: ${sqlQuery}`);

// ✅ OBJETS ANONYMES AVEC INTERSECTION DE TYPES
function fusionnerProfils<T, U>(
    profil1: T,
    profil2: U
): T & U & { dateFusion: Date; source: "fusion" } {
    return {
        ...profil1,
        ...profil2,
        dateFusion: new Date(),
        source: "fusion"
    };
}

const profilBase = { nom: "Alice", age: 30 };
const profilPro = { entreprise: "TechCorp", poste: "Développeur" };
const profilFusionne = fusionnerProfils(profilBase, profilPro);

console.log(`Profil fusionné: ${profilFusionne.nom} - ${profilFusionne.poste} chez ${profilFusionne.entreprise}`);
console.log(`Source: ${profilFusionne.source}, Date: ${profilFusionne.dateFusion.toISOString()}`);

export {
    afficherPersonne,
    calculerAire,
    configurer,
    creerUtilisateur,
    obtenirStatistiques,
    creerCalculatrice,
    creerReponseAPI,
    traiterDonnees,
    validerFormulaire,
    creerGestionnaireEtat,
    creerCache,
    creerQueryBuilder,
    fusionnerProfils
};
