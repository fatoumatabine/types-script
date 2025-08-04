/**
 * MÉTHODES FIND EN TYPESCRIPT
 * ===========================
 * 
 * Les méthodes de recherche permettent de trouver des éléments dans des collections
 * TypeScript fournit un typage fort pour ces opérations
 */

// ✅ FIND BASIQUE AVEC TABLEAUX
function trouverPremierPair(nombres: number[]): number | undefined {
    return nombres.find(n => n % 2 === 0);
}

function trouverParNom(personnes: { nom: string; age: number }[], nom: string): { nom: string; age: number } | undefined {
    return personnes.find(p => p.nom === nom);
}

function trouverIndexPremierPair(nombres: number[]): number {
    return nombres.findIndex(n => n % 2 === 0);
}

// ✅ FIND AVEC TYPES GÉNÉRIQUES
function trouverElement<T>(tableau: T[], predicat: (element: T) => boolean): T | undefined {
    return tableau.find(predicat);
}

function trouverIndex<T>(tableau: T[], predicat: (element: T) => boolean): number {
    return tableau.findIndex(predicat);
}

function trouverTous<T>(tableau: T[], predicat: (element: T) => boolean): T[] {
    return tableau.filter(predicat);
}

// ✅ FIND AVEC TYPE GUARDS
interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    actif: boolean;
    role: "admin" | "user" | "guest";
}

function estAdmin(utilisateur: Utilisateur): utilisateur is Utilisateur & { role: "admin" } {
    return utilisateur.role === "admin";
}

function trouverAdmin(utilisateurs: Utilisateur[]): (Utilisateur & { role: "admin" }) | undefined {
    return utilisateurs.find(estAdmin);
}

function trouverUtilisateursActifs(utilisateurs: Utilisateur[]): Utilisateur[] {
    return utilisateurs.filter(u => u.actif);
}

// ✅ CLASSE PERSONNALISÉE POUR RECHERCHE
class RechercheAvancee<T> {
    private donnees: T[];

    constructor(donnees: T[]) {
        this.donnees = donnees;
    }

    trouver(predicat: (element: T) => boolean): T | undefined {
        return this.donnees.find(predicat);
    }

    trouverTous(predicat: (element: T) => boolean): T[] {
        return this.donnees.filter(predicat);
    }

    trouverIndex(predicat: (element: T) => boolean): number {
        return this.donnees.findIndex(predicat);
    }

    trouverDernierIndex(predicat: (element: T) => boolean): number {
        for (let i = this.donnees.length - 1; i >= 0; i--) {
            if (predicat(this.donnees[i])) {
                return i;
            }
        }
        return -1;
    }

    trouverDernier(predicat: (element: T) => boolean): T | undefined {
        const index = this.trouverDernierIndex(predicat);
        return index !== -1 ? this.donnees[index] : undefined;
    }

    existe(predicat: (element: T) => boolean): boolean {
        return this.donnees.some(predicat);
    }

    tousCorrespondent(predicat: (element: T) => boolean): boolean {
        return this.donnees.every(predicat);
    }

    compter(predicat: (element: T) => boolean): number {
        return this.donnees.filter(predicat).length;
    }

    obtenirDonnees(): T[] {
        return [...this.donnees];
    }
}

// ✅ RECHERCHE DANS DES OBJETS COMPLEXES
interface Produit {
    id: number;
    nom: string;
    prix: number;
    categorie: string;
    enStock: boolean;
    tags: string[];
}

class GestionnaireProduits {
    private produits: Produit[] = [];

    ajouter(produit: Produit): void {
        this.produits.push(produit);
    }

    trouverParId(id: number): Produit | undefined {
        return this.produits.find(p => p.id === id);
    }

    trouverParNom(nom: string): Produit | undefined {
        return this.produits.find(p => 
            p.nom.toLowerCase().includes(nom.toLowerCase())
        );
    }

    trouverParCategorie(categorie: string): Produit[] {
        return this.produits.filter(p => p.categorie === categorie);
    }

