<script setup>
import Header from "@/components/header/flux_component_header.vue";
import Footer from "@/components/footer/flux_component_footer.vue";
import Section from "@/components/noti/flux_noti_section.vue"
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
  height: 70dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section-align {
  display: flex;
  flex-direction: row;
}
</style>
