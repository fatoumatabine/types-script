// ============================================
// INTERSECTIONS - Types fusionnés
// ============================================

// Types de base pour les intersections
type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: string;
    department: string;
    salary: number;
};

type Manager = {
    teamSize: number;
    responsibilities: string[];
};

// Intersections simples
type EmployeePerson = Person & Employee;
type ManagerEmployee = Employee & Manager;
type FullManager = Person & Employee & Manager;

// Intersections avec fonctions
type Readable = {
    read(): string;
};

type Writable = {
    write(data: string): void;
};

type ReadWrite = Readable & Writable;

// Intersections avec types génériques
type Timestamped<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};

type Versioned<T> = T & {
    version: number;
};

type Metadata<T> = Timestamped<T> & Versioned<T>;

// Types mixins
type Serializable = {
    serialize(): string;
    deserialize(data: string): void;
};

type Cacheable = {
    cacheKey: string;
    ttl: number;
};

type NetworkResource<T> = T & Serializable & Cacheable;

// Intersections conditionnelles
type EventHandler<T> = {
    handle(event: T): void;
};

type Logger = {
    log(message: string): void;
};

type EventLogger<T> = EventHandler<T> & Logger;

export class IntersectionExamples {
    // Création d'un employé complet
    static createEmployee(
        name: string,
        age: number,
        employeeId: string,
        department: string,
        salary: number
    ): EmployeePerson {
        return {
            name,
            age,
            employeeId,
            department,
            salary
        };
    }

    // Création d'un manager complet
    static createManager(
        name: string,
        age: number,
        employeeId: string,
        department: string,
        salary: number,
        teamSize: number,
        responsibilities: string[]
    ): FullManager {
        return {
            name,
            age,
            employeeId,
            department,
            salary,
            teamSize,
            responsibilities
        };
    }

    // Implémentation de ReadWrite
    static createFile(initialContent: string = ""): ReadWrite {
        let content = initialContent;

        return {
            read(): string {
                return content;
            },
            write(data: string): void {
                content = data;
            }
        };
    }

    // Création d'objets avec métadonnées
    static withMetadata<T>(data: T): Metadata<T> {
        const now = new Date();
        return {
            ...data,
            createdAt: now,
            updatedAt: now,
            version: 1
        };
    }

    // Mise à jour avec nouvelle version
    static updateVersion<T>(item: Metadata<T>): Metadata<T> {
        return {
            ...item,
            updatedAt: new Date(),
            version: item.version + 1
        };
    }

    // Implémentation d'une ressource réseau
    static createNetworkResource<T>(data: T, cacheKey: string, ttl: number): NetworkResource<T> {
        return {
            ...data,
            cacheKey,
            ttl,
            serialize(): string {
                return JSON.stringify(data);
            },
            deserialize(jsonData: string): void {
                Object.assign(data, JSON.parse(jsonData));
            }
        };
    }

    // Event logger générique
    static createEventLogger<T>(logPrefix: string): EventLogger<T> {
        return {
            handle(event: T): void {
                this.log(`Événement traité: ${JSON.stringify(event)}`);
            },
            log(message: string): void {
                const timestamp = new Date().toISOString();
                // Dans un vrai projet, on utiliserait un vrai logger
                // console.log(`[${timestamp}] ${logPrefix}: ${message}`);
            }
        };
    }

    // Fonction utilitaire pour combiner des objets
    static merge<T, U>(obj1: T, obj2: U): T & U {
        return { ...obj1, ...obj2 };
    }

    // Validation d'un objet intersection
    static validateEmployee(employee: EmployeePerson): boolean {
        return (
            typeof employee.name === 'string' &&
            typeof employee.age === 'number' &&
            typeof employee.employeeId === 'string' &&
            typeof employee.department === 'string' &&
            typeof employee.salary === 'number' &&
            employee.age > 0 &&
            employee.salary > 0
        );
    }

    // Calcul de bonus pour manager
    static calculateManagerBonus(manager: FullManager): number {
        const baseBonus = manager.salary * 0.1;
        const teamBonus = manager.teamSize * 1000;
        const responsibilityBonus = manager.responsibilities.length * 500;
        return baseBonus + teamBonus + responsibilityBonus;
    }
}

// Types d'événements pour démonstration
type UserEvent = {
    type: "user";
    userId: string;
    action: string;
};

type SystemEvent = {
    type: "system";
    component: string;
    level: "info" | "warning" | "error";
};

// Exemples d'usage
export function demonstrateIntersections() {
    // console.log("=== DÉMONSTRATION DES INTERSECTIONS ===");

    // Création d'employés
    const employee = IntersectionExamples.createEmployee(
        "Jean Dupont",
        35,
        "EMP001",
        "Informatique",
        50000
    );

    const manager = IntersectionExamples.createManager(
        "Marie Martin",
        42,
        "MAN001",
        "Informatique",
        75000,
        8,
        ["Gestion équipe", "Budget", "Planification"]
    );

    // Validation
    const isValidEmployee = IntersectionExamples.validateEmployee(employee);
    const managerBonus = IntersectionExamples.calculateManagerBonus(manager);

    // Fichier lecture/écriture
    const file = IntersectionExamples.createFile("Contenu initial");
    file.write("Nouveau contenu");
    const content = file.read();

    // Objets avec métadonnées
    const userData = { username: "alice", email: "alice@example.com" };
    const userWithMetadata = IntersectionExamples.withMetadata(userData);
    const updatedUser = IntersectionExamples.updateVersion(userWithMetadata);

    // Ressource réseau
    const apiData = { id: 1, title: "Test" };
    const networkResource = IntersectionExamples.createNetworkResource(
        apiData,
        "api_data_1",
        3600
    );

    // Event loggers
    const userEventLogger = IntersectionExamples.createEventLogger<UserEvent>("USER_EVENTS");
    const systemEventLogger = IntersectionExamples.createEventLogger<SystemEvent>("SYSTEM_EVENTS");

    const userEvent: UserEvent = {
        type: "user",
        userId: "123",
        action: "login"
    };

    const systemEvent: SystemEvent = {
        type: "system",
        component: "auth",
        level: "info"
    };

    userEventLogger.handle(userEvent);
    systemEventLogger.handle(systemEvent);

    // Merge d'objets
    const baseObject = { a: 1, b: 2 };
    const extension = { c: 3, d: 4 };
    const merged = IntersectionExamples.merge(baseObject, extension);

    return {
        employee,
        manager,
        isValidEmployee,
        managerBonus,
        fileContent: content,
        userWithMetadata,
        updatedUser,
        networkResource,
        merged
    };
}
