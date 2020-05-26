<template>
  <div class="about">
    <div ref="box" class="box"></div>
    <div class="about-container">
      <div ref="header" class="header"
     >
        <lottie class="lottie"
          :options="defaultOptions"
          @mouseenter.native="play"
          @mouseleave.native="reverse"
          :height="512"
          :width="512"
          v-on:animCreated="handleAnimation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineLite, TweenMax, Bounce, Power2 } from "gsap"
import Lottie from "vue-lottie"
import animationData from "./../assets/data.json"

export default {
  data() {
    return{
      activeIndex: 0,
      defaultOptions: { animationData: animationData, loop: false, autoplay: false },
      animationSpeed: 1,
    }
  }, 
  components: {
    Lottie
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    stop: function() {
      this.anim.stop();
    },
    play: function() {
      this.anim.playSegments([0, 30], true);
    },
    reverse: function() {
      this.anim.setDirection(-1);  
      this.anim.play();
    },
    pause: function() {
      this.anim.pause();
    },
    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  },
  mounted(){
    const { box } = this.$refs
    const { header } = this.$refs
    const timeline = new TimelineLite()

    timeline.to(box, 1, {
      delay: 1.5,
      opacity: 1,
      y: "50vh", 
      // "--yPercent": -50,
      // "--y": 50,
      ease: Power2.easeInOut 
    })
    timeline.to(box, 1, {
      opacity: 1,
      ease: Power2.easeInOut,
    }, '-=0.5') //run the animation 0.5s early
    timeline.to(box, 1, {
      ease: Power2.easeInOut,
      background: '#f33558',
      scale: 50
    })
    timeline.to(header, 1, {
      ease: Power2.easeInOut,
      opacity: 1
    })
  }
}
</script>

<style lang="scss" scoped>
.about{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  .box{
    border-radius: 50px; 
    width: 50px;
    height: 50px;
    background: #000;
    opacity: 0;
    z-index: 0; 
  }
  .about-container{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    .header{ 
      opacity: 0;
      .lottie{
        width: 512px !important;
        height: 512px !important;
      }
    }
  }
}
</style>