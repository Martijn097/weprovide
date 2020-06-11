<template>
  <div id="app">
    <transition 
      name="view">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { TweenMax, Power4 } from "gsap"

export default {
  name: 'App',
  data() {
    return{
    }
  }, 
  components:{
  },
  computed: {

  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

@font-face {
  font-family: Diner;
  src: url('~@/assets/fonts/Diner-Obese-webfont.woff') format("woff");
}
@font-face {
  font-family: Futura;
  src: url('~@/assets/fonts/Futura-Medium.ttf') format("ttf");
}
@import url("https://use.typekit.net/sdk2sor.css");
*,
*::before,
*::after {
  box-sizing: border-box;
}
.red_box{
  background-color: red; 
  color:blue;
  width: 200px;
  height: 200px; 
  &:hover{
    // background-color: black;
  }
}
body, html{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: black;
  overflow: hidden;
  font-family: Futura;
  // cursor: none; 
}
body.dashboard {
  background-color: #F7F8F8;
  overflow: scroll;
}
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.view{
  backface-visibility: hidden;
  z-index: 1;
}
.view-enter-active, .view-leave-active{
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}
.view-enter-active{
  transition-delay: 1s;
}
.view-enter, .view-leave-to{
  opacity: 0;
}
.view-enter-to, .view-leave{
  opacity: 1;
}
</style>
