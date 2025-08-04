/**
 * PROJET COMPLET TYPESCRIPT - TOUS LES CONCEPTS
 * =============================================
 * 
 * Ce fichier importe et démontre tous les concepts TypeScript
 * organisés dans des dossiers séparés pour un apprentissage structuré.
 * 
 * 18 CONCEPTS COUVERTS :
 * 1. Number - Types numériques
 * 2. Function - Types de fonctions  
 * 3. Boolean - Types booléens
 * 4. Enum - Énumérations
 * 5. String - Types chaînes
 * 6. Union - Types union
 * 7. Never - Type never
 * 8. Extends - Héritage
 * 9. Génériques - Types génériques
 * 10. Object - Types objets
 * 11. Alias - Alias de types
 * 12. Objets anonymes
 * 13. Retour de fonction
 * 14. Méthodes Find
 * 15. Types intrinsèques
 * 16. Void et undefined
 * 17. Tableaux
 * 18. Fonctions avec retour
 */

// ✅ IMPORTS DE TOUS LES MODULES
import * as NumberExamples from "./01-number/exemple-number";
import * as FunctionExamples from "./02-function-type/exemple-function";
import * as BooleanExamples from "./03-boolean/exemple-boolean";
import * as EnumExamples from "./04-enum/exemple-enum";
import * as StringExamples from "./05-string/exemple-string";
import * as UnionExamples from "./06-type-union/exemple-union";
import * as NeverExamples from "./07-type-never/exemple-never";
import * as ExtendsExamples from "./08-extends/exemple-extends";
import * as GenericExamples from "./09-fonction-generique/exemple-generique";
import * as ObjectExamples from "./10-type-object/exemple-object";
import * as AliasExamples from "./11-alias-type-personnalise/exemple-alias";
import * as AnonymousExamples from "./12-type-objet-anonyme/exemple-objet-anonyme";
import * as ReturnExamples from "./13-type-retour-fonction/exemple-retour-fonction";
import * as FindExamples from "./14-find/exemple-find";
import * as IntrinsicExamples from "./15-type-objet-intrinseque/exemple-intrinseque";
import * as VoidUndefinedExamples from "./16-void-undefined/exemple-void-undefined";
import * as ArrayExamples from "./17-tableaux/exemple-tableaux";
import * as FnReturnExamples from "./18-fn-avec-retour/exemple-fn-avec-retour";

