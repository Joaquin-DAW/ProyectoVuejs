<template>
    <div class="playlist-item">
      <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
      <div class="song-info">
        <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
        <p>Duración: {{ formatDuration(song.duration) }}</p>
        <p><a :href="song.link" target="_blank" class="listen-link">Escuchar completa</a></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    song: Object
  });
  
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
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .album-cover {
    width: 50px;
    height: 50px;
    margin-right: 10px;
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
  </style>