<script>
import MarvelSnapCard from './MarvelSnapCard.vue'
import { ref } from 'vue'

export default {
  async setup() {
    const response = await fetch('http://localhost/api/snap_fan_cards/all')
    const cardData = await response.json()

    // Because these are reactive, you need to define them with ref() so that Vue will track them.
    //  So I no longer need to define them as consts above or have the data() method in use
    const baseVariantOnly = ref(true)
    const selectedCard = ref(null)

    return {
      cardData,
      baseVariantOnly,
      selectedCard
    }
  },
  methods: {
    toggleBaseCardOnly() {
      this.baseVariantOnly = !this.baseVariantOnly
    },
    resetSelectedCard() {
      this.selectedCard = null
    },
    handleCardSelectedEmission(selectedCard) {
      this.selectCard(selectedCard)
    },
    selectCard(selectedCard) {
      this.selectedCard = selectedCard
    }
  },
  emits: [],
  components: {
    MarvelSnapCard
  },
  computed: {
    filteredCardData() {
      const filteredCards = []

      Object.values(this.cardData).forEach((card) => {
        if (this.selectedCard !== null) {
          if (card.name !== this.selectedCard) {
            return
          }
        }

        const newCard = {
          name: card.name,
          logo: card.logo,
          variants: []
        }

        Object.values(card.variants).forEach((variant) => {
          if (this.baseVariantOnly && variant.name !== card.name) {
            return
          }

          newCard.variants.push(variant)
        })

        filteredCards.push(newCard)
      })

      return filteredCards
    }
  },
}
</script>

<template>
  <div id="app">
    <button v-if="!this.baseVariantOnly" @click="toggleBaseCardOnly">Show Base Cards Only</button>
    <button v-if="this.baseVariantOnly" @click="toggleBaseCardOnly">Show all Variants</button>
    <br />
    <template v-if="this.selectedCard !== null">
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
      />
    </template>
  </div>
</template>
