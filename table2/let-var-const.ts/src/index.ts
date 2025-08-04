// ===== VAR, LET ET CONST EN TYPESCRIPT =====
// Guide complet des déclarations de variables et leur portée

console.log('=== DÉCLARATIONS DE VARIABLES EN TYPESCRIPT ===');

console.log('\n=== VAR - PORTÉE FONCTIONNELLE ===');

// 1. Comportement de var (portée fonctionnelle)
function demonstrateVar() {
    console.log('--- Démonstration de var ---');
    
    if (true) {
        var varVariable = "Je suis une variable var";
        console.log('Dans le bloc if:', varVariable);
    }
    
    // var est accessible en dehors du bloc
    console.log('En dehors du bloc if:', varVariable);
    
    // Hoisting avec var
    // @ts-ignore - Démonstration du hoisting, var est accessible avant sa déclaration
    console.log('Avant déclaration (hoisting):', typeof hoistedVar); // undefined (pas d'erreur car var est hissée)
    var hoistedVar: string; // Déclaration hissée
    hoistedVar = "Je suis hissée !";
    console.log('Après déclaration:', hoistedVar);
}

demonstrateVar();

console.log('\n=== LET - PORTÉE DE BLOC ===');

// 2. Comportement de let (portée de bloc)
function demonstrateLet() {
    console.log('--- Démonstration de let ---');
    
    if (true) {
        let letVariable = "Je suis une variable let";
        console.log('Dans le bloc if:', letVariable);
    }
    
    // let n'est PAS accessible en dehors du bloc
    try {
        // Cette ligne générerait une erreur si elle n'était pas commentée
        // console.log('En dehors du bloc if:', letVariable); // ReferenceError
        console.log('let n\'est pas accessible en dehors de son bloc');
    } catch (error) {
        console.log('Erreur attendue:', (error as Error).message);
    }
    
    // Temporal Dead Zone avec let
    try {
        // Cette ligne générerait une erreur si elle n'était pas commentée
        // console.log('Avant déclaration:', temporalDeadZoneVar); // ReferenceError
        let temporalDeadZoneVar = "Après la déclaration";
        console.log('Après déclaration:', temporalDeadZoneVar);
    } catch (error) {
        console.log('Temporal Dead Zone error:', (error as Error).message);
    }
}

demonstrateLet();

console.log('\n=== CONST - CONSTANTES ===');

// 3. Comportement de const (constantes)
function demonstrateConst() {
    console.log('--- Démonstration de const ---');
    
    // const doit être initialisée à la déclaration
    const constVariable = "Je suis une constante";
    console.log('Constante:', constVariable);
    
    // const avec objets (le contenu peut changer)
    const constObject: { name: string; age: number; city?: string } = {
        name: "Alice",
        age: 30
    };
    
    console.log('Objet constant initial:', constObject);
    
    // Modification du contenu de l'objet (autorisée)
    constObject.age = 31;
    constObject.city = "Paris";
    console.log('Objet constant modifié:', constObject);
    
    // const avec tableaux
    const constArray = [1, 2, 3];
    console.log('Tableau constant initial:', constArray);
    
    constArray.push(4);
    constArray[0] = 10;
    console.log('Tableau constant modifié:', constArray);
    
    // Démonstration: la référence ne peut pas changer
    try {
        // Cette ligne générerait une erreur si elle n'était pas commentée
        // constObject = {}; // TypeError: Assignment to constant variable
        console.log('La référence de const ne peut pas être réassignée');
    } catch (error) {
        console.log('Erreur de réassignation:', (error as Error).message);
    }
}

demonstrateConst();

console.log('\n=== COMPARAISON DES PORTÉES ===');

