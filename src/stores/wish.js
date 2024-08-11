import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useWishStore = defineStore('wish', {
  state: () => ({
    wishedMarkets: new Set(),
  }),
  actions: {
    async fetchWishedMarkets() {
      const authStore = useAuthStore();
      try {
        const response = await axios.get('http://localhost:8080/api/v1/wish/user', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
          },
        });
        if (Array.isArray(response.data)) {
          this.wishedMarkets = new Set(response.data.map(item => item.marketId));
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching wished markets:', error);
      }
    },
    isWished(marketId) {
      return this.wishedMarkets.has(marketId);
    },
    addWish(marketId) {
      this.wishedMarkets.add(marketId);  // Wish 리스트에 추가
    },
    removeWish(marketId) {
      this.wishedMarkets.delete(marketId);  // Wish 리스트에서 제거
    },
    async toggleWish(marketId) {
      const authStore = useAuthStore();
      const token = authStore.token;
      if (!token) {
        console.error('No JWT token found');
        return;
      }

      try {
        if (this.isWished(marketId)) {
          await axios.delete('http://localhost:8080/api/v1/wish', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            data: {
              marketId: marketId,
              userId: authStore.userId,
            }
          });
          this.removeWish(marketId);  // Wish 제거 메소드 호출
        } else {
          await axios.post('http://localhost:8080/api/v1/wish', {
            marketId: marketId,
            userId: authStore.userId,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          this.addWish(marketId);  // Wish 추가 메소드 호출
        }
      } catch (error) {
        console.error('Error toggling wish status:', error);
      }
    },
  },
});
