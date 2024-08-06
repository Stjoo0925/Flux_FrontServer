<template>
  <div class="redirecting">
    <p>Redirecting...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // useAuthStore를 가져옵니다.

const authStore = useAuthStore(); // authStore를 정의합니다.
const router = useRouter(); // router를 정의합니다.

onMounted(() => {
  const result = new window.naver_id_login("teR1JDcGa4Dv2AAhrfpv", "http://localhost:8000/login/oauth2/code/naver");
  const accessToken = result.oauthParams.access_token;

  if (accessToken) {
    axios.post('http://localhost:8080/api/oauth/naver', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log('Token sent successfully:', response.data);
        if (response.data.status === 'success') {
          authStore.setToken(response.data.jwtToken);
          authStore.setUser(response.data.user); // 유저 정보 저장
          router.push('/'); // 로그인 성공 후 홈 페이지로 이동
        } else {
          console.error('로그인 실패:', response.data.message);
          router.push('/login'); // 로그인 실패 시 로그인 페이지로 이동
        }
      })
      .catch(error => {
        console.error('Error sending token:', error);
        router.push('/login'); // 오류 발생 시 로그인 페이지로 이동
      });
  } else {
    console.error('Failed to get access token');
    router.push('/login'); // 토큰이 없을 경우 로그인 페이지로 이동
  }
});
</script>

<style scoped>
.redirecting {
  text-align: center;
  margin-top: 50px;
}
</style>
