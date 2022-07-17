export const state = () => ({
  invoice: [],
})

export const mutations = {
  SET_INVOICE_DATA(state, payload) {
    state.invoice = payload
  },
}
export const actions = {
  getInvoiceData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/transactions/${payload}/emails`).then((response) => {
        // commit('SET_DATA', response.data.product)
        // this.data = response.data.products
        console.log(response)
        resolve()
      })
    })
  },
}
