import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

function getTags(details) {
    return Object.entries(details.versions.tags).map((kv) => kv.join(': ')).join(', ');
}

function getVersions(details) {
    return details.versions.versions.join(', ');
}

function getFiles(details) {
    return details.files.files.map((f) => "\"" + f.name + "\"").join(', ');
}

export default () => {
    const store = useStore();

    store.watch((state) => [state.searchStr, state.currentPage], (newValue, oldValue) => {
        if (newValue[0] !== oldValue[0] && newValue[1] !== 1) {
            store.commit('SET_PAGE', 1);
        } else {
            store.dispatch('fetchPackages');
        }
    });

    return {
        packages: computed(() => store.state.packages),
        isLoading: computed(() => store.state.isLoading),
        selectedPackage: computed(() => store.state.selectedPackage),
        getVersions,
        getTags,
        getFiles
    }
}