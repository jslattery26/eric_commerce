<template>
  <div>
    <DesktopNav />
    <HomeCarousel :products="$products" />
    <br /><br />
    <v-container>
      <h1 class="text-md-h4 text-h6">Check these out 🔥</h1>
      <br />
      <ProductSlider :products="$products" />
      <br /><br /><br />
      <Newsletter />
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $commerce }) {
    const { data: products } = await $commerce.products.list();
    const { data: categories } = await $commerce.categories.list();
    const cart = await $commerce.cart.retrieve();

    console.log(products);
    return {
      products,
      categories,
      cart,
    };
  },
  // data() {
  //   return {
  //     products: null,
  //     sale_items: null,
  //   };
  // },
};
</script>

<style></style>
