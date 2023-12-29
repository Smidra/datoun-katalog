<template>
    <cv-modal @primary-click="sendForm" kind="danger" :visible="isOpen" @visible="updateIsOpen"
        @modal-shown="focusInputField" @hide="handleHide">
        <template v-slot:label>
            <div class="label-padding">
                Tvoje IP je {{ ipAddress }}.
            </div>
        </template>

        <template v-slot:title>
            <div class="modal-title-container">

                <!-- Editing -->
                <div v-if="newCompany == false">
                    <h2 class="modal-title">
                        {{ editedItem?.jmeno_firmy }}, {{ editedItem?.vyrobny
                            &&
                            editedItem.vyrobny.length > 0
                            ? editedItem.vyrobny[0].lokalita.hezkyNazev : '' }}
                        <editing-icon class="editing-icon" />
                    </h2>
                    <p class="subtitle bx--tile__subtitle">
                        S velkou mocí přichází i velká zodpovědnost.
                    </p>
                </div>

                <!-- Creating new company -->
                <div v-else-if="newCompany == true">
                    <h2 class="modal-title">
                        Nová firma <editing-icon class="editing-icon" />
                    </h2>
                    <p class="subtitle bx--tile__subtitle">
                        S velkou mocí přichází i velká zodpovědnost.
                    </p>
                </div>

            </div>
        </template>


        <!-- Content of the modal -->
        <template v-slot:content>
            <div class="modal-content">
                <!-- Carbon design system form to modify data in Algolia -->
                <cv-form ref="form">
                    <div class="form-container">
                        <div class="form-item">
                            <cv-text-input ref="name-input" v-model="form.jmeno_firmy" label="Jméno firmy" />
                        </div>
                        <div class="form-item">
                            <cv-dropdown v-model="form.semafor" label="Jak moc vyrábí v ČR"
                                placeholder="Vyberte ze seznamu možností">
                                <cv-dropdown-item value="0">Nevíme, kde vyrábí</cv-dropdown-item>
                                <cv-dropdown-item value="10">Nevyrábí v České republice</cv-dropdown-item>
                                <cv-dropdown-item value="20">Částečně vyrábí v České republice</cv-dropdown-item>
                                <cv-dropdown-item value="30">Vyrábí vše v České republice</cv-dropdown-item>
                            </cv-dropdown>
                        </div>
                    </div>
                    <cv-text-input v-model="form.eshop" label="E-shop firmy" />
                    <br />
                    <cv-text-input v-model="form.logo" label="Logo firmy" />
                    <br />
                    <cv-text-area v-model="form.poznamky_k_vyrobe" label="Poznámky k výrobě" />
                    <br />
                    <cv-text-area v-model="form.popisek_firmy" label="Stručný popisek firmy" />
                    <br />
                    <cv-text-input v-model="form.aliasy" @input="handleInput" label="Značky & Aliasy" />


                    <p v-if="message">{{ message }}</p>
                </cv-form>
            </div>
        </template>


        <!-- Footer of the modal - Buttons -->
        <template v-slot:secondary-button>
            <div class="button-content">
                <!-- <launch-icon /> -->
                Zavřít
            </div>
        </template>
        <template v-slot:primary-button>
            <div class="button-content">
                Uložit
            </div>
        </template>
    </cv-modal>
</template>

<script>
import { CvForm, CvTextInput, CvTextArea } from '@carbon/vue';
import EditingIcon from '@carbon/icons-vue/es/edit/32';
import algoliasearch from 'algoliasearch';
import getIP from '../utils/GetIP.js';
// import axios from 'axios';

export default {
    components: {
        CvForm,
        CvTextInput,
        CvTextArea,
        'editing-icon': EditingIcon,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        newCompany: {
            type: Boolean,
            default: undefined,
        },
        editedItem: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            showModal: false,
            form: {},
            isLoading: false,
            message: '',
            ipAddress: '',
            tags: [],
            tagInput: '',
        };
    },
    methods: {
        updateIsOpen(newVal) {
            this.$emit('update:isOpen', newVal);
            // Focus on the input field when the modal opens
            if (newVal) {
                this.focusInputField();
            }
        },
        handleHide() {
            this.$emit('update:isOpen', false);
        },
        handleInput() {
            console.log('tagInput: ', this.tagInput);
            if (this.tagInput.endsWith(',')) {
                this.tags.push(this.tagInput.slice(0, -1));
                this.tagInput = '';
            }
        },
        focusInputField() {
            if (this.$refs['name-input'] && this.$refs['name-input'].$el) {
                const inputElement = this.$refs['name-input'].$el.querySelector('input');
                if (inputElement) {
                    inputElement.focus();
                }
            }
        },
        async sendForm() {
            console.log('sendForm started');
            this.isLoading = true;
            try {
                // Initialize Algolia client
                const client = algoliasearch('S27OT8U78J', '995efbd2d821e03836317ed9c20812a3');
                const index = client.initIndex('firmy');

                // Prepare the object data
                let objectData = { ...this.form };

                // If new-company is false, use item.objectID as the object ID
                if (!this.newCompany) {
                    console.log('newCompany is false');
                    objectData.objectID = this.editedItem.objectID;
                }

                // Add or update the object
                await index.saveObject(objectData, { autoGenerateObjectIDIfNotExist: true });

                this.message = 'Form submitted successfully!';
                this.$emit('update:isOpen', false); // Close the modal after successful submission
            } catch (error) {
                this.message = 'An error occurred while submitting the form.';
                console.error(error); // Log the error for debugging
            } finally {
                this.isLoading = false;
            }
        },
    },
    created() {
        if (!this.newCompany) {
            this.form = { ...this.editedItem };
        }
    },
    async mounted() {
        this.ipAddress = await getIP();
    },
};
</script>

<style scoped>
.editing-icon {
    /* padding-left: 0.5rem; */
    vertical-align: bottom;
}

.label-padding {
    padding-left: 1rem;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.form-item {
    width: 100%;
    margin-bottom: 1rem;
}

@media (min-width: 768px) {
    .form-container {
        flex-direction: row;
        justify-content: space-between;
    }

    .form-item {
        width: calc(50% - 1rem);
    }
}
</style>