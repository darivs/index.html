<template>
  <v-hover v-slot:default="{ hover }">
    <v-btn
      class="mx-2"
      :href="medium.url"
      target="_blank"
      :color="medium.color"
      fab
      :min-height="size"
      :min-width="size"
      elevation="12"
      :style="
        `opacity: ${isSpotify ? '0.25' : '1'};
      transform: rotate(${hover ? '30' : '0'}deg);`
      "
    >
      <v-img :max-width="size * 0.5" :src="medium.logo" />
    </v-btn>
  </v-hover>
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
