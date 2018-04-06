<template>
  <div>
      <video :src="mp4" controls autoplay>
      </video>
      <!-- <object height="200" width="200" :data="src"></object>
      <embed :src="src" height="200" width="200"> -->
  </div>
</template>
<script>
import axios from 'axios'
// import mp4 from '../../server/demo.mp4'
// console.log(mp4)
export default {
  data() {
    return {
      mp4: ''
    }
  },
  created() {
      this.getList()
  },
  mounted() {
  },
  methods: {
    async getList(){
      let data = await axios.get('/api/video')
      this.mp4 = data.data
      return data.data
    }
  }
}
</script>
