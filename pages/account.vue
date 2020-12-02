<template>
  <section class="section">
    <div class="container">
      <h2 class="title">
        My Account
      </h2>
      <div v-for="(data, index) in userData" :key="index">
        {{ index }}:{{ data }}
      </div>
      <button @click="logOut">
        log out
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  middleware: 'authenticated',
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    logOut () {
      Cookies.remove('user-token')
      this.$store.commit('setUserData', { userData: {}, logined: false })
      this.$router.push('/login')
    }
  }
}
</script>
