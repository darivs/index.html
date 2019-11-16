<template>
  <v-hover v-slot:default="{ hover }">
    <v-btn
      class="transition mx-2"
      :href="medium.url"
      target="_blank"
      :color="medium.color"
      large
      fab
      :min-height="`${size}px`"
      :min-width="`${size}px`"
      elevation="12"
      :style="
        `opacity: ${isSpotify ? '0.25' : '1'};
        transform: rotate(${hover ? '30' : '0'}deg);`
      "
    >
      <v-img :max-width="`${size * 0.55}px`" :src="medium.logo" />
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
  data: () => ({
    degrees: 0
  }),
  computed: {
    isSpotify() {
      return this.medium.title === "Spotify"
    }
  },
  methods: {
    hover() {
      this.degrees = this.isSpotify ? 0 : 45
      this.$emit("marge")
    },
    dehover() {
      this.degrees = 0
      this.$emit("unmarge")
    }
  }
}
</script>
