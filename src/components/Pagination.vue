<template>
<nav v-if="countPage > 1">
  <ul class="pagination mx-auto">
    <li class="page-item" v-if="currentPage > 1"><a class="page-link" href="#" @click="prevPage()">&lt;</a></li>
    <li class="page-item" v-if="currentPage > 2"><a class="page-link" href="#" @click="setPage(1)">1</a></li>    
    <li v-if="currentPage > 3" class="p-2">...</li>
    <li class="page-item" v-if="currentPage > 1"><a class="page-link" href="#" @click="setPage(currentPage - 1)">{{ currentPage - 1 }}</a></li>
    <li class="page-item active"><a class="page-link" href="#">{{ currentPage }}</a></li>
    <li class="page-item" v-if="currentPage < countPage"><a class="page-link" href="#" @click="setPage(currentPage + 1)">{{ currentPage + 1 }}</a></li>
    <li v-if="currentPage < (countPage - 2)" class="p-2">...</li>
    <li class="page-item" :class="{active: currentPage === countPage}" v-if="currentPage < (countPage - 2) || currentPage == 1 && countPage > 2"><a class="page-link" href="#" @click="setPage(countPage)">{{ countPage }}</a></li>
    <li class="page-item" v-if="currentPage < countPage"><a class="page-link" href="#" @click="nextPage()">&gt;</a></li>
  </ul>
</nav>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from "@vue/reactivity";

const store = useStore();

const currentPage = computed(() => store.state.currentPage );
const total = computed(() => store.state.total );

const PER_PAGE = 10;
const countPage = computed(() => { return Math.ceil(total.value / PER_PAGE); });

function setPage(num) {
    store.commit('SET_PAGE', num);
}

function nextPage() {
    store.commit('NEXT_PAGE');
}

function prevPage() {
    store.commit('PREV_PAGE');
}
</script>

<style lang="scss" scoped>
.pagination {
    justify-content: center;
}
</style>