<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo"
      >https://cors-anywhere.herokuapp.com/corsdemo</a
      >
    </p>
    <!-- Componente hijo -->
    <SearchBar @results="handleResults" />
    <hr />
    <div class="filters">
      <div class="filter-item">
        <label>
          <input type="checkbox" v-model="sortAscending" aria-label="Ordenar ascendente" />
          Ordenar por nombre (ascendente)
        </label>
      </div>
      <div class="filter-item">
        <label>
          Duración mínima:
          <input type="number" v-model="minDurationMinutes" placeholder="Min" class="short-input"/>
          <input type="number" v-model="minDurationSeconds" placeholder="Seg" class="short-input"/>
        </label>
      </div>
      <div class="filter-item">
        <label>
          Artista:
          <input type="text" v-model="artistFilter" placeholder="Nombre del artista" aria-label="Filtrar por artista" />
        </label>
    </div>
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
const minDurationMinutes = ref(null); // Minutos mínimos para el filtro de duración
const minDurationSeconds = ref(null); // Segundos mínimos para el filtro de duración
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espaciado entre los filtros */
  margin-bottom: 20px;
}
.filter-item {
  flex: 1 1 200px; /* Ajusta el tamaño mínimo de los filtros */
}
.short-input {
  width: 60px; /* Ajusta el ancho de los campos de entrada */
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
  width: 85px; 
  height: 85px;
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