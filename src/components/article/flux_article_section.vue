<script setup>
import { useArticleStore } from "@/stores/rootstore";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import ArticleMain from "@/components/article/flux_article_main.vue";
import ArticleDetail from "@/components/article/flux_article_detaile.vue";

// Pinia 스토어 사용
const store = useArticleStore();
const route = useRoute();

// 상태 값 가져오기
const root = computed(() => store.root);

// 상태 값 변경 함수
const setRoot = store.setRoot;

// 라우터 경로에 따라 root 상태 설정
watch(() => route.params.id, (newId) => {
  if (newId) {
    setRoot('detail/:id');
  } else {
    setRoot('main');
  }
});
</script>

<template>
  <div>
    <div v-if="root === 'main'">
      <ArticleMain />
    </div>
    <div v-if="root === 'detail/:id'">
      <ArticleDetail />
    </div>
  </div>
</template>
