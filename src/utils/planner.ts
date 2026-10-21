import { 
  Ingredient, 
  MealPlanSlot, 
  MealRecipe, 
  MealSlot, 
  ShoppingListItem, 
  UserFoodProfile, 
  WeekDay,
  NutritionalRole,
  IngredientSubstitutionOption
} from '../types';
import { INGREDIENTS_DATABASE, RECIPES_DATABASE } from '../data/initialData';

const ALL_DAYS: WeekDay[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function parseFreeTextInput(rawText: string, existing?: Partial<UserFoodProfile>): UserFoodProfile {
  const text = (rawText || '').toLowerCase();

  // Keyword detectors
  const isSinTacc = text.includes('sin tacc') || text.includes('celiac') || text.includes('gluten') || text.includes('sintacc');
  const isHighProtein = text.includes('proteína') || text.includes('proteina') || text.includes('muscular') || text.includes('hipertrofia') || text.includes('gym');
  const isVegetarian = text.includes('vegetariano') || text.includes('vegetariana') || text.includes('sin carne');
  const isVegan = text.includes('vegano') || text.includes('vegana') || text.includes('100% vegetal');
  const isCaloricDeficit = text.includes('déficit') || text.includes('deficit') || text.includes('bajar') || text.includes('reducir calorías') || text.includes('calorias');
  const isLactoseFree = text.includes('lactosa') || text.includes('sin lacteos') || text.includes('sin lácteos');

  // Time detection
  let timePreference: 'rapido' | 'medio' | 'tranquilo' = 'medio';
  if (text.includes('poco tiempo') || text.includes('rápido') || text.includes('rapido') || text.includes('15 min') || text.includes('20 min') || text.includes('apurado')) {
    timePreference = 'rapido';
  } else if (text.includes('tranquilo') || text.includes('40 min') || text.includes('tiempo de sobra')) {
    timePreference = 'tranquilo';
  }

  // Budget detection
  let budgetPreference: 'economico' | 'medio' | 'flexible' = 'medio';
  if (text.includes('gastar lo menos') || text.includes('económico') || text.includes('economico') || text.includes('barato') || text.includes('bajo presupuesto')) {
    budgetPreference = 'economico';
  } else if (text.includes('flexible') || text.includes('sin restriccion de presupuesto') || text.includes('alto presupuesto')) {
    budgetPreference = 'flexible';
  }

  // Allergies detection
  const detectedAllergies: string[] = [];
  if (text.includes('maní') || text.includes('mani')) detectedAllergies.push('maní');
  if (text.includes('pescado')) detectedAllergies.push('pescado');
  if (text.includes('huevo')) detectedAllergies.push('huevo');
  if (text.includes('soja')) detectedAllergies.push('soja');
  if (isLactoseFree) detectedAllergies.push('lactosa');

  // Nutritionist mention detection
  const mentionsNutritionist = text.includes('nutricionista') || text.includes('indicación') || text.includes('indicacion') || text.includes('médico') || text.includes('medico');

  // Days count default
  const daysCount = existing?.daysCount || 7;
  const mealsIncluded: MealSlot[] = existing?.mealsIncluded || (
    isHighProtein ? ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'] : ['Almuerzo', 'Cena']
  );

  return {
    rawGoalText: rawText,
    hasNutritionistIndication: existing?.hasNutritionistIndication ?? mentionsNutritionist,
    nutritionistIndicationText: existing?.nutritionistIndicationText || (
      mentionsNutritionist ? 'Indicación cargada: organizar según pautas profesionales respetando alimentos y momentos del día.' : ''
    ),
    daysCount,
    mealsIncluded,
    timePreference,
    budgetPreference,
    pantryIngredientsText: existing?.pantryIngredientsText || '',
    pantryIngredientsList: existing?.pantryIngredientsList || extractPantryItems(existing?.pantryIngredientsText || ''),
    excludedFoodsText: existing?.excludedFoodsText || '',
    excludedFoodsList: existing?.excludedFoodsList || extractExcludedItems(existing?.excludedFoodsText || ''),
    generalPreferencesText: existing?.generalPreferencesText || '',
    isSinTacc,
    isHighProtein,
    isVegetarian,
    isVegan,
    isCaloricDeficit,
    isLactoseFree,
    hasAllergies: detectedAllergies
  };
}

export function extractPantryItems(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[,;\n+y]/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 1 && !['tengo', 'en', 'casa', 'alacena', 'heladera'].includes(s));
}

