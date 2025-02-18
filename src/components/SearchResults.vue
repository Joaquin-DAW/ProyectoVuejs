<template>
    <div v-if="hasResults">
      <!-- Lista de canciones -->
      <div v-if="songs.length > 0">
        <h2>Canciones</h2>
        <ul class="result-list">
          <SearchSongItem 
            v-for="song in songs" 
            :key="song.id" 
            :song="song"
            @play="$emit('play', song)"
          />
        </ul>
      </div>
  
      <!-- Lista de álbumes -->
      <div v-if="albums.length > 0">
        <h2>Álbumes</h2>
        <div class="row">
          <div class="col-md-4" v-for="album in albums" :key="album.id">
            <AlbumCard :album="album" />
          </div>
        </div>
      </div>
  
      <!-- Lista de artistas -->
      <div v-if="artists.length > 0">
        <h2>Artistas</h2>
        <div class="row">
          <div class="col-md-4" v-for="artist in artists" :key="artist.id">
            <ArtistCard :artist="artist" />
          </div>
        </div>
      </div>
    </div>
  
    <p v-else>No hay resultados de búsqueda</p>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import SearchSongItem from "../components/SearchSongItem.vue";
  import AlbumCard from "../components/AlbumCard.vue";
  import ArtistCard from "../components/ArtistCard.vue";
  
  const props = defineProps({
    songs: { type: Array, required: true, default: () => [] },
    albums: { type: Array, required: true, default: () => [] },
    artists: { type: Array, required: true, default: () => [] }
  });
  
  defineEmits(["play"]);
  
  // Computed para verificar si hay resultados
  const hasResults = computed(() => 
    props.songs.length > 0 || props.albums.length > 0 || props.artists.length > 0
  );
  </script>
  
  <style scoped>
  h2{
    color: white;
  }
  .result-list {
    list-style: none;
    padding: 0;
  }
  </style>
  