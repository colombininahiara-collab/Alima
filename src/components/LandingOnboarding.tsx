import React from 'react';
import { PlateGraphic } from './PlateGraphic';
import { ArrowRight, RefreshCw, ShoppingCart, Calendar } from 'lucide-react';
import { DEMO_PRESETS } from '../data/initialData';

interface LandingOnboardingProps {
  onStart: () => void;
  onSelectPreset: (presetKey: string) => void;
}

export const LandingOnboarding: React.FC<LandingOnboardingProps> = ({
  onStart,
  onSelectPreset
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 sm:py-12 px-3.5 sm:px-6 max-w-4xl mx-auto">
      
      {/* Hero Section */}
      <div className="relative pt-4 pb-8 sm:pt-10 sm:pb-12">
        {/* Subtle decorative linear contours */}
        <div className="absolute right-2 top-4 opacity-25 pointer-events-none hidden md:block">
          <PlateGraphic variant="plate" size={160} className="text-orange-300" />
        </div>
        <div className="absolute right-36 top-24 opacity-20 pointer-events-none hidden md:block">
          <PlateGraphic variant="bowl" size={90} className="text-stone-400" />
        </div>
        <div className="absolute right-20 top-40 opacity-20 pointer-events-none hidden md:block">
          <PlateGraphic variant="fruit" size={60} className="text-orange-400" />
        </div>

        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2.5 py-1 rounded-md mb-4 border border-orange-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            <span>Planificación alimentaria real y adaptable</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 font-display leading-[1.18] text-balance">
            Organizá tu alimentación sin pensar todo de nuevo.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed text-balance">
            Contanos qué indicación, restricción u objetivo tenés con tus propias palabras. Armamos una semana práctica que podés adaptar a tu tiempo, tus compras y lo que ya tenés en casa.
          </p>

          {/* Core Action Button */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onStart}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs hover:shadow transition-all duration-150 active:scale-98"
            >
              <span>Empezar con mi indicación</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-stone-500 flex items-center justify-center sm:justify-start gap-1">
              <span>Texto libre · Sustituciones inteligentes · Sin rigidez</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars: Organizar -> Comprar -> Adaptar */}
      <div className="py-6 sm:py-8 border-t border-b border-stone-200/70 my-4 sm:my-6">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mb-4">
          El ciclo simple de Alima
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 mb-1 font-display">1. Organizar</h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Traducimos lo que necesitás (Sin TACC, hipertrofia, indicación de nutricionista) en días y comidas concretas respetando tu tiempo real.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 mb-1 font-display">2. Comprar</h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Generamos una lista de compras dinámica con precios de referencia basados en <strong>SEPA / Precios Claros</strong>, descontando lo que ya tenés.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs relative overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-stone-900 mb-1 font-display">3. Adaptar</h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              ¿No tenés un ingrediente? ¿Es caro? Tocás &ldquo;Adaptar&rdquo; y Alima busca un reemplazo funcionalmente equivalente sin desarmar la semana.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Presets Fast-Load */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs">
        <div className="mb-3">
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-display">
            Casos de prueba para probar inmediatamente
          </h3>
          <p className="text-[11px] text-stone-500">
            Hacé clic en cualquiera de los ejemplos preparados para ver la planificación generada:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <button
            onClick={() => onSelectPreset('demo_1')}
            className="text-left p-3 rounded-xl border border-stone-200/90 hover:border-orange-400 hover:bg-orange-50/30 transition-all group active:scale-98"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-orange-900 mb-1">
              <span>Demo 1 (Prompt)</span>
              <span className="text-orange-500 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
            <div className="text-xs text-stone-800 font-medium line-clamp-2">
              &ldquo;Sin TACC + alta en proteínas + poco tiempo + gastar lo menos posible&rdquo;
            </div>
            <div className="mt-2 text-[10px] text-stone-400">
              Verificación ANMAT ALG · Reemplazos económicos
            </div>
          </button>

          <button
            onClick={() => onSelectPreset('demo_2')}
            className="text-left p-3 rounded-xl border border-stone-200/90 hover:border-orange-400 hover:bg-orange-50/30 transition-all group active:scale-98"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-orange-900 mb-1">
              <span>Demo 2 (Prompt)</span>
              <span className="text-orange-500 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
            <div className="text-xs text-stone-800 font-medium line-clamp-2">
              &ldquo;Alta en proteínas para masa muscular, comidas simples y &le;30 min&rdquo;
            </div>
            <div className="mt-2 text-[10px] text-stone-400">
              4 comidas diarias · Macros equilibrados
            </div>
          </button>

          <button
            onClick={() => onSelectPreset('demo_3')}
            className="text-left p-3 rounded-xl border border-stone-200/90 hover:border-orange-400 hover:bg-orange-50/30 transition-all group active:scale-98"
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-orange-900 mb-1">
              <span>Demo 3 (Nutricionista)</span>
              <span className="text-orange-500 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
            <div className="text-xs text-stone-800 font-medium line-clamp-2">
              &ldquo;Mi nutricionista me indicó reducir calorías y aumentar verduras&rdquo;
            </div>
            <div className="mt-2 text-[10px] text-stone-400">
              Pautas profesionales como criterio organizador
            </div>
          </button>
        </div>
      </div>

      {/* Trust & Transparency Note */}
      <div className="mt-6 text-center text-[11px] text-stone-400 px-2">
        <p>
          Alima es una herramienta de organización práctica. No diagnosticamos ni reemplazamos a profesionales de la salud. Referencias de seguridad alineadas con el Listado Integrado ALG de ANMAT y datos de SEPA / Precios Claros y USDA.
        </p>
      </div>

    </div>
  );
};
