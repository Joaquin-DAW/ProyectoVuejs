<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar canciones"
      @keyup.enter="searchSongs"
    />
    
    <div class="song-item">
      <div>
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist.name }}</p>
      </div>
      <button @click="toggleFavorite(song)">
        {{ isFavorite(song.id) ? 'Quitar de favoritos' : 'Añadir a favoritos' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFavoritesStore } from "@/stores/favorites";

const searchQuery = ref("");
const songs = ref([]);
const favoritesStore = useFavoritesStore();
let searchTimeout = null;

// **Función para buscar canciones en Deezer**
const searchSongs = async () => {
  if (!searchQuery.value.trim()) return; // Evitar búsquedas vacías

  // **Usar debounce para evitar llamadas excesivas a la API**
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/https://api.deezer.com/search?q=${encodeURIComponent(searchQuery.value)}`,
        {
          headers: {
            "origin": "localhost",
            "x-requested-with": "XMLHttpRequest",
          },
        }
      );

      if (!response.ok) throw new Error("Error al obtener los datos");

      const data = await response.json();
      songs.value = data.data || []; // Asegurar que siempre sea un array
    } catch (error) {
      console.error("Error en la búsqueda:", error.message);
    }
  }, 500); // **Espera 500ms antes de hacer la petición**
};

// **Función para alternar favoritos**
const toggleFavorite = (song) => {
  favoritesStore.isFavorite(song.id)
    ? favoritesStore.removeSong(song.id)
    : favoritesStore.addSong(song);
};

// **Verificar si una canción es favorita**
const isFavorite = (id) => favoritesStore.isFavorite(id);
</script>

<style scoped>
.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>