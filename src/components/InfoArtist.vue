<template>
    <div v-if="artist">
      <h1>{{ artist.name }}</h1>
      <img :src="artist.picture_big" :alt="artist.name">
      <p>🎵 Fans: {{ artist.nb_fan }}</p>
      <a :href="artist.link" target="_blank">Ver en Deezer</a>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const artist = ref(null);
  
  onMounted(async () => {
    const res = await fetch(`https://api.deezer.com/artist/${route.params.id}`);
    artist.value = await res.json();
  });
  </script>
  