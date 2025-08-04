// 4. HÉRITAGE
// ============

// Classe de base
abstract class Animal {
  protected nom: string;
  protected age: number;

  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  // Méthode abstraite - doit être implémentée par les classes filles
  abstract faireDuBruit(): string;

  // Méthode concrète - peut être utilisée par toutes les classes filles
  sePresenter(): string {
    return `Je suis ${this.nom} et j'ai ${this.age} ans.`;
  }

  // Méthode virtuelle - peut être redéfinie par les classes filles
  dormir(): string {
    return `${this.nom} dort...`;
  }
}

// Héritage avec extends
class Chien extends Animal {
  private race: string;

  constructor(nom: string, age: number, race: string) {
    super(nom, age); // Appel du constructeur parent
    this.race = race;
  }

  // Implémentation de la méthode abstraite
  faireDuBruit(): string {
    return `${this.nom} aboie: Woof! Woof!`;
  }

  // Méthode spécifique à la classe Chien
  donnerPatte(): string {
    return `${this.nom} donne la patte!`;
  }

  // Redéfinition d'une méthode parent
  dormir(): string {
    return `${this.nom} le ${this.race} ronfle en dormant...`;
  }
}

class Chat extends Animal {
  private couleur: string;

  constructor(nom: string, age: number, couleur: string) {
    super(nom, age);
    this.couleur = couleur;
  }

  faireDuBruit(): string {
    return `${this.nom} miaule: Miaou!`;
  }

  ronronner(): string {
    return `${this.nom} le chat ${this.couleur} ronronne...`;
  }
}

// Interface pour l'héritage multiple (simulation)
interface Volant {
  voler(): string;
}

interface Nageur {
  nager(): string;
}

// Classe qui implémente plusieurs interfaces
class Canard extends Animal implements Volant, Nageur {
  faireDuBruit(): string {
    return `${this.nom} fait: Coin! Coin!`;
  }

  voler(): string {
    return `${this.nom} vole dans le ciel!`;
  }

  nager(): string {
    return `${this.nom} nage dans l'étang!`;
  }
}

// Exemples d'utilisation
const monChien = new Chien("Rex", 3, "Labrador");
const monChat = new Chat("Minou", 2, "roux");
const monCanard = new Canard("Donald", 1);

console.log("Héritage:");
console.log(monChien.sePresenter());
console.log(monChien.faireDuBruit());
console.log(monChien.donnerPatte());
console.log(monChien.dormir());

console.log(monChat.faireDuBruit());
console.log(monChat.ronronner());

console.log(monCanard.faireDuBruit());
console.log(monCanard.voler());
console.log(monCanard.nager());

export { Animal, Chien, Chat, Canard, Volant, Nageur };
