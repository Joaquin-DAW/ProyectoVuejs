<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <!-- Componente hijo -->
    <SearchBar @results="handleResults" />
    <hr />
    <div class="filters">
      <label>
        <input type="checkbox" v-model="sortAscending" aria-label="Ordenar ascendente" />
        Ordenar por nombre (ascendente)
      </label>
      <label>
        Duración mínima:
        <input type="number" v-model="minDurationMinutes" placeholder="Minutos" aria-label="Filtrar por duración (minutos)" />
        <input type="number" v-model="minDurationSeconds" placeholder="Segundos" aria-label="Filtrar por duración (segundos)" />
      </label>
      <label>
        Artista:
        <input type="text" v-model="artistFilter" placeholder="Nombre del artista" aria-label="Filtrar por artista" />
      </label>
    </div>
    <!-- Lista de canciones -->
    <ul v-if="filteredAndSortedSongs.length > 0">
      <li v-for="song in filteredAndSortedSongs" :key="song.id" class="song-item">
        <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
        <div class="song-info">
          <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
          <p>Duración: {{ formatDuration(song.duration) }}</p>
          <p><a :href="song.link" target="_blank" class="listen-link">Escuchar completa</a></p>
        </div>
      </li>
    </ul>
    <p v-else>No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo

const songs = ref([]); // Estado para almacenar la lista de canciones
const sortAscending = ref(false); // Controla el orden ascendente o descendente
const minDurationMinutes = ref(0); // Minutos mínimos para el filtro de duración
const minDurationSeconds = ref(0); // Segundos mínimos para el filtro de duración
const artistFilter = ref(""); // Filtro por artista

// Función para formatear la duración de la canción
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Lista filtrada y ordenada
const filteredAndSortedSongs = computed(() => {
  let result = [...songs.value];

  // Filtrar por duración mínima
  const minDuration = minDurationMinutes.value * 60 + minDurationSeconds.value;
  if (minDuration > 0) {
    result = result.filter(song => song.duration && song.duration >= minDuration);
  }

  // Filtrar por artista
  if (artistFilter.value.trim() !== "") {
    result = result.filter(song => song.artist.name.toLowerCase().includes(artistFilter.value.trim().toLowerCase()));
  }
  
  // Ordenar por nombre
  if (sortAscending.value) {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  return result;
});

// Maneja los resultados emitidos por el componente hijo
const handleResults = (data) => {
  console.log("Resultados recibidos:", data); // Añadir este log
  songs.value = data; // Actualiza la lista de canciones
};
</script>

<style scoped>
h1 {
  color: #dc3545;
}
.filters {
  margin-bottom: 20px;
}
.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background-color: #f8f9fa;
}
.album-cover {
  width: 50px; /* Tamaño más pequeño para la imagen del álbum */
  height: 50px;
  margin-right: 20px;
  border-radius: 5px;
}
.song-info {
  flex: 1;
}
.song-info p {
  margin: 5px 0;
}
.listen-link {
  color: #007bff; /* Color del enlace */
  text-decoration: none; /* Quitar subrayado */
}
.listen-link:hover {
  color: #0056b3; /* Color del enlace al pasar el ratón */
  text-decoration: underline; /* Subrayado al pasar el ratón */
}
li:hover {
  background-color: blue;
  color: white; /* Opcional: para cambiar el color del texto también */
}
</style>