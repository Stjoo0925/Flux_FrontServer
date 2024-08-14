<script setup>
import Header from "@/components/header/flux_component_header.vue";
import Footer from "@/components/footer/flux_component_footer.vue";
import Ranking from "@/components/rank/flux_rank_main.vue";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';

const router = useRouter();

Swal.fire({
  title: "미구현 기능입니다",
  icon: "warning",
  showConfirmButton: true,
  confirmButtonText: "확인"
}).then((result) => {
  if (result.isConfirmed) {
    router.push("/");
  }
});
</script>
<template>
  <Header />
  <Ranking />
  <Footer />
</template>
<style scoped>
.section-align {
  display: flex;
  flex-direction: row;
}
</style>
