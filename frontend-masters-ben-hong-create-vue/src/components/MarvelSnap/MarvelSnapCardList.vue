<script>
import cardData from './data/marvelSnapCardData.json' // BTTODO - Fetch via api instead
// Anything commented hasn't been covered in the course, or I've not played with just yet
export default {
  data() {
    return {
      cardData
    }
  },
  methods: {},
  emits: [],
  props: {},
  // components: {},
  computed: {},
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
    <template v-for="card in cardData" :key="card.name">
      <div class="generated-card" v-for="variant in card.variants" :key="variant.name">
        <div class="generated-card-inner">
          <div
            class="generated-card-background-one"
            v-if="variant.downloads.backgrounds[0]"
            :style="{ backgroundImage: 'url(' + variant.downloads.backgrounds[0] + ')' }"
          >
            <div
              class="generated-card-background-two"
              v-if="variant.downloads.backgrounds[1]"
              :style="{ backgroundImage: 'url(' + variant.downloads.backgrounds[1] + ')' }"
            ></div>
          </div>
          <div
            class="generated-card-foreground"
            :style="{ backgroundImage: 'url(' + variant.downloads.foregrounds[0] + ')' }"
          >
            <div
              class="generated-card-logo"
              :style="{ backgroundImage: 'url(' + card.logo + ')' }"
            ></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
body {
  background-color: #2c0b47;
}

div.generated-card {
  display: inline-block;
  width: 201px;
  height: 201px;
}

div.generated-card > div.generated-card-inner {
  position: relative;
}

div.generated-card > div.generated-card-inner > div.generated-card-background-one {
  position: absolute;
  left: 26px;
  width: 148px;
  height: 201px;
  background-repeat: no-repeat;
  background-size: 201px 201px;
  background-position: center center;
  mask-image: url('http://[::1]:4002/resources/images/cardmask.webp'); /* BTTODO - Get from the api */
  -webkit-mask-image: url('http://[::1]:4002/resources/images/cardmask.webp'); /* BTTODO - Get from the api */
  mask-size: 148px 201px;
  -webkit-mask-size: 148px 201px;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

div.generated-card
  > div.generated-card-inner
  > div.generated-card-background-one
  > div.generated-card-background-two {
  width: 148px;
  height: 201px;
  background-repeat: no-repeat;
  background-size: 201px 201px;
  background-position: center center;
}

div.generated-card > div.generated-card-inner > div.generated-card-foreground {
  position: absolute;
  width: 201px;
  height: 201px;
  background-repeat: no-repeat;
  background-size: 230px 230px;
  background-position: center center;
}

div.generated-card
  > div.generated-card-inner
  > div.generated-card-foreground
  > div.generated-card-logo {
  margin-top: 120px;
  width: 201px;
  height: 102px;
  background-repeat: no-repeat;
  background-size: 201px 102px;
}
</style>
