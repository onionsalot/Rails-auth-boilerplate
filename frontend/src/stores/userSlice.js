import { create } from "zustand"
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const createUserSlice = (set) => ({
  user: null,
  setUser: (currentUser) => set(() => ({ user: currentUser }))
})

// if (true) {
//   mountStoreDevtool('userStore', useStore);

//   // mountStoreDevtool('Store2', useStore2);
// }