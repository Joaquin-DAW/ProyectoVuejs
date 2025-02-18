<template>
    <div v-if="song">
      <h1>{{ song.title }}</h1>
      <img :src="song.album.cover_big" :alt="song.title">
      <p>🎤 Artista: {{ song.artist.name }}</p>
      <p>💿 Álbum: {{ song.album.title }}</p>
      <p>⏱ Duración: {{ formatDuration(song.duration) }}</p>
      <audio controls :src="song.preview"></audio>
      <a :href="song.link" target="_blank">Escuchar en Deezer</a>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const song = ref(null);
  
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  onMounted(async () => {
    const res = await fetch(`https://api.deezer.com/track/${route.params.id}`);
    song.value = await res.json();
  });
  </script>
  