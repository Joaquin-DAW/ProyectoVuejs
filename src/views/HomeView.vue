<template>
  <div class="container">
    <h1>Home</h1>
    <p>Bienvenido a la aplicación Deezer Music Client.</p>
    <p>
      Este proyecto sirve de base para la aplicación a desarrollar como tarea
      del curso.
    </p>
    <p>
      Para facilitar el desarrollo, este proyecto ya viene configurado con
      Bootstrap, Bootstrap Icons, SASS, router y Pinia.
    </p>

    <!-- Componente SearchBar -->
    <SearchBar @results="handleSearchResults" />

    <!-- Componente SongCarousel -->
    <SongCarousel />

    <!-- Grid de canciones destacadas -->
    <div class="row mt-4">
      <div class="col-md-4" v-for="song in featuredSongs" :key="song.id">
        <div class="card mb-4">
          <img :src="song.album.cover_medium" class="card-img-top" :alt="song.title">
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <p class="card-text">{{ song.artist.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import SongCarousel from '../components/SongCarousel.vue';

const featuredSongs = ref([]);

const fetchFeaturedSongs = async () => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener las canciones destacadas");
    }
    const data = await response.json();
    featuredSongs.value = data.tracks.data;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(fetchFeaturedSongs);

const handleSearchResults = (results) => {
  console.log("Resultados de búsqueda:", results);
};
</script>

<style scoped>
h1 {
  color: #007bff;
}
.card {
  height: 100%;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
