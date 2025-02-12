<template>
  <div class="main-container">
    <Sidebar @category-selected="handleCategorySelected" />
    <div class="articleContents">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div
          class="col"
          v-for="article in paginatedArticles"
          :key="article.articleId"
          @click="() => goToArticleDetail(article.articleId)"
        >
          <div class="card">
            <div class="icon-container">
              <!-- 아이콘 내용 -->
            </div>
            <img
              :src="getImageUrl(article.articleImgPath)"
              class="card-img-top"
              :alt="article.articleTitle"
            />
            <div class="card-body">
              <h6 class="card-category">{{ article.articleCategory }}</h6>
              <h4 class="card-title">{{ article.articleTitle }}</h4>
              <div class="card-align">
                <div class="card-text">
                  {{ formatDate(article.articleCreateAt) }}
                </div>
                <div class="card-text">조회수 : {{ article.articleView }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        aria-label="페이지 네비게이션"
        class="d-flex justify-content-center"
      >
        <!-- 페이지 네비게이션 -->
      </nav>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const articles = ref([]);
const currentPage = ref(1);
const pageSize = ref(9);
const selectedCategory = ref(""); // 선택된 카테고리 상태
const router = useRouter();

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / pageSize.value);
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredArticles.value.slice(start, end);
});

const filteredArticles = computed(() => {
  return articles.value.filter(
    (article) =>
      article.articleStatus === true &&
      (selectedCategory.value === "" ||
        article.articleCategory === selectedCategory.value)
  );
});

const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/articles");
    if (Array.isArray(response.data)) {
      articles.value = response.data;
    } else {
      console.error("Fetched data is not an array:", response.data);
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const handleCategorySelected = (category) => {
  selectedCategory.value = category;
  currentPage.value = 1; // 카테고리 변경 시 페이지를 첫 페이지로 리셋
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const goToArticleDetail = (articleId) => {
  router.push({ name: "ArticleDetail", params: { id: articleId } });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 이미지 URL을 계산하는 함수
const getImageUrl = (imagePath) => {
  return `http://localhost:8080/img/multi/${imagePath}`;
};

onMounted(() => {
  fetchArticles();
});
</script>


<style>
.articleContents .card {
  display: flex;
  border: 3px solid #ffe9dd !important;
  flex-direction: column;
  height: 400px; /* 원하는 카드 높이 설정 */
  position: relative; /* 아이콘을 위치시키기 위해 relative로 설정 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.articleContents .card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.articleContents .icon-container {
  position: absolute;
  top: 10px; /* 원하는 위치로 조정 가능 */
  right: 15px; /* 원하는 위치로 조정 가능 */
  z-index: 1; /* 이미지 위에 위치하도록 설정 */
}

.articleContents .card-img-top {
  height: 70%; /* 이미지 높이를 카드 높이의 70%로 설정 */
  object-fit: cover; /* 이미지를 박스에 맞게 크기 조정 */
  width: 100%; /* 이미지를 박스에 맞게 크기 조정 */
}

.articleContents .card-body {
  height: 30%; /* 텍스트 높이를 카드 높이의 30%로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트를 세로 중앙에 배치 */
}

.row {
  margin: 10px 10px 10px 20px;
}

.pagination.pagination-black .page-link {
  color: black; /* 페이지 링크 색상을 검정색으로 */
}

.pagination.pagination-black .page-link:hover {
  background-color: #000; /* 링크 호버시 배경색을 검정색으로 */
  color: #fff; /* 링크 호버시 글자색을 흰색으로 */
}

/* 페이지 네비게이션 */
.pagination .page-item.disabled .page-link {
  pointer-events: none; /* 비활성화된 페이지 링크 클릭 방지 */
}

.pagination .page-item.active .page-link {
  background-color: #000; /* 활성 페이지 링크 배경색 */
  color: #fff; /* 활성 페이지 링크 글자색 */
}

.col {
  cursor: pointer;
}

.card-body {
  border: none !important;
}

.card-category {
  font-family: "LINESeedKR-Bd";
  font-size: 14px;
}

.card-title {
  font-family: "LINESeedKR-Bd";
  font-size: 18px;
}

.card-text {
  font-family: "LINESeedKR-Bd";
  font-size: 10px;
  color: #999;
}

.card-align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
