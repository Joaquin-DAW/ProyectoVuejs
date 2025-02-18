<template>
  <div class="playlist-item">
    <!-- Imagen del álbum -->
    <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />

    <!-- Información de la canción -->
    <div class="song-info">
      <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
      <p>⏱ {{ formatDuration(song.duration) }}</p>
      <a :href="song.link" target="_blank" class="listen-link">🎧 Escuchar en Deezer</a>
    </div>

    <!-- Botón para eliminar -->
    <button @click="$emit('remove', song.id)" class="btn btn-danger">❌ Eliminar</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  song: { type: Object, required: true }
});

// Emitir evento al hacer clic en eliminar
defineEmits(['remove']);

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
</script>

<style scoped>
.playlist-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease-in-out;
}

.playlist-item:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.album-cover {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.song-info {
  flex: 1;
}

.listen-link {
  color: #007bff;
  text-decoration: none;
}

.listen-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Botón de eliminar */
.btn-danger {
  background: red;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger:hover {
  background: darkred;
}
</style>
