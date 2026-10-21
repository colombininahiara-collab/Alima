export type MealSlot = 'Desayuno' | 'Almuerzo' | 'Merienda' | 'Cena';

export type WeekDay = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export type IngredientCategory = 
  | 'Frutas y verduras'
  | 'Proteínas'
  | 'Lácteos y alternativas'
  | 'Almacén'
  | 'Otros';

export type AnmatAlgStatus = 
  | 'natural_safe'   // Naturally gluten-free (e.g. fresh vegetables, fresh beef)
  | 'verified'       // Processed product registered in ANMAT ALG list
  | 'unverified'     // Processed product not verified or requiring user packaging check
  | 'not_applicable';

export type NutritionalRole = 
  | 'proteina_principal'
  | 'carbohidrato_base'
  | 'legumbre_mixta'
  | 'vegetal_fibra'
  | 'grasa_saludable'
  | 'lacteo_proteico'
  | 'condimento_almacen';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  nutritionalRole: NutritionalRole;
  defaultUnit: string;
  referencePriceARS: number; // Demo reference price based on SEPA / Precios Claros
  priceBasis: string;        // e.g. "kg", "unidad", "paquete 500g"
  priceSource: string;       // "SEPA / Precios Claros"
  priceDate: string;         // e.g. "Octubre 2026"
  priceStore: string;        // "Promedio cadenas minoristas informadas SEPA"
  isNaturallyGlutenFree: boolean;
  isIndustrialProduct: boolean;
  anmatAlgStatus: AnmatAlgStatus;
  anmatNote?: string;
  allergens: string[];       // ['gluten', 'lactosa', 'huevo', 'pescado', 'soja', 'maní', 'frutos secos']
  allergenDeclaration?: {
    contains: string[];
    mayContain: string[];
  };
  nutritionPer100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
}

export interface IngredientSubstitutionOption {
  replacementIngredientId: string;
  replacementName: string;
  reasonCategory: 'pantry' | 'budget' | 'preference' | 'equivalent';
  label: string;
  explanation: string;
  newQuantity: number;
  newUnit: string;
  costImpactARS: number; // negative if saves money
  isPantryAvailable: boolean;
  macroComparison: {
    proteinDiff: number; // e.g. -2g, +1g
    originalProtein: number;
    newProtein: number;
    caloriesDiff: number;
  };
  anmatAlgStatus: AnmatAlgStatus;
}

export interface MealRecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
  note?: string;
  isOptional?: boolean;
}

export interface MealRecipe {
  id: string;
  name: string;
  allowedSlots: MealSlot[];
  prepTimeMin: number;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFat: number;
  tags: string[]; // e.g. 'sin_tacc', 'alta_proteina', 'vegetariano', 'vegano', 'economico', 'rapido', 'pescado'
  ingredients: MealRecipeIngredient[];
  instructions: string[];
  quickTips?: string;
  allergens: string[];
  substitutions: {
    [originalIngredientId: string]: {
      replacementIngredientId: string;
      reason: string; // e.g. "Económico", "Sin pollo", "Pantry", "Rápido"
      quantityFactor?: number;
      label: string;
    }[];
  };
}

export interface MealPlanSlot {
  id: string;
  day: WeekDay;
  slot: MealSlot;
  recipeId: string;
  recipeName: string;
  prepTimeMin: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: {
    ingredientId: string;
    name: string;
    category: IngredientCategory;
    quantity: number;
    unit: string;
    isFromPantry: boolean;
    referencePrice: number;
    anmatAlgStatus: AnmatAlgStatus;
    anmatNote?: string;
    allergens: string[];
  }[];
  instructions: string[];
  adaptationNote?: string;
  originalRecipeId?: string;
}

export interface UserFoodProfile {
  rawGoalText: string;
  hasNutritionistIndication: boolean;
  nutritionistIndicationText: string;
  daysCount: 1 | 3 | 5 | 7;
  mealsIncluded: MealSlot[];
  timePreference: 'rapido' | 'medio' | 'tranquilo'; // rapido: <=20min, medio: 25-35min, tranquilo: 40+min
  budgetPreference: 'economico' | 'medio' | 'flexible';
  pantryIngredientsText: string;
  pantryIngredientsList: string[];
  excludedFoodsText: string;
  excludedFoodsList: string[];
  generalPreferencesText: string;
  // Detected criteria
  isSinTacc: boolean;
  isHighProtein: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isCaloricDeficit: boolean;
  isLactoseFree: boolean;
  hasAllergies: string[];
}

export interface ShoppingListItem {
  id: string;
  ingredientId: string;
  name: string;
  category: IngredientCategory;
  totalQuantity: number;
  unit: string;
  estimatedPrice: number;
  priceSource: string;
  priceStore: string;
  isPurchased: boolean;
  isInPantry: boolean; // "Ya lo tengo"
  anmatAlgStatus: AnmatAlgStatus;
  anmatNote?: string;
  allergens: string[];
  linkedMeals: { day: WeekDay; slot: MealSlot; mealName: string }[];
}
