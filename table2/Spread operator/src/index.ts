// ===== SPREAD OPERATOR (...) EN TYPESCRIPT =====
// Guide complet de l'opérateur de propagation (spread) en TypeScript

console.log('=== SPREAD OPERATOR (...) EN TYPESCRIPT ===');

console.log('\n=== SPREAD AVEC LES TABLEAUX ===');

// 1. Fusion de tableaux
const fruits = ["pomme", "banane", "orange"];
const legumes = ["carotte", "brocoli", "épinards"];
const aliments = [...fruits, ...legumes];

console.log('Fruits:', fruits);
console.log('Légumes:', legumes);
console.log('Aliments combinés:', aliments);

// 2. Ajout d'éléments aux tableaux
const nombres = [2, 3, 4];
const nombresEtendus = [1, ...nombres, 5, 6];
console.log('Nombres étendus:', nombresEtendus);

// 3. Copie de tableau (shallow copy)
const original = [1, 2, 3];
const copie = [...original];
copie.push(4);
console.log('Original après modification de la copie:', original);
console.log('Copie modifiée:', copie);

console.log('\n=== SPREAD AVEC LES OBJETS ===');

// 4. Fusion d'objets
const infoPersonnelle = {
    nom: "Dupont",
    prenom: "Marie",
    age: 30
};

const infoContact = {
    email: "marie.dupont@example.com",
    telephone: "+33123456789"
};

const profilComplet = {
    ...infoPersonnelle,
    ...infoContact,
    ville: "Paris"
};

console.log('Profil complet:', profilComplet);

// 5. Surcharge de propriétés
const configDefaut = {
    host: "localhost",
    port: 3000,
    ssl: false,
    timeout: 5000
};

const configProd = {
    ...configDefaut,
    host: "api.production.com",
    ssl: true,
    port: 443
};

console.log('Configuration par défaut:', configDefaut);
console.log('Configuration production:', configProd);

console.log('\n=== SPREAD DANS LES FONCTIONS ===');

// 6. Passage de paramètres avec spread
function calculerSomme(a: number, b: number, c: number): number {
    return a + b + c;
}

const valeurs: [number, number, number] = [10, 20, 30];
const somme = calculerSomme(...valeurs);
console.log('Somme avec spread:', somme);

// 7. Fonction avec paramètres rest et spread
function trouverMax(...nombres: number[]): number {
    return Math.max(...nombres);
}

const serie1 = [1, 5, 3];
const serie2 = [8, 2, 9];
const maximum = trouverMax(...serie1, ...serie2, 15, 7);
console.log('Maximum trouvé:', maximum);

console.log('\n=== DESTRUCTURATION AVEC SPREAD ===');

// 8. Rest avec destructuration de tableaux
const couleurs = ["rouge", "vert", "bleu", "jaune", "violet"];
const [premiere, deuxieme, ...autresCouleurs] = couleurs;

console.log('Première couleur:', premiere);
console.log('Deuxième couleur:', deuxieme);
console.log('Autres couleurs:', autresCouleurs);

// 9. Rest avec destructuration d'objets
const utilisateur = {
    id: 1,
    nom: "Alice",
    email: "alice@example.com",
    age: 25,
    ville: "Paris",
    pays: "France"
};

const { id, nom, ...autresInfos } = utilisateur;
console.log('ID:', id);
console.log('Nom:', nom);
console.log('Autres informations:', autresInfos);

console.log('\n=== MANIPULATION DE CHAÎNES ===');

// 10. Conversion string vers array avec spread
const motDePasse = "secret123";
const caracteresMotDePasse = [...motDePasse];
console.log('Caractères du mot de passe:', caracteresMotDePasse);

// Mélanger les caractères
const caracteresmelanges = [...caracteresMotDePasse].sort(() => Math.random() - 0.5);
console.log('Caractères mélangés:', caracteresmelanges.join(''));

console.log('\n=== CLONAGE PROFOND VS SUPERFICIEL ===');

// 11. Clonage superficiel avec spread
const objetAvecTableau = {
    nom: "Produit",
    prix: 99.99,
    categories: ["électronique", "ordinateur"]
};

const cloneSuperficiel = { ...objetAvecTableau };
cloneSuperficiel.categories.push("portable"); // Modifie l'original !

console.log('Objet original après clonage superficiel:', objetAvecTableau);
console.log('Clone superficiel:', cloneSuperficiel);

// 12. Clonage plus profond avec spread
const cloneProfond = {
    ...objetAvecTableau,
    categories: [...objetAvecTableau.categories] // Clone le tableau aussi
};

cloneProfond.categories.push("nouveau"); // Ne modifie pas l'original
console.log('Objet original après clonage profond:', objetAvecTableau);
console.log('Clone profond:', cloneProfond);

console.log('\n=== SPREAD AVEC DES TYPES TYPESCRIPT ===');

// 13. Spread avec interfaces
interface Adresse {
    rue: string;
    ville: string;
    codePostal: string;
}

interface Personne {
    nom: string;
    prenom: string;
}

