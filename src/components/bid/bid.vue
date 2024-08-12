<template>
  <div class="bidding">
    <div class="current-bid">
      <span v-if="currentHighestBid !== null">현재 최고 입찰가 : {{ currentHighestBid.toLocaleString() }}</span>
      <span v-else>입찰 전입니다.</span>
    </div>
    <div class="input-and-button">
      <input
        v-model.number="bidAmount"
        type="number"
        placeholder="입찰 금액"
        class="bid-input"
        step="1000"
        min="0"
      />
      <button @click="placeBid" class="bid-button">
        입찰
      </button>
      <button @click="buyNow" class="buy-now-button">
        즉시구매
      </button>
    </div>
    <div class="auto-sum-button">
      <button @click="autoSum(1000)">+천원</button>
      <button @click="autoSum(10000)">+만원</button>
      <button @click="autoSum(50000)">+5만원</button>
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

const bidAmount = ref(0);
const currentHighestBid = ref(null);
const marketMaxPrice = ref(Infinity); // 최대 가격 초기값을 무한대로 설정

onMounted(async () => {
  try {
    // 현재 최고 입찰 가격 가져오기
    const bidResponse = await axios.get(`http://localhost:8080/api/v1/bids/market/${marketId}/current-bid`);
    console.log('현재 최고 입찰 응답 데이터:', bidResponse.data);

    if (bidResponse.data !== null) {
      currentHighestBid.value = bidResponse.data;
      bidAmount.value = bidResponse.data;
    }

    // 마켓 정보에서 최대 가격 가져오기
    const marketResponse = await axios.get(`http://localhost:8080/api/v1/market/${marketId}`);
    console.log('마켓 응답 데이터:', marketResponse.data);

    marketMaxPrice.value = marketResponse.data.marketMaxPrice; // 올바른 필드로 수정

  } catch (error) {
    console.error('Market 데이터 가져오기 실패:', error);
  }
});

const validateBidAmount = () => {
  if (bidAmount.value > marketMaxPrice.value) {
    bidAmount.value = marketMaxPrice.value; // 최대 가격으로 조정
    console.warn(`입찰 금액이 최대 가격을 초과했습니다. 최대 가격은 ${marketMaxPrice.value.toLocaleString()} 원입니다.`);
  }
};

const placeBid = async () => {
  validateBidAmount(); // 입찰 금액 검증

  const confirmation = confirm(`입찰 금액 : ${bidAmount.value.toLocaleString()} 원\n정말 입찰하시겠습니까?`);
  if (!confirmation) return; // 사용자가 취소를 클릭하면 아무 작업도 하지 않음

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
    alert(`입찰이 실패하였습니다. ${error.response ? error.response.data : error.message}`);
  }
};

const buyNow = async () => {
  const confirmation = confirm('정말 즉시 구매하시겠습니까?');
  if (!confirmation) return; // 사용자가 취소를 클릭하면 아무 작업도 하지 않음

  try {
    await axios.post('http://localhost:8080/api/v1/bids/buy-now', {
      marketId: marketId,
      userId: userId.value
    });
    console.log('즉시구매 완료');
    alert('즉시구매가 완료되었습니다.');
  } catch (error) {
    console.error('즉시 구매 실패:', error);
    alert(`즉시구매가 실패하였습니다. ${error.response ? error.response.data : error.message}`);
  }
};

// 버튼 클릭 시 입찰 금액 증가
const autoSum = (amount) => {
  bidAmount.value = Math.min(Number(bidAmount.value) + amount, marketMaxPrice.value);
  validateBidAmount(); // 자동 증가 시에도 검증
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
  align-items: center;
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
