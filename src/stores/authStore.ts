// authStore.js
import { create } from "zustand";

// interface AuthStore {
//   user: { username: string } | null;
//   token: string | null;
//   login: (userData: { username: string }, token: string) => void;
//   logout: () => void;
// }

const useAuthStore = create<any>((set: any) => ({
  user: null,
  token: null,
  login: (userData: any, token: string) => set({ user: userData, token }),
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
