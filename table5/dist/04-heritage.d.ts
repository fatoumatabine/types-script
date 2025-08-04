declare abstract class Animal {
    protected nom: string;
    protected age: number;
    constructor(nom: string, age: number);
    abstract faireDuBruit(): string;
    sePresenter(): string;
    dormir(): string;
}
declare class Chien extends Animal {
    private race;
    constructor(nom: string, age: number, race: string);
    faireDuBruit(): string;
    donnerPatte(): string;
    dormir(): string;
}
declare class Chat extends Animal {
    private couleur;
    constructor(nom: string, age: number, couleur: string);
    faireDuBruit(): string;
    ronronner(): string;
}
interface Volant {
    voler(): string;
}
interface Nageur {
    nager(): string;
}
declare class Canard extends Animal implements Volant, Nageur {
    faireDuBruit(): string;
    voler(): string;
    nager(): string;
}
export { Animal, Chien, Chat, Canard, Volant, Nageur };
//# sourceMappingURL=04-heritage.d.ts.map