import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Event, TicketType } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (event: Event, ticketType: TicketType, quantity?: number) => void;
  removeItem: (eventId: string, ticketTypeId: string) => void;
  updateQuantity: (eventId: string, ticketTypeId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (event, ticketType, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.event.id === event.id && item.ticketType.id === ticketType.id
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
            };
            return { items: newItems };
          }

          return {
            items: [...state.items, { event, ticketType, quantity }],
          };
        });
      },

      removeItem: (eventId, ticketTypeId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.event.id === eventId && item.ticketType.id === ticketTypeId)
          ),
        }));
      },

      updateQuantity: (eventId, ticketTypeId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(eventId, ticketTypeId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.event.id === eventId && item.ticketType.id === ticketTypeId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.ticketType.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
