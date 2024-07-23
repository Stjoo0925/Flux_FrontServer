<template>
    <div class="page-container">
      <div class="login-container">
        <div class="row no-gutters h-100">
          <div class="col-md-6 login-image">
            <img src="/src/assets/image/loginsample.jpg" alt="Login Image" class="img-fluid">
          </div>
          <div class="col-md-6 login-form d-flex flex-column justify-content-center align-items-center">
            <div class="login-title">FLUX</div>
            <div class="login-text mb-2">환영합니다 FLUX 입니다!</div>
            <div class="login-text">FLUX는 시장의 유동성과 역동적인 본질을 담아내며 디지털 상거래의</div>
            <div class="login-text mb-2">끊임없이 변화하는 풍경을 독보적인 정밀성과 민첩성으로 포착합니다.</div>
            <div class="login-text">"FLUX"라는 이름은 지속적인 움직임과 변화를 의미하며,</div>
            <div class="login-text mb-3">경매 경험을 혁신하고 변화에 신속히 대응하는 우리의 의지를 반영합니다.</div>
            <h2 class="mb-4">- Social Login -</h2>
            <a href="#" class="social-icons"><img src="/src/assets/image/kakaologin.png" class="social-icon" alt="Kakao Login"></a>
            <a href="#" class="social-icons"><img src="/src/assets/image/googlelogin.png" class="social-icon" alt="Google Login"></a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login'
  }
  </script>
  
  <style scoped>
  .page-container {
    height: 100vh; /* 페이지 높이를 화면의 100%로 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-container {
    height: 95%; /* 부모 요소의 높이를 100%로 설정 */
    width: 100%;
    max-width: 1200px; /* 최대 너비 설정 */
    display: flex;
    border-radius: 15px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  
  .row.no-gutters.h-100 {
    height: 100%;
    margin-right: 0;
    margin-left: 0;
  }
  
  .login-image {
    background-color: #000;
    padding: 0;
    border-top-left-radius: 15px; /* 좌상단 곡률 */
    border-bottom-left-radius: 15px; /* 좌하단 곡률 */
  }
  
  .login-image img {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-top-left-radius: 15px; /* 좌상단 곡률 */
    border-bottom-left-radius: 15px; /* 좌하단 곡률 */
  }
  
  .login-form {
    background-color: #FFE9DD;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top-right-radius: 15px; /* 우상단 곡률 */
    border-bottom-right-radius: 15px; /* 우하단 곡률 */
  }
  
  .btn-social {
    width: 80%;
    color: #fff;
    font-family: 'LINESeedKR-Bd';
  }
  
  .btn-facebook {
    background-color: #3b5998;
  }
  
  .btn-google {
    background-color: #db4437;
  }
  
  .btn-twitter {
    background-color: #1da1f2;
  }
  
  .btn-social i {
    margin-right: 8px;
  }
  
  .login-title {
    font-family: 'PuradakGentleGothicR';
    color: #FEBE98;
    font-size: 42px;
    margin-bottom: 30px;
    letter-spacing: 10px;
  }
  
  .login-text {
    font-family: 'LINESeedKR-Bd';
    font-size: 16px;
    color: #fff;
  }
  
  .mb-4 {
    font-family: 'LINESeedKR-Bd';
    font-size: 21px;
    color: #FD8E4C;
    margin: 30px;
  }
  
  .social-icons {
    margin: 12px;
  }
  
  .social-icon {
    width: 200px; /* 원하는 너비 설정 */
    height: auto; /* 높이를 자동으로 설정하여 비율 유지 */
  }
  </style>
  