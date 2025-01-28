<template>
    <div>
      <h1>Playlists</h1>
      <p>Gestiona tus playlists aquí.</p>
      <ul v-if="favorites.length > 0">
      <li v-for="song in favorites" :key="song.id" class="song-item">
        <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
        <div class="song-info">
          <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
          <p>Duración: {{ formatDuration(song.duration) }}</p>
          <p><a :href="song.link" target="_blank" class="listen-link">Escuchar completa</a></p>
        </div>
      </li>
    </ul>
    <p v-else>No hay canciones en la playlist</p>
    </div>
  <!-- Integrar el componente Pinia -->
  <PiniaComponent />
    <!-- Mostrar datos de la store directamente -->
    <div class="store-data">
      <h3>Datos desde la Store:</h3>
      <p>Email actual: {{ userEmail }}</p>
      <p>Dominio del email: {{ emailDomain }}</p>
    </div>
      
  </template>
  
  <script setup>
  // Accede a la store
import { computed } from 'vue';
import { useUserStore } from '../stores/email';
import PiniaComponent from '../components/pinia.vue';
import { useFavoritesStore } from "../stores/favorites";// Importa el estado global

// Vincula datos de la store
const userStore = useUserStore();

const userEmail = computed(() => userStore.email);
const emailDomain = computed(() => userStore.emailDomain);

const favoritesStore = useFavoritesStore();
const favorites = computed(() => favoritesStore.favorites);

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

  </script>
  
  <style scoped>
  h1 {
    color: #28a745;
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