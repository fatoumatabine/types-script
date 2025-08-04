/**
 * EXTENDS EN TYPESCRIPT
 * =====================
 * 
 * Le mot-clé 'extends' est utilisé pour:
 * 1. L'héritage de classes
 * 2. L'extension d'interfaces
 * 3. Les contraintes de types génériques
 * 4. Les types conditionnels
 */

// ✅ HÉRITAGE DE CLASSES
class Animal {
    protected nom: string;
    protected age: number;

    constructor(nom: string, age: number) {
        this.nom = nom;
        this.age = age;
    }

    sePresenter(): string {
        return `Je suis ${this.nom}, j'ai ${this.age} ans`;
    }

    dormir(): string {
        return `${this.nom} dort`;
    }

    protected manger(): string {
        return `${this.nom} mange`;
    }
}

class Chien extends Animal {
    private race: string;

    constructor(nom: string, age: number, race: string) {
        super(nom, age); // Appel du constructeur parent
        this.race = race;
    }

    // Override de méthode
    sePresenter(): string {
        return `${super.sePresenter()} et je suis un chien de race ${this.race}`;
    }

    aboyer(): string {
        return `${this.nom} aboie: Woof!`;
    }

    // Accès à la méthode protected du parent
    allerManger(): string {
        return this.manger();
    }
}

class Chat extends Animal {
    private couleur: string;

    constructor(nom: string, age: number, couleur: string) {
        super(nom, age);
        this.couleur = couleur;
    }

    sePresenter(): string {
        return `${super.sePresenter()} et je suis un chat ${this.couleur}`;
    }

    miauler(): string {
        return `${this.nom} miaule: Miaou!`;
    }

    grimper(): string {
        return `${this.nom} grimpe aux arbres`;
    }
}

// ✅ EXTENSION D'INTERFACES
interface Forme {
    couleur: string;
    calculerAire(): number;
}

interface FormeAvecPerimetre extends Forme {
    calculerPerimetre(): number;
}

interface FormeComplete extends FormeAvecPerimetre {
    nom: string;
    dessiner(): string;
}

class Rectangle implements FormeComplete {
    constructor(
        public couleur: string,
        public largeur: number,
        public hauteur: number,
        public nom: string = "Rectangle"
    ) {}

    calculerAire(): number {
        return this.largeur * this.hauteur;
    }

    calculerPerimetre(): number {
        return 2 * (this.largeur + this.hauteur);
    }

    dessiner(): string {
        return `Dessin d'un ${this.nom} ${this.couleur} de ${this.largeur}x${this.hauteur}`;
    }
}

// ✅ HÉRITAGE MULTIPLE D'INTERFACES
interface Volant {
    voler(): string;
    altitude: number;
}

interface Nageur {
    nager(): string;
    profondeur: number;
}

interface AmphibieVolant extends Volant, Nageur {
    atterrir(): string;
}

class Canard implements AmphibieVolant {
    altitude: number = 0;
    profondeur: number = 0;

    constructor(private nom: string) {}

    voler(): string {
        this.altitude = 100;
        return `${this.nom} vole à ${this.altitude}m`;
    }

    nager(): string {
        this.profondeur = 2;
        return `${this.nom} nage à ${this.profondeur}m de profondeur`;
    }

    atterrir(): string {
        this.altitude = 0;
        return `${this.nom} atterrit`;
    }
}

// ✅ GÉNÉRIQUES AVEC CONTRAINTES EXTENDS
interface Identifiable {
    id: number;
    nom: string;
}

function obtenirParId<T extends Identifiable>(
    items: T[], 
    id: number
): T | undefined {
    return items.find(item => item.id === id);
}

function trierParNom<T extends Identifiable>(items: T[]): T[] {
    return [...items].sort((a, b) => a.nom.localeCompare(b.nom));
}

// ✅ TYPES CONDITIONNELS AVEC EXTENDS
type EstTableau<T> = T extends Array<any> ? true : false;

type TestTableau1 = EstTableau<number[]>; // true
type TestTableau2 = EstTableau<string>;   // false

type ExtraireType<T> = T extends Array<infer U> ? U : T;

type TypeExtraitArray = ExtraireType<string[]>; // string
type TypeExtraitNonArray = ExtraireType<number>; // number

// ✅ TYPES UTILITAIRES AVEC EXTENDS
type SansMethodes<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K]
};

type SeulementMethodes<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : never
};

interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    seConnecter(): void;
    seDeconnecter(): void;
}

type DonneesUtilisateur = SansMethodes<Utilisateur>; // { id: number, nom: string, email: string }
type MethodesUtilisateur = SeulementMethodes<Utilisateur>; // { seConnecter(): void, seDeconnecter(): void }

// ✅ CLASSE ABSTRAITE AVEC EXTENDS
abstract class Vehicule {
    protected marque: string;
    protected modele: string;

    constructor(marque: string, modele: string) {
        this.marque = marque;
        this.modele = modele;
    }

