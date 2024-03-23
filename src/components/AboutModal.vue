<template>
  <cv-modal>
    <template v-slot:title>
      <div class="modal-title-container">
        <h2 class="modal-title">O nás</h2>
      </div>
    </template>
    <!-- Content of the modal -->
    <template v-slot:content>
      <div class="modal-content">
        <!-- Carbon design system form to modify data in Algolia -->
        <p>
          Webová stránka Datoun je inovativní platforma, která poskytuje
          uživatelům možnost snadno a rychle vyhledávat české firmy. S důrazem
          na přehlednost a uživatelskou přívětivost nabízí Datoun širokou škálu
          funkcí a možností pro efektivní procházení produktů vyráběných v České republice.
        </p>

        <div class="about-section">
          <cv-button-set>
            <cv-button @click="navigateTo('https://discord.com')"  kind="secondary" >Discord</cv-button>
            <cv-button @click="navigateTo('https://github.com/Smidra/datoun-katalog')" kind="secondary">GitHub
            </cv-button>
            <cv-button
                @click="navigateTo('https://docs.google.com/spreadsheets/d/1AEe_-kzGD-3siz9b7oaILM2IbTCpfKinbhFcpNSnlOg/edit#gid=0')"
                kind="primary">Seznam firem
            </cv-button>
          </cv-button-set>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  methods: {
    navigateTo(url) {
      if (typeof window !== 'undefined') {
        window.open(url, '_blank');
      }
    },
  },
};
</script>

<style scoped>

.about-section {
  text-align: center;
  margin: auto;
  margin-top: 50px;
  max-width: 600px;
}
</style>
