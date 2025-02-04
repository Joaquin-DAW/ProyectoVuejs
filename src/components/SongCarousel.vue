<template>
  <div id="songCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div 
        v-for="(song, index) in featuredSongs" 
        :key="song.id" 
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="song.album.cover_medium" class="d-block w-100" :alt="song.title">
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ song.title }}</h5>
          <p>{{ song.artist.name }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#songCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#songCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const featuredSongs = ref([]);

const fetchFeaturedSongs = async () => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener las canciones destacadas");
    }
    const data = await response.json();
    featuredSongs.value = data.tracks.data;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(fetchFeaturedSongs);
</script>

<style scoped>
.carousel-item img {
  height: 400px;
  object-fit: cover;
}
</style>