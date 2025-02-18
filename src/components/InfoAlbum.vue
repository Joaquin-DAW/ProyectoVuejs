<template>
    <div v-if="album">
      <h1>{{ album.title }}</h1>
      <img :src="album.cover_big" :alt="album.title">
      <p>🎤 Artista: {{ album.artist.name }}</p>
      <p>📅 Lanzamiento: {{ album.release_date }}</p>
      <a :href="album.link" target="_blank">Escuchar en Deezer</a>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const album = ref(null);
  
  onMounted(async () => {
    const res = await fetch(`https://api.deezer.com/album/${route.params.id}`);
    album.value = await res.json();
  });
  </script>
  