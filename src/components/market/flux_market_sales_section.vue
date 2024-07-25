<script setup>
import Registry from "@/components/market/flux_market_registration.vue"
import RegistryInfo from "@/components/market/flux_market_registration_info.vue"
import RegistryEdit from "@/components/market/flux_market_registration_edit.vue"


</script>

<template>
  <div>
    <div v-if="root === 'registry'">
      <Registry />
    </div>
    <div v-if="root === 'registryinfo'">
      <RegistryInfo />
    </div>
    <div v-if="root === 'registryedit'">
      <RegistryEdit />
    </div>
  </div>
</template>

<style scoped></style>
