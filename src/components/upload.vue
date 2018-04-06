<template>
  <div>
      <template v-for="item in list">
        <img :src="item.data" alt="Base64 encoded image" width="150" height="150">
        <span style="color:red" @click="del(item)">X</span>
      </template>
      <input type="file" @change='transformFileToDataUrl' accept=“image/*”>
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
      this.getPiclist()
    },
    watch: {
    },
    methods: {
      transformFileToDataUrl (e) {
        let self = this
        let file = e.target.files[0]
        const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩
        let imgFile = {}
        // console.log(file)
        // 存储文件相关信息
        imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
        imgFile.size = file.size;
        imgFile.name = file.name;
        imgFile.lastModifiedDate = file.lastModifiedDate;

        // 封装好的函数
        const reader = new FileReader();

        // file转dataUrl是个异步函数，要将代码写在回调里
        reader.onload = async function(e) {
          const result = e.target.result;
          console.log(file.name)
          await axios.post('/api/upload', {postData: result, name: file.name}).then(self.getPiclist()).catch(e=>console.log(e))
          // if(result.length < imgCompassMaxSize) {
          //     compress(result, processData, false );    // 图片不压缩
          // } else {
          //     compress(result, processData);            // 图片压缩
          // }
        };
        reader.readAsDataURL(file);
      },
      async getPiclist() {
        let self = this
        let result = await axios.get('/api/getPiclist')
        self.list = result.data
        console.log(this.list)
      },
      del(item) {
        let self = this
        axios.post('/api/delPic', {id: item.id}).then(this.getPiclist)
      }
    }
  }
</script>

