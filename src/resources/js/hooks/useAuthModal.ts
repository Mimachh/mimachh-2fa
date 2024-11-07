
import { create } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}


interface useAuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  tab: string;
  setTab: (tab: string) => void;
}

export const useAuthModal = createSelectors(create<useAuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  tab: "login",
  setTab: (tab) => set({ tab }),
})));

