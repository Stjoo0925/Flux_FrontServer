<script setup>
import Header from "@/components/header/flux_component_header.vue";
import Footer from "@/components/footer/flux_component_footer.vue";
</script>
<template>
  <Header />
    <div class="section">
      <Section />
    </div>
  <Footer />
</template>
<style scoped>
.section {
  width: 100%;
}
.section-align {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
