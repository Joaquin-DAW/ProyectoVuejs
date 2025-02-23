<template>
  <div class="music-player" v-if="currentSong">
    <!-- Información de la canción -->
    <div class="song-info">
      <img :src="currentSong.album.cover_medium" alt="Portada" class="album-cover" />
      <div class="song-details">
        <h3>{{ currentSong.title }}</h3>
        <p>{{ currentSong.artist.name }}</p>
      </div>
    </div>

    <!-- Controles de reproducción -->
    <div class="controls">
      <button @click="togglePlay" class="play-btn">
        <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
      </button>

      <div class="progress-container">
        <span>{{ formatTime(currentTime) }}</span>
        <input 
          type="range" 
          min="0" 
          :max="duration" 
          v-model="currentTime" 
          @input="seek"
        />
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Elemento de audio -->
    <audio ref="audio" @timeupdate="updateTime" @ended="nextSong" @loadedmetadata="loadMetadata"></audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";

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

// **Reproducir automáticamente cuando cambia la canción**
watch(() => props.currentSong, async (newSong) => {
  if (!newSong) return;

  await nextTick();
  if (!audio.value) return;

  audio.value.src = newSong.preview;
  audio.value.load();

  audio.value.play().then(() => {
    isPlaying.value = true;
  }).catch((error) => {
    console.warn("El navegador bloqueó la reproducción automática:", error);
  });
});

// **Reproducir la primera canción si ya existe al cargar**
onMounted(async () => {
  await nextTick();
  if (props.currentSong && audio.value) {
    audio.value.src = props.currentSong.preview;
    audio.value.load();
    audio.value.play().then(() => {
      isPlaying.value = true;
    }).catch((error) => {
      console.warn("El navegador bloqueó la reproducción automática:", error);
    });
  }
});

// **Detectar fin de la canción y pasar a la siguiente**
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
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(233, 152, 152, 0.5);
}

/* Información de la canción */
.song-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.album-cover {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
}

.song-details h3 {
  margin: 0;
  font-size: 16px;
}

.song-details p {
  margin: 0;
  font-size: 14px;
  color: #bbb;
}

/* Controles */
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.play-btn {
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  margin-bottom: 5px;
}

/* Barra de progreso */
.progress-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 10px;
}

input[type="range"] {
  flex: 1;
  accent-color: #007bff;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;
}

span {
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}
</style>