// 4. Comparaison des portées
function scopeComparison() {
    console.log('--- Comparaison des portées ---');
    
    var varInLoop = ""; // Initialisation pour éviter l'erreur TypeScript
    for (var i = 0; i < 3; i++) {
        varInLoop = `var iteration ${i}`;
    }
    console.log('var après boucle - i:', i); // 3
    console.log('var après boucle - varInLoop:', varInLoop); // "var iteration 2"
    
    for (let j = 0; j < 3; j++) {
        let letInLoop = `let iteration ${j}`;
        const constInLoop = `const iteration ${j}`;
        
        if (j === 2) {
            console.log('Dans la boucle - let:', letInLoop);
            console.log('Dans la boucle - const:', constInLoop);
        }
    }
    
    try {
        // Ces variables ne sont pas accessibles ici
        // console.log('let après boucle - j:', j); // ReferenceError
        // console.log('let après boucle - letInLoop:', letInLoop); // ReferenceError
        console.log('let et const ne sont pas accessibles après leur bloc');
    } catch (error) {
        console.log('Erreur de portée:', (error as Error).message);
    }
}

scopeComparison();

console.log('\n=== HOISTING COMPARAISON ===');

// 5. Démonstration du hoisting
function hoistingDemo() {
    console.log('--- Démonstration du hoisting ---');
    
    // var est hissée et initialisée avec undefined
    // @ts-ignore - Démonstration du hoisting
    console.log('var avant déclaration:', typeof varHoisted); // undefined
    
    // let et const sont hissées mais dans la Temporal Dead Zone
    try {
        // console.log('let avant déclaration:', letHoisted); // ReferenceError
        console.log('let est dans la Temporal Dead Zone avant déclaration');
    } catch (error) {
        console.log('Erreur TDZ:', error instanceof ReferenceError);
    }
    
    var varHoisted: string; // Déclaration hissée
    varHoisted = "var déclarée";
    let letHoisted = "let déclarée";
    const constHoisted = "const déclarée";
    
    console.log('Après déclarations:');
    console.log('var:', varHoisted);
    console.log('let:', letHoisted);
    console.log('const:', constHoisted);
}

hoistingDemo();

console.log('\n=== CLOSURES ET BOUCLES ===');

// 6. Problème classique avec var dans les boucles
function closuresDemo() {
    console.log('--- Problème avec var dans les closures ---');
    
    // Problème avec var
    const functionsVar: (() => void)[] = [];
    for (var k = 0; k < 3; k++) {
        functionsVar.push(() => {
            console.log('Fonction var, k =', k); // Affiche toujours 3
        });
    }
    
    console.log('Exécution des fonctions avec var:');
    functionsVar.forEach(fn => fn());
    
    // Solution avec let
    const functionsLet: (() => void)[] = [];
    for (let l = 0; l < 3; l++) {
        functionsLet.push(() => {
            console.log('Fonction let, l =', l); // Affiche 0, 1, 2
        });
    }
    
    console.log('Exécution des fonctions avec let:');
    functionsLet.forEach(fn => fn());
}

closuresDemo();

console.log('\n=== REDÉCLARATION ===');

// 7. Règles de redéclaration
function redeclarationDemo() {
    console.log('--- Règles de redéclaration ---');
    
    // var peut être redéclarée
    var redeclaredVar = "Première déclaration";
    console.log('var première fois:', redeclaredVar);
    
    var redeclaredVar = "Redéclaration";
    console.log('var redéclarée:', redeclaredVar);
    
    // let et const ne peuvent pas être redéclarées dans le même scope
    let uniqueLet = "Unique let";
    console.log('let unique:', uniqueLet);
    
    // Cette ligne générerait une erreur :
    // let uniqueLet = "Tentative de redéclaration"; // SyntaxError
    
    const uniqueConst = "Unique const";
    console.log('const unique:', uniqueConst);
    
    // Cette ligne générerait une erreur :
    // const uniqueConst = "Tentative de redéclaration"; // SyntaxError
}

redeclarationDemo();

console.log('\n=== MEILLEURES PRATIQUES ===');