    trouverEnStock(): Produit[] {
        return this.produits.filter(p => p.enStock);
    }

    trouverParPrix(prixMin: number, prixMax: number): Produit[] {
        return this.produits.filter(p => 
            p.prix >= prixMin && p.prix <= prixMax
        );
    }

    trouverParTag(tag: string): Produit[] {
        return this.produits.filter(p => 
            p.tags.includes(tag)
        );
    }

    rechercheMulticriteres(criteres: {
        nom?: string;
        categorie?: string;
        prixMin?: number;
        prixMax?: number;
        enStock?: boolean;
        tags?: string[];
    }): Produit[] {
        return this.produits.filter(produit => {
            if (criteres.nom && !produit.nom.toLowerCase().includes(criteres.nom.toLowerCase())) {
                return false;
            }
            if (criteres.categorie && produit.categorie !== criteres.categorie) {
                return false;
            }
            if (criteres.prixMin !== undefined && produit.prix < criteres.prixMin) {
                return false;
            }
            if (criteres.prixMax !== undefined && produit.prix > criteres.prixMax) {
                return false;
            }
            if (criteres.enStock !== undefined && produit.enStock !== criteres.enStock) {
                return false;
            }
            if (criteres.tags && !criteres.tags.some(tag => produit.tags.includes(tag))) {
                return false;
            }
            return true;
        });
    }

    obtenirTous(): Produit[] {
        return [...this.produits];
    }
}

// ✅ RECHERCHE AVEC INDICES PERSONNALISÉS
class IndexRecherche<T, K extends keyof T> {
    private donnees: T[] = [];
    private index: Map<T[K], T[]> = new Map();
    private cle: K;

    constructor(cle: K) {
        this.cle = cle;
    }

    ajouter(element: T): void {
        this.donnees.push(element);
        const valeurCle = element[this.cle];
        
        if (!this.index.has(valeurCle)) {
            this.index.set(valeurCle, []);
        }
        this.index.get(valeurCle)!.push(element);
    }

    trouverParCle(valeur: T[K]): T[] {
        return this.index.get(valeur) || [];
    }

    trouverPremierParCle(valeur: T[K]): T | undefined {
        const elements = this.index.get(valeur);
        return elements && elements.length > 0 ? elements[0] : undefined;
    }

    supprimerParCle(valeur: T[K]): boolean {
        const elements = this.index.get(valeur);
        if (!elements) return false;

        // Supprimer des données principales
        elements.forEach(element => {
            const index = this.donnees.indexOf(element);
            if (index > -1) {
                this.donnees.splice(index, 1);
            }
        });

        // Supprimer de l'index
        this.index.delete(valeur);
        return true;
    }

    obtenirToutesLesCles(): T[K][] {
        return Array.from(this.index.keys());
    }

    taille(): number {
        return this.donnees.length;
    }
}

// ✅ RECHERCHE ASYNCHRONE
class RechercheAsynchrone<T> {
    private donnees: T[];

    constructor(donnees: T[]) {
        this.donnees = donnees;
    }

    async trouverAsync(predicat: (element: T) => boolean): Promise<T | undefined> {
        return new Promise((resolve) => {
            // Simulation d'une recherche asynchrone
            setTimeout(() => {
                resolve(this.donnees.find(predicat));
            }, 100);
        });
    }

    async trouverTousAsync(predicat: (element: T) => boolean): Promise<T[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.donnees.filter(predicat));
            }, 150);
        });
    }

    async rechercheParBatch(
        predicat: (element: T) => boolean,
        tailleBatch: number = 100
    ): Promise<T[]> {
        const resultats: T[] = [];
        
        for (let i = 0; i < this.donnees.length; i += tailleBatch) {
            const batch = this.donnees.slice(i, i + tailleBatch);
            const resultBatch = batch.filter(predicat);
            resultats.push(...resultBatch);
            
            // Permettre à d'autres tâches de s'exécuter
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        return resultats;
    }
}

