// ===== EXCLUSION DES FICHIERS DE TRANSPILATION =====
// Démonstration de l'exclusion de fichiers lors de la compilation TypeScript

console.log('=== GESTION DES FICHIERS EXCLUS ===');

// Ce fichier sera transpilé car il est dans le dossier src/
console.log('Ce fichier index.ts SERA transpilé en JavaScript.');

// Créons quelques exemples de fichiers qui pourraient être exclus
console.log('\n=== TYPES DE FICHIERS GÉNÉRALEMENT EXCLUS ===');

// 1. Fichiers de test (si on les exclut)
console.log('✅ Fichiers de test (.spec.ts, .test.ts)');
console.log('   Exemple: user.test.ts, api.spec.ts');

// 2. Fichiers de développement
console.log('✅ Fichiers de développement (.dev.ts)');
console.log('   Exemple: debug.dev.ts, mock.dev.ts');

// 3. Fichiers de documentation
console.log('✅ Fichiers de documentation (.md, .txt)');
console.log('   Exemple: README.md, CHANGELOG.txt');

// 4. Fichiers de configuration
console.log('✅ Fichiers de configuration spécifiques');
console.log('   Exemple: webpack.config.js, jest.config.js');

console.log('\n=== EXEMPLE DE CONFIGURATION TSCONFIG.JSON ===');

const exampleTsConfig = {
    compilerOptions: {
        target: "ES6",
        module: "commonjs",
        strict: true,
        outDir: "dist"
    },
    include: ["src/**/*"],
    exclude: [
        "node_modules",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.dev.ts",
        "dist",
        "build",
        "coverage",
        "docs"
    ]
};

console.log('Configuration recommandée:');
console.log(JSON.stringify(exampleTsConfig, null, 2));

console.log('\n=== PATTERNS D\'EXCLUSION COURANTS ===');

const exclusionPatterns = [
    {
        pattern: "**/*.test.ts",
        description: "Exclut tous les fichiers de test TypeScript"
    },
    {
        pattern: "**/*.spec.ts", 
        description: "Exclut tous les fichiers de spécification"
    },
    {
        pattern: "node_modules",
        description: "Exclut le dossier des dépendances"
    },
    {
        pattern: "dist/**/*",
        description: "Exclut le dossier de sortie"
    },
    {
        pattern: "build/**/*",
        description: "Exclut le dossier de build"
    },
    {
        pattern: "**/*.d.ts",
        description: "Exclut les fichiers de déclaration (optionnel)"
    },
    {
        pattern: "temp/**/*",
        description: "Exclut les fichiers temporaires"
    },
    {
        pattern: "**/*.dev.ts",
        description: "Exclut les fichiers de développement"
    }
];

exclusionPatterns.forEach((item, index) => {
    console.log(`${index + 1}. ${item.pattern}`);
    console.log(`   → ${item.description}`);
});

console.log('\n=== VÉRIFICATION DE LA COMPILATION ===');

// Fonction pour simuler la vérification des fichiers
function checkCompilation() {
    const filesToCheck = [
        { file: "src/index.ts", shouldCompile: true },
        { file: "src/utils.ts", shouldCompile: true },
        { file: "src/components/Button.ts", shouldCompile: true },
        { file: "tests/index.test.ts", shouldCompile: false },
        { file: "docs/api.md", shouldCompile: false },
        { file: "node_modules/library/index.ts", shouldCompile: false },
        { file: "temp/debug.dev.ts", shouldCompile: false }
    ];

    console.log('Résultats de la compilation simulée:');
    filesToCheck.forEach(({ file, shouldCompile }) => {
        const status = shouldCompile ? '✅ COMPILÉ' : '❌ EXCLU';
        console.log(`${status} - ${file}`);
    });
}

checkCompilation();

console.log('\n=== CONSEILS D\'OPTIMISATION ===');

const optimizationTips = [
    "Excluez les dossiers volumineux comme node_modules",
    "Séparez les fichiers de test du code source",
    "Utilisez des patterns génériques (**/*) pour plus de flexibilité",
    "Excluez les fichiers générés automatiquement",
    "Documentez vos règles d'exclusion dans le README",
    "Testez régulièrement votre configuration avec 'tsc --listFiles'"
];

optimizationTips.forEach((tip, index) => {
    console.log(`${index + 1}. ${tip}`);
});

console.log('\n=== COMMANDES UTILES ===');

const usefulCommands = [
    {
        command: "tsc --listFiles",
        description: "Liste tous les fichiers inclus dans la compilation"
    },
    {
        command: "tsc --showConfig",
        description: "Affiche la configuration TypeScript finale"
    },
    {
        command: "tsc --noEmit",
        description: "Vérifie les erreurs sans générer de fichiers"
    },
    {
        command: "tsc --watch",
        description: "Surveille les changements et recompile automatiquement"
    }
];

usefulCommands.forEach(({ command, description }) => {
    console.log(`📝 ${command}`);
    console.log(`   ${description}`);
});

// Export pour éviter les erreurs de module
export {};
