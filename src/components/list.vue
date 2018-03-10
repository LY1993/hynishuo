<template>
  <div>
      <ul>
        <li v-for="item in list">{{item.name}}</li>
      </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        list: []
      }
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

