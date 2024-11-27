import { create } from 'zustand';
import { User } from '/auth';

interface StoreState {
  user: User | null;
  boosts: number;
  setUser: (user: User | null) => void;
  setBoosts: (boosts: number) => void;
  decrementBoosts: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  boosts: 0,
  setUser: (user) => set({ user }),
  setBoosts: (boosts) => set({ boosts }),
  decrementBoosts: () => set((state) => ({ boosts: Math.max(0, state.boosts - 1) })),
}));