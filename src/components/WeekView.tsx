import React, { useState } from 'react';
import { MealPlanSlot, UserFoodProfile, WeekDay } from '../types';
import { MealCard } from './MealCard';
import { Calendar, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { PlateGraphic } from './PlateGraphic';

interface WeekViewProps {
  mealSlots: MealPlanSlot[];
  profile: UserFoodProfile;
  onAdaptMeal: (slot: MealPlanSlot) => void;
  onChangeMeal: (slot: MealPlanSlot) => void;
  onViewPrep: (slot: MealPlanSlot) => void;
  onOpenSetup: () => void;
  lastActionMessage?: string | null;
}

export const WeekView: React.FC<WeekViewProps> = ({
  mealSlots,
  profile,
  onAdaptMeal,
  onChangeMeal,
  onViewPrep,
  onOpenSetup,
  lastActionMessage
}) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('todos');

  // Unique days in active plan
  const availableDays: WeekDay[] = Array.from(new Set(mealSlots.map(s => s.day)));

  const filteredSlots = selectedDayFilter === 'todos'
    ? mealSlots
    : mealSlots.filter(s => s.day === selectedDayFilter);

  // Group slots by day for structured view
  const daysGrouped = availableDays.map(day => ({
    day,
    slots: filteredSlots.filter(s => s.day === day)
  })).filter(g => g.slots.length > 0);

  const totalMeals = mealSlots.length;

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
      
      {/* Toast Alert for Dynamic Updates */}
      {lastActionMessage && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-3.5 bg-emerald-50/90 border border-emerald-200/80 text-emerald-950 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium truncate">{lastActionMessage}</span>
          </div>
          <span className="text-[11px] text-emerald-700 shrink-0 pl-2">Sincronizado</span>
        </div>
      )}

      {/* Header & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md mb-1.5 border border-orange-200/40">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            <span>Semana organizada</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Mi semana
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {profile.daysCount} días · {totalMeals} comidas planificadas según tu indicación.
          </p>
        </div>

        {/* Profile Summary & Edit CTA */}
        <div className="flex items-center gap-2">
          <div className="bg-white px-3 py-1.5 rounded-xl border border-stone-200/80 text-xs text-stone-600 shadow-2xs hidden sm:block">
            <span className="text-stone-400">Pauta: </span>
            <span className="font-medium text-stone-800 truncate max-w-xs inline-block align-bottom">
              {profile.rawGoalText.slice(0, 36)}...
            </span>
          </div>
          <button
            onClick={onOpenSetup}
            className="min-h-[38px] px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200/80 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>Editar pauta</span>
          </button>
        </div>
      </div>

      {/* Day Filter Tabs (Mobile friendly horizontal scroll with comfortable touch targets) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-6 scrollbar-none -mx-1 px-1">
        <button
          onClick={() => setSelectedDayFilter('todos')}
          className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
            selectedDayFilter === 'todos'
              ? 'bg-stone-900 text-white font-semibold shadow-2xs'
              : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
          }`}
        >
          Toda la semana
        </button>

        {availableDays.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDayFilter(day)}
            className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
              selectedDayFilter === day
                ? 'bg-orange-600 text-white font-semibold shadow-2xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Week Meals Grid */}
      <div className="space-y-8 sm:space-y-10">
        {daysGrouped.map(({ day, slots }) => (
          <section key={day} className="space-y-3.5">
            
            {/* Day Title with Hairline */}
            <div className="flex items-center gap-2.5">
              <h2 className="text-sm sm:text-base font-bold text-stone-900 font-display">
                {day}
              </h2>
              <div className="h-px bg-stone-200/80 flex-1"></div>
              <span className="text-[11px] text-stone-400 font-mono">
                {slots.length} {slots.length === 1 ? 'comida' : 'comidas'}
              </span>
            </div>

            {/* Meals in Day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {slots.map(slot => (
                <MealCard
                  key={slot.id}
                  slot={slot}
                  profile={profile}
                  onAdapt={onAdaptMeal}
                  onChangeMeal={onChangeMeal}
                  onViewPrep={onViewPrep}
                />
              ))}
            </div>

          </section>
        ))}
      </div>

      {/* Subtle calm footer */}
      <div className="mt-10 sm:mt-12 p-5 rounded-2xl bg-white border border-stone-200/80 text-center max-w-lg mx-auto space-y-2 relative overflow-hidden shadow-2xs">
        <div className="flex items-center justify-center gap-3 text-orange-300 opacity-60 mb-1">
          <PlateGraphic variant="bowl" size={28} />
          <PlateGraphic variant="fruit" size={24} />
          <PlateGraphic variant="veg" size={24} />
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-display">
          ¿No tenés un ingrediente o querés abaratar costos?
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed">
          Tocá &ldquo;Adaptar&rdquo; en cualquier tarjeta para que Alima busque un reemplazo nutricionalmente equivalente y recalcule tu lista de compras automáticamente.
        </p>
      </div>

    </div>
  );
};
