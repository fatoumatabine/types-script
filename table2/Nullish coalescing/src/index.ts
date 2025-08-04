// ===== NULLISH COALESCING OPERATOR (??) =====
// Guide complet de l'opérateur de coalescence nulle en TypeScript

console.log('=== OPÉRATEUR NULLISH COALESCING (??) ===');

console.log('\n=== UTILISATION BASIQUE ===');

// 1. Utilisation basique avec null et undefined
let value1: string | null = null;
let value2: string | undefined = undefined;
let value3: string = "valeur définie";

console.log('Valeurs de test:');
console.log('value1 (null):', value1);
console.log('value2 (undefined):', value2);
console.log('value3 (string):', value3);

// Utilisation de l'opérateur ??
const result1 = value1 ?? "valeur par défaut";
const result2 = value2 ?? "valeur par défaut";
const result3 = value3 ?? "valeur par défaut";

console.log('\nRésultats avec ?? :');
console.log('value1 ?? "défaut":', result1);
console.log('value2 ?? "défaut":', result2);
console.log('value3 ?? "défaut":', result3);

console.log('\n=== DIFFÉRENCE AVEC L\'OPÉRATEUR || ===');

// 2. Comparaison avec l'opérateur OR logique (||)
const testValues = [null, undefined, "", 0, false, "valeur", 42, true];

console.log('Comparaison ?? vs || pour différentes valeurs:');
testValues.forEach(val => {
    const withNullish = val ?? "défaut";
    const withLogicalOr = val || "défaut";
    console.log(`${String(val).padEnd(10)} | ?? => ${withNullish.toString().padEnd(10)} | || => ${withLogicalOr}`);
});

console.log('\n=== CONFIGURATION D\'APPLICATION ===');

// 3. Cas d'usage pratique : configuration d'application
interface AppConfig {
    host?: string;
    port?: number;
    ssl?: boolean;
    timeout?: number;
    retries?: number;
    debug?: boolean;
}

function createConfig(userConfig: AppConfig = {}): Required<AppConfig> {
    return {
        host: userConfig.host ?? "localhost",
        port: userConfig.port ?? 3000,
        ssl: userConfig.ssl ?? false,
        timeout: userConfig.timeout ?? 5000,
        retries: userConfig.retries ?? 3,
        debug: userConfig.debug ?? false
    };
}

console.log('Configuration par défaut:');
console.log(createConfig());

console.log('\nConfiguration personnalisée:');
console.log(createConfig({
    host: "api.example.com",
    port: 8080,
    ssl: true
}));

console.log('\nConfiguration avec valeurs explicitement false/0:');
console.log(createConfig({
    port: 0,           // Port 0 est valide
    debug: false,      // Debug explicitement désactivé
    retries: 0         // Aucune retry
}));

console.log('\n=== CHAINING AVEC NULLISH COALESCING ===');

// 4. Chaînage de plusieurs opérateurs ??
interface User {
    name?: string;
    profile?: {
        displayName?: string;
        nickname?: string;
    };
    settings?: {
        theme?: string;
        language?: string;
    };
}

function getUserDisplayName(user: User): string {
    return user.name ?? 
           user.profile?.displayName ?? 
           user.profile?.nickname ?? 
           "Utilisateur anonyme";
}

function getUserTheme(user: User): string {
    return user.settings?.theme ?? "light";
}

const users: User[] = [
    { name: "Alice" },
    { profile: { displayName: "Bob le Développeur" } },
    { profile: { nickname: "Charlie" } },
    { settings: { theme: "dark" } },
    {} // Utilisateur vide
];

console.log('Noms d\'affichage des utilisateurs:');
users.forEach((user, index) => {
    const displayName = getUserDisplayName(user);
    const theme = getUserTheme(user);
    console.log(`Utilisateur ${index + 1}: ${displayName} (thème: ${theme})`);
});

console.log('\n=== NULLISH COALESCING ASSIGNMENT (??=) ===');

// 5. Opérateur d'assignation nullish coalescing
interface Cache {
    [key: string]: any;
}

class CacheManager {
    private cache: Cache = {};

    get(key: string): any {
        // Initialiser avec une valeur par défaut si n'existe pas
        this.cache[key] ??= this.getDefaultValue(key);
        return this.cache[key];
    }

    private getDefaultValue(key: string): any {
        console.log(`🔧 Génération de la valeur par défaut pour: ${key}`);
        switch (key) {
            case "userPreferences":
                return { theme: "light", language: "fr" };
            case "notifications":
                return [];
            case "counter":
                return 0;
            default:
                return null;
        }
    }

    set(key: string, value: any): void {
        this.cache[key] = value;
    }

    has(key: string): boolean {
        return this.cache[key] !== null && this.cache[key] !== undefined;
    }
}

const cacheManager = new CacheManager();

console.log('Premier accès aux clés (génération des valeurs par défaut):');
console.log('userPreferences:', cacheManager.get("userPreferences"));
console.log('notifications:', cacheManager.get("notifications"));
console.log('counter:', cacheManager.get("counter"));

