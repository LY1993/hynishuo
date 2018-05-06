<template>
  <div class="wrap">
      <!-- <img src="../assets/bg.png"> -->
      <div class="haha">

      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import tj from './tj'
  export default {
    data() {
      return {
        list: []
      }
    },
    components: {
        tj
    },
    created() {
      this.getList().then(result => this.list = result)
    },
    mounted() {
      console.log(this.list)
    },
    watch: {
      list(val) {
        console.log(typeof val)
      }
    },
    methods: {
      async getList(){
        let data = await axios.get('/api/list')
        return data.data
        console.log(this.list)
      }
    }
  }
</script>
<style>
    .wrap {
        background: url('../assets/bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .haha {
        width: 90vw;
        height: 50vw;
        background: black;
        margin: 300px auto 0
    }
</style>
