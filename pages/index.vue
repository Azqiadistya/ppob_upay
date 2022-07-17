<template>
  <v-row justify="center" align="center ">
    <v-col cols="12" sm="8" md="6" lg="12">
      <v-card
        id="cardWelcome"
        class="pa-5 mt-5 mr-10 ml-10"
        style="background-color: #6b4bcc"
      >
        <v-row>
          <v-col cols="9">
            <v-card-title class="headline">
              Selamat datang kembali, Admin!
            </v-card-title>
            <v-card-text>
              <p>
                Silahkan sesuaikan dengan kebutuhanmu agar segera rilis ke
                tampilan User Aplikasi
                <strong> Upay! </strong>
              </p>
            </v-card-text>
          </v-col>
          <v-col id="emo" cols="3">
            <img src="../assets/img/emo2.png" width="200" />
          </v-col>
        </v-row>
      </v-card>

      <v-row justify="center" align="center" class="mt-5 mr-7 ml-7">
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-card
            id="cardPemasukan"
            class="pa-5 text-center"
            style="background-color: #ffe8d3"
            light
          >
            <v-row>
              <v-cols>
                <img
                  src="../assets/img/shopping-bag.png"
                  width="30"
                  style="margin-left: 10px; margin-top: 30px"
              /></v-cols>
              <v-col>
                <h4>{{ banyakProduct.count }}</h4>
                <p>Total Produk</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-card
            id="banyakUser"
            class="pa-5 text-center"
            style="background-color: #fef09a"
            light
          >
            <v-row>
              <v-cols>
                <img
                  src="../assets/img/group.png"
                  width="30"
                  style="margin-left: 10px; margin-top: 30px"
                />
              </v-cols>
              <v-col
                ><h4>{{ banyakUser.count }}</h4>
                <p>Total Pengguna</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-card
            id="totalTransaksi"
            class="pa-5 text-center"
            style="background-color: #bec8fb"
            light
          >
            <v-row>
              <v-cols>
                <img
                  src="../assets/img/hacking.png"
                  width="30"
                  style="margin-left: 10px; margin-top: 30px"
                />
              </v-cols>
              <v-col
                ><h4>{{ transactions.count }}</h4>
                <p>Total Transaksi</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-card
            id="transaksiSukses"
            class="pa-5 text-center"
            style="background-color: #e9fdd8"
            light
          >
            <v-row>
              <v-cols>
                <img
                  src="../assets/img/deadline.png"
                  width="30"
                  style="margin-left: 10px; margin-top: 30px"
                />
              </v-cols>
              <v-col
                ><h4>{{ transactionSuccess.count }}</h4>
                <p>Transaksi Berhasil</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-8 mr-7 ml-16 mb-10 pl-5">
        <img id="statistik" src="../assets/img/Statistik.png" width="200%" />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'IndexPage',
  data() {
    return {
      banyakProduct: [],
      banyakUser: [],
      transactions: [],
      transactionSuccess: [],
    }
  },
  async mounted() {
    this.$axios.get('/dashboard/product').then((response) => {
      this.banyakProduct = response.data
    })
    this.$axios.get('/dashboard/user').then((response) => {
      this.banyakUser = response.data
    })
    this.$axios.get('/dashboard/transaction_success').then((response) => {
      this.transactionSuccess = response.data
    })
    this.$axios.get('/dashboard/transaction').then((response) => {
      this.transactions = response.data
    })
    if (Cookies.get('t')) {
      await this.$router.push('/')
    } else {
      await this.$router.push('/login')
    }
  },
}
</script>
