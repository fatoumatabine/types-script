// ============================================
// PARSABLE - Analyse de données
// ============================================

// Types pour définir ce qui est analysable
type Parsable<T> = {
    parse(input: string): T | null;
    stringify(value: T): string;
    validate(value: unknown): value is T;
};

// Types de données analysables
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type DateFormat = "ISO" | "FR" | "US";

type NumberFormat = "integer" | "float" | "currency";

// Interfaces pour différents parsers
interface StringParser extends Parsable<string> {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}

interface NumberParser extends Parsable<number> {
    min?: number;
    max?: number;
    format: NumberFormat;
}

interface DateParser extends Parsable<Date> {
    format: DateFormat;
}

interface ArrayParser<T> extends Parsable<T[]> {
    itemParser: Parsable<T>;
    separator?: string;
}

interface ObjectParser<T> extends Parsable<T> {
    schema: { [K in keyof T]: Parsable<T[K]> };
}

// Résultats de parsing
type ParseResult<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

export class ParseableExamples {
    // Parser de chaînes avec validation
    static createStringParser(options: {
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
    } = {}): StringParser {
        return {
            parse(input: string): string | null {
                if (options.minLength && input.length < options.minLength) return null;
                if (options.maxLength && input.length > options.maxLength) return null;
                if (options.pattern && !options.pattern.test(input)) return null;
                return input;
            },
            stringify(value: string): string {
                return value;
            },
            validate(value: unknown): value is string {
                return typeof value === 'string';
            },
            ...options
        };
    }

    // Parser de nombres
    static createNumberParser(options: {
        min?: number;
        max?: number;
        format: NumberFormat;
    }): NumberParser {
        return {
            parse(input: string): number | null {
                let num: number;
                
                switch (options.format) {
                    case "integer":
                        num = parseInt(input, 10);
                        if (isNaN(num) || !Number.isInteger(num)) return null;
                        break;
                    case "float":
                        num = parseFloat(input);
                        if (isNaN(num)) return null;
                        break;
                    case "currency":
                        // Supporte format "€123.45" ou "123.45€"
                        const cleaned = input.replace(/[€$,\s]/g, '');
                        num = parseFloat(cleaned);
                        if (isNaN(num)) return null;
                        break;
                    default:
                        return null;
                }

                if (options.min !== undefined && num < options.min) return null;
                if (options.max !== undefined && num > options.max) return null;
                
                return num;
            },
            stringify(value: number): string {
                switch (options.format) {
                    case "integer":
                        return value.toString();
                    case "float":
                        return value.toFixed(2);
                    case "currency":
                        return `${value.toFixed(2)}€`;
                    default:
                        return value.toString();
                }
            },
            validate(value: unknown): value is number {
                return typeof value === 'number' && !isNaN(value);
            },
            format: options.format,
            ...options
        };
    }

