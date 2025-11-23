import { create } from "zustand";

export const useCustomerStore = create((set) => ({
  customers: [],

  // Save customers and write to sessionStorage
  setCustomers: (data) =>
    set(() => {
      sessionStorage.setItem("customers", JSON.stringify(data));
      return { customers: data };
    }),

  // Load customers from sessionStorage on app start or refresh
  loadFromSession: () =>
    set(() => {
      const stored = sessionStorage.getItem("customers");
      if (stored) {
        return { customers: JSON.parse(stored) };
      }
      return { customers: [] };
    }),
}));
