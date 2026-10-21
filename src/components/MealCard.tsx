import React from 'react';
import { MealPlanSlot, UserFoodProfile } from '../types';
import { Clock, RefreshCw, ChefHat, Shuffle, ShieldAlert, Check } from 'lucide-react';
import { PlateGraphic } from './PlateGraphic';

interface MealCardProps {
  slot: MealPlanSlot;
  profile: UserFoodProfile;
  onAdapt: (slot: MealPlanSlot) => void;
  onChangeMeal: (slot: MealPlanSlot) => void;
  onViewPrep: (slot: MealPlanSlot) => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  slot,
  profile,
  onAdapt,
  onChangeMeal,
  onViewPrep
}) => {
  const pantryIngredients = slot.ingredients.filter(i => i.isFromPantry);
  const hasPantryMatch = pantryIngredients.length > 0;
  const unverifiedItems = slot.ingredients.filter(i => i.anmatAlgStatus === 'unverified');

  // Format ingredient summary
  const ingredientNames = slot.ingredients.map(i => i.name).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-xs transition-all p-4 sm:p-5 flex flex-col justify-between relative group overflow-hidden">
      
      {/* Decorative subtle linear background contour */}
      <div className="absolute -right-3 -top-3 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
        <PlateGraphic variant="plate" size={68} className="text-orange-400" />
      </div>

      {/* Card Header: Slot & Time */}
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-stone-700">{slot.day}</span>
            <span aria-hidden="true" className="text-stone-300">&bull;</span>
            <span className="text-orange-900 font-medium">{slot.slot}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-stone-500 bg-stone-50 px-2 py-0.5 rounded-md">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{slot.prepTimeMin} min</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display leading-snug">
          {slot.recipeName}
        </h3>

        {/* Adaptation note if modified */}
        {slot.adaptationNote && (
          <div className="mt-2 text-[11px] text-orange-900 bg-orange-50/70 px-2.5 py-1.5 rounded-lg border border-orange-200/50 leading-tight">
            {slot.adaptationNote}
          </div>
        )}

        {/* Ingredients preview */}
        <div className="mt-2.5">
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">
            Ingredientes principales
          </div>
          <div className="text-xs text-stone-700 leading-relaxed">
            {ingredientNames.join(' · ')}
          </div>
        </div>

        {/* Pantry match badge */}
        {hasPantryMatch && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/90 px-2 py-0.5 rounded-md border border-emerald-200/60 font-medium">
            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Usa ingredientes que ya tenés ({pantryIngredients.map(p => p.name.split(' ')[0]).join(', ')})</span>
          </div>
        )}

        {/* ANMAT unverified safety notice if any industrial ingredient is unverified */}
        {unverifiedItems.length > 0 && (
          <div className="mt-2 text-[11px] text-amber-900 bg-amber-50/90 p-2 rounded-lg border border-amber-200/70 flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">NO VERIFICADO:</span> Revisá el rótulo y el listado oficial de ANMAT antes de consumirlo.
            </div>
          </div>
        )}

        {/* Nutrition preview (USDA reference) */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center gap-2.5 text-[11px] font-mono text-stone-500">
          <span>{slot.calories} kcal</span>
          <span aria-hidden="true" className="text-stone-300">&bull;</span>
          <span className="text-stone-800 font-medium">{slot.protein}g proteína</span>
          <span aria-hidden="true" className="text-stone-300">&bull;</span>
          <span>{slot.carbs}g carb</span>
        </div>
      </div>

      {/* Card Action Buttons (Section 6, 7 & Mobile Touch Targets) */}
      <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-3 gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onChangeMeal(slot)}
          className="min-h-[40px] py-2 px-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors flex items-center justify-center gap-1 border border-stone-200/60 active:scale-98"
          title="Buscar otra receta compatible con todas tus pautas"
        >
          <Shuffle className="w-3.5 h-3.5 text-stone-400" />
          <span className="truncate">Cambiar</span>
        </button>

        <button
          type="button"
          onClick={() => onAdapt(slot)}
          className="min-h-[40px] py-2 px-1.5 text-xs font-semibold text-orange-900 bg-orange-50/80 hover:bg-orange-100/90 rounded-xl transition-colors border border-orange-200/60 flex items-center justify-center gap-1 shadow-2xs active:scale-98"
          title="Reemplazar un ingrediente de forma nutricionalmente equivalente"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-700" />
          <span className="truncate">Adaptar</span>
        </button>

        <button
          type="button"
          onClick={() => onViewPrep(slot)}
          className="min-h-[40px] py-2 px-1.5 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors flex items-center justify-center gap-1 border border-stone-200/60 active:scale-98"
          title="Ver ingredientes y pasos de preparación"
        >
          <ChefHat className="w-3.5 h-3.5 text-stone-400" />
          <span className="truncate">Receta</span>
        </button>
      </div>

    </div>
  );
};
