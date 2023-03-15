<script setup>
import Nav from '../App/Nav.vue';
import MarvelSnapDeckList from './MarvelSnapDeckList.vue'
</script>

<template>
  <Nav />
  <div id="app" class="marvel-snap-deck-list">
    <Suspense>
      <MarvelSnapDeckList />

      <template #fallback>
        <div>Loading Cards & Decks...</div>
      </template>
    </Suspense>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #2c0b47;
}
.marvel-snap-deck-list {
  padding: 8px;
  color: white;
}
</style>
