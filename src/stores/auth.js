import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const authUser = localStorage.getItem('authUser');
    let user = null;
    try {
      user = authUser ? JSON.parse(authUser) : null;
    } catch (e) {
      user = null;
    }

    return {
      token: localStorage.getItem('authToken') || '',
      user: user
    };
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('authUser', JSON.stringify(user)); // 유저 정보 저장
    },
    clearAuth() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  persist: true,
});
