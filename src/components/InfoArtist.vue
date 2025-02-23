<template>
  <div class="info-container" v-if="artist">
    <!-- Imagen del artista -->
    <img :src="artist.picture_big" :alt="artist.name" class="artist-image" />

    <!-- Información del artista -->
    <div class="artist-details">
      <h1 class="artist-name">{{ artist.name }}</h1>
      <p class="fans-count">🎵 Fans: {{ artist.nb_fan.toLocaleString() }}</p>

      <!-- Botón para ver en Deezer -->
      <a :href="artist.link" target="_blank" class="deezer-link">🔍 Ver en Deezer</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  id: String, // Recibe el ID desde la URL
});

const artist = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    if (!props.id) throw new Error("ID no recibido");

    // const res = await fetch(`https://api.deezer.com/artist/${props.id}`);
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${props.id}`);

    if (!res.ok) throw new Error("Error al obtener datos del artista");

    artist.value = await res.json();
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

/* Imagen del artista */
.artist-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
}

/* Contenedor de detalles */
.artist-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  max-width: 600px;
}

/* Estilos del nombre */
.artist-name {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Estilos de la cantidad de fans */
.fans-count {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
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
