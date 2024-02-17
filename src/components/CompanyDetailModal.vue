<template>
    <cv-modal ref="CompanyDetailModal" :visible="isOpen" @secondary-click="openEshop">
        <!-- Header of the modal -->
        <template v-slot:title>
            <div class="modal-title-container">

                <!-- Left part -->
                <div>
                    <h2 class="modal-title">
                        {{ item.jmeno_firmy }}
                        <unknown-icon v-if="item.semafor === undefined" class="icon-unknown factory-icon-modal" />
                        <error-icon v-else-if="item.semafor === '10'" class="icon-error factory-icon-modal" />
                        <incomplete-icon v-else-if="item.semafor === '20'" class="icon-in-progress factory-icon-modal" />
                        <success-icon v-else-if="item.semafor === '30'" class="icon-success factory-icon-modal" />
                    </h2>
                    <p class="subtitle bx--tile__subtitle">
                        <span v-if="item.semafor === undefined" class="icon-unknown factory-icon">Nevíme kde
                            vyrábí.</span>
                        <span v-else-if="item.semafor === '10'" class="icon-error factory-icon">Nevyrábí v
                            ČR.</span>
                        <span v-else-if="item.semafor === '20'" class="icon-in-progress factory-icon">Vyrábí částečně v
                            ČR.</span>
                        <span v-else-if="item.semafor === '30'" class="icon-success factory-icon">Vyrábí v ČR, {{
                            item.vyrobny ? item.vyrobny[0].lokalita.hezkyNazev : "" }}</span>
                    </p>
                </div>

                <!-- Right part -->
                <div class="tile-logo-container">
                    <img :src="item.logo" alt="Logo" class="tile-logo bx--tile__icon">
                </div>

            </div>
        </template>

        <!-- Content of the modal -->
        <template v-slot:content>
            <div class="modal-content">
                <!-- Show comments on company -->
                <h4>Poznámky k výrobě</h4>
                <p>{{ item.poznamky_k_vyrobe }}</p>
                <br />

                <h4>Místa</h4>
                <cv-list class="list-container">
                    <cv-list-item v-for="(vyrobna, index) in item.vyrobny" :key="index">{{ vyrobna.lokalita.hezkyNazev
                    }} ({{ vyrobna.lokalita.adresaUradu.kraj }}, {{ vyrobna.lokalita.adresaUradu.PSC
}})</cv-list-item>
                </cv-list>
                <br />

                <!-- Show description -->
                <h4>Popisek firmy</h4>
                <p>{{ item.popisek_firmy }}</p>
                <br />

                <!-- Show categories -->
                <h4>Kategorie</h4>
                <cv-list class="list-container">
                    <cv-list-item v-for="(leaf, index) in leaves" :key="index">{{ leaf }}</cv-list-item>
                </cv-list>
                <br />

                <!-- If there are aliases, show -->
                <!-- <template v-if="(item.aliasy != undefined) && (item.aliasy.length > 0)"> -->
                <template v-if="(item.aliasy != undefined) && (item.aliasy != '')">
                    <h4>Značky & Aliasy</h4>
                    <p>{{ item.aliasy }}

                        <!-- <span v-for="(alias, index) in item.aliasy" :key="index">
                            {{ alias }}
                            <span v-if="index !== item.aliasy.length - 1">, </span>
                        </span> -->
                    </p>
                    <br />
                </template>

            </div>
        </template>

        <!-- Footer of the modal - Buttons -->
        <template v-slot:other-button>
            <div class="button-content">
                <edit-icon />
                Upravit
            </div>
        </template>
        <template v-slot:secondary-button>
            <div class="button-content">
                <launch-icon />
                Eshop
            </div>
        </template>
        <template v-slot:primary-button>Zavřít</template>

    </cv-modal>
</template>

<script>
import { CvModal, CvList, CvListItem } from '@carbon/vue';
import { getUniqueBradcrumbs } from './KategorieTool.js';
import LaunchIcon from '@carbon/icons-vue/es/launch/16';
import EditIcon from '@carbon/icons-vue/es/edit/16';
import UnknownIcon from '@carbon/icons-vue/es/unknown/16';
import ErrorIcon from '@carbon/icons-vue/es/error/16';
import IncompleteIcon from '@carbon/icons-vue/es/incomplete/16';
import SuccessIcon from '@carbon/icons-vue/es/checkmark--filled/16';


export default {
    name: 'CompanyDetailModal',
    components: {
        CvModal,
        CvList,
        CvListItem,
        'launch-icon': LaunchIcon,
        'edit-icon': EditIcon,
        'unknown-icon': UnknownIcon,
        'error-icon': ErrorIcon,
        'incomplete-icon': IncompleteIcon,
        'success-icon': SuccessIcon,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        showModal() {
            this.$refs.CompanyDetailModal.show();
        },
        hideModal() {
            this.$refs.CompanyDetailModal.hide();
        },
        openEshop() {
            window.open(this.item.eshop, '_blank');
        },
    },
    computed: {
        leaves() {
            return getUniqueBradcrumbs(this.item.kategorie0, this.item.kategorie1, this.item.kategorie2);
        }
    }
};
</script>

<style scoped>
.tile-logo {
    height: 35px;
    /* height: 50px; */
}

.tile-logo-container {
    height: 35px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.lokality {
    color: lightgray;
    font-size: 1em;
}
</style>
