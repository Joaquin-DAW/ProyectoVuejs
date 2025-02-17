<template>
  <div id="songCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div 
        v-for="(song, index) in featuredSongs" 
        :key="song.id" 
        :class="['carousel-item', { active: index === 0 }]"
      >
      <div class="carousel-image">
        <img :src="song.album.cover_xl" class="d-block w-100" :alt="song.title">
        <div class="carousel-caption d-none d-md-block">
          <div class="caption-background">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }}</p>
          </div>
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

defineProps(["featuredSongs"]);

</script>

<style scoped>
.carousel-image {
  position: relative;
}

.carousel-item img {
  height: 600px;
  object-fit: contain;
  filter: brightness(70%);
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
  color: white;
}

.caption-background p {
  font-size: 1.1rem; /* Ajusta el tamaño del nombre del artista */
  color: white;
}
</style>
