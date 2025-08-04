"use strict";
// ===== COPIER UN OBJET DE TYPE RÉFÉRENCE =====
// Démonstration des différences entre copie par référence et copie par valeur
console.log('=== COPIE PAR RÉFÉRENCE ===');
// 1. Copie par référence d'un objet
const originalObject = {
    name: "Alice",
    age: 30,
    address: { city: "Paris", country: "France" }
};
const referenceCopy = originalObject; // Copie par référence
referenceCopy.age = 31; // Modification de la copie
referenceCopy.address.city = "Lyon"; // Modification de l'objet imbriqué
console.log("Objet original après modification de la copie:");
console.log(originalObject); // { name: "Alice", age: 31, address: { city: "Lyon", country: "France" } }
console.log("Copie par référence:");
console.log(referenceCopy); // Même résultat que l'original
console.log("\n=== COPIE SUPERFICIELLE (Shallow Copy) ===");
// 2. Copie superficielle avec spread operator
const person = {
    name: "Bob",
    age: 25,
    hobbies: ["lecture", "sport"],
    address: { city: "Marseille", zipCode: "13000" }
};
const shallowCopy = Object.assign({}, person); // Copie superficielle
shallowCopy.name = "Charlie"; // Modification du niveau supérieur
shallowCopy.hobbies.push("musique"); // Modification du tableau (référence partagée)
shallowCopy.address.city = "Nice"; // Modification de l'objet imbriqué (référence partagée)
console.log("Objet original après copie superficielle:");
console.log(person);
console.log("Copie superficielle:");
console.log(shallowCopy);
console.log("\n=== COPIE PROFONDE (Deep Copy) ===");
// 3. Copie profonde avec JSON.parse/stringify
const employee = {
    id: 1,
    name: "David",
    department: { name: "IT", budget: 50000 },
    skills: ["JavaScript", "TypeScript", "React"]
};
const deepCopy = JSON.parse(JSON.stringify(employee)); // Copie profonde
deepCopy.name = "Emma"; // Modification indépendante
deepCopy.department.budget = 60000; // Modification indépendante
deepCopy.skills.push("Node.js"); // Modification indépendante
console.log("Objet original après copie profonde:");
console.log(employee);
console.log("Copie profonde:");
console.log(deepCopy);
console.log("\n=== COPIE AVEC Object.assign() ===");
// 4. Copie avec Object.assign (copie superficielle)
const config = {
    theme: "dark",
    language: "fr",
    features: { notifications: true, autoSave: false }
};
const configCopy = Object.assign({}, config);
configCopy.theme = "light";
configCopy.features.notifications = false;
console.log("Configuration originale:");
console.log(config);
console.log("Copie avec Object.assign:");
console.log(configCopy);
console.log("\n=== COMPARAISON DES RÉFÉRENCES ===");
// 5. Vérification des références
console.log("originalObject === referenceCopy:", originalObject === referenceCopy); // true
console.log("person === shallowCopy:", person === shallowCopy); // false
console.log("person.address === shallowCopy.address:", person.address === shallowCopy.address); // true
console.log("employee === deepCopy:", employee === deepCopy); // false
console.log("employee.department === deepCopy.department:", employee.department === deepCopy.department); // false
