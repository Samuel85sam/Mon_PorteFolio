import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { User } from '../Types-Interfaces/CRUD-Types/CRUD.types';

export interface NewUserData {
    currentUser: User['_id'],
    jwt: User['jwt'],
    isAuthenticated: boolean
}

interface AuthStore {
    logout: any
    currentUser: User['_id'] | null,
    jwt: string | null,
    isAuthenticated: boolean
    addUserData: (newUserData: NewUserData) => void
};

const initialUserState = {
    currentUser: null,
    jwt: null,
    isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
    persist(devtools(
        (set, get) => ({
            ...initialUserState,
            addUserData: (newUserData) => set((state) => (
                {
                    currentUser: newUserData.currentUser,
                    jwt: newUserData.jwt,
                    isAuthenticated: true,
                }
            )),
            logout: () => set((state) => (
                { ...initialUserState }
            )),
        })
    ),
        {
            name: 'authStorage',
        })

);
