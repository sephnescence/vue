<script>
export default {
  data() {
    return {
      count: 10,
      incrementAmount: 2,
      message: 'Hello, it works!',
      listOfNumbers: [1, 2, 3, 4, 5],
      someObject: [
        {
          name: 'Hi',
          id: '594c187d-bba4-4e76-87c2-3f4fa9d8a3ab',
          numbers: [1, 2, 3]
        },
        {
          name: 'Im',
          id: '0168eef9-4e69-4419-a3d9-9e6b83ede388',
          numbers: [1, 2, 3]
        },
        {
          name: 'the',
          id: '6c9e7c49-5b37-4641-a6de-9573eee5ae06',
          numbers: [1, 2, 3]
        },
        {
          name: 'problem',
          id: '7e5e8ab1-1018-47f1-bcaf-9c53939775b8',
          numbers: [1, 2, 3]
        },
        {
          name: 'its',
          id: '351935ac-6c94-4878-a8fe-034be44a8fb3',
          numbers: [1, 2, 3]
        },
        {
          name: 'me',
          id: '37a5f21b-2b53-48ff-b5d5-9633aba1bc2a',
          numbers: [1, 2, 3]
        }
      ]
    }
  },
  methods: {
    // When using the below, you con't even need to define setIncrementAmountOneWayBinding
    // <input type="number" v-model="incrementAmount" /><br />
    setIncrementAmountOneWayBinding(event) {
      // Even though the type of this input is a number, the value is a string
      this.incrementAmount = event.target.value
    },
    increment() {
      // Vue 2
      // this.$data.count++;

      // Vue 3
      this.count++
    }
  }
}
</script>

<template>
  <h1>Hello Frontend Masters!</h1>
  <div id="app">
    <p>Count: {{ count }}</p>
    <!-- Copilot suggested this -->
    <button @click="increment">Increment (Copilot's way)</button>
    <!-- Ben wrong this first though, so I guess both are valid -->
    <button v-on:click="increment">Increment (Ben's way)</button>
    <!-- So it turns out that @ is an alias for v-on -->
    <br />
    <br />
    <h1>One way binding</h1>
    <!-- You do not need to even have v-bind. Just leave the colon character there -->
    <input
      type="number"
      v-bind:value="incrementAmount"
      v-on:input="setIncrementAmountOneWayBinding"
    /><br />
    <br />
    <h1>Two way binding</h1>
    <!-- Syntactical sugar for the above, pretty much -->
    <!-- With the exception that it's known to be a number this time -->
    <!-- Vue 2 -->
    <!-- <input type="number" v-model.number="incrementAmount" /><br /> -->
    <!-- Vue 3 -->
    <input type="number" v-model="incrementAmount" /><br />

    <!-- Ben kept the old code around for some reason 🤷 -->
    <hr />
    <ul>
      <li v-for="number in listOfNumbers" :key="number">{{ number }}</li>
    </ul>
    <h2>To illustrate a more complex each</h2>
    <ul>
      <li v-for="item in someObject" :key="item.id">
        {{ item.name }}
        <ul>
          <li v-for="number in item.numbers" :key="number">{{ number }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
