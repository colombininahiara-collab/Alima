import React from 'react';
import { MealPlanSlot, MealRecipe, UserFoodProfile } from '../types';
import { RECIPES_DATABASE, INGREDIENTS_DATABASE } from '../data/initialData';
import { isRecipeCompatible } from '../utils/planner';
import { X, Clock, Check, Sparkles } from 'lucide-react';

interface ChangeMealModalProps {
  slot: MealPlanSlot;
  profile: UserFoodProfile;
  isOpen: boolean;
  onClose: () => void;
  onSelectAlternative: (newRecipe: MealRecipe) => void;
}

export const ChangeMealModal: React.FC<ChangeMealModalProps> = ({
  slot,
  profile,
  isOpen,
  onClose,
  onSelectAlternative
}) => {
  if (!isOpen) return null;

  // Find candidate recipes compatible with ALL conditions, excluding the current one
  const candidates = RECIPES_DATABASE.filter(r => 
    r.id !== slot.originalRecipeId && 
    r.id !== slot.recipeId &&
    r.allowedSlots.includes(slot.slot) &&
    isRecipeCompatible(r, profile)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-100 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded inline-block mb-1.5">
              Alternativas compatibles
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
              Cambiar comida: {slot.day} · {slot.slot}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Actual: {slot.recipeName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alternatives list */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-stone-600">
            Estas opciones respetan simultáneamente tu indicación ({profile.isSinTacc ? 'Sin TACC' : ''}{profile.isHighProtein ? ', alta en proteínas' : ''}), tus preferencias de tiempo y alimentos excluidos:
          </p>

          {candidates.length === 0 ? (
            <div className="p-6 text-center text-xs text-stone-500 bg-stone-50 rounded-xl">
              No encontramos otras recetas en la base inicial que cumplan simultáneamente todos los filtros estrictos. Podés usar la función &ldquo;Adaptar&rdquo; para sustituir ingredientes puntuales.
            </div>
          ) : (
            <div className="space-y-3">
              {candidates.map(candidate => {
                const ingredientNames = candidate.ingredients.map(ing => {
                  const db = INGREDIENTS_DATABASE[ing.ingredientId];
                  return db ? db.name : ing.ingredientId;
                }).slice(0, 4);

                return (
                  <div
                    key={candidate.id}
                    className="p-4 rounded-xl border border-stone-200 hover:border-orange-400 hover:bg-orange-50/20 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-stone-900 font-display group-hover:text-orange-950 transition-colors">
                          {candidate.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-stone-500 font-mono shrink-0">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{candidate.prepTimeMin} min</span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-500 mt-1">
                        <span>Ingredientes: {ingredientNames.join(' · ')}</span>
                      </div>

                      <div className="mt-2.5 flex items-center gap-3 text-[11px] text-stone-500 font-mono">
                        <span>{candidate.baseCalories} kcal</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="text-orange-800 font-medium">{candidate.baseProtein}g proteína</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>{candidate.baseCarbs}g carbohidratos</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        {profile.isSinTacc ? 'Apto Sin TACC (verificado)' : 'Compatible con tus pautas'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectAlternative(candidate);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-orange-600 hover:text-white rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Elegir este plato</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cerrar sin cambiar
          </button>
        </div>

      </div>
    </div>
  );
};
