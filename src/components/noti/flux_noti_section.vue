<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const notifications = ref([]);
const currentPage = ref(1);
const itemsPerPage = 8;

const totalPages = computed(() => Math.ceil(notifications.value.length / itemsPerPage));

const paginatedNotifications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return notifications.value.slice().reverse().slice(start, start + itemsPerPage);
});

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const fetchNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:8001/notification');
    notifications.value = response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

onMounted(fetchNotifications);
</script>

<template>
  <div class="noti-con">
    <div class="noti-align">
      <div class="noti-title">공지사항</div>
      <table class="notification-table">
        <thead>
          <tr>
            <th class="text-center">번호</th>
            <th>공지내용</th>
            <th class="text-center">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notification in paginatedNotifications" :key="notification.noti_id">
            <td class="text-center">{{ notification.noti_id }}</td>
            <td>{{ notification.noti_contents }}</td>
            <td class="text-center">{{ formatDate(notification.noti_updateat || notification.noti_createat) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div>
  </div>
</template>

<style scoped>
th,td {
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
}

.notification-table th {
    background-color: #FFE9DD !important;
    text-align: center !important;
}
.noti-title{
    font-family: "LINESeedKR-Bd";
    font-size: 32px;
    color: #fd8e4c;
    margin-bottom: 15px;
}

.noti-con {
  width: 90%;
  padding: 20px;
}

.noti-align {
  height: 550px;
  width: 100%;
}

.notification-table {
  width: 100%;
  border-collapse: collapse;
}

.notification-table th,
.notification-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.notification-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 20px;
  border-color: #fd8e4c;
  border-radius: 10px;
  background-color: #febe98;
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  color: #fff;
}

.pagination span {
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
  align-self: center;
}

.text-center{
    text-align: center;
}
</style>
