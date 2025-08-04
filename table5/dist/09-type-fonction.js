"use strict";
// 9. TYPE FONCTION
// ================
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoiser = exports.calculatrice = void 0;
// Implémentations d'exemples
const saluer = (nom) => {
    return `Bonjour, ${nom}!`;
};
const additionner = (a, b) => {
    return a + b;
};
const creerMessage = (nom, age) => {
    return age ? `${nom} a ${age} ans` : `Bonjour ${nom}`;
};
const logger = (message, niveau = 'info') => {
    console.log(`[${niveau.toUpperCase()}] ${message}`);
};
const calculerSomme = (premier, ...autres) => {
    return premier + autres.reduce((acc, val) => acc + val, 0);
};
const identite = (valeur) => {
    return valeur;
};
const mapperVersString = (valeur) => {
    return `Valeur: ${valeur}`;
};
const filtrer = (donnees, callback) => {
    return donnees.filter(callback);
};
const obtenirUtilisateurAsync = async (id) => {
    // Simulation d'un appel API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, nom: `Utilisateur ${id}` });
        }, 1000);
    });
};
// Implémentation de fonction surchargée
const convertir = (valeur) => {
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
const calculatrice = {
    additionner: (a, b) => a + b,
    soustraire: (a, b) => a - b,
    multiplier: (a, b) => a * b,
    diviser: (a, b) => {
        if (b === 0)
            throw new Error('Division par zéro');
        return a / b;
    }
};
exports.calculatrice = calculatrice;
// Gestionnaires d'événements
const gererClicSouris = (evenement) => {
    console.log(`Clic ${evenement.bouton} à la position (${evenement.x}, ${evenement.y})`);
};
const gererToucheClavier = (evenement) => {
    console.log(`Touche pressée: ${evenement.touche} avec modificateurs: ${evenement.modifieurs.join(', ')}`);
};
// Factory function
const creerUtilisateur = (nom, email) => {
    return {
        id: Math.floor(Math.random() * 1000),
        nom,
        email
    };
};
// Middleware example
const middlewareLogging = (entree, suivant) => {
    console.log(`Avant traitement: ${entree}`);
    const resultat = suivant(entree);
    console.log(`Après traitement: ${resultat}`);
    return resultat;
};
// Validateur
const validateurEmail = (email) => {
    const erreurs = [];
    if (!email) {
        erreurs.push('Email requis');
    }
    else if (!email.includes('@')) {
        erreurs.push('Format email invalide');
    }
    return {
        valide: erreurs.length === 0,
        erreurs
    };
};
// Transformateur
const transformateurNombreString = {
    transformer: (nombre) => `Nombre: ${nombre}`,
    inverser: (texte) => {
        const match = texte.match(/Nombre: (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
};
const memoiser = (fn) => {
    const cache = new Map();
    return (valeur) => {
        if (cache.has(valeur)) {
            return cache.get(valeur);
        }
        const resultat = fn(valeur);
        cache.set(valeur, resultat);
        return resultat;
    };
};
exports.memoiser = memoiser;
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
console.log(convertir(42)); // "42"
console.log(convertir("123")); // 123
console.log(convertir(true)); // true
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
const traiterTexte = (texte) => texte.toUpperCase();
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
const fonctionCouteuse = (n) => {
    console.log(`Calcul coûteux pour ${n}`);
    return n * n;
};
const fonctionMemorisee = memoiser(fonctionCouteuse);
console.log(fonctionMemorisee(5)); // Calcul
console.log(fonctionMemorisee(5)); // Cache
//# sourceMappingURL=09-type-fonction.js.map