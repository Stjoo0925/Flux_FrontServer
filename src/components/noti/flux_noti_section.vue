<script setup>
import { ref, computed } from 'vue';

const notifications = ref([
  {
    noti_id: '1',
    user_id: '1',
    noti_contents: '시스템 점검 안내: 2024년 7월 30일 오전 2시부터 4시까지.',
    noti_createat: '2024-07-25T10:15:30Z',
    noti_updateat: '2024-07-25T10:15:30Z',
  },
  {
    noti_id: '2',
    user_id: '1',
    noti_contents: '새로운 기능 추가: 이제 다크 모드를 사용할 수 있습니다.',
    noti_createat: '2024-07-26T11:25:40Z',
    noti_updateat: '2024-07-26T11:25:40Z',
  },
  {
    noti_id: '3',
    user_id: '1',
    noti_contents: '회원 가입 이벤트: 가입하면 포인트를 드립니다.',
    noti_createat: '2024-07-27T12:35:50Z',
    noti_updateat: '2024-07-27T12:35:50Z',
  },
  {
    noti_id: '4',
    user_id: '1',
    noti_contents: '서비스 이용 약관이 변경되었습니다. 변경된 약관을 확인해주세요.',
    noti_createat: '2024-07-28T13:45:50Z',
    noti_updateat: '2024-07-28T13:45:50Z',
  },
  {
    noti_id: '5',
    user_id: '1',
    noti_contents: '긴급 공지: 현재 시스템 장애로 인해 일부 기능이 제한되고 있습니다.',
    noti_createat: '2024-07-29T14:55:50Z',
    noti_updateat: '2024-07-29T14:55:50Z',
  },
  {
    noti_id: '6',
    user_id: '1',
    noti_contents: '정기 점검 안내: 2024년 8월 1일 오전 1시부터 3시까지.',
    noti_createat: '2024-07-30T15:10:50Z',
    noti_updateat: '2024-07-30T15:10:50Z',
  },
  {
    noti_id: '7',
    user_id: '1',
    noti_contents: '신규 업데이트 알림: 프로필 커스터마이징 기능이 추가되었습니다.',
    noti_createat: '2024-07-31T16:20:50Z',
    noti_updateat: '2024-07-31T16:20:50Z',
  },
  {
    noti_id: '8',
    user_id: '1',
    noti_contents: '보안 강화: 비밀번호 정책이 강화되었습니다. 변경된 규정을 확인해주세요.',
    noti_createat: '2024-08-01T17:30:50Z',
    noti_updateat: '2024-08-01T17:30:50Z',
  },
  {
    noti_id: '9',
    user_id: '1',
    noti_contents: '고객센터 운영 시간 변경: 평일 오전 9시부터 오후 6시까지 운영됩니다.',
    noti_createat: '2024-08-02T18:40:50Z',
    noti_updateat: '2024-08-02T18:40:50Z',
  },
  {
    noti_id: '10',
    user_id: '1',
    noti_contents: '이용자 의견 수렴: 더 나은 서비스를 위해 의견을 보내주세요.',
    noti_createat: '2024-08-03T19:50:50Z',
    noti_updateat: '2024-08-03T19:50:50Z',
  },
]);

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
