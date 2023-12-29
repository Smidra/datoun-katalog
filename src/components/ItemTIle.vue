<template>
    <cv-tile kind="clickable" @click="openModal()">
        <div class="bx--aspect-ratio--object tile-content">
            <div class="tile-header">
                <div class="tile-title-container">
                    <h3 class="bx--tile__title">
                        {{ item.jmeno_firmy }}
                        <unknown-icon v-if="item.semafor === undefined" class="icon-unknown factory-icon" />
                        <error-icon v-else-if="item.semafor === '10'" class="icon-error factory-icon" />
                        <incomplete-icon v-else-if="item.semafor === '20'" class="icon-in-progress factory-icon" />
                        <success-icon v-else-if="item.semafor === '30'" class="icon-success factory-icon" />
                    </h3>
                    <p class="bx--tile__subtitle">
                        <span v-if="item.semafor === undefined" class="icon-unknown factory-icon">Nevíme kde
                            vyrábí.</span>
                        <span v-else-if="item.semafor === '10'" class="icon-error factory-icon">Nevyrábí v
                            ČR.</span>
                        <span v-else-if="item.semafor === '20'" class="icon-in-progress factory-icon">Vyrábí částečně v
                            ČR.</span>
                        <span v-else-if="item.semafor === '30'" class="icon-success factory-icon">
                            Vyrábí v ČR, {{ item.vyrobny ? item.vyrobny[0].lokalita.hezkyNazev : '' }}
                        </span>
                    </p>
                </div>
                <div class="tile-logo-container">
                    <img :src="item.logo" alt="Logo" class="tile-logo bx--tile__icon">
                </div>
            </div>

            <div class="tile-body">
                <div class="tile-text-container">
                    <p class="tile-text">{{ item.poznamky_k_vyrobe }}</p>
                </div>
            </div>

            <div class="tile-footer">
                <div class="footer-content">
                    <div class="tags-section">
                        <!-- Footer left = -->
                        <cv-tag v-for="(tag, index) in tags" :key="index" kind="gray" :label="tag" />
                    </div>
                    <div class="footer-buttons">
                        <!-- Footer right -->
                        <cv-button class="square-button" kind="tertiary" size="small" @click="openEshop">
                            <launch-icon />
                        </cv-button>
                    </div>
                </div>
            </div>
            <!-- <my-modal v-if="isModalOpen" :item="item" :key="modalKey" :is-open="isModalOpen"
                @update:isOpen="updateModalState" @other-btn-click="onOtherBtnClick" @secondary-click="openEshop">
            </my-modal>
            <edit-modal v-if="isEditModalOpen" :editedItem="item" :is-open="isEditModalOpen" :key="editModalKey"
                @update:isOpen="updateEditModalState" :newCompany="false"></edit-modal> -->
            <!-- <my-modal v-model:isOpen="isModalOpen" :item="item" :key="modalKey" @update:isOpen="updateModalState"
                @other-btn-click="onOtherBtnClick" @secondary-click="openEshop">
            </my-modal> -->
            <my-modal v-model:visible="isModalOpen" :item="item" @other-btn-click="onOtherBtnClick">
            </my-modal>
            <!-- <edit-modal v-model:visible="isEditModalOpen" :editedItem="item" :key="editModalKey"
                @update:isOpen="updateEditModalState" :newCompany="false"></edit-modal> -->
            <edit-modal v-model:visible="isEditModalOpen" :editedItem="item" :newCompany="false"></edit-modal>
        </div>
    </cv-tile>
</template>

<script>
import UnknownIcon from '@carbon/icons-vue/es/unknown/16';
import ErrorIcon from '@carbon/icons-vue/es/error/16';
import IncompleteIcon from '@carbon/icons-vue/es/incomplete/16';
import SuccessIcon from '@carbon/icons-vue/es/checkmark--filled/16';
import LaunchIcon from '@carbon/icons-vue/es/launch/16';
import MyModal from './MyModal.vue';
import EditModal from './EditModal.vue'; // Make sure to create this component

import { getLeaves, getUniqueBradcrumbs } from './KategorieTool.js';


export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    name: 'ItemTile',
    computed: {
        tags() {
            let uniqueLeaves = getLeaves(getUniqueBradcrumbs(this.item.kategorie0, this.item.kategorie1, this.item.kategorie2));
            let uniqueLeavesNoDuplicates = [...new Set(uniqueLeaves)];
            return uniqueLeavesNoDuplicates.slice(0, 3);
        }
    },
    components: {
        'unknown-icon': UnknownIcon,
        'error-icon': ErrorIcon,
        'incomplete-icon': IncompleteIcon,
        'success-icon': SuccessIcon,
        'launch-icon': LaunchIcon,
        'edit-modal': EditModal,
        MyModal,
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
            this.modalKey++; // Add this line
        },
        updateModalState(newVal) {
            this.isModalOpen = newVal;
        },
        onOtherBtnClick() {
            this.isModalOpen = false;
            this.editModalKey++;
            this.isEditModalOpen = true;
        },
        updateEditModalState(newState) {
            this.isEditModalOpen = newState;
        },
        openEshop() {
            window.open(this.item.eshop, '_blank');
        },
    },
    data() {
        return {
            isModalOpen: false,
            modalKey: 0, // Add this line
            isEditModalOpen: false,
            editModalKey: 0,
        };
    },
};
</script>

<style scoped>
.footer-content {
    display: flex;
    justify-content: space-between;
}

.tags-section {
    display: flex;
    flex-wrap: nowrap;
    /* prevent tags from wrapping to the next line */
    overflow-x: auto;
    /* add a scrollbar if tags overflow */
}

.footer-buttons {
    display: flex;
}

.square-button {
    width: 32px;
    height: 32px;
    padding: 0;
    align-items: center;
    justify-content: center;
}

.tile-header {
    display: flex;
    justify-content: space-between;
}

.tile-title-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0rem;
}

.bx--tile__subtitle {
    color: #5A6872;
    font-size: 0.875rem;
    font-weight: 400;
}

.tile-logo-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
}

.tile-logo {
    height: 35px;
    /* height: 50px; */
}

.tile-body {
    flex-grow: 1;
    padding: 0rem;
}

.tile-text-container {
    overflow: auto;
    flex-grow: 1;
}

.tile-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* number of lines to display before truncating */
    -webkit-box-orient: vertical;
    font-size: 0.9em;
    padding-bottom: 1rem;
    padding-top: 1rem;
}

.bx--aspect-ratio--object {
    position: relative;
    display: flex;
    flex-direction: column;
}

.tile-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* aligns items to the bottom */
}

.tile-button {
    white-space: nowrap;
}

@media (max-width: 600px) {
    .tile-body {
        flex-direction: column;
    }

    .tile-footer {
        flex-direction: column;
        align-items: flex-end;
    }
}
</style>
