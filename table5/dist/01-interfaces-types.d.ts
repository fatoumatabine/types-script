interface Utilisateur {
    id: number;
    nom: string;
    email: string;
    age?: number;
}
type Produit = {
    id: number;
    nom: string;
    prix: number;
    description?: string;
};
type Statut = "actif" | "inactif" | "en_attente";
declare const utilisateur1: Utilisateur;
declare const produit1: Produit;
declare const statut: Statut;
export { Utilisateur, Produit, Statut, utilisateur1, produit1, statut };
//# sourceMappingURL=01-interfaces-types.d.ts.map