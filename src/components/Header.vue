<template>
<header class="py-3 border-bottom bg-dark">
  <div class="container">
    <SearchInput></SearchInput>
  </div>
</header>
</template>

<script setup>
import SearchInput from '@/components/SearchInput.vue';

</script>

<style lang="scss" scoped>
header {
    --bs-bg-opacity: .8;
    position: sticky;
    top: -1px;
    z-index: 2;
}
</style>