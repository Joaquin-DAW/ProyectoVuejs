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
      <input 
        type="range" 
        min="0" 
        :max="duration || 1" 
        v-model="currentTime" 
        @input="seek"
      />
      <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>

    <!-- Elemento de audio oculto (nocontrols) -->
    <audio ref="audio" @timeupdate="updateTime" @ended="nextSong" @loadedmetadata="loadMetadata"></audio>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps(["currentSong"]);
const emit = defineEmits(["next"]);

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// **Reproducir o pausar la canción con botón externo**
const togglePlay = () => {
  if (!audio.value) return;
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

// **Actualizar la barra de progreso y el tiempo actual**
const updateTime = () => {
  if (!audio.value) return;
  currentTime.value = audio.value.currentTime;
};

// **Cargar duración cuando el audio esté listo**
const loadMetadata = () => {
  if (!audio.value) return;
  duration.value = audio.value.duration;
};

// **Permitir saltar en la barra de progreso**
const seek = () => {
  if (!audio.value) return;
  audio.value.currentTime = currentTime.value;
};

// **Formatear tiempo en mm:ss**
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};

// **Detectar cambio de canción y cargar la preview**
watch(() => props.currentSong, (newSong) => {
  if (!newSong || !audio.value) return;
  audio.value.src = newSong.preview;
  audio.value.load();
  currentTime.value = 0;
  isPlaying.value = false; // Evita reproducción automática
});

// **Emitir evento cuando termina la canción para avanzar a la siguiente**
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
  box-shadow: 0 -2px 10px rgba(233, 152, 152, 0.5);
}

.song-info {
  display: flex;
  align-items: center;
}

.album-cover {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

input[type="range"] {
  width: 100px;
  accent-color: #007bff;
}

span {
  font-size: 14px;
  min-width: 80px;
  text-align: right;
}
</style>
