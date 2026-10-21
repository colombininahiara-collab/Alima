import React from 'react';
import { X, ShieldCheck, Database, DollarSign, AlertTriangle } from 'lucide-react';

interface DataTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataTransparencyModal: React.FC<DataTransparencyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/35 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-y-auto shadow-xl border border-stone-200/80 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-start justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md mb-1 border border-orange-200/40">
              <span>Transparencia & Confiabilidad</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">
              Fuentes oficiales de referencia y seguridad
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 text-xs text-stone-700 leading-relaxed">
          
          {/* Rule of Product */}
          <div className="p-3.5 bg-orange-50/30 rounded-xl border border-orange-200/50">
            <span className="font-bold text-stone-900 block mb-1">
              Principio de confiabilidad Alima:
            </span>
            <p>
              No inventamos precios de supermercados, ni certificaciones comerciales, ni propiedades médicas. Cuando no contamos con datos fehacientes para verificar un producto industrializado, indicamos explícitamente <strong>&ldquo;NO VERIFICADO&rdquo;</strong> para que revises el rótulo físico antes de consumirlo.
            </p>
          </div>

          {/* 1. SEPA / Precios Claros (Requirement 6) */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm font-display">
              <DollarSign className="w-4 h-4 text-orange-600 shrink-0" />
              <span>SEPA / Precios Claros (Secretaría de Comercio Argentina)</span>
            </div>
            <p>
              Para los precios de productos en Argentina, la referencia prioritaria es el <strong>Sistema Electrónico de Publicidad de Precios Argentinos (SEPA / Precios Claros)</strong>.
            </p>
            <p className="text-stone-500">
              En este MVP utilizamos valores de demostración estructurados a partir de los precios diarios informados por cadenas minoristas en SEPA (Octubre 2026). La arquitectura de datos está preparada para reemplazar estos valores de referencia por consultas directas a los feeds públicos de Precios Claros y Open Prices (Open Food Facts).
            </p>
          </div>

          {/* 2. ANMAT */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm font-display">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ANMAT — Listado Integrado de Alimentos Libres de Gluten (ALG)</span>
            </div>
            <p>
              Para celiaquía y rotulado Sin TACC, la referencia oficial prioritaria en Argentina es el <strong>Listado Integrado ALG de ANMAT</strong>. Diferenciamos alimentos naturalmente libres de gluten (carnes frescas, verduras frescas) de productos industrializados que requieren verificación de lote y logo oficial.
            </p>
          </div>

          {/* 3. Rotulado de Alérgenos */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm font-display">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Rotulado oficial de alérgenos (Normativa ANMAT)</span>
            </div>
            <p>
              De acuerdo a la normativa de rotulado de la República Argentina, distinguimos la declaración obligatoria <strong>&ldquo;Contiene&rdquo;</strong> (ingrediente directo) de <strong>&ldquo;Puede contener&rdquo;</strong> (advertencia de posible contacto cruzado en planta). Ante dudas, priorizamos la seguridad del usuario.
            </p>
          </div>

          {/* 4. USDA FoodData Central */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm font-display">
              <Database className="w-4 h-4 text-stone-600 shrink-0" />
              <span>USDA FoodData Central</span>
            </div>
            <p>
              Los valores nutricionales (calorías, proteínas, hidratos y grasas) se basan en la base de datos estándar de <strong>USDA FoodData Central</strong>. No promovemos una obsesión con el conteo calórico; la información se ofrece como referencia para respaldar tus metas alimentarias.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 rounded-b-2xl flex items-center justify-end sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl shadow-2xs transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
