<template>
  <div>
    <v-row class="payment">
      <v-btn
        id="closeDeleteBtn"
        color="blue darken-1"
        text
        :to="{ name: 'pembayaran' }"
        ><v-icon light class="mr-4 mb-2" :to="{ name: 'pembayaran' }">
          mdi-arrow-left
        </v-icon></v-btn
      >

      <h3>Metode Pembayaran</h3>
    </v-row>

    <v-card class="mt-5 mx-7 mb-7" light>
      <v-row class="mr-15 mt-5">
        <v-col cols="1"></v-col>
        <!-- <v-col cols="10" class="d-flex justify-end mb-5 pr-16 mt-10">
          <v-btn depressed color="primary"> Tambah Metode Pembayaran </v-btn>
        </v-col> -->
      </v-row>
      <v-row class="ml-5 mt-1">
        <v-col cols="1"></v-col>
        <v-col id="payment1" cols="5">
          <v-row class="pa-5">
            <v-col cols="7">
              <img src="../assets/img/Bank1.png" alt="" width="100" />
              <p>Bank Central Asia</p>
            </v-col>
            <v-col cols="5">
              <v-switch v-model="switchProcces"></v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-col id="payment2" cols="5">
          <v-row class="pa-5">
            <v-col cols="7">
              <img src="../assets/img/Bank2.png" alt="" width="100" />
              <p>Bank Central Asia</p>
            </v-col>
            <v-col cols="5">
              <v-switch v-model="switchProcces"></v-switch>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ml-5 mt-7">
        <v-col cols="1"></v-col>
        <v-col id="payment3" cols="5">
          <v-row class="pa-5">
            <v-col cols="7">
              <img src="../assets/img/Bank3.png" alt="" width="100" />
              <p>Bank Central Asia</p>
            </v-col>
            <v-col cols="5">
              <v-switch v-model="switchProcces"></v-switch>
            </v-col>
          </v-row>
        </v-col>
        <v-col id="payment4" cols="5">
          <v-row class="pa-5">
            <v-col cols="7">
              <img src="../assets/img/Bank4.png" alt="" width="100" />
              <p>Bank Central Asia</p>
            </v-col>
            <v-col cols="5">
              <v-switch v-model="switchProcces"></v-switch>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ml-5 mt-1">
        <v-col cols="1"></v-col>
        <v-col id="payment5" cols="5">
          <v-row class="pa-5">
            <v-col cols="7">
              <img src="../assets/img/Bank5.png" alt="" width="80" />
              <p>Bank Republik Indonesia</p>
            </v-col>
            <v-col cols="5">
              <v-switch v-model="switchProcces"></v-switch>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'IndexPage',
  mounted() {
    if (Cookies.get('t')) {
      this.$router.push('/pilihanPembayaran')
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    tambahPembayaran() {
      // eslint-disable-next-line no-console
      console.log('tambah pembayaran')
    },
  },
}
</script>
<style>
.payment {
  margin-left: 30px;
  margin-bottom: 20px;
  color: black;
}
</style>
