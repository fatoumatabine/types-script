// 9. TYPE FONCTION
// ================

// Types de fonction basiques
type FonctionSimple = () => void;
type FonctionAvecParametres = (a: number, b: number) => number;
type FonctionAvecRetour = (nom: string) => string;

// Type fonction avec paramètres optionnels
type FonctionParametresOptionnels = (nom: string, age?: number) => string;

// Type fonction avec paramètres par défaut
type FonctionParametresDefaut = (message: string, niveau?: 'info' | 'warn' | 'error') => void;

// Type fonction avec rest parameters
type FonctionRest = (premier: number, ...autres: number[]) => number;

// Type fonction générique
type FonctionGenerique<T> = (valeur: T) => T;
type FonctionMap<T, U> = (valeur: T) => U;

// Type fonction avec callback
type FonctionAvecCallback<T> = (
  donnees: T[],
  callback: (element: T) => boolean
) => T[];

// Type fonction asynchrone
type FonctionAsync<T> = (id: number) => Promise<T>;

// Type fonction avec surcharges
interface FonctionSurchargee {
  (valeur: number): string;
  (valeur: string): number;
  (valeur: boolean): boolean;
}

// Interface pour définir un objet avec des méthodes
interface CalculatriceInterface {
  additionner: (a: number, b: number) => number;
  soustraire: (a: number, b: number) => number;
  multiplier: (a: number, b: number) => number;
  diviser: (a: number, b: number) => number;
}

// Type fonction pour événements
type GestionnaireEvenement<T> = (evenement: T) => void;
type EvenementSouris = { x: number; y: number; bouton: 'gauche' | 'droit' };
type EvenementClavier = { touche: string; modifieurs: string[] };

// Type fonction factory
type Factory<T> = (...args: any[]) => T;
type UtilisateurFactory = Factory<{ id: number; nom: string; email: string }>;

// Type fonction middleware
type Middleware<T, U> = (entree: T, suivant: (valeur: T) => U) => U;

// Type fonction pour validation
type Validateur<T> = (valeur: T) => { valide: boolean; erreurs: string[] };

// Type fonction pour transformation
type Transformateur<T, U> = {
  transformer: (valeur: T) => U;
  inverser: (valeur: U) => T;
};

// Implémentations d'exemples
const saluer: FonctionAvecRetour = (nom: string): string => {
  return `Bonjour, ${nom}!`;
};

const additionner: FonctionAvecParametres = (a: number, b: number): number => {
  return a + b;
};

const creerMessage: FonctionParametresOptionnels = (nom: string, age?: number): string => {
  return age ? `${nom} a ${age} ans` : `Bonjour ${nom}`;
};

const logger: FonctionParametresDefaut = (message: string, niveau = 'info'): void => {
  console.log(`[${niveau.toUpperCase()}] ${message}`);
};

const calculerSomme: FonctionRest = (premier: number, ...autres: number[]): number => {
  return premier + autres.reduce((acc, val) => acc + val, 0);
};

const identite: FonctionGenerique<any> = <T>(valeur: T): T => {
  return valeur;
};

const mapperVersString: FonctionMap<number, string> = (valeur: number): string => {
  return `Valeur: ${valeur}`;
};

const filtrer: FonctionAvecCallback<any> = <T>(
  donnees: T[],
  callback: (element: T) => boolean
): T[] => {
  return donnees.filter(callback);
};

const obtenirUtilisateurAsync: FonctionAsync<{ id: number; nom: string }> = async (
  id: number
): Promise<{ id: number; nom: string }> => {
  // Simulation d'un appel API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nom: `Utilisateur ${id}` });
    }, 1000);
  });
};

// Implémentation de fonction surchargée
const convertir: FonctionSurchargee = (valeur: any): any => {
  if (typeof valeur === 'number') {
    return valeur.toString();
  }
  if (typeof valeur === 'string') {
    return parseInt(valeur, 10) || 0;
  }
  if (typeof valeur === 'boolean') {
    return valeur;
  }
  throw new Error('Type non supporté');
};

// Implémentation de calculatrice
const calculatrice: CalculatriceInterface = {
  additionner: (a, b) => a + b,
  soustraire: (a, b) => a - b,
  multiplier: (a, b) => a * b,
  diviser: (a, b) => {
    if (b === 0) throw new Error('Division par zéro');
    return a / b;
  }
};

// Gestionnaires d'événements
const gererClicSouris: GestionnaireEvenement<EvenementSouris> = (evenement) => {
  console.log(`Clic ${evenement.bouton} à la position (${evenement.x}, ${evenement.y})`);
};

