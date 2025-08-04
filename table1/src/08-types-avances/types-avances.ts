/**
 * Exemple : Types avancés et utilitaires TypeScript
 * Démonstration de concepts plus avancés
 */

// Types d'union et d'intersection
export type Personne = {
    nom: string;
    age: number;
};

export type Employe = {
    entreprise: string;
    salaire: number;
};

// Type d'intersection (ET)
export type PersonneEmploye = Personne & Employe;

// Types conditionnels
export type EstTableau<T> = T extends any[] ? true : false;

// Types mappés
export type Optionnel<T> = {
    [K in keyof T]?: T[K];
};

export type Lecture<T> = {
    readonly [K in keyof T]: T[K];
};

// Types template literals
export type Evenement = 'click' | 'hover' | 'focus';
export type GestionnaireEvenement<T extends string> = `on${Capitalize<T>}`;

// Fonctions génériques avancées
export function fusionner<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

// Contraintes de type
export interface Identifiable {
    id: string | number;
}

export function obtenirId<T extends Identifiable>(item: T): T['id'] {
    return item.id;
}

// Types récursifs
export type ArbreJSON = {
    [key: string]: string | number | boolean | ArbreJSON | ArbreJSON[];
};

// Exemple d'utilisation
export function exemplesTypesAvances() {
    console.log("=== Types Avancés ===");
    
    // Types d'intersection
    const employe: PersonneEmploye = {
        nom: "Alice",
        age: 30,
        entreprise: "TechCorp",
        salaire: 50000
    };
    
    console.log("Employé:", employe);
    
    // Types conditionnels
    type Test1 = EstTableau<string[]>; // true
    type Test2 = EstTableau<string>;   // false
    
    // Fusion d'objets
    const personne = { nom: "Bob", age: 25 };
    const contact = { email: "bob@email.com", telephone: "123456789" };
    const personneComplete = fusionner(personne, contact);
    
    console.log("Personne complète:", personneComplete);
    
    // Contraintes de type
    const item = { id: 1, nom: "Article" };
    console.log("ID de l'item:", obtenirId(item));
    
    // Types template literals
    type OnClick = GestionnaireEvenement<'click'>; // "onClick"
    type OnHover = GestionnaireEvenement<'hover'>; // "onHover"
    
    console.log("Types template literals démontrés");
}
