<template>
  <div>
    <DesktopNav />
    <v-container>
      <v-row dense>
        <v-col md="3">
          <div style="position: sticky; top: 92px">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              outlined
              v-model="search"
              clearable
              placeholder="Search"
            ></v-text-field>
            <v-list color="transparent" subheader>
              <v-subheader>Categories</v-subheader>
              <v-list-item
                link
                v-for="(c, i) in categories"
                :key="`category${i}`"
                @click="selectCategory(c)"
              >
                <v-list-item-avatar color="secondary">
                  <v-icon size="large" color="primary">
                    {{ c.name == "Samples" ? "mdi-waveform" : "mdi-music" }}
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ c.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col md="9">
          <v-row>
            <template
              v-for="(p, i) in filteredProducts"
              :key="`product${p.id}-${i}`"
            >
              <v-fade-transition>
                <v-col cols="12" md="6">
                  <v-card
                    nuxt
                    :to="`/products/${p.permalink}`"
                    color="surface"
                    class="el ma-2 mb-5 mr-5"
                  >
                    <v-img :src="p.image.url" height="300">
                      <template #placeholder>
                        <v-row
                          class="fill-height"
                          justify="center"
                          align="center"
                        >
                          <v-progress-circular
                            width="2"
                            size="100"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-card-title class="text-md-body-1 font-weight-bold">{{
                      p.name
                    }}</v-card-title>
                    <v-card-subtitle class="primary--text pb-3">
                      {{ p.price.formatted_with_symbol }}
                    </v-card-subtitle>
                    <v-card-text>
                      <v-chip
                        x-small
                        label
                        outlined
                        class="mr-1"
                        v-for="(t, i) in p.tags"
                        :key="`prod${p.id}-${i}`"
                      >
                        {{ t }}
                      </v-chip>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-fade-transition>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>
<script setup>
const { $commerce } = useNuxtApp();
const { data: products } = await $commerce.products.list();
const { data: categories } = await $commerce.categories.list();
const cart = await $commerce.cart.retrieve();
</script>
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
  data() {
    return {
      search: null,
      selectedCategory: null,
    };
  },
  methods: {
    selectCategory(c) {
      this.selectedCategory = c;
    },
  },
  computed: {
    filteredProducts() {
      if (!this.products || (!this.search && !this.selectedCategory))
        return this.products;
      if (this.search != null) {
        this.selectedCategory = null;
      }
      if (this.selectedCategory != null) {
        return this.products.filter((p) => {
          p.categories.filter((c) => {});
          return p.categories.find((c) => c.name == this.selectedCategory.name);
        });
      }
      return this.products.filter((p) => {
        const s = this.search.toLowerCase();
        const n = p.name.toLowerCase();
        const price = p.price.toString();
        const sprice = p.salePrice?.toString() || "";
        // const r = p.ratings.toString();
        return (
          n.includes(s) || price.includes(s) || sprice.includes(s)
          // r.includes(s)
        );
      });
    },
  },
};
</script>

<style></style>
