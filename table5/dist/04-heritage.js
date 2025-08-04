"use strict";
// 4. HÉRITAGE
// ============
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canard = exports.Chat = exports.Chien = exports.Animal = void 0;
// Classe de base
class Animal {
    constructor(nom, age) {
        this.nom = nom;
        this.age = age;
    }
    // Méthode concrète - peut être utilisée par toutes les classes filles
    sePresenter() {
        return `Je suis ${this.nom} et j'ai ${this.age} ans.`;
    }
    // Méthode virtuelle - peut être redéfinie par les classes filles
    dormir() {
        return `${this.nom} dort...`;
    }
}
exports.Animal = Animal;
// Héritage avec extends
class Chien extends Animal {
    constructor(nom, age, race) {
        super(nom, age); // Appel du constructeur parent
        this.race = race;
    }
    // Implémentation de la méthode abstraite
    faireDuBruit() {
        return `${this.nom} aboie: Woof! Woof!`;
    }
    // Méthode spécifique à la classe Chien
    donnerPatte() {
        return `${this.nom} donne la patte!`;
    }
    // Redéfinition d'une méthode parent
    dormir() {
        return `${this.nom} le ${this.race} ronfle en dormant...`;
    }
}
exports.Chien = Chien;
class Chat extends Animal {
    constructor(nom, age, couleur) {
        super(nom, age);
        this.couleur = couleur;
    }
    faireDuBruit() {
        return `${this.nom} miaule: Miaou!`;
    }
    ronronner() {
        return `${this.nom} le chat ${this.couleur} ronronne...`;
    }
}
exports.Chat = Chat;
// Classe qui implémente plusieurs interfaces
class Canard extends Animal {
    faireDuBruit() {
        return `${this.nom} fait: Coin! Coin!`;
    }
    voler() {
        return `${this.nom} vole dans le ciel!`;
    }
    nager() {
        return `${this.nom} nage dans l'étang!`;
    }
}
exports.Canard = Canard;
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
//# sourceMappingURL=04-heritage.js.map