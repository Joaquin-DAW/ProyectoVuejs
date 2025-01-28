<template>
    <div>
      <h1>PlaylistManager</h1>
      <ul>
        <li v-for="song in favorites" :key="song.id">
          <PlaylistItem :song="song"></PlaylistItem>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useFavoritesStore } from '@/stores/favorites';
  import PlaylistItem from './PlaylistItem.vue';
  
  const favoritesStore = useFavoritesStore();
  const favorites = favoritesStore.favorites;
  </script>
  
  <style scoped>
  li:hover {
    background-color: none;
  }
  </style>