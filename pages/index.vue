<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">
            Welcome
          </h2>
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login () {
      try {
        const res = await this.$axios.post('/authenticate', { email: this.email, password: this.password })
        if (res.data.success) {
          localStorage.setItem('user-token', res.data.token)
          Cookies.set('user-token', res.data.token)
          this.$store.dispatch('fetchUserData')
          this.$router.push('/account')
        }
      } catch (e) {
        localStorage.removeItem('user-token')
        this.error = e
      }
    }
  }
}
</script>