    // Méthode concrète
    obtenirInfo(): string {
        return `${this.marque} ${this.modele}`;
    }

    // Méthode abstraite - doit être implémentée par les classes filles
    abstract demarrer(): string;
    abstract arreter(): string;
}

class Voiture extends Vehicule {
    private carburant: number = 100;

    demarrer(): string {
        if (this.carburant > 0) {
            return `La voiture ${this.obtenirInfo()} démarre`;
        }
        return `Pas assez de carburant`;
    }

    arreter(): string {
        return `La voiture ${this.obtenirInfo()} s'arrête`;
    }

    faireLePlein(): void {
        this.carburant = 100;
    }
}

class Velo extends Vehicule {
    private vitesse: number = 0;

    demarrer(): string {
        this.vitesse = 15;
        return `Le vélo ${this.obtenirInfo()} commence à rouler à ${this.vitesse}km/h`;
    }

    arreter(): string {
        this.vitesse = 0;
        return `Le vélo ${this.obtenirInfo()} s'arrête`;
    }

    accelerer(): void {
        this.vitesse += 5;
    }
}

// ✅ EXTENDS AVEC TYPES DE MAPPING
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};

type RequiredExtends<T extends object> = {
    [P in keyof T]-?: T[P];
};

interface Produit {
    nom: string;
    prix?: number;
    description?: string;
}

type ProduitLectureSeule = Readonly<Produit>;
type ProduitOptional = Optional<Produit>;
type ProduitRequis = RequiredExtends<Produit>;

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES EXTENDS ===");

// Test héritage de classes
const monChien = new Chien("Rex", 5, "Labrador");
const monChat = new Chat("Miaou", 3, "gris");

console.log(monChien.sePresenter());
console.log(monChien.aboyer());
console.log(monChien.dormir());
console.log(monChien.allerManger());

console.log(monChat.sePresenter());
console.log(monChat.miauler());
console.log(monChat.grimper());

// Test interfaces étendues
const rectangle = new Rectangle("rouge", 10, 5);
console.log(rectangle.dessiner());
console.log(`Aire: ${rectangle.calculerAire()}`);
console.log(`Périmètre: ${rectangle.calculerPerimetre()}`);

// Test interface multiple
const canard = new Canard("Donald");
console.log(canard.voler());
console.log(canard.nager());
console.log(canard.atterrir());

// Test génériques avec contraintes
interface Personne extends Identifiable {
    age: number;
}

interface Livre extends Identifiable {
    auteur: string;
}

const personnes: Personne[] = [
    { id: 1, nom: "Alice", age: 30 },
    { id: 2, nom: "Bob", age: 25 },
    { id: 3, nom: "Charlie", age: 35 }
];

const livres: Livre[] = [
    { id: 1, nom: "TypeScript Guide", auteur: "John Doe" },
    { id: 2, nom: "JavaScript Basics", auteur: "Jane Smith" }
];

const personnesTrouvees = obtenirParId(personnes, 2);
console.log(`Personne trouvée: ${personnesTrouvees?.nom}`);

const personnesTriees = trierParNom(personnes);
console.log(`Personnes triées: ${personnesTriees.map(p => p.nom).join(", ")}`);

// Test classes abstraites
const maVoiture = new Voiture("Toyota", "Prius");
const monVelo = new Velo("Trek", "Mountain");

console.log(maVoiture.demarrer());
console.log(maVoiture.arreter());

console.log(monVelo.demarrer());
monVelo.accelerer();
console.log(monVelo.arreter());

// Test avec polymorphisme
function utiliserVehicule(vehicule: Vehicule): void {
    console.log(`Véhicule: ${vehicule.obtenirInfo()}`);
    console.log(vehicule.demarrer());
    console.log(vehicule.arreter());
}

utiliserVehicule(maVoiture);
utiliserVehicule(monVelo);

// ✅ MIXIN PATTERN AVEC EXTENDS
type Constructor<T = {}> = new (...args: any[]) => T;

function Horodatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        dateCreation: Date = new Date();
        
        obtenirAge(): number {
            return Date.now() - this.dateCreation.getTime();
        }
    };
}

function Identifiable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        id: string = Math.random().toString(36);
    };
}

class Document {
    constructor(public titre: string) {}
}

const DocumentAvecHorodatage = Horodatable(Document);
const DocumentComplet = Identifiable(Horodatable(Document));

const doc = new DocumentComplet("Mon Document");
console.log(`Document ID: ${doc.id}`);
console.log(`Titre: ${doc.titre}`);
console.log(`Âge du document: ${doc.obtenirAge()}ms`);

export {
    Animal,
    Chien,
    Chat,
    Rectangle,
    Canard,
    obtenirParId,
    trierParNom,
    Vehicule,
    Voiture,
    Velo,
    utiliserVehicule,
    Horodatable,
    Identifiable,
    Document
};
