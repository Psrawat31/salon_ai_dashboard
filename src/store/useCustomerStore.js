import { create } from "zustand";

let memoryStore = {
  customers: []
};

const useCustomerStore = create((set) => ({
  customers: memoryStore.customers,

  setCustomers: (data) => {
    memoryStore.customers = data;
    set({ customers: data });
  },

  addCustomer: (customer) => {
    memoryStore.customers.push(customer);
    set({ customers: memoryStore.customers });
  },
}));

export default useCustomerStore;
