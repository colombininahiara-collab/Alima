import React, { useState, useEffect, useMemo } from 'react';
import { UserFoodProfile, MealPlanSlot, ShoppingListItem, MealRecipe } from './types';
import { DEMO_PRESETS } from './data/initialData';
import { generateMealPlan, generateDynamicShoppingList } from './utils/planner';
import { Header } from './components/Header';
import { LandingOnboarding } from './components/LandingOnboarding';
import { SetupForm } from './components/SetupForm';
import { WeekView } from './components/WeekView';
import { ShoppingListView } from './components/ShoppingListView';
import { ProfileView } from './components/ProfileView';
import { AdaptModal } from './components/AdaptModal';
import { ChangeMealModal } from './components/ChangeMealModal';
import { RecipePrepModal } from './components/RecipePrepModal';
import { DataTransparencyModal } from './components/DataTransparencyModal';
import { Calendar, ShoppingCart, User } from 'lucide-react';

export default function App() {
  // App navigation state
  const [activeTab, setActiveTab] = useState<'semana' | 'compras' | 'perfil'>('semana');
  const [isOnboarding, setIsOnboarding] = useState<boolean>(() => {
    return !localStorage.getItem('alima_has_started');
  });
  const [isSetupOpen, setIsSetupOpen] = useState<boolean>(false);

  // Active user profile state
  const [profile, setProfile] = useState<UserFoodProfile>(() => {
    const saved = localStorage.getItem('alima_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default to Demo 1 from prompt
    return DEMO_PRESETS['demo_1'].profile;
  });

  // Generated meal slots for the active week
  const [mealSlots, setMealSlots] = useState<MealPlanSlot[]>(() => {
    const saved = localStorage.getItem('alima_slots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return generateMealPlan(DEMO_PRESETS['demo_1'].profile);
  });

  // Purchased and manual pantry items
  const [purchasedItemIds, setPurchasedItemIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('alima_purchased');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [manualPantryItemIds, setManualPantryItemIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('alima_manual_pantry');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Modal states
  const [activeAdaptSlot, setActiveAdaptSlot] = useState<MealPlanSlot | null>(null);
  const [activeChangeSlot, setActiveChangeSlot] = useState<MealPlanSlot | null>(null);
  const [activePrepSlot, setActivePrepSlot] = useState<MealPlanSlot | null>(null);
  const [isDataSourcesOpen, setIsDataSourcesOpen] = useState<boolean>(false);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Dynamic Shopping List computation (always synchronized with active week)
  const shoppingList = useMemo(() => {
    return generateDynamicShoppingList(
      mealSlots,
      profile.pantryIngredientsList,
      purchasedItemIds,
      manualPantryItemIds
    );
  }, [mealSlots, profile.pantryIngredientsList, purchasedItemIds, manualPantryItemIds]);

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('alima_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('alima_slots', JSON.stringify(mealSlots));
  }, [mealSlots]);

  useEffect(() => {
    localStorage.setItem('alima_purchased', JSON.stringify(Array.from(purchasedItemIds)));
  }, [purchasedItemIds]);

  useEffect(() => {
    localStorage.setItem('alima_manual_pantry', JSON.stringify(Array.from(manualPantryItemIds)));
  }, [manualPantryItemIds]);

  // Handlers
  const handleSelectPreset = (presetKey: string) => {
    const preset = DEMO_PRESETS[presetKey];
    if (preset) {
      setProfile(preset.profile);
      const newSlots = generateMealPlan(preset.profile);
      setMealSlots(newSlots);
      setIsOnboarding(false);
      setIsSetupOpen(false);
      setActiveTab('semana');
      localStorage.setItem('alima_has_started', 'true');
      showFeedback(`Se cargó: ${preset.label}`);
    }
  };

  const handleSaveProfile = (newProfile: UserFoodProfile) => {
    setProfile(newProfile);
    const newSlots = generateMealPlan(newProfile);
    setMealSlots(newSlots);
    setIsSetupOpen(false);
    setIsOnboarding(false);
    setActiveTab('semana');
    localStorage.setItem('alima_has_started', 'true');
    showFeedback('Semana organizada generada a partir de tu indicación.');
  };

  const showFeedback = (msg: string) => {
    setLastActionMessage(msg);
    setTimeout(() => {
      setLastActionMessage(null);
    }, 4500);
  };

  const handleApplyAdaptation = (updatedSlot: MealPlanSlot, summary: string) => {
    setMealSlots(prev => prev.map(s => s.id === updatedSlot.id ? updatedSlot : s));
    showFeedback(`Comida adaptada: ${summary}`);
  };

  const handleSelectAlternativeRecipe = (newRecipe: MealRecipe) => {
    if (!activeChangeSlot) return;

    const pantryKeywords = profile.pantryIngredientsList.map(p => p.toLowerCase());
    const mappedIngredients = newRecipe.ingredients.map(item => {
      const isFromPantry = pantryKeywords.some(keyword => 
        item.ingredientId.toLowerCase().includes(keyword) || keyword.includes(item.ingredientId)
      );

      return {
        ingredientId: item.ingredientId,
        name: item.ingredientId.replace(/_/g, ' '),
        category: 'Otros' as const,
        quantity: item.quantity,
        unit: item.unit,
        isFromPantry,
        referencePrice: 1500,
        anmatAlgStatus: profile.isSinTacc ? 'verified' as const : 'natural_safe' as const,
        allergens: newRecipe.allergens
      };
    });

    const updated: MealPlanSlot = {
      ...activeChangeSlot,
      recipeId: newRecipe.id,
      recipeName: newRecipe.name,
      prepTimeMin: newRecipe.prepTimeMin,
      calories: newRecipe.baseCalories,
      protein: newRecipe.baseProtein,
      carbs: newRecipe.baseCarbs,
      fat: newRecipe.baseFat,
      ingredients: mappedIngredients,
      instructions: [...newRecipe.instructions],
      adaptationNote: 'Plato cambiado por alternativa compatible.',
      originalRecipeId: newRecipe.id
    };

    setMealSlots(prev => prev.map(s => s.id === updated.id ? updated : s));
    showFeedback(`Comida cambiada por "${newRecipe.name}". Lista de compras recalculada.`);
  };

  const handleTogglePurchased = (ingredientId: string) => {
    setPurchasedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(ingredientId)) {
        next.delete(ingredientId);
      } else {
        next.add(ingredientId);
      }
      return next;
    });
  };

  const handleTogglePantry = (ingredientId: string) => {
    setManualPantryItemIds(prev => {
      const next = new Set(prev);
      if (next.has(ingredientId)) {
        next.delete(ingredientId);
      } else {
        next.add(ingredientId);
      }
      return next;
    });
  };

  const pendingGroceriesCount = shoppingList.filter(i => !i.isPurchased && !i.isInPantry).length;

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-800 flex flex-col justify-between">
      
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={isOnboarding ? null : profile}
        shoppingList={shoppingList}
        onOpenSetup={() => setIsSetupOpen(true)}
        onSelectPreset={handleSelectPreset}
        onOpenDataSources={() => setIsDataSourcesOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-20 md:pb-12">
        {isOnboarding ? (
          <LandingOnboarding
            onStart={() => {
              setIsOnboarding(false);
              setIsSetupOpen(true);
            }}
            onSelectPreset={handleSelectPreset}
          />
        ) : isSetupOpen ? (
          <SetupForm
            initialProfile={profile}
            onSaveProfile={handleSaveProfile}
            onCancel={() => setIsSetupOpen(false)}
          />
        ) : activeTab === 'semana' ? (
          <WeekView
            mealSlots={mealSlots}
            profile={profile}
            onAdaptMeal={(slot) => setActiveAdaptSlot(slot)}
            onChangeMeal={(slot) => setActiveChangeSlot(slot)}
            onViewPrep={(slot) => setActivePrepSlot(slot)}
            onOpenSetup={() => setIsSetupOpen(true)}
            lastActionMessage={lastActionMessage}
          />
        ) : activeTab === 'compras' ? (
          <ShoppingListView
            shoppingList={shoppingList}
            profile={profile}
            onTogglePurchased={handleTogglePurchased}
            onTogglePantry={handleTogglePantry}
            onOpenDataSources={() => setIsDataSourcesOpen(true)}
          />
        ) : (
          <ProfileView
            profile={profile}
            onEditProfile={() => setIsSetupOpen(true)}
            onOpenDataSources={() => setIsDataSourcesOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {activeAdaptSlot && (
        <AdaptModal
          slot={activeAdaptSlot}
          profile={profile}
          isOpen={true}
          onClose={() => setActiveAdaptSlot(null)}
          onApplyAdaptation={handleApplyAdaptation}
        />
      )}

      {activeChangeSlot && (
        <ChangeMealModal
          slot={activeChangeSlot}
          profile={profile}
          isOpen={true}
          onClose={() => setActiveChangeSlot(null)}
          onSelectAlternative={handleSelectAlternativeRecipe}
        />
      )}

      {activePrepSlot && (
        <RecipePrepModal
          slot={activePrepSlot}
          profile={profile}
          isOpen={true}
          onClose={() => setActivePrepSlot(null)}
        />
      )}

      <DataTransparencyModal
        isOpen={isDataSourcesOpen}
        onClose={() => setIsDataSourcesOpen(false)}
      />

      {/* Bottom Sticky Navigation for Mobile/Small Screens (~390px baseline) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FCFAF7]/95 backdrop-blur-md border-t border-stone-200/80 px-4 flex items-center justify-around h-15 shadow-lg"
        aria-label="Navegación móvil"
      >
        <button
          onClick={() => {
            setIsSetupOpen(false);
            setIsOnboarding(false);
            setActiveTab('semana');
          }}
          className={`min-h-[44px] min-w-[70px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors rounded-xl ${
            activeTab === 'semana' && !isSetupOpen && !isOnboarding
              ? 'text-orange-950 font-bold bg-orange-100/60'
              : 'text-stone-500 hover:text-stone-900 active:bg-stone-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Semana</span>
        </button>

        <button
          onClick={() => {
            setIsSetupOpen(false);
            setIsOnboarding(false);
            setActiveTab('compras');
          }}
          className={`min-h-[44px] min-w-[70px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors rounded-xl relative ${
            activeTab === 'compras' && !isSetupOpen && !isOnboarding
              ? 'text-orange-950 font-bold bg-orange-100/60'
              : 'text-stone-500 hover:text-stone-900 active:bg-stone-100'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {pendingGroceriesCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 text-[9px] bg-orange-600 text-white font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-2xs">
                {pendingGroceriesCount}
              </span>
            )}
          </div>
          <span>Compras</span>
        </button>

        <button
          onClick={() => {
            setIsSetupOpen(false);
            setIsOnboarding(false);
            setActiveTab('perfil');
          }}
          className={`min-h-[44px] min-w-[70px] flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors rounded-xl ${
            activeTab === 'perfil' && !isSetupOpen && !isOnboarding
              ? 'text-orange-950 font-bold bg-orange-100/60'
              : 'text-stone-500 hover:text-stone-900 active:bg-stone-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </button>
      </nav>

    </div>
  );
}
