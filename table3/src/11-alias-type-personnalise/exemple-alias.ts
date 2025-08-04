/**
 * ALIAS DE TYPES PERSONNALISÉS EN TYPESCRIPT
 * ==========================================
 * 
 * Les alias de types permettent de créer des noms personnalisés pour des types
 * Très utiles pour simplifier les types complexes et améliorer la lisibilité
 */

// ✅ ALIAS DE TYPES BASIQUES
type Nom = string;
type Age = number;
type Email = string;
type Actif = boolean;

// ✅ ALIAS POUR TYPES UNION
type StatusUtilisateur = "actif" | "inactif" | "suspendu" | "banni";
type TailleVetement = "XS" | "S" | "M" | "L" | "XL" | "XXL";
type CouleurPrimaire = "rouge" | "vert" | "bleu";

// ✅ ALIAS POUR TYPES D'OBJETS
type Coordonnees = {
    x: number;
    y: number;
    z?: number; // Coordonnée optionnelle pour 3D
};

type Utilisateur = {
    readonly id: number;
    nom: Nom;
    age: Age;
    email: Email;
    actif: Actif;
    status: StatusUtilisateur;
};

// ✅ ALIAS POUR TYPES DE FONCTIONS
type CalculateurSimple = (a: number, b: number) => number;
type ValidateurTexte = (texte: string) => boolean;
type GestionnaireEvenement<T> = (evenement: T) => void;
type TransformateurDonnees<T, U> = (entree: T) => U;

// ✅ ALIAS AVEC GÉNÉRIQUES
type Paire<T> = [T, T];
type Optionnel<T> = T | null | undefined;
type Tableau<T> = Array<T>;
type Dictionnaire<T> = { [cle: string]: T };
type Promesse<T> = Promise<T>;

// ✅ ALIAS POUR TYPES CONDITIONNELS
type EstTableau<T> = T extends Array<any> ? true : false;
type TypeElement<T> = T extends Array<infer U> ? U : never;
type ClesString<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

// ✅ ALIAS POUR TYPES UTILITAIRES
type RequiredUtilisateur = Required<Utilisateur>;
type PartielUtilisateur = Partial<Utilisateur>;
type NomEtEmail = Pick<Utilisateur, "nom" | "email">;
type SansId = Omit<Utilisateur, "id">;

// ✅ ALIAS POUR TYPES COMPLEXES
type ReponseAPI<T> = {
    data: T;
    status: number;
    message: string;
    timestamp: Date;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
    };
};

type EtatChargement = {
    enChargement: boolean;
    erreur: string | null;
    donnees: any | null;
    derniereMiseAJour: Date | null;
};

// ✅ TYPES RÉCURSIFS
type ArbreNoeud<T> = {
    valeur: T;
    enfants: ArbreNoeud<T>[];
    parent?: ArbreNoeud<T>;
};

type JSON = string | number | boolean | null | JSON[] | { [key: string]: JSON };

// ✅ FONCTIONS UTILISANT LES ALIAS
function creerUtilisateur(
    nom: Nom,
    age: Age,
    email: Email
): Utilisateur {
    return {
        id: Math.floor(Math.random() * 10000),
        nom,
        age,
        email,
        actif: true,
        status: "actif"
    };
}

function changerStatusUtilisateur(
    utilisateur: Utilisateur,
    nouveauStatus: StatusUtilisateur
): Utilisateur {
    return { ...utilisateur, status: nouveauStatus };
}

