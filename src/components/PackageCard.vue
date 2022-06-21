<template>
<li class="list-group-item" @click="clickPackage">
    <b class="h3">{{ name }}</b> <span class="text-secondary badge ">v. {{ version }}</span><br/>
    <span class="text-secondary fw-light">Published {{ moment(date).fromNow() }}</span><br/>
    <span v-for="item in keywords" class="badge bg-dark text-bg-dark keyword">{{ item }}</span>
    <p>{{ description }}</p>
</li>
</template>

<script setup>
import moment from 'moment';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
    name: String,
    description: String,
    version: String,
    date: String,
    keywords: Array
});

function clickPackage() {
    store.dispatch('fetchPackageDetails', { name: props.name, version: props.version })
}
</script>

<style lang="scss" scoped>
.list-group-item {
    &:hover {
        background-color: wheat;
        cursor: pointer;
    }
    span.keyword {
        margin-right: 4px;
    }
}
</style>