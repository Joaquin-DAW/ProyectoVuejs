<template>
  <div>
    <h1>Playlists</h1>
    <p>Gestiona tus playlists aquí.</p>

    <!-- Componente PlaylistManager -->
    <PlaylistManager @play="$emit('play', $event)" />
    
  </div>
</template>

<script setup>
import { computed } from 'vue';
import PlaylistManager from '../components/PlaylistManager.vue';
import { useFavoritesStore } from "../stores/favorites";

defineEmits(["play"]);  // Declarar el evento "play"

const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.favorites);

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Eliminar canción de la playlist
const removeFromPlaylist = (id) => {
  favoritesStore.removeSong(id);
};
</script>

<style scoped>
h1, p {
  color: white;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
}

.album-cover {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 5px;
}

.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
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

/* Botones */
.btn {
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 10px;
}

.btn-success {
  background-color: green;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}
</style>
