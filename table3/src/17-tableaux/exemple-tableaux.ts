/**
 * LES TABLEAUX EN TYPESCRIPT
 * ==========================
 * 
 * - Déclaration et typage des tableaux
 * - Méthodes de manipulation
 * - Tableaux multidimensionnels
 * - Types utilitaires pour tableaux
 */

// ✅ DÉCLARATION ET TYPAGE DES TABLEAUX
const nombres: number[] = [1, 2, 3, 4, 5];
const fruits: Array<string> = ["pomme", "banane", "orange"];
const booleens: boolean[] = [true, false, true];

// Tableaux avec types d'union
const valeursMultiples: (string | number)[] = ["hello", 42, "world", 17];
const elementsOptionnels: (number | undefined)[] = [1, undefined, 3, undefined, 5];

// Tableaux readonly
const tableauLecture: ReadonlyArray<string> = ["a", "b", "c"];
const tableauConstant: readonly number[] = [1, 2, 3];

// Tableaux avec types littéraux
const couleurs: ("rouge" | "vert" | "bleu")[] = ["rouge", "vert"];
const etats: Array<"actif" | "inactif" | "suspendu"> = ["actif", "inactif"];

// ✅ INTERFACES POUR OBJETS DANS TABLEAUX
interface Personne {
    nom: string;
    age: number;
    actif: boolean;
}

interface Produit {
    id: number;
    nom: string;
    prix: number;
    categories: string[];
}

const personnes: Personne[] = [
    { nom: "Alice", age: 30, actif: true },
    { nom: "Bob", age: 25, actif: false },
    { nom: "Charlie", age: 35, actif: true }
];

const produits: Produit[] = [
    { id: 1, nom: "Ordinateur", prix: 999.99, categories: ["électronique", "informatique"] },
    { id: 2, nom: "Livre", prix: 19.99, categories: ["littérature", "éducation"] },
    { id: 3, nom: "Chaise", prix: 89.99, categories: ["mobilier", "bureau"] }
];

// ✅ FONCTIONS DE MANIPULATION DE TABLEAUX
function ajouterElement<T>(tableau: T[], element: T): T[] {
    return [...tableau, element];
}

function supprimerElement<T>(tableau: T[], index: number): T[] {
    return tableau.filter((_, i) => i !== index);
}

function modifierElement<T>(tableau: T[], index: number, nouvelElement: T): T[] {
    return tableau.map((element, i) => i === index ? nouvelElement : element);
}

function trouverIndex<T>(tableau: T[], predicat: (element: T) => boolean): number {
    return tableau.findIndex(predicat);
}

function filtrerTableau<T>(tableau: T[], predicat: (element: T) => boolean): T[] {
    return tableau.filter(predicat);
}

function transformerTableau<T, U>(tableau: T[], transformation: (element: T) => U): U[] {
    return tableau.map(transformation);
}

// ✅ FONCTIONS D'AGRÉGATION
function obtenirSomme(nombres: number[]): number {
    return nombres.reduce((somme, nombre) => somme + nombre, 0);
}

function obtenirMoyenne(nombres: number[]): number {
    return nombres.length > 0 ? obtenirSomme(nombres) / nombres.length : 0;
}

function obtenirMinimum(nombres: number[]): number | undefined {
    return nombres.length > 0 ? Math.min(...nombres) : undefined;
}

function obtenirMaximum(nombres: number[]): number | undefined {
    return nombres.length > 0 ? Math.max(...nombres) : undefined;
}

function compterElements<T>(tableau: T[], predicat: (element: T) => boolean): number {
    return tableau.filter(predicat).length;
}

function grouperPar<T, K extends string | number>(
    tableau: T[],
    obtenirCle: (element: T) => K
): Record<K, T[]> {
    return tableau.reduce((groupes, element) => {
        const cle = obtenirCle(element);
        if (!groupes[cle]) {
            groupes[cle] = [];
        }
        groupes[cle].push(element);
        return groupes;
    }, {} as Record<K, T[]>);
}

