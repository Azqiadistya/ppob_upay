<template>
  <v-container>
    <v-card class="ml-5 mr-5" light flat>
      <v-card-title id="titleInvoice" class="headline ml-2">
        <strong> Invoice </strong>
      </v-card-title>

      <v-data-table
        id="dataInvoice"
        :headers="headers"
        :items="transactions"
        sort-by="id"
        class="elevation-1 mx-5 text-center"
        light
      >
        <template #[`item.status`]="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <template #top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title id="titleCard">
                <span class="text-h5">Send Invoice</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  Apakah Anda yakin ingin mengirim invoice kepada
                  {{ invoice_selected ? invoice_selected.user.name : '' }}
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  id="cancelBtn1"
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  id="sendInoviceBtn"
                  color="blue darken-1"
                  text
                  @click="sendInvoiceConfirm"
                >
                  SEND INVOICE
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template #[`item.actions`]="row">
          <!-- <v-icon small class="mr-2" @click="generateVA(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
          <v-btn small color="primary" @click="sendInvoice(row)">
            Send Invoice
          </v-btn>
        </template>
        <template #no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'default',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    invoice_selected: null,
    headers: [
      {
        text: 'ID Transaksi',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nama Pengguna', value: 'user.name' },
      { text: 'Kode Produk', value: 'code_transaction' },
      { text: 'Nama Produk', value: 'product.name' },
      { text: 'Harga', value: 'price' },
      { text: 'Metode Pembayaran', value: 'payment_method.name' },
      { text: 'Status', value: 'status' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    transactions: [
      {
        id: '',
        user: '',
        code_transactions: '',
        product: '',
        price: '',
        payment_method: '',
        status: '',
      },
    ],
    editedIndex: -1,
    editedItem: {
      code: '',
      name: 0,
      typeProduct: 0,
      operator: 65,
      price: 0,
      paymentMethod: 0,
      numberVA: '',
    },
    defaultItem: {
      code: '',
      name: 0,
      typeProduct: 0,

      operator: 65,
      price: 0,
      paymentMethod: 0,
    },
  }),

  computed: {
    ...mapState('invoice', {
      invoice: (state) => state.invoice,
    }),
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  mounted() {
    this.$axios.get('/transactions').then((response) => {
      this.transactions = response.data.transactions
      // console.log(response)
    })
    if (Cookies.get('t')) {
      this.$router.push('/invoice')
    } else {
      this.$router.push('/login')
    }
  },

  methods: {
    ...mapActions('invoice', ['getInvoiceData']),
    getColor(status, success) {
      if (status === 'success') return 'green'
      else if (status === 'pending') return 'orange'
      else return 'red'
    },

    initialize() {
      this.products = []
    },

    sendInvoice(row) {
      this.invoice_selected = row.item
      this.dialog = true
    },

    sendInvoiceConfirm() {
      this.getInvoiceData(this.invoice_selected.id).then(() => {
        // location.reload()
        alert('Email telah berhasil dikirim!')
      })
      this.dialog = false
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
