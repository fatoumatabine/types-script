// ===== DESTRUCTURATION EN TYPESCRIPT =====
// Démonstration complète des différentes techniques de destructuration

console.log('=== DESTRUCTURATION D\'OBJETS ===');

// 1. Destructuration basique d'objets
const person = {
    firstName: "Marie",
    lastName: "Dupont",
    age: 28,
    city: "Paris",
    country: "France"
};

const { firstName, lastName, age } = person;
console.log(`Nom: ${firstName} ${lastName}, Âge: ${age}`);

// 2. Destructuration avec renommage
const { firstName: prenom, lastName: nom } = person;
console.log(`Prénom: ${prenom}, Nom: ${nom}`);

// 3. Destructuration avec valeurs par défaut
const personWithDefaults: { firstName: string; lastName: string; age: number; city: string; country: string; profession?: string; salary?: number } = person;
const { profession = "Non spécifié", salary = 0 } = personWithDefaults;
console.log(`Profession: ${profession}, Salaire: ${salary}`);

console.log('\n=== DESTRUCTURATION DE TABLEAUX ===');

// 4. Destructuration basique de tableaux
const colors = ["rouge", "vert", "bleu", "jaune", "violet"];
const [first, second, third] = colors;
console.log(`Première couleur: ${first}, Deuxième: ${second}, Troisième: ${third}`);

// 5. Destructuration avec omission d'éléments
const [primary, , tertiary] = colors; // Ignore le deuxième élément
console.log(`Primaire: ${primary}, Tertiaire: ${tertiary}`);

// 6. Destructuration avec rest operator
const [head, ...tail] = colors;
console.log(`Premier élément: ${head}`);
console.log(`Reste du tableau:`, tail);

console.log('\n=== DESTRUCTURATION IMBRIQUÉE ===');

// 7. Destructuration d'objets imbriqués
const employee = {
    id: 101,
    name: "Jean Martin",
    position: {
        title: "Développeur",
        level: "Senior",
        department: {
            name: "IT",
            location: "Bâtiment A"
        }
    },
    contacts: {
        email: "jean.martin@example.com",
        phone: "+33123456789"
    }
};

const {
    name: employeeName,
    position: {
        title,
        department: { name: deptName, location: deptLocation }
    },
    contacts: { email }
} = employee;

console.log(`Employé: ${employeeName}`);
console.log(`Poste: ${title}`);
console.log(`Département: ${deptName} (${deptLocation})`);
console.log(`Email: ${email}`);

console.log('\n=== DESTRUCTURATION DANS LES FONCTIONS ===');

// 8. Destructuration dans les paramètres de fonction
interface UserInfo {
    username: string;
    email: string;
    age?: number;
    preferences?: {
        theme: string;
        language: string;
    };
}

function displayUser({ username, email, age = 0, preferences = { theme: "light", language: "fr" } }: UserInfo) {
    console.log(`Utilisateur: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Âge: ${age}`);
    console.log(`Thème: ${preferences.theme}, Langue: ${preferences.language}`);
}

const user1: UserInfo = {
    username: "alice123",
    email: "alice@example.com",
    age: 25,
    preferences: { theme: "dark", language: "en" }
};

const user2: UserInfo = {
    username: "bob456",
    email: "bob@example.com"
};

console.log("Utilisateur 1:");
displayUser(user1);
console.log("\nUtilisateur 2:");
displayUser(user2);

console.log('\n=== DESTRUCTURATION AVEC TYPES ===');

// 9. Destructuration avec types TypeScript
interface ApiResponse {
    data: {
        users: Array<{ id: number; name: string; active: boolean }>;
        count: number;
    };
    status: string;
    message: string;
}

const apiResponse: ApiResponse = {
    data: {
        users: [
            { id: 1, name: "Alice", active: true },
            { id: 2, name: "Bob", active: false },
            { id: 3, name: "Charlie", active: true }
        ],
        count: 3
    },
    status: "success",
    message: "Données récupérées avec succès"
};

const {
    data: { users, count },
    status: responseStatus,
    message
} = apiResponse;

console.log(`Status: ${responseStatus}`);
console.log(`Message: ${message}`);
console.log(`Nombre d'utilisateurs: ${count}`);
users.forEach(({ id, name, active }) => {
    console.log(`ID: ${id}, Nom: ${name}, Actif: ${active ? 'Oui' : 'Non'}`);
});

console.log('\n=== ÉCHANGE DE VARIABLES ===');

// 10. Échange de variables avec destructuration
let a = 10;
let b = 20;
console.log(`Avant échange: a = ${a}, b = ${b}`);

[a, b] = [b, a]; // Échange simple
console.log(`Après échange: a = ${a}, b = ${b}`);

console.log('\n=== DESTRUCTURATION CONDITIONNELLE ===');

// 11. Destructuration avec vérification d'existence
const optionalData: { config?: { theme?: string; size?: number } } = {
    config: {
        theme: "dark"
        // size non défini
    }
};

const { config: { theme = "light", size = 12 } = {} } = optionalData;
console.log(`Thème: ${theme}, Taille: ${size}`);
