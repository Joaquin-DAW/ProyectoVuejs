<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Bienvenido a Deezer Client</h2>
      <p>Introduce tu nombre y elige un avatar para empezar.</p>

      <!-- Campo para el nombre -->
      <input v-model="userName" type="text" placeholder="Tu nombre" class="input-field" />

      <!-- Selección de avatar -->
      <div class="avatar-selection">
        <img
          v-for="avatar in avatars"
          :key="avatar"
          :src="avatar"
          :class="{ selected: userAvatar === avatar }"
          @click="userAvatar = avatar"
          class="avatar"
        />
      </div>

      <button @click="saveUser" class="save-btn">Guardar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["userRegistered"]);
const showModal = ref(true);
const userName = ref("");
const userAvatar = ref("");
const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4"
];

const saveUser = () => {
  if (!userName.value || !userAvatar.value) return alert("Elige un nombre y un avatar");

  const user = {
    name: userName.value,
    avatar: userAvatar.value
  };

  localStorage.setItem("user", JSON.stringify(user));
  emit("userRegistered", user);
  showModal.value = false;
};
</script>

<style scoped>
/* Fondo oscuro con efecto de desenfoque */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* Efecto de desenfoque */
}

/* Modal con ancho reducido */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 400px; /* Reducido a 400px */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Input estilizado */
.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
}

/* Sección de selección de avatar */
.avatar-selection {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

/* Avatares con bordes redondeados */
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s ease-in-out, border 0.3s;
}

.avatar:hover {
  transform: scale(1.1);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: black; /* Asegurar que el texto se vea negro */
}

.avatar.selected {
  border: 2px solid #1db954; /* Verde de Spotify/Deezer */
}

/* Botón estilizado */
.save-btn {
  background-color: #1db954;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.save-btn:hover {
  background-color: #17a84a;
}
</style>
