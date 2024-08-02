<template>
  <div class="page-container">
    <div class="login-container">
      <div class="row no-gutters h-100">
        <div class="col-md-6 login-image">
          <img :src="randomImage" alt="Login Image" class="img-fluid" />
        </div>
        <div class="col-md-6 login-form d-flex flex-column justify-content-center align-items-center">
          <div class="login-title mb-5">FLUX | LOGIN</div>
          <div class="login-text">
            FLUX는 시장의 유동성과 역동적인 본질을 담아내며 디지털 상거래의
          </div>
          <div class="login-text mb-2">
            끊임없이 변화하는 풍경을 독보적인 정밀성과 민첩성으로 포착합니다
          </div>
          <div class="login-text">
            "FLUX"라는 이름은 지속적인 움직임과 변화를 의미하며
          </div>
          <div class="login-text mb-5">
            경매 경험을 혁신하고 변화에 신속히 대응하는 우리의 의지를
            반영합니다.
          </div>
          <div class="social-buttons mb-3">
            <a href="#" class="social-button"><img src="@/assets/image/google.png" alt="Google Sign-In" /></a>
            <a href="#" class="social-button"><img src="@/assets/image/kakao.png" alt="Kakao Sign-In" /></a>
          </div>
          <div class="login-button mt-3">
            <button type="button" class="btn btn-light">
              <router-link to="/" class="no-underline">홈으로</router-link>
            </button>
            <button type="button" class="btn btn-light">
              <router-link to="/manager" class="no-underline">관리자페이지</router-link>
            </button>
          </div>
          <div class="login-right text-center mt-5">
            <p class="mb-0">© 2024 FLUX. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      images: [
        require('@/assets/image/loginpage/login01.webp'),
        require('@/assets/image/loginpage/login02.webp'),
        require('@/assets/image/loginpage/login03.webp'),
        require('@/assets/image/loginpage/login04.webp'),
        require('@/assets/image/loginpage/login05.webp'),
        require('@/assets/image/loginpage/login06.webp'),
      ],
      randomImage: "",
    };
  },
  methods: {
    getRandomImage() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      return this.images[randomIndex];
    },
  },
  mounted() {
    this.randomImage = this.getRandomImage();
  },
};
</script>
