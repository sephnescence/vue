<script setup></script>

<template>
  <nav style="$style.nav">
    <router-link to="/"> Home </router-link>
    <router-link to="/cards"> Cards </router-link>
    <router-link to="/decks"> Decks </router-link>
  </nav>
</template>

<style module lang="scss">
nav {
  a {
    display: inline-block;
    padding: 20px 30px;
    color: white;
    text-decoration: none;
    &:hover {
      background-color: lighten(#2c0b47, 30%);
    }
  }
}
</style>