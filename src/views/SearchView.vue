<template>
  <div>
    <h1>Búsqueda de canciones, álbumes y artistas en Deezer</h1>
    
    <p>
      Para que salgan los resultados debes entrar en
      <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a>
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
            <input type="number" v-model="minDurationMinutes" placeholder="Min" class="short-input" />
            <span>:</span>
            <input type="number" v-model="minDurationSeconds" placeholder="Seg" class="short-input" />
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

    <!-- Componente de resultados -->
    <SearchResults 
      :songs="limitedSongs" 
      @play="$emit('play', $event)"
    />

    <div class="load-more-container" v-if="filteredAndSortedSongs.length > songLimit">
      <button @click="loadMoreSongs" class="btn btn-primary">Cargar más canciones</button>
    </div>

    <SearchResults 
      :albums="limitedAlbums" 
      @play="$emit('play', $event)"
    />

    <div class="load-more-container" v-if="albums.length > albumLimit">
      <button @click="loadMoreAlbums" class="btn btn-primary">Cargar más álbumes</button>
    </div>

    <SearchResults 
      :artists="limitedArtists"
      @play="$emit('play', $event)"
    />

    <div class="load-more-container" v-if="artists.length > artistLimit">
      <button @click="loadMoreArtists" class="btn btn-primary">Cargar más artistas</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import SearchResults from "../components/SearchResults.vue";

const route = useRoute();
const searchQuery = ref(route.query.q || "");

const songs = ref([]);
const albums = ref([]);
const artists = ref([]);
const cache = new Map();

// Límites individuales para cada tipo de resultado
const songLimit = ref(5);
const albumLimit = ref(5);
const artistLimit = ref(5);

const sortAscending = ref(false);
const minDurationMinutes = ref(null);
const minDurationSeconds = ref(null);
const artistFilter = ref("");

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
const limitedSongs = computed(() => filteredAndSortedSongs.value.slice(0, songLimit.value));
const limitedAlbums = computed(() => albums.value.slice(0, albumLimit.value));
const limitedArtists = computed(() => artists.value.slice(0, artistLimit.value));

// **Función para buscar en Deezer**
const searchDeezer = async (query) => {
  if (!query.trim()) return;

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
      fetch(songUrl),
      fetch(albumUrl),
      fetch(artistUrl)
    ]);

    if (!songResponse.ok || !albumResponse.ok || !artistResponse.ok) {
      throw new Error("Error al buscar en Deezer");
    }

    const songData = await songResponse.json();
    const albumData = await albumResponse.json();
    const artistData = await artistResponse.json();

    cache.set(query, { songs: songData.data, albums: albumData.data, artists: artistData.data });

    songs.value = songData.data || [];
    albums.value = albumData.data || [];
    artists.value = artistData.data || [];

  } catch (error) {
    console.error("Error en la búsqueda:", error.message);
  }
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
const loadMoreSongs = () => { songLimit.value += 5; };
const loadMoreAlbums = () => { albumLimit.value += 5; };
const loadMoreArtists = () => { artistLimit.value += 5; };

</script>

<style scoped>
h1, h2, p, .filters {
  color: white;
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
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
