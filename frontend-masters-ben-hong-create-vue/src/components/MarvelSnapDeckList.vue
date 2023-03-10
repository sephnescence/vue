<script>
export default {
  data: () => ({
    addNewAvailableCardText: '',
    availableCards: [],
    collectedCards: []
  }),
  methods: {
    addAvailableCardToCollectedCard(cardName) {
      this.collectedCards.push(cardName)
    },
    addNewAvailableCard() {
      this.availableCards.push(this.addNewAvailableCardText)
      this.addNewAvailableCardText = ''
    }
  }
}
</script>

<template>
  <h1>Event Handing Exercise!</h1>
  <div style="display: inline; float: left; width: 40%">
    <div id="app">
      <h4>
        Add new available card! (You can click the button or hit Return. Hitting return also doesn't
        lose focus. Nice)
      </h4>
      <input type="text" v-model="addNewAvailableCardText" @keyup.enter="addNewAvailableCard" />
      <button @click="addNewAvailableCard">Add</button>
      <hr />
      <h4>Available Cards</h4>
      <ul>
        <li v-for="card in availableCards" :key="card">
          {{ card }}
          <button
            v-if="collectedCards.indexOf(card) === -1"
            @click="addAvailableCardToCollectedCard(card)"
          >
            Add to collected cards
          </button>
        </li>
      </ul>
      <hr />
      <h4>Collected Cards</h4>
      <ul>
        <li v-for="card in collectedCards" :key="card">
          {{ card }}
        </li>
      </ul>
    </div>
  </div>
</template>
