<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg">
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      로그인중...
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  const currentUrl = new URL(window.location.href);
  const googleCode = currentUrl.searchParams.get("code");
  const state = currentUrl.searchParams.get("state");
  let naverAccessToken;
  
  if (window.naver_id_login) {
    const naverLogin = new window.naver_id_login("teR1JDcGa4Dv2AAhrfpv", "http://localhost:8000/login/oauth2/code/naver");
    naverAccessToken = naverLogin.oauthParams.access_token;
  }

  try {
    if (googleCode) {
      console.log("Google login attempt with code:", googleCode);
      const response = await axios.post('http://localhost:8080/api/oauth/google', { code: googleCode });
      console.log("Google login response:", response.data);
      if (response.data.jwtToken) {
        authStore.setToken(response.data.jwtToken);
        authStore.setUser({
          userId: response.data.userId,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role, // role 정보 저장
          provider: 'google'
        });
        currentUrl.searchParams.delete("code");
        currentUrl.searchParams.delete("state");
        window.history.replaceState({}, document.title, currentUrl.toString());
        router.push('/');
      } else {
        console.error('로그인 실패:', response.data.message);
        router.push('/login');
      }
    } else if (naverAccessToken) {
      // console.log("Naver login attempt with token:", naverAccessToken);
      const response = await axios.post('http://localhost:8080/api/oauth/naver', {}, {
        headers: {
          'Authorization': `Bearer ${naverAccessToken}`
        }
      });
      console.log("Naver login response:", '로그인 성공');
      if (response.data.status === 'success') {
        authStore.setToken(response.data.jwtToken);
        authStore.setUser({
          userId: response.data.userId,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role, // role 정보 저장
          provider: 'naver'
        });
        currentUrl.searchParams.delete("code");
        currentUrl.searchParams.delete("state");
        window.history.replaceState({}, document.title, currentUrl.toString());
        router.push('/');
      } else {
        console.error('로그인 실패:', response.data.message);
        router.push('/login');
      }
    } else {
      console.error('Failed to get access token or code');
      router.push('/login');
    }
  } catch (error) {
    console.error('로그인 실패: An unexpected error occurred', error);
    router.push('/login');
  }
});
</script>

<style scoped>
.bg {
  background-color: #FEBE89;
}

button {
  background-color: #FD8E4C !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.22) !important;
}
</style>
