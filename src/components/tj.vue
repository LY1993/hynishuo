<template>
  <div class="wrap">
      <!-- <img src="../assets/bg.png"> -->
      <div class="header" slot="header">
        {{title}}
      </div>
      <div class="body" slot="body">
        <div class="b_title" v-show="b_title"></div>
        <div class="bite"></div>
        <div class="number">
          <span class="name"></span>
          <span class="num"></span>
        </div>
        <div class="buttons">

        </div>
      </div>
      <div class="footer" slot="footer">

      </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props: ['title'],
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
    }
  }
</script>
<style>
    .wrap {
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