function calculerDistance(point1: Coordonnees, point2: Coordonnees): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const dz = (point2.z || 0) - (point1.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// ✅ CLASSE GÉNÉRIQUE AVEC ALIAS
class GestionnaireReponses<T> {
    private reponses: ReponseAPI<T>[] = [];

    ajouter(data: T, status: number = 200, message: string = "Succès"): void {
        const reponse: ReponseAPI<T> = {
            data,
            status,
            message,
            timestamp: new Date()
        };
        this.reponses.push(reponse);
    }

    obtenirDerniere(): ReponseAPI<T> | undefined {
        return this.reponses[this.reponses.length - 1];
    }

    filtrerParStatus(status: number): ReponseAPI<T>[] {
        return this.reponses.filter(r => r.status === status);
    }

    obtenirSucces(): ReponseAPI<T>[] {
        return this.filtrerParStatus(200);
    }

    obtenirErreurs(): ReponseAPI<T>[] {
        return this.reponses.filter(r => r.status >= 400);
    }
}

// ✅ FONCTIONS AVEC TYPES GÉNÉRIQUES ET ALIAS
function traiterPaire<T>(paire: Paire<T>, traitement: TransformateurDonnees<T, T>): Paire<T> {
    return [traitement(paire[0]), traitement(paire[1])];
}

function validerOptionnel<T>(
    valeur: Optionnel<T>,
    validateur: ValidateurTexte
): boolean {
    if (valeur === null || valeur === undefined) {
        return false;
    }
    return validateur(String(valeur));
}

function creerDictionnaire<T>(
    cles: string[],
    valeurs: T[]
): Dictionnaire<T> {
    const dict: Dictionnaire<T> = {};
    cles.forEach((cle, index) => {
        if (index < valeurs.length) {
            dict[cle] = valeurs[index];
        }
    });
    return dict;
}

// ✅ FACTORY AVEC ALIAS
class FactoryUtilisateur {
    static creerAdmin(nom: Nom, email: Email): Utilisateur {
        return {
            id: 1,
            nom,
            age: 35,
            email,
            actif: true,
            status: "actif"
        };
    }

    static creerGuest(): Utilisateur {
        return {
            id: 0,
            nom: "Invité",
            age: 0,
            email: "guest@example.com",
            actif: false,
            status: "inactif"
        };
    }

    static depuisJSON(json: string): Utilisateur | null {
        try {
            const data = JSON.parse(json);
            if (this.estUtilisateurValide(data)) {
                return data as Utilisateur;
            }
            return null;
        } catch {
            return null;
        }
    }

    private static estUtilisateurValide(data: any): boolean {
        return (
            typeof data.id === "number" &&
            typeof data.nom === "string" &&
            typeof data.age === "number" &&
            typeof data.email === "string" &&
            typeof data.actif === "boolean" &&
            ["actif", "inactif", "suspendu", "banni"].includes(data.status)
        );
    }
}

// ✅ TYPES POUR API REST
type MethodeHTTP = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type RequeteAPI = {
    method: MethodeHTTP;
    url: string;
    headers?: Dictionnaire<string>;
    body?: JSON;
    timeout?: number;
};

type ConfigurationAPI = {
    baseURL: string;
    timeout: number;
    headers: Dictionnaire<string>;
    retries: number;
};

// ✅ CLASSE API AVEC ALIAS
class ClientAPI {
    private config: ConfigurationAPI;

    constructor(config: Partial<ConfigurationAPI>) {
        this.config = {
            baseURL: "https://api.example.com",
            timeout: 5000,
            headers: { "Content-Type": "application/json" },
            retries: 3,
            ...config
        };
    }

    async executer<T>(requete: RequeteAPI): Promesse<ReponseAPI<T>> {
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return {
            data: {} as T,
            status: 200,
            message: "Succès simulé",
            timestamp: new Date()
        };
    }

    async obtenirUtilisateur(id: number): Promesse<ReponseAPI<Utilisateur>> {
        return this.executer<Utilisateur>({
            method: "GET",
            url: `/users/${id}`
        });
    }

    async creerUtilisateur(donnees: SansId): Promesse<ReponseAPI<Utilisateur>> {
        return this.executer<Utilisateur>({
            method: "POST",
            url: "/users",
            body: donnees as JSON
        });
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES ALIAS DE TYPES ===");

// Test création d'utilisateur
const utilisateur = creerUtilisateur("Alice", 30, "alice@example.com");
console.log(`Utilisateur créé: ${utilisateur.nom} (${utilisateur.status})`);

// Test changement de status
const utilisateurSuspendu = changerStatusUtilisateur(utilisateur, "suspendu");
console.log(`Status changé: ${utilisateurSuspendu.status}`);

// Test coordonnées
const point1: Coordonnees = { x: 0, y: 0 };
const point2: Coordonnees = { x: 3, y: 4, z: 5 };
const distance = calculerDistance(point1, point2);
console.log(`Distance entre points: ${distance.toFixed(2)}`);

// Test gestionnaire de réponses
const gestionnaire = new GestionnaireReponses<Utilisateur>();
gestionnaire.ajouter(utilisateur, 200, "Utilisateur créé");
gestionnaire.ajouter(utilisateur, 404, "Utilisateur non trouvé");

console.log(`Succès: ${gestionnaire.obtenirSucces().length}`);
console.log(`Erreurs: ${gestionnaire.obtenirErreurs().length}`);

// Test paires
const paireMots: Paire<string> = ["hello", "world"];
const paireTransformee = traiterPaire(paireMots, mot => mot.toUpperCase());
console.log(`Paire transformée: [${paireTransformee.join(", ")}]`);

// Test dictionnaire
const couleurs: Dictionnaire<string> = creerDictionnaire(
    ["rouge", "vert", "bleu"],
    ["#FF0000", "#00FF00", "#0000FF"]
);
console.log(`Couleur rouge: ${couleurs.rouge}`);

// Test factory
const admin = FactoryUtilisateur.creerAdmin("Admin", "admin@example.com");
const guest = FactoryUtilisateur.creerGuest();

console.log(`Admin: ${admin.nom}`);
console.log(`Guest: ${guest.nom}`);

// Test JSON
const utilisateurJSON = JSON.stringify(utilisateur);
const utilisateurRestore = FactoryUtilisateur.depuisJSON(utilisateurJSON);
console.log(`Utilisateur restauré: ${utilisateurRestore?.nom || "Échec"}`);

// Test API client
const client = new ClientAPI({
    baseURL: "https://mon-api.com",
    timeout: 10000
});

client.obtenirUtilisateur(1).then(reponse => {
    console.log(`Réponse API: Status ${reponse.status}`);
});

// Test types conditionnels
type TestString = ClesString<Utilisateur>; // "nom" | "email"
type TestElement = TypeElement<string[]>; // string

// Test types utilitaires
const utilisateurPartiel: PartielUtilisateur = { nom: "Partiel" };
const nomEtEmail: NomEtEmail = { nom: "Test", email: "test@test.com" };

console.log(`Utilisateur partiel: ${utilisateurPartiel.nom || "Aucun nom"}`);
console.log(`Nom et email: ${nomEtEmail.nom}`);

// ✅ COMPOSITION DE TYPES ALIAS
type EvenementUtilisateur = {
    type: "connexion" | "deconnexion" | "modification";
    utilisateur: Utilisateur;
    timestamp: Date;
    details?: Dictionnaire<JSON>;
};

type HistoriqueUtilisateur = {
    utilisateur: Utilisateur;
    evenements: EvenementUtilisateur[];
    dernierAcces: Date;
};

function ajouterEvenement(
    historique: HistoriqueUtilisateur,
    type: EvenementUtilisateur["type"],
    details?: Dictionnaire<JSON>
): HistoriqueUtilisateur {
    const evenement: EvenementUtilisateur = {
        type,
        utilisateur: historique.utilisateur,
        timestamp: new Date(),
        details
    };

    return {
        ...historique,
        evenements: [...historique.evenements, evenement],
        dernierAcces: new Date()
    };
}

const historique: HistoriqueUtilisateur = {
    utilisateur,
    evenements: [],
    dernierAcces: new Date()
};

const historiqueAvecConnexion = ajouterEvenement(historique, "connexion", {
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0..."
});

console.log(`Événements dans l'historique: ${historiqueAvecConnexion.evenements.length}`);

export {
    creerUtilisateur,
    changerStatusUtilisateur,
    calculerDistance,
    GestionnaireReponses,
    traiterPaire,
    validerOptionnel,
    creerDictionnaire,
    FactoryUtilisateur,
    ClientAPI,
    ajouterEvenement
};

// Export des types pour réutilisation
export type {
    Nom,
    Age,
    Email,
    Actif,
    StatusUtilisateur,
    TailleVetement,
    CouleurPrimaire,
    Coordonnees,
    Utilisateur,
    CalculateurSimple,
    ValidateurTexte,
    GestionnaireEvenement,
    TransformateurDonnees,
    Paire,
    Optionnel,
    Tableau,
    Dictionnaire,
    Promesse,
    ReponseAPI,
    EtatChargement,
    ArbreNoeud,
    JSON,
    MethodeHTTP,
    RequeteAPI,
    ConfigurationAPI,
    EvenementUtilisateur,
    HistoriqueUtilisateur
};
