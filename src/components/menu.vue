<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand d-none" to="/">🎵 Deezer Client</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto me-4">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/playlists">Playlists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Buscador</router-link>
          </li>
        </ul>

        <!-- Sección de usuario -->
        <div v-if="user" class="d-flex align-items-center">
          <img :src="user.avatar" alt="Avatar" class="rounded-circle me-2" width="40" height="40">
          <span class="me-3 user-name">{{ user.name }}</span>
          <button @click="logout" class="btn btn-danger btn-sm">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Simulación de usuario logueado (esto podría venir de Vuex, Pinia o Firebase)
const user = ref({
  name: "Fermín Trujillo",
  avatar: "https://i.pravatar.cc/40"
})

const logout = () => {
  console.log("Cerrando sesión...")
  user.value = null // Aquí pondrías la lógica real de logout
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
.user-name {
  color: black; /* Cambia el color del nombre del usuario a negro */
}
</style>