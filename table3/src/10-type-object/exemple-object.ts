/**
 * TYPE OBJECT EN TYPESCRIPT
 * =========================
 * 
 * Le type 'object' représente tous les types non-primitifs
 * Cela inclut les objets, tableaux, fonctions, dates, etc.
 */

// ✅ TYPE OBJECT BASIQUE
let monObjet: object = { nom: "Jean", age: 30 };
let monTableau: object = [1, 2, 3];
let maFonction: object = function() { return "Hello"; };
let maDate: object = new Date();

// ✅ INTERFACES POUR DÉFINIR DES STRUCTURES D'OBJETS
interface Personne {
    nom: string;
    age: number;
    email?: string; // Propriété optionnelle
    readonly id: number; // Propriété en lecture seule
}

interface Adresse {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
}

interface PersonneComplete extends Personne {
    adresse: Adresse;
    telephone?: string;
}

// ✅ TYPES D'OBJETS AVEC INDEX SIGNATURE
interface Dictionnaire {
    [cle: string]: string;
}

interface CompteurNombre {
    [cle: string]: number;
}

interface ConfigurationMixte {
    nom: string;
    version: number;
    [parametre: string]: any; // Propriétés supplémentaires de tout type
}

// ✅ FONCTIONS TRAVAILLANT AVEC DES OBJETS
function creerPersonne(nom: string, age: number, email?: string): Personne {
    const id = Math.floor(Math.random() * 10000);
    return { id, nom, age, email };
}

function afficherPersonne(personne: Personne): string {
    let info = `${personne.nom} (${personne.age} ans, ID: ${personne.id})`;
    if (personne.email) {
        info += ` - Email: ${personne.email}`;
    }
    return info;
}

function mettreAJourAge(personne: Personne, nouvelAge: number): Personne {
    // Retourne un nouvel objet (immutabilité)
    return { ...personne, age: nouvelAge };
}

// ✅ MANIPULATION D'OBJETS AVEC MÉTHODES UTILITAIRES
function obtenirCles<T extends object>(objet: T): (keyof T)[] {
    return Object.keys(objet) as (keyof T)[];
}

function obtenirValeurs<T extends object>(objet: T): T[keyof T][] {
    return Object.values(objet);
}

function fusionnerObjets<T extends object, U extends object>(
    obj1: T, 
    obj2: U
): T & U {
    return { ...obj1, ...obj2 };
}

function supprimerPropriete<T extends object, K extends keyof T>(
    objet: T, 
    cle: K
): Omit<T, K> {
    const { [cle]: _, ...reste } = objet;
    return reste;
}

// ✅ VALIDATION D'OBJETS
function estObjet(valeur: unknown): valeur is object {
    return typeof valeur === "object" && valeur !== null && !Array.isArray(valeur);
}

function aLaPropriete<T extends object, K extends PropertyKey>(
    objet: T, 
    cle: K
): objet is T & Record<K, unknown> {
    return cle in objet;
}

function validerPersonne(donnees: unknown): donnees is Personne {
    if (!estObjet(donnees)) return false;
    
    return (
        aLaPropriete(donnees, "nom") && typeof donnees.nom === "string" &&
        aLaPropriete(donnees, "age") && typeof donnees.age === "number" &&
        aLaPropriete(donnees, "id") && typeof donnees.id === "number" &&
        (!aLaPropriete(donnees, "email") || typeof donnees.email === "string")
    );
}

// ✅ TRANSFORMATION D'OBJETS
function transformerEnMajuscules<T extends Record<string, any>>(objet: T): T {
    const resultat = {} as T;
    for (const [cle, valeur] of Object.entries(objet)) {
        if (typeof valeur === "string") {
            resultat[cle as keyof T] = valeur.toUpperCase() as T[keyof T];
        } else {
            resultat[cle as keyof T] = valeur;
        }
    }
    return resultat;
}

function mapperObjet<T extends Record<string, any>, U>(
    objet: T,
    mapper: (valeur: T[keyof T], cle: keyof T) => U
): Record<keyof T, U> {
    const resultat = {} as Record<keyof T, U>;
    for (const [cle, valeur] of Object.entries(objet)) {
        resultat[cle as keyof T] = mapper(valeur, cle);
    }
    return resultat;
}

