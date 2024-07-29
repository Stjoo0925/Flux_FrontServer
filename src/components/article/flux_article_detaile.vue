<template>
    <div>
      <!-- 아티클 세부 페이지 시작 -->
      <div class="article-container" v-if="article">
        <div class="top">
          <div class="category">
            <h3>{{ article.article_category }}</h3>
          </div>
          <div class="subject">
            <h1>{{ article.article_title }}</h1>
          </div>
        </div>
        <div class="card-container">
          <div class="card">
            <img :src="article.article_imgs" class="card-img-top" :alt="article.article_title">
            <div class="card-body">
              <p class="card-text" v-html="formattedContent"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 아티클 세부 페이지 종료 -->
  
      <!-- 연관 작품 시작 -->
      <div class="related-products-container" v-if="relatedProducts.length">
        <div class="relatedProducts">
          <h3>연관 상품</h3>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
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
      </div>
      <!-- 연관 작품 종료 -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        article: null,
        relatedProducts: []
      };
    },
    computed: {
      formattedContent() {
        return this.article ? this.article.article_contents.replace(/\n/g, '<br>') : '';
      }
    },
    async created() {
      const articleId = this.$route.query.article_id;
      console.log('article_id:', articleId); // Debugging line
  
      try {
        const response = await axios.get(`http://localhost:8001/article`);
        const articles = response.data;
        this.article = articles.find(article => article.article_id === articleId);
        console.log('Found article:', this.article); // Debugging line
  
        // Fetch related products if needed
        const relatedResponse = await axios.get(`http://localhost:8001/related-products?article_id=${articleId}`);
        this.relatedProducts = relatedResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  </script>
  
  
  <style>
  .article-container .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
  }
  
  .article-container .top .category{
    margin-bottom: 10px;
  }
  
  .article-container, .related-products-container {
    width: 100%;
    max-width: 1200px; /* 전체 너비를 제한 */
  }
  
  .article-container {
    margin-top: 20px;
    padding: 20px;
  }
  
  .related-products-container {
    margin-top: 20px;
    padding: 20px;
  }
  
  .card-container {
    display: flex;
    justify-content: center; /* 카드 중앙 정렬 */
  }
  
  .card {
    max-width: 100%;
    width: 100%;
    max-width: 600px; /* 카드의 최대 너비 설정 */
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
  </style>
  