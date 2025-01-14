<template>
    <h1>PlaylistManager</h1>
    <p v-for="song in songs" :key="song.id">
        <PlaylistItem :song="song"></PlaylistItem>
    </p>
</template>

<script>

</script>

<style scoped>
li:hover{
    background-color: none;
}
</style>