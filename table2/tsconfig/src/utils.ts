/**
 * Utilitaires pour l'application
 */

/**
 * Salue une personne avec un message personnalisé
 * @param name - Le nom de la personne à saluer
 * @returns Message de salutation
 */
export function greet(name: string): string {
    return `Bonjour, ${name}! Bienvenue dans votre application TypeScript.`;
}

/**
 * Calcule la somme d'un tableau de nombres
 * @param numbers - Tableau de nombres à additionner
 * @returns La somme totale
 */
export function calculateSum(numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Vérifie si un nombre est pair
 * @param num - Le nombre à vérifier
 * @returns true si le nombre est pair, false sinon
 */
export function isEven(num: number): boolean {
    return num % 2 === 0;
}

/**
 * Formate une date en string lisible
 * @param date - La date à formater
 * @returns String formatée de la date
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
