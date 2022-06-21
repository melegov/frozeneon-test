import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default () => {
    const store = useStore();

    return {
        modalIsShow: computed(() => store.state.modalIsShow)
    }
}