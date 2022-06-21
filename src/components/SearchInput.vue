<template>
<div class="form-floating">
    <input type="search" class="form-control" placeholder="Search..." aria-label="Search" @input="searchInput">
    <label for="floatingTextarea">Search package</label>
</div>
</template>

<style lang="scss" scoped>

</style>

<script setup>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();

function searchInput(res) {
    store.commit('SET_SEARCH_STRING', res.target.value);
}
</script>