// ✅ FONCTIONS UTILITAIRES
function afficherSection(titre: string, numero: number): void {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📚 ${numero}. ${titre.toUpperCase()}`);
    console.log(`${"=".repeat(60)}`);
}

function pauseEntreSections(): void {
    console.log("\n" + "-".repeat(50) + "\n");
}

function mesurer<T>(fn: () => T, nom: string): T {
    const debut = performance.now();
    const resultat = fn();
    const fin = performance.now();
    console.log(`⏱️  ${nom}: ${(fin - debut).toFixed(2)}ms`);
    return resultat;
}

// ✅ FONCTION PRINCIPALE DE DÉMONSTRATION
async function demonstrationComplete(): Promise<void> {
    try {
        console.log("🚀 DÉMARRAGE DE LA DÉMONSTRATION TYPESCRIPT COMPLÈTE");
        console.log("=" .repeat(80));
        console.log("📖 18 concepts TypeScript avec exemples pratiques");
        console.log("🎯 Code organisé pour l'apprentissage progressif");
        console.log("=" .repeat(80));
        
        // 1. Numbers et opérations mathématiques
        afficherSection("Types Number - Mathématiques", 1);
        const calculateur = new NumberExamples.CalculatriceAvancee();
        console.log(`✅ Addition: ${calculateur.additionner(15, 25)}`);
        console.log(`✅ Racine carrée: ${NumberExamples.racineCarree(16)}`);
        console.log(`✅ Nombre aléatoire: ${NumberExamples.genererNombreAleatoire(1, 100)}`);
        console.log(`✅ Formatage devise: ${NumberExamples.formaterDevise(1234.56)}`);
        pauseEntreSections();
        
        // 2. Functions et callbacks
        afficherSection("Types Function - Callbacks", 2);
        FunctionExamples.executerAvecCallback("Tâche importante", () => {
            console.log("✅ Callback exécuté avec succès!");
        });
        
        const multiplierPar3 = FunctionExamples.creerMultiplicateur(3);
        console.log(`✅ 5 × 3 = ${multiplierPar3(5)}`);
        
        const resultatCurry = FunctionExamples.currySomme(10)(20);
        console.log(`✅ Curry somme: ${resultatCurry}`);
        pauseEntreSections();
        
        // 3. Booleans et logique
        afficherSection("Types Boolean - Logique", 3);
        const validateur = new BooleanExamples.ValidateurFormulaire();
        const emailValide = validateur.validerEmail("test@example.com");
        const motPasseValide = validateur.validerMotDePasse("MonMotDePasse123!");
        console.log(`✅ Email valide: ${emailValide}`);
        console.log(`✅ Mot de passe valide: ${motPasseValide}`);
        
        const conditions = BooleanExamples.evaluerConditions([true, false, true]);
        console.log(`✅ Évaluation conditions:`, conditions);
        pauseEntreSections();
        
        // 4. Enums et constantes
        afficherSection("Types Enum - Constantes", 4);
        const produit = EnumExamples.creerProduit("Ordinateur", EnumExamples.CategorieE.ELECTRONIQUE);
        console.log(`✅ Produit créé: ${produit.nom} (${EnumExamples.CategorieE[produit.categorie]})`);
        
        const commande = new EnumExamples.GestionnaireCommandes();
        commande.changerStatut(EnumExamples.StatutCommande.EXPEDIE);
        console.log(`✅ Statut commande: ${EnumExamples.StatutCommande[commande.obtenirStatut()]}`);
        pauseEntreSections();
        
        // 5. Strings et manipulation de texte
        afficherSection("Types String - Manipulation", 5);
        const processeur = new StringExamples.ProcesseurTexte();
        const texte = "Bonjour le monde TypeScript!";
        console.log(`✅ Mots dans "${texte}": ${processeur.compterMots(texte)}`);
        console.log(`✅ Inversé: ${processeur.inverser(texte)}`);
        console.log(`✅ Slug: ${StringExamples.creerSlug("Mon Article Génial!")}`);
        
        const generateur = new StringExamples.GenerateurTexte();
        console.log(`✅ Mot de passe: ${generateur.genererMotDePasse(12)}`);
        pauseEntreSections();
        
        // 6. Union types et flexibilité
        afficherSection("Types Union - Flexibilité", 6);
        console.log(`✅ ID string: ${UnionExamples.formaterId("user123")}`);
        console.log(`✅ ID number: ${UnionExamples.formaterId(456)}`);
        
        const reponseSucces = UnionExamples.traiterReponseAPI({ status: 200, data: { message: "OK" } });
        const reponseErreur = UnionExamples.traiterReponseAPI("Erreur réseau");
        console.log(`✅ Réponse succès: ${reponseSucces}`);
        console.log(`✅ Réponse erreur: ${reponseErreur}`);
        pauseEntreSections();
        
        // 7. Never type (gestion d'erreurs)
        afficherSection("Type Never - Gestion d'erreurs", 7);
        try {
            NeverExamples.traiterValeur("valeur inconnue" as any);
        } catch (error) {
            console.log(`✅ Erreur capturée: ${error}`);
        }
        
        const divisionSecure = NeverExamples.divisionSecurisee(10, 2);
        console.log(`✅ Division sécurisée: ${divisionSecure}`);
        pauseEntreSections();
        
        // 8. Extends et héritage
        afficherSection("Extends - Héritage", 8);
        const chien = new ExtendsExamples.Chien("Rex", 5, "Labrador");
        chien.faireDuBruit(); // Aboie
        chien.faireLeBeau();
        
        const employe = new ExtendsExamples.Employe("Alice", 30, "E001", "Développeuse");
        employe.presenter();
        employe.travailler();
        pauseEntreSections();
        
        // 9. Génériques et réutilisabilité
        afficherSection("Génériques - Réutilisabilité", 9);
        const stockNombres = new GenericExamples.Stock<number>();
        stockNombres.ajouter(1).ajouter(2).ajouter(3);
        console.log(`✅ Stock nombres: [${stockNombres.obtenirTous().join(", ")}]`);
        
        const cacheUtilisateurs = new GenericExamples.Cache<string>();
        cacheUtilisateurs.definir("user1", "Alice");
        cacheUtilisateurs.definir("user2", "Bob");
        console.log(`✅ Cache utilisateur1: ${cacheUtilisateurs.obtenir("user1")}`);
        
        const resultatMap = GenericExamples.mapperTableau([1, 2, 3], x => x * 2);
        console.log(`✅ Tableau mappé: [${resultatMap.join(", ")}]`);
        pauseEntreSections();
        
        // 10. Objects et structures
        afficherSection("Objects - Structures", 10);
        const gestionnaire = new ObjectExamples.GestionnaireUtilisateurs();
        const nouvelUtilisateur = gestionnaire.creerUtilisateur("Charlie", "charlie@test.com", 28);
        console.log(`✅ Utilisateur créé: ${nouvelUtilisateur.nom} (${nouvelUtilisateur.email})`);
        
        const configServeur = ObjectExamples.creerConfigurationServeur({ port: 8080, ssl: true });
        console.log(`✅ Configuration serveur:`, configServeur);
        pauseEntreSections();
        
        // 11. Type aliases
        afficherSection("Type Aliases - Simplification", 11);
        const coordonnees: AliasExamples.Coordonnees = [45.5017, -73.5673]; // Montréal
        console.log(`✅ Coordonnées: ${AliasExamples.formaterCoordonnees(coordonnees)}`);
        
        const filtre: AliasExamples.FiltreNombres = (n) => n > 10;
        const nombres = [5, 15, 8, 20, 3];
        console.log(`✅ Nombres > 10: [${nombres.filter(filtre).join(", ")}]`);
        
        const processeurAsync = new AliasExamples.ProcesseurAsynchrone();
        const resultatAsync = await processeurAsync.traiterDonnees([1, 2, 3, 4, 5]);
        console.log(`✅ Traitement async: ${resultatAsync.succes ? "Réussi" : "Échoué"}`);
        pauseEntreSections();
        
        // 12. Objets anonymes
        afficherSection("Objets Anonymes - Structures ad-hoc", 12);
        const resultatAPI = AnonymousExamples.simulerAppelAPI();
        console.log(`✅ Réponse API:`, resultatAPI);
        
        const evenement = AnonymousExamples.creerEvenement("click", { x: 100, y: 200 });
        console.log(`✅ Événement créé:`, evenement);
        
        const donneesValidees = AnonymousExamples.validerDonnees({
            nom: "Test",
            age: 25,
            actif: true
        });
        console.log(`✅ Validation:`, donneesValidees);
        pauseEntreSections();
        
        // 13. Types de retour de fonction
        afficherSection("Retour de Fonction - Types précis", 13);
        const analyseur = new ReturnExamples.AnalyseurDonnees();
        const statistiques = analyseur.analyserNombres([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        console.log(`✅ Statistiques:`, statistiques);
        
        const validationDonnees = await ReturnExamples.validerDonneesAsync({ 
            email: "test@example.com", 
            age: 25 
        });
        console.log(`✅ Validation async:`, validationDonnees);
        pauseEntreSections();
        
        // 14. Méthodes Find et recherche
        afficherSection("Méthodes Find - Recherche", 14);
        const moteur = new FindExamples.MoteurRecherche();
        const personnes = [
            { nom: "Alice", age: 25, ville: "Paris" },
            { nom: "Bob", age: 30, ville: "Lyon" },
            { nom: "Charlie", age: 35, ville: "Paris" }
        ];
        
        moteur.ajouterDonnees(personnes);
        const resultats = moteur.rechercher({ ville: "Paris" });
        console.log(`✅ Personnes à Paris: ${resultats.map(p => p.nom).join(", ")}`);
        
        const index = new FindExamples.IndexRecherche();
        index.ajouter("doc1", "TypeScript est formidable");
        index.ajouter("doc2", "JavaScript et TypeScript");
        const docs = index.rechercher("TypeScript");
        console.log(`✅ Documents trouvés: [${docs.join(", ")}]`);
        pauseEntreSections();
        
        // 15. Types intrinsèques
        afficherSection("Types Intrinsèques - Built-in", 15);
        const utilitaires = new IntrinsicExamples.UtilitairesIntrinseques();
        
        const tableauTest = [1, 2, 3, 4, 5];
        console.log(`✅ Somme du tableau [${tableauTest.join(", ")}]: ${utilitaires.calculerSomme(tableauTest)}`);
        
        const dateFormatee = utilitaires.formaterDate(new Date());
        console.log(`✅ Date actuelle formatée: ${dateFormatee}`);
        
        const promiseChainee = await utilitaires.chainerPromises([
            () => Promise.resolve("Étape 1"),
            () => Promise.resolve("Étape 2"),
            () => Promise.resolve("Étape 3")
        ]);
        console.log(`✅ Promesses chaînées:`, promiseChainee);
        pauseEntreSections();
        
        // 16. Void et undefined
        afficherSection("Void et Undefined - Absence de valeur", 16);
        VoidUndefinedExamples.afficherMessage("Démonstration void et undefined");
        
        const valeurOptionnelle = VoidUndefinedExamples.obtenirValeurOptionnelle(Math.random() > 0.5);
        console.log(`✅ Valeur optionnelle: ${valeurOptionnelle || "undefined"}`);
        
        const logger = new VoidUndefinedExamples.Logger();
        logger.log("Message de test");
        const dernierLog = logger.obtenirDernierLog();
        console.log(`✅ Dernier log: ${dernierLog || "Aucun"}`);
        
        await VoidUndefinedExamples.operationAsynchrone();
        pauseEntreSections();
        
        // 17. Tableaux et collections
        afficherSection("Tableaux - Collections", 17);
        const tableauPersonnes = new ArrayExamples.TableauType(personnes);
        console.log(`✅ Taille du tableau: ${tableauPersonnes.taille()}`);
        
        const sommeDemonstration = ArrayExamples.obtenirSomme([1, 2, 3, 4, 5]);
        console.log(`✅ Somme [1,2,3,4,5]: ${sommeDemonstration}`);
        
        const sansDoublons = ArrayExamples.eliminerDoublons([1, 2, 2, 3, 3, 4]);
        console.log(`✅ Sans doublons: [${sansDoublons.join(", ")}]`);
        
        const matrice = ArrayExamples.creerMatrice2D(3, 3, 1);
        console.log(`✅ Matrice 3x3 créée`);
        pauseEntreSections();
        
        // 18. Fonctions avec valeurs de retour
        afficherSection("Fonctions avec Retour - Types précis", 18);
        const calculatriceAvancee = new FnReturnExamples.CalculatriceAvancee();
        calculatriceAvancee.additionner(10, 5);
        calculatriceAvancee.additionner(20, 15);
        
        const stats = calculatriceAvancee.obtenirStatistiques();
        console.log(`✅ Statistiques calculatrice: ${stats.nombreOperations} opérations`);
        
        const divisionFonction = calculatriceAvancee.diviserSecure(15, 3);
        console.log(`✅ Division sécurisée: ${divisionFonction.succes ? divisionFonction.resultat : divisionFonction.erreur}`);
        
        const transformation = FnReturnExamples.transformer("hello", (s: string) => s.toUpperCase());
        console.log(`✅ Transformation: ${transformation}`);
        
        const utilisateurAsync = await FnReturnExamples.obtenirDonneesUtilisateur(123);
        console.log(`✅ Utilisateur async: ${utilisateurAsync?.nom || "Non trouvé"}`);
        pauseEntreSections();

        // Résumé final
        afficherSection("Résumé Final - Maîtrise TypeScript", 19);
        console.log("🎉 Tous les 18 concepts TypeScript ont été démontrés avec succès !");
        console.log("");
        console.log("📋 Concepts maîtrisés:");
        console.log("   ✅ 1. Number - Types numériques et mathématiques");
        console.log("   ✅ 2. Function - Types de fonctions et callbacks");
        console.log("   ✅ 3. Boolean - Types booléens et logique");
        console.log("   ✅ 4. Enum - Énumérations et constantes");
        console.log("   ✅ 5. String - Types chaînes et manipulation");
        console.log("   ✅ 6. Union - Types union et discrimination");
        console.log("   ✅ 7. Never - Type never et gestion d'erreurs");
        console.log("   ✅ 8. Extends - Héritage et extension de classes");
        console.log("   ✅ 9. Génériques - Types et fonctions génériques");
        console.log("   ✅ 10. Object - Types objets et structures");
        console.log("   ✅ 11. Alias - Alias de types pour simplification");
        console.log("   ✅ 12. Objets anonymes - Structures ad-hoc");
        console.log("   ✅ 13. Retour fonction - Types de retour précis");
        console.log("   ✅ 14. Find - Méthodes de recherche");
        console.log("   ✅ 15. Intrinsèques - Types built-in JavaScript");
        console.log("   ✅ 16. Void/undefined - Absence de valeur");
        console.log("   ✅ 17. Tableaux - Collections et matrices");
        console.log("   ✅ 18. Fonctions retour - Patterns avancés");
        console.log("");
        console.log("🚀 Vous maîtrisez maintenant tous les fondamentaux de TypeScript !");
        console.log("📚 Chaque concept dispose d'exemples détaillés dans son dossier");
        console.log("🔧 Code prêt pour l'apprentissage et la production");

    } catch (error) {
        console.error("❌ Erreur lors de la démonstration:", error);
    }
}

// ✅ FONCTION DE TEST DE PERFORMANCE
function testerPerformances(): void {
    console.log("\n⚡ TESTS DE PERFORMANCE");
    console.log("=".repeat(50));
    
    // Test de performance des génériques
    mesurer(() => {
        const cache = new GenericExamples.Cache<string>();
        for (let i = 0; i < 1000; i++) {
            cache.definir(`key${i}`, `value${i}`);
        }
        return cache;
    }, "Cache générique (1000 éléments)");
    
    // Test de performance des tableaux
    mesurer(() => {
        let tableau = ArrayExamples.creerTableau(1000);
        tableau = ArrayExamples.trierNombres(tableau);
        return ArrayExamples.obtenirSomme(tableau);
    }, "Opérations tableau (1000 éléments)");
    
    // Test de mémorisation
    mesurer(() => {
        return FnReturnExamples.fibonacciMemorise(30);
    }, "Fibonacci mémorisé (n=30)");
    
    // Test de validation
    mesurer(() => {
        const personnes = Array.from({ length: 1000 }, (_, i) => 
            ({ nom: `Personne${i}`, age: 20 + (i % 50), email: `p${i}@test.com` })
        );
        const validateur = new BooleanExamples.ValidateurFormulaire();
        return personnes.every(p => validateur.validerEmail(p.email));
    }, "Validation emails (1000 personnes)");
}

// ✅ FONCTION DE DÉMONSTRATION DES ERREURS
function demonstrationGestionErreurs(): void {
    console.log("\n🚨 DÉMONSTRATION GESTION D'ERREURS");
    console.log("=".repeat(50));
    
    // Test avec Never type
    try {
        NeverExamples.gererErreur(new Error("Erreur de test"));
    } catch (error) {
        console.log(`✅ Erreur gérée par Never: ${error}`);
    }
    
    // Test avec résultat sécurisé
    const resultatSecure = FnReturnExamples.executerAvecGestionErreur(() => {
        if (Math.random() > 0.5) {
            throw new Error("Erreur aléatoire");
        }
        return "Succès!";
    });
    
    console.log(`✅ Exécution sécurisée: ${resultatSecure.succes ? resultatSecure.resultat : resultatSecure.erreur}`);
    
    // Test validation avec void/undefined
    const validation = VoidUndefinedExamples.validerTableau([1, 2, 3, 4, 5], (n) => n > 0);
    console.log(`✅ Validation tableau: ${validation.valide ? "✅ Valide" : "❌ Invalide"}`);
    
    // Test union types avec erreur
    const reponseErreur = UnionExamples.traiterReponseAPI("Erreur serveur");
    console.log(`✅ Gestion erreur API: ${reponseErreur}`);
}

// ✅ EXÉCUTION PRINCIPALE
async function main(): Promise<void> {
    try {
        await demonstrationComplete();
        testerPerformances();
        demonstrationGestionErreurs();
        
        console.log("\n" + "=".repeat(80));
        console.log("🎉 PROJET TYPESCRIPT COMPLET - TOUS LES CONCEPTS MAÎTRISÉS");
        console.log("📚 18 concepts démontrés avec des exemples pratiques");
        console.log("🔧 Code prêt pour l'apprentissage et la production");
        console.log("⚡ Tests de performance inclus");
        console.log("🚨 Gestion d'erreurs démontrée");
        console.log("📁 Structure organisée en dossiers thématiques");
        console.log("=" .repeat(80));
        
    } catch (error) {
        console.error("❌ Erreur fatale:", error);
    }
}

// Exécution automatique si fichier principal
if (require.main === module) {
    main().catch(console.error);
}

// ✅ EXPORTS POUR UTILISATION COMME MODULE
export {
    main,
    demonstrationComplete,
    testerPerformances,
    demonstrationGestionErreurs,
    mesurer,
    // Tous les modules pour réutilisation
    NumberExamples,
    FunctionExamples,
    BooleanExamples,
    EnumExamples,
    StringExamples,
    UnionExamples,
    NeverExamples,
    ExtendsExamples,
    GenericExamples,
    ObjectExamples,
    AliasExamples,
    AnonymousExamples,
    ReturnExamples,
    FindExamples,
    IntrinsicExamples,
    VoidUndefinedExamples,
    ArrayExamples,
    FnReturnExamples
};
