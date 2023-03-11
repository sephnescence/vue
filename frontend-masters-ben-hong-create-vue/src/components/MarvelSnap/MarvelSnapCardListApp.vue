<script>
import MarvelSnapCardList from './MarvelSnapCardList.vue'


export default {
  components: {
    MarvelSnapCardList
  },
}
</script>

<template>
  <div id="app">
    <Suspense>
      <MarvelSnapCardList class="marvel-snap-card-list" />

      <template #fallback>
        <div>Loading Cards...</div>
      </template>
    </Suspense>
  </div>
</template>

<style>
body {
  margin: 0;
}
.marvel-snap-card-list {
  background-color: #2c0b47;
  padding: 8px;
}
</style>
