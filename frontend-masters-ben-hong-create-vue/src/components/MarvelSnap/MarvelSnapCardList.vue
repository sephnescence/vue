<script>
import MarvelSnapCard from './MarvelSnapCard.vue'
// import cardData from './data/marvelSnapCardData.json' // BTTODO - Fetch via api instead
// import cardData from './data/marvelSnapCardDataAero.json' // BTTODO - Fetch via api instead
// Anything commented hasn't been covered in the course, or I've not played with just yet

const baseVariantOnly = true
const selectedCard = null
const cardData = []

export default {
  data() {
    return {
      cardData,
      baseVariantOnly,
      selectedCard
    }
  },
  methods: {
    async fetchCardData() {
      const response = await fetch('http://localhost/api/snap_fan_cards/all')
      const data = await response.json()

      this.cardData = data
    },
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
  // props: {},
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
  watch: {},
  created() {
    // Co-Pilot made these... I wonder if this is better practice? Surely not
    // this.$root.$on('cardSelected', this.handleCardSelectedEmission)
    // this.$root.$on('resetSelectedCard', this.resetSelectedCard)

    // I just wanted to fetch cards from my api lol
    this.fetchCardData()
  },
  // setup() {
  //   return {}
  // },
  // activated() {
  //   console.log('activated') // No idea when this gets done
  // },
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

<style>
body {
  background-color: #2c0b47;
}
</style>