export function extractExcludedItems(text: string): string[] {
  if (!text) return [];
  return text
    .split(/[,;\n+y]/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 1 && !['no', 'como', 'evitar', 'nada', 'de'].includes(s));
}

// Filter recipes matching user profile constraints
export function isRecipeCompatible(recipe: MealRecipe, profile: UserFoodProfile): boolean {
  // Sin TACC
  if (profile.isSinTacc && !recipe.tags.includes('sin_tacc')) {
    return false;
  }

  // Vegetarian / Vegan
  if (profile.isVegan && !recipe.tags.includes('vegano')) {
    return false;
  }
  if (profile.isVegetarian && !recipe.tags.includes('vegetariano') && !recipe.tags.includes('vegano')) {
    return false;
  }

  // Allergies
  if (profile.hasAllergies && profile.hasAllergies.length > 0) {
    const hasForbiddenAllergen = recipe.allergens.some(a => profile.hasAllergies.includes(a));
    if (hasForbiddenAllergen) return false;
  }

  // Excluded foods
  if (profile.excludedFoodsList && profile.excludedFoodsList.length > 0) {
    for (const excluded of profile.excludedFoodsList) {
      if (recipe.name.toLowerCase().includes(excluded)) return false;
      const ingredientNames = recipe.ingredients.map(ing => {
        const dbIng = INGREDIENTS_DATABASE[ing.ingredientId];
        return dbIng ? dbIng.name.toLowerCase() : '';
      });
      if (ingredientNames.some(name => name.includes(excluded))) return false;
    }
  }

  // Time preference constraint (soft filter for rapido <= 25 min)
  if (profile.timePreference === 'rapido' && recipe.prepTimeMin > 25) {
    return false;
  }

  return true;
}

export function generateMealPlan(profile: UserFoodProfile): MealPlanSlot[] {
  const days = ALL_DAYS.slice(0, profile.daysCount);
  const slots: MealPlanSlot[] = [];

  // Filter compatible recipes
  const compatibleRecipes = RECIPES_DATABASE.filter(r => isRecipeCompatible(r, profile));

  // If strict filtering is too empty, fallback to basic safe options
  const candidatePool = compatibleRecipes.length > 0 ? compatibleRecipes : RECIPES_DATABASE;

  days.forEach((day, dayIndex) => {
    profile.mealsIncluded.forEach((slotName) => {
      // Find candidate recipes for this specific meal slot
      let slotCandidates = candidatePool.filter(r => r.allowedSlots.includes(slotName));
      if (slotCandidates.length === 0) {
        slotCandidates = candidatePool;
      }

      // Prioritize high protein if requested
      if (profile.isHighProtein) {
        slotCandidates = [...slotCandidates].sort((a, b) => b.baseProtein - a.baseProtein);
      }

      // Pick recipe cyclically to ensure variety across days
      const chosenRecipe = slotCandidates[(dayIndex + slots.length) % slotCandidates.length];

      // Build meal slot
      const pantryKeywords = profile.pantryIngredientsList.map(p => p.toLowerCase());
      const mappedIngredients = chosenRecipe.ingredients.map(item => {
        const dbIng = INGREDIENTS_DATABASE[item.ingredientId] || {
          id: item.ingredientId,
          name: item.ingredientId,
          category: 'Otros' as const,
          nutritionalRole: 'condimento_almacen' as NutritionalRole,
          defaultUnit: item.unit,
          referencePriceARS: 1000,
          priceBasis: 'unidad',
          priceSource: 'SEPA / Precios Claros',
          priceDate: 'Octubre 2026',
          priceStore: 'Promedio cadenas minoristas informadas SEPA',
          isNaturallyGlutenFree: true,
          isIndustrialProduct: false,
          anmatAlgStatus: 'natural_safe' as const,
          allergens: [],
          nutritionPer100g: { calories: 100, protein: 5, carbs: 10, fat: 2 }
        };

        const isFromPantry = pantryKeywords.some(keyword => 
          dbIng.name.toLowerCase().includes(keyword) || 
          keyword.includes(dbIng.name.toLowerCase()) ||
          dbIng.id.includes(keyword)
        );

        return {
          ingredientId: dbIng.id,
          name: dbIng.name,
          category: dbIng.category,
          quantity: item.quantity,
          unit: item.unit,
          isFromPantry,
          referencePrice: dbIng.referencePriceARS,
          anmatAlgStatus: dbIng.anmatAlgStatus,
          anmatNote: dbIng.anmatNote,
          allergens: dbIng.allergens
        };
      });

      slots.push({
        id: `slot_${day}_${slotName}`,
        day,
        slot: slotName,
        recipeId: chosenRecipe.id,
        recipeName: chosenRecipe.name,
        prepTimeMin: chosenRecipe.prepTimeMin,
        calories: chosenRecipe.baseCalories,
        protein: chosenRecipe.baseProtein,
        carbs: chosenRecipe.baseCarbs,
        fat: chosenRecipe.baseFat,
        ingredients: mappedIngredients,
        instructions: [...chosenRecipe.instructions],
        originalRecipeId: chosenRecipe.id
      });
    });
  });

  return slots;
}

