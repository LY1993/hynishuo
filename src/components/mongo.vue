<template>
  <div>
      <ul>
        <li v-for="item in list">{{item.name}}<span @click="delitem(item)">X</span></li>
      </ul>
      <input type="text" v-model="inputval"><input type="button" value="新增" @click="addlist">
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        list: [],
        inputval: ''
      }
    },
    created() {
      // this.getList().then(result => this.list = result)
    },
    mounted() {
      console.log(this.list)
      this.getList()
    },
    watch: {
      list(val) {
        console.log(typeof val)
      }
    },
    methods: {
      async getList(){
        let data = await axios.get('/api/getlist')
        this.list = data.data
        console.log(this.list)
      },
      addlist() {
        let self = this
        if(this.inputval == '') return
        axios.post('/api/addlist', {name: self.inputval}).then(self.getList())
      },
      delitem(item) {
        let self = this
        axios.post('/api/dellist', {id: item._id}).then(self.getList())
      }
    }
  }
</script>

