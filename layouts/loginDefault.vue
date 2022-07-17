<template>
  <Nuxt :src="imageBg" />
</template>
<script>
export default {
  name: 'DefaultLayout',
  layout: 'empty',
  data() {
    return {
      imageBg: require('@/assets/img/Login.png'),
    }
  },
}
</script>
