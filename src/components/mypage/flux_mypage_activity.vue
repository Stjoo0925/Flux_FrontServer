<template>
    <div class="flux_mypage_activity">
        <h2>활동내역</h2>
<!--         
        <div class="activity-section">
            <h3>입찰내역</h3>
            <ul class="list-group">
                <li v-for="market in bidItems" :key="market.marketId" class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="item-info d-flex align-items-center">
                        <img v-if="market.marketImgs && market.marketImgs.length > 0" :src="market.marketImgs[0]" alt="상품 이미지" class="product-image">
                        <div class="item-details">
                            <h4>{{ market.marketName }}</h4>
                        </div>
                    </div>
                </li>
            </ul>
        </div>  -->
        
        
        <div class="activity-section">
    <h3>판매내역</h3>
    <ul class="list-group">
        <li v-for="sale in saleItems" :key="sale.saleId" class="list-group-item d-flex justify-content-between align-items-center">
            <div class="item-info d-flex align-items-center">
                <!-- 이미지 URL이 정의되어 있는지 확인 -->
                <img v-if="sale.market.marketImgs && sale.market.marketImgs.length > 0" :src="sale.market.marketImgs[0]" alt="상품 이미지" class="product-image">
                <div class="item-details">
                    <h4>{{ sale.market.marketName }}</h4>
                </div>
            </div>
            <div class="action-buttons">
                <button class="edit-button">수정</button>
                <button class="delete-button">삭제</button>
            </div>
        </li>
    </ul>
</div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const userId = computed(() => authStore.userId);
const saleItems = ref([]);

const isValidUserId = (id) => {
    return id && id.trim() !== '';
};

const fetchSale = async (userId) => {
    if (!isValidUserId(userId)) {
        console.error('User ID is not valid');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8080/api/user/sale/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore.token}`
            }
        });
        console.log('API Response:', response.data); // 응답 데이터 확인
        saleItems.value = response.data;
    } catch (error) {
        console.error('Failed to fetch sale items:', error);
        saleItems.value = [];
    }
};


onMounted(() => {
    if (isValidUserId(userId.value)) {
        fetchSale(userId.value);
    } else {
        console.error('User ID is not defined or invalid');
        alert('Unable to retrieve user data. Please try again later.');
        
        // 디버깅을 위한 임시 데이터
        saleItems.value = [
            {
                saleId: 1,
                market: {
                    marketName: 'Sample Product 1',
                    marketImgs: ['https://via.placeholder.com/150']
                }
            },
            {
                saleId: 2,
                market: {
                    marketName: 'Sample Product 2',
                    marketImgs: ['https://via.placeholder.com/150']
                }
            }
        ];
    }
});


</script>


<style scoped>
.flux_mypage_activity {
    padding: 20px;
    background-color: #ffffff;
    color: #333;
    border-radius: 10px;
    font-family: 'LINESeedKR-Bd';
}

.flux_mypage_activity h2 {
    font-size: 50px;
    margin-bottom: 20px;
    color: #000000;
    padding: 10px;
    border-radius: 5px;
}

.activity-section {
    margin-bottom: 40px;
    padding-left: 50px;
}

.activity-section h3 {
    font-size: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    color: #ffffff;
    background-color: #FEBE98;
    padding: 10px;
    border-radius: 5px;
    display: inline-block; /* 텍스트 길이에 맞추기 위해 추가 */
}

.list-group {
    max-height: 470px; /* 스크롤을 위해 최대 높이 설정 */
    overflow-y: auto;
    padding: 0;
    margin: 0;
    list-style: none;
}

.list-group-item {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 15px;
    transition: background-color 0.3s;
}

.list-group-item:hover {
    background-color: #FFE9DD;
}

.item-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap; /* 반응형으로 변경 */
}

.product-image {
    width: 100px; /* 이미지 크기 키움 */
    height: 100px;
    border-radius: 5px;
    margin-right: 15px;
    border: 2px solid #FD8E4C;
}

.item-details h4 {
    margin: 0;
    font-size: 24px; /* 텍스트 크기 키움 */
    color: #FD8E4C;
}

.item-details p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
}

.heart-icon {
    font-size: 24px;
    color: #FD8E4C;
}

.action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap; /* 반응형으로 변경 */
}

.edit-button, .delete-button {
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.1s ease, background-color 0.3s, color 0.3s;
    flex: 1 1 auto; /* 반응형으로 변경 */
    min-width: 50px; /* 최소 너비 설정 */
}

.edit-button {
    background-color: #6c757d;
    color: white;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}

.edit-button:hover {
    background-color: #5a6268;
}

.delete-button:hover {
    background-color: #c82333;
}

.edit-button:active, .delete-button:active {
    transform: scale(0.95);
}

@media (max-width: 600px) {
    .item-info {
        flex-direction: column; /* 작은 화면에서 세로로 정렬 */
        align-items: flex-start;
    }

    .action-buttons {
        flex-direction: column; /* 작은 화면에서 세로로 정렬 */
        width: 15%; /* 버튼들이 전체 너비 차지 */
    }

    .edit-button, .delete-button {
        width: 15%; /* 버튼들이 전체 너비 차지 */
    }
}
</style>