    // Parser de dates
    static createDateParser(format: DateFormat): DateParser {
        return {
            parse(input: string): Date | null {
                let date: Date;
                
                switch (format) {
                    case "ISO":
                        date = new Date(input);
                        break;
                    case "FR":
                        // Format DD/MM/YYYY
                        const frMatch = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                        if (!frMatch) return null;
                        date = new Date(parseInt(frMatch[3]), parseInt(frMatch[2]) - 1, parseInt(frMatch[1]));
                        break;
                    case "US":
                        // Format MM/DD/YYYY
                        const usMatch = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                        if (!usMatch) return null;
                        date = new Date(parseInt(usMatch[3]), parseInt(usMatch[1]) - 1, parseInt(usMatch[2]));
                        break;
                    default:
                        return null;
                }

                return isNaN(date.getTime()) ? null : date;
            },
            stringify(value: Date): string {
                switch (format) {
                    case "ISO":
                        return value.toISOString().split('T')[0];
                    case "FR":
                        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()}`;
                    case "US":
                        return `${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getDate().toString().padStart(2, '0')}/${value.getFullYear()}`;
                    default:
                        return value.toString();
                }
            },
            validate(value: unknown): value is Date {
                return value instanceof Date && !isNaN(value.getTime());
            },
            format
        };
    }

    // Parser de tableaux
    static createArrayParser<T>(itemParser: Parsable<T>, separator: string = ","): ArrayParser<T> {
        return {
            parse(input: string): T[] | null {
                if (input.trim() === "") return [];
                
                const items = input.split(separator).map(item => item.trim());
                const parsed: T[] = [];

                for (const item of items) {
                    const parsedItem = itemParser.parse(item);
                    if (parsedItem === null) return null;
                    parsed.push(parsedItem);
                }

                return parsed;
            },
            stringify(value: T[]): string {
                return value.map(item => itemParser.stringify(item)).join(separator + " ");
            },
            validate(value: unknown): value is T[] {
                return Array.isArray(value) && value.every(item => itemParser.validate(item));
            },
            itemParser,
            separator
        };
    }

    // Parser avec résultat enrichi
    static parseWithResult<T>(parser: Parsable<T>, input: string): ParseResult<T> {
        try {
            const result = parser.parse(input);
            if (result === null) {
                return { success: false, error: `Impossible d'analyser: "${input}"` };
            }
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: `Erreur lors de l'analyse: ${error}` };
        }
    }

    // Validation en lot
    static validateBatch<T>(parser: Parsable<T>, inputs: string[]): {
        valid: T[];
        invalid: { input: string; error: string }[];
    } {
        const valid: T[] = [];
        const invalid: { input: string; error: string }[] = [];

        for (const input of inputs) {
            const result = this.parseWithResult(parser, input);
            if (result.success) {
                valid.push(result.data);
            } else {
                invalid.push({ input, error: result.error });
            }
        }

        return { valid, invalid };
    }

    // Parser composé pour objets
    static createObjectParser<T>(schema: { [K in keyof T]: Parsable<T[K]> }): ObjectParser<T> {
        return {
            parse(input: string): T | null {
                try {
                    const obj = JSON.parse(input);
                    const result = {} as T;

                    for (const [key, parser] of Object.entries(schema)) {
                        const value = obj[key];
                        if (value === undefined) return null;
                        
                        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
                        const parsed = (parser as Parsable<any>).parse(stringValue);
                        if (parsed === null) return null;
                        
                        (result as any)[key] = parsed;
                    }

                    return result;
                } catch {
                    return null;
                }
            },
            stringify(value: T): string {
                const obj: any = {};
                for (const [key, parser] of Object.entries(schema)) {
                    obj[key] = (parser as Parsable<any>).stringify((value as any)[key]);
                }
                return JSON.stringify(obj);
            },
            validate(value: unknown): value is T {
                if (typeof value !== 'object' || value === null) return false;
                
                for (const [key, parser] of Object.entries(schema)) {
                    if (!parser.validate((value as any)[key])) return false;
                }
                return true;
            },
            schema
        };
    }
}

// Types pour démonstration
type User = {
    name: string;
    age: number;
    email: string;
    birthDate: Date;
};

// Exemples d'usage
export function demonstrateParsable() {
    // console.log("=== DÉMONSTRATION DE PARSABLE ===");

    // Parsers basiques
    const emailParser = ParseableExamples.createStringParser({
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    });

    const ageParser = ParseableExamples.createNumberParser({
        min: 0,
        max: 150,
        format: "integer"
    });

    const priceParser = ParseableExamples.createNumberParser({
        min: 0,
        format: "currency"
    });

    const dateParser = ParseableExamples.createDateParser("FR");

    // Tests de parsing
    const emailTests = ["user@example.com", "invalid-email", "test@test.fr"];
    const emailResults = ParseableExamples.validateBatch(emailParser, emailTests);

    const ageTests = ["25", "150", "200", "abc"];
    const ageResults = ParseableExamples.validateBatch(ageParser, ageTests);

    const priceTests = ["€123.45", "67.89€", "invalid", "99.99"];
    const priceResults = ParseableExamples.validateBatch(priceParser, priceTests);

    const dateTests = ["15/03/2023", "32/01/2023", "01/12/2024"];
    const dateResults = ParseableExamples.validateBatch(dateParser, dateTests);

    // Parser de tableau
    const numberArrayParser = ParseableExamples.createArrayParser(
        ParseableExamples.createNumberParser({ format: "integer" })
    );

    const arrayTests = ["1,2,3,4", "10, 20, 30", "1,abc,3"];
    const arrayResults = ParseableExamples.validateBatch(numberArrayParser, arrayTests);

    return {
        emailResults,
        ageResults,
        priceResults,
        dateResults,
        arrayResults
    };
}
