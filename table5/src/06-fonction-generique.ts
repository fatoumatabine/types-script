// 6. FONCTION GÉNÉRIQUE
// =====================

// Fonction générique simple
function identite<T>(valeur: T): T {
  return valeur;
}

// Fonction générique avec contraintes
function cloner<T extends object>(objet: T): T {
  return { ...objet };
}

// Fonction générique avec plusieurs paramètres de type
function echanger<T, U>(premier: T, second: U): [U, T] {
  return [second, premier];
}

// Fonction générique avec contraintes plus complexes
interface AvecLongueur {
  length: number;
}

function obtenirLongueur<T extends AvecLongueur>(element: T): number {
  return element.length;
}

// Fonction générique avec contraintes de clé
function obtenirPropriete<T, K extends keyof T>(objet: T, cle: K): T[K] {
  return objet[cle];
}

// Fonction générique avec valeur par défaut
function creerTableau<T = string>(longueur: number, valeurParDefaut: T): T[] {
  return Array(longueur).fill(valeurParDefaut);
}

// Fonction générique pour mapper un tableau
function mapper<T, U>(tableau: T[], transformateur: (element: T) => U): U[] {
  return tableau.map(transformateur);
}

// Fonction générique pour filtrer
function filtrer<T>(tableau: T[], predicat: (element: T) => boolean): T[] {
  return tableau.filter(predicat);
}

// Fonction générique avec garde de type
function estDefini<T>(valeur: T | null | undefined): valeur is T {
  return valeur !== null && valeur !== undefined;
}

// Fonction générique récursive
function aplatir<T>(tableau: (T | T[])[]): T[] {
  const resultat: T[] = [];
  for (const element of tableau) {
    if (Array.isArray(element)) {
      resultat.push(...aplatir(element));
    } else {
      resultat.push(element);
    }
  }
  return resultat;
}

// Exemples d'utilisation
console.log("Fonctions génériques:");

// Identité
const nombre = identite(42);
const texte = identite("Hello");
const objet = identite({ nom: "Test" });

// Cloner
const original = { nom: "Jean", age: 30 };
const copie = cloner(original);

// Échanger
const [b, a] = echanger("hello", 42);

// Longueur
const longueurTexte = obtenirLongueur("Hello World");
const longueurTableau = obtenirLongueur([1, 2, 3, 4, 5]);

// Propriété
const personne = { nom: "Marie", age: 25, ville: "Paris" };
const nom = obtenirPropriete(personne, "nom");
const age = obtenirPropriete(personne, "age");

// Créer tableau
const tableauNombres = creerTableau(5, 0);
const tableauTextes = creerTableau(3, "default");

// Mapper
const nombres = [1, 2, 3, 4, 5];
const carres = mapper(nombres, x => x * x);
const textes = mapper(nombres, x => `Nombre: ${x}`);

// Filtrer
const nombresPairs = filtrer(nombres, x => x % 2 === 0);

// Test de définition
const valeurs = [1, null, 2, undefined, 3];
const valeursdefinies = valeurs.filter(estDefini);

// Aplatir
const tableauNeste = [1, [2, 3], [4, [5, 6]]];
const tableauAplati = aplatir(tableauNeste);

console.log({
  nombre, texte, objet,
  original, copie,
  a, b,
  longueurTexte, longueurTableau,
  nom, age,
  tableauNombres, tableauTextes,
  carres, textes,
  nombresPairs,
  valeursdefinies,
  tableauAplati
});

export {
  identite,
  cloner,
  echanger,
  obtenirLongueur,
  obtenirPropriete,
  creerTableau,
  mapper,
  filtrer,
  estDefini,
  aplatir
};
