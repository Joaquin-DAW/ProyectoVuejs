<template>
  <div class="search-container">
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="searchDeezer"
        placeholder="Buscar en Deezer"
      />
      <button @click="searchDeezer">
        <i class="bi bi-search"></i> <!-- Ícono de búsqueda de Bootstrap -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref(""); // Estado reactivo para la barra de búsqueda
const cache = new Map(); // Cache para almacenar resultados de búsquedas
const router = useRouter();

// Define la función para emitir eventos
const emit = defineEmits(["results"]);

// Función para realizar la búsqueda
const searchDeezer = async () => {
  if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías
  if (cache.has(searchQuery.value)) {
    emit("results", cache.get(searchQuery.value)); // Usa el cache si existe
    return;
  }
  const url = `http://localhost:8080/https://api.deezer.com/search?q=${searchQuery.value}`;
  /*const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURIComponent(
    searchQuery.value
  )}`;*/
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al buscar en Deezer");
    }
    const data = await response.json();
    console.log("Resultados de la búsqueda:", data.data); // Añadir este log
    emit("results", data.data); // Emitimos los resultados al componente padre
  } catch (error) {
    console.error(error.message);
  }
};

// Función para emitir el evento de búsqueda y redirigir a SearchView
const emitSearch = () => {
  if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías
  router.push({ name: 'Buscador', query: { q: searchQuery.value } });
};

</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.search-input {
  width: 90%;
  max-width: 75%;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: #fff;
  padding: 0;
}
.search-input input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 25px 0 0 25px;
}
.search-input button {
  border: none;
  background-color: transparent;
  padding: 0 10px;
  cursor: pointer;
  color: #777;
  font-size: 20px;
}
.search-input button:hover {
  color: #000;
}
</style>

