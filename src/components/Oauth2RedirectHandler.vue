<template>
  <div class="redirecting">
    <p>Redirecting...</p>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  onMounted(()=>{
    const result = new window.naver_id_login("oKCmWOZPLq_7KuifNkdG","http://localhost:8000/login/oauth2/code/naver");
    console.log(result.getAccessToken());
  })
</script>



<!-- 
<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'OAuth2RedirectHandler',
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      await this.handleLoginSuccess(code);
    } else if (error) {
      this.handleLoginError(error);
    }
  },
  methods: {
    async handleLoginSuccess(code) {
      try {
        const response = await axios.get(`http://localhost:8080/login/oauth2/code/naver?code=${code}`);
        const token = response.data.token;
        this.authStore.setToken(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.$router.push('/');
      } catch (error) {
        console.error('Error fetching token:', error);
        this.$router.push('/login');
      }
    },
    handleLoginError(error) {
      console.error('Login error:', error);
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.redirecting {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style> -->
