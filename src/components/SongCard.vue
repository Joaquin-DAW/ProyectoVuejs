<template>
  <div class="card song-card">
    <img :src="song.album.cover_big" class="card-img-top" :alt="song.title">
    <div class="card-body">
      <h5 class="card-title">{{ song.title }}</h5>
      <p class="card-text">{{ song.artist.name }}</p>
      <button @click="addToPlaylist" class="btn btn-primary">Agregar a Playlist</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-playlist']);

const addToPlaylist = () => {
  emit('add-to-playlist', props.song);
};
</script>

<style scoped>
.song-card {
  width: 100%;
  max-width: 300px;
  margin: 10px;
}
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>