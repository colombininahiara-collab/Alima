import React, { useState } from 'react';
import { ShoppingListItem, IngredientCategory, UserFoodProfile } from '../types';
import { 
  Check, 
  ShoppingCart, 
  HelpCircle, 
  ShieldCheck, 
  ShieldAlert, 
  Home, 
  Share2, 
  DollarSign
} from 'lucide-react';
import { PlateGraphic } from './PlateGraphic';

interface ShoppingListViewProps {
  shoppingList: ShoppingListItem[];
  profile: UserFoodProfile;
  onTogglePurchased: (ingredientId: string) => void;
  onTogglePantry: (ingredientId: string) => void;
  onOpenDataSources: () => void;
}

const CATEGORY_ORDER: IngredientCategory[] = [
  'Frutas y verduras',
  'Proteínas',
  'Lácteos y alternativas',
  'Almacén',
  'Otros'
];

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  shoppingList,
  profile,
  onTogglePurchased,
  onTogglePantry,
  onOpenDataSources
}) => {
  const [showPantrySection, setShowPantrySection] = useState(true);
  const [copiedToast, setCopiedToast] = useState(false);

  // Split into: Items to buy VS Items already at home
  const itemsToBuy = shoppingList.filter(item => !item.isInPantry);
  const itemsInPantry = shoppingList.filter(item => item.isInPantry);

  // Calculate estimated reference cost of items to buy (excluding pantry items)
  const estimatedTotalARS = itemsToBuy.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const purchasedCount = itemsToBuy.filter(i => i.isPurchased).length;

  const handleShareList = () => {
    const lines = itemsToBuy.map(i => `${i.isPurchased ? '✓ ' : '• '}${i.name}: ${i.totalQuantity} ${i.unit}`);
    const text = `Lista de compras - Alima:\n\n${lines.join('\n')}\n\nTotal estimado: ~$${estimatedTotalARS.toLocaleString('es-AR')} (Referencia SEPA / Precios Claros)`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-orange-800 bg-orange-50/80 px-2 py-0.5 rounded-md mb-1.5 border border-orange-200/40">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
            <span>Lista de compras dinámica</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            Lista de compras
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Sincronizada en tiempo real con las comidas de tu semana.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareList}
            className="min-h-[42px] px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200/90 hover:bg-stone-50 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-400" />
            <span>{copiedToast ? '¡Copiada!' : 'Copiar lista'}</span>
          </button>
        </div>
      </div>

      {/* Costo Estimado & SEPA / Precios Claros Reference Banner (Requirement 6) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs mb-6 relative overflow-hidden">
        {/* Subtle decorative linear plate outline */}
        <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
          <PlateGraphic variant="pan" size={100} className="text-orange-400" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
              <span>Costo estimado de la compra</span>
              <button 
                onClick={onOpenDataSources}
                className="text-stone-400 hover:text-stone-700 p-0.5" 
                title="Ver metodología de precios SEPA / Precios Claros"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">
                ~${estimatedTotalARS.toLocaleString('es-AR')}
              </span>
              <span className="text-xs text-stone-500 font-normal">
                ARS
              </span>
            </div>

            {/* Clear SEPA reference tag */}
            <div className="mt-2 text-[11px] text-stone-500 flex flex-wrap items-center gap-1.5 leading-snug">
              <span className="font-semibold text-stone-700">Precio de referencia:</span>
              <span>SEPA / Precios Claros (Secretaría de Comercio).</span>
              <span className="text-stone-400">· Actualización: Octubre 2026.</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-3 text-xs font-mono text-stone-600 bg-stone-50/80 p-2.5 sm:p-3 rounded-xl border border-stone-200/70">
            <div>
              <div className="text-[10px] text-stone-400 uppercase">A comprar</div>
              <div className="font-bold text-stone-800">{itemsToBuy.length}</div>
            </div>
            <div className="h-6 w-px bg-stone-200"></div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase">En casa</div>
              <div className="font-bold text-emerald-700">{itemsInPantry.length}</div>
            </div>
            <div className="h-6 w-px bg-stone-200"></div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase">Comprados</div>
              <div className="font-bold text-orange-700">{purchasedCount}/{itemsToBuy.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Categories List */}
      <div className="space-y-4">
        {CATEGORY_ORDER.map(category => {
          const categoryItems = itemsToBuy.filter(i => i.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
              <div className="px-4 py-3 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold text-stone-800 font-display">
                  {category}
                </h2>
                <span className="text-[11px] text-stone-400 font-mono">
                  {categoryItems.length} {categoryItems.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>

              <div className="divide-y divide-stone-100">
                {categoryItems.map(item => (
                  <div 
                    key={item.id}
                    className={`p-3 sm:p-3.5 flex items-center justify-between gap-2.5 transition-colors ${
                      item.isPurchased ? 'bg-stone-50/60 opacity-60' : 'hover:bg-orange-50/15'
                    }`}
                  >
                    {/* Left: Checkbox + Name + ANMAT Tag */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => onTogglePurchased(item.ingredientId)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                          item.isPurchased
                            ? 'bg-orange-600 border-orange-600 text-white'
                            : 'border-stone-300 hover:border-orange-500 bg-white'
                        }`}
                        title={item.isPurchased ? 'Marcar como pendiente' : 'Marcar como comprado'}
                        aria-label={`Marcar ${item.name}`}
                      >
                        {item.isPurchased && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className={`text-xs sm:text-sm font-semibold text-stone-900 truncate ${
                            item.isPurchased ? 'line-through text-stone-400' : ''
                          }`}>
                            {item.name}
                          </span>
                        </div>

                        {/* ANMAT ALG / Safety indication */}
                        {profile.isSinTacc && (
                          <div className="mt-0.5 flex items-center gap-1 text-[10px]">
                            {item.anmatAlgStatus === 'verified' && (
                              <span className="text-emerald-700 flex items-center gap-0.5 font-medium">
                                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>ANMAT ALG</span>
                              </span>
                            )}
                            {item.anmatAlgStatus === 'natural_safe' && (
                              <span className="text-stone-400">
                                Sin TACC natural
                              </span>
                            )}
                            {item.anmatAlgStatus === 'unverified' && (
                              <span className="text-amber-800 bg-amber-50 px-1 py-0.2 rounded font-semibold flex items-center gap-0.5">
                                <ShieldAlert className="w-3 h-3 text-amber-600 shrink-0" />
                                <span>Verificar rótulo</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Quantity + Reference Price + "Ya lo tengo" button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-stone-800 font-mono whitespace-nowrap">
                          {item.totalQuantity} {item.unit}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono whitespace-nowrap" title={item.priceSource}>
                          ~${item.estimatedPrice.toLocaleString('es-AR')}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onTogglePantry(item.ingredientId)}
                        className="min-h-[36px] px-2.5 py-1 text-[11px] rounded-lg border border-stone-200 hover:border-emerald-400 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors whitespace-nowrap"
                        title="Tengo este ingrediente en casa (descontar de la compra)"
                      >
                        Ya tengo
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Ya tengo en casa" collapsible list */}
      {itemsInPantry.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs">
          <div 
            onClick={() => setShowPantrySection(!showPantrySection)}
            className="p-3.5 bg-emerald-50/40 border-b border-emerald-100/60 flex items-center justify-between cursor-pointer hover:bg-emerald-50/70 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-emerald-700" />
              <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-display">
                Ingredientes en tu alacena ({itemsInPantry.length})
              </h2>
            </div>
            <div className="text-[11px] text-emerald-800 font-medium">
              {showPantrySection ? 'Ocultar' : 'Mostrar'}
            </div>
          </div>

          {showPantrySection && (
            <div className="divide-y divide-stone-100">
              {itemsInPantry.map(item => (
                <div key={item.id} className="p-2.5 sm:p-3 flex items-center justify-between text-xs hover:bg-stone-50/50">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-stone-800">{item.name}</span>
                    <span className="text-stone-400 text-[11px]">({item.totalQuantity} {item.unit})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onTogglePantry(item.ingredientId)}
                    className="text-[11px] text-stone-500 hover:text-orange-700 underline"
                  >
                    Pasar a compras
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