// ✅ FONCTIONS DE TRI
function trierNombres(nombres: number[], croissant: boolean = true): number[] {
    return [...nombres].sort((a, b) => croissant ? a - b : b - a);
}

function trierChaines(chaines: string[], croissant: boolean = true): string[] {
    return [...chaines].sort((a, b) => {
        const comparaison = a.localeCompare(b);
        return croissant ? comparaison : -comparaison;
    });
}

function trierObjetsPar<T>(
    tableau: T[],
    obtenirValeur: (element: T) => number | string,
    croissant: boolean = true
): T[] {
    return [...tableau].sort((a, b) => {
        const valeurA = obtenirValeur(a);
        const valeurB = obtenirValeur(b);
        
        if (typeof valeurA === "number" && typeof valeurB === "number") {
            return croissant ? valeurA - valeurB : valeurB - valeurA;
        }
        
        const comparaison = String(valeurA).localeCompare(String(valeurB));
        return croissant ? comparaison : -comparaison;
    });
}

// ✅ TABLEAUX MULTIDIMENSIONNELS
type Matrice2D = number[][];
type Matrice3D = number[][][];

function creerMatrice2D(lignes: number, colonnes: number, valeurInitiale: number = 0): Matrice2D {
    return Array.from({ length: lignes }, () => 
        Array.from({ length: colonnes }, () => valeurInitiale)
    );
}

function afficherMatrice2D(matrice: Matrice2D): void {
    console.log("Matrice 2D:");
    matrice.forEach((ligne, indexLigne) => {
        console.log(`  Ligne ${indexLigne}: [${ligne.join(", ")}]`);
    });
}

function transposeMatrice(matrice: Matrice2D): Matrice2D {
    if (matrice.length === 0) return [];
    
    const lignes = matrice.length;
    const colonnes = matrice[0].length;
    
    return Array.from({ length: colonnes }, (_, j) =>
        Array.from({ length: lignes }, (_, i) => matrice[i][j])
    );
}

function multiplierMatrices(a: Matrice2D, b: Matrice2D): Matrice2D | null {
    if (a[0]?.length !== b.length) {
        return null; // Incompatibles pour multiplication
    }
    
    const lignes = a.length;
    const colonnes = b[0].length;
    const k = b.length;
    
    const resultat = creerMatrice2D(lignes, colonnes);
    
    for (let i = 0; i < lignes; i++) {
        for (let j = 0; j < colonnes; j++) {
            for (let x = 0; x < k; x++) {
                resultat[i][j] += a[i][x] * b[x][j];
            }
        }
    }
    
    return resultat;
}

// ✅ TABLEAUX TYPÉS SPÉCIALISÉS
class TableauType<T> {
    private elements: T[] = [];
    
    constructor(elements: T[] = []) {
        this.elements = [...elements];
    }
    
    ajouter(element: T): void {
        this.elements.push(element);
    }
    
    supprimer(index: number): boolean {
        if (index >= 0 && index < this.elements.length) {
            this.elements.splice(index, 1);
            return true;
        }
        return false;
    }
    
    obtenir(index: number): T | undefined {
        return this.elements[index];
    }
    
    modifier(index: number, element: T): boolean {
        if (index >= 0 && index < this.elements.length) {
            this.elements[index] = element;
            return true;
        }
        return false;
    }
    
    taille(): number {
        return this.elements.length;
    }
    
    estVide(): boolean {
        return this.elements.length === 0;
    }
    
    contient(element: T): boolean {
        return this.elements.includes(element);
    }
    
    trouver(predicat: (element: T) => boolean): T | undefined {
        return this.elements.find(predicat);
    }
    
    filtrer(predicat: (element: T) => boolean): T[] {
        return this.elements.filter(predicat);
    }
    
    transformer<U>(transformation: (element: T) => U): U[] {
        return this.elements.map(transformation);
    }
    
