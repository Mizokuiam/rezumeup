interface BoostStore {
    boosts: number;
    setBoosts: (boosts: number) => void;
    decrementBoosts: () => void;
    incrementBoosts: (amount: number) => void;
}
export declare const useBoostStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<BoostStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<BoostStore, BoostStore>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: BoostStore) => void) => () => void;
        onFinishHydration: (fn: (state: BoostStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<BoostStore, BoostStore>>;
    };
}>;
export {};
