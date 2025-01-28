import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [], // Lista de canciones favoritas
  }),
  getters: {
    // Devuelve true si la canción ya está en favoritos
    isFavorite: (state) => (id) => {
      return state.favorites.some((song) => song.id === id);
    },
  },
  actions: {
    // Añade una canción a favoritos
    addSong(song) {
      if (!this.isFavorite(song.id)) {
        this.favorites.push(song);
      }
    },
    // Elimina una canción de favoritos
    removeSong(songId) {
      this.favorites = this.favorites.filter((song) => song.id !== songId);
    },
  },
});