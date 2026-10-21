import React, { useState } from 'react';
import { MealSlot, UserFoodProfile } from '../types';
import { PlateGraphic } from './PlateGraphic';
import { Check, Sparkles, Clock, DollarSign, ArrowLeft, ShieldAlert } from 'lucide-react';
import { parseFreeTextInput } from '../utils/planner';

interface SetupFormProps {
  initialProfile?: UserFoodProfile | null;
  onSaveProfile: (profile: UserFoodProfile) => void;
  onCancel?: () => void;
}

const EXAMPLE_CHIPS = [
  'Sin TACC',
  'Alta en proteínas',
  'Vegetariana',
  'Déficit calórico',
  'Aumento de masa muscular',
  'Intolerante a la lactosa'
];

export const SetupForm: React.FC<SetupFormProps> = ({
  initialProfile,
  onSaveProfile,
  onCancel
}) => {
  const [rawGoalText, setRawGoalText] = useState(
    initialProfile?.rawGoalText || 'Necesito comer sin TACC y quiero aumentar proteínas. Tengo poco tiempo para cocinar y quiero gastar lo menos posible.'
  );
  
  const [hasNutritionistIndication, setHasNutritionistIndication] = useState(
    initialProfile?.hasNutritionistIndication || false
  );
  const [nutritionistIndicationText, setNutritionistIndicationText] = useState(
    initialProfile?.nutritionistIndicationText || ''
  );

  const [daysCount, setDaysCount] = useState<1 | 3 | 5 | 7>(
    initialProfile?.daysCount || 7
  );

  const [mealsIncluded, setMealsIncluded] = useState<MealSlot[]>(
    initialProfile?.mealsIncluded || ['Almuerzo', 'Cena']
  );

  const [timePreference, setTimePreference] = useState<'rapido' | 'medio' | 'tranquilo'>(
    initialProfile?.timePreference || 'rapido'
  );

  const [budgetPreference, setBudgetPreference] = useState<'economico' | 'medio' | 'flexible'>(
    initialProfile?.budgetPreference || 'economico'
  );

  const [pantryIngredientsText, setPantryIngredientsText] = useState(
    initialProfile?.pantryIngredientsText || 'Tengo arroz, huevos, tomate, zanahoria y lentejas'
  );

  const [excludedFoodsText, setExcludedFoodsText] = useState(
    initialProfile?.excludedFoodsText || 'No como mariscos'
  );

  const [generalPreferencesText, setGeneralPreferencesText] = useState(
    initialProfile?.generalPreferencesText || 'Comidas simples que no lleven más de 25 minutos.'
  );

  const handleChipClick = (chipText: string) => {
    if (!rawGoalText.trim()) {
      setRawGoalText(chipText);
    } else if (!rawGoalText.toLowerCase().includes(chipText.toLowerCase())) {
      setRawGoalText(`${rawGoalText} + ${chipText}`);
    }
  };

  const toggleMealSlot = (slot: MealSlot) => {
    if (mealsIncluded.includes(slot)) {
      if (mealsIncluded.length > 1) {
        setMealsIncluded(mealsIncluded.filter(m => m !== slot));
      }
    } else {
      setMealsIncluded([...mealsIncluded, slot]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFreeTextInput(rawGoalText, {
      daysCount,
      mealsIncluded,
      timePreference,
      budgetPreference,
      pantryIngredientsText,
      excludedFoodsText,
      generalPreferencesText,
      hasNutritionistIndication,
      nutritionistIndicationText: hasNutritionistIndication ? nutritionistIndicationText : ''
    });

    onSaveProfile(parsed);
  };

  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      
      {/* Top back affordance if editing */}
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[38px] inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la semana</span>
        </button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <div className="text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md inline-block mb-1.5 border border-orange-200/40">
            <span>Configuración práctica</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
            ¿Cómo necesitás organizar tu alimentación?
          </h1>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed">
            Contanos qué indicación, restricción u objetivo tenés con tus propias palabras.
          </p>
        </div>
        <div className="opacity-30 hidden sm:block shrink-0">
          <PlateGraphic variant="bowl" size={54} className="text-orange-400" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        
        {/* Open Free-Text Field */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
          <label htmlFor="rawGoal" className="block text-xs font-bold text-stone-900 mb-1">
            Tu necesidad u objetivo principal
          </label>
          <p className="text-[11px] text-stone-500 mb-2.5">
            Escribí libremente. Interpretamos restricciones, ingredientes y tiempos sin encasillarte.
          </p>

          <textarea
            id="rawGoal"
            rows={3}
            value={rawGoalText}
            onChange={(e) => setRawGoalText(e.target.value)}
            placeholder="Ej: Sin TACC y alta en proteínas, con poco tiempo para cocinar y gastar lo menos posible."
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all text-stone-800 placeholder:text-stone-400 bg-stone-50/40"
            required
          />

          {/* Example clickable chips */}
          <div className="mt-2.5">
            <span className="text-[11px] text-stone-400 mr-1.5">Ejemplos rápidos:</span>
            <div className="inline-flex flex-wrap gap-1 mt-1">
              {EXAMPLE_CHIPS.map(chip => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="min-h-[32px] text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-orange-50/70 hover:text-orange-900 text-stone-700 transition-colors border border-stone-200/60 active:scale-98"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Nutritionist Indication Section */}
          <div className="mt-4 pt-3.5 border-t border-stone-100">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNutritionistIndication}
                onChange={(e) => setHasNutritionistIndication(e.target.checked)}
                className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500 w-4 h-4"
              />
              <div>
                <span className="text-xs font-semibold text-stone-800">
                  Tengo una indicación de mi nutricionista
                </span>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Alima utiliza esta información como criterio de organización para tus comidas. No modificamos pautas médicas.
                </p>
              </div>
            </label>

            {hasNutritionistIndication && (
              <div className="mt-2.5 pl-6">
                <textarea
                  rows={2}
                  value={nutritionistIndicationText}
                  onChange={(e) => setNutritionistIndicationText(e.target.value)}
                  placeholder="Ej: Mi nutricionista me indicó priorizar proteínas, comer verduras en almuerzo y cena y limitar frituras."
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-orange-500 text-stone-800 bg-orange-50/30"
                />
              </div>
            )}
          </div>
        </div>

        {/* Days and Meals Structure */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-5">
          
          {/* Days count */}
          <div>
            <label className="block text-xs font-bold text-stone-900 mb-1">
              ¿Cuántos días querés organizar?
            </label>
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {([1, 3, 5, 7] as const).map(d => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDaysCount(d)}
                  className={`min-h-[42px] py-2 text-xs font-medium rounded-xl border transition-all ${
                    daysCount === d
                      ? 'bg-orange-600 text-white border-orange-600 shadow-2xs font-semibold'
                      : 'bg-white text-stone-700 border-stone-200/90 hover:bg-stone-50'
                  }`}
                >
                  {d} {d === 1 ? 'día' : 'días'}
                </button>
              ))}
            </div>
          </div>

          {/* Meals included */}
          <div className="pt-3.5 border-t border-stone-100">
            <label className="block text-xs font-bold text-stone-900 mb-1">
              ¿Qué comidas querés organizar?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
              {(['Desayuno', 'Almuerzo', 'Merienda', 'Cena'] as MealSlot[]).map(slot => {
                const isSelected = mealsIncluded.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => toggleMealSlot(slot)}
                    className={`min-h-[42px] py-2 px-2.5 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                        : 'bg-white text-stone-700 border-stone-200/90 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time & Budget Preferences */}
          <div className="pt-3.5 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Time */}
            <div>
              <label className="block text-xs font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Tiempo para cocinar</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {[
                  { key: 'rapido', label: 'Rápido', sub: '≤20 min' },
                  { key: 'medio', label: 'Medio', sub: '25-35 min' },
                  { key: 'tranquilo', label: 'Tranquilo', sub: '40+ min' }
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setTimePreference(opt.key as any)}
                    className={`min-h-[44px] p-2 text-center rounded-xl border transition-all ${
                      timePreference === opt.key
                        ? 'border-orange-500 bg-orange-50/60 text-orange-950 font-semibold shadow-2xs'
                        : 'border-stone-200/80 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-[11px] leading-tight">{opt.label}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-xs font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-stone-400" />
                <span>Presupuesto</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                {[
                  { key: 'economico', label: 'Económico', sub: 'Gastar poco' },
                  { key: 'medio', label: 'Moderado', sub: 'Estándar' },
                  { key: 'flexible', label: 'Flexible', sub: 'Sin límite' }
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setBudgetPreference(opt.key as any)}
                    className={`min-h-[44px] p-2 text-center rounded-xl border transition-all ${
                      budgetPreference === opt.key
                        ? 'border-orange-500 bg-orange-50/60 text-orange-950 font-semibold shadow-2xs'
                        : 'border-stone-200/80 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-[11px] leading-tight">{opt.label}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Practical Pantry & Exclusions */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3.5">
          
          <div>
            <label htmlFor="pantry" className="block text-xs font-bold text-stone-900 mb-0.5">
              Ingredientes que ya tengo en casa
            </label>
            <p className="text-[11px] text-stone-500 mb-1.5">
              Los priorizamos en las sustituciones y en la lista de compras para no comprar de más.
            </p>
            <input
              id="pantry"
              type="text"
              value={pantryIngredientsText}
              onChange={(e) => setPantryIngredientsText(e.target.value)}
              placeholder="Ej: Tengo arroz, huevos, pollo, tomate y avena."
              className="min-h-[42px] w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-orange-500 text-stone-800 bg-stone-50/40"
            />
          </div>

          <div className="pt-2.5 border-t border-stone-100">
            <label htmlFor="excluded" className="block text-xs font-bold text-stone-900 mb-0.5">
              Alimentos que no consumo
            </label>
            <p className="text-[11px] text-stone-500 mb-1.5">
              Cualquier alimento que prefieras evitar por gusto o intolerancia.
            </p>
            <input
              id="excluded"
              type="text"
              value={excludedFoodsText}
              onChange={(e) => setExcludedFoodsText(e.target.value)}
              placeholder="Ej: No como pescado, o evitar berenjenas."
              className="min-h-[42px] w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-orange-500 text-stone-800 bg-stone-50/40"
            />
          </div>

          <div className="pt-2.5 border-t border-stone-100">
            <label htmlFor="prefs" className="block text-xs font-bold text-stone-900 mb-0.5">
              Otras preferencias (opcional)
            </label>
            <input
              id="prefs"
              type="text"
              value={generalPreferencesText}
              onChange={(e) => setGeneralPreferencesText(e.target.value)}
              placeholder="Ej: Me gustan las comidas simples y no quiero cocinar más de 30 minutos."
              className="min-h-[42px] w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-orange-500 text-stone-800 bg-stone-50/40"
            />
          </div>

        </div>

        {/* Safety Note */}
        <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200/70 text-[11px] text-stone-600 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Criterio de seguridad:</strong> Para Sin TACC y alérgenos aplicamos reglas oficiales alineadas con ANMAT ALG. Precios de referencia calculados con base en <strong>SEPA / Precios Claros</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="min-h-[44px] px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="min-h-[44px] px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-98"
          >
            <span>Generar mi semana organizada</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};
