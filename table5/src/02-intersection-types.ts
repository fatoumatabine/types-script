// 2. INTERSECTION DE TYPES
// ========================

// Types de base
type Identifiable = {
  id: number;
};

type Nommable = {
  nom: string;
};

type Dateable = {
  dateCreation: Date;
};

// Intersection - combine plusieurs types avec &
type Entite = Identifiable & Nommable & Dateable;

// Interface qui étend une intersection
interface Employe extends Identifiable, Nommable {
  poste: string;
  salaire: number;
}

// Type intersection plus complexe
type EmployeComplet = Employe & Dateable & {
  departement: string;
  competences: string[];
};

// Exemples d'utilisation
const entite: Entite = {
  id: 1,
  nom: "Mon Entité",
  dateCreation: new Date()
};

const employe: EmployeComplet = {
  id: 1,
  nom: "Marie Martin",
  poste: "Développeuse",
  salaire: 50000,
  dateCreation: new Date(),
  departement: "IT",
  competences: ["TypeScript", "React", "Node.js"]
};

console.log("Intersection de types:", { entite, employe });

export { Identifiable, Nommable, Dateable, Entite, Employe, EmployeComplet };
