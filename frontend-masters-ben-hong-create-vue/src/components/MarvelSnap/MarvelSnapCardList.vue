<script>
import MarvelSnapCard from './MarvelSnapCard.vue'
import cardData from './data/marvelSnapCardData.json' // BTTODO - Fetch via api instead
// import cardData from './data/marvelSnapCardDataAero.json' // BTTODO - Fetch via api instead
// Anything commented hasn't been covered in the course, or I've not played with just yet

const baseVariantOnly = true
const selectedCard = null

export default {
  data() {
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
  props: {
    // baseVariantOnly: {
    //   type: Boolean,
    //   default: true
    // }
  },
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
  watch: {}
  // setup() {
  //   return {}
  // },
  // activated() {},
  // beforeCreate() {},
  // afterCreate() {},
  // beforeMount() {},
  // mounted() {},
  // beforeUpdate() {},
  // updated() {},
  // beforeDestroy() {},
  // destroyed() {},
  // errorCaptured() {},
  // beforeUnmount() {},
  // unmounted() {},
  // render() {},
  // renderTracked() {},
  // renderTriggered() {},
  // serverPrefetch() {},
}
</script>

<template>
  <div id="app">
    <template v-if="this.selectedCard === null">
      <button v-if="!this.baseVariantOnly" @click="toggleBaseCardOnly">Show Base Cards Only</button>
      <button v-if="this.baseVariantOnly" @click="toggleBaseCardOnly">Show all Variants</button>
      <br />
    </template>
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

<style>
body {
  background-color: #2c0b47;
}
</style>
