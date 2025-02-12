<template>
  <div id="songCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div 
        v-for="(song, index) in featuredSongs" 
        :key="song.id" 
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="song.album.cover_xl" class="d-block w-100" :alt="song.title">
        <div class="carousel-caption d-none d-md-block">
          <div class="caption-background">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }}</p>
          </div>
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
    featuredSongs.value = data.tracks.data.slice(0, 6);
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(fetchFeaturedSongs);
</script>

<style scoped>
.carousel-item img {
  height: 600px;
  object-fit: contain;
}

.carousel-caption {
  display: block;
  text-align: center; /* Centra el texto */
}

.caption-background {
  background-color: rgba(0, 0, 0, 0.75); /* Fondo gris semitransparente */
  display: inline-block; /* Ajusta el tamaño del fondo al contenido */
  padding: 10px 20px; /* Añade padding alrededor del texto */
  border-radius: 5px; /* Bordes redondeados */
  margin: 5px 0; /* Añade un poco de margen entre el título y el artista */
}

.caption-background h5,
.caption-background p {
  margin: 0; /* Elimina el margen por defecto */
}

.caption-background h5 {
  font-size: 1.5rem; /* Ajusta el tamaño del título */
  font-weight: bold;
  margin-bottom: 5px; /* Añade espacio entre el título y el nombre del artista */
}

.caption-background p {
  font-size: 1.1rem; /* Ajusta el tamaño del nombre del artista */
  font-weight: normal;
}
</style>
