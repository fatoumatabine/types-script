// ============================================
// JOIN - Jointure de types
// ============================================

// Types pour joindre des chaînes
type Join<T extends readonly string[], Separator extends string = ","> = 
    T extends readonly [infer First, ...infer Rest] ?
        First extends string ?
            Rest extends readonly string[] ?
                Rest['length'] extends 0 ?
                    First :
                    `${First}${Separator}${Join<Rest, Separator>}` :
                First :
            never :
        "";

// Types pour joindre avec des préfixes/suffixes
type JoinWithWrapper<T extends readonly string[], Prefix extends string, Suffix extends string> = 
    T extends readonly [infer First, ...infer Rest] ?
        First extends string ?
            Rest extends readonly string[] ?
                Rest['length'] extends 0 ?
                    `${Prefix}${First}${Suffix}` :
                    `${Prefix}${First}${Suffix}, ${JoinWithWrapper<Rest, Prefix, Suffix>}` :
                `${Prefix}${First}${Suffix}` :
            never :
        "";

export class JoinExamples {
    static join<T extends readonly string[]>(arr: T, separator: string = ","): Join<T, typeof separator> {
        return arr.join(separator) as Join<T, typeof separator>;
    }

    static joinWithWrapper<T extends readonly string[]>(
        arr: T, 
        prefix: string, 
        suffix: string
    ): string {
        return arr.map(item => `${prefix}${item}${suffix}`).join(", ");
    }

    static createPath<T extends readonly string[]>(segments: T): string {
        return this.join(segments, "/");
    }

    static createCSV<T extends Record<string, string | number>>(
        data: T[], 
        headers: (keyof T)[]
    ): string {
        const headerRow = this.join(headers.map(String), ",");
        const dataRows = data.map(row => 
            this.join(headers.map(h => String(row[h])), ",")
        );
        return [headerRow, ...dataRows].join("\n");
    }

    static createSQLSelect<T extends readonly string[]>(
        columns: T, 
        table: string
    ): string {
        const columnList = this.join(columns, ", ");
        return `SELECT ${columnList} FROM ${table}`;
    }
}

export function demonstrateJoin() {
    const fruits = ["apple", "banana", "cherry"] as const;
    const joined = JoinExamples.join(fruits, " - ");
    
    const path = JoinExamples.createPath(["home", "user", "documents"] as const);
    
    const data = [
        { name: "Alice", age: 25, city: "Paris" },
        { name: "Bob", age: 30, city: "London" }
    ];
    const csv = JoinExamples.createCSV(data, ["name", "age", "city"]);
    
    const sql = JoinExamples.createSQLSelect(["name", "email"] as const, "users");
    
    return { fruits, joined, path, csv, sql };
}
