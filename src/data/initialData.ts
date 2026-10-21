import { Ingredient, MealRecipe, UserFoodProfile } from '../types';

export const INGREDIENTS_DATABASE: Record<string, Ingredient> = {
  // Frutas y verduras (Naturalmente libres de gluten)
  'pollo_pechuga': {
    id: 'pollo_pechuga',
    name: 'Pechuga de pollo fresca',
    category: 'Proteínas',
    nutritionalRole: 'proteina_principal',
    defaultUnit: 'g',
    referencePriceARS: 4200, // per 1000g
    priceBasis: 'kg',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    anmatNote: 'Alimento fresco naturally libre de gluten sin industrializar',
    allergens: [],
    nutritionPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  },
  'arroz_integral': {
    id: 'arroz_integral',
    name: 'Arroz integral envasado',
    category: 'Almacén',
    nutritionalRole: 'carbohidrato_base',
    defaultUnit: 'g',
    referencePriceARS: 1850, // per 1000g
    priceBasis: 'paquete 1kg',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Inscripto y verificado en el Listado Oficial Integrado ALG - ANMAT con logo oficial',
    allergens: [],
    nutritionPer100g: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8 }
  },
  'zanahoria': {
    id: 'zanahoria',
    name: 'Zanahoria fresca',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 350,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    anmatNote: 'Verdura fresca naturally libre de gluten',
    allergens: [],
    nutritionPer100g: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8 }
  },
  'morron_rojo': {
    id: 'morron_rojo',
    name: 'Morrón rojo fresco',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 950,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    anmatNote: 'Vegetal fresco naturally libre de gluten',
    allergens: [],
    nutritionPer100g: { calories: 31, protein: 1.0, carbs: 6.0, fat: 0.3 }
  },
  'cebolla': {
    id: 'cebolla',
    name: 'Cebolla común',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 300,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 }
  },
  'tomate': {
    id: 'tomate',
    name: 'Tomate perita fresco',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 400,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }
  },
  'espinaca_fresca': {
    id: 'espinaca_fresca',
    name: 'Espinaca fresca lavada',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'g',
    referencePriceARS: 900,
    priceBasis: 'atado 300g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 }
  },
  'zucchini': {
    id: 'zucchini',
    name: 'Zucchini / Calabacín',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 500,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 }
  },
  'palta': {
    id: 'palta',
    name: 'Palta Hass fresca',
    category: 'Frutas y verduras',
    nutritionalRole: 'grasa_saludable',
    defaultUnit: 'u',
    referencePriceARS: 1200,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7 }
  },
  'banana': {
    id: 'banana',
    name: 'Banana madura',
    category: 'Frutas y verduras',
    nutritionalRole: 'carbohidrato_base',
    defaultUnit: 'u',
    referencePriceARS: 350,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 }
  },
  'manzana': {
    id: 'manzana',
    name: 'Manzana roja',
    category: 'Frutas y verduras',
    nutritionalRole: 'vegetal_fibra',
    defaultUnit: 'u',
    referencePriceARS: 450,
    priceBasis: 'unidad',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Verdulerías de referencia minorista',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 }
  },

  // Proteínas
  'huevos': {
    id: 'huevos',
    name: 'Huevos de campo',
    category: 'Proteínas',
    nutritionalRole: 'proteina_principal',
    defaultUnit: 'u',
    referencePriceARS: 2200, // per 6 units
    priceBasis: 'maple x6 u',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    anmatNote: 'Alimento naturally libre de gluten',
    allergens: ['huevo'],
    allergenDeclaration: { contains: ['huevo'], mayContain: [] },
    nutritionPer100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11 }
  },
  'lentejas_secas': {
    id: 'lentejas_secas',
    name: 'Lentejas secas seleccionadas',
    category: 'Proteínas',
    nutritionalRole: 'legumbre_mixta',
    defaultUnit: 'g',
    referencePriceARS: 1400,
    priceBasis: 'paquete 500g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Legumbre seleccionada inscripta en Listado ANMAT ALG con sello Sin TACC',
    allergens: [],
    nutritionPer100g: { calories: 116, protein: 9.0, carbs: 20, fat: 0.4, fiber: 7.9 }
  },
  'garbanzos_secos': {
    id: 'garbanzos_secos',
    name: 'Garbanzos secos seleccionados',
    category: 'Proteínas',
    nutritionalRole: 'legumbre_mixta',
    defaultUnit: 'g',
    referencePriceARS: 1500,
    priceBasis: 'paquete 500g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Inscripto en Listado ANMAT ALG',
    allergens: [],
    nutritionPer100g: { calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6 }
  },
  'atun_lata': {
    id: 'atun_lata',
    name: 'Atún al natural en lata',
    category: 'Proteínas',
    nutritionalRole: 'proteina_principal',
    defaultUnit: 'u',
    referencePriceARS: 2100,
    priceBasis: 'lata 170g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: false,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Conservas de pescado envasadas: marca certificada en Listado ANMAT ALG Sin TACC',
    allergens: ['pescado'],
    allergenDeclaration: { contains: ['pescado'], mayContain: [] },
    nutritionPer100g: { calories: 116, protein: 26, carbs: 0, fat: 1.0 }
  },
  'tofu_firme': {
    id: 'tofu_firme',
    name: 'Tofu orgánico firme',
    category: 'Proteínas',
    nutritionalRole: 'proteina_principal',
    defaultUnit: 'g',
    referencePriceARS: 2300,
    priceBasis: 'bloque 350g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Tiendas naturistas y cadenas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Tofu de soja certificado libre de gluten con logo Sin TACC',
    allergens: ['soja'],
    allergenDeclaration: { contains: ['soja'], mayContain: [] },
    nutritionPer100g: { calories: 144, protein: 17, carbs: 2.8, fat: 8.7 }
  },
  'carne_magra': {
    id: 'carne_magra',
    name: 'Carne vacuna magra (bola de lomo o cuadril)',
    category: 'Proteínas',
    nutritionalRole: 'proteina_principal',
    defaultUnit: 'g',
    referencePriceARS: 5900,
    priceBasis: 'kg',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Carnicerías y cadenas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: false,
    anmatAlgStatus: 'natural_safe',
    allergens: [],
    nutritionPer100g: { calories: 180, protein: 26, carbs: 0, fat: 8 }
  },

  // Lácteos y alternativas
  'yogur_griego': {
    id: 'yogur_griego',
    name: 'Yogur natural alto en proteínas (estilo griego)',
    category: 'Lácteos y alternativas',
    nutritionalRole: 'lacteo_proteico',
    defaultUnit: 'g',
    referencePriceARS: 1600,
    priceBasis: 'pote 200g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Lácteo fermentado certificado en Listado Oficial ANMAT ALG Sin TACC',
    allergens: ['lactosa', 'leche'],
    allergenDeclaration: { contains: ['leche'], mayContain: [] },
    nutritionPer100g: { calories: 97, protein: 10, carbs: 3.6, fat: 5 }
  },
  'queso_magro': {
    id: 'queso_magro',
    name: 'Queso magro / Port Salut sin sal',
    category: 'Lácteos y alternativas',
    nutritionalRole: 'lacteo_proteico',
    defaultUnit: 'g',
    referencePriceARS: 2800,
    priceBasis: 'trozo 300g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Queso con certificación oficial ANMAT ALG libre de gluten',
    allergens: ['lactosa', 'leche'],
    allergenDeclaration: { contains: ['leche'], mayContain: [] },
    nutritionPer100g: { calories: 230, protein: 24, carbs: 1.5, fat: 14 }
  },
  'bebida_almendras': {
    id: 'bebida_almendras',
    name: 'Bebida vegetal de almendras sin azúcar',
    category: 'Lácteos y alternativas',
    nutritionalRole: 'lacteo_proteico',
    defaultUnit: 'ml',
    referencePriceARS: 2600,
    priceBasis: 'litro 1L',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Bebida vegetal certificada Sin TACC en listado ANMAT',
    allergens: ['frutos secos'],
    allergenDeclaration: { contains: ['frutos secos (almendras)'], mayContain: [] },
    nutritionPer100g: { calories: 24, protein: 1.0, carbs: 0.3, fat: 2.1 }
  },

  // Almacén
  'avena_sin_tacc': {
    id: 'avena_sin_tacc',
    name: 'Avena pura certificada Sin TACC',
    category: 'Almacén',
    nutritionalRole: 'carbohidrato_base',
    defaultUnit: 'g',
    referencePriceARS: 2200,
    priceBasis: 'paquete 400g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Dietéticas y cadenas informadas SEPA',
    isNaturallyGlutenFree: false,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Avena apta celíacos con lote certificado en Listado ANMAT ALG (<10 ppm de gluten)',
    allergens: [],
    nutritionPer100g: { calories: 389, protein: 16.9, carbs: 66, fat: 6.9, fiber: 10.6 }
  },
  'fideos_arroz': {
    id: 'fideos_arroz',
    name: 'Fideos secos a base de arroz y maíz',
    category: 'Almacén',
    nutritionalRole: 'carbohidrato_base',
    defaultUnit: 'g',
    referencePriceARS: 1900,
    priceBasis: 'paquete 500g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: false,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Pasta seca registrada en Listado Oficial ANMAT ALG',
    allergens: [],
    nutritionPer100g: { calories: 350, protein: 7.2, carbs: 78, fat: 1.2 }
  },
  'aceite_oliva': {
    id: 'aceite_oliva',
    name: 'Aceite de oliva virgen extra',
    category: 'Almacén',
    nutritionalRole: 'grasa_saludable',
    defaultUnit: 'cda',
    referencePriceARS: 6500,
    priceBasis: 'botella 500ml',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Aceite puro 100% oliva inscripto en ANMAT ALG',
    allergens: [],
    nutritionPer100g: { calories: 884, protein: 0, carbs: 0, fat: 100 }
  },
  'quinoa': {
    id: 'quinoa',
    name: 'Quinoa blanca lavada',
    category: 'Almacén',
    nutritionalRole: 'carbohidrato_base',
    defaultUnit: 'g',
    referencePriceARS: 2400,
    priceBasis: 'paquete 500g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Pseudocereal inscripto con logo oficial Sin TACC',
    allergens: [],
    nutritionPer100g: { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.8 }
  },
  'caldo_industrial': {
    id: 'caldo_industrial',
    name: 'Caldo de verduras comercial común',
    category: 'Almacén',
    nutritionalRole: 'condimento_almacen',
    defaultUnit: 'u',
    referencePriceARS: 600,
    priceBasis: 'cajita x2 cubos',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Promedio cadenas minoristas informadas SEPA',
    isNaturallyGlutenFree: false,
    isIndustrialProduct: true,
    anmatAlgStatus: 'unverified',
    anmatNote: 'NO VERIFICADO: No pudimos verificar este producto como libre de gluten. Revisá el rótulo y el listado oficial de ANMAT antes de consumirlo.',
    allergens: ['gluten', 'soja'],
    allergenDeclaration: { contains: [], mayContain: ['gluten', 'trigo', 'soja'] },
    nutritionPer100g: { calories: 180, protein: 5, carbs: 20, fat: 8 }
  },

  // Otros
  'semillas_chia': {
    id: 'semillas_chia',
    name: 'Semillas de chía agroecológicas',
    category: 'Otros',
    nutritionalRole: 'grasa_saludable',
    defaultUnit: 'g',
    referencePriceARS: 1200,
    priceBasis: 'bolsa 200g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Dietéticas y cadenas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Semillas puras certificadas Sin TACC',
    allergens: [],
    nutritionPer100g: { calories: 486, protein: 16.5, carbs: 42, fat: 30.7, fiber: 34.4 }
  },
  'nueces': {
    id: 'nueces',
    name: 'Mariposas de nuez peladas',
    category: 'Otros',
    nutritionalRole: 'grasa_saludable',
    defaultUnit: 'g',
    referencePriceARS: 2500,
    priceBasis: 'bolsa 150g',
    priceSource: 'SEPA / Precios Claros',
    priceDate: 'Octubre 2026',
    priceStore: 'Dietéticas y cadenas informadas SEPA',
    isNaturallyGlutenFree: true,
    isIndustrialProduct: true,
    anmatAlgStatus: 'verified',
    anmatNote: 'Fruto seco envasado con verificación de no contaminación cruzada',
    allergens: ['frutos secos'],
    allergenDeclaration: { contains: ['frutos secos (nueces)'], mayContain: ['maní'] },
    nutritionPer100g: { calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2 }
  }
};

