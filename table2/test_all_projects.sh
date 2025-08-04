#!/bin/bash

# Script pour tester tous les projets TypeScript
echo "🚀 Test de tous les projets TypeScript dans table2"
echo "================================================="

cd "/home/syllafall/Documents/types_script_dossier/ts/table2"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

success_count=0
total_count=0

for dir in */; do
    if [ -f "$dir/tsconfig.json" ]; then
        echo -e "\n${BLUE}=== Test de $dir ===${NC}"
        ((total_count++))
        
        cd "$dir"
        
        # Compilation
        echo "📝 Compilation..."
        if tsc 2>/dev/null; then
            echo -e "${GREEN}✅ Compilation réussie${NC}"
            
            # Exécution
            echo "🏃 Exécution..."
            if timeout 10s node dist/index.js >/dev/null 2>&1; then
                echo -e "${GREEN}✅ Exécution réussie${NC}"
                ((success_count++))
            else
                echo -e "${RED}❌ Erreur d'exécution${NC}"
            fi
        else
            echo -e "${RED}❌ Erreur de compilation${NC}"
        fi
        
        cd ..
    fi
done

echo -e "\n${BLUE}=================================================${NC}"
echo -e "📊 Résultats: ${GREEN}$success_count/$total_count${NC} projets fonctionnels"

if [ $success_count -eq $total_count ]; then
    echo -e "${GREEN}🎉 Tous les projets TypeScript fonctionnent parfaitement !${NC}"
else
    echo -e "${RED}⚠️  Certains projets nécessitent des corrections${NC}"
fi
