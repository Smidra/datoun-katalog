<template>
    <cv-modal @primary-click="sendForm" kind="danger" @modal-shown="focusNameInputField">
        <template v-slot:label>
            <div class="label-padding">
                Tvoje IP je {{ ipAddress }}.
            </div>
        </template>

        <template v-slot:title>
            <div class="modal-title-container">
                <h2 class="modal-title">
                    {{ title }}
                    <editing-icon class="editing-icon" />
                </h2>
                <p class="subtitle bx--tile__subtitle">
                    S velkou mocí přichází i velká zodpovědnost.
                </p>
            </div>
        </template>


        <!-- Content of the modal -->
        <template v-slot:content>
            <div class="modal-content">
                <cv-loading v-if="isLoading" :active="true" overlay="true"/>
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
                    <cv-text-input v-model="form.aliasy" label="Značky & Aliasy" />

                    <p v-if="message">{{ message }}</p>
                </cv-form>
            </div>
        </template>


        <!-- Footer of the modal - Buttons -->
        <template v-slot:secondary-button>
            <div class="button-content">
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

export default {
    components: {
        CvForm,
        CvTextInput,
        CvTextArea,
        'editing-icon': EditingIcon,
    },
    props: {
        editedItem: {
            type: Object,
            default: () => null,
        },
    },
    computed: {
        title() {
            if (this.editedItem == null) {
                return 'Nová firma';
            }
            let has_vyrobna = this.editedItem.vyrobny && this.editedItem.vyrobny.length > 0
            if (has_vyrobna) {
                return `${this.editedItem.jmeno_firmy}, ${this.editedItem.vyrobny[0].lokalita.hezkyNazev}`;
            }
            return this.editedItem.jmeno_firmy;
        },
    },
    data() {
        return {
            form: {},
            isLoading: false,
            message: '',
            ipAddress: '',
        };
    },
    methods: {
        focusNameInputField() {
            if (this.$refs['name-input'] && this.$refs['name-input'].$el) {
                const inputElement = this.$refs['name-input'].$el.querySelector('input');
                if (inputElement) {
                    inputElement.focus();
                }
            }
        },
        reloadPage() {
            location.reload();
        },
        async sendForm() {
            this.isLoading = true;
            try {
                // Initialize Algolia client
                const client = algoliasearch('S27OT8U78J', '995efbd2d821e03836317ed9c20812a3');
                const index = client.initIndex('firmy');

                await index.saveObject(this.form, { autoGenerateObjectIDIfNotExist: true });

                this.message = 'Form submitted successfully!';
                // Wait a short amount of time before reloading the page to make sure Algolia has time to update the index.
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Reloading the page is a bit ugly but works for now.
                this.reloadPage()
            } catch (error) {
                this.message = 'An error occurred while submitting the form.';
                console.error(error); // Log the error for debugging
            } finally {
                this.isLoading = false;
            }
        },
    },
    watch: {
      // once source item updates, copy into local form
      editedItem(newEditedItem) {
        this.form = newEditedItem ? { ...newEditedItem } : {};
      }
    },
    created() {
        if (this.editedItem != null) {
            this.form = { ...this.editedItem };
        }
    },
    async mounted() {
        this.focusNameInputField();
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
