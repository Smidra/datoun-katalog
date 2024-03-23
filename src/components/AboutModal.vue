<template>
  <cv-modal @secondary-click="handleOpenUrl('https://discord.com')"
            @other-btn-click="handleOpenUrl('https://github.com/Smidra/datoun-katalog')">
    <template v-slot:title>
      <div class="modal-title-container">
        <h2 class="modal-title">O nás</h2>
      </div>
    </template>
    <!-- Content of the modal -->
    <template v-slot:content>
      <div class="modal-content">
        <p>
          Webová stránka Datoun je inovativní platforma, která poskytuje
          uživatelům možnost snadno a rychle vyhledávat české firmy. S důrazem
          na přehlednost a uživatelskou přívětivost nabízí Datoun širokou škálu
          funkcí a možností pro efektivní procházení produktů vyráběných v České republice.
          Datoun je open-source projekt, který je vyvíjen komunitou.
        </p>
        <br/>
        <p>
          Provizorní databázi můžete upravovat na <a target="_blank"
            href="https://docs.google.com/spreadsheets/d/1AEe_-kzGD-3siz9b7oaILM2IbTCpfKinbhFcpNSnlOg/edit#gid=0">Google
          Sheets</a>.
        </p>
      </div>
    </template>

    <!-- Footer of the modal - Buttons -->
    <template v-slot:other-button>
      <div class="button-content">
        <LogoGithub/>
        Star on GitHub
      </div>
    </template>
    <template v-slot:secondary-button>
      <div class="button-content">
        <LogoDiscord/>
        Join Discord
      </div>
    </template>
    <template v-slot:primary-button>Zavřít</template>


  </cv-modal>
</template>

<script>
import LogoDiscord from '@carbon/icons-vue/es/logo--discord/20';
import LogoGithub from '@carbon/icons-vue/es/logo--github/20';
import {handleOpenUrl} from '@/utils/URLtools';

export default {
  methods: {
    handleOpenUrl
  },
  components: {
    LogoDiscord,
    LogoGithub,
  },
};
</script>

<style scoped>
</style>
