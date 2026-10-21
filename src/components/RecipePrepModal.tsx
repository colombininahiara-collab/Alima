import React from 'react';
import { MealPlanSlot, UserFoodProfile } from '../types';
import { X, Clock, Flame, ShieldCheck, ChefHat, Check } from 'lucide-react';

interface RecipePrepModalProps {
  slot: MealPlanSlot;
  profile: UserFoodProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipePrepModal: React.FC<RecipePrepModalProps> = ({
  slot,
  profile,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

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
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{slot.day}</span>
              <span aria-hidden="true">&bull;</span>
              <span>{slot.slot}</span>
              <span aria-hidden="true">&bull;</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {slot.prepTimeMin} min
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-display">
              {slot.recipeName}
            </h2>
            {slot.adaptationNote && (
              <div className="mt-2 text-xs text-orange-800 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200/60 inline-block">
                {slot.adaptationNote}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 text-sm">
          
          {/* Nutritional Profile (USDA FoodData Central reference) */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-stone-700 uppercase tracking-wider text-[10px]">
                Información nutricional de referencia
              </span>
              <span className="text-[10px] text-stone-400">
                Fuente: USDA FoodData Central
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                <div className="text-sm font-bold text-stone-900">{slot.calories}</div>
                <div className="text-[10px] text-stone-400 uppercase">kcal</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                <div className="text-sm font-bold text-orange-700">{slot.protein}g</div>
                <div className="text-[10px] text-stone-400 uppercase">Proteínas</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                <div className="text-sm font-bold text-stone-900">{slot.carbs}g</div>
                <div className="text-[10px] text-stone-400 uppercase">Carbohidratos</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-stone-200/80">
                <div className="text-sm font-bold text-stone-900">{slot.fat}g</div>
                <div className="text-[10px] text-stone-400 uppercase">Grasas</div>
              </div>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          <div>
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Ingredientes necesarios</span>
              <span className="text-[11px] text-stone-500 font-normal">Para 1 porción</span>
            </h3>
            <ul className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white">
              {slot.ingredients.map(ing => (
                <li key={ing.ingredientId} className="p-3 flex items-center justify-between text-xs hover:bg-stone-50/50">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-800">{ing.name}</span>
                    {ing.isFromPantry && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 font-medium">
                        Ya en casa
                      </span>
                    )}
                  </div>
                  <div className="text-stone-500 font-mono">
                    {ing.quantity} {ing.unit}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Preparation */}
          <div>
            <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-orange-600" />
              <span>Paso a paso simple</span>
            </h3>
            <ol className="space-y-2.5">
              {slot.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-stone-700">
                  <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Safety & Sin TACC Guidelines if applicable */}
          {profile.isSinTacc && (
            <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-200/80 text-xs text-orange-950 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Cuidado de contaminación cruzada (Sin TACC)</span>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Utilizá utensilios, tablas y sartenes limpios y exclusivos. Si usás condimentos o ingredientes envasados, verificá que tengan el logo oficial y figuren en el Listado Oficial Integrado ALG de ANMAT.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg shadow-2xs transition-colors"
          >
            Listo, entendido
          </button>
        </div>

      </div>
    </div>
  );
};
