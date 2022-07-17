import Cookies from 'js-cookie'
export default {
  setToken(state, payload) {
    console.log(payload)
    state.token = payload
    Cookies.set('t', state.token)
  },
}
