<template>
    <!-- 아티클 세부 페이지 (관리자용) 시작 -->
    <div class="modi-container">
        <div class="article-container" v-if="article">
            <div class="top">
                <div class="category">
                    <h3>{{ article.category }}</h3>
                </div>
                <div class="subject">
                    <h1>{{ article.title }}</h1>
                </div>
            </div>
            <div class="card-container">
                <div class="card">
                    <img :src="article.imageUrl" class="card-img-top" alt="Article Image">
                    <div class="card-body">
                        <p class="card-text">
                            {{ article.content }} <br>
                            {{ article.date }}<br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>Loading...</div>
        <!-- 수정 버튼 -->
        <div class="modibutton">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <router-link class="btn btn-primary me-md-2" :to="{ path: '/manager/article/articlemodify', query: { id: articleId } }" type="button">수정</router-link>
                <button class="btn btn-outline-danger" @click="deleteArticle">삭제</button>
            </div>
        </div>
    </div>
    <!-- 아티클 세부 페이지 (관리자용) 종료 -->
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    name: 'ManagerArticleView',
    setup() {
        const route = useRoute();
        const articleId = ref(route.query.id);
        const article = ref(null);

        onMounted(async () => {
            try {
                const response = await axios.get(`http://localhost:8001/article/${articleId.value}`);
                article.value = response.data;
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        });

        const deleteArticle = async () => {
            try {
                await axios.delete(`http://localhost:8001/article/${articleId.value}`);
                alert('Article deleted successfully!');
                // Redirect or handle after deletion
                // For example, redirect to the article list page:
                window.location.href = '/manager/article';
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        };

        return {
            articleId,
            article,
            deleteArticle
        };
    }
};
</script>

<style scoped>
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
