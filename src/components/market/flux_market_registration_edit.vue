<template>
  <form @submit.prevent="submitForm">
    <div class="registration_edit">
      <h2>아티스트 정보를 입력해 주세요.</h2>
      <p class="sub-text">작가 등록을 하지 않으면, 작품 접수가 불가능합니다. 먼저 작가정보를 등록해주세요.</p>
      <div class="regist_info">
        <div class="input-container">
          <label for="marketTitle">제목</label>
          <input type="text" id="marketTitle" v-model="marketTitle" />
        </div>
        <div class="input-container">
          <label for="marketCategory">분류</label>
          <select id="marketCategory" v-model="selectedCategory">
            <option value="" disabled>선택하세요</option>
            <option value="가죽공예">가죽공예</option>
            <option value="목공예">목공예</option>
            <option value="도자기공예">도자기공예</option>
            <option value="금속공예">금속공예</option>
            <option value="종이공예">종이공예</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div class="input-container">
          <label for="userName">작가명</label>
          <input type="text" id="userName" v-model="userName" />
        </div>
        <div class="input-container">
          <label for="marketContents">작품정보</label>
          <textarea id="marketContents" v-model="marketContents" rows="5"></textarea>
        </div>
        <div class="input-container">
          <label for="marketPrice">최초가격</label>
          <div class="price-container">
            <input type="number" id="marketPrice" v-model.number="marketPrice" />
            <span class="price-note">바로구매가격</span>
            <input type="number" id="marketMaxPrice" v-model.number="marketMaxPrice" class="market-maxprice" />
          </div>
        </div>
        <div class="input-container">
          <label for="userMail">이메일</label>
          <input type="email" id="userMail" v-model="userMail" />
        </div>
        <div class="input-container">
          <label for="fileUpload" class="image-label" @click="triggerFileUpload">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            이미지 첨부
          </label>
          <input type="file" id="fileUpload" multiple @change="handleFileUpload" ref="fileInput" />
        </div>
        <div class="image-preview" v-if="marketImgs.length > 0">
          <div v-for="(image, index) in marketImgs" :key="index" class="image-thumbnail">
            <img v-if="isFile(image)" :src="createObjectURL(image)" alt="Image preview" />
          </div>
        </div>
        <div class="input-container">
          <label for="auctionStartTime">경매 시작 시간</label>
          <div class="datetime-container">
            <input type="datetime-local" id="auctionStartTime" v-model="auctionStartTime" />
          </div>
        </div>
        <div class="input-container">
          <label for="auctionDuration">경매 기간</label>
          <select id="auctionDuration" v-model="auctionDuration">
            <option value="" disabled>기간을 선택하세요</option>
            <option value="1">1시간</option>
            <option value="2">2시간</option>
            <option value="3">3시간</option>
            <option value="6">6시간</option>
            <option value="12">12시간</option>
            <option value="24">24시간</option>
          </select>
        </div>
        <div class="submit-button-container">
          <button type="submit">등록</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const marketTitle = ref('');
const selectedCategory = ref('');
const userName = ref('');
const marketContents = ref('');
const marketPrice = ref('');
const marketMaxPrice = ref('');
const userMail = ref('');
const marketImgs = ref([]);
const auctionStartTime = ref('');
const auctionDuration = ref('');

function handleFileUpload(event) {
  marketImgs.value = Array.from(event.target.files);
}

function isFile(image) {
  return image instanceof File;
}

function createObjectURL(file) {
  return URL.createObjectURL(file);
}

async function getNextId() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/market');
    const marketItems = response.data;
    if (marketItems.length === 0) {
      return 1; // 첫 데이터의 ID는 1
    }
    const maxId = Math.max(...marketItems.map(item => item.marketId));
    return maxId + 1;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 1; // 오류 발생 시 ID를 1로 설정
  }
}
async function submitForm() {
  if (!marketTitle.value || !selectedCategory.value || !userName.value || !marketContents.value ||
      !marketPrice.value || !marketMaxPrice.value || !userMail.value || !auctionStartTime.value || !auctionDuration.value || marketImgs.value.length === 0) {
    alert('모든 필드를 채워주세요.');
    return;
  }

  // 경매 종료 시간 계산
  const startTime = new Date(auctionStartTime.value);
  const durationHours = parseInt(auctionDuration.value, 10);
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

  // FormData 객체 생성 및 데이터 추가
  const formData = new FormData();
  // Remove marketId from formData if the server handles ID generation
  formData.append('userId', 1); // 적절한 userId로 변경
  formData.append('marketTitle', marketTitle.value);
  formData.append('marketCategory', selectedCategory.value);
  formData.append('userName', userName.value);
  formData.append('marketContents', marketContents.value);
  formData.append('marketPrice', marketPrice.value);
  formData.append('marketMaxPrice', marketMaxPrice.value);
  formData.append('userMail', userMail.value);
  formData.append('marketCreateAt', new Date().toISOString()); // 서버와 일치하는 포맷
  formData.append('marketUpdateAt', new Date().toISOString()); // 서버와 일치하는 포맷
  formData.append('marketSellDate', startTime.toISOString()); // 서버와 일치하는 포맷
  formData.append('startDate', startTime.toISOString()); // 서버와 일치하는 포맷
  formData.append('endDate', endTime.toISOString()); // 서버와 일치하는 포맷
  formData.append('marketView', 0);
  formData.append('marketOrderableStatus', 'true');
  marketImgs.value.forEach(file => {
    formData.append('marketImgs', file);
  });

  // Axios를 사용하여 데이터 전송
  try {
    const response = await axios.post('http://localhost:8080/api/v1/market', formData);

    
    console.log('Response:', response.data);
    const createdMarketId = response.data.marketId; // 서버에서 생성된 ID를 사용
    router.push({ path: '/market/detail', query: { marketId: createdMarketId } });
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
}


</script>

<style scoped>
.registration_edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.sub-text {
  margin-bottom: 20px;
  color: #777;
  text-align: center;
}

.regist_info {
  width: 100%;
  max-width: 600px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-container .image-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #FEBE98;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.image-label svg {
  margin-right: 8px;
  width: 24px;
  height: 24px;
}

.input-container input[type="file"] {
  display: none;
}

.input-container input,
.input-container select,
.input-container textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.input-container textarea {
  resize: vertical;
}

.input-container input[type="email"] {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

.input-container input:focus,
.input-container select:focus,
.input-container textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-container input {
  margin-bottom: 5px;
}

.price-note {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.market-maxprice {
  font-size: 14px;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
}

.image-thumbnail {
  margin: 5px;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.image-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.datetime-container {
  display: flex;
  align-items: center;
}

.datetime-container input[type="datetime-local"] {
  margin-right: 10px;
}

.submit-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.submit-button-container button {
  padding: 10px 20px;
  background-color: #FEBE98;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-button-container button:hover {
  background-color: #FFA07A;
}
</style>
