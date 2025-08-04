type Identifiable = {
    id: number;
};
type Nommable = {
    nom: string;
};
type Dateable = {
    dateCreation: Date;
};
type Entite = Identifiable & Nommable & Dateable;
interface Employe extends Identifiable, Nommable {
    poste: string;
    salaire: number;
}
type EmployeComplet = Employe & Dateable & {
    departement: string;
    competences: string[];
};
export { Identifiable, Nommable, Dateable, Entite, Employe, EmployeComplet };
//# sourceMappingURL=02-intersection-types.d.ts.map