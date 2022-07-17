<template>
  <v-row justify="center" align="center ">
    <v-col cols="12" sm="8" md="6" lg="12">
      <v-card class="pa-5 mt-5 mr-10 ml-10" light>
        <v-card-title class="headline"> Ubah Produk </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="products.name"
                  label="Nama Produk"
                  placeholder="For example, Dana/Pulsa"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  ref="product_type"
                  v-model="products.product_type_id"
                  item-value="id"
                  item-text="name"
                  :rules="[() => !!product_types || 'This field is required']"
                  :items="product_types"
                  label="Tipe Produk"
                  placeholder="Select..."
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  ref="operator"
                  v-model="products.operator_id"
                  item-value="id"
                  item-text="name"
                  :rules="[() => !!operators || 'This field is required']"
                  :items="operators"
                  label="Pilih Operator"
                  placeholder="Select..."
                  outlined
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model.number="products.price"
                  label="Harga Jual"
                  value="Masukkan Harga Jual"
                  placeholder="For example, 51000"
                  type="number"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model.number="products.qty"
                  label="Stok"
                  value="Masukkan Jumlah Stok"
                  placeholder="For example, 10"
                  type="number"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- <v-row align="center" justify="space-around" class="mb-5">
              <v-btn color="primary"> Simpan </v-btn>
            </v-row> -->

            <v-row justify="center">
              <v-btn color="primary" dark @click="submit"> Simpan </v-btn>
              <v-btn
                id="closeDeleteBtn"
                color="blue darken-1"
                text
                :to="{ name: 'produk' }"
                >Cancel</v-btn
              >

              <!-- <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="text-h5"> Selamat </v-card-title>

                  <v-card-text> Anda berhasil Menambahkan Produk! </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="green darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Cookies from 'js-cookie'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'IndexPage',
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch('product/getData', params.id)])
  },
  data() {
    return {
      // product: [
      //   {
      //     name: '',
      //     product_type_id: '',
      //     operator_id: '',
      //     price: '',
      //     qty: '',
      //   },
      // ],
      product_types: [],
      operators: [],
    }
  },
  computed: {
    ...mapState('product', {
      product: (state) => state.data,
    }),
  },
  created() {
    this.products = {
      name: this.product.name,
      product_type_id: this.product.product_type_id,
      operator_id: this.product.operator_id,
      price: this.product.price,
      qty: this.product.qty,
    }
  },
  mounted() {
    this.$axios.get('/operators').then((response) => {
      this.operators = response.data.operators
      // console.log(response)
    })
    this.$axios.get('/product_types').then((response) => {
      this.product_types = response.data.product_types
      //   console.log(response.data.product_types)
    })
    // this.$axios.get('/products').then((response) => {
    //   this.products = response.data.products
    //   console.log(response.data.products)
    // })
    try {
      if (Cookies.get('t')) {
        // this.$router.push('/produk')
      } else {
        this.$router.push('/login')
      }
    } catch {
      //   this.$router.push('/produk')
    }
  },
  methods: {
    ...mapActions('product', ['updateProductsData']),
    submit() {
      const data = Object.assign({ id: this.$route.params.id }, this.products)
      this.updateProductsData(data).then(this.$router.push({ name: 'produk' }))
    },
  },
}
</script>
