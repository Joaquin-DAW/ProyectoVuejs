<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        >https://cors-anywhere.herokuapp.com/corsdemo</a
      >
    </p>
    <!-- Componente de búsqueda -->
    <SearchBar @results="handleResults" />
    <hr />

    <!-- Filtros -->
    <div class="filters">
      <div class="filter-item">
        <label>
          <input type="checkbox" v-model="sortAscending" />
          Ordenar por nombre (ascendente)
        </label>
      </div>
      <div class="filter-item">
        <label>
          Duración mínima:
          <div class="duration-inputs">
            <input type="number" v-model="minDurationMinutes" placeholder="Min" class="short-input"/>
            <span>:</span>
            <input type="number" v-model="minDurationSeconds" placeholder="Seg" class="short-input"/>
          </div>
        </label>
      </div>
      <div class="filter-item">
        <label>
          Artista:
          <input type="text" v-model="artistFilter" placeholder="Nombre del artista" />
        </label>
      </div>
    </div>

    <!-- Lista de resultados -->
    <ul v-if="filteredAndSortedSongs.length > 0">
      <li v-for="song in filteredAndSortedSongs" :key="song.id" class="song-item">
        <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
        <div class="song-info">
          <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
          <p>Duración: {{ formatDuration(song.duration) }}</p>
          <p><a :href="song.link" target="_blank" class="listen-link">Escuchar completa</a></p>
          <i 
            :class="['bi', isFavorite(song.id) ? 'bi-heart-fill' : 'bi-heart']" 
            @click="toggleFavorite(song)"
            :style="{ color: isFavorite(song.id) ? 'red' : 'black', cursor: 'pointer' }"
          ></i>
        </div>
      </li>
    </ul>
    <p v-else>No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import { useFavoritesStore } from "../stores/favorites";

const route = useRoute();
const searchQuery = ref(route.query.q || ""); // Almacena el término de búsqueda
const favoritesStore = useFavoritesStore();

const songs = ref([]); // Lista de canciones obtenidas
const cache = new Map(); // Cache para evitar búsquedas repetidas

const sortAscending = ref(false);
const minDurationMinutes = ref(null);
const minDurationSeconds = ref(null);
const artistFilter = ref("");

// Formato de duración en minutos y segundos
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Filtrado y ordenamiento de resultados
const filteredAndSortedSongs = computed(() => {
  let result = [...songs.value];

  // Calcular duración mínima en segundos
  const minDuration = (parseInt(minDurationMinutes.value) || 0) * 60 + (parseInt(minDurationSeconds.value) || 0);
  
  if (minDuration > 0) {
    result = result.filter(song => song.duration && song.duration >= minDuration);
  }

  if (artistFilter.value.trim() !== "") {
    result = result.filter(song => 
      song.artist.name.toLowerCase().includes(artistFilter.value.trim().toLowerCase())
    );
  }

  return result.sort((a, b) => 
    sortAscending.value ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );
});

// Manejar resultados emitidos por el SearchBar
const handleResults = (data) => {
  console.log("Resultados recibidos:", data);
  songs.value = data;
};

// Añadir o quitar de favoritos
const toggleFavorite = (song) => {
  favoritesStore.isFavorite(song.id) 
    ? favoritesStore.removeSong(song.id) 
    : favoritesStore.addSong(song);
};

const isFavorite = (id) => favoritesStore.isFavorite(id);

// Función para buscar en Deezer
const searchDeezer = async (query) => {
  if (!query.trim()) return; // Evita búsquedas vacías

  if (cache.has(query)) {
    songs.value = cache.get(query); // Usa cache si la búsqueda ya se realizó antes
    return;
  }

  const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al buscar en Deezer");

    const data = await response.json();
    console.log("Resultados de la búsqueda:", data);

    cache.set(query, data.data); // Guarda en cache
    songs.value = data.data;
  } catch (error) {
    console.error(error.message);
  }
};

// Ejecutar búsqueda al montar el componente si hay un término en la URL
onMounted(() => {
  if (searchQuery.value) {
    searchDeezer(searchQuery.value);
  }
});

// Detectar cambios en la URL y hacer una nueva búsqueda
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery;
  searchDeezer(newQuery);
});
</script>

<style scoped>
h1 {
  color: #dc3545;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}
.filter-item {
  flex: 1 1 200px;
}
.short-input {
  width: 60px;
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
  color: #007bff;
  text-decoration: none;
}
.listen-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
li:hover {
  background-color: blue;
  color: white;
}
</style>