// -------------------------------------------------------------
// Contextual Ingredient Substitution Engine (Nutritional Role Matching)
// -------------------------------------------------------------

export function getContextualIngredientSubstitutions(
  originalIngredientId: string,
  originalQuantity: number,
  originalUnit: string,
  reason: 'no_tengo' | 'es_caro' | 'no_me_gusta' | 'otra_alternativa',
  profile: UserFoodProfile,
  slot: MealPlanSlot
): IngredientSubstitutionOption[] {
  const orig = INGREDIENTS_DATABASE[originalIngredientId];
  if (!orig) return [];

  // Determine equivalent roles
  const targetRoles: NutritionalRole[] = [orig.nutritionalRole];
  if (orig.nutritionalRole === 'proteina_principal') {
    targetRoles.push('legumbre_mixta');
  } else if (orig.nutritionalRole === 'legumbre_mixta') {
    targetRoles.push('proteina_principal');
  } else if (orig.nutritionalRole === 'lacteo_proteico') {
    targetRoles.push('proteina_principal');
  }

  // Calculate approximate original nutrition
  const origGrams = originalUnit === 'g' ? originalQuantity : originalUnit === 'u' ? 60 * originalQuantity : 50;
  const origProtein = Math.round((orig.nutritionPer100g.protein * origGrams) / 100);
  const origCalories = Math.round((orig.nutritionPer100g.calories * origGrams) / 100);

  // Original approximate cost
  let origEstimatedCost = orig.referencePriceARS;
  if (originalUnit === 'g') {
    origEstimatedCost = Math.round((orig.referencePriceARS / 1000) * originalQuantity);
  } else if (originalUnit === 'u') {
    origEstimatedCost = Math.round((orig.referencePriceARS / (orig.id === 'huevos' ? 6 : 1)) * originalQuantity);
  }

  const pantryKeywords = profile.pantryIngredientsList.map(p => p.toLowerCase());

  // Filter candidates from DB that match the nutritional function and respect ALL user constraints
  const candidates: IngredientSubstitutionOption[] = [];

  Object.values(INGREDIENTS_DATABASE).forEach(cand => {
    // 1. Cannot be the exact same ingredient
    if (cand.id === orig.id) return;

    // 2. Must match the functional nutritional role
    if (!targetRoles.includes(cand.nutritionalRole)) return;

    // 3. For 'no_me_gusta': do not offer identical family
    if (reason === 'no_me_gusta') {
      if (orig.id.includes('pollo') && cand.id.includes('pollo')) return;
      if (orig.id.includes('carne') && cand.id.includes('carne')) return;
    }

    // 4. Strict dietary restrictions
    if (profile.isSinTacc) {
      if (!cand.isNaturallyGlutenFree && cand.anmatAlgStatus !== 'verified') return;
      if (cand.allergens.includes('gluten')) return;
    }

    if (profile.isVegan) {
      if (['pollo_pechuga', 'carne_magra', 'atun_lata', 'huevos', 'queso_magro', 'yogur_griego'].includes(cand.id)) return;
    }

    if (profile.isVegetarian) {
      if (['pollo_pechuga', 'carne_magra', 'atun_lata'].includes(cand.id)) return;
    }

    if (profile.hasAllergies && profile.hasAllergies.length > 0) {
      if (cand.allergens.some(a => profile.hasAllergies.includes(a))) return;
    }

    if (profile.excludedFoodsList && profile.excludedFoodsList.length > 0) {
      if (profile.excludedFoodsList.some(ex => cand.name.toLowerCase().includes(ex) || cand.id.includes(ex))) return;
    }

    // 5. Preparation compatibility: in breakfast slots, keep breakfast-friendly foods
    if (slot.slot === 'Desayuno' || slot.slot === 'Merienda') {
      if (['carne_magra', 'pollo_pechuga', 'atun_lata'].includes(cand.id)) return;
    }

    // 6. Calculate equivalent quantity to match the nutritional role
    let newQty = 100;
    let newUnit = cand.defaultUnit;

    if (cand.id === 'huevos') {
      newQty = orig.nutritionalRole === 'proteina_principal' ? 2 : 1;
      newUnit = 'u';
    } else if (cand.id === 'atun_lata') {
      newQty = 1;
      newUnit = 'u';
    } else if (cand.id === 'tofu_firme') {
      newQty = 150;
      newUnit = 'g';
    } else if (cand.id === 'lentejas_secas' || cand.id === 'garbanzos_secos') {
      newQty = 80;
      newUnit = 'g';
    } else if (cand.id === 'pollo_pechuga') {
      newQty = 160;
      newUnit = 'g';
    } else if (cand.id === 'carne_magra') {
      newQty = 160;
      newUnit = 'g';
    } else if (cand.id === 'arroz_integral' || cand.id === 'quinoa' || cand.id === 'fideos_arroz') {
      newQty = 70;
      newUnit = 'g';
    } else if (cand.category === 'Frutas y verduras') {
      newQty = 1;
      newUnit = 'u';
    }

    // Calculate candidate nutrition
    const candGrams = newUnit === 'g' ? newQty : newUnit === 'u' ? (cand.id === 'huevos' ? 60 * newQty : 150) : 100;
    const candProtein = Math.round((cand.nutritionPer100g.protein * candGrams) / 100);
    const candCalories = Math.round((cand.nutritionPer100g.calories * candGrams) / 100);

    // Calculate candidate cost & impact
    let candCost = cand.referencePriceARS;
    if (newUnit === 'g') {
      candCost = Math.round((cand.referencePriceARS / 1000) * newQty);
    } else if (newUnit === 'u') {
      candCost = Math.round((cand.referencePriceARS / (cand.id === 'huevos' ? 6 : 1)) * newQty);
    }

    const costImpactARS = candCost - origEstimatedCost;

    // Check if user has it in pantry
    const isPantryAvailable = pantryKeywords.some(keyword => 
      cand.name.toLowerCase().includes(keyword) || 
      cand.id.includes(keyword) ||
      keyword.includes(cand.id.replace(/_/g, ' '))
    );

    // Craft explanation based on reason and nutritional match
    let explanation = '';
    const roleName = orig.nutritionalRole === 'proteina_principal' ? 'proteína principal'
      : orig.nutritionalRole === 'carbohidrato_base' ? 'fuente de carbohidratos complejos'
      : orig.nutritionalRole === 'legumbre_mixta' ? 'fuente vegetal de proteínas y fibra'
      : orig.nutritionalRole === 'vegetal_fibra' ? 'aporte de vegetales y fibra'
      : orig.nutritionalRole === 'grasa_saludable' ? 'aporte de grasas saludables'
      : 'función en la preparación';

    if (reason === 'es_caro') {
      if (costImpactARS < 0) {
        explanation = `Elegimos esta alternativa porque reduce el costo de la comida en ~$${Math.abs(costImpactARS).toLocaleString('es-AR')} según SEPA y mantiene un aporte de ${candProtein}g de proteína similar al original.`;
      } else {
        explanation = `Alternativa accesible que conserva la función de ${roleName} (~${candProtein}g de proteína) con precio de referencia controlado en SEPA.`;
      }
    } else if (reason === 'no_tengo') {
      if (isPantryAvailable) {
        explanation = `Elegimos esta alternativa porque ya la tenés cargada en tu alacena, evitando compras adicionales y cubriendo la misma función de ${roleName} (~${candProtein}g de proteína).`;
      } else {
        explanation = `Elegimos esta alternativa porque es de fácil acceso, mantiene una función equivalente de ${roleName} (~${candProtein}g de proteína) y se adapta a la cocción.`;
      }
    } else if (reason === 'no_me_gusta') {
      explanation = `Sustitución con un perfil de sabor distinto que conserva exactamente la función de ${roleName} (${candProtein}g de proteína) y compatibilidad con tus restricciones.`;
    } else {
      explanation = `Elegimos esta alternativa porque aporta una cantidad de ${roleName} similar (~${candProtein}g) y mantiene una función equivalente en la preparación.`;
    }

    candidates.push({
      replacementIngredientId: cand.id,
      replacementName: cand.name,
      reasonCategory: isPantryAvailable ? 'pantry' : costImpactARS < 0 ? 'budget' : 'equivalent',
      label: cand.name,
      explanation,
      newQuantity: newQty,
      newUnit,
      costImpactARS,
      isPantryAvailable,
      macroComparison: {
        proteinDiff: candProtein - origProtein,
        originalProtein: origProtein,
        newProtein: candProtein,
        caloriesDiff: candCalories - origCalories
      },
      anmatAlgStatus: cand.anmatAlgStatus
    });
  });

  // Rank and prioritize based on reason
  if (reason === 'no_tengo') {
    // Prioritize what is already in pantry first!
    candidates.sort((a, b) => {
      if (a.isPantryAvailable && !b.isPantryAvailable) return -1;
      if (!a.isPantryAvailable && b.isPantryAvailable) return 1;
      return Math.abs(a.macroComparison.proteinDiff) - Math.abs(b.macroComparison.proteinDiff);
    });
  } else if (reason === 'es_caro') {
    // Prioritize lowest cost impact (highest savings)
    candidates.sort((a, b) => a.costImpactARS - b.costImpactARS);
  } else {
    // Prioritize minimal protein difference
    candidates.sort((a, b) => Math.abs(a.macroComparison.proteinDiff) - Math.abs(b.macroComparison.proteinDiff));
  }

  // Return the top 2 or 3 curated valid alternatives
  return candidates.slice(0, 3);
}

