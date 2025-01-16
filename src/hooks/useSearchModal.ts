import { create } from 'zustand';

interface SearchModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useSearchModal = create<SearchModalState>((set: (partial: Partial<SearchModalState>) => void) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));