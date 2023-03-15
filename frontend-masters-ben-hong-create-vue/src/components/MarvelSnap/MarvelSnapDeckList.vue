<script setup>
import MarvelSnapCard from './MarvelSnapCard.vue'
import decks from './data/decklist.json' // BTTODO - Should fetch from an api, but will need to organise logging in / user accounts
import { computed, onMounted } from 'vue';

// BTTODO - I'm not sure if there's a react-query equivalent to use in vue
const response = await fetch('http://localhost/api/snap_fan_cards/all')
const cardData = await response.json()

// BTTODO - Figure out how to abandon the ajax call if the component is unmounted. Suspense seems to interfere
const mounted = onMounted(() => {
  console.log('Mounted!')
});

const computedDecks = computed(() => {
  const newDecks = []

  decks.forEach((deck) => {
    const newDeck = {
      id: deck.id,
      name: deck.name,
      cards: []
    }

    deck.cards.forEach((deckCard) => {
      const card = cardData[deckCard.cardName]

      if (card) {
        const variant = card.variants[deckCard.variantName]
        if (variant) {
          card.variants = [variant]
          newDeck.cards.push(card)
          return
        }
      }

      // BTTODO - Should add a better backup. Ideally make a junk card that's just a silhouette
      const cardBackup = cardData['Ghost']
      cardBackup.variants = [cardBackup.variants['Ghost']]
      newDeck.cards.push(cardBackup)
    })

    newDecks.push(newDeck)
  })

  return newDecks
})
</script>

<template>
  <div id="app">
    <h2>Marvel Snap Decks</h2>
    <div class="decks">
      <div class="deck" v-for="deck in computedDecks" :key="deck.id">
        <h3>{{ deck.name }}</h3>
        <template v-for="card in deck.cards" :key="card.name">
          <MarvelSnapCard
            v-for="variant in card.variants"
            :key="card.name + '|' + variant.name"
            :card="card"
            :variant="variant"
            :showBackground1="true"
            :showBackground2="true"
            :showForeground="true"
            :showLogo="true"
            :showMask="true"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style>
h2, h3 {
  color: white;
}
</style>
