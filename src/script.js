import { CvHeader, CvHeaderMenuButton, CvSkipToContent, CvHeaderName, CvSearch, CvSideNav } from '@carbon/vue';
import { AisInstantSearch, AisHits, AisHierarchicalMenu, AisConfigure, AisPagination, AisStateResults } from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch';
import HierarchicalMenu from './components/HierarchicalMenu.vue';
import ItemTile from './components/ItemTile.vue';
import Add16 from '@carbon/icons-vue/es/add/16';
import EditModal from './components/EditModal.vue';

export default {
    name: 'App',
    components: {
        ItemTile,
        HierarchicalMenu,
        CvHeader,
        CvHeaderMenuButton,
        CvSkipToContent,
        CvHeaderName,
        CvSearch,
        CvSideNav,
        AisInstantSearch,
        AisHits,
        AisHierarchicalMenu,
        AisConfigure,
        AisPagination,
        AisStateResults,
        'add-icon': Add16,
        EditModal,
    },
    data() {
        return {
            expandedSideNav: window.innerWidth > 768,
            useFixed: true,
            hitsPerPage: 20,
            page: 1,
            searchQuery: '',
            searchResults: [],
            searchClient: algoliasearch('S27OT8U78J', '995efbd2d821e03836317ed9c20812a3'),
            showModal: false,
        };
    },
    mounted() {
        document.title = "Datoun";
        // Add resize event listener on component mount
        window.addEventListener('resize', this.handleResize);
        this.handleResize();  // Call the method on initial load
        this.$nextTick(() => {
            // console.log(this.items);
        });
    },
    beforeUnmount() {
        // Remove resize event listener before component unmount
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            // Update expandedSideNav based on window width
            this.expandedSideNav = window.innerWidth > 768;
        },
        handleClick(item, refine) {
            refine(item.value);
        },
        onPaginationChange(data) {
            this.hitsPerPage = data.length;
            this.page = data.page;
        },
        reloadPage() {
            location.reload();
        },
    },
};
