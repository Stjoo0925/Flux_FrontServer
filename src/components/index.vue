<template>
  <!-- 베너 영역 시작 -->
  <section class="banner">
    <div
      id="carouselExampleInterval"
      class="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="6000">
          <img
            src="../assets/image/flux_main_banner1.webp"
            class="d-block w-100"
            style="height: 65dvh; object-fit: cover"
            alt="..."
          />
        </div>
        <div class="carousel-item" data-bs-interval="6000">
          <img
            src="../assets/image/flux_main_banner2.webp"
            class="d-block w-100"
            style="height: 65dvh; object-fit: cover"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/image/flux_main_banner3.webp"
            class="d-block w-100"
            style="height: 65dvh; object-fit: cover"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <!-- 베너 영역 종료 -->

  <!-- 경매 진행 중 상품들 영역 시작 -->
  <section class="items">
    <div class="title-con">
      <div class="main-title">| 주목받는 핫 아이템</div>
      <div class="line"></div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <router-link :to="`/market/detail/${hotItem.marketId}`" class="col" v-for="(hotItem, index) in hotItems" :key="index">
        <div class="card fixed-size-card">
          <img
            :src="hotItem.market_imgs"
            class="card-img-top fixed-size-img"
            :alt="`${index + 1}번`"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ hotItem.marketName }}</h5>
            <p class="card-text">{{ hotItem.marketPrice }}원</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="title-con">
      <div class="main-title">| 최근 등록된 상품</div>
      <div class="line"></div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <router-link :to="`/market/detail/${market.marketId}`" class="col" v-for="(market, index) in recentItems" :key="index">
        <div class="card fixed-size-card">
          <img
            :src="market.marketImgs"
            class="card-img-top fixed-size-img"
            :alt="`${index + 1}번`"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ market.marketName }}</h5>
            <p class="card-text">{{ market.marketPrice }}원</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="title-con">
      <div class="main-title">| 최근 아티클</div>
      <div class="line"></div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <router-link :to="`/article/detail/${item.articleId}`" class="col" v-for="(item, index) in recentArticles" :key="index">
        <div class="card fixed-size-card">
          <img
            :src="item.articleImgPath"
            class="card-img-top fixed-size-img"
            :alt="`${index + 1}번`"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.articleTitle }}</h5>
            <p class="card-text">{{ item.articleAuthor }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </section>
  <!-- 경매 진행 중 상품들 영역 종료 -->
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// 데이터를 저장할 참조 변수
const marketData = ref([]);
const articleData = ref([]);

const hotItems = ref([]);
// console.log(hotItems);
const recentItems = ref([]);
console.log(recentItems);
const recentArticles = ref([]);
// console.log(recentArticles);

// API에서 데이터를 가져오는 함수
const fetchMarketData = async () => {
  try {
    // console.log("API 요청 시작");
    // 시장 데이터와 기사 데이터를 동시에 가져옴
    const [marketResponse, articleResponse] = await Promise.all([
      axios.get("http://localhost:8080/api/v1/market"),
      axios.get("http://localhost:8080/api/v1/articles"),
    ]);
    // console.log("API 응답 받음", marketResponse.data, articleResponse.data);

    // API 응답 구조 확인
    // console.log('marketResponse.data:', marketResponse.data);
    // console.log('articleResponse.data:', articleResponse.data);

    // 가져온 데이터를 참조 변수에 저장
    marketData.value = marketResponse.data; // 구조에 맞게 저장
    articleData.value = articleResponse.data; // 구조에 맞게 저장
    // console.log('시장 데이터 저장 완료:', JSON.stringify(marketData.value, null, 2));
    // console.log('기사 데이터 저장 완료:', JSON.stringify(articleData.value, null, 2));

    // 데이터를 처리하여 필요한 정보를 추출
    processMarketData(marketData.value);
    processArticleData(articleData.value);
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error);
  }
};

// 시장 데이터를 처리하는 함수
const processMarketData = (data) => {
  hotItems.value = data
    .slice()
    .sort((a, b) => b.marketView - a.marketView)
    .slice(0, 3);
  // console.log("인기 항목 처리 완료", JSON.stringify(hotItems.value, null, 2));

  recentItems.value = data
    .slice()
    .sort((a, b) => new Date(b.marketCreatedAt) - new Date(a.marketCreatedAt))
    .slice(0, 3);
  // console.log(
  //   "최신 항목 처리 완료",
  //   JSON.stringify(recentItems.value, null, 2)
  // );
};

// 기사 데이터를 처리하는 함수
const processArticleData = (data) => {
  recentArticles.value = data
    .slice()
    .sort((a, b) => new Date(b.articleCreateAt) - new Date(a.articleCreateAt))
    .slice(0, 3);
  // console.log(
  //   "최신 기사 처리 완료",
  //   JSON.stringify(recentArticles.value, null, 2)
  // );
};

// 컴포넌트가 마운트될 때 데이터를 가져옴
onMounted(fetchMarketData);

// marketData와 articleData가 변경될 때마다 데이터를 처리
watch(
  marketData,
  (newData) => {
    processMarketData(newData);
  },
  { immediate: true }
);

watch(
  articleData,
  (newData) => {
    processArticleData(newData);
  },
  { immediate: true }
);
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-left: 50px;
}

.title-con {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
}

.line {
  flex-grow: 1;
  height: 2px;
  background-color: #febe98;
  margin-left: 10px;
  margin-right: 55px;
}

.main-title {
  font-family: "LINESeedKR-Bd";
  font-size: 30px !important;
  margin-left: 50px;
  margin-right: 20px;
  color: #febe98;
}

/* 베너 css */
.carousel-inner {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}
/* 베너 끝 */

/* 아이템들 시작 */
.items p {
  margin: 20px 0 0 20px;
}

.items .card {
  height: 500px; /* 카드 전체 높이 고정 */
  display: flex;
  flex-direction: column;
  border: 3px solid #ffe9dd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.items .card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.items .card img {
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  height: 400px; /* 고정된 높이 */
  object-fit: cover; /* 이미지가 왜곡되지 않도록 함 */
}

.items .card .card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row {
  margin: 10px 50px 10px 50px;
}

.pagination-black .page-link {
  color: black; /* 페이지 링크 색상을 검정색으로 */
}

.pagination-black .page-link:hover {
  background-color: #000; /* 링크 호버시 배경색을 검정색으로 */
  color: #fff; /* 링크 호버시 글자색을 흰색으로 */
}
/* 아이템들 끝 */

.card-title {
  font-family: "LINESeedKR-Bd";
  font-size: 18px;
}

.card-text {
  font-family: "LINESeedKR-Bd";
  font-size: 16px;
}

a {
  text-decoration: none; /* 모든 링크에서 밑줄 제거 */
}

.router-link-active {
  text-decoration: none; /* 활성화된 라우터 링크에서도 밑줄 제거 */
}

.router-link-exact-active {
  text-decoration: none; /* 정확히 일치하는 라우터 링크에서도 밑줄 제거 */
}
</style>
