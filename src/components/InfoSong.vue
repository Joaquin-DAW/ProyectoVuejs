<template>
  <div class="info-container" v-if="song">
    <!-- Imagen del álbum -->
    <img :src="song.album.cover_big" :alt="song.title" class="album-cover" />

    <!-- Información de la canción -->
    <div class="song-details">
      <h1 class="song-title">{{ song.title }}</h1>
      <p class="artist-name">🎤 {{ song.artist.name }}</p>
      <p>💿 Álbum: {{ song.album.title }}</p>
      <p>⏱ Duración: {{ formatDuration(song.duration) }}</p>

      <!-- Reproductor de audio -->
      <audio controls :src="song.preview" class="audio-player"></audio>

      <!-- Enlace a Deezer -->
      <a :href="song.link" target="_blank" class="deezer-link">🎧 Escuchar en Deezer</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  id: String, // Recibe el ID desde la URL
});

const song = ref(null);
const loading = ref(true);
const error = ref(null);

// ✅ Formatear duración en mm:ss
const formatDuration = (duration) => {
  if (!duration) return "0:00";
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// ✅ Obtener datos de la canción
const fetchData = async () => {
  try {
    if (!props.id) throw new Error("ID no recibido");

    let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${props.id}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error en la API");

    song.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* ✅ Contenedor más ancho */
.info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6); /* Fondo oscuro */
  border-radius: 10px;
  text-align: left;
  color: white; /* Texto en blanco */
  max-width: 1000px; /* Más ancho */
  width: 90%; /* Ajuste flexible */
  margin: 40px auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* ✅ Imagen del álbum */
.album-cover {
  width: 250px; /* Más grande */
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
}

/* ✅ Contenedor de detalles */
.song-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1; /* Ocupa el espacio restante */
  max-width: 600px;
}

/* ✅ Estilos del título */
.song-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* ✅ Nombre del artista */
.artist-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* ✅ Enlace a Deezer */
.deezer-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #1db954; /* Verde estilo Spotify */
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.deezer-link:hover {
  background-color: #17a84a;
  text-decoration: none;
}

/* ✅ Reproductor de audio más grande */
.audio-player {
  width: 100%; /* Ocupa todo el ancho disponible */
  margin-top: 10px;
  border-radius: 5px;
}
</style>