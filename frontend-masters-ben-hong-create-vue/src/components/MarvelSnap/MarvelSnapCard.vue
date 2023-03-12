<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    card: {
      type: Object,
      required: true
    },
    variant: {
      type: Object,
      required: true
    },
    showBackground1: {
      type: Boolean,
      required: true
    },
    showBackground2: {
      type: Boolean,
      required: true
    },
    showForeground: {
      type: Boolean,
      required: true
    },
    showLogo: {
      type: Boolean,
      required: true
    },
    showMask: {
      type: Boolean,
      required: true
    }
})

const emits = defineEmits([
  'cardSelected',
])

const emitCardSelected = () => {
  emits('cardSelected', props.card.name)
}
</script>

<template>
  <div class="generated-card" @click="emitCardSelected">
    <div class="generated-card-inner">
      <div
        class="generated-card-background-one"
        v-if="variant.downloads.backgrounds[0]"
        :style="{
          backgroundImage: showBackground1 ? 'url(' + variant.downloads.backgrounds[0] + ')' : 'none',
          maskImage: showMask ? 'url(http://[::1]:4002/resources/images/cardmask.webp)' : 'none' // BTTODO - Get from the api
        }"
      >
        <div
          class="generated-card-background-two"
          v-if="variant.downloads.backgrounds[1]"
          :style="{ backgroundImage: showBackground2 ? 'url(' + variant.downloads.backgrounds[1] + ')' : 'none' }"
        ></div>
      </div>
      <div
        class="generated-card-foreground"
        :style="{
          backgroundImage: showForeground ? 'url(' + variant.downloads.foregrounds[0] + ')' : 'none'
        }"
      >
        <div
          v-if="showLogo"
          class="generated-card-logo"
          :style="{ backgroundImage: 'url(' + card.logo + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
div.generated-card {
  display: inline-block;
  /* width: 201px; */ /* What I originally had */
  width: 190px; /* Trialing this */
  height: 201px;

  div.generated-card-inner {
    position: relative;

    div.generated-card-background-one {
      position: absolute;
      left: 26px;
      width: 148px;
      height: 201px;
      background-repeat: no-repeat;
      background-size: 201px 201px;
      background-position: center center;
      mask-size: 148px 201px;
      -webkit-mask-size: 148px 201px;
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;

      div.generated-card-background-two {
        width: 148px;
        height: 201px;
        background-repeat: no-repeat;
        background-size: 201px 201px;
        background-position: center center;
      }
    }

    div.generated-card-foreground {
      position: absolute;
      width: 201px;
      height: 201px;
      background-repeat: no-repeat;
      background-size: 230px 230px;
      background-position: center center;

      div.generated-card-logo {
        margin-top: 120px;
        width: 201px;
        height: 102px;
        background-repeat: no-repeat;
        background-size: 201px 102px;
      }
    }
  }
}
</style>
