<template>
  <div class="container home-container">

    <!-- Componente SearchBar -->
    <SearchBar @results="handleSearchResults" />

    <!-- Componente SongCarousel -->
    <SongCarousel />

    <!-- Grid de canciones destacadas -->
    <div v-if="featuredSongs.length > 0" class="row mt-4">
      <div class="col-md-4" v-for="song in featuredSongs.slice(0, 6)" :key="song.id">
        <SongCard :song="song" @add-to-playlist="handleAddToPlaylist" />
      </div>
    </div>
    <p v-else class="text-muted text-center mt-4">No hay canciones destacadas disponibles.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import SongCarousel from '../components/SongCarousel.vue';
import SongCard from '../components/SongCard.vue';

const featuredSongs = ref([]);
const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`;

const fetchFeaturedSongs = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error al obtener las canciones destacadas");

    const data = await response.json();
    if (data.tracks?.data?.length) {
      featuredSongs.value = data.tracks.data.slice(0, 6); // Limitar a 6 canciones
    } else {
      console.warn("La API de Deezer no devolvió canciones destacadas.");
    }
  } catch (error) {
    console.error("Error al cargar las canciones destacadas:", error.message);
  }
};

const handleSearchResults = (results) => {
  console.log("Resultados recibidos en Home:", results);
};

const handleAddToPlaylist = (song) => {
  console.log("Agregar a playlist:", song);
  // Aquí puedes agregar la lógica para agregar la canción a una playlist
};

onMounted(fetchFeaturedSongs);
</script>

<style scoped>
body {
  background-color: #0a2fff;
  margin: 0;
  padding: 0;
}
.home-container {
  padding: 20px;
  border-radius: 10px;
}
.card {
  height: 100%;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.text-muted {
  font-size: 1.2em;
}
</style>