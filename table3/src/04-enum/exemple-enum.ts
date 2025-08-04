/**
 * TYPE ENUM EN TYPESCRIPT
 * =======================
 * 
 * Les énumérations (enum) permettent de définir un ensemble de constantes nommées
 * Très utiles pour représenter des valeurs qui ne changent pas (statuts, couleurs, etc.)
 */

// ✅ ENUM NUMÉRIQUE BASIQUE
enum Couleur {
    Rouge,    // 0
    Vert,     // 1
    Bleu      // 2
}

// ✅ ENUM NUMÉRIQUE AVEC VALEURS PERSONNALISÉES
enum StatusCode {
    OK = 200,
    NotFound = 404,
    InternalError = 500
}

// ✅ ENUM STRING
enum Direction {
    Nord = "NORD",
    Sud = "SUD", 
    Est = "EST",
    Ouest = "OUEST"
}

// ✅ ENUM MIXTE (nombres et strings)
enum Reponse {
    Non = 0,
    Oui = 1,
    Peut_etre = "PEUT_ETRE"
}

// ✅ ENUM CALCULÉ
enum Fichier {
    Lecture = 1,
    Ecriture = 2,
    Execution = 4,
    LectureEcriture = Lecture | Ecriture, // 3
    Tous = Lecture | Ecriture | Execution  // 7
}

// ✅ FONCTIONS UTILISANT DES ENUMS
function obtenirCouleurHex(couleur: Couleur): string {
    switch (couleur) {
        case Couleur.Rouge:
            return "#FF0000";
        case Couleur.Vert:
            return "#00FF00";
        case Couleur.Bleu:
            return "#0000FF";
        default:
            return "#000000";
    }
}

function gererStatusHTTP(status: StatusCode): string {
    switch (status) {
        case StatusCode.OK:
            return "Succès";
        case StatusCode.NotFound:
            return "Ressource non trouvée";
        case StatusCode.InternalError:
            return "Erreur serveur";
        default:
            return "Status inconnu";
    }
}

function deplacer(direction: Direction): string {
    return `Se déplacer vers le ${direction}`;
}

// ✅ INTERFACE AVEC ENUM
interface Vehicule {
    nom: string;
    couleur: Couleur;
    direction: Direction;
}

// ✅ CLASSE AVEC ENUM
class Feu {
    private etat: Couleur;

    constructor() {
        this.etat = Couleur.Rouge;
    }

    changer(): void {
        switch (this.etat) {
            case Couleur.Rouge:
                this.etat = Couleur.Vert;
                break;
            case Couleur.Vert:
                this.etat = Couleur.Bleu; // Orange simulé par Bleu
                break;
            case Couleur.Bleu:
                this.etat = Couleur.Rouge;
                break;
        }
    }

    obtenirEtat(): string {
        switch (this.etat) {
            case Couleur.Rouge:
                return "STOP";
            case Couleur.Vert:
                return "GO";
            case Couleur.Bleu:
                return "ATTENTION";
            default:
                return "INCONNU";
        }
    }
}

// ✅ VÉRIFICATION DE PERMISSIONS AVEC ENUM
function aPermission(permissionsUtilisateur: Fichier, permissionRequise: Fichier): boolean {
    return (permissionsUtilisateur & permissionRequise) === permissionRequise;
}

// ✅ EXEMPLES D'UTILISATION
console.log("=== EXEMPLES TYPE ENUM ===");

// Test enum Couleur
console.log(`Couleur Rouge = ${Couleur.Rouge}`);
console.log(`Couleur Vert = ${Couleur.Vert}`);
console.log(`Hex pour Rouge: ${obtenirCouleurHex(Couleur.Rouge)}`);

// Test enum StatusCode
console.log(`Status OK = ${StatusCode.OK}`);
console.log(`Message pour 404: ${gererStatusHTTP(StatusCode.NotFound)}`);

// Test enum Direction
console.log(deplacer(Direction.Nord));
console.log(deplacer(Direction.Sud));

// Test avec interface
const maVoiture: Vehicule = {
    nom: "BMW",
    couleur: Couleur.Bleu,
    direction: Direction.Est
};

console.log(`Voiture ${maVoiture.nom}, couleur: ${Couleur[maVoiture.couleur]}, direction: ${maVoiture.direction}`);

// Test classe Feu
const feuTricolore = new Feu();
console.log(`État initial du feu: ${feuTricolore.obtenirEtat()}`);
feuTricolore.changer();
console.log(`État après changement: ${feuTricolore.obtenirEtat()}`);

// Test permissions
const permissionsAdmin = Fichier.Tous;
const permissionsUtilisateur = Fichier.LectureEcriture;

console.log(`Admin peut exécuter: ${aPermission(permissionsAdmin, Fichier.Execution)}`);
console.log(`Utilisateur peut exécuter: ${aPermission(permissionsUtilisateur, Fichier.Execution)}`);
console.log(`Utilisateur peut lire: ${aPermission(permissionsUtilisateur, Fichier.Lecture)}`);

// ✅ PARCOURIR UN ENUM
console.log("=== TOUTES LES DIRECTIONS ===");
for (const direction in Direction) {
    if (isNaN(Number(direction))) {
        console.log(`Direction: ${direction} = ${Direction[direction as keyof typeof Direction]}`);
    }
}

// ✅ ENUM CONST (optimisé à la compilation)
const enum JourSemaine {
    Lundi = "LUN",
    Mardi = "MAR", 
    Mercredi = "MER",
    Jeudi = "JEU",
    Vendredi = "VEN",
    Samedi = "SAM",
    Dimanche = "DIM"
}

function estWeekend(jour: JourSemaine): boolean {
    return jour === JourSemaine.Samedi || jour === JourSemaine.Dimanche;
}

console.log(`Samedi est weekend: ${estWeekend(JourSemaine.Samedi)}`);
console.log(`Lundi est weekend: ${estWeekend(JourSemaine.Lundi)}`);

export { 
    Couleur, 
    StatusCode, 
    Direction, 
    Reponse, 
    Fichier,
    obtenirCouleurHex,
    gererStatusHTTP,
    deplacer,
    Feu,
    aPermission,
    JourSemaine,
    estWeekend
};
