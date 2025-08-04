// 3. UNION DE TYPES
// =================

// Union simple - peut être l'un ou l'autre type
type StringOuNumber = string | number;

// Union d'objets
type Vehicule = 
  | { type: "voiture"; marque: string; nbPortes: number }
  | { type: "moto"; marque: string; cylindree: number }
  | { type: "velo"; marque: string; vitesses: number };

// Union avec null et undefined
type ResultatAPI = {
  donnees: any;
  erreur: null;
} | {
  donnees: null;
  erreur: string;
};

// Type discriminé (Discriminated Union)
interface Carre {
  kind: "carre";
  taille: number;
}

interface Rectangle {
  kind: "rectangle";
  largeur: number;
  hauteur: number;
}

interface Cercle {
  kind: "cercle";
  rayon: number;
}

type Forme = Carre | Rectangle | Cercle;

// Fonction qui utilise les types union
function calculerAire(forme: Forme): number {
  switch (forme.kind) {
    case "carre":
      return forme.taille * forme.taille;
    case "rectangle":
      return forme.largeur * forme.hauteur;
    case "cercle":
      return Math.PI * forme.rayon * forme.rayon;
    default:
      // TypeScript s'assure que tous les cas sont couverts
      const _exhaustive: never = forme;
      return _exhaustive;
  }
}

// Exemples d'utilisation
const valeur: StringOuNumber = "Hello"; // ou 42

const voiture: Vehicule = {
  type: "voiture",
  marque: "Peugeot",
  nbPortes: 4
};

const succes: ResultatAPI = {
  donnees: { nom: "Test" },
  erreur: null
};

const carre: Forme = { kind: "carre", taille: 5 };
const aire = calculerAire(carre);

console.log("Union de types:", { valeur, voiture, succes, aire });

export { StringOuNumber, Vehicule, ResultatAPI, Forme, calculerAire };
