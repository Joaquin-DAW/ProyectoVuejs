<template>
    <div class="music-player" v-if="currentSong">
      <!-- Información de la canción -->
      <div class="song-info">
        <img :src="currentSong.album.cover_medium" alt="Portada" class="album-cover" />
        <div>
          <h3>{{ currentSong.title }}</h3>
          <p>{{ currentSong.artist.name }}</p>
        </div>
      </div>
  
      <!-- Controles de reproducción -->
      <div class="controls">
        <button @click="togglePlay">
          <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek" />
        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
  
      <!-- Elemento de audio (oculto) -->
      <audio ref="audio" @timeupdate="updateTime" @ended="nextSong"></audio>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from "vue";
  
  const props = defineProps(["currentSong"]);
  const emit = defineEmits(["next"]);
  
  const audio = ref(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  
  // **Reproducir o pausar la canción**
  const togglePlay = () => {
    if (!audio.value) return;
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
  };
  
  // **Actualizar la barra de progreso**
  const updateTime = () => {
    currentTime.value = audio.value.currentTime;
    duration.value = audio.value.duration;
  };
  
  // **Cambiar la posición de reproducción**
  const seek = () => {
    audio.value.currentTime = currentTime.value;
  };
  
  // **Formatear tiempo en mm:ss**
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };
  
  // **Detectar cuando cambia la canción y cargarla**
  watch(() => props.currentSong, (newSong) => {
    if (!newSong) return;
    audio.value.src = newSong.preview;
    audio.value.play();
    isPlaying.value = true;
  });
  
  // **Detectar fin de la canción y emitir evento para pasar a la siguiente**
  const nextSong = () => {
    isPlaying.value = false;
    emit("next");
  };
  </script>
  
  <style scoped>
  .music-player {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #222;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .song-info {
    display: flex;
    align-items: center;
  }
  .album-cover {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .controls {
    display: flex;
    align-items: center;
  }
  button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
  input[type="range"] {
    margin: 0 10px;
    width: 100px;
  }
  </style>  