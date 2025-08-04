/**
 * Exemple : Fonctions asynchrones et Promises
 * Montre comment travailler avec du code asynchrone en TypeScript
 */

// Interface pour les données utilisateur
export interface UtilisateurAPI {
    id: number;
    nom: string;
    email: string;
    actif: boolean;
}

// Simulation d'une API avec des promises
export class ServiceUtilisateur {
    private utilisateurs: UtilisateurAPI[] = [
        { id: 1, nom: "Alice", email: "alice@test.com", actif: true },
        { id: 2, nom: "Bob", email: "bob@test.com", actif: false },
        { id: 3, nom: "Charlie", email: "charlie@test.com", actif: true }
    ];

    // Méthode asynchrone avec Promise
    async obtenirUtilisateur(id: number): Promise<UtilisateurAPI | null> {
        // Simulation d'un délai réseau
        await this.delai(500);
        
        const utilisateur = this.utilisateurs.find(u => u.id === id);
        return utilisateur || null;
    }

    // Méthode avec gestion d'erreurs
    async obtenirTousLesUtilisateurs(): Promise<UtilisateurAPI[]> {
        try {
            await this.delai(300);
            
            // Simulation d'une erreur aléatoire
            if (Math.random() < 0.1) {
                throw new Error("Erreur de connexion à la base de données");
            }
            
            return [...this.utilisateurs];
        } catch (error) {
            console.error("Erreur lors de la récupération:", error);
            throw error;
        }
    }

    // Méthode pour créer un utilisateur
    async creerUtilisateur(donnees: Omit<UtilisateurAPI, 'id'>): Promise<UtilisateurAPI> {
        await this.delai(800);
        
        const nouvelUtilisateur: UtilisateurAPI = {
            id: this.utilisateurs.length + 1,
            ...donnees
        };
        
        this.utilisateurs.push(nouvelUtilisateur);
        return nouvelUtilisateur;
    }

    // Méthode pour filtrer les utilisateurs actifs
    async obtenirUtilisateursActifs(): Promise<UtilisateurAPI[]> {
        const tousLesUtilisateurs = await this.obtenirTousLesUtilisateurs();
        return tousLesUtilisateurs.filter(u => u.actif);
    }

    // Utilitaire pour simuler un délai
    private delai(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Fonctions utilitaires asynchrones
export async function traiterUtilisateursEnParallele(
    service: ServiceUtilisateur,
    ids: number[]
): Promise<(UtilisateurAPI | null)[]> {
    // Promise.all pour exécuter en parallèle
    const promises = ids.map(id => service.obtenirUtilisateur(id));
    return Promise.all(promises);
}

export async function traiterUtilisateursEnSequence(
    service: ServiceUtilisateur,
    ids: number[]
): Promise<(UtilisateurAPI | null)[]> {
    const resultats: (UtilisateurAPI | null)[] = [];
    
    // Traitement séquentiel avec for...of
    for (const id of ids) {
        const utilisateur = await service.obtenirUtilisateur(id);
        resultats.push(utilisateur);
    }
    
    return resultats;
}

// Générateur asynchrone
export async function* genererUtilisateurs(service: ServiceUtilisateur) {
    const utilisateurs = await service.obtenirTousLesUtilisateurs();
    
    for (const utilisateur of utilisateurs) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Délai entre chaque
        yield utilisateur;
    }
}

// Exemple d'utilisation
export async function exempleAsynchrone() {
    console.log("=== Exemple Code Asynchrone ===");
    
    const service = new ServiceUtilisateur();
    
    try {
        // 1. Récupération d'un utilisateur
        console.log("1. Récupération d'un utilisateur...");
        const utilisateur = await service.obtenirUtilisateur(1);
        console.log("Utilisateur trouvé:", utilisateur);
        
        // 2. Création d'un nouvel utilisateur
        console.log("\n2. Création d'un utilisateur...");
        const nouvelUtilisateur = await service.creerUtilisateur({
            nom: "David",
            email: "david@test.com",
            actif: true
        });
        console.log("Utilisateur créé:", nouvelUtilisateur);
        
        // 3. Traitement en parallèle
        console.log("\n3. Traitement en parallèle...");
        const debut = Date.now();
        const utilisateursParallele = await traiterUtilisateursEnParallele(service, [1, 2, 3]);
        const tempsParallele = Date.now() - debut;
        console.log(`Parallèle (${tempsParallele}ms):`, utilisateursParallele.map(u => u?.nom));
        
        // 4. Traitement séquentiel
        console.log("\n4. Traitement séquentiel...");
        const debutSeq = Date.now();
        const utilisateursSequence = await traiterUtilisateursEnSequence(service, [1, 2, 3]);
        const tempsSequence = Date.now() - debutSeq;
        console.log(`Séquentiel (${tempsSequence}ms):`, utilisateursSequence.map(u => u?.nom));
        
        // 5. Utilisateurs actifs
        console.log("\n5. Utilisateurs actifs...");
        const utilisateursActifs = await service.obtenirUtilisateursActifs();
        console.log("Utilisateurs actifs:", utilisateursActifs);
        
        // 6. Générateur asynchrone
        console.log("\n6. Générateur asynchrone...");
        console.log("Streaming des utilisateurs:");
        for await (const utilisateur of genererUtilisateurs(service)) {
            console.log(`  -> ${utilisateur.nom}`);
        }
        
    } catch (error) {
        console.error("Erreur dans l'exemple asynchrone:", error);
    }
}