    reduire<U>(
        reducteur: (accumulateur: U, element: T, index: number) => U,
        valeurInitiale: U
    ): U {
        return this.elements.reduce(reducteur, valeurInitiale);
    }
    
    trier(comparateur?: (a: T, b: T) => number): void {
        this.elements.sort(comparateur);
    }
    
    copier(): T[] {
        return [...this.elements];
    }
    
    vider(): void {
        this.elements = [];
    }
    
    *[Symbol.iterator](): Iterator<T> {
        for (const element of this.elements) {
            yield element;
        }
    }
}

// ✅ UTILITAIRES POUR TABLEAUX
function eliminerDoublons<T>(tableau: T[]): T[] {
    return [...new Set(tableau)];
}

function eliminerDoublonsParCle<T, K>(
    tableau: T[],
    obtenirCle: (element: T) => K
): T[] {
    const vus = new Set<K>();
    return tableau.filter(element => {
        const cle = obtenirCle(element);
        if (vus.has(cle)) {
            return false;
        }
        vus.add(cle);
        return true;
    });
}

function intersection<T>(tableau1: T[], tableau2: T[]): T[] {
    const ensemble2 = new Set(tableau2);
    return tableau1.filter(element => ensemble2.has(element));
}

function union<T>(tableau1: T[], tableau2: T[]): T[] {
    return eliminerDoublons([...tableau1, ...tableau2]);
}

function difference<T>(tableau1: T[], tableau2: T[]): T[] {
    const ensemble2 = new Set(tableau2);
    return tableau1.filter(element => !ensemble2.has(element));
}

function egaliteTableaux<T>(tableau1: T[], tableau2: T[]): boolean {
    if (tableau1.length !== tableau2.length) {
        return false;
    }
    
    return tableau1.every((element, index) => element === tableau2[index]);
}

function melangerTableau<T>(tableau: T[]): T[] {
    const copie = [...tableau];
    for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
}

function diviserTableau<T>(tableau: T[], tailleLot: number): T[][] {
    const lots: T[][] = [];
    for (let i = 0; i < tableau.length; i += tailleLot) {
        lots.push(tableau.slice(i, i + tailleLot));
    }
    return lots;
}

// ✅ PAGINATION ET NAVIGATION
interface ResultatPagination<T> {
    elements: T[];
    page: number;
    taillePage: number;
    totalElements: number;
    totalPages: number;
    premierePage: boolean;
    dernierePage: boolean;
}

function paginerTableau<T>(
    tableau: T[],
    page: number,
    taillePage: number
): ResultatPagination<T> {
    const totalElements = tableau.length;
    const totalPages = Math.ceil(totalElements / taillePage);
    const indexDebut = (page - 1) * taillePage;
    const indexFin = Math.min(indexDebut + taillePage, totalElements);
    
    return {
        elements: tableau.slice(indexDebut, indexFin),
        page,
        taillePage,
        totalElements,
        totalPages,
        premierePage: page === 1,
        dernierePage: page === totalPages
    };
}

// ✅ RECHERCHE AVANCÉE DANS TABLEAUX
function rechercheFloue(
    tableau: string[],
    terme: string,
    sensibiliteCase: boolean = false
): string[] {
    const termeRecherche = sensibiliteCase ? terme : terme.toLowerCase();
    
    return tableau.filter(element => {
        const elementRecherche = sensibiliteCase ? element : element.toLowerCase();
        return elementRecherche.includes(termeRecherche);
    });
}

function rechercheAvancee<T>(
    tableau: T[],
    criteres: { [K in keyof T]?: T[K] | ((valeur: T[K]) => boolean) }
): T[] {
    return tableau.filter(element => {
        return Object.entries(criteres).every(([cle, critere]) => {
            const valeurElement = element[cle as keyof T];
            
            if (typeof critere === "function") {
                return critere(valeurElement);
            }
            
            return valeurElement === critere;
        });
    });
}

