import React from 'react';
import { UserFoodProfile } from '../types';
import { SlidersHorizontal, ShieldCheck, Clock, DollarSign, HeartHandshake } from 'lucide-react';
import { PlateGraphic } from './PlateGraphic';

interface ProfileViewProps {
  profile: UserFoodProfile;
  onEditProfile: () => void;
  onOpenDataSources: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onEditProfile,
  onOpenDataSources
}) => {
  return (
    <div className="max-w-2xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <div className="text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md inline-block mb-1 border border-orange-200/40">
            <span>Configuración activa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Tu alimentación
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Los parámetros que Alima utiliza para organizar y adaptar tu semana.
          </p>
        </div>

        <button
          onClick={onEditProfile}
          className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 active:scale-98"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Editar</span>
        </button>
      </div>

      <div className="space-y-4 sm:space-y-5">
        
        {/* Main Indication Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs relative overflow-hidden">
          <div className="absolute right-3 top-3 opacity-20 pointer-events-none">
            <PlateGraphic variant="bowl" size={48} className="text-orange-400" />
          </div>

          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Indicación u objetivo escrito por vos
          </div>
          <blockquote className="text-sm sm:text-base text-stone-900 font-medium italic border-l-2 border-orange-500/80 pl-3 py-0.5 leading-relaxed">
            &ldquo;{profile.rawGoalText}&rdquo;
          </blockquote>

          {/* Extracted criteria tags */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 text-xs">
            {profile.isSinTacc && (
              <span className="px-2.5 py-1 rounded-lg bg-orange-50/80 text-orange-900 border border-orange-200/60 font-medium text-[11px]">
                Sin TACC (Apto celíacos)
              </span>
            )}
            {profile.isHighProtein && (
              <span className="px-2.5 py-1 rounded-lg bg-orange-50/80 text-orange-900 border border-orange-200/60 font-medium text-[11px]">
                Alta en proteínas
              </span>
            )}
            {profile.isVegetarian && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 font-medium text-[11px]">
                Vegetariana
              </span>
            )}
            {profile.isCaloricDeficit && (
              <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 font-medium text-[11px]">
                Déficit calórico
              </span>
            )}
          </div>
        </div>

        {/* Nutritionist Indication if present */}
        {profile.hasNutritionistIndication && (
          <div className="bg-orange-50/40 rounded-2xl p-4 sm:p-5 border border-orange-200/60 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-orange-950 font-display">
                  Indicación de nutricionista cargada
                </h3>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  {profile.nutritionistIndicationText || 'Pauta profesional respetada en la planificación semanal.'}
                </p>
                <div className="mt-2 text-[11px] text-stone-500">
                  Alima utiliza esta información como criterio de organización práctica sin modificar indicaciones médicas.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Tiempo de cocina</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 font-display">
              {profile.timePreference === 'rapido' ? 'Rápido (≤20 min)' : profile.timePreference === 'medio' ? 'Medio (25-35 min)' : 'Tranquilo (40+ min)'}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-0.5">
              <DollarSign className="w-3.5 h-3.5 text-stone-400" />
              <span>Presupuesto</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 font-display">
              {profile.budgetPreference === 'economico' ? 'Económico / Cuidado' : profile.budgetPreference === 'medio' ? 'Moderado estándar' : 'Flexible'}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-0.5">
              <span>Comidas al día</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-stone-900 font-display">
              {profile.mealsIncluded.join(' + ')}
            </div>
          </div>
        </div>

        {/* Pantry & Excluded Foods summary */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs space-y-3">
          <div>
            <h3 className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider mb-0.5">
              Ingredientes que ya tenés en casa
            </h3>
            <p className="text-xs text-stone-600">
              {profile.pantryIngredientsText || 'Ninguno especificado todavía.'}
            </p>
          </div>

          <div className="pt-2.5 border-t border-stone-100">
            <h3 className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider mb-0.5">
              Alimentos excluidos
            </h3>
            <p className="text-xs text-stone-600">
              {profile.excludedFoodsText || 'Sin exclusiones específicas.'}
            </p>
          </div>
        </div>

        {/* Transparency note */}
        <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900">Seguridad y fuentes oficiales de datos</span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Precios basados en <strong>SEPA / Precios Claros</strong> (Secretaría de Comercio), verificación con <strong>ANMAT ALG</strong> y datos nutricionales de <strong>USDA FoodData Central</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDataSources}
            className="text-xs font-semibold text-orange-800 hover:text-orange-950 underline shrink-0 min-h-[36px] flex items-center"
          >
            Ver fuentes
          </button>
        </div>

      </div>
    </div>
  );
};
