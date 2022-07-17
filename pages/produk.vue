<template>
  <v-container class="pa-0">
    <v-card
      class="ml-5 mr-5 pb-5 pt-0"
      style="background-color: transparent !important"
      light
      flat
    >
      <v-card-title class="headline ml-2 pt-0">
        <strong> Daftar Produk </strong>
      </v-card-title>

      <v-data-table
        id="dataProduk"
        :headers="headers"
        :items="products"
        :search="search"
        sort-by="calories"
        class="pl-5 pr-5"
      >
        <template #top>
          <v-toolbar flat>
            <v-text-field
              id="searchBtnProduct"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              rounded-lg
              dark
              single-line
              hide-details
              style="background-color: #2196f3; max-width: fit-content"
              class="pl-3 pr-3 pb-1 rounded-lg"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog id="addProduct" v-model="dialog" max-width="600px">
              <template #activator="{ on, attrs }">
                <v-btn
                  id="addProductBtn"
                  :to="{ name: 'addProduct' }"
                  style="background-color: #2196f3"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Tambah Produk
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          id="editProductName"
                          v-model="products.name"
                          label="Nama Produk"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          id="editProductType"
                          ref="operator"
                          v-model="editItem.product_type"
                          item-value="id"
                          item-text="name"
                          :rules="[
                            () => !!product_types || 'This field is required',
                          ]"
                          :items="product_types"
                          label="Pilih Tipe Produk"
                          placeholder="Select..."
                          outlined
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          id="editProductOperator"
                          ref="operator"
                          v-model="editItem.operator"
                          item-value="id"
                          item-text="name"
                          :rules="[
                            () => !!operators || 'This field is required',
                          ]"
                          :items="operators"
                          label="Pilih Operator"
                          placeholder="Select..."
                          outlined
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          id="editHargaJual"
                          v-model="editedItem.price"
                          label="Harga Jual"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          id="editStok"
                          v-model="editedItem.qty"
                          label="Stok"
                          value="qty"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    id="closeBtn"
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn id="saveBtn" color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                  <!-- <v-dialog v-model="save" max-width="290">
                    <v-card>
                      <v-card-title class="text-h5"> Selamat </v-card-title>

                      <v-card-text> Anda berhasil Edit Produk! </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog> -->
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              id="konfirmDelete"
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card light>
                <v-card-title id="dialogPopup" class="text-subtitle-1"
                  >Apakah Anda yakin ingin menghapus product
                  <code>{{
                    product_selected ? product_selected.name : ''
                  }}</code>
                  ?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    id="closeDeleteBtn"
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                    >Tidak</v-btn
                  >
                  <v-btn
                    id="deleteItemBtn"
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >Ya</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="row">
          <nuxt-link
            :key="'edit' + row.index"
            :to="{ name: 'edit-id', params: { id: row.item.id } }"
          >
            <v-icon id="editBtn" small class="mr-2"> mdi-pencil </v-icon>
          </nuxt-link>
          <v-icon id="deleteBtn" small @click="deleteItem(row)">
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <v-btn id="resetBtn" color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapState } from 'vuex'
// import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      search: '',
      dialog: false,
      // simpan: false,
      dialogDelete: false,
      product_selected: null,
      headers: [
        {
          text: 'Kode Produk',
          align: 'start',
          sortable: false,
          value: 'code_product',
          class: 'blue',
        },
        { text: 'Nama Produk', value: 'name', class: 'blue' },
        { text: 'Tipe Produk', value: 'product_type.name', class: 'blue' },
        { text: 'Operator', value: 'operator.name', class: 'blue' },
        { text: 'Harga Jual', value: 'price', class: 'blue' },
        { text: 'Stok', value: 'qty', class: 'blue' },
        { text: 'Aksi', value: 'actions', sortable: false, class: 'blue' },
      ],
      products: [
        {
          code_product: '',
          name: '',
          product_type: '',
          operator: '',
          price: '',
          qty: '',
        },
      ],
      product_types: [],
      operators: [],
      editedIndex: -1,
      editedItem: {
        // code_product: 'A59',
        name: 'Pulsa',
        product_type: 'Token',
        operator: 'telkomsel',
        price: 24000,
        qty: 4,
      },
      defaultItem: {
        code_product: '',
        name: 0,
        typeProduct: 0,

        operator: 65,
        price: 0,
        qty: 0,
      },
    }
  },

  computed: {
    ...mapState('product', {
      product: (state) => state.data,
      products: (state) => state.products,
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Produk'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
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
    this.$axios.get('/products').then((response) => {
      this.products = response.data.products
      // console.log(response.data.products)
    })
    try {
      if (Cookies.get('t')) {
        this.$router.push('/produk')
      } else {
        this.$router.push('/login')
      }
    } catch {
      this.$router.push('/produk')
    }
  },
  methods: {
    ...mapActions('product', ['destroyProductsData']),

    editItem(row) {
      this.product_selected = row.item
      this.dialog = true
    },

    deleteItem(row) {
      this.product_selected = row.item
      this.dialogDelete = true
      // console.log('hapus' + row)
    },

    deleteItemConfirm(row) {
      this.destroyProductsData(this.product_selected.id).then(() => {
        location.reload()
        this.dialogDelete = false
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        // this.product.product_selected = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
        setTimeout(() => {
          alert('Anda Berhasil Update Produk!!')
        }, 100)
      } else {
        this.products.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
