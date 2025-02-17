<script setup>
import { ref, onMounted  } from "vue";
import { RouterView } from "vue-router";
import Menu from "./components/menu.vue";
import MusicPlayer from "./components/MusicPlayer.vue"; // Importar el reproductor
import WelcomeModal from "./components/WelcomeModal.vue";

const currentSong = ref(null); // Estado para la canción actual
const user = ref(null); // Estado para el usuario actual

// **Función para reproducir una canción desde cualquier vista**
const playSong = (song) => {
  currentSong.value = song;
};

// **Función para manejar la siguiente canción (pendiente de implementar)**
const nextSong = () => {
  console.log("Aquí puedes implementar la lógica para la siguiente canción");
};

const handleUserRegistered = (newUser) => {
  user.value = newUser;
};

onMounted(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});
</script>

<template>
  <div id="app">
    <!-- Modal de bienvenida (Solo si el usuario no está registrado) -->
    <WelcomeModal v-if="!user" @userRegistered="handleUserRegistered" />

    <!-- Contenido principal de la app (Se muestra solo si el usuario está registrado) -->
    <template v-if="user">
      <!-- Header -->
      <header class="bg-primary text-white py-3">
        <div class="container d-flex align-items-center">
          <div class="d-flex align-items-center">
            <img src="https://img.icons8.com/ios-filled/50/000000/musical-notes.png" alt="Logo" class="me-2" width="40" height="40">
            <h1 class="mb-0">Deezer</h1>
          </div>
          <Menu class="ms-auto" />
        </div>
      </header>

      <!-- Main Content -->
      <main class="container my-4">
        <router-view @play="playSong" />
      </main>

      <!-- Reproductor de música -->
      <MusicPlayer v-if="currentSong" :currentSong="currentSong" @next="nextSong" />

      <!-- Footer -->
      <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Deezer. Todos los derechos reservados.</p>
      </footer>
    </template>
  </div>
</template>

<style lang="scss">
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e1e2f, #63a0d8)
}

main {
  flex: 1;
}

nav {
  border: 1px solid gray;
}

$hover-bg-color: #007bff;
$hover-text-color: #ffffff;

li {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: $hover-bg-color;
    color: $hover-text-color;
    font-weight: bold;
  }
}
</style>
