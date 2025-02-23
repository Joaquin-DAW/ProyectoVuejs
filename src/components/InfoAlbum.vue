<template>
  <div class="info-container" v-if="album">
    <!-- Imagen del álbum -->
    <img :src="album.cover_big" :alt="album.title" class="album-cover" />

    <!-- Información del álbum -->
    <div class="album-details">
      <h1 class="album-title">{{ album.title }}</h1>
      <p class="artist-name">🎤 Artista: {{ album.artist.name }}</p>
      <p class="release-date">📅 Lanzamiento: {{ album.release_date }}</p>

      <!-- Botón para escuchar en Deezer -->
      <a :href="album.link" target="_blank" class="deezer-link">🎧 Escuchar en Deezer</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  id: String, // Recibe el ID desde la URL
});

const album = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    if (!props.id) throw new Error("ID no recibido");

    // const res = await fetch(`https://api.deezer.com/album/${props.id}`);
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${props.id}`);

    if (!res.ok) throw new Error("Error al obtener datos del álbum");

    album.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped>
.info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  text-align: left;
  color: white;
  max-width: 1000px;
  width: 90%;
  margin: 40px auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Imagen del álbum */
.album-cover {
  width: 250px;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
}

/* Contenedor de detalles */
.album-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  max-width: 600px;
}

/* Estilos del título */
.album-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Estilos del artista */
.artist-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Estilos de la fecha de lanzamiento */
.release-date {
  font-size: 18px;
  margin-bottom: 10px;
}

/* Botón para Deezer */
.deezer-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #1db954;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.deezer-link:hover {
  background-color: #17a84a;
}
</style>
