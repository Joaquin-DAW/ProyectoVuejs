<template>
  <div class="card album-card">
    <img :src="album.cover_medium" class="card-img-top" :alt="album.title">
    <div class="card-body">
      <h5 class="card-title">{{ album.title }}</h5>
      <p class="card-text">{{ album.artist.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  album: { type: Object,required: true }
});
</script>

<style scoped>
.album-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
  transition: transform 0.2s ease-in-out;
}
.album-card:hover {
  transform: scale(1.05);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
.card-text {
  font-size: 1rem;
  color: #555;
  text-align: center;
}
</style>