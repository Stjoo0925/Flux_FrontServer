<template>
  <div class="bidding">
    <div class="current-bid">
      <span v-if="currentHighestBid !== null">{{ currentHighestBid.toLocaleString() }}</span>
      <span v-else>입찰 전입니다.</span>
    </div>
    <div class="input-and-button">
      <input 
        v-model.number="bidAmount" 
        type="number" 
        placeholder="입찰 금액" 
        class="bid-input" 
        :disabled="!isMarketAvailable" 
        step="1000" 
        min="0" 
      />
      <button @click="placeBid" class="bid-button" :disabled="!isMarketAvailable">입찰</button>
      <button @click="buyNow" class="buy-now-button" :disabled="!isMarketAvailable">즉시구매</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const marketId = route.params.marketId;

const authStore = useAuthStore();
const userId = ref(authStore.userId);

const bidAmount = ref(1000);
const isMarketAvailable = ref(true);
const currentHighestBid = ref(null);

onMounted(async () => {
  try {
    // 마켓 상태 가져오기
    const statusResponse = await axios.get(`http://localhost:8080/api/v1/market/${marketId}/status`);
    isMarketAvailable.value = statusResponse.data.marketOrderableStatus;

    // 현재 최고 입찰 가격 가져오기
    const bidResponse = await axios.get(`http://localhost:8080/api/v1/market/${marketId}/current-bid`);
    currentHighestBid.value = bidResponse.data || null;
  } catch (error) {
    console.error('Market 데이터 가져오기 실패:', error);
  }
});

const placeBid = async () => {
  if (!isMarketAvailable.value) {
    console.error('마켓이 입찰을 받을 수 없습니다.');
    return;
  }

  const bidTime = new Date().toISOString();

  try {
    const response = await axios.post('http://localhost:8080/api/v1/bids/register', {
      marketId: marketId,
      userId: userId.value,
      bidAmount: bidAmount.value,
      bidTime: bidTime
    });
    console.log('입찰 성공:', response.data);
    currentHighestBid.value = bidAmount.value;
    alert('입찰 되었습니다.');
  } catch (error) {
    console.error('입찰 실패:', error.response ? error.response.data : error.message);
    alert('입찰이 실패하였습니다.');
  }
};

const buyNow = async () => {
  if (!isMarketAvailable.value) {
    console.error('마켓이 즉시 구매를 받을 수 없습니다.');
    return;
  }

  try {
    await axios.post('http://localhost:8080/api/v1/bids/buy-now', {
      marketId: marketId,
      userId: userId.value
    });
    console.log('즉시구매 완료');
    alert('즉시구매가 완료되었습니다.');
  } catch (error) {
    console.error('즉시 구매 실패:', error);
    alert('즉시구매가 실패하였습니다.');
  }
};
</script>

  
  <style scoped>
  .bidding {
    display: flex;
    flex-direction: column;
  }
  
  .input-and-button {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
    align-items: center; /* 버튼들을 중앙 정렬 */
  }
  
  .current-bid {
    font-weight: bold;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  
  .bid-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  
  .bid-button,
  .buy-now-button {
    background-color: #FEBE98;
    border: none;
    color: white;
    padding: 12px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100px;
  }
  
  .bid-button:hover,
  .buy-now-button:hover {
    background-color: #FD8E4C;
  }
  </style>
  