// Adapt meal slot with selected option
export interface AdaptationResult {
  updatedSlot: MealPlanSlot;
  changeSummary: string;
  previousIngredientName: string;
  newIngredientName: string;
  costSavingsARS: number;
}

export function applyIngredientSubstitution(
  slot: MealPlanSlot,
  targetIngredientId: string,
  chosenOption: IngredientSubstitutionOption
): AdaptationResult {
  const currentSlot = JSON.parse(JSON.stringify(slot)) as MealPlanSlot;
  const target = currentSlot.ingredients.find(i => i.ingredientId === targetIngredientId);
  const replDb = INGREDIENTS_DATABASE[chosenOption.replacementIngredientId];

  let prevName = target ? target.name : 'ingrediente';
  let newName = chosenOption.replacementName;
  let savings = chosenOption.costImpactARS < 0 ? Math.abs(chosenOption.costImpactARS) : 0;

  if (target && replDb) {
    target.ingredientId = replDb.id;
    target.name = replDb.name;
    target.category = replDb.category;
    target.quantity = chosenOption.newQuantity;
    target.unit = chosenOption.newUnit;
    target.referencePrice = replDb.referencePriceARS;
    target.anmatAlgStatus = replDb.anmatAlgStatus;
    target.anmatNote = replDb.anmatNote;
    target.allergens = replDb.allergens;
    target.isFromPantry = chosenOption.isPantryAvailable;

    // Update macros proportionally on the slot
    currentSlot.protein = Math.max(12, currentSlot.protein + chosenOption.macroComparison.proteinDiff);
    currentSlot.calories = Math.max(250, currentSlot.calories + chosenOption.macroComparison.caloriesDiff);

    // Update title smoothly
    if (prevName.toLowerCase().includes('pollo') && newName.toLowerCase().includes('lentejas')) {
      currentSlot.recipeName = currentSlot.recipeName.replace(/pollo/gi, 'lentejas');
    } else if (prevName.toLowerCase().includes('pollo') && newName.toLowerCase().includes('atún')) {
      currentSlot.recipeName = currentSlot.recipeName.replace(/pollo/gi, 'atún');
    } else if (prevName.toLowerCase().includes('pollo') && newName.toLowerCase().includes('huevo')) {
      currentSlot.recipeName = currentSlot.recipeName.replace(/pollo/gi, 'huevo');
    } else if (prevName.toLowerCase().includes('pollo') && newName.toLowerCase().includes('tofu')) {
      currentSlot.recipeName = currentSlot.recipeName.replace(/pollo/gi, 'tofu');
    }

    currentSlot.adaptationNote = `Adaptada: se reemplazó ${prevName} por ${newName}. ${chosenOption.explanation}`;
  }

  const changeSummary = `Se reemplazó ${prevName} por ${newName}. ${savings > 0 ? `Ahorro estimado: ~$${savings.toLocaleString('es-AR')}.` : ''}`;

  return {
    updatedSlot: currentSlot,
    changeSummary,
    previousIngredientName: prevName,
    newIngredientName: newName,
    costSavingsARS: savings
  };
}

