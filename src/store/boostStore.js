import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useBoostStore = create()(persist((set) => ({
    boosts: 0,
    setBoosts: (boosts) => set({ boosts }),
    decrementBoosts: () => set((state) => ({ boosts: Math.max(0, state.boosts - 1) })),
    incrementBoosts: (amount) => set((state) => ({ boosts: state.boosts + amount })),
}), {
    name: 'boost-storage',
}));
