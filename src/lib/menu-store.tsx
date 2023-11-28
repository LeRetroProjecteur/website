import { create } from "zustand";

export const useMenuStore = create<{
  isOpen: boolean;
}>()(() => ({
  isOpen: false,
}));

export const closeMenu = () => useMenuStore.setState({ isOpen: false });
export const openMenu = () => useMenuStore.setState({ isOpen: true });
