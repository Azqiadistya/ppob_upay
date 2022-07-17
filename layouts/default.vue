<template>
  <v-app style="background-color: #d1e6ff">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :src="image"
      fixed
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-row>
              <div class="ml-3">
                <img id="logoUpay" src="../assets/img/logo.png" width="100" />
              </div>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="pr-2 pt-2 pb-2">
          <v-btn
            style="background-color: transparent !important"
            @click="logoutApp()"
          >
            <v-icon light class="mr-5"> mdi-logout-variant </v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      light
      flat
      style="background-color: #d1e6ff"
    >
      <v-app-bar-nav-icon id="burgerBtn" @click.stop="drawer = !drawer" />
      <v-btn id="minivariantBtn" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title style="font-weight: 600" v-text="title" />
      <v-spacer />

      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-card-title
        id="dateTime"
        class="dateTime text-subtitle-1 ml-9 pl-5"
        align="center"
      >
        {{ arrhari[new Date().getDay()] }},
        {{ new Date().getDate() }}
        {{ arrbulan[new Date().getMonth()] }}
        {{ new Date().getFullYear() }}
        <v-icon light class="icons emailIcons mr-2"> mdi-email </v-icon>
        <v-icon light class="mr-4"> mdi-bell-ring </v-icon>
        <h4 class="mr-4">|</h4>
        <h5 class="mr-4">Hai, Admin</h5>
        <img src="../assets/img/person1.png" width="40" />
      </v-card-title>
      <v-container>
        <Nuxt />
      </v-container>
      <v-dialog id="konfirmLogout" v-model="dialogLogout" max-width="500px">
        <v-card light>
          <v-card-title class="text-subtitle-1 ml-16 pl-5"
            >Apakah Anda yakin ingin logout?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              id="closeLogout"
              color="blue darken-1"
              text
              @click="cancelLogout"
              >Batal</v-btn
            >
            <v-btn id="konfirmLogout" color="blue darken-1" text @click="logout"
              >Ya</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'DefaultLayout',
  layout: 'empty',
  data() {
    return {
      dialogLogout: false,
      image: require('@/assets/img/sidebar.png'),
      clipped: false,
      drawer: false,
      fixed: false,
      arrhari: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jum`at',
        'Sabtu',
      ],
      arrbulan: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ],
      items: [
        {
          id: 'dashboardBtn',
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
        {
          id: 'produkBtn',
          icon: 'mdi-order-bool-descending-variant',
          title: 'Daftar Produk',
          to: '/produk',
        },
        // {
        //   icon: 'mdi-order-bool-descending-variant',
        //   title: 'Daftar Pesanan',
        //   to: '/pesanan',
        // },
        {
          id: 'invoiceBtn',
          icon: 'mdi-receipt-text-check-outline',
          title: 'Invoice',
          to: '/invoice',
        },
        {
          id: 'iklanBtn',
          icon: 'mdi-advertisements',
          title: 'Iklan Promo',
          to: '/iklanPromo',
        },
        {
          id: 'pembayaranBtn',
          icon: 'mdi-wallet-plus',
          title: 'Pembayaran',
          to: '/pembayaran',
        },
      ],
      miniVariant: false,
      right: true,

      title: 'Payment Point Online Banking (PPOB) uPay',
    }
  },
  methods: {
    async logout() {
      await Cookie.remove('t')
      this.$router.push('/login')
    },
    logoutApp() {
      this.dialogLogout = true
    },
    cancelLogout() {
      this.dialogLogout = false
    },
    // minimizeNav() {
    //   this.drawer = !this.drawer
    //   this.miniVariant = !this.miniVariant
    // },
  },
}
</script>
<style>
html {
  font-family: 'Poppins', sans-serif;
}
.dateTime {
  color: black;
}
.icons {
  margin-left: 600px;
}
</style>
