<script setup>
import MarvelSnapCard from './MarvelSnapCard.vue'
import decks from './data/decklist.json' // BTTODO - Should fetch from an api, but will need to organise logging in / user accounts
import { computed, onMounted } from 'vue';
import {
  cardList,
  loadCardList
} from '@/composables/useCardListStore';

onMounted(() => {
  loadCardList()
})

// BTTODO - You cannot just load the site on the / and /decks routes. Only /cards works interestingly enough
// BTTODO - You can only load the /decks page once

const computedDecks = computed(() => {
  const newDecks = []

  decks.forEach((deck) => {
    const newDeck = {
      id: deck.id,
      name: deck.name,
      cards: []
    }

    deck.cards.forEach((deckCard) => {
      const card = cardList.value[deckCard.cardName]

      if (card) {
        const variant = card.variants[deckCard.variantName]
        if (variant) {
          card.variants = [variant]
          newDeck.cards.push(card)
          return
        }
      }

      // BTTODO - Should add a better backup. Ideally make a junk card that's just a silhouette
      const cardBackup = cardList.value['Ghost']
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
