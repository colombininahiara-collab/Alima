import React from 'react';
import { UserFoodProfile, ShoppingListItem } from '../types';
import { DEMO_PRESETS } from '../data/initialData';

interface HeaderProps {
  activeTab: 'semana' | 'compras' | 'perfil';
  setActiveTab: (tab: 'semana' | 'compras' | 'perfil') => void;
  profile: UserFoodProfile | null;
  shoppingList: ShoppingListItem[];
  onOpenSetup: () => void;
  onSelectPreset: (presetKey: string) => void;
  onOpenDataSources: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  profile,
  shoppingList,
  onOpenSetup,
  onSelectPreset,
  onOpenDataSources
}) => {
  const pendingItemsCount = shoppingList.filter(item => !item.isPurchased && !item.isInPantry).length;

  return (
    <header className="sticky top-0 z-30 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-stone-200/70">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setActiveTab('semana')}
            className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 font-display flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span>
            <span>Alima</span>
          </button>

          {profile && (
            <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500 pl-3 border-l border-stone-200/70">
              {profile.isSinTacc && <span>Sin TACC</span>}
              {profile.isSinTacc && profile.isHighProtein && <span aria-hidden="true">&bull;</span>}
              {profile.isHighProtein && <span>Alta en proteínas</span>}
              {profile.timePreference === 'rapido' && (
                <>
                  <span aria-hidden="true">&bull;</span>
                  <span>Rápido (&le;20m)</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('semana')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'semana'
                ? 'text-orange-950 font-semibold bg-orange-50/80 border border-orange-200/50'
                : 'hover:text-stone-900'
            }`}
          >
            Semana
          </button>
          
          <button
            onClick={() => setActiveTab('compras')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'compras'
                ? 'text-orange-950 font-semibold bg-orange-50/80 border border-orange-200/50'
                : 'hover:text-stone-900'
            }`}
          >
            <span>Compras</span>
            {pendingItemsCount > 0 && (
              <span className="text-xs bg-orange-100/90 text-orange-900 font-mono font-medium px-1.5 py-0.5 rounded-full">
                {pendingItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'text-orange-950 font-semibold bg-orange-50/80 border border-orange-200/50'
                : 'hover:text-stone-900'
            }`}
          >
            Tu alimentación
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick preset selector for evaluators */}
          <div className="relative group hidden sm:block">
            <button 
              className="min-h-[38px] text-xs text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-xl border border-stone-200/80 bg-white hover:bg-stone-50 transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <span>Casos demo</span>
              <span className="text-stone-400">▾</span>
            </button>
            <div className="absolute right-0 mt-1 w-64 bg-white border border-stone-200 rounded-2xl shadow-lg p-2 hidden group-hover:block z-40">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-2 py-1">
                Demos de prueba
              </div>
              <button
                onClick={() => onSelectPreset('demo_1')}
                className="w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-orange-50/60 hover:text-orange-950 transition-colors"
              >
                <div className="font-medium text-stone-900">Demo 1: Sin TACC + Proteínas</div>
                <div className="text-[11px] text-stone-500 truncate">Poco tiempo, bajo presupuesto</div>
              </button>
              <button
                onClick={() => onSelectPreset('demo_2')}
                className="w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-orange-50/60 hover:text-orange-950 transition-colors"
              >
                <div className="font-medium text-stone-900">Demo 2: Hipertrofia &lt;30 min</div>
                <div className="text-[11px] text-stone-500 truncate">Comidas simples y económicas</div>
              </button>
              <button
                onClick={() => onSelectPreset('demo_3')}
                className="w-full text-left px-2.5 py-2 text-xs rounded-xl hover:bg-orange-50/60 hover:text-orange-950 transition-colors"
              >
                <div className="font-medium text-stone-900">Demo 3: Nutricionista (Déficit)</div>
                <div className="text-[11px] text-stone-500 truncate">Más verduras en almuerzo y cena</div>
              </button>
            </div>
          </div>

          {/* Sources and Verifications Info */}
          <button
            onClick={onOpenDataSources}
            title="Fuentes oficiales: SEPA Precios Claros, ANMAT ALG, USDA"
            className="min-h-[38px] text-xs text-stone-500 hover:text-stone-900 px-2 py-1.5 rounded-xl hover:bg-stone-100 transition-colors"
          >
            Fuentes
          </button>

          {/* New plan / edit action */}
          <button
            onClick={onOpenSetup}
            className="min-h-[38px] px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors shadow-2xs whitespace-nowrap active:scale-98"
          >
            Nueva pauta
          </button>
        </div>

      </div>
    </header>
  );
};
