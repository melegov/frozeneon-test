<script setup>
import PackageList from '@/components/PackageList.vue';
import PackageCard from '@/components/PackageCard.vue';
import Pagination from '@/components/Pagination.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import usePackages from '@/composables/usePackages';
import Spiner from '@/components/Spiner.vue';
import Modal from '@/components/Modal.vue';
import useModal from '@/composables/useModal';

const { packages, isLoading, selectedPackage, getVersions, getTags, getFiles, clickPackage } = usePackages();
const { modalIsShow } = useModal();

</script>

<template>
<Header :class="{ 'blur' : modalIsShow }"></Header>
<div class="container" :class="{ 'blur' : modalIsShow }">
  <Spiner v-if="isLoading"></Spiner>
  <p class="mx-auto h2 text-center mt-5 text-secondary" v-show="!packages.length && !isLoading">
    No result
  </p>
  <PackageList v-show="!isLoading">
    <PackageCard v-for="item in packages" 
        :name="item.name" 
        :description="item.description" 
        :version="item.version"
        :date="item.date"
        :keywords="item.keywords"
        @click="clickPackage(item)"
        >
    </PackageCard>
  </PackageList>
  <Pagination v-show="!isLoading && packages.length" class="mt-2"></Pagination>
</div>
<Footer></Footer>
<Modal v-if="selectedPackage">
  <template v-slot:header>
    {{ selectedPackage.name }} <b class="h6">v. {{ selectedPackage.version }}</b>
  </template>
  <template v-slot:body>
    <div v-if="selectedPackage.details">
      <p>
        <b>Versions:</b> {{ getVersions(selectedPackage.details) }}
      </p>
      <p>
        <b>Tags:</b> {{ getTags(selectedPackage.details) }}
      </p>
      <p>
        <b>Files:</b> {{ getFiles(selectedPackage.details) }}
      </p>
    </div>
    <Spiner class="mt-4" v-else></Spiner>
  </template>
</Modal>
</template>

<style lang="scss">
@import url('@/assets/main.scss');

.blur {
  filter: blur(5px);
}
</style>
