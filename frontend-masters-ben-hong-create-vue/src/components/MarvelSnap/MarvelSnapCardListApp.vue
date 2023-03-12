<script>
import MarvelSnapCardList from './MarvelSnapCardList.vue'


export default {
  components: {
    MarvelSnapCardList
  },
}
</script>

<template>
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
body {
  margin: 0;
  background-color: #2c0b47;
}
.marvel-snap-card-list {
  padding: 8px;
  color: white;
}
</style>
