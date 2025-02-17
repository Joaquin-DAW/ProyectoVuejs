<template>
  <div>
    <h1>Búsqueda de canciones, álbumes y artistas en Deezer</h1>
    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo"
        >https://cors-anywhere.herokuapp.com/corsdemo</a
      >
    </p>
    <!-- Componente de búsqueda -->
    <SearchBar @search="searchDeezer" />
    <hr />

    <!-- Filtros -->
    <div class="filters">
      <div class="filter-item">
        <label>
          <input type="checkbox" v-model="sortAscending" />
          Ordenar por nombre (ascendente)
        </label>
      </div>
      <div class="filter-item">
        <label>
          Duración mínima:
          <div class="duration-inputs">
            <input type="number" v-model="minDurationMinutes" placeholder="Min" class="short-input"/>
            <span>:</span>
            <input type="number" v-model="minDurationSeconds" placeholder="Seg" class="short-input"/>
          </div>
        </label>
      </div>
      <div class="filter-item">
        <label>
          Artista:
          <input type="text" v-model="artistFilter" placeholder="Nombre del artista" />
        </label>
      </div>
    </div>

    <!-- Lista de resultados de canciones -->
    <h2>Canciones</h2>
    <ul v-if="filteredAndSortedSongs.length > 0">
      <li v-for="song in limitedSongs" :key="song.id" class="song-item">
        <img :src="song.album.cover_medium" alt="Portada del álbum" class="album-cover" />
        <div class="song-info">
          <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }}
          <p>Duración: {{ formatDuration(song.duration) }}</p>
          <button @click="$emit('play', song)">▶ Reproducir</button>
          <p><a :href="song.link" target="_blank" class="listen-link">Escuchar completa</a></p>
          <i 
            :class="['bi', isFavorite(song.id) ? 'bi-heart-fill' : 'bi-heart']" 
            @click="toggleFavorite(song)"
            :style="{ color: isFavorite(song.id) ? 'red' : 'black', cursor: 'pointer' }"
          ></i>
        </div>
      </li>
    </ul>
    <p v-else>No hay resultados de canciones para mostrar</p>
    <div class="load-more-container">
      <button v-if="filteredAndSortedSongs.length > limit" @click="loadMoreSongs" class="btn btn-primary">Cargar más canciones</button>
    </div>

    <!-- Lista de resultados de álbumes -->
    <h2>Álbumes</h2>
    <div class="row">
      <div class="col-md-4" v-for="album in limitedAlbums" :key="album.id">
        <AlbumCard :album="album" />
      </div>
    </div>
    <p v-if="albums.length === 0" class="text-muted text-center mt-4">No hay resultados de álbumes para mostrar</p>
    <div class="load-more-container">
      <button v-if="albums.length > limit" @click="loadMoreAlbums" class="btn btn-primary">Cargar más álbumes</button>
    </div>

    <!-- Lista de resultados de artistas -->
    <h2>Artistas</h2>
    <div class="row">
      <div class="col-md-4" v-for="artist in limitedArtists" :key="artist.id">
        <ArtistCard :artist="artist" />
      </div>
    </div>
    <p v-if="artists.length === 0" class="text-muted text-center mt-4">No hay resultados de artistas para mostrar</p>
    <div class="load-more-container">
      <button v-if="artists.length > limit" @click="loadMoreArtists" class="btn btn-primary">Cargar más artistas</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import AlbumCard from "../components/AlbumCard.vue";
import ArtistCard from "../components/ArtistCard.vue";
import { useFavoritesStore } from "../stores/favorites";

const route = useRoute();
const searchQuery = ref(route.query.q || ""); // Capturar el término de búsqueda desde la URL
const favoritesStore = useFavoritesStore();

const songs = ref([]);
const albums = ref([]);
const artists = ref([]);
const cache = new Map();

const sortAscending = ref(false);
const minDurationMinutes = ref(null);
const minDurationSeconds = ref(null);
const artistFilter = ref("");

const limit = ref(5); 

