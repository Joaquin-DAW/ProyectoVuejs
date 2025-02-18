<template>
    <li class="search-song-item">
      <!-- Imagen del álbum -->
      <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
  
      <!-- Información de la canción -->
      <div class="song-info">
        <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
        <p> {{ formatDuration(song.duration) }}</p>
      </div>
  
      <!-- Botón para reproducir -->
      <button @click="$emit('play', song)" class="btn btn-success">▶ Reproducir</button>
  
      <!-- Enlace para escuchar la canción completa -->
      <a :href="song.link" target="_blank" class="listen-link">🎧 Escuchar en Deezer</a>
  
      <!-- Icono de favoritos -->
      <i 
        :class="['bi', isFavorite(song.id) ? 'bi-heart-fill' : 'bi-heart']" 
        @click="toggleFavorite(song)"
        :style="{
          color: isFavorite(song.id) ? 'red' : 'black', 
          cursor: 'pointer',
          fontSize: '20px',
          textShadow: isFavorite(song.id) ? 'none' : '0px 0px 3px rgba(0, 0, 0, 0.5)'
        }"
      ></i>
    </li>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  import { useFavoritesStore } from "@/stores/favorites";
  
  const props = defineProps({
    song: { type: Object, required: true }
  });
  
  const emit = defineEmits(["play"]);
  
  // **Almacén de favoritos**
  const favoritesStore = useFavoritesStore();
  
  // **Función para alternar favoritos**
  const toggleFavorite = () => {
    favoritesStore.isFavorite(props.song.id)
      ? favoritesStore.removeSong(props.song.id)
      : favoritesStore.addSong(props.song);
  };
  
  // **Verifica si una canción es favorita**
  const isFavorite = (id) => favoritesStore.isFavorite(id);
  
  // **Función para formatear la duración en minutos y segundos**
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  </script>
  
  <style scoped>
  /* Estructura de la tarjeta en forma de lista */
  .search-song-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.734);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease-in-out;
  }
  
  /* Efecto hover */
  .search-song-item:hover {
    background-color: rgba(0, 0, 255, 0.8);
    color: white;
  }
  
  /* Imagen del álbum */
  .album-cover {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  /* Contenedor de información de la canción */
  .song-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* Botón de reproducción */
  .btn {
    font-size: 0.9rem;
    padding: 5px 12px;
  }
  
  /* Enlace para escuchar la canción completa */
  .listen-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .listen-link:hover {
    color: #0056b3;
    text-decoration: underline;
  }
  </style>
  