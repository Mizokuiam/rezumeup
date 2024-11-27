import { create } from 'zustand';
export const useStore = create((set) => ({
    user: null,
    boosts: 0,
    setUser: (user) => set({ user }),
    setBoosts: (boosts) => set({ boosts }),
    decrementBoosts: () => set((state) => ({ boosts: Math.max(0, state.boosts - 1) })),
}));
