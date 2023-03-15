<script setup>
import Nav from '../App/Nav.vue';
import MarvelSnapCardList from './MarvelSnapCardList.vue'
</script>

<template>
  <Nav />
  <div id="app" class="marvel-snap-card-list">
    <Suspense>
      <MarvelSnapCardList />

      <template #fallback>
        <div>Loading Cards...</div>
      </template>
    </Suspense>
  </div>
</template>

<style>
.marvel-snap-card-list {
  padding: 8px;
  color: white;
}
</style>
