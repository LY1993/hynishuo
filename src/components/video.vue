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
import mp4 from '../../server/demo.mp4'
// console.log(mp4)
export default {
  data() {
    return {
      src: '',
      mp4: mp4
    }
  },
  created() {
      this.getList().then(result => this.src = result)
  },
  mounted() {
    console.log(this.src)
  },
  methods: {
    async getList(){
      let data = await axios.get('/api/video')
      return data.data
    }
  }
}
</script>
