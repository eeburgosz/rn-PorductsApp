import { create } from 'zustand';
import { User } from '../../../domain/entities';
import type { AuthStatus } from '../../../infrastructure/interfaces';
import { authCheckStatus, authLogin, authRegister } from '../../../actions';
import { StorageAdapter } from '../../../config/api';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;

  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }
    //Todo: Guardar el token en un storage persistente
    await StorageAdapter.setItem('token', resp.token);
    //!-----------------------------------------------
    //  console.log({ resp });
    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },

  register: async (fullName: string, email: string, password: string) => {
    const resp = await authRegister(fullName, email, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }
    await StorageAdapter.setItem('token', resp!.token);
    set({ status: 'authenticated', token: resp!.token, user: resp!.user });
    return true;
  },
}));
