<template>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar canciones"
        @keyup.enter="searchSongs"
      />
      <div v-for="song in songs" :key="song.id" class="song-item">
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
  
  <script>
  import { ref } from 'vue';
  import { useFavoritesStore } from '@/stores/favorites';
  
  export default {
    name: 'SongSearch',
    setup() {
      const searchQuery = ref('');
      const songs = ref([]);
      const favoritesStore = useFavoritesStore();
  
      const searchSongs = async () => {
        const response = await fetch(
          `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`
          //`https://api.deezer.com/search?q=${searchQuery.value}`
        );
        const data = await response.json();
        songs.value = data.data;
      };
  
      const toggleFavorite = (song) => {
        if (favoritesStore.isFavorite(song.id)) {
          favoritesStore.removeSong(song.id);
        } else {
          favoritesStore.addSong(song);
        }
      };
  
      const isFavorite = (id) => favoritesStore.isFavorite(id);
  
      return {
        searchQuery,
        songs,
        toggleFavorite,
        isFavorite,
      };
    },
  };
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