import React, { useState } from 'react';
import { MealPlanSlot, UserFoodProfile, IngredientSubstitutionOption } from '../types';
import { 
  getContextualIngredientSubstitutions, 
  applyIngredientSubstitution 
} from '../utils/planner';
import { 
  X, 
  Check, 
  ArrowRight, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  Home
} from 'lucide-react';
import { INGREDIENTS_DATABASE } from '../data/initialData';

interface AdaptModalProps {
  slot: MealPlanSlot;
  profile: UserFoodProfile;
  isOpen: boolean;
  onClose: () => void;
  onApplyAdaptation: (updatedSlot: MealPlanSlot, summary: string) => void;
}

export const AdaptModal: React.FC<AdaptModalProps> = ({
  slot,
  profile,
  isOpen,
  onClose,
  onApplyAdaptation
}) => {
  if (!isOpen) return null;

  // Reasons requested in user prompt
  const [selectedReason, setSelectedReason] = useState<
    'no_tengo' | 'es_caro' | 'no_me_gusta' | 'otra_alternativa'
  >('no_tengo');

  // Selected target ingredient to replace (default to the primary protein or first ingredient)
  const defaultTarget = slot.ingredients.find(i => {
    const db = INGREDIENTS_DATABASE[i.ingredientId];
    return db?.nutritionalRole === 'proteina_principal' || db?.nutritionalRole === 'legumbre_mixta';
  }) || slot.ingredients[0];

  const [targetIngredientId, setTargetIngredientId] = useState<string>(
    defaultTarget ? defaultTarget.ingredientId : slot.ingredients[0]?.ingredientId || ''
  );

  const currentTargetIng = slot.ingredients.find(i => i.ingredientId === targetIngredientId);

  // Compute 2-3 valid functional alternatives
  const substitutionOptions = getContextualIngredientSubstitutions(
    targetIngredientId,
    currentTargetIng?.quantity || 100,
    currentTargetIng?.unit || 'g',
    selectedReason,
    profile,
    slot
  );

  // Selected option among the 2-3 choices
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  // Auto-select first option if available
  const activeOption = substitutionOptions.find(o => o.replacementIngredientId === selectedOptionId) 
    || substitutionOptions[0];

  const handleConfirm = () => {
    if (!activeOption) return;
    const result = applyIngredientSubstitution(slot, targetIngredientId, activeOption);
    onApplyAdaptation(result.updatedSlot, result.changeSummary);
    onClose();
  };

  const originalDb = INGREDIENTS_DATABASE[targetIngredientId];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/35 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-xl border border-stone-200/80 flex flex-col"
        role="dialog" 
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-start justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md mb-1 border border-orange-200/40">
              <span>Sustitución funcional equivalente</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">
              Cambiar ingrediente en {slot.slot.toLowerCase()}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5 truncate max-w-xs sm:max-w-md">
              {slot.day} · {slot.recipeName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 text-sm">
          
          {/* Step 1: Select Ingredient to replace */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-2">
              1. Seleccioná el ingrediente que querés cambiar:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {slot.ingredients.map(ing => {
                const isSelected = ing.ingredientId === targetIngredientId;
                const db = INGREDIENTS_DATABASE[ing.ingredientId];
                return (
                  <button
                    type="button"
                    key={ing.ingredientId}
                    onClick={() => {
                      setTargetIngredientId(ing.ingredientId);
                      setSelectedOptionId('');
                    }}
                    className={`min-h-[42px] px-3 py-2 text-xs rounded-xl border transition-all text-left flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-2xs'
                        : 'bg-stone-50/70 text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-white'
                    }`}
                  >
                    <span>{ing.name}</span>
                    <span className="text-[10px] opacity-70">({ing.quantity}{ing.unit})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Reason Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-2">
              2. ¿Por qué motivo querés cambiarlo?
            </label>
            <div className="grid grid-cols-2 gap-2">
              
              <button
                type="button"
                onClick={() => setSelectedReason('no_tengo')}
                className={`min-h-[46px] p-2.5 text-left rounded-xl border text-xs transition-all flex flex-col justify-center ${
                  selectedReason === 'no_tengo'
                    ? 'border-orange-500 bg-orange-50/60 text-stone-900 font-semibold shadow-2xs'
                    : 'border-stone-200/90 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="font-medium text-stone-900">No tengo este ingrediente</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Prioriza alacena y compras</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReason('es_caro')}
                className={`min-h-[46px] p-2.5 text-left rounded-xl border text-xs transition-all flex flex-col justify-center ${
                  selectedReason === 'es_caro'
                    ? 'border-orange-500 bg-orange-50/60 text-stone-900 font-semibold shadow-2xs'
                    : 'border-stone-200/90 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="font-medium text-stone-900">Es demasiado caro</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Reduce costo con SEPA</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReason('no_me_gusta')}
                className={`min-h-[46px] p-2.5 text-left rounded-xl border text-xs transition-all flex flex-col justify-center ${
                  selectedReason === 'no_me_gusta'
                    ? 'border-orange-500 bg-orange-50/60 text-stone-900 font-semibold shadow-2xs'
                    : 'border-stone-200/90 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="font-medium text-stone-900">No me gusta</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Alternativa de otro sabor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReason('otra_alternativa')}
                className={`min-h-[46px] p-2.5 text-left rounded-xl border text-xs transition-all flex flex-col justify-center ${
                  selectedReason === 'otra_alternativa'
                    ? 'border-orange-500 bg-orange-50/60 text-stone-900 font-semibold shadow-2xs'
                    : 'border-stone-200/90 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <span className="font-medium text-stone-900">Buscar otra alternativa</span>
                <span className="text-[10px] text-stone-500 mt-0.5">Equivalencia nutricional</span>
              </button>

            </div>
          </div>

          {/* Step 3: Curated Valid Alternatives (2 or 3 options) */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
              <span className="flex items-center gap-1.5">
                <span>Ingrediente actual</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-orange-900 font-bold">Alternativas propuestas</span>
              </span>
              <span className="text-[11px] font-normal text-stone-400">
                {substitutionOptions.length} opciones disponibles
              </span>
            </div>

            {substitutionOptions.length === 0 ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-1">No encontramos una alternativa equivalente verificada.</span>
                No inventamos equivalencias nutricionales si no podemos garantizar la compatibilidad con tus restricciones ({profile.isSinTacc ? 'Sin TACC' : ''}). Podés cambiar la receta completa desde el botón &ldquo;Cambiar&rdquo;.
              </div>
            ) : (
              <div className="space-y-2.5">
                {substitutionOptions.map((opt) => {
                  const isCurrentActive = activeOption?.replacementIngredientId === opt.replacementIngredientId;
                  return (
                    <div
                      key={opt.replacementIngredientId}
                      onClick={() => setSelectedOptionId(opt.replacementIngredientId)}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                        isCurrentActive
                          ? 'border-orange-500/80 bg-orange-50/40 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      {/* Title & Radio Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isCurrentActive
                              ? 'border-orange-600 bg-orange-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}>
                            {isCurrentActive && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-bold text-stone-900 font-display">
                            {opt.replacementName}
                          </span>
                        </div>

                        <span className="text-xs font-mono font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md shrink-0">
                          {opt.newQuantity} {opt.newUnit}
                        </span>
                      </div>

                      {/* Brief Explanatory Rationale (Requirement 1) */}
                      <p className="mt-2 text-xs text-stone-600 leading-relaxed pl-6">
                        {opt.explanation}
                      </p>

                      {/* Badges: Pantry, Budget, Macros */}
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2 text-[11px] pl-6">
                        {opt.isPantryAvailable && (
                          <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-200/60">
                            <Home className="w-3 h-3 text-emerald-600" />
                            <span>Ya lo tenés en tu alacena</span>
                          </span>
                        )}

                        {opt.costImpactARS < 0 && (
                          <span className="inline-flex items-center gap-1 text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md font-medium">
                            <DollarSign className="w-3 h-3 text-emerald-600" />
                            <span>Ahorro: ~${Math.abs(opt.costImpactARS).toLocaleString('es-AR')}</span>
                          </span>
                        )}

                        <span className="text-stone-500 font-mono">
                          Proteína: {opt.macroComparison.newProtein}g ({opt.macroComparison.proteinDiff >= 0 ? `+${opt.macroComparison.proteinDiff}` : opt.macroComparison.proteinDiff}g)
                        </span>

                        {profile.isSinTacc && opt.anmatAlgStatus === 'verified' && (
                          <span className="text-emerald-700 font-medium">
                            · Apto ANMAT ALG
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Reference Transparency (SEPA / Precios Claros) */}
          <div className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 text-[11px] text-stone-500 leading-relaxed">
            <span className="font-semibold text-stone-700">Fuente de precios: </span>
            Precios de referencia calculados con base en el <strong>SEPA / Precios Claros (Secretaría de Comercio Argentina)</strong> para Octubre 2026. Al confirmar, la lista de compras y el total semanal se recalculan al instante.
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl flex items-center justify-end gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            disabled={!activeOption}
            onClick={handleConfirm}
            className={`min-h-[44px] px-5 py-2.5 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 ${
              activeOption
                ? 'text-white bg-orange-600 hover:bg-orange-700'
                : 'text-stone-400 bg-stone-200 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Confirmar reemplazo</span>
          </button>
        </div>

      </div>
    </div>
  );
};
