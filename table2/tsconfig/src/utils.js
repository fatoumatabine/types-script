"use strict";
/**
 * Utilitaires pour l'application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
exports.calculateSum = calculateSum;
exports.isEven = isEven;
exports.formatDate = formatDate;
/**
 * Salue une personne avec un message personnalisé
 * @param name - Le nom de la personne à saluer
 * @returns Message de salutation
 */
function greet(name) {
    return `Bonjour, ${name}! Bienvenue dans votre application TypeScript.`;
}
/**
 * Calcule la somme d'un tableau de nombres
 * @param numbers - Tableau de nombres à additionner
 * @returns La somme totale
 */
function calculateSum(numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
/**
 * Vérifie si un nombre est pair
 * @param num - Le nombre à vérifier
 * @returns true si le nombre est pair, false sinon
 */
function isEven(num) {
    return num % 2 === 0;
}
/**
 * Formate une date en string lisible
 * @param date - La date à formater
 * @returns String formatée de la date
 */
function formatDate(date) {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
