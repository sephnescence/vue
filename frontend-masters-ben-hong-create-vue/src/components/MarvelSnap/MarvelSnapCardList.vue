<script>
import MarvelSnapCard from './MarvelSnapCard.vue'

const baseVariantOnly = true
const selectedCard = null

export default {
  async setup() {
    const response = await fetch('http://localhost/api/snap_fan_cards/all')
    const cardData = await response.json()

    // So interestingly, despite Ben saying that we didn't need the data() call if we had setup defined, the baseVariantOnly and selectedCard variables were not honoured
    // const baseVariantOnly = true
    // const selectedCard = null

    return {
      cardData,
      // baseVariantOnly,
      // selectedCard
    }
  },
  data() {
    return {
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
