// 1. INTERFACES ET TYPES
// =====================

// Interface - définit la structure d'un objet
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  age?: number; // propriété optionnelle
}

// Type alias - alternative aux interfaces
type Produit = {
  id: number;
  nom: string;
  prix: number;
  description?: string;
};

// Type littéral
type Statut = "actif" | "inactif" | "en_attente";

// Exemple d'utilisation
const utilisateur1: Utilisateur = {
  id: 1,
  nom: "Jean Dupont",
  email: "jean@example.com",
  age: 30
};

const produit1: Produit = {
  id: 1,
  nom: "Ordinateur portable",
  prix: 999.99
};

const statut: Statut = "actif";

export { Utilisateur, Produit, Statut, utilisateur1, produit1, statut };