interface Contact extends Personne {
    email: string;
    adresse: Adresse;
}

const adresse: Adresse = {
    rue: "123 Rue de la Paix",
    ville: "Paris",
    codePostal: "75001"
};

const personne: Personne = {
    nom: "Martin",
    prenom: "Jean"
};

const contact: Contact = {
    ...personne,
    email: "jean.martin@example.com",
    adresse: { ...adresse } // Clone de l'adresse
};

console.log('Contact créé avec spread:', contact);

console.log('\n=== SPREAD AVEC DES CLASSES ===');

// 14. Spread avec des instances de classe
class Vehicule {
    constructor(
        public marque: string,
        public modele: string,
        public annee: number
    ) {}

    getInfo(): string {
        return `${this.marque} ${this.modele} (${this.annee})`;
    }
}

const voiture = new Vehicule("Toyota", "Corolla", 2020);
const voitureModifiee = {
    ...voiture,
    couleur: "rouge",
    kilometrage: 15000
};

console.log('Voiture originale:', voiture.getInfo());
console.log('Voiture modifiée (objet simple):', voitureModifiee);
// Note: voitureModifiee n'a plus la méthode getInfo()

console.log('\n=== OPÉRATIONS AVANCÉES AVEC SPREAD ===');

// 15. Combinaison de tableaux avec conditions
const produitsA = [
    { id: 1, nom: "Laptop", prix: 999 },
    { id: 2, nom: "Souris", prix: 29 }
];

const produitsB = [
    { id: 3, nom: "Clavier", prix: 79 },
    { id: 4, nom: "Écran", prix: 299 }
];

const produitsPromo = [
    { id: 5, nom: "Casque", prix: 199 }
];

// Combinaison conditionnelle
const inclurePromo = true;
const tousLesProduits = [
    ...produitsA,
    ...produitsB,
    ...(inclurePromo ? produitsPromo : [])
];

console.log('Tous les produits:', tousLesProduits);

console.log('\n=== UTILITIES AVEC SPREAD ===');

// 16. Fonctions utilitaires utilisant spread
class ArrayUtils {
    static unique<T>(array: T[]): T[] {
        return [...new Set(array)];
    }

    static flatten<T>(arrays: T[][]): T[] {
        return ([] as T[]).concat(...arrays);
    }

    static shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

const avecDoublons = [1, 2, 2, 3, 3, 3, 4];
const tableaux2D = [[1, 2], [3, 4], [5, 6]];
const aMelanger = ["A", "B", "C", "D", "E"];

console.log('Unique:', ArrayUtils.unique(avecDoublons));
console.log('Aplati:', ArrayUtils.flatten(tableaux2D));
console.log('Mélangé:', ArrayUtils.shuffle(aMelanger));
console.log('Original non modifié:', aMelanger);

console.log('\n=== SPREAD AVEC GENERIC TYPES ===');

// 17. Fonctions génériques avec spread
function combiner<T>(...items: T[]): T[] {
    return [...items];
}

function fusionnerObjets<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const nombres1 = combiner(1, 2, 3, 4);
const textes = combiner("a", "b", "c");

console.log('Nombres combinés:', nombres1);
console.log('Textes combinés:', textes);

const objetFusionne = fusionnerObjets(
    { nom: "Test", id: 1 },
    { actif: true, date: new Date() }
);
console.log('Objet fusionné:', objetFusionne);

console.log('\n=== PERFORMANCE ET CONSIDÉRATIONS ===');

// 18. Performance avec de gros tableaux
function mesurePerformance(nom: string, operation: () => void): void {
    const debut = performance.now();
    operation();
    const fin = performance.now();
    console.log(`${nom}: ${(fin - debut).toFixed(2)}ms`);
}

const grosTableau = Array.from({ length: 100000 }, (_, i) => i);

mesurePerformance("Copie avec spread", () => {
    const copie = [...grosTableau];
});

mesurePerformance("Copie avec Array.from", () => {
    const copie = Array.from(grosTableau);
});

mesurePerformance("Copie avec slice", () => {
    const copie = grosTableau.slice();
});

console.log('\n=== BONNES PRATIQUES ===');

const bonnesPratiques = [
    "✅ Utilisez spread pour créer des copies superficielles",
    "✅ Préférez spread à Object.assign() pour la lisibilité",
    "✅ Attention au clonage superficiel avec des objets imbriqués",
    "✅ Utilisez spread pour passer des tableaux comme paramètres",
    "✅ Combinez avec destructuration pour un code plus expressif",
    "✅ Spread préserve l'ordre des propriétés (ES2018+)",
    "✅ Testez les performances avec de gros volumes de données",
    "✅ Documentez quand vous faites du clonage superficiel vs profond",
    "✅ Utilisez TypeScript pour typer correctement les opérations spread",
    "✅ Évitez spread dans des boucles pour de meilleures performances"
];

bonnesPratiques.forEach(pratique => console.log(pratique));

// Export pour éviter les erreurs de module
export {};
