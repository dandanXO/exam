<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>

export default {
  mounted () {
    if (process.browser) {
      this.listenCookieChange(async ({ oldValue, newValue }) => {
        console.log(`Cookie changed from "${oldValue}" to "${newValue}"`)
        await this.$store.dispatch('fetchUserData')

        if (!this.$store.state.logined) {
          this.$router.push('/')
        }
      }, 1000)
    }
  },
  methods: {
    listenCookieChange (callback, interval = 1000) {
      let lastCookie = document.cookie
      setInterval(() => {
        const cookie = document.cookie
        if (cookie !== lastCookie) {
          try {
            // eslint-disable-next-line standard/no-callback-literal
            callback({ oldValue: lastCookie, newValue: cookie })
          } finally {
            lastCookie = cookie
          }
        } else {
          console.log(this.$store.state.logined)
        }
      }, interval)
    }
  }
}
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
