<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from "./components/menu.vue";
</script>

<template>
  <div id="app">
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
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Deezer. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style lang="scss">

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

main {
  background-color: transparent;
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