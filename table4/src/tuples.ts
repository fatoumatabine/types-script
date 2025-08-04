// ============================================
// TUPLES - Types de données ordonnées
// ============================================

// Définition de tuples basiques
type Coordinates = [number, number]; // [x, y]
type RGBColor = [number, number, number]; // [r, g, b]
type UserInfo = [string, number, boolean]; // [nom, âge, actif]

// Tuples avec des types nommés
type Point3D = [x: number, y: number, z: number];
type DatabaseRecord = [id: number, name: string, email: string, active: boolean];

// Tuples avec longueur variable
type StringArray = [string, ...string[]];
type NumberPair = [number, number, ...number[]];

// Exemples d'utilisation
export class TupleExamples {
    // Coordonnées géographiques
    static createCoordinate(x: number, y: number): Coordinates {
        return [x, y];
    }

    // Couleur RGB
    static createColor(r: number, g: number, b: number): RGBColor {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            throw new Error("Les valeurs RGB doivent être entre 0 et 255");
        }
        return [r, g, b];
    }

    // Informations utilisateur
    static createUser(name: string, age: number, active: boolean): UserInfo {
        return [name, age, active];
    }

    // Point 3D avec noms
    static createPoint3D(x: number, y: number, z: number): Point3D {
        return [x, y, z];
    }

    // Manipulation de tuples
    static getDistance(point1: Coordinates, point2: Coordinates): number {
        const [x1, y1] = point1;
        const [x2, y2] = point2;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    // Conversion de couleur
    static colorToHex([r, g, b]: RGBColor): string {
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Déstructuration avec rest
    static processNumbers([first, second, ...rest]: NumberPair): { first: number, second: number, sum: number } {
        return {
            first,
            second,
            sum: first + second + rest.reduce((acc, num) => acc + num, 0)
        };
    }
}

// Exemples d'usage
export function demonstrateTuples() {
    console.log("=== DÉMONSTRATION DES TUPLES ===");
    
    // Création de coordonnées
    const home: Coordinates = TupleExamples.createCoordinate(48.8566, 2.3522); // Paris
    const work: Coordinates = TupleExamples.createCoordinate(48.8606, 2.3376); // Louvre
    console.log(`Distance domicile-travail: ${TupleExamples.getDistance(home, work).toFixed(2)} km`);

    // Création de couleurs
    const red: RGBColor = TupleExamples.createColor(255, 0, 0);
    const blue: RGBColor = TupleExamples.createColor(0, 0, 255);
    console.log(`Couleur rouge en hex: ${TupleExamples.colorToHex(red)}`);
    console.log(`Couleur bleue en hex: ${TupleExamples.colorToHex(blue)}`);

    // Informations utilisateur
    const user: UserInfo = TupleExamples.createUser("Alice", 30, true);
    const [name, age, active] = user;
    console.log(`Utilisateur: ${name}, ${age} ans, ${active ? 'actif' : 'inactif'}`);

    // Point 3D
    const point: Point3D = TupleExamples.createPoint3D(10, 20, 30);
    console.log(`Point 3D: x=${point[0]}, y=${point[1]}, z=${point[2]}`);

    // Traitement de nombres
    const numbers: NumberPair = [10, 20, 30, 40, 50];
    const result = TupleExamples.processNumbers(numbers);
    console.log(`Résultat: ${JSON.stringify(result)}`);
}