// ✅ VALIDATION DE TABLEAUX
function validerTableau<T>(
    tableau: T[],
    validateur: (element: T, index: number) => boolean
): { valide: boolean; erreurs: { index: number; element: T }[] } {
    const erreurs: { index: number; element: T }[] = [];
    
    tableau.forEach((element, index) => {
        if (!validateur(element, index)) {
            erreurs.push({ index, element });
        }
    });
    
    return {
        valide: erreurs.length === 0,
        erreurs
    };
}

function assainirTableau<T>(
    tableau: T[],
    assainisseur: (element: T) => T | null
): T[] {
    return tableau
        .map(assainisseur)
        .filter((element): element is T => element !== null);
}

// ✅ PERFORMANCE ET OPTIMISATION
function rechercheRapide<T>(
    tableauTrie: T[],
    element: T,
    comparateur: (a: T, b: T) => number
): number {
    let gauche = 0;
    let droite = tableauTrie.length - 1;
    
    while (gauche <= droite) {
        const milieu = Math.floor((gauche + droite) / 2);
        const comparaison = comparateur(tableauTrie[milieu], element);
        
        if (comparaison === 0) {
            return milieu;
        } else if (comparaison < 0) {
            gauche = milieu + 1;
        } else {
            droite = milieu - 1;
        }
    }
    
    return -1; // Non trouvé
}

