<template>
  <v-row justify="left" align="left" class="mx-5 mt-5">
    <v-col cols="12" sm="8" md="6" lg="3">
      <v-card id="paymentMethodBtn" to="pilihanPembayaran" class="pa-5" light>
        <v-row class="d-flex justify-center">
          <v-icon x-large class="mt-5"> mdi-cash-multiple </v-icon>
          <v-card-text>
            <p align="center">Metode Pembayaran</p>
          </v-card-text>
        </v-row>
      </v-card>
    </v-col>
    <!-- <v-col cols="12" sm="8" md="6" lg="3">
      <v-card to="pilihanPembayaran" class="pa-5" light>
        <v-row class="d-flex justify-center">
          <v-icon x-large class="mt-5"> mdi-shield-account </v-icon>
          <v-card-text>
            <p align="center">Management Admin</p>
          </v-card-text>
        </v-row>
      </v-card>
    </v-col> -->
  </v-row>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'IndexPage',
  mounted() {
    if (Cookies.get('t')) {
      this.$router.push('/pembayaran')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