export const RECIPES_DATABASE: MealRecipe[] = [
  // 1. Pollo salteado con arroz y verduras (The archetype meal from prompt)
  {
    id: 'pollo_arroz_verduras',
    name: 'Pollo salteado con arroz y verduras',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 25,
    baseCalories: 480,
    baseProtein: 38,
    baseCarbs: 52,
    baseFat: 12,
    tags: ['sin_tacc', 'alta_proteina', 'economico', 'masa_muscular'],
    ingredients: [
      { ingredientId: 'pollo_pechuga', quantity: 180, unit: 'g' },
      { ingredientId: 'arroz_integral', quantity: 70, unit: 'g' },
      { ingredientId: 'zanahoria', quantity: 1, unit: 'u' },
      { ingredientId: 'morron_rojo', quantity: 0.5, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Hervir el arroz integral según las instrucciones del envase (aprox. 18-20 min con olla tapada).',
      'Cortar la pechuga de pollo en cubos parejos de 2 cm y las verduras (zanahoria y morrón) en tiras finas.',
      'Calentar una sartén o wok con una cucharada de aceite de oliva a fuego medio-alto.',
      'Dorar el pollo durante 5-6 minutos hasta que esté cocido en el centro.',
      'Agregar las verduras y saltear 4 minutos más manteniendo un punto crocante.',
      'Incorporar el arroz ya escurrido a la sartén, mezclar 1 minuto para integrar sabores y servir caliente.'
    ],
    quickTips: 'Si cocinás arroz con anticipación para varios días, esta comida se prepara en menos de 10 minutos.',
    allergens: [],
    substitutions: {
      'pollo_pechuga': [
        { replacementIngredientId: 'tofu_firme', reason: 'Opción vegetariana / vegetal', label: 'Tofu firme marinado (vegetariano)', quantityFactor: 1.1 },
        { replacementIngredientId: 'lentejas_secas', reason: 'Es muy caro / Más económico', label: 'Lentejas cocidas (ahorro económico)', quantityFactor: 0.7 },
        { replacementIngredientId: 'huevos', reason: 'No tengo pollo / Fácil en casa', label: '2 Huevos revueltos rápidos', quantityFactor: 0.012 },
        { replacementIngredientId: 'atun_lata', reason: 'Sin cocinar carne / Rápido', label: 'Atún al natural en lata', quantityFactor: 0.006 }
      ],
      'arroz_integral': [
        { replacementIngredientId: 'quinoa', reason: 'Mayor contenido proteico', label: 'Quinoa blanca', quantityFactor: 1.0 },
        { replacementIngredientId: 'fideos_arroz', reason: 'Variedad de hidratos', label: 'Fideos de arroz salteados', quantityFactor: 1.1 }
      ],
      'morron_rojo': [
        { replacementIngredientId: 'zucchini', reason: 'No consigo o no me gusta el morrón', label: 'Zucchini en rodajas', quantityFactor: 1.0 },
        { replacementIngredientId: 'espinaca_fresca', reason: 'Ingrediente de hojas verdes', label: 'Espinaca fresca salteada', quantityFactor: 150 }
      ]
    }
  },

  // 2. Omelette proteico de espinaca, queso magro y tomate
  {
    id: 'omelette_espinaca_queso',
    name: 'Omelette proteico de espinaca y queso con ensalada',
    allowedSlots: ['Almuerzo', 'Cena', 'Desayuno'],
    prepTimeMin: 15,
    baseCalories: 360,
    baseProtein: 32,
    baseCarbs: 10,
    baseFat: 20,
    tags: ['sin_tacc', 'alta_proteina', 'rapido', 'vegetariano', 'economico', 'deficit_calorico'],
    ingredients: [
      { ingredientId: 'huevos', quantity: 3, unit: 'u' },
      { ingredientId: 'espinaca_fresca', quantity: 80, unit: 'g' },
      { ingredientId: 'queso_magro', quantity: 60, unit: 'g' },
      { ingredientId: 'tomate', quantity: 1, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 0.5, unit: 'cda' }
    ],
    instructions: [
      'Lavar la espinaca y picarla finamente. Cortar el queso magro en cubitos pequeños.',
      'En un bowl, batir con tenedor los 3 huevos con una pizca de sal y pimienta.',
      'Poner una sartén antiadherente a fuego bajo con un hilo de aceite de oliva.',
      'Volcar los huevos batidos y esparcir la espinaca por encima. Cocinar 2-3 minutos hasta que cuaje la base.',
      'Colocar el queso en una mitad y doblar el omelette en medialuna.',
      'Acompañar con el tomate fresco cortado en rodajas.'
    ],
    quickTips: 'Ideal para cenas o almuerzos donde tenés menos de 15 minutos.',
    allergens: ['huevo', 'lactosa', 'leche'],
    substitutions: {
      'queso_magro': [
        { replacementIngredientId: 'tofu_firme', reason: 'Sin lácteos / Vegano', label: 'Tofu rallado con especias', quantityFactor: 1.2 }
      ],
      'huevos': [
        { replacementIngredientId: 'tofu_firme', reason: 'Sin huevos / 100% vegetal', label: 'Tofu revuelto a la cúrcuma', quantityFactor: 1.5 }
      ]
    }
  },

  // 3. Bowl caliente de lentejas, arroz y vegetales salteados
  {
    id: 'bowl_lentejas_arroz_verduras',
    name: 'Guiso seco de lentejas con arroz y vegetales',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 25,
    baseCalories: 440,
    baseProtein: 26,
    baseCarbs: 72,
    baseFat: 6,
    tags: ['sin_tacc', 'vegetariano', 'vegano', 'economico', 'alta_proteina'],
    ingredients: [
      { ingredientId: 'lentejas_secas', quantity: 90, unit: 'g' },
      { ingredientId: 'arroz_integral', quantity: 50, unit: 'g' },
      { ingredientId: 'zanahoria', quantity: 1, unit: 'u' },
      { ingredientId: 'cebolla', quantity: 0.5, unit: 'u' },
      { ingredientId: 'morron_rojo', quantity: 0.5, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Cocinar las lentejas previamente enjuagadas en abundante agua durante 20 minutos (o usar lentejas previamente cocidas).',
      'Cocinar el arroz en paralelo.',
      'Picar la cebolla, la zanahoria y el morrón en cubos chicos.',
      'Rehogar las verduras en una cacerola con aceite de oliva por 6 minutos.',
      'Sumar las lentejas y el arroz ya listos, condimentar con pimentón dulce y comino, mezclar y calentar 2 minutos.'
    ],
    quickTips: 'Combinar legumbres con cereales forma una proteína completa de alto valor biológico.',
    allergens: [],
    substitutions: {
      'lentejas_secas': [
        { replacementIngredientId: 'garbanzos_secos', reason: 'Variar legumbre', label: 'Garbanzos cocidos', quantityFactor: 1.0 },
        { replacementIngredientId: 'pollo_pechuga', reason: 'Opción con carne', label: 'Pollo en cubos', quantityFactor: 1.6 }
      ]
    }
  },

  // 4. Salteado express de atún con fideos de arroz y vegetales
  {
    id: 'fideos_arroz_atun_vegetales',
    name: 'Wok express de fideos de arroz con atún y vegetales',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 18,
    baseCalories: 430,
    baseProtein: 34,
    baseCarbs: 58,
    baseFat: 8,
    tags: ['sin_tacc', 'alta_proteina', 'rapido', 'pescado'],
    ingredients: [
      { ingredientId: 'fideos_arroz', quantity: 80, unit: 'g' },
      { ingredientId: 'atun_lata', quantity: 1, unit: 'u' },
      { ingredientId: 'zucchini', quantity: 1, unit: 'u' },
      { ingredientId: 'zanahoria', quantity: 1, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Colocar los fideos de arroz en agua hirviendo durante 5-6 minutos (no sobrecocinar).',
      'Rallar la zanahoria y cortar el zucchini en tiritas finas.',
      'Saltear las verduras en sartén caliente con aceite de oliva durante 3 minutos.',
      'Escurrir el atún e incorporarlo a la sartén junto con los fideos de arroz colados.',
      'Revolver suavemente con fuego apagado para integrar.'
    ],
    quickTips: 'El atún en lata no requiere cocción, ahorrando 15 minutos en la cocina.',
    allergens: ['pescado'],
    substitutions: {
      'atun_lata': [
        { replacementIngredientId: 'huevos', reason: 'No tengo atún / Más económico', label: '2 Huevos revueltos', quantityFactor: 2 },
        { replacementIngredientId: 'tofu_firme', reason: 'Sin pescado / Vegetariano', label: 'Tofu salteado', quantityFactor: 150 }
      ]
    }
  },

  // 5. Bifecitos de carne magra con puré rústico de calabaza y ensalada
  {
    id: 'carne_magra_salteada_ensalada',
    name: 'Carne magra a la plancha con arroz y ensalada de tomate',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 20,
    baseCalories: 460,
    baseProtein: 42,
    baseCarbs: 40,
    baseFat: 14,
    tags: ['sin_tacc', 'alta_proteina', 'masa_muscular'],
    ingredients: [
      { ingredientId: 'carne_magra', quantity: 180, unit: 'g' },
      { ingredientId: 'arroz_integral', quantity: 60, unit: 'g' },
      { ingredientId: 'tomate', quantity: 1, unit: 'u' },
      { ingredientId: 'cebolla', quantity: 0.5, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Cocinar el arroz integral o aprovechar arroz ya cocido de la heladera.',
      'Calentar bien una plancha o sartén gruesa con unas gotas de aceite.',
      'Cocinar los bifecitos de carne 3 minutos por lado para que queden jugosos y tiernos.',
      'Cortar el tomate y la cebolla en pluma para armar la ensalada fresca.',
      'Servir la carne con el arroz caliente y la ensalada fresca.'
    ],
    quickTips: 'Excelente aporte de hierro de alta biodisponibilidad y creatina natural.',
    allergens: [],
    substitutions: {
      'carne_magra': [
        { replacementIngredientId: 'pollo_pechuga', reason: 'Más económico / Menor grasa', label: 'Pechuga de pollo a la plancha', quantityFactor: 1.0 },
        { replacementIngredientId: 'huevos', reason: 'Rápido y económico', label: '3 Huevos poché o a la plancha', quantityFactor: 0.016 }
      ]
    }
  },

  // 6. Bowl de Quinoa proteica con tofu crocante y palta
  {
    id: 'bowl_quinoa_tofu_palta',
    name: 'Bowl de quinoa con tofu dorado, espinaca y palta',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 22,
    baseCalories: 470,
    baseProtein: 28,
    baseCarbs: 45,
    baseFat: 21,
    tags: ['sin_tacc', 'vegetariano', 'vegano', 'alta_proteina'],
    ingredients: [
      { ingredientId: 'quinoa', quantity: 70, unit: 'g' },
      { ingredientId: 'tofu_firme', quantity: 160, unit: 'g' },
      { ingredientId: 'espinaca_fresca', quantity: 60, unit: 'g' },
      { ingredientId: 'palta', quantity: 0.5, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Enjuagar la quinoa bajo agua corriente en un colador fino para quitar la saponina.',
      'Hervir la quinoa en 2 partes de agua durante 12-14 minutos.',
      'Secar el tofu con papel absorbente, cortarlo en cubos de 1.5 cm.',
      'Dorar el tofu en sartén caliente con aceite de oliva hasta que forme una costra crocante (7 min).',
      'Armar el bowl con la base de quinoa, hojas de espinaca fresca, el tofu caliente y rodajas de palta.'
    ],
    quickTips: 'Para que el tofu quede crocante, el secreto es retirar la humedad antes de cocinarlo.',
    allergens: ['soja'],
    substitutions: {
      'tofu_firme': [
        { replacementIngredientId: 'huevos', reason: 'Tengo huevos en casa', label: '2 Huevos duros o pasados por agua', quantityFactor: 0.012 },
        { replacementIngredientId: 'pollo_pechuga', reason: 'Opción no vegetariana', label: 'Pollo en tiras', quantityFactor: 1.0 }
      ]
    }
  },

  // 7. Desayuno/Merienda: Porridge de avena Sin TACC con frutas y chía
  {
    id: 'porridge_avena_frutas_chia',
    name: 'Porridge cremoso de avena Sin TACC con banana y chía',
    allowedSlots: ['Desayuno', 'Merienda'],
    prepTimeMin: 8,
    baseCalories: 330,
    baseProtein: 14,
    baseCarbs: 54,
    baseFat: 8,
    tags: ['sin_tacc', 'vegetariano', 'vegano', 'rapido', 'economico'],
    ingredients: [
      { ingredientId: 'avena_sin_tacc', quantity: 50, unit: 'g' },
      { ingredientId: 'banana', quantity: 1, unit: 'u' },
      { ingredientId: 'semillas_chia', quantity: 10, unit: 'g' },
      { ingredientId: 'bebida_almendras', quantity: 200, unit: 'ml' }
    ],
    instructions: [
      'En un jarrito chico, colocar la avena certificada Sin TACC junto a la bebida de almendras.',
      'Llevar a fuego medio revolviendo con cuchara de madera durante 3-4 minutos hasta que espese.',
      'Servir en un bowl, incorporar las semillas de chía y cubrir con rodajas de banana fresca.'
    ],
    quickTips: 'Podés dejarlo preparado la noche anterior en la heladera (overnight oats) sin necesidad de cocinar.',
    allergens: ['frutos secos'],
    substitutions: {
      'bebida_almendras': [
        { replacementIngredientId: 'yogur_griego', reason: 'Mayor proteína / Lácteo', label: 'Yogur natural alto en proteínas', quantityFactor: 0.8 }
      ],
      'banana': [
        { replacementIngredientId: 'manzana', reason: 'Fruta diferente', label: 'Manzana rallada con canela', quantityFactor: 1.0 }
      ]
    }
  },

  // 8. Desayuno/Merienda: Tazón proteico de yogur con frutas y nueces
  {
    id: 'tazon_yogur_proteico_nueces',
    name: 'Bowl proteico de yogur con manzana, nueces y chía',
    allowedSlots: ['Desayuno', 'Merienda'],
    prepTimeMin: 5,
    baseCalories: 310,
    baseProtein: 22,
    baseCarbs: 26,
    baseFat: 14,
    tags: ['sin_tacc', 'alta_proteina', 'rapido', 'vegetariano'],
    ingredients: [
      { ingredientId: 'yogur_griego', quantity: 200, unit: 'g' },
      { ingredientId: 'manzana', quantity: 1, unit: 'u' },
      { ingredientId: 'nueces', quantity: 20, unit: 'g' },
      { ingredientId: 'semillas_chia', quantity: 8, unit: 'g' }
    ],
    instructions: [
      'Colocar el yogur natural proteico en un tazón.',
      'Lavar y picar la manzana en cubos pequeños.',
      'Agregar las nueces troceadas a mano y espolvorear con las semillas de chía.'
    ],
    quickTips: 'Listo en 5 minutos reales sin ensuciar ollas ni sartenes.',
    allergens: ['lactosa', 'leche', 'frutos secos'],
    substitutions: {
      'yogur_griego': [
        { replacementIngredientId: 'bebida_almendras', reason: 'Sin lácteos / Vegano', label: 'Bebida de almendras + avena', quantityFactor: 1.0 }
      ],
      'nueces': [
        { replacementIngredientId: 'semillas_chia', reason: 'Alergia a frutos secos', label: 'Doble porción de semillas de chía', quantityFactor: 2.0 }
      ]
    }
  },

  // 9. Garbanzos salteados con espinaca, cebolla y huevo poché
  {
    id: 'garbanzos_salteados_espinaca_huevo',
    name: 'Salteado tibio de garbanzos con espinaca y huevo a la sartén',
    allowedSlots: ['Almuerzo', 'Cena'],
    prepTimeMin: 18,
    baseCalories: 410,
    baseProtein: 27,
    baseCarbs: 46,
    baseFat: 14,
    tags: ['sin_tacc', 'alta_proteina', 'vegetariano', 'economico'],
    ingredients: [
      { ingredientId: 'garbanzos_secos', quantity: 80, unit: 'g' },
      { ingredientId: 'huevos', quantity: 2, unit: 'u' },
      { ingredientId: 'espinaca_fresca', quantity: 100, unit: 'g' },
      { ingredientId: 'cebolla', quantity: 0.5, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 1, unit: 'cda' }
    ],
    instructions: [
      'Picar la cebolla y dorarla en sartén con aceite de oliva durante 4 minutos.',
      'Sumar los garbanzos cocidos y saltear con pimentón dulce.',
      'Agregar la espinaca fresca lavada; se reducirá en 2 minutos con el calor.',
      'Hacer dos huecos en la sartén, romper los huevos adentro, tapar y cocinar 3 minutos hasta que la clara esté firme pero la yema tierna.'
    ],
    quickTips: 'Plato completo en una sola sartén, rico en hierro vegetal y proteína completa.',
    allergens: ['huevo'],
    substitutions: {
      'huevos': [
        { replacementIngredientId: 'tofu_firme', reason: 'Sin huevo / Vegano', label: 'Tofu dorado en cubos', quantityFactor: 75 }
      ]
    }
  },

  // 10. Desayuno/Merienda: Huevos revueltos con palta y tomate fresco
  {
    id: 'huevos_revueltos_palta_tomate',
    name: 'Revuelto de huevos con palta pisada y rodajas de tomate',
    allowedSlots: ['Desayuno', 'Merienda', 'Cena'],
    prepTimeMin: 10,
    baseCalories: 340,
    baseProtein: 20,
    baseCarbs: 9,
    baseFat: 26,
    tags: ['sin_tacc', 'alta_proteina', 'rapido', 'vegetariano', 'deficit_calorico'],
    ingredients: [
      { ingredientId: 'huevos', quantity: 2, unit: 'u' },
      { ingredientId: 'palta', quantity: 0.5, unit: 'u' },
      { ingredientId: 'tomate', quantity: 1, unit: 'u' },
      { ingredientId: 'aceite_oliva', quantity: 0.5, unit: 'cda' }
    ],
    instructions: [
      'Batir suavemente los 2 huevos con una pizca de sal.',
      'Revolver en sartén a fuego bajo con media cucharada de aceite hasta lograr textura cremosa (3 minutos).',
      'Pisar media palta con unas gotas de limón.',
      'Servir el revuelto acompañado de la palta pisada y el tomate en rodajas.'
    ],
    quickTips: 'Excelente desayuno keto / bajo en hidratos para mantener saciedad toda la mañana.',
    allergens: ['huevo'],
    substitutions: {
      'palta': [
        { replacementIngredientId: 'queso_magro', reason: 'Más económico / Menor grasa', label: 'Queso magro fundido', quantityFactor: 1.0 }
      ]
    }
  }
];

// Profile pre-configurations for User Demonstrations from prompt!
export const DEMO_PRESETS: { [id: string]: { label: string; description: string; profile: UserFoodProfile } } = {
  'demo_1': {
    label: 'Demo 1: Sin TACC + Alta en proteínas + Económico + Poco tiempo',
    description: '“Necesito comer sin TACC y quiero aumentar proteínas. Tengo poco tiempo para cocinar y quiero gastar lo menos posible.”',
    profile: {
      rawGoalText: 'Necesito comer sin TACC y quiero aumentar proteínas. Tengo poco tiempo para cocinar y quiero gastar lo menos posible.',
      hasNutritionistIndication: false,
      nutritionistIndicationText: '',
      daysCount: 7,
      mealsIncluded: ['Almuerzo', 'Cena'],
      timePreference: 'rapido',
      budgetPreference: 'economico',
      pantryIngredientsText: 'arroz, huevos, tomate, zanahoria, lentejas',
      pantryIngredientsList: ['arroz', 'huevos', 'tomate', 'zanahoria', 'lentejas'],
      excludedFoodsText: '',
      excludedFoodsList: [],
      generalPreferencesText: 'Comidas simples que no lleven más de 20-25 minutos.',
      isSinTacc: true,
      isHighProtein: true,
      isVegetarian: false,
      isVegan: false,
      isCaloricDeficit: false,
      isLactoseFree: false,
      hasAllergies: []
    }
  },
  'demo_2': {
    label: 'Demo 2: Hipertrofia / Aumento de masa muscular + Simple + <30 min',
    description: '“Estoy siguiendo una alimentación alta en proteínas para aumentar masa muscular. Quiero comidas simples, económicas y que no lleven más de 30 minutos.”',
    profile: {
      rawGoalText: 'Estoy siguiendo una alimentación alta en proteínas para aumentar masa muscular. Quiero comidas simples, económicas y que no lleven más de 30 minutos.',
      hasNutritionistIndication: false,
      nutritionistIndicationText: '',
      daysCount: 7,
      mealsIncluded: ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'],
      timePreference: 'medio',
      budgetPreference: 'economico',
      pantryIngredientsText: 'pollo, arroz, avena, huevos, banana',
      pantryIngredientsList: ['pollo', 'arroz', 'avena', 'huevos', 'banana'],
      excludedFoodsText: '',
      excludedFoodsList: [],
      generalPreferencesText: 'Priorizar comidas completas, fáciles de preparar para llevar en tupper.',
      isSinTacc: false,
      isHighProtein: true,
      isVegetarian: false,
      isVegan: false,
      isCaloricDeficit: false,
      isLactoseFree: false,
      hasAllergies: []
    }
  },
  'demo_3': {
    label: 'Demo 3: Indicación de Nutricionista (Déficit + Verduras)',
    description: '“Mi nutricionista me indicó reducir calorías y aumentar el consumo de verduras en almuerzo y cena.”',
    profile: {
      rawGoalText: 'Mi nutricionista me indicó reducir calorías y aumentar el consumo de verduras en almuerzo y cena.',
      hasNutritionistIndication: true,
      nutritionistIndicationText: 'Priorizar proteínas magras, abundante verdura de hoja y vegetales en almuerzo y cena, limitar ultraprocesados.',
      daysCount: 7,
      mealsIncluded: ['Almuerzo', 'Cena'],
      timePreference: 'medio',
      budgetPreference: 'medio',
      pantryIngredientsText: 'espinaca, tomates, huevos, queso magro',
      pantryIngredientsList: ['espinaca', 'tomates', 'huevos', 'queso magro'],
      excludedFoodsText: 'alimentos fritos, harinas refinadas',
      excludedFoodsList: ['alimentos fritos', 'harinas refinadas'],
      generalPreferencesText: 'Platos frescos, saciantes y con mucha fibra.',
      isSinTacc: false,
      isHighProtein: true,
      isVegetarian: false,
      isVegan: false,
      isCaloricDeficit: true,
      isLactoseFree: false,
      hasAllergies: []
    }
  }
};
