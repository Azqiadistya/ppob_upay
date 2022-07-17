<template>
  <v-container class="pa-0">
    <v-card-title class="headline ml-2 pt-0">
      <strong> Daftar Produk </strong>
    </v-card-title>
    <button class="btn btn-primary float-right btn-sm" @click="getProductsData">
      add new
    </button>
    <v-data-table
      id="tabelProduk"
      :fields="fields"
      :items="products.data"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
// import Cookies from 'js-cookie'
export default {
  name: 'ProduksPage',
  data() {
    return {
      fields: ['name', 'product_type.name', 'operator', 'price', 'qty'],
      items: [],
    }
  },
  computed: {
    ...mapState('product', {
      products: (state) => state.products,
    }),
  },
  methods: {
    ...mapActions('product', ['getProductsData']),
  },
}
</script>
