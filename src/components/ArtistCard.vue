<template>
  <div class="card artist-card">
    <img :src="artist.picture_medium" class="card-img-top" :alt="artist.name">
    <div class="card-body">
      <h5 class="card-title">{{ artist.name }}</h5>
      <p class="card-text">Fans: {{ artist.nb_fan }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  artist: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.artist-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
  transition: transform 0.2s ease-in-out;
}
.artist-card:hover {
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