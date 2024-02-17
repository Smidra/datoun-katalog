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
      <a href="https://discord.com" class="about-button">Discord</a>
      <a href="https://github.com/Smidra/datoun-katalog" class="about-button">Git hub</a>
      <a href="https://docs.google.com/spreadsheets/d/1AEe_-kzGD-3siz9b7oaILM2IbTCpfKinbhFcpNSnlOg/edit#gid=0" class="about-button">Seznam firem</a>
    </div>
      </div>
    </template>
  </cv-modal>
</template>

<style scoped>

.about-section {
  text-align: center;
  margin: auto;
  margin-top: 20px;
  max-width: 600px;
}
.about-button {
  display: inline-block;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin: 20px 40px 0 20px;
  cursor: pointer;
}
.about-button:hover {
  background-color: #0056b3;
}
</style>
