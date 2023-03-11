<script>
export default {
  data() {
    return {}
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    variant: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitCardSelected() {
      console.log(this.card.name)
      this.$emit('cardSelected', this.card.name)
    }
  },
  emits: ['cardSelected']
}
</script>

<template>
  <div class="generated-card" @click="emitCardSelected">
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

<style>
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
