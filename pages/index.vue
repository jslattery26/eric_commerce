<template>
  <div id="container">
    <!-- <DesktopNav /> -->
    <!-- <HomeCarousel :sale_items="sale_items" /> -->

    <v-img id="background" src="/smoker.png" />
    <v-img id="overlayImage" v-if="active" src="/overlay.png" />

    <div
      id="overlay"
      @mouseover="mouseOver()"
      @mouseleave="active = false"
      @click="$router.push(`/home`)"
    ></div>
    <!-- <br /><br />
    <v-container>
      <h1 class="text-md-h4 text-h6">Check these out 🔥</h1>
      <br />
      <ProductSlider :products="products" />
      <br /><br /><br />
      <Newsletter />
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop /> -->
  </div>
</template>

<script>
export default {
  async created() {
    this.sale_items = await this.$content("products")
      .where({ onSale: true })
      .fetch();
    this.products = await this.$content("products").fetch();
  },
  methods: {
    mouseOver() {
      this.active = true;
      var audio = new Audio("/quack.mov ");
      audio.play();
    },
  },
  data() {
    return {
      active: false,
      products: null,
      sale_items: null,
    };
  },
};
</script>

<style>
#background {
  position: relative;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
}
#overlayImage {
  position: absolute;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#overlay {
  position: fixed;
  height: 50%;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
