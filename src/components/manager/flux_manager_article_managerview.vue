<template>
  <div class="modi-container" v-if="article">
    <div class="article-container">
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
          <img :src="article.articleImgPath" class="card-img-top" alt="이미지">
          <div class="card-body">
            <p class="card-text">
              {{ article.articleContents }}<br>
              {{ article.articleCreateAt }}<br>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modibutton">
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <router-link class="btn btn-primary me-md-2" to="/manager">확인</router-link>
        <router-link 
          class="btn btn-primary me-md-2" 
          :to="{ path: '/manager/article/articlemodify', query: { id: article.articleId } }" 
          type="button">
          수정
        </router-link>
        <button @click="deleteArticle" class="btn btn-outline-danger" type="button">삭제</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'ManagerArticleView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const articleId = ref(route.query.id);
    const article = ref(null);

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/articles/${articleId.value}`);
        article.value = response.data; // 응답에서 article 데이터에 직접 접근
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const deleteArticle = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/v1/articles/${articleId.value}`);
        router.push('/manager/article/articlelist');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    };

  onMounted(async () => {
  await fetchArticle();
  console.log('Fetched Article:', article.value);
});
    return {
      articleId,
      article,
      deleteArticle
    };
  }
};
</script>

<style>
.modi-container {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.modibutton {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn {
  background-color: #FD8E4C;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.btn-outline-danger {
  border: 1px solid #dc3545;
  color: #dc3545;
  background-color: transparent;
}

.btn:hover {
  background-color: #e67e22;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}
</style>
