<template>
  <v-row justify="center" align="center" class="mx-5 mt-2">
    <v-col cols="12" sm="8" md="6" lg="12">
      <v-card light>
        <v-card-title class="headline">
          <strong> Daftar Pesanan</strong></v-card-title
        >
        <v-card-text>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'IndexPage',
  mounted() {
    if (Cookies.get('t')) {
      this.$router.push('/pesanan')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
