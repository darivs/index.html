<template>
  <v-btn
    :href="medium.url"
    target="_blank"
    :color="medium.color"
    large
    fab
    :min-height="`${size}px`"
    :min-width="`${size}px`"
    elevation="12"
    :style="`opacity: ${isSpotify ? '0.25' : '1'};`"
  >
    <v-img :max-width="`${size * 0.55}px`" :src="medium.logo" />
  </v-btn>
</template>

<script>
export default {
  name: "SocialButtonRound",
  props: {
    medium: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: () => 128
    }
  },
  computed: {
    isSpotify() {
      return this.medium.title === "Spotify"
    }
  }
}
</script>
