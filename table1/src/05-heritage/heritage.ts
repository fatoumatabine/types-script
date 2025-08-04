/**
 * Exemple : Héritage de classes
 * Montre comment une classe peut hériter d'une autre classe
 */

// Classe de base (parent)
export abstract class Animal {
    protected nom: string;
    protected age: number;
    protected espece: string;

    constructor(nom: string, age: number, espece: string) {
        this.nom = nom;
        this.age = age;
        this.espece = espece;
    }

    // Méthodes communes à tous les animaux
    dormir(): void {
        console.log(`${this.nom} dort paisiblement.`);
    }

    manger(nourriture: string): void {
        console.log(`${this.nom} mange ${nourriture}.`);
    }

    obtenirInfos(): string {
        return `${this.nom} est un(e) ${this.espece} de ${this.age} ans`;
    }

    // Méthode abstraite - doit être implémentée par les classes filles
    abstract faireDuBruit(): void;
    abstract seDeplacer(): void;
}

// Classe fille héritant d'Animal
export class Chien extends Animal {
    private race: string;
    private dresse: boolean;

    constructor(nom: string, age: number, race: string, dresse: boolean = false) {
        // Appel du constructeur parent avec super()
        super(nom, age, "chien");
        this.race = race;
        this.dresse = dresse;
    }

    // Implémentation des méthodes abstraites obligatoires
    faireDuBruit(): void {
        console.log(`${this.nom} aboie : Wouf wouf !`);
    }

    seDeplacer(): void {
        console.log(`${this.nom} court en remuant la queue.`);
    }

    // Méthodes spécifiques aux chiens
    donnerLaPatte(): void {
        if (this.dresse) {
            console.log(`${this.nom} donne la patte.`);
        } else {
            console.log(`${this.nom} ne comprend pas cette commande.`);
        }
    }

    dresser(): void {
        this.dresse = true;
        console.log(`${this.nom} a été dressé !`);
    }

    // Redéfinition (override) d'une méthode parent
    obtenirInfos(): string {
        const infoBase = super.obtenirInfos(); // Appel de la méthode parent
        return `${infoBase}, race: ${this.race}, dressé: ${this.dresse ? 'oui' : 'non'}`;
    }
}

// Autre classe fille héritant d'Animal
export class Chat extends Animal {
    private independant: boolean;

    constructor(nom: string, age: number, independant: boolean = true) {
        super(nom, age, "chat");
        this.independant = independant;
    }

    faireDuBruit(): void {
        console.log(`${this.nom} miaule : Miaou miaou !`);
    }

    seDeplacer(): void {
        console.log(`${this.nom} se déplace silencieusement.`);
    }

    // Méthodes spécifiques aux chats
    ronronner(): void {
        console.log(`${this.nom} ronronne de contentement.`);
    }

    grimperSurArbre(): void {
        console.log(`${this.nom} grimpe agilement sur l'arbre.`);
    }

    // Redéfinition avec comportement différent
    dormir(): void {
        console.log(`${this.nom} fait une sieste de 16 heures.`);
    }
}

// Héritage à plusieurs niveaux
export class Oiseau extends Animal {
    protected peutVoler: boolean;

    constructor(nom: string, age: number, espece: string, peutVoler: boolean = true) {
        super(nom, age, espece);
        this.peutVoler = peutVoler;
    }

    faireDuBruit(): void {
        console.log(`${this.nom} gazouille.`);
    }

    seDeplacer(): void {
        if (this.peutVoler) {
            console.log(`${this.nom} vole dans le ciel.`);
        } else {
            console.log(`${this.nom} marche sur le sol.`);
        }
    }

    voler(): void {
        if (this.peutVoler) {
            console.log(`${this.nom} s'envole vers les nuages.`);
        } else {
            console.log(`${this.nom} ne peut pas voler.`);
        }
    }
}

// Héritage de second niveau
export class Aigle extends Oiseau {
    private forceSerres: number;

    constructor(nom: string, age: number, forceSerres: number) {
        super(nom, age, "aigle", true);
        this.forceSerres = forceSerres;
    }

    // Redéfinition avec comportement spécialisé
    faireDuBruit(): void {
        console.log(`${this.nom} pousse un cri perçant d'aigle !`);
    }

    chasser(): void {
        console.log(`${this.nom} chasse avec ses serres puissantes (force: ${this.forceSerres}/10).`);
    }

    // Méthode utilisant les méthodes héritées
    volerEtChasser(): void {
        this.voler(); // Méthode héritée d'Oiseau
        this.chasser(); // Méthode propre
    }
}

// Exemple d'utilisation
export function exempleHeritage() {
    console.log("=== Exemple Héritage ===");
    
    // Création d'instances des classes filles
    const monChien = new Chien("Rex", 3, "Labrador");
    const monChat = new Chat("Whiskers", 2, false);
    const monAigle = new Aigle("Aquila", 5, 9);
    
    // Utilisation des méthodes héritées et spécifiques
    console.log("\n--- Informations des animaux ---");
    console.log(monChien.obtenirInfos());
    console.log(monChat.obtenirInfos());
    console.log(monAigle.obtenirInfos());
    
    console.log("\n--- Actions des animaux ---");
    
    // Méthodes communes (héritées)
    monChien.manger("croquettes");
    monChat.manger("poisson");
    monAigle.manger("souris");
    
    // Méthodes abstraites implémentées différemment
    monChien.faireDuBruit();
    monChat.faireDuBruit();
    monAigle.faireDuBruit();
    
    // Méthodes de déplacement
    monChien.seDeplacer();
    monChat.seDeplacer();
    monAigle.seDeplacer();
    
    // Méthodes spécifiques à chaque classe
    console.log("\n--- Comportements spécifiques ---");
    monChien.donnerLaPatte(); // Il n'est pas dressé
    monChien.dresser();
    monChien.donnerLaPatte(); // Maintenant il peut
    
    monChat.ronronner();
    monChat.grimperSurArbre();
    
    monAigle.volerEtChasser();
    
    // Polymorphisme - traiter tous les animaux de la même façon
    console.log("\n--- Polymorphisme ---");
    const animaux: Animal[] = [monChien, monChat, monAigle];
    
    animaux.forEach(animal => {
        animal.dormir(); // Chaque animal dort différemment
        animal.faireDuBruit(); // Chaque animal fait un bruit différent
    });
    
    // Vérification de type avec instanceof
    console.log("\n--- Vérification de types ---");
    animaux.forEach(animal => {
        if (animal instanceof Chien) {
            animal.donnerLaPatte(); // Méthode spécifique aux chiens
        } else if (animal instanceof Chat) {
            animal.ronronner(); // Méthode spécifique aux chats
        } else if (animal instanceof Aigle) {
            animal.chasser(); // Méthode spécifique aux aigles
        }
    });
}