// ✅ RECHERCHE FLOUE (FUZZY SEARCH)
class RechercheFolle {
    static distance(str1: string, str2: string): number {
        // Distance de Levenshtein simplifiée
        const matrix: number[][] = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    static rechercherFloue<T>(
        elements: T[],
        terme: string,
        extracteur: (element: T) => string,
        seuilMax: number = 2
    ): Array<{ element: T; distance: number }> {
        return elements
            .map(element => ({
                element,
                distance: this.distance(terme.toLowerCase(), extracteur(element).toLowerCase())
            }))
            .filter(result => result.distance <= seuilMax)
            .sort((a, b) => a.distance - b.distance);
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES FIND ===");

// Test find basique
const nombres = [1, 3, 4, 7, 8, 10];
const premierPair = trouverPremierPair(nombres);
console.log(`Premier nombre pair: ${premierPair || "Aucun"}`);

const indexPremierPair = trouverIndexPremierPair(nombres);
console.log(`Index du premier pair: ${indexPremierPair !== -1 ? indexPremierPair : "Non trouvé"}`);

// Test avec objets
const personnes = [
    { nom: "Alice", age: 30 },
    { nom: "Bob", age: 25 },
    { nom: "Charlie", age: 35 }
];

const alice = trouverParNom(personnes, "Alice");
console.log(`Alice trouvée: ${alice ? `${alice.nom}, ${alice.age} ans` : "Non trouvée"}`);

// Test génériques
const fruits = ["pomme", "banane", "orange", "kiwi"];
const fruitAvecA = trouverElement(fruits, f => f.includes("a"));
console.log(`Fruit avec 'a': ${fruitAvecA || "Aucun"}`);

// Test avec utilisateurs
const utilisateurs: Utilisateur[] = [
    { id: 1, nom: "Admin", email: "admin@test.com", actif: true, role: "admin" },
    { id: 2, nom: "User1", email: "user1@test.com", actif: true, role: "user" },
    { id: 3, nom: "Guest", email: "guest@test.com", actif: false, role: "guest" }
];

const admin = trouverAdmin(utilisateurs);
console.log(`Admin trouvé: ${admin ? admin.nom : "Aucun"}`);

const utilisateursActifs = trouverUtilisateursActifs(utilisateurs);
console.log(`Utilisateurs actifs: ${utilisateursActifs.length}`);

// Test classe de recherche avancée
const recherche = new RechercheAvancee(nombres);
console.log(`Dernier nombre > 5: ${recherche.trouverDernier(n => n > 5) || "Aucun"}`);
console.log(`Tous pairs: ${recherche.tousCorrespondent(n => n % 2 === 0)}`);
console.log(`Nombre d'éléments > 5: ${recherche.compter(n => n > 5)}`);

// Test gestionnaire de produits
const gestionnaire = new GestionnaireProduits();

gestionnaire.ajouter({
    id: 1,
    nom: "Laptop Gaming",
    prix: 1200,
    categorie: "Informatique",
    enStock: true,
    tags: ["gaming", "portable", "nvidia"]
});

gestionnaire.ajouter({
    id: 2,
    nom: "Smartphone",
    prix: 800,
    categorie: "Téléphonie",
    enStock: false,
    tags: ["mobile", "android", "camera"]
});

gestionnaire.ajouter({
    id: 3,
    nom: "Tablet Pro",
    prix: 600,
    categorie: "Informatique",
    enStock: true,
    tags: ["portable", "creative", "touchscreen"]
});

const produitRecherche = gestionnaire.trouverParNom("laptop");
console.log(`Produit trouvé: ${produitRecherche ? produitRecherche.nom : "Aucun"}`);

const produitsInformatique = gestionnaire.trouverParCategorie("Informatique");
console.log(`Produits informatique: ${produitsInformatique.length}`);

const produitsPrix = gestionnaire.trouverParPrix(500, 1000);
console.log(`Produits 500-1000€: ${produitsPrix.length}`);

const resultatsMultiples = gestionnaire.rechercheMulticriteres({
    categorie: "Informatique",
    enStock: true,
    tags: ["portable"]
});
console.log(`Recherche multicritères: ${resultatsMultiples.length} résultats`);

// Test index de recherche
const indexNom = new IndexRecherche<Utilisateur, "nom">("nom");
utilisateurs.forEach(u => indexNom.ajouter(u));

const utilisateursAdmin = indexNom.trouverParCle("Admin");
console.log(`Utilisateurs nommés Admin: ${utilisateursAdmin.length}`);

// Test recherche asynchrone
const rechercheAsync = new RechercheAsynchrone(nombres);

rechercheAsync.trouverAsync(n => n > 7).then(resultat => {
    console.log(`Recherche async - nombre > 7: ${resultat || "Aucun"}`);
});

rechercheAsync.trouverTousAsync(n => n % 2 === 0).then(resultats => {
    console.log(`Recherche async - nombres pairs: [${resultats.join(", ")}]`);
});

// Test recherche floue
const noms = ["Alice", "Bob", "Charlie", "David", "Eve"];
const rechercheFloue = RechercheFolle.rechercherFloue(
    noms,
    "Alise", // Avec une faute de frappe
    nom => nom,
    2
);

console.log("Recherche floue pour 'Alise':");
rechercheFloue.forEach(result => {
    console.log(`  ${result.element} (distance: ${result.distance})`);
});

// Test avec produits et recherche floue
const resultatsFlous = RechercheFolle.rechercherFloue(
    gestionnaire.obtenirTous(),
    "laptap", // Faute de frappe intentionnelle
    produit => produit.nom,
    3
);

console.log("Recherche floue produits pour 'laptap':");
resultatsFlous.forEach(result => {
    console.log(`  ${result.element.nom} (distance: ${result.distance})`);
});

// ✅ MÉTHODES FIND AVEC CHAÎNAGE
class RechercheChainee<T> {
    private resultats: T[];

    constructor(donnees: T[]) {
        this.resultats = [...donnees];
    }

    filtrer(predicat: (element: T) => boolean): RechercheChainee<T> {
        this.resultats = this.resultats.filter(predicat);
        return this;
    }

    trier<K extends keyof T>(cle: K, ordre: "asc" | "desc" = "asc"): RechercheChainee<T> {
        this.resultats.sort((a, b) => {
            const valA = a[cle];
            const valB = b[cle];
            
            if (valA < valB) return ordre === "asc" ? -1 : 1;
            if (valA > valB) return ordre === "asc" ? 1 : -1;
            return 0;
        });
        return this;
    }

    limiter(nombre: number): RechercheChainee<T> {
        this.resultats = this.resultats.slice(0, nombre);
        return this;
    }

    premier(): T | undefined {
        return this.resultats[0];
    }

    dernier(): T | undefined {
        return this.resultats[this.resultats.length - 1];
    }

    obtenirResultats(): T[] {
        return [...this.resultats];
    }

    compter(): number {
        return this.resultats.length;
    }
}

// Test chaînage
const rechercheProduits = new RechercheChainee(gestionnaire.obtenirTous())
    .filtrer(p => p.enStock)
    .filtrer(p => p.prix < 1000)
    .trier("prix", "desc")
    .limiter(2);

console.log(`Produits en stock < 1000€ (top 2): ${rechercheProduits.compter()}`);
const topProduits = rechercheProduits.obtenirResultats();
topProduits.forEach(p => {
    console.log(`  ${p.nom}: ${p.prix}€`);
});

export {
    trouverPremierPair,
    trouverParNom,
    trouverIndexPremierPair,
    trouverElement,
    trouverIndex,
    trouverTous,
    estAdmin,
    trouverAdmin,
    trouverUtilisateursActifs,
    RechercheAvancee,
    GestionnaireProduits,
    IndexRecherche,
    RechercheAsynchrone,
    RechercheFolle,
    RechercheChainee
};