console.log('\nDeuxième accès (utilisation du cache):');
console.log('userPreferences:', cacheManager.get("userPreferences"));
console.log('notifications:', cacheManager.get("notifications"));

console.log('\n=== VALIDATION DE DONNÉES ===');

// 6. Validation de données avec nullish coalescing
interface FormData {
    username?: string;
    email?: string;
    age?: number;
    newsletter?: boolean;
}

function validateFormData(data: FormData): FormData {
    return {
        username: data.username ?? (() => { throw new Error("Nom d'utilisateur requis"); })(),
        email: data.email ?? (() => { throw new Error("Email requis"); })(),
        age: data.age ?? 18, // Âge par défaut
        newsletter: data.newsletter ?? false // Newsletter opt-out par défaut
    };
}

const validFormData: FormData = {
    username: "alice",
    email: "alice@example.com",
    age: 25
};

const incompleteFormData: FormData = {
    username: "bob"
    // email manquant
};

console.log('Validation de données complètes:');
try {
    const validated = validateFormData(validFormData);
    console.log('✅ Données validées:', validated);
} catch (error) {
    console.log('❌ Erreur:', (error as Error).message);
}

console.log('\nValidation de données incomplètes:');
try {
    const validated = validateFormData(incompleteFormData);
    console.log('✅ Données validées:', validated);
} catch (error) {
    console.log('❌ Erreur:', (error as Error).message);
}

console.log('\n=== API RESPONSES ===');

// 7. Gestion des réponses API
interface ApiResponse<T> {
    data?: T;
    error?: string;
    status?: number;
}

function processApiResponse<T>(response: ApiResponse<T>, defaultValue: T): T {
    if (response.error) {
        console.log(`❌ Erreur API: ${response.error}`);
    }
    
    const status = response.status ?? 200;
    console.log(`📡 Status: ${status}`);
    
    return response.data ?? defaultValue;
}

// Simulation de réponses API
const successResponse: ApiResponse<string[]> = {
    data: ["item1", "item2", "item3"],
    status: 200
};

const errorResponse: ApiResponse<string[]> = {
    error: "Données non trouvées",
    status: 404
};

const emptyResponse: ApiResponse<string[]> = {};

console.log('Réponse de succès:');
console.log(processApiResponse(successResponse, []));

console.log('\nRéponse d\'erreur:');
console.log(processApiResponse(errorResponse, ["valeur par défaut"]));

console.log('\nRéponse vide:');
console.log(processApiResponse(emptyResponse, ["fallback"]));

console.log('\n=== FONCTIONS AVEC PARAMÈTRES OPTIONNELS ===');

// 8. Fonctions avec paramètres optionnels
interface LogOptions {
    level?: "info" | "warn" | "error";
    timestamp?: boolean;
    prefix?: string;
}

function log(message: string, options?: LogOptions): void {
    const level = options?.level ?? "info";
    const showTimestamp = options?.timestamp ?? true;
    const prefix = options?.prefix ?? "[APP]";
    
    const timestamp = showTimestamp ? new Date().toISOString() : "";
    const levelTag = `[${level.toUpperCase()}]`;
    
    console.log(`${timestamp} ${prefix} ${levelTag} ${message}`);
}

console.log('Exemples de logging:');
log("Message avec options par défaut");
log("Message d'erreur", { level: "error" });
log("Message sans timestamp", { timestamp: false });
log("Message avec préfixe personnalisé", { prefix: "[CUSTOM]", level: "warn" });

console.log('\n=== PERFORMANCE ET LAZY EVALUATION ===');

// 9. Évaluation paresseuse avec fonctions
function expensiveCalculation(): number {
    console.log("🔄 Calcul coûteux en cours...");
    // Simulation d'un calcul long
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
}

function getValue(useCache: boolean, cachedValue?: number): number {
    // Le calcul coûteux n'est exécuté que si nécessaire
    return cachedValue ?? (useCache ? 0 : expensiveCalculation());
}

console.log('Utilisation du cache:');
console.log('Résultat avec cache:', getValue(true, 42));

console.log('\nSans cache (calcul coûteux):');
console.log('Résultat sans cache:', getValue(false));

console.log('\n=== BONNES PRATIQUES ===');

const bestPractices = [
    "✅ Utilisez ?? pour les valeurs null/undefined uniquement",
    "✅ Préférez ?? à || pour éviter les faux positifs (0, '', false)",
    "✅ Combinez avec optional chaining (?.) pour un code plus sûr",
    "✅ Utilisez ??= pour l'assignation conditionnelle",
    "✅ Documentez quand vous utilisez des valeurs par défaut",
    "✅ Attention aux fonctions dans les expressions ?? (évaluation paresseuse)",
    "✅ Testez avec toutes les valeurs falsy possibles",
    "✅ Utilisez TypeScript pour typer correctement les valeurs nullables"
];

bestPractices.forEach(practice => console.log(practice));

// Export pour éviter les erreurs de module
export {};
