<template>
  <div>
    <v-parallax class="background" dark :src="image" height="120%">
      <img
        src="../assets/img/logo.png"
        width="100"
        style="margin-left: 130px; margin-top: 20px"
      />

      <v-row justify="center" style="margin-top: 120px; margin-left: 100px">
        <v-col cols="4">
          <v-card
            ref="form"
            light
            flat
            style="background-color: transparent !important"
          >
            <v-card-title style="margin-left: 100px" dark>
              <h4>LOGIN ADMIN</h4>
            </v-card-title>
            <v-card-text>
              <v-form lazy-validation>
                <v-text-field
                  id="username"
                  v-model="form.username"
                  label="Username"
                  required
                  placeholder="Masukkan Username"
                  prepend-icon="mdi-account-circle"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="form.password"
                  label="Password"
                  required
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="tampilPassword"
                ></v-text-field>
                <strong
                  v-if="error"
                  id="errorHandling"
                  class="alert alert-danger"
                  role="error"
                  >{{ error }}</strong
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <!--  <v-btn text> Cancel </v-btn> -->
              <!--             <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip v-if="formHasErrors" left>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition> -->
              <v-btn
                id="submitLogin"
                block
                dark
                style="background-color: blue"
                @click="login"
              >
                <strong>Login</strong>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="5" style="margin-left: 150px">
          <img src="../assets/img/illustration1.png" width="450" />
        </v-col>
      </v-row>

      <!-- <v-app dark>
               <v-row class="mt-16">
        <v-col cols="2"></v-col>
        <v-col cols="4">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
          </v-img>
        </v-col>
        <v-col cols="4">
          <h2>form</h2>
          <form>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Username"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            

            <v-btn class="mr-4" @click="submit"> submit </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    
    </v-app> -->
    </v-parallax>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'LoginPage',
  layout: 'loginDefault',
  auth: false,
  data() {
    return {
      image: require('@/assets/img/login2.png'),
      showPassword: false,
      error: '',
      form: {
        username: '',
        password: '',
      },
      loginError: true,
    }
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
    // console.log(this.$auth)
    if (Cookies.get('t')) {
      this.$router.push('/')
    }
  },
  methods: {
    tampilPassword() {
      this.showPassword = !this.showPassword
    },
    async login() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      }
      try {
        const response = await this.$axios.post('/admin/login', payload)
        // console.log(response)
        if (response.status === 200) {
          this.$store.commit('auth/setToken', response.data.token)
          if (Cookies.get('t')) {
            this.$router.push('/')
          }
        }
        //   await this.$auth
        //     .loginWith('local', {
        //       data: {
        //         username: this.form.username,
        //         password: this.form.password,
        //       },
        //     })
        //     .then((data) => {
        //       console.log(data)
        //       this.$router.push('/')
        //     })
      } catch (e) {
        // if (e.response) this.err = e.response.data.error.message
        this.error = 'Invalid Username or Password!'
      }
    },
  },
}
</script>
<style>
html {
  font-family: 'Poppins', sans-serif;
}
.background {
  height: 745px;
  background-repeat: no-repeat;
  background-size: contain, cover;
}
</style>
