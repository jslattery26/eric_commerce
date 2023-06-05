<template>
  <div>
    <DesktopNav />
    <v-container v-if="product">
      <v-row justify="center">
        <v-col cols="11" md="7">
          <h2 class="text-center text-md-h4 font-weight-bold">
            {{ product.name }}
          </h2>
          <div class="mt-2 text-center">
            <!-- <v-rating
              readonly
              half-increments
              class="mb-2"
              color="yellow darken-2"
              background-color="grey lighten-1"
              :value="product.ratings"
              dense
              size="20"
            ></v-rating> -->
            <v-chip
              small
              label
              outlined
              class="mr-1"
              v-for="(t, i) in product.categories.map((c) => c.name)"
              :key="`prod${product.id}-${i}`"
              @click="$router.push('/')"
            >
              {{ t }}
            </v-chip>
          </div>

          <br />
          <v-img
            width="100%"
            class="el rounded-lg"
            height="50vh"
            :src="product.image.url"
          ></v-img>
          <h4 class="mt-5 mb-7">{{ productDescription }}</h4>
          <h3 class="">Previews</h3>
          <v-divider class="mb-7" />
          <div v-for="(u, i) in productPreviews">
            <h5 class="mb-2 ml-2">{{ productPreviews[i].split("/")[5] }}</h5>
            <AudioPlayer
              style="width: 100%"
              class="mb-7"
              :file="productPreviews[i]"
            ></AudioPlayer>
          </div>
          <v-card>
            <h3 class="text-center primary--text pa-3">
              {{ product.price.formatted_with_symbol }}
            </h3>
            <v-row justify="center" class="pa-3">
              <v-btn
                @click="addToCart(product)"
                min-height="45"
                min-width="170"
                class="text-capitalize"
                color="primary"
                rounded
                >Add To Cart</v-btn
              >
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import AudioPlayer from "~/components/AudioPlayer/AudioPlayer.vue";

export default {
  async asyncData({ route, $commerce }) {
    const permalink = route.params.id;
    const product = await $commerce.products.retrieve(permalink, {
      type: "permalink",
    });
    return {
      product,
    };
  },
  computed: {
    productDescription() {
      return this.product.description
        .replace(/<\/?[^>]+>/gi, " ")
        .replace(
          /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%.&\/~+#-])/gi,
          ""
        );
    },
    productPreviews() {
      var urls = this.product.description.match(
        /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%.&\/~+#-])/gi
      );
      return urls;
    },
  },
  methods: {
    addToCart(product) {
      this.$commerce.cart.add(product.id);
      this.$swal({
        toast: true,
        text: "Added To Cart",
        icon: "success",
        timer: 1000,
        timerProgressBar: false,
        showConfirmButton: false,
        position: "top-end",
      });
    },
  },
  // async created() {
  //   let d = await this.$content("products")
  //     .where({ id: parseInt(this.$route.params.id) })
  //     .limit(1)
  //     .fetch();
  //   this.product = d[0];
  // },
  data() {
    return {
      product: null,
    };
  },
  components: { AudioPlayer },
};
</script>

<style></style>
