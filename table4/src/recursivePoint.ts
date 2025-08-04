// ============================================
// RECURSIVE POINT - Types récursifs
// ============================================

// Types récursifs pour structures d'arbre
type TreeNode<T> = {
    value: T;
    children: TreeNode<T>[];
};

type BinaryTreeNode<T> = {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
};

// Types récursifs pour listes chaînées
type LinkedListNode<T> = {
    value: T;
    next?: LinkedListNode<T>;
};

// Types récursifs pour JSON
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

// Types récursifs pour chemins
type DeepPath<T, K extends keyof T = keyof T> = 
    K extends string | number ?
        T[K] extends Record<string, any> ?
            `${K}` | `${K}.${DeepPath<T[K]>}` :
            `${K}` :
        never;

// Types pour navigation récursive
type DeepGet<T, P extends string> = 
    P extends `${infer Key}.${infer Rest}` ?
        Key extends keyof T ?
            DeepGet<T[Key], Rest> :
            never :
        P extends keyof T ?
            T[P] :
            never;

export class RecursiveExamples {
    // Traversée d'arbre en profondeur
    static traverseTree<T>(node: TreeNode<T>, visitor: (value: T) => void): void {
        visitor(node.value);
        for (const child of node.children) {
            this.traverseTree(child, visitor);
        }
    }

    // Recherche dans un arbre
    static findInTree<T>(node: TreeNode<T>, predicate: (value: T) => boolean): T | null {
        if (predicate(node.value)) {
            return node.value;
        }
        
        for (const child of node.children) {
            const found = this.findInTree(child, predicate);
            if (found !== null) {
                return found;
            }
        }
        
        return null;
    }

    // Calcul de la profondeur d'un arbre
    static getTreeDepth<T>(node: TreeNode<T>): number {
        if (node.children.length === 0) {
            return 1;
        }
        
        const childDepths = node.children.map(child => this.getTreeDepth(child));
        return 1 + Math.max(...childDepths);
    }

    // Collecte de toutes les valeurs
    static collectTreeValues<T>(node: TreeNode<T>): T[] {
        const values: T[] = [node.value];
        for (const child of node.children) {
            values.push(...this.collectTreeValues(child));
        }
        return values;
    }

    // Transformation récursive d'arbre
    static mapTree<T, U>(node: TreeNode<T>, mapper: (value: T) => U): TreeNode<U> {
        return {
            value: mapper(node.value),
            children: node.children.map(child => this.mapTree(child, mapper))
        };
    }

    // Navigation récursive dans un objet
    static deepGet<T extends Record<string, any>>(obj: T, path: string): any {
        const keys = path.split('.');
        let current: any = obj;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }
        
        return current;
    }

    // Mise à jour récursive
    static deepSet<T extends Record<string, any>>(obj: T, path: string, value: any): T {
        const keys = path.split('.');
        const result = { ...obj };
        let current: any = result;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            } else {
                current[key] = { ...current[key] };
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return result;
    }

    // Validation récursive de structure
    static validateStructure<T>(
        obj: any, 
        validator: (value: any) => boolean,
        recursive: boolean = true
    ): boolean {
        if (!validator(obj)) {
            return false;
        }
        
        if (recursive && typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                return obj.every(item => this.validateStructure(item, validator, recursive));
            } else {
                return Object.values(obj).every(value => 
                    this.validateStructure(value, validator, recursive)
                );
            }
        }
        
        return true;
    }

    // Aplatissement récursif
    static flatten<T>(arr: (T | T[])[]): T[] {
        const result: T[] = [];
        
        for (const item of arr) {
            if (Array.isArray(item)) {
                result.push(...this.flatten(item));
            } else {
                result.push(item);
            }
        }
        
        return result;
    }

    // Conversion d'arbre en liste plate
    static treeToList<T>(node: TreeNode<T>): Array<{ value: T; depth: number }> {
        const result: Array<{ value: T; depth: number }> = [];
        
        const traverse = (current: TreeNode<T>, depth: number) => {
            result.push({ value: current.value, depth });
            for (const child of current.children) {
                traverse(child, depth + 1);
            }
        };
        
        traverse(node, 0);
        return result;
    }
}

export function demonstrateRecursive() {
    // Création d'un arbre de test
    const tree: TreeNode<string> = {
        value: "root",
        children: [
            {
                value: "child1",
                children: [
                    { value: "grandchild1", children: [] },
                    { value: "grandchild2", children: [] }
                ]
            },
            {
                value: "child2",
                children: [
                    { value: "grandchild3", children: [] }
                ]
            }
        ]
    };

    // Tests des fonctions récursives
    const allValues = RecursiveExamples.collectTreeValues(tree);
    const depth = RecursiveExamples.getTreeDepth(tree);
    const found = RecursiveExamples.findInTree(tree, v => v.includes("grand"));
    const upperTree = RecursiveExamples.mapTree(tree, v => v.toUpperCase());
    const flatList = RecursiveExamples.treeToList(tree);

    // Test de navigation d'objet
    const testObj = {
        user: {
            profile: {
                name: "Alice",
                settings: {
                    theme: "dark"
                }
            }
        }
    };

    const name = RecursiveExamples.deepGet(testObj, "user.profile.name");
    const theme = RecursiveExamples.deepGet(testObj, "user.profile.settings.theme");
    const updated = RecursiveExamples.deepSet(testObj, "user.profile.age", 25);

    // Test d'aplatissement
    const nested = [1, [2, 3], [4, [5, 6]], 7];
    const flattened = RecursiveExamples.flatten(nested);

    return {
        tree,
        allValues,
        depth,
        found,
        upperTree,
        flatList,
        testObj,
        name,
        theme,
        updated,
        nested,
        flattened
    };
}