// **Función para formatear la duración en minutos y segundos**
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// **Filtrado y ordenamiento de canciones**
const filteredAndSortedSongs = computed(() => {
  let result = [...songs.value];

  const minDuration = (parseInt(minDurationMinutes.value) || 0) * 60 + (parseInt(minDurationSeconds.value) || 0);

  if (minDuration > 0) {
    result = result.filter(song => song.duration && song.duration >= minDuration);
  }

  if (artistFilter.value.trim() !== "") {
    result = result.filter(song =>
      song.artist.name.toLowerCase().includes(artistFilter.value.trim().toLowerCase())
    );
  }

  return result.sort((a, b) =>
    sortAscending.value ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );
});

// **Limitar los resultados a mostrar**
const limitedSongs = computed(() => filteredAndSortedSongs.value.slice(0, limit.value));
const limitedAlbums = computed(() => albums.value.slice(0, limit.value));
const limitedArtists = computed(() => artists.value.slice(0, limit.value));

let searchTimeout = null; // Para debounce

// **Función para buscar en Deezer**
const searchDeezer = async (query) => {
  if (!query.trim()) return;

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    if (cache.has(query)) {
      const cachedData = cache.get(query);
      songs.value = cachedData.songs;
      albums.value = cachedData.albums;
      artists.value = cachedData.artists;
      return;
    }

    const songUrl = `http://localhost:8080/https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
    const albumUrl = `http://localhost:8080/https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`;
    const artistUrl = `http://localhost:8080/https://api.deezer.com/search/artist?q=${encodeURIComponent(query)}`;

    try {
      const [songResponse, albumResponse, artistResponse] = await Promise.all([
        fetch(songUrl, {
          headers: {
            "origin": "localhost",
            "x-requested-with": "XMLHttpRequest",
          },
        }),
        fetch(albumUrl, {
          headers: {
            "origin": "localhost",
            "x-requested-with": "XMLHttpRequest",
          },
        }),
        fetch(artistUrl, {
          headers: {
            "origin": "localhost",
            "x-requested-with": "XMLHttpRequest",
          },
        }),
      ]);

      if (!songResponse.ok || !albumResponse.ok || !artistResponse.ok) {
        throw new Error("Error al buscar en Deezer");
      }

      const songData = await songResponse.json();
      const albumData = await albumResponse.json();
      const artistData = await artistResponse.json();
      console.log("Resultados de la búsqueda:", { songs: songData, albums: albumData, artists: artistData });

      cache.set(query, { songs: songData.data, albums: albumData.data, artists: artistData.data });

      songs.value = songData.data || [];
      albums.value = albumData.data || [];
      artists.value = artistData.data || [];
    } catch (error) {
      console.error("Error en la búsqueda:", error.message);
    }
  }, 500); // **Debounce de 500ms**
};

// **Manejar cambios en la URL y hacer una nueva búsqueda**
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery;
  searchDeezer(newQuery);
});

// **Ejecutar búsqueda al montar el componente si hay un término en la URL**
onMounted(() => {
  if (searchQuery.value) {
    searchDeezer(searchQuery.value);
  }
});

// **Funciones para cargar más resultados**
const loadMoreSongs = () => { limit.value += 5; };
const loadMoreAlbums = () => { limit.value += 5; };
const loadMoreArtists = () => { limit.value += 5; };

// **Función para alternar favoritos**
const toggleFavorite = (song) => {
  favoritesStore.isFavorite(song.id)
    ? favoritesStore.removeSong(song.id)
    : favoritesStore.addSong(song);
};

// **Función para verificar si una canción es favorita**
const isFavorite = (id) => favoritesStore.isFavorite(id);

</script>

<style scoped>
h1 {
  color: #dc3545;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}
.filter-item {
  flex: 1 1 200px;
}
.short-input {
  width: 60px;
}
.song-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background-color: #f8f9fa;
}
.album-cover {
  width: 85px; 
  height: 85px;
  margin-right: 20px;
  border-radius: 5px;
}
.song-info {
  flex: 1;
}
.song-info p {
  margin: 5px 0;
}
.listen-link {
  color: #007bff;
  text-decoration: none;
}
.listen-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
li:hover {
  background-color: blue;
  color: white;
}
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>