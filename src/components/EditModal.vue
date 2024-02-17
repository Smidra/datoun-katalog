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
                    <div>
                        <cv-combo-box v-for="(category, index) in selectedCategories" :key="category.value" :value="category.value" aria-label='Kategorie' @change='onCategoryChange($event, index)' @filter='onCategoryFilter($event, index)' :options="availableCategoryOptions(index)"/>
                        <cv-button @click="onAddCategory" type="button" kind="secondary" size="sm">Přidat kategorii</cv-button>
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
import { CvForm, CvTextInput, CvTextArea, CvComboBox } from '@carbon/vue';
import EditingIcon from '@carbon/icons-vue/es/edit/32';
import algoliasearch from 'algoliasearch';
import getIP from '../utils/GetIP.js';
import {extractCategories} from "@/utils/category_parse";

export default {
    components: {
        CvForm,
        CvTextInput,
        CvTextArea,
        CvComboBox,
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
            categoryOptions: [],
            categoryFilters: {},
            selectedCategories: [],
            toSaveCategories: []
        };
    },
    methods: {
        availableCategoryOptions(index) {
            if (this.categoryFilters[index] === '') {
                return this.categoryOptions;
            }
            const filteredCategoryAlreadyInOptions = this.categoryOptions.some(category => category.value === this.categoryFilters[index])
            if (filteredCategoryAlreadyInOptions) {
                return this.categoryOptions;
            }
            const newCategory = {
                name: this.categoryFilters[index],
                label: this.categoryFilters[index],
                value: this.categoryFilters[index]
            }
            return [newCategory, ...this.categoryOptions];
        },
        onAddCategory() {
            this.selectedCategories.push({
                name: 'x',
                label: 'x',
                value: 'x'
            })
        },
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
        onCategoryChange(x, input) {
            this.toSaveCategories[input] = {
                name: x,
                label: x,
                value: x
            }
        },
        onCategoryFilter(categoryFilter, input) {
            this.categoryFilters[input] = categoryFilter
            this.onCategoryChange(categoryFilter, input)
        },
        async sendForm() {
            this.isLoading = true;

            const kategorie0 = new Set()
            const kategorie1 = new Set()
            const kategorie2 = new Set()
            // Make sure we have all the categories in all levels.
            this.toSaveCategories.forEach(category => {
                const extractedCategories = extractCategories(category.name)
                if (extractedCategories.length > 0) {
                    kategorie0.add(extractedCategories[0])
                }
                if (extractedCategories.length > 1) {
                    kategorie1.add(extractedCategories.slice(0,2).join(" > "))
                }
                if (extractedCategories.length > 2) {
                    kategorie2.add(extractedCategories.join(" > "))
                }
            })

            this.form.kategorie0 = [...kategorie0]
            this.form.kategorie1 = [...kategorie1]
            this.form.kategorie2 = [...kategorie2]

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
    created() {
        if (this.editedItem != null) {
            this.form = { ...this.editedItem };
            let selectedCategories = this.editedItem?.kategorie2 || []
            const notIncludedCategories1 = this.editedItem.kategorie1?.filter(category1 => selectedCategories.every(selectedCategory => !selectedCategory.startsWith(category1))) || []
                selectedCategories.push(...notIncludedCategories1)
            const notIncludedCategories0 = this.editedItem.kategorie0?.filter(category0 => selectedCategories.every(selectedCategory => !selectedCategory.startsWith(category0))) || []
                selectedCategories.push(...notIncludedCategories0)
            this.selectedCategories = selectedCategories.map(category => {
                return {
                    name: category,
                    label: category,
                    value: category
                }
            })
            // TODO this is a hack and we should get all categories from the parent
            this.categoryOptions = [...this.selectedCategories]
            this.toSaveCategories = [...this.selectedCategories]

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