const gererToucheClavier: GestionnaireEvenement<EvenementClavier> = (evenement) => {
  console.log(`Touche pressée: ${evenement.touche} avec modificateurs: ${evenement.modifieurs.join(', ')}`);
};

// Factory function
const creerUtilisateur: UtilisateurFactory = (nom: string, email: string) => {
  return {
    id: Math.floor(Math.random() * 1000),
    nom,
    email
  };
};

// Middleware example
const middlewareLogging: Middleware<string, string> = (entree, suivant) => {
  console.log(`Avant traitement: ${entree}`);
  const resultat = suivant(entree);
  console.log(`Après traitement: ${resultat}`);
  return resultat;
};

// Validateur
const validateurEmail: Validateur<string> = (email) => {
  const erreurs: string[] = [];
  if (!email) {
    erreurs.push('Email requis');
  } else if (!email.includes('@')) {
    erreurs.push('Format email invalide');
  }
  return {
    valide: erreurs.length === 0,
    erreurs
  };
};

// Transformateur
const transformateurNombreString: Transformateur<number, string> = {
  transformer: (nombre) => `Nombre: ${nombre}`,
  inverser: (texte) => {
    const match = texte.match(/Nombre: (\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
};

// Fonctions d'ordre supérieur
type FonctionOrdreSuperier = <T, U>(
  fn: (valeur: T) => U
) => (valeur: T) => U;

const memoiser: FonctionOrdreSuperier = <T, U>(fn: (valeur: T) => U) => {
  const cache = new Map<T, U>();
  return (valeur: T): U => {
    if (cache.has(valeur)) {
      return cache.get(valeur)!;
    }
    const resultat = fn(valeur);
    cache.set(valeur, resultat);
    return resultat;
  };
};

// Exemples d'utilisation
console.log("Types de fonction:");

console.log(saluer("Jean"));
console.log(additionner(5, 3));
console.log(creerMessage("Marie", 30));
console.log(creerMessage("Paul"));

logger("Message d'information");
logger("Message d'erreur", "error");

console.log(calculerSomme(1, 2, 3, 4, 5));

console.log(identite("Hello"));
console.log(identite(42));

console.log(mapperVersString(123));

const nombres = [1, 2, 3, 4, 5];
const nombresPairs = filtrer(nombres, (n) => n % 2 === 0);
console.log("Nombres pairs:", nombresPairs);

// Test des surcharges
console.log(convertir(42));     // "42"
console.log(convertir("123"));  // 123
console.log(convertir(true));   // true

// Utilisation de la calculatrice
console.log("Calculatrice:", {
  addition: calculatrice.additionner(10, 5),
  soustraction: calculatrice.soustraire(10, 5),
  multiplication: calculatrice.multiplier(10, 5),
  division: calculatrice.diviser(10, 5)
});

// Test événements
gererClicSouris({ x: 100, y: 200, bouton: 'gauche' });
gererToucheClavier({ touche: 'Enter', modifieurs: ['Ctrl', 'Shift'] });

// Test factory
const utilisateur = creerUtilisateur("Jean Dupont", "jean@example.com");
console.log("Utilisateur créé:", utilisateur);

// Test middleware
const traiterTexte = (texte: string) => texte.toUpperCase();
const resultatMiddleware = middlewareLogging("hello world", traiterTexte);

// Test validateur
const validationEmail = validateurEmail("test@example.com");
const validationErreur = validateurEmail("email-invalide");
console.log("Validations:", { validationEmail, validationErreur });

// Test transformateur
const texteTransforme = transformateurNombreString.transformer(42);
const nombreInverse = transformateurNombreString.inverser(texteTransforme);
console.log("Transformateur:", { texteTransforme, nombreInverse });

// Test mémoisation
const fonctionCouteuse = (n: number) => {
  console.log(`Calcul coûteux pour ${n}`);
  return n * n;
};
const fonctionMemorisee = memoiser(fonctionCouteuse);
console.log(fonctionMemorisee(5)); // Calcul
console.log(fonctionMemorisee(5)); // Cache

export {
  FonctionSimple,
  FonctionAvecParametres,
  FonctionAvecRetour,
  FonctionParametresOptionnels,
  FonctionRest,
  FonctionGenerique,
  FonctionAvecCallback,
  FonctionAsync,
  FonctionSurchargee,
  CalculatriceInterface,
  GestionnaireEvenement,
  Middleware,
  Validateur,
  Transformateur,
  calculatrice,
  memoiser
};
