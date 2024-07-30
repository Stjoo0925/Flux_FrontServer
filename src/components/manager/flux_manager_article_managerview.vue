<template>
    <!-- 아티클 세부 페이지 (관리자용) 시작 -->
    <div class="modi-container" v-if="article">
        <div class="article-container">
            <div class="top">
                <div class="category">
                    <h3> {{ article.articleCategory }} </h3>
                </div>
                <div class="subject">
                    <h1> {{ article.articleTitle }} </h1>
                </div>
            </div>
            <div class="card-container">
                <div class="card">
                    <img :src="article.articleImgUrl"
                        class="card-img-top" alt="예시">
                    <div class="card-body">
                        <p class="card-text">
                            {{ article.articleContent }} <br>
                            {{ article.articleCreate }}<br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 수정 버튼 -->
        <div class="modibutton">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <router-link class="btn btn-primary me-md-2" :to="{ path: '/manager/article/articlemodify', query: { id: article.articleId } }" type="button">수정</router-link>
                <button @click="deleteArticle" class="btn btn-outline-danger" type="button">삭제</button>
            </div>
        </div>
    </div>
    <!-- 아티클 세부 페이지 (관리자용) 종료 -->
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
                const response = await axios.get(`http://localhost:8081/manager/article/article/${articleId.value}`);
                article.value = response.data.data; // Assuming response.data contains { data: ArticleDTO }
            } catch (error) {
                console.error('Error fetching article:', error);
                // Optionally, you can redirect or show an error message here
            }
        };

        const deleteArticle = async () => {
            try {
                await axios.delete(`http://localhost:8081/manager/article/article/${articleId.value}`);
                router.push('/manager/article/articlelist');
            } catch (error) {
                console.error('Error deleting article:', error);
                // Optionally, you can show an error message here
            }
        };

        onMounted(() => {
            fetchArticle();
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
    margin: 0 auto; /* 가운데 정렬 */
    padding: 20px; /* 여백 추가 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    background-color: #fff; /* 배경색 추가 */
    position: relative; /* 버튼 위치를 절대 위치로 설정하기 위한 부모 컨테이너 설정 */
}

/* 제목과 카테고리 정렬 */
.top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

/* 카드 컨테이너 */
.card-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

/* 버튼 컨테이너 */
.modibutton {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

/* 버튼 스타일 */
.btn {
    background-color: #FD8E4C;
    border: none;
    padding: 5px 10px; /* 버튼 크기 조정 */
    font-size: 14px; /* 버튼 폰트 크기 조정 */
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
