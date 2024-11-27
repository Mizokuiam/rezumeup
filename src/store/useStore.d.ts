import { User } from 'firebase/auth';
interface StoreState {
    user: User | null;
    boosts: number;
    setUser: (user: User | null) => void;
    setBoosts: (boosts: number) => void;
    decrementBoosts: () => void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StoreState>>;
export {};
