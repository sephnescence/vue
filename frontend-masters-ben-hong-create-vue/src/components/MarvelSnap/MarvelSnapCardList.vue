<script setup>
import MarvelSnapCard from './MarvelSnapCard.vue'
import { computed, reactive, onMounted } from 'vue'
import { cardList, cardListStoreStatus, loadCardList } from '@/composables/useCardListStore'

onMounted(() => {
  loadCardList()
})

const state = reactive({
  baseVariantOnly: true,
  showBackground1: true,
  showBackground2: true,
  showForeground: true,
  showLogo: true,
  showMask: true,
  selectedCard: null,
  search: ''
})

// So now that I have search, it doesn't appear that computed is debounced after all?
//  Is it just because I'm using the composition api instead of the options api?
const filteredCardData = computed(() => {
  const filteredCards = []

  Object.values(cardList.value).forEach((card) => {
    if (state.selectedCard !== null) {
      if (card.name !== state.selectedCard) {
        return
      }
    }

    if (state.search !== '' && !card.name.toLowerCase().includes(state.search.toLowerCase())) {
      return
    }

    const newCard = {
      name: card.name,
      logo: card.logo,
      variants: []
    }

    Object.values(card.variants).forEach((variant) => {
      if (state.baseVariantOnly && variant.name !== card.name) {
        return
      }

      newCard.variants.push(variant)
    })

    filteredCards.push(newCard)
  })

  return filteredCards
})

const toggleShowBackground1 = () => {
  state.showBackground1 = !state.showBackground1
}

const toggleShowBackground2 = () => {
  state.showBackground2 = !state.showBackground2
}

const toggleShowForeground = () => {
  state.showForeground = !state.showForeground
}

const toggleShowLogo = () => {
  state.showLogo = !state.showLogo
}

const toggleShowMask = () => {
  state.showMask = !state.showMask
}

const toggleBaseCardOnly = () => {
  state.baseVariantOnly = !state.baseVariantOnly
}

const resetSelectedCard = () => {
  state.selectedCard = null
}

const handleCardSelectedEmission = (newSelectedCard) => {
  selectCard(newSelectedCard)
}

const selectCard = (newSelectedCard) => {
  state.selectedCard = newSelectedCard
}
</script>

<template>
  <div id="app">
    <h2 v-if="cardListStoreStatus === 'error'">Failed to load decks & cards</h2>
    <h2 v-if="cardListStoreStatus !== 'complete'">Loading decks & cards</h2>
    <template v-else>
      <input v-model="state.search" type="search" />
      <br />
      <h2>{{ state.search }}</h2>
      <br />
      <button v-if="!state.baseVariantOnly" @click="toggleBaseCardOnly">
        Show Base Cards Only
      </button>
      <button v-if="state.baseVariantOnly" @click="toggleBaseCardOnly">Show all Variants</button>
      <br />
      <button v-if="!state.showBackground1" @click="toggleShowBackground1">
        Show Background 1
      </button>
      <button v-if="state.showBackground1" @click="toggleShowBackground1">Hide Background 1</button>
      <br />
      <button v-if="!state.showBackground2" @click="toggleShowBackground2">
        Show Background 2
      </button>
      <button v-if="state.showBackground2" @click="toggleShowBackground2">Hide Background 2</button>
      <br />
      <button v-if="!state.showForeground" @click="toggleShowForeground">Show Foreground</button>
      <button v-if="state.showForeground" @click="toggleShowForeground">Hide Foreground</button>
      <br />
      <button v-if="!state.showLogo" @click="toggleShowLogo">Show Logo</button>
      <button v-if="state.showLogo" @click="toggleShowLogo">Hide Logo</button>
      <br />
      <button v-if="!state.showMask" @click="toggleShowMask">Show Mask</button>
      <button v-if="state.showMask" @click="toggleShowMask">Hide Mask</button>
      <br />
      <template v-if="state.selectedCard !== null">
        <button @click="resetSelectedCard">Reset Selected Card</button>
        <br />
      </template>
      <template v-for="card in filteredCardData" :key="card.name">
        <MarvelSnapCard
          v-for="variant in card.variants"
          v-on:card-selected="handleCardSelectedEmission"
          :key="card.name + '|' + variant.name"
          :card="card"
          :variant="variant"
          :showBackground1="state.showBackground1"
          :showBackground2="state.showBackground2"
          :showForeground="state.showForeground"
          :showLogo="state.showLogo"
          :showMask="state.showMask"
        />
      </template>
    </template>
  </div>
</template>

<style>
h2 {
  color: white;
}
</style>
