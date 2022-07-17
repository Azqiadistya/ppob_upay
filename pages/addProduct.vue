<template>
  <v-row justify="center" align="center ">
    <v-col cols="12" sm="8" md="6" lg="12">
      <v-card class="pa-5 mt-5 mr-10 ml-10" light>
        <v-card-title class="headline"> Tambah Produk </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  id="namaProduk"
                  v-model="products.name"
                  label="Nama Produk"
                  placeholder="For example, Dana/Pulsa"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-select
                  id="tipeProduct"
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
                  id="operatorProduk"
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
                  id="hargaProduk"
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
                  id="stokProduk"
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
              <v-btn id="submitBtn" color="primary" dark @click="submit">
                Simpan
              </v-btn>
              <v-btn
                id="closeDeleteBtn"
                color="blue darken-1"
                text
                :to="{ name: 'produk' }"
                >Cancel</v-btn
              >

              <v-dialog id="alertAddProduct" v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="text-h5"> Selamat </v-card-title>

                  <v-card-text id="alert">
                    Anda berhasil Menambahkan Produk!
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      id="closeBtn"
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Cookies from 'js-cookie'
// import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      products: [
        {
          name: '',
          product_type_id: 0,
          operator_id: 0,
          price: 0,
          qty: 0,
        },
      ],
      product_types: [],
      operators: [],
      errorMessages: '',
      formHasErrors: false,
      dialog: false,
    }
  },

  mounted() {
    this.$axios.get('/operators').then((response) => {
      this.operators = response.data.operators
      // console.log(response)
    })
    this.$axios.get('/product_types').then((response) => {
      this.product_types = response.data.product_types
      // console.log(response.data.product_types)
    })
    if (Cookies.get('t')) {
      // console.log(Cookies)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    // ...mapActions('product', ['storeProductsData']),
    submit() {
      // this.storeProductsData(this.products).then(() =>
      // this.$router.push('/produk')
      // )
      this.$axios
        .post('/products', {
          name: this.products.name,
          product_type_id: this.products.product_type_id,
          operator_id: this.products.operator_id,
          price: this.products.price,
          qty: this.products.qty,
        })
        .then(function (response) {
          // this.$router.push('/produk')
          // console.log(response)
          alert('Produk Berhasil Ditambah!')
          // redirect(response.data.products)
          this.$router.push('/produk')
        })
        .catch(function () {
          // console.log(error)
        })
    },
  },
}
</script>
