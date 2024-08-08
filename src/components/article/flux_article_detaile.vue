<template>
  <div>
<!-- 아티클 세부 페이지 시작 -->
<div class="article-container" v-if="article">
  <div class="top">
    <div class="category">
      <h3>{{ article.articleCategory }}</h3>
    </div>
    <div class="subject">
      <h1>{{ article.articleTitle }}</h1>
    </div>
  </div>
  <div class="card-container">
    <div class="card">
      <img :src="article.articleImgPath" class="card-img-top" :alt="article.articleTitle">
      <div class="card-body">
        <p class="card-text" v-html="formattedContent"></p>
      </div>
    </div>
  </div>
</div>
<!-- 아티클 세부 페이지 종료 -->

    <!-- 댓글 등록 부분 시작 -->
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="댓글을 입력하세요" v-model="comment" />
      <button class="btn btn-outline-secondary" type="button" @click="submitComment">댓글 등록</button>
    </div>
    <!-- 댓글 등록 부분 종료 -->

<!-- 연관 작품 시작 -->
<div class="related-products-container">
  <div class="related-products-header" v-if="relatedProducts.length">
    <h3>연관 상품</h3>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4" v-if="relatedProducts.length">
    <div class="col" v-for="(product, index) in relatedProducts" :key="index">
      <div class="card">
        <img :src="product.image" class="card-img-top" :alt="product.title">
        <div class="card-body">
          <h5 class="card-title">{{ product.author }}</h5>
          <h6 class="card-title">{{ product.title }}</h6>
          <p class="card-text">{{ product.status }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 연관 상품이 없는 경우 빈 공간을 유지하도록 추가적인 공간을 만들기 위한 요소 -->
  <div class="no-related-products" v-if="!relatedProducts.length">
    <p>연관 상품이 없습니다.</p>
  </div>
</div>
<!-- 연관 작품 종료 -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const article = ref(null);
const relatedProducts = ref([]);
const comment = ref('');

const formattedContent = computed(() => {
  return article.value ? article.value.articleContents.replace(/\n/g, '<br>') : '';
});

const fetchArticle = async () => {
  const articleId = route.params.id;

  console.log('Article ID:', articleId);

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/articles/${articleId}`);
    article.value = response.data;

    const relatedResponse = await axios.get(`http://localhost:8080/api/v1/related-products?marketId=${marketId}`);
    relatedProducts.value = relatedResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const submitComment = () => {
  // 댓글 등록 로직을 여기에 구현합니다.
  console.log('댓글 등록:', comment.value);
  // 댓글을 서버로 전송하는 로직을 추가할 수 있습니다.
};

onMounted(() => {
  fetchArticle();
});
</script>

<style>
.article-container {
  width: 100%;
  max-width: 1200px; /* 전체 너비를 제한 */
  margin: 20px auto;
  padding: 20px;
}

.article-container .top {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.article-container .top .category {
  margin-bottom: 10px;
}

.article-container .subject {
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: center; /* 카드 중앙 정렬 */
}

.card {
  width: 100%;
  max-width: 600px; /* 카드의 최대 너비 설정 */
}

.related-products-container {
  width: 100%;
  max-width: 1200px; /* 전체 너비를 제한 */
  margin: 20px auto;
  padding: 20px;
  min-height: 200px; /* 최소 높이 설정, 필요에 따라 조정 */
  border-top: 1px solid #ddd; /* 경계선 추가 */
}

.related-products-header {
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.no-related-products {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2em;
  color: #888;
}
</style>
