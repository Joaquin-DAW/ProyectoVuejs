<template>
    <div class="info-view">
      <button @click="$router.back()" class="btn btn-secondary">⬅ Volver</button>
  
      <!-- Mostrar solo un componente según el tipo -->
      <InfoArtist v-if="type === 'artist'" :id="id" />
      <InfoAlbum v-else-if="type === 'album'" :id="id" />
      <InfoSong v-else-if="type === 'song'" :id="id" />
      <p v-else>No se encontró información.</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import InfoArtist from "@/components/InfoArtist.vue";
  import InfoAlbum from "@/components/InfoAlbum.vue";
  import InfoSong from "@/components/InfoSong.vue";
  
  const route = useRoute();
  
  // Detecta el tipo de elemento a mostrar (song, album o artist)
  const type = computed(() => route.params.type);
  const id = computed(() => route.params.id);
  </script>
  
  <style scoped>
  .info-view {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  
  .btn {
    margin-bottom: 20px;
  }
  </style>
  