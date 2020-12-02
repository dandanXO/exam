<template>
  <section class="section">
    <div>
      <h2 class="title">
        My courses
      </h2>
      <div v-for="(data, index) in userData" :key="index">
        {{ index }}:{{ data }}
      </div>
      <button @click="logOut">
        log out
      </button>
    </div>
    <div class="container">
      <div v-for="(user,index) in users" :key="index" class="card">
        <div class="card-img">
          <img class="img" :src="user.image">
        </div>
        <div class="card-body">
          <div class="card-body-title" style="white-space: nowrap;">
            {{ user.title }}
          </div>
          <div class="card-body-footer">
            <div class="card-footer-people">
              <p v-for=" lec in user.lecturers" :key="lec">
                {{ lec.username }}
              </p>
              評價{{ user.feedback_score }}%
            </div>
            <div class="card-footer-title">
              人數:{{ user.students }}人
            </div>
          </div>
        </div>
      </div>
      <div ref="divAsTarget" class="loading">
        <h3>Loading ...</h3>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
const options = {
  root: null,
  threshold: 0

}
export default {
  middleware: 'authenticated',
  data () {
    return {
      users: [],
      observer: null,
      page: 1
    }
  },
  computed: {
    ...mapState(['userData'])
  },

  mounted () {
    this.observer = new IntersectionObserver(this.callback, options)
    this.observer.observe(this.$refs.divAsTarget)
  },
  methods: {
    fetchUsers () {
      const token = Cookies.get('user-token')
      this.$axios.get(`http://private-anon-08f825e2f2-interview10.apiary-mock.com/courses?page=${this.page}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        if (this.page + 1 === response.data.meta.last_page) { return }
        for (let i = 0; i < response.data.meta.per_page; i++) {
          this.users.push(response.data.data[i])
        }
        this.page = response.data.meta.current_page + 1
      })
    },
    callback (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.fetchUsers()
        }
      })
    },
    logOut () {
      Cookies.remove('user-token')
      this.$store.commit('setUserData', { userData: {}, logined: false })
      this.$router.push('/login')
    }
  }
}
</script>
<style  scoped>
img{
  width:100%;
}
.container{
  width: 100vw;
  height: 90vh;
  flex-wrap: wrap;
  display: flex;
}
 .card{
   margin: 5px;
    width:23%;
  }
  .loading{
    margin-top: 50vh;
  }
  .card-body-title{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-body-footer{
    width:100%;
    display:flex;
    justify-content: space-between;
  }
@media only screen and (max-width: 600px) {
 .card{
    margin: 5px 0;
    width:100%;
  }
  img{
    width:90%;
  }
  .card-img{
    display:inline-block;
    width:30%;
  }
  .card-body{
    display:inline-block;
    width: 60%;
  }
}
</style>