// ✅ CLONAGE PROFOND D'OBJETS
function clonageProfond<T>(objet: T): T {
    if (objet === null || typeof objet !== "object") {
        return objet;
    }

    if (objet instanceof Date) {
        return new Date(objet.getTime()) as T;
    }

    if (objet instanceof Array) {
        return objet.map(item => clonageProfond(item)) as T;
    }

    if (typeof objet === "object") {
        const clone = {} as T;
        for (const cle in objet) {
            if (objet.hasOwnProperty(cle)) {
                clone[cle] = clonageProfond(objet[cle]);
            }
        }
        return clone;
    }

    return objet;
}

// ✅ COMPARAISON D'OBJETS
function comparer<T extends object>(obj1: T, obj2: T): boolean {
    const cles1 = Object.keys(obj1);
    const cles2 = Object.keys(obj2);

    if (cles1.length !== cles2.length) {
        return false;
    }

    for (const cle of cles1) {
        const valeur1 = obj1[cle as keyof T];
        const valeur2 = obj2[cle as keyof T];

        if (typeof valeur1 === "object" && typeof valeur2 === "object") {
            if (valeur1 === null || valeur2 === null) {
                if (valeur1 !== valeur2) return false;
            } else if (!comparer(valeur1 as object, valeur2 as object)) {
                return false;
            }
        } else if (valeur1 !== valeur2) {
            return false;
        }
    }

    return true;
}

// ✅ SÉRIALIZATION ET DÉSÉRIALISATION
function serialiser<T extends object>(objet: T): string {
    return JSON.stringify(objet, null, 2);
}

function deserialiser<T>(json: string): T {
    try {
        return JSON.parse(json) as T;
    } catch (error) {
        throw new Error(`Erreur de désérialisation: ${error}`);
    }
}

// ✅ CLASSES AVEC OBJETS
class GestionnairePersonnes {
    private personnes: Map<number, Personne> = new Map();

    ajouter(personne: Personne): void {
        this.personnes.set(personne.id, personne);
    }

    obtenirParId(id: number): Personne | undefined {
        return this.personnes.get(id);
    }

    obtenirTous(): Personne[] {
        return Array.from(this.personnes.values());
    }

    mettreAJour(id: number, modifications: Partial<Omit<Personne, "id">>): boolean {
        const personne = this.personnes.get(id);
        if (!personne) return false;

        const personneModifiee = { ...personne, ...modifications };
        this.personnes.set(id, personneModifiee);
        return true;
    }

    supprimer(id: number): boolean {
        return this.personnes.delete(id);
    }

    rechercher(predicat: (personne: Personne) => boolean): Personne[] {
        return this.obtenirTous().filter(predicat);
    }

    compter(): number {
        return this.personnes.size;
    }
}

// ✅ TYPES UTILITAIRES POUR OBJETS
type ClesRequises<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type ClesOptionnelles<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type PartielProfond<T> = {
    [P in keyof T]?: T[P] extends object ? PartielProfond<T[P]> : T[P];
};

// ✅ FACTORY PATTERN POUR OBJETS
interface ConfigurationUsine {
    typeDefaut: string;
    valeurDefaut: any;
}

class UsineObjets {
    private configurations = new Map<string, ConfigurationUsine>();

    enregistrerType(nom: string, config: ConfigurationUsine): void {
        this.configurations.set(nom, config);
    }