// Generate dynamic shopping list with SEPA Argentine pricing
export function generateDynamicShoppingList(
  mealSlots: MealPlanSlot[],
  pantryKeywords: string[],
  purchasedItemIds: Set<string>,
  manualPantryItemIds: Set<string>
): ShoppingListItem[] {
  const aggregatedMap: Record<string, {
    ingredientId: string;
    name: string;
    category: any;
    totalQuantity: number;
    unit: string;
    estimatedPrice: number;
    priceSource: string;
    priceStore: string;
    anmatAlgStatus: any;
    anmatNote?: string;
    allergens: string[];
    linkedMeals: { day: WeekDay; slot: MealSlot; mealName: string }[];
  }> = {};

  mealSlots.forEach(slot => {
    slot.ingredients.forEach(ing => {
      const dbIng = INGREDIENTS_DATABASE[ing.ingredientId] || {
        id: ing.ingredientId,
        name: ing.name,
        category: ing.category,
        nutritionalRole: 'condimento_almacen' as NutritionalRole,
        defaultUnit: ing.unit,
        referencePriceARS: 1000,
        priceBasis: 'unidad',
        priceSource: 'SEPA / Precios Claros',
        priceDate: 'Octubre 2026',
        priceStore: 'Promedio cadenas minoristas informadas SEPA',
        isNaturallyGlutenFree: true,
        isIndustrialProduct: false,
        anmatAlgStatus: ing.anmatAlgStatus,
        anmatNote: ing.anmatNote,
        allergens: ing.allergens
      };

      if (!aggregatedMap[dbIng.id]) {
        aggregatedMap[dbIng.id] = {
          ingredientId: dbIng.id,
          name: dbIng.name,
          category: dbIng.category,
          totalQuantity: 0,
          unit: ing.unit,
          estimatedPrice: dbIng.referencePriceARS,
          priceSource: dbIng.priceSource || 'SEPA / Precios Claros',
          priceStore: dbIng.priceStore || 'Promedio cadenas minoristas informadas SEPA',
          anmatAlgStatus: dbIng.anmatAlgStatus,
          anmatNote: dbIng.anmatNote,
          allergens: dbIng.allergens,
          linkedMeals: []
        };
      }

      aggregatedMap[dbIng.id].totalQuantity += ing.quantity;
      aggregatedMap[dbIng.id].linkedMeals.push({
        day: slot.day,
        slot: slot.slot,
        mealName: slot.recipeName
      });
    });
  });

  return Object.values(aggregatedMap).map(item => {
    // Check if in pantry
    const inInitialPantry = pantryKeywords.some(keyword => 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.ingredientId.toLowerCase().includes(keyword.toLowerCase())
    );
    const isInPantry = inInitialPantry || manualPantryItemIds.has(item.ingredientId);
    const isPurchased = purchasedItemIds.has(item.ingredientId);

    // Calculate approximate price based on quantity
    let estimatedItemTotal = item.estimatedPrice;
    if (item.unit === 'g') {
      estimatedItemTotal = Math.round((item.estimatedPrice / 1000) * item.totalQuantity);
      if (estimatedItemTotal < 500) estimatedItemTotal = Math.max(estimatedItemTotal, 600); // min package
    } else if (item.unit === 'u') {
      const divisor = item.ingredientId === 'huevos' ? 6 : 1;
      estimatedItemTotal = Math.round((item.estimatedPrice / divisor) * item.totalQuantity);
    }

    return {
      id: item.ingredientId,
      ingredientId: item.ingredientId,
      name: item.name,
      category: item.category,
      totalQuantity: Math.round(item.totalQuantity * 10) / 10,
      unit: item.unit,
      estimatedPrice: estimatedItemTotal,
      priceSource: item.priceSource,
      priceStore: item.priceStore,
      isPurchased,
      isInPantry,
      anmatAlgStatus: item.anmatAlgStatus,
      anmatNote: item.anmatNote,
      allergens: item.allergens,
      linkedMeals: item.linkedMeals
    };
  });
}
