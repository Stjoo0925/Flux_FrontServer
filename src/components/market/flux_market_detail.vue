<template>
  <!-- Main content -->
  <div class="mt-95 pt-md-5 border-top">
    <!-- Title -->
    <div class="title text-center mb-4">
      <h1>{{ market.market_title }}</h1>
    </div>
    
    <!-- Countdown Timer -->
    <div class="container mt-4">
      <div class="row justify-content-end">
        <div class="col-auto countdown-box mb-4">
          <div class="countdown d-flex align-items-center">
            <div class="time-box">{{ hours }}</div>
            <div class="colon mx-1">:</div>
            <div class="time-box">{{ minutes }}</div>
            <div class="colon mx-1">:</div>
            <div class="time-box">{{ seconds }}</div>
            <div class="ampm-box ms-2">{{ ampm }}</div>
          </div>
        </div>
      </div>

      <!-- Bid and Like buttons -->
      <div class="row justify-content-end mb-4">
        <div class="col-auto">
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary d-flex align-items-center me-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card me-2" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
              </svg>
              입찰
            </button>
            <button class="btn btn-outline-light like-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Information Boxes -->
      <div class="row mb-4">
        <div class="col-12 col-md-4 mb-4">
          <div class="info-box p-3 h-100">
            <h4>작가 정보</h4>
            <p>{{ market.user_name }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4">
          <div class="info-box p-3 h-100">
            <h4>작품 정보</h4>
            <p>{{ market.market_contents }}</p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-4">
          <div class="info-box p-3 h-100">
            <h4>가격 정보</h4>
            <h6>최초가격</h6>
            <p>{{ market.market_price }}</p>
            <h6>바로구매가격</h6>
            <p>{{ market.market_maxprice }}</p>
          </div>
        </div>
      </div>

      <!-- Posts -->
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="image in market.market_imgs" :key="image">
          <div class="hover-card">
            <a :href="market.market_link" class="text-decoration-none">
              <img :src="image" class="img-fluid" />
            </a>
          </div>
        </div>
      </div>

      <!-- Other Works by Artist -->
      <div class="col-12 mb-4 other-works-section">
        <h4>작가의 판매중인 다른 작품</h4>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-4" v-for="work in otherWorks" :key="work.market_id">
            <div class="hover-card">
              <a :href="`/market/detail/${work.market_id}`" class="text-decoration-none">
                <img :src="work.market_imgs[0]" class="img-fluid" />
                <div class="work-info">
                  <h5>{{ work.market_title }}</h5>
                  <p>{{ work.market_price }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      market: {
        market_title: '',
        market_imgs: [],
        market_link: '',
        user_name: '',
        market_contents: '',
        market_price: '',
        market_maxprice: '',
        user_id: '', // Added user_id to keep track of the artist
        market_selldate: '', // Ensure this field exists
        market_duration: '' // Added market_duration field
      },
      otherWorks: [], // Data for other works by the same artist
      endTime: null, // Initially null
      hours: '00',
      minutes: '00',
      seconds: '00',
      ampm: '',
      timer: null
    };
  },
  mounted() {
    this.fetchMarketData(this.$route.query.market_id);
  },
  methods: {
    startCountdown() {
      if (!this.market.market_selldate || !this.market.market_duration) {
        console.error('Auction start time or duration is missing');
        return;
      }

      const startTime = new Date(this.market.market_selldate);
      const duration = this.parseDuration(this.market.market_duration);
      const endTime = new Date(startTime.getTime() + duration);

      this.endTime = endTime;

      this.timer = setInterval(() => {
        const now = new Date();
        const timeLeft = this.endTime - now;
        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / 3600000);
          const minutes = Math.floor((timeLeft % 3600000) / 60000);
          const seconds = Math.floor((timeLeft % 60000) / 1000);
          const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
          this.hours = hours.toString().padStart(2, '0');
          this.minutes = minutes.toString().padStart(2, '0');
          this.seconds = seconds.toString().padStart(2, '0');
          this.ampm = ampm;
        } else {
          clearInterval(this.timer);
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
        }
      }, 1000);
    },
    parseDuration(duration) {
      const match = duration.match(/(\d+)([m|h])/);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        if (unit === 'm') {
          return value * 60000; // minutes to milliseconds
        } else if (unit === 'h') {
          return value * 3600000; // hours to milliseconds
        }
      }
      return 0; // default to 0 if duration is not valid
    },
    async fetchMarketData(market_id) {
      try {
        const response = await axios.get(`http://localhost:8001/market/${market_id}`);
        console.log('Market Data:', response.data); // Console log for debugging
        this.market = response.data;
        this.fetchUserData(response.data.user_id); // Fetch user data based on user_id
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    },
    async fetchUserData(user_id) {
      try {
        const response = await axios.get(`http://localhost:8001/user/${user_id}`);
        console.log('User Data:', response.data); // Console log for debugging
        this.otherWorks = response.data.otherWorks;
        this.startCountdown(); // Initialize countdown after fetching user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.pt-md-5 {
  padding-top: 5rem;
}
.border-top {
  border-top: 1px solid #dee2e6;
}
.title {
  margin-bottom: 1.5rem;
}
.countdown-box {
  display: flex;
  justify-content: flex-end;
}
.countdown {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}
.time-box, .ampm-box {
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.colon {
  font-size: 2rem;
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-outline-light {
  color: #6c757d;
  border-color: #6c757d;
}
.info-box {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 1rem;
  height: 100%;
}
.hover-card {
  overflow: hidden;
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
.img-fluid {
  width: 100%;
  height: auto;
  display: block;
}
.other-works-section {
  margin-top: 2rem;
}
.other-works-section h4 {
  margin-bottom: 1.5rem;
}
.work-info {
  margin-top: 0.5rem;
}
</style>
