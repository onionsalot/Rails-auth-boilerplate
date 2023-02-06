import create from "zustand"
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const createProductSlice = (set) => ({
  products: [],
  setProducts: (p) => set(() => ({ products: p }))
})

// if (true) {
//   mountStoreDevtool('userStore', useStore);

//   // mountStoreDevtool('Store2', useStore2);
// }