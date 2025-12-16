import {create} from 'zustand'

type AuthState = {
  is_authenticated: boolean,
  log_user_in: () => void,
  log_user_out: () => void
}

export const useAuth = create<AuthState>((set) => ({
  is_authenticated: false,
  log_user_in: () => set({ is_authenticated: true }),
  log_user_out: () => ({ is_authenticated: false })
}))