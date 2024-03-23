import { CvHeader, CvHeaderMenuButton, CvSkipToContent, CvHeaderName, CvSearch, CvSideNav } from '@carbon/vue';
import { AisInstantSearch, AisHits, AisHierarchicalMenu, AisConfigure, AisPagination, AisStateResults } from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch';
import HierarchicalMenu from './components/HierarchicalMenu.vue';
import ItemTile from './components/ItemTile.vue';
import Add16 from '@carbon/icons-vue/es/add/16';
import EditModal from './components/EditModal.vue';
import AboutModal from './components/AboutModal.vue';
import CompanyDetailModal from "@/components/CompanyDetailModal.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: 'App',
    components: {
        Pagination,
        CompanyDetailModal,
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
        AboutModal,
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
            showEditModal: false,
            showAboutModal: false,
            editedItem: null,
            editedItemNew: true,
            detailModalItem: null,
            showDetailModal: false,
        };
    },
    mounted() {
        document.title = "Datoun";
        // Add resize event listener on component mount
        window.addEventListener('resize', this.handleResize);
        this.handleResize();  // Call the method on initial load
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
        handleEditOpen() {
            this.editedItem = {...this.detailModalItem};
            this.showDetailModal = false;
            this.showEditModal = true;
            this.editedItemNew = false;
        },
        handleCreateNew() {
            this.editedItem = null;
            this.showEditModal = true;
            this.editedItemNew = true;
        },
        onPaginationChange(data) {
            this.hitsPerPage = data.length;
            this.page = data.page;
        },
        reloadPage() {
            location.reload();
        },
        handleOpenEshop(url) {
            window.open(url, '_blank');
        }
    },
};