    creer<T extends object>(nom: string, proprietes?: Partial<T>): T {
        const config = this.configurations.get(nom);
        if (!config) {
            throw new Error(`Type non enregistré: ${nom}`);
        }

        const objetBase = { type: config.typeDefaut, ...config.valeurDefaut };
        return { ...objetBase, ...proprietes } as T;
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE OBJECT ===");

// Test création et affichage de personnes
const alice = creerPersonne("Alice", 30, "alice@example.com");
const bob = creerPersonne("Bob", 25);

console.log(afficherPersonne(alice));
console.log(afficherPersonne(bob));

// Test mise à jour immutable
const aliceVieillie = mettreAJourAge(alice, 31);
console.log(`Alice originale: ${alice.age} ans`);
console.log(`Alice vieillie: ${aliceVieillie.age} ans`);

// Test manipulation d'objets
const exemple = { nom: "Test", valeur: 42, actif: true };
console.log(`Clés: ${obtenirCles(exemple)}`);
console.log(`Valeurs: ${obtenirValeurs(exemple)}`);

const fusion = fusionnerObjets(exemple, { nouveau: "ajouté" });
console.log(`Objet fusionné:`, fusion);

const sansActif = supprimerPropriete(exemple, "actif");
console.log(`Sans 'actif':`, sansActif);

// Test validation
const donneesValides = { id: 1, nom: "Jean", age: 30 };
const donneesInvalides = { nom: "Jean" }; // manque id et age

console.log(`Données valides: ${validerPersonne(donneesValides)}`);
console.log(`Données invalides: ${validerPersonne(donneesInvalides)}`);

// Test transformation
const texte = { titre: "hello", description: "world" };
const texteMajuscule = transformerEnMajuscules(texte);
console.log(`Texte en majuscules:`, texteMajuscule);

const longueurs = mapperObjet(texte, (valeur) => valeur.length);
console.log(`Longueurs:`, longueurs);

// Test clonage
const original = {
    nom: "Test",
    details: { age: 30, actif: true },
    dates: [new Date()]
};

const clone = clonageProfond(original);
clone.details.age = 31;
console.log(`Original age: ${original.details.age}`);
console.log(`Clone age: ${clone.details.age}`);

// Test comparaison
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log(`obj1 === obj2: ${comparer(obj1, obj2)}`);
console.log(`obj1 === obj3: ${comparer(obj1, obj3)}`);

// Test sérialisation
const json = serialiser(alice);
console.log(`JSON:`, json);

const aliceDeserialisee = deserialiser<Personne>(json);
console.log(`Désérialisée: ${aliceDeserialisee.nom}`);

// Test gestionnaire
const gestionnaire = new GestionnairePersonnes();
gestionnaire.ajouter(alice);
gestionnaire.ajouter(bob);

console.log(`Nombre de personnes: ${gestionnaire.compter()}`);

const personnesTrouvees = gestionnaire.rechercher(p => p.age > 25);
console.log(`Personnes > 25 ans: ${personnesTrouvees.length}`);

gestionnaire.mettreAJour(alice.id, { age: 32 });
const aliceMiseAJour = gestionnaire.obtenirParId(alice.id);
console.log(`Alice mise à jour: ${aliceMiseAJour?.age} ans`);

// Test usine d'objets
const usine = new UsineObjets();
usine.enregistrerType("utilisateur", {
    typeDefaut: "utilisateur",
    valeurDefaut: { actif: true, role: "user" }
});

const nouvelUtilisateur = usine.creer("utilisateur", {
    nom: "Charlie",
    email: "charlie@example.com"
});

console.log(`Nouvel utilisateur:`, nouvelUtilisateur);

// Test avec dictionnaire
const dictionnaire: Dictionnaire = {
    "bonjour": "hello",
    "merci": "thank you",
    "au revoir": "goodbye"
};

console.log(`Traduction de 'bonjour': ${dictionnaire["bonjour"]}`);

// Test configuration mixte
const config: ConfigurationMixte = {
    nom: "MonApp",
    version: 1,
    debug: true,
    timeout: 5000,
    database: { host: "localhost", port: 5432 }
};

console.log(`Configuration:`, config);

export {
    creerPersonne,
    afficherPersonne,
    mettreAJourAge,
    obtenirCles,
    obtenirValeurs,
    fusionnerObjets,
    supprimerPropriete,
    estObjet,
    aLaPropriete,
    validerPersonne,
    transformerEnMajuscules,
    mapperObjet,
    clonageProfond,
    comparer,
    serialiser,
    deserialiser,
    GestionnairePersonnes,
    UsineObjets
};
