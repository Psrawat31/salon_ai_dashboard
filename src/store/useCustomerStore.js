import { create } from "zustand";

const useCustomerStore = create((set) => ({
  customers: [],

  // Save new list
  setCustomers: (list) => {
    sessionStorage.setItem("customers", JSON.stringify(list));
    set({ customers: list });
  },

  // Load from sessionStorage
  loadFromSession: () => {
    try {
      const stored = sessionStorage.getItem("customers");
      if (stored) {
        const parsed = JSON.parse(stored);
        set({ customers: parsed });
      }
    } catch (err) {
      console.error("Error loading from session:", err);
    }
  },
}));

export default useCustomerStore;
