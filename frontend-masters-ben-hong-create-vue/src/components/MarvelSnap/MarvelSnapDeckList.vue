<script setup>
import MarvelSnapCard from './MarvelSnapCard.vue'
import decks from './data/decklist.json'
import { computed, onMounted } from 'vue'
import { cardList, cardListStoreStatus, loadCardList } from '@/composables/useCardListStore'

onMounted(() => {
  loadCardList()
})

const computedDecks = computed(() => {
  if (cardListStoreStatus.value !== 'complete') {
    return []
  }

  const newDecks = []

  decks.forEach((deck) => {
    const newDeck = {
      id: deck.id,
      name: deck.name,
      cards: []
    }

    deck.cards.forEach((deckCard) => {
      if (cardList.value[deckCard.cardName]) {
        const card = { ...cardList.value[deckCard.cardName] } // This is apparently the fastest way to clone an object
        if (card.variants[deckCard.variantName]) {
          const variant = { ...card.variants[deckCard.variantName] } // This is apparently the fastest way to clone an object
          if (variant) {
            card.variants = [variant]
            newDeck.cards.push(card)
            return
          }
        }
      }

      const cardBackup = { ...cardList.value['Ghost'] }
      cardBackup.variants = [{ ...cardBackup.variants['Ghost'] }]
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
    <h2 v-if="cardListStoreStatus === 'error'">Failed to load decks & cards</h2>
    <h2 v-if="cardListStoreStatus !== 'complete'">Loading decks & cards</h2>
    <div v-else class="decks">
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
h2,
h3 {
  color: white;
}
</style>
