<script setup>
import Nav from './Nav.vue'
</script>

<!-- This file must be called HomePage, it seems -->
<template>
  <Nav />
  <h2 :class="$style.homeH1">This is just a landing page to test routing in navigation</h2>
</template>

<style module>
.homeH1 {
  color: white;
}
</style>
