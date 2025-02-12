<template>
  <div class="search-container">
    <div class="search-input">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="emitSearch"
        placeholder="Buscar en Deezer"
      />
      <button @click="emitSearch">
        <i class="bi bi-search"></i> <!-- Ícono de búsqueda de Bootstrap -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref(""); // Estado reactivo para la barra de búsqueda
const router = useRouter();

// Define la función para emitir eventos
const emit = defineEmits(["search"]);

// Función para emitir el evento de búsqueda y redirigir a SearchView
const emitSearch = () => {
  if (searchQuery.value.trim() === "") return; // Evita búsquedas vacías
  emit("search", searchQuery.value); // Emitir el término de búsqueda
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

