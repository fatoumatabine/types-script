// ============================================
// TRY - Gestion d'erreurs
// ============================================

// Types pour les résultats d'opérations qui peuvent échouer
type Try<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

type TryAsync<T, E = Error> = Promise<Try<T, E>>;

// Types pour chaîner des opérations Try
type TryMap<T, U, E = Error> = (value: T) => Try<U, E>;
type TryFlatMap<T, U, E = Error> = (value: T) => Try<U, E>;

// Types pour la validation
type ValidationResult<T> = Try<T, string[]>;

export class TryExamples {
    // Créer un succès
    static success<T>(data: T): Try<T, never> {
        return { success: true, data };
    }

    // Créer un échec
    static failure<E>(error: E): Try<never, E> {
        return { success: false, error };
    }

    // Exécuter une fonction qui peut lever une exception
    static attempt<T>(fn: () => T): Try<T, Error> {
        try {
            const result = fn();
            return this.success(result);
        } catch (error) {
            return this.failure(error instanceof Error ? error : new Error(String(error)));
        }
    }

    // Exécuter une fonction asynchrone
    static async attemptAsync<T>(fn: () => Promise<T>): TryAsync<T, Error> {
        try {
            const result = await fn();
            return this.success(result);
        } catch (error) {
            return this.failure(error instanceof Error ? error : new Error(String(error)));
        }
    }

    // Transformer le résultat en cas de succès
    static map<T, U, E>(result: Try<T, E>, mapper: (value: T) => U): Try<U, E> {
        if (result.success) {
            return this.success(mapper(result.data));
        }
        return result;
    }

    // Chaîner des opérations Try
    static flatMap<T, U, E>(result: Try<T, E>, mapper: TryFlatMap<T, U, E>): Try<U, E> {
        if (result.success) {
            return mapper(result.data);
        }
        return result;
    }

    // Récupérer la valeur ou une valeur par défaut
    static getOrElse<T, E>(result: Try<T, E>, defaultValue: T): T {
        return result.success ? result.data : defaultValue;
    }

    // Récupérer la valeur ou lever l'erreur
    static getOrThrow<T, E>(result: Try<T, E>): T {
        if (result.success) {
            return result.data;
        }
        throw result.error;
    }

    // Combiner plusieurs Try
    static combine<T extends readonly Try<any, any>[]>(...results: T): Try<
        { [K in keyof T]: T[K] extends Try<infer U, any> ? U : never },
        T[number] extends Try<any, infer E> ? E : never
    > {
        const data: any[] = [];
        
        for (const result of results) {
            if (!result.success) {
                return result as any;
            }
            data.push(result.data);
        }
        
        return this.success(data as any);
    }

    // Validation avec accumulation d'erreurs
    static validate<T>(
        value: T,
        validators: Array<(value: T) => string | null>
    ): ValidationResult<T> {
        const errors: string[] = [];
        
        for (const validator of validators) {
            const error = validator(value);
            if (error !== null) {
                errors.push(error);
            }
        }
        
        return errors.length === 0 
            ? this.success(value)
            : this.failure(errors);
    }

