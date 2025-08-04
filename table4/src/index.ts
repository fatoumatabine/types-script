// ============================================
// INDEX - Point d'entrée principal
// ============================================

import { demonstrateTuples } from './tuples';
import { demonstrateUnions } from './unions';
import { demonstrateIntersections } from './intersections';
import { demonstrateParsable } from './parsable';
import { demonstrateLastElement } from './lastElement';
import { demonstrateEven } from './even';
import { demonstrateUnshift } from './unshift';
import { demonstrateSelector } from './selector';
import { demonstrateSkip } from './skip';
import { demonstrateReducer } from './reducer';
import { demonstrateJoin } from './join';
import { demonstrateRecursive } from './recursivePoint';
import { demonstrateConcat } from './concat';
import { demonstrateSome } from './some';
import { demonstrateTry } from './try';

export function main() {
    const results = {
        tuples: demonstrateTuples(),
        unions: demonstrateUnions(),
        intersections: demonstrateIntersections(),
        parsable: demonstrateParsable(),
        lastElement: demonstrateLastElement(),
        even: demonstrateEven(),
        unshift: demonstrateUnshift(),
        selector: demonstrateSelector(),
        skip: demonstrateSkip(),
        reducer: demonstrateReducer(),
        join: demonstrateJoin(),
        recursive: demonstrateRecursive(),
        concat: demonstrateConcat(),
        some: demonstrateSome(),
        try: demonstrateTry()
    };

    return results;
}

// Exécution si ce fichier est le point d'entrée
if (require.main === module) {
    const results = main();
    
    // Affichage des résultats pour chaque concept
    Object.entries(results).forEach(([concept, result]) => {
        console.log(`\n=== ${concept.toUpperCase()} ===`);
        console.log(JSON.stringify(result, null, 2));
    });
}

export default main;
