export const state = () => ({
  products: [],
  data: [],
})

export const mutations = {
  SET_PRODUCT_DATA(state, payload) {
    state.products = payload
  },
  SET_DATA(state, payload) {
    state.data = payload
  },
}

export const actions = {
  getProductsData({ commit }) {
    return new Promise((resolve) => {
      this.$axios.get('/products').then((response) => {
        commit('SET_PRODUCT_DATA', response.data.products)
        this.products = response.data.products
        // console.log(response.data.products)
        resolve()
      })
    })
  },
  getData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/products/${payload}`).then((response) => {
        commit('SET_DATA', response.data.product)
        // this.data = response.data.products
        console.log(response.data.product)
        resolve()
      })
    })
  },
  storeProductsData({ dispatch }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/products', {
          name: this.products.name,
          product_type_id: this.products.product_type_id,
          operator_id: this.products.operator_id,
          price: this.products.price,
          qty: this.products.qty,
        })
        .then((response) => {
          dispatch('getProductData')
          // this.products = response.data.products
          // console.log(response.data.products)
          resolve()
        })
        .catch((e) => {})
    })
  },
  updateProductsData({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/products/${payload.id}`, payload)
        .then(() => {
          dispatch('getProductsData')
          resolve()
        })
        .catch((e) => {})
    })
  },
  destroyProductsData({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/products/${payload}`)
        .then(() => {
          dispatch('getProductsData')
          location.reload()
          // console.log(response.data.products)
          resolve()
        })
        .catch((error) => {
          commit('SET_ERRORS', error.response.data)
        })
    })
  },
}
