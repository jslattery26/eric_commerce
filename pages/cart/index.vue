<template>
  <div>
    <DesktopNav />
    <br />
    <div class="text-center" v-if="cart.total_items == 0">
      <v-img class="d-block mx-auto" src="/emptycart.svg" width="500"></v-img>
      <p>No Items Just Yet</p>
    </div>

    <v-container>
      <div class="mb-3" v-if="cart.total_items > 0">
        <v-btn
          nuxt
          rounded
          :href="cart.hosted_checkout_url"
          target="_blank"
          min-width="150"
          min-height="45"
          color="primary"
          >Checkout</v-btn
        >
      </div>
      <v-row>
        <template v-for="(c, i) in cart.line_items">
          <v-col :key="`cartItem${i}`">
            <v-card color="surface" flat>
              <v-btn @click="removeItem(c)" absolute top right icon>
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>

              <v-row dense>
                <v-col md="3">
                  <v-img
                    class="rounded-lg"
                    height="220"
                    :src="c.image.url"
                  ></v-img>
                </v-col>
                <v-col class="pl-5 pt-2" md="9">
                  <v-row class="pt-2">
                    <h2 class="text-md-h6 font-weight-bold pr-2">
                      {{ c.name }}
                    </h2>
                    <v-chip>
                      <h4 class="font-weight-bold">x {{ c.quantity }}</h4>
                    </v-chip>
                  </v-row>

                  <p class="primary--text mt-2">
                    {{ $formatMoney(c.price.raw * c.quantity) }}
                  </p>
                  <v-btn @click="increaseCount(c)" icon :disabled="disable">
                    <v-icon size="20">mdi-plus-circle</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ c.quantity }}</span>
                  <v-btn @click="decreaseCount(c)" icon :disabled="disable">
                    <v-icon size="20">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
export default {
  async asyncData({ $commerce }) {
    const cart = await $commerce.cart.retrieve();
    return {
      cart,
    };
  },
  data() {
    return {
      disable: false,
    };
  },
  methods: {
    goToCheckout(hostedUrl) {
      this.$router.push({
        beforeEnter() {},
      });
    },
    async increaseCount(c) {
      this.disable = true;
      c.quantity = c.quantity + 1;
      const newCart = await this.$commerce.cart.update(c.id, {
        quantity: c.quantity,
      });
      this.disable = false;
      this.cart = newCart;
      console.log(`actual cart has ${this.cart.total_items}`);
    },
    async decreaseCount(c) {
      this.disable = true;
      c.quantity = c.quantity - 1;
      const newCart = await this.$commerce.cart.update(c.id, {
        quantity: c.quantity,
      });
      this.disable = false;
      this.cart = newCart;
      console.log(`actual cart has ${this.cart.total_items}`);
    },
    async removeItem(c) {
      this.disable = true;
      const newCart = await this.$commerce.cart.update(c.id, {
        quantity: 0,
      });
      this.disable = false;
      this.cart = newCart;
      console.log(`actual cart has ${this.cart.total_items}`);
    },
  },
};
</script>

<style></style>
