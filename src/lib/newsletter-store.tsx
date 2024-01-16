import { create } from "zustand";

export const useNewsletterStore = create<{
  isOpen: boolean;
}>()(() => ({
  isOpen: false,
}));

export const closeNewsLetter = () =>
  useNewsletterStore.setState({ isOpen: false });
export const openNewsLetter = () =>
  useNewsletterStore.setState({ isOpen: true });
