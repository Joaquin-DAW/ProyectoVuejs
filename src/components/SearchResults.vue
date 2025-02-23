<template>
    <div v-if="hasResults">
      <!-- Lista de canciones -->
      <div v-if="songs.length > 0">
        <h2>Canciones</h2>
        <ul class="result-list">
          <li v-for="song in songs" :key="song.id" class="song-item">
          <SearchSongItem 
            :song="song"
            @play="$emit('play', song)"
          />
        </li>
        </ul>
      </div>
  
      <!-- Lista de álbumes -->
      <div v-if="albums.length > 0">
        <h2>Álbumes</h2>
        <div class="row">
          <div class="col-md-4" v-for="album in albums" :key="album.id">
            <router-link :to="{ name: 'InfoView', params: { type: 'album', id: album.id } }">
              <AlbumCard :album="album" />
            </router-link>
          </div>
        </div>
      </div>
  
      <!-- Lista de artistas -->
      <div v-if="artists.length > 0">
        <h2>Artistas</h2>
        <div class="row">
          <div class="col-md-4" v-for="artist in artists" :key="artist.id">
            <router-link :to="{ name: 'InfoView', params: { type: 'artist', id: artist.id } }">
              <ArtistCard :artist="artist" />
            </router-link>
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
 .result-list {
  list-style: none;
  padding: 0;
}

.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease-in-out;
}

.song-item:hover {
  background-color: rgba(0, 0, 255, 0.8);
  color: white;
}

h2 {
  color: white;
  margin-top: 20px;
}
  </style>
  