// 8. Exemples de bonnes pratiques
function bestPracticesDemo() {
    console.log('--- Bonnes pratiques ---');
    
    // Utiliser const par défaut
    const immutableData = {
        name: "Alice",
        role: "Developer"
    };
    
    // Utiliser let quand la variable doit changer
    let counter = 0;
    for (let i = 0; i < 5; i++) {
        counter += i;
    }
    console.log('Compteur final:', counter);
    
    // Éviter var sauf cas spécifiques
    console.log('Préférez const > let > var');
    
    // Déclarer les variables au plus près de leur utilisation
    if (immutableData.role === "Developer") {
        const message = `${immutableData.name} est développeuse`;
        console.log(message);
    }
}

bestPracticesDemo();

console.log('\n=== TYPES TYPESCRIPT AVEC VARIABLES ===');

// 9. Types TypeScript avec différentes déclarations
function typesDemo() {
    console.log('--- Types avec var, let, const ---');
    
    // TypeScript infère les types
    let inferredNumber = 42; // number
    let inferredString = "Hello"; // string
    const inferredConstant = true; // literal type true
    
    console.log('Types inférés:');
    console.log('number:', typeof inferredNumber);
    console.log('string:', typeof inferredString);
    console.log('boolean:', typeof inferredConstant);
    
    // Types explicites
    let explicitNumber: number = 100;
    let explicitString: string = "TypeScript";
    const explicitConstant: boolean = false;
    
    // Union types
    let unionType: string | number = "début";
    console.log('Union type (string):', unionType);
    
    unionType = 123;
    console.log('Union type (number):', unionType);
    
    // Const assertions
    const literalArray = [1, 2, 3] as const; // readonly [1, 2, 3]
    const literalObject = {
        x: 10,
        y: 20
    } as const; // { readonly x: 10; readonly y: 20; }
    
    console.log('Literal types:', { literalArray, literalObject });
}

typesDemo();

console.log('\n=== DESTRUCTURATION AVEC VAR, LET, CONST ===');

// 10. Destructuration avec différents mots-clés
function destructuringDemo() {
    console.log('--- Destructuration ---');
    
    const sourceObject: { name: string; age: number; city: string; skills: string[]; [key: string]: any } = {
        name: "Alice",
        age: 30,
        city: "Paris",
        skills: ["TypeScript", "React", "Node.js"]
    };
    
    // Destructuration avec const (recommandé pour les données non modifiées)
    const { name, age } = sourceObject;
    console.log('Destructuration const:', { name, age });
    
    // Destructuration avec let (pour les variables qui peuvent changer)
    let { city, skills } = sourceObject;
    console.log('Destructuration let:', { city, skills });
    
    // Modification possible avec let
    city = "Lyon";
    skills = [...skills, "Vue.js"];
    console.log('Après modification:', { city, skills });
    
    // Destructuration de tableau
    const numbers = [1, 2, 3, 4, 5];
    const [first, second, ...rest] = numbers;
    console.log('Destructuration tableau:', { first, second, rest });
    
    // Destructuration avec valeurs par défaut
    const { country = "France", profession = "Développeuse" } = sourceObject;
    console.log('Avec valeurs par défaut:', { country, profession });
}

destructuringDemo();

console.log('\n=== RÉSUMÉ DES BONNES PRATIQUES ===');

const summary = [
    "✅ Utilisez const par défaut pour toutes les variables",
    "✅ Utilisez let uniquement si la variable doit être réassignée",
    "✅ Évitez var dans le code moderne TypeScript/JavaScript",
    "✅ Déclarez les variables au plus près de leur utilisation",
    "✅ Préférez la destructuration pour extraire des propriétés",
    "✅ Utilisez des types explicites quand la lisibilité l'exige",
    "✅ Attention à la Temporal Dead Zone avec let/const",
    "✅ Comprenez les différences de portée entre var/let/const",
    "✅ Utilisez const assertions pour des types littéraux",
    "✅ Configurez ESLint pour enforcer ces bonnes pratiques"
];

summary.forEach(practice => console.log(practice));

// Export pour éviter les erreurs de module
export {};
