import { createStore } from "vuex";

const SEARCH_API_URL = 'https://registry.npmjs.com';
const API_URL = 'https://data.jsdelivr.com/v1/package/npm/';
const PER_PAGE = 10;

export default createStore({
    state: {
        packages: [],
        searchStr: "",
        currentPage: 1,
        total: 0,
        isLoading: false,
        modalIsShow: false,
        selectedPackage: null,
    },
    mutations: {
        SET_PACKAGES(state, packages) {
            state.packages = packages;
        },
        SET_SEARCH_STRING(state, searchStr) {
            state.searchStr = searchStr;
        },
        SET_PAGE(state, page) {
            state.currentPage = page;
        },
        NEXT_PAGE(state) {
            state.currentPage++;
        },
        PREV_PAGE(state) {
            state.currentPage--;
        },
        START_LOADING(state) {
            state.isLoading = true;
        },
        STOP_LOADING(state) {
            state.isLoading = false;
        },
        SET_TOTAL(state, total) {
            state.total = parseInt(total);
        },
        SHOW_MODAL(state) {
            state.modalIsShow = true;
        },
        HIDE_MODAL(state) {
            state.selectedPackage = null;
            state.modalIsShow = false;
        },
        SELECT_PACKAGE(state, packageObj) {
            state.selectedPackage = packageObj;
        },
        SELECTED_PACKAGE_DETAILS(state, packageDetails) {
            state.selectedPackage.details = packageDetails;
            console.log(packageDetails);
        }
    },
    actions: {
        async fetchPackages({ commit, state }) {
            commit('START_LOADING');

            const params = new URLSearchParams({
                text: state.searchStr,
                from: (state.currentPage - 1) * PER_PAGE,
                size: PER_PAGE,
                quality: 1.0,
                maintenance: 1.0,
                popularity: 0.5
            });

            const response = await fetch(SEARCH_API_URL + "/-/v1/search?" + params.toString())
                .catch((error) => console.log(error));

            const packagesResponse = await response.json();

            commit("SET_TOTAL", packagesResponse.total);
            commit("SET_PACKAGES", packagesResponse.objects.map((item) => item.package));
            commit('STOP_LOADING');
        },
        async fetchPackageDetails({ commit, state }, { name, version }) {
            commit('SELECT_PACKAGE', { name, version });
            commit('SHOW_MODAL');

            const responseVersions = fetch(API_URL + name);
            const responseFiles = fetch(API_URL + name + '@' + version + '/flat');
            const responseStats = fetch(API_URL + name + '@' + version + '/stats');

            const response = await Promise.all([responseVersions, responseFiles, responseStats]);
            const [versions, files, stats] = await Promise.all(response.map((r) =>  r.json()));

            commit('SELECTED_PACKAGE_DETAILS', {versions, files, stats})
        }
    }
});