    // Retry avec backoff
    static async retry<T>(
        fn: () => Promise<T>,
        maxAttempts: number = 3,
        delayMs: number = 1000
    ): TryAsync<T, Error> {
        let lastError: Error | null = null;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const result = await fn();
                return this.success(result);
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                
                if (attempt < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
                }
            }
        }
        
        return this.failure(lastError || new Error('Unknown error'));
    }

    // Pipeline de transformations
    static pipeline<T>(...operations: Array<(value: any) => Try<any, any>>) {
        return (initialValue: T): Try<any, any> => {
            let current: Try<any, any> = this.success(initialValue);
            
            for (const operation of operations) {
                current = this.flatMap(current, operation);
                if (!current.success) break;
            }
            
            return current;
        };
    }

    // Collecte de résultats partiels
    static collectResults<T, E>(results: Try<T, E>[]): {
        successes: T[];
        failures: E[];
    } {
        const successes: T[] = [];
        const failures: E[] = [];
        
        for (const result of results) {
            if (result.success) {
                successes.push(result.data);
            } else {
                failures.push(result.error);
            }
        }
        
        return { successes, failures };
    }

    // Conversion vers Promise
    static toPromise<T, E>(result: Try<T, E>): Promise<T> {
        return result.success 
            ? Promise.resolve(result.data)
            : Promise.reject(result.error);
    }

    // Conversion depuis Promise
    static async fromPromise<T>(promise: Promise<T>): TryAsync<T, Error> {
        try {
            const result = await promise;
            return this.success(result);
        } catch (error) {
            return this.failure(error instanceof Error ? error : new Error(String(error)));
        }
    }

    // Guard pour vérifier le succès
    static isSuccess<T, E>(result: Try<T, E>): result is { success: true; data: T } {
        return result.success;
    }

    // Guard pour vérifier l'échec
    static isFailure<T, E>(result: Try<T, E>): result is { success: false; error: E } {
        return !result.success;
    }
}

// Fonctions utilitaires pour la validation
export const validators = {
    required: (value: any) => value == null || value === '' ? 'Champ requis' : null,
    
    minLength: (min: number) => (value: string) => 
        value.length < min ? `Minimum ${min} caractères requis` : null,
    
    maxLength: (max: number) => (value: string) => 
        value.length > max ? `Maximum ${max} caractères autorisés` : null,
    
    email: (value: string) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email invalide',
    
    number: (value: any) => 
        isNaN(Number(value)) ? 'Doit être un nombre' : null,
    
    positive: (value: number) => 
        value <= 0 ? 'Doit être positif' : null
};

export function demonstrateTry() {
    // Tests basiques
    const successResult = TryExamples.success(42);
    const failureResult = TryExamples.failure("Erreur de test");

    // Test d'exécution avec gestion d'erreur
    const safeResult = TryExamples.attempt(() => {
        return JSON.parse('{"name": "Alice"}');
    });

    const unsafeResult = TryExamples.attempt(() => {
        return JSON.parse('invalid json');
    });

    // Tests de transformation
    const mapped = TryExamples.map(successResult, x => x * 2);
    const chained = TryExamples.flatMap(successResult, x => 
        TryExamples.success(x.toString())
    );

    // Tests de récupération de valeur
    const value = TryExamples.getOrElse(failureResult, "valeur par défaut");

    // Tests de validation
    const userInput = "test@example.com";
    const emailValidation = TryExamples.validate(userInput, [
        validators.required,
        validators.email,
        validators.minLength(5)
    ]);

    const invalidInput = "";
    const invalidValidation = TryExamples.validate(invalidInput, [
        validators.required,
        validators.email
    ]);

    // Test de combinaison
    const combined = TryExamples.combine(
        TryExamples.success("Alice"),
        TryExamples.success(25),
        TryExamples.success(true)
    );

    // Test de pipeline
    const processUser = TryExamples.pipeline(
        (name: string) => name.length > 0 
            ? TryExamples.success(name.trim()) 
            : TryExamples.failure("Nom vide"),
        (name: string) => TryExamples.success(name.toUpperCase()),
        (name: string) => name.length < 20 
            ? TryExamples.success(name) 
            : TryExamples.failure("Nom trop long")
    );

    const processedName = processUser("  alice  ");
    const processedInvalid = processUser("");

    // Collecte de résultats
    const results = [
        TryExamples.success(1),
        TryExamples.failure("erreur 1"),
        TryExamples.success(2),
        TryExamples.failure("erreur 2")
    ];
    const collected = TryExamples.collectResults(results);

    return {
        successResult,
        failureResult,
        safeResult,
        unsafeResult,
        mapped,
        chained,
        value,
        emailValidation,
        invalidValidation,
        combined,
        processedName,
        processedInvalid,
        collected
    };
}