function* genererTableauLazy<T>(
    generateur: () => T,
    taille?: number
): Generator<T, void, unknown> {
    let compteur = 0;
    while (taille === undefined || compteur < taille) {
        yield generateur();
        compteur++;
    }
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TABLEAUX ===");

// Test des opérations de base
console.log(`Nombres: [${nombres.join(", ")}]`);
console.log(`Fruits: [${fruits.join(", ")}]`);

const nouveauxNombres = ajouterElement(nombres, 6);
console.log(`Après ajout: [${nouveauxNombres.join(", ")}]`);

const sansDeuxieme = supprimerElement(fruits, 1);
console.log(`Sans deuxième fruit: [${sansDeuxieme.join(", ")}]`);

// Test d'agrégation
const somme = obtenirSomme(nombres);
const moyenne = obtenirMoyenne(nombres);
const minimum = obtenirMinimum(nombres);
const maximum = obtenirMaximum(nombres);

console.log(`Somme: ${somme}, Moyenne: ${moyenne.toFixed(2)}`);
console.log(`Min: ${minimum}, Max: ${maximum}`);

// Test de groupement
const personnesParAge = grouperPar(personnes, p => p.age > 30 ? "senior" : "junior");
console.log("Groupement par âge:", personnesParAge);

// Test de tri
const nombresTriesDesc = trierNombres(nombres, false);
console.log(`Nombres triés (desc): [${nombresTriesDesc.join(", ")}]`);

const personnesTrieesParNom = trierObjetsPar(personnes, p => p.nom);
console.log("Personnes triées par nom:", personnesTrieesParNom.map(p => p.nom));

// Test des matrices
const matrice1 = creerMatrice2D(3, 3, 1);
matrice1[0] = [1, 2, 3];
matrice1[1] = [4, 5, 6];
matrice1[2] = [7, 8, 9];

afficherMatrice2D(matrice1);

const matrice2 = creerMatrice2D(3, 2, 2);
const produitMatrices = multiplierMatrices(matrice1, matrice2);
if (produitMatrices) {
    console.log("Produit des matrices:");
    afficherMatrice2D(produitMatrices);
}

// Test de la classe TableauType
const tableauPersonnes = new TableauType<Personne>(personnes);
console.log(`Taille du tableau: ${tableauPersonnes.taille()}`);

const personneTrouvee = tableauPersonnes.trouver(p => p.age > 30);
console.log(`Personne > 30 ans:`, personneTrouvee);

const nomsPersonnes = tableauPersonnes.transformer(p => p.nom);
console.log(`Noms: [${nomsPersonnes.join(", ")}]`);

// Test des utilitaires
const nombresAvecDoublons = [1, 2, 2, 3, 3, 3, 4, 5];
const sansDoublons = eliminerDoublons(nombresAvecDoublons);
console.log(`Sans doublons: [${sansDoublons.join(", ")}]`);

const tableau1 = [1, 2, 3, 4];
const tableau2 = [3, 4, 5, 6];
const intersectionResult = intersection(tableau1, tableau2);
const unionResult = union(tableau1, tableau2);
const differenceResult = difference(tableau1, tableau2);

console.log(`Intersection: [${intersectionResult.join(", ")}]`);
console.log(`Union: [${unionResult.join(", ")}]`);
console.log(`Différence: [${differenceResult.join(", ")}]`);

// Test de pagination
const pagination = paginerTableau(produits, 1, 2);
console.log("Pagination (page 1, taille 2):");
console.log(`  Éléments: ${pagination.elements.length}`);
console.log(`  Page ${pagination.page}/${pagination.totalPages}`);
console.log(`  Total: ${pagination.totalElements} éléments`);

// Test de recherche
const fruitsRecherche = rechercheFloue(fruits, "an");
console.log(`Fruits contenant "an": [${fruitsRecherche.join(", ")}]`);

const personnesActives = rechercheAvancee(personnes, { actif: true });
console.log(`Personnes actives: ${personnesActives.length}`);

// Test de validation
const validationNombres = validerTableau(nombres, (n, i) => n > 0 && n <= 10);
console.log(`Validation nombres: ${validationNombres.valide ? "✓" : "✗"}`);
if (!validationNombres.valide) {
    console.log("Erreurs:", validationNombres.erreurs);
}

// Test de recherche rapide
const nombresTriesAsc = trierNombres(nombres, true);
const indexRecherche = rechercheRapide(
    nombresTriesAsc,
    3,
    (a, b) => a - b
);
console.log(`Index de 3 dans tableau trié: ${indexRecherche}`);

// Test du générateur lazy
console.log("Générateur lazy (5 nombres aléatoires):");
const genNombres = genererTableauLazy(() => Math.floor(Math.random() * 100), 5);
for (const nombre of genNombres) {
    console.log(`  ${nombre}`);
}

// Test de mélange
const fruitsMelanges = melangerTableau(fruits);
console.log(`Fruits mélangés: [${fruitsMelanges.join(", ")}]`);

// Test de division
const nombresEtendus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const lots = diviserTableau(nombresEtendus, 3);
console.log("Division en lots de 3:");
lots.forEach((lot, index) => {
    console.log(`  Lot ${index + 1}: [${lot.join(", ")}]`);
});

// Test d'itération avec la classe TableauType
console.log("Itération sur TableauType:");
for (const personne of tableauPersonnes) {
    console.log(`  ${personne.nom} (${personne.age} ans)`);
}

export {
    nombres,
    fruits,
    booleens,
    valeursMultiples,
    elementsOptionnels,
    tableauLecture,
    tableauConstant,
    couleurs,
    etats,
    personnes,
    produits,
    ajouterElement,
    supprimerElement,
    modifierElement,
    trouverIndex,
    filtrerTableau,
    transformerTableau,
    obtenirSomme,
    obtenirMoyenne,
    obtenirMinimum,
    obtenirMaximum,
    compterElements,
    grouperPar,
    trierNombres,
    trierChaines,
    trierObjetsPar,
    creerMatrice2D,
    afficherMatrice2D,
    transposeMatrice,
    multiplierMatrices,
    TableauType,
    eliminerDoublons,
    eliminerDoublonsParCle,
    intersection,
    union,
    difference,
    egaliteTableaux,
    melangerTableau,
    diviserTableau,
    paginerTableau,
    rechercheFloue,
    rechercheAvancee,
    validerTableau,
    assainirTableau,
    rechercheRapide,
    genererTableauLazy
};
