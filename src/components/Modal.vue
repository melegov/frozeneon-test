<template>
<teleport :to="'body'">
<div class="modal" tabindex="-1" :class="{ show: modalIsShow }" @wheel.prevent.stop>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    <slot name="header"></slot>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="store.commit('HIDE_MODAL')"></button>
            </div>
            <div class="modal-body ">
                <slot name="body"></slot>
            </div>

        </div>
    </div>
</div>
</teleport>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import useModal from '../composables/useModal';

const store = useStore();
const { modalIsShow } = useModal();
</script>

<style lang="scss" scoped>
.show {
    display: block;
}

.modal-body {
    min-height: 100px;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}
</style>