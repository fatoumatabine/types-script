// ============================================
// UNIONS - Types combinés
// ============================================

// Types union basiques
type StringOrNumber = string | number;
type Status = "loading" | "success" | "error";
type Theme = "light" | "dark" | "auto";

// Union avec null/undefined
type OptionalString = string | null | undefined;
type MaybeNumber = number | undefined;

// Union d'objets
type Cat = {
    type: "cat";
    name: string;
    meows: boolean;
};

type Dog = {
    type: "dog";
    name: string;
    barks: boolean;
};

type Animal = Cat | Dog;

// Union avec types complexes
type ApiResponse<T> = 
    | { status: "success"; data: T }
    | { status: "error"; message: string; code: number }
    | { status: "loading" };

type UserData = {
    id: number;
    name: string;
    email: string;
};

type PaymentMethod = 
    | { type: "card"; cardNumber: string; expiryDate: string }
    | { type: "paypal"; email: string }
    | { type: "bank"; iban: string; bic: string };

export class UnionExamples {
    // Traitement de types union simples
    static processValue(value: StringOrNumber): string {
        if (typeof value === "string") {
            return `Chaîne: ${value.toUpperCase()}`;
        } else {
            return `Nombre: ${value.toFixed(2)}`;
        }
    }

    // Gestion de statuts
    static getStatusMessage(status: Status): string {
        switch (status) {
            case "loading":
                return "Chargement en cours...";
            case "success":
                return "Opération réussie !";
            case "error":
                return "Une erreur s'est produite";
            default:
                // TypeScript garantit que ce cas ne peut pas arriver
                const _exhaustive: never = status;
                return _exhaustive;
        }
    }

    // Traitement d'animaux avec type guards
    static describeAnimal(animal: Animal): string {
        switch (animal.type) {
            case "cat":
                return `${animal.name} est un chat qui ${animal.meows ? 'miaule' : 'ne miaule pas'}`;
            case "dog":
                return `${animal.name} est un chien qui ${animal.barks ? 'aboie' : 'n\'aboie pas'}`;
            default:
                const _exhaustive: never = animal;
                return _exhaustive;
        }
    }

    // Gestion de réponses API
    static handleApiResponse(response: ApiResponse<UserData>): string {
        switch (response.status) {
            case "loading":
                return "Chargement des données utilisateur...";
            case "success":
                return `Utilisateur: ${response.data.name} (${response.data.email})`;
            case "error":
                return `Erreur ${response.code}: ${response.message}`;
            default:
                const _exhaustive: never = response;
                return _exhaustive;
        }
    }

    // Traitement de méthodes de paiement
    static processPayment(method: PaymentMethod, amount: number): string {
        switch (method.type) {
            case "card":
                return `Paiement de ${amount}€ par carte se terminant par ${method.cardNumber.slice(-4)}`;
            case "paypal":
                return `Paiement de ${amount}€ via PayPal (${method.email})`;
            case "bank":
                return `Paiement de ${amount}€ par virement bancaire (IBAN: ${method.iban})`;
            default:
                const _exhaustive: never = method;
                return _exhaustive;
        }
    }

    // Type guard personnalisé
    static isString(value: StringOrNumber): value is string {
        return typeof value === "string";
    }

    // Type guard pour vérifier le succès d'une API
    static isSuccessResponse<T>(response: ApiResponse<T>): response is { status: "success"; data: T } {
        return response.status === "success";
    }

    // Traitement avec valeurs optionnelles
    static processOptionalString(value: OptionalString): string {
        if (value === null) {
            return "Valeur null";
        }
        if (value === undefined) {
            return "Valeur undefined";
        }
        return `Valeur: ${value}`;
    }
}

// Exemples d'usage
export function demonstrateUnions() {
    console.log("=== DÉMONSTRATION DES UNIONS ===");

    // Types union simples
    console.log(UnionExamples.processValue("hello"));
    console.log(UnionExamples.processValue(42.345));

    // Statuts
    console.log(UnionExamples.getStatusMessage("loading"));
    console.log(UnionExamples.getStatusMessage("success"));
    console.log(UnionExamples.getStatusMessage("error"));

    // Animaux
    const cat: Cat = { type: "cat", name: "Whiskers", meows: true };
    const dog: Dog = { type: "dog", name: "Rex", barks: false };
    
    console.log(UnionExamples.describeAnimal(cat));
    console.log(UnionExamples.describeAnimal(dog));

    // Réponses API
    const responses: ApiResponse<UserData>[] = [
        { status: "loading" },
        { status: "success", data: { id: 1, name: "Alice", email: "alice@example.com" } },
        { status: "error", message: "Utilisateur non trouvé", code: 404 }
    ];

    responses.forEach(response => {
        console.log(UnionExamples.handleApiResponse(response));
    });

    // Méthodes de paiement
    const paymentMethods: PaymentMethod[] = [
        { type: "card", cardNumber: "1234567890123456", expiryDate: "12/25" },
        { type: "paypal", email: "user@paypal.com" },
        { type: "bank", iban: "FR1420041010050500013M02606", bic: "BNPAFRPP" }
    ];

    paymentMethods.forEach(method => {
        console.log(UnionExamples.processPayment(method, 99.99));
    });

    // Valeurs optionnelles
    const optionalValues: OptionalString[] = ["hello", null, undefined];
    optionalValues.forEach(value => {
        console.log(UnionExamples.processOptionalString(value));
    });
}
