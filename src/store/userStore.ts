import { create } from 'zustand';
import type { UserInfo } from '@/utils/api';

interface UserState {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  isLoadingUserInfo: boolean;
  setUserInfo: (info: UserInfo | null) => void;
  setIsLoggedIn: (status: boolean) => void;
  setIsLoadingUserInfo: (loading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  isLoggedIn: false,
  isLoadingUserInfo: false,
  setUserInfo: (info) => set({ userInfo: info, isLoggedIn: !!info }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsLoadingUserInfo: (loading) => set({ isLoadingUserInfo: loading }),
  logout: () => set({ userInfo: null, isLoggedIn: false }),
}));
