<template>
  <div class="playlist-manager">
    <h1>Mi Playlist</h1>

    <p v-if="favorites.length === 0">No hay canciones en la playlist.</p>

    <!-- Lista de canciones en la playlist -->
    <ul v-else class="playlist-list">
      <li v-for="(song, index) in favorites" :key="song.id" class="playlist-item">
        <PlaylistItem 
          :song="song"
          :index="index"
          @play="$emit('play', song)" 
          @remove="removeFromPlaylist"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/favorites';
import PlaylistItem from './PlaylistItem.vue';

const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.favorites);

const emit = defineEmits(["play"]); // Declaramos el evento "play"

// Función para eliminar canción de la playlist
const removeFromPlaylist = (id) => {
  favoritesStore.removeSong(id);
};
</script>

<style scoped>
.playlist-manager {
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
}

h1 {
  color: white;
  text-align: center;
}

.playlist-list {
  list-style: none;
  padding: 0;
}

.playlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
}
</style>
