<template>
  <div class="home">
      
    <div ref="blackPage" class="black-page"></div>
    <div ref="lightBulb" class="lightbulb">
      <img src="~@/assets/lightbulb6.gif" alt="Lightbulb">
    </div>


    <div class="landings-content">

      <div class="landings-top">
        <div ref="lightBulb2" class="landings-lightbulb">
          <img src="~@/assets/img/lightbulb.png" alt="Lightbulb">
        </div>
      </div>

      <div ref="text" class="landings-middle">
        <div class="landings-company">WeProvide</div>
        <div class="landings-message">Escape Room</div>
        <div class="landings-message-text">
          Kijk of je het in je hebt om de code te kraken!
          Met behulp van jouw kennis in huis probeer jij de puzzels op te lossen.
          </div>
        <router-link :to="{ name: 'Name' }" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">START</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </router-link>
        <div class="landings-key">
          <img src="~@/assets/img/key.png" alt="key">
        </div>
      </div>

      <div class="landings-bottom">
        <div ref="legals" class="landings-legals">
          <a href="">Link</a> 
        </div>
        <div ref="socialMedia" class="social-media">
          <a href="https://www.facebook.com/martijn.muit">
            <img src="~@/assets/img/facbook.svg" alt="Facebook_WeProvide">
          </a>
          <a href="https://www.linkedin.com/in/martijn-muit-270432156/">
            <img src="~@/assets/img/insta.svg" alt="Instagram_WeProvide">
          </a>
          <a href="https://dribbble.com/Martijn097">
            <img src="~@/assets/img/internet.svg" alt="WeProvide Website">
          </a>
        </div>
      </div>
    </div>
    
    <div class="sky">
      <div class="cloud_one">
        <img alt="cloud_one" src="~@/assets/cloud_1.png">
      </div>
      <div class="cloud_two">
        <img alt="cloud_two" src="~@/assets/cloud_2.png">
      </div>
      <div class="cloud_three">
        <img alt="cloud_three" src="~@/assets/cloud_2.png">
      </div>
    </div>

  </div>
</template>

<script>
import db from '@/firebase/init'
import { TimelineLite, TweenMax, Bounce, Power2 } from "gsap"
import { gsap, CSSPlugin } from 'gsap/all'
gsap.registerPlugin(CSSPlugin)

export default {
  name: 'Home',
  data(){
    return{
    }
  },
  components: {
  },
  methods: {
  },
  mounted(){
    const { blackPage } = this.$refs
    const { lightBulb } = this.$refs
    const { lightBulb2 } = this.$refs
    const { text } = this.$refs
    const { legals } = this.$refs
    const { socialMedia } = this.$refs
    const timeline = new TimelineLite()

    timeline.to(blackPage, 1, {
      delay: 4,
      opacity: 0,
      ease: Power2.easeInOut 
    })
    timeline.to(lightBulb, 2, {
      y: 120,
      ease: Power2.easeInOut,
    }, '-=5') //run the animation 4s early
    timeline.to(lightBulb, 1, {
      opacity: 0,
      ease: Power2.easeInOut,
    }, '-=1.5') //run the animation 1.5s early
    timeline.to(lightBulb2, 1.5, {
      opacity: 1,
      marginTop: "0%",
      ease: Power2.easeInOut,
    }, '-=1') //run the animation 1.5s early
    timeline.to(legals, 1.5, {
      opacity: 1,
      marginLeft: "0%",
      ease: Power2.easeInOut,
    }, '-=1.5') //run the animation 1.5s early
    timeline.to(socialMedia, 1.5, {
      opacity: 1,
      marginRight: "0%",
      ease: Power2.easeInOut,
    }, '-=1.5') //run the animation 1.5s early
    timeline.to(text, 1.5, {
      opacity: 1,
      marginLeft: "0%",
      ease: Power2.easeInOut,
    }, '-=1.5') //run the animation 1.5s early
  }
}
</script>

<style lang="scss" >

.home{
  text-transform: uppercase;
  background: url("~@/assets/bg_escape.png");
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  display: flex;
  .black-page{
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: absolute;
  }
  .lightbulb{
    width: 100vw;
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
    margin-top: -200px;
    opacity: 1;
    img{
      width: 160px;
    }
  }
  .landings-content{
    z-index: 1;
    margin: 0 auto;
    width: 1400px;
    margin: 100px;
    .landings-top{
      display: flex;
      flex-direction: row-reverse;
      .landings-lightbulb{
        position: absolute;
        margin-top: -100%;
        opacity: 0;
        img{
          width: 120px;
          margin-top: -360px;
        }
      }
    }
    .landings-middle{
      display: flex;
      flex-direction: column;
      opacity: 0;
      margin-left: -100%;
      .landings-company{
        font-family: Diner, sans-serif;
        margin-left: 20px;
        font-size: 40px;
        letter-spacing: 4px;
        line-height: 1;
        color: #EFD15B;
        text-align: left;
        margin-bottom: 100px;
        &:before{
          content: "";
          display: block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #EFD15B;
          margin-left: -20px;
          margin-top: 15px;
        }
        &:after{
          content: "";
          display: block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #EFD15B;
          margin-left: 155px;
          margin-top: -25px;
        }
      }
      .landings-message{
        font-family: Diner, sans-serif;
        font-size: 140px;
        letter-spacing: 4px;
        line-height: 1;
        color: #EFD15B;
        text-align: left;
      }
      .landings-message-text{
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 4px;
        width: 750px;
        color: white;
        text-align: left;
        font-family: Futura;
        text-transform: uppercase;
        // font-style: normal;
        // font-weight: 500;
        margin-top: 40px;
      }
      .start-button{
        cursor: pointer;
        position: relative;
        display: block;
        height: 50px;
        box-sizing: border-box;
        text-align: left;
        margin-top: 40px;
        width: 130px;
        &:hover .start-button-label{
          color: white;
        }
        &:hover .button-gradient{
          opacity: 1;
        }
        .left-bracket{
          background: url("~@/assets/bracket2.png");
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          display: inline-block;
          width: 22px;
          height: 50px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .start-button-label{
          position: relative;
          top: -18px;
          display: inline-block;
          color: #EFD15B;
          font-size: 20px;
          letter-spacing: 2px;
          margin: 0 8px;
          line-height: 50px;
          height: 100%;
          transition: color .3s ease-out;
        }
        .right-bracket{
          background: url("~@/assets/bracket2.png");
          display: inline-block;
          width: 22px;
          height: 50px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .button-gradient{
          position: absolute;
          top: 0;
          left: 0;
          margin-left: 1px;
          width: 127px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
      }
      .landings-key{
        display: flex;
        margin-top: 100px;
        img{
          position: absolute;
        }
      }
    }

    .landings-bottom{
      display: flex;
      justify-content: space-between;
      margin-top: 300px;
      .landings-legals{
        opacity: 0;
        margin-left: -100%;
        cursor: pointer;
        a{
          font-size: 30px;
          color: #EFD15B;
          transition: opacity .3s ease-out;
          text-decoration: none;
          &:hover{
            opacity: 0.7;
          }
        }
      }
      .social-media{
        opacity: 0;
        margin-right: -100%;
        a{
          padding-right: 15px;
          img{
            transition: opacity .3s ease-out;
            &:hover{
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  .sky{
    height: 100vh;
    position: relative;
    overflow: hidden;
    top: 45%;
    .cloud_one{
      opacity: 10%;
      background: url("~@/assets/cloud_1.png");
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      -webkit-animation: cloud_one 50s linear infinite;
      -moz-animation: cloud_one 50s linear infinite;
      -o-animation: cloud_one 50s linear infinite;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      img{
        width: 1200px;
      }
    }
    .cloud_two{
      opacity: 10%;
      background: url("~@/assets/cloud_2.png");
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: cloud_two 75s linear infinite;
      -moz-animation: cloud_two 75s linear infinite;
      -o-animation: cloud_two 75s linear infinite;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      img{
        width: 1500px;
      }
    }
    .cloud_three{
      opacity: 10%;
      background: url("~@/assets/cloud_2.png");
      position: absolute;
      transform: rotate(180deg);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      -webkit-animation: cloud_two 100s linear infinite;
      -moz-animation: cloud_two 100s linear infinite;
      -o-animation: cloud_two 100s linear infinite;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -o-transform: translate3d(0, 0, 0);
      img{
        width: 1500px;
      }
    }
  }
}
@keyframes cloud_one{
  from {
    transform: translate(1250px, 0);
  }
  to{
    transform: translate(-1750px, 0);
  }
}
@keyframes cloud_two{
  from {
    transform: translate(1550px, 0);
  }
  to{
    transform: translate(-1750px, 0);
  }
}
@keyframes cloud_three{
  from {
    transform: translate(1550px, 0);
  }
  to{
    transform: translate(-1750px, 0);
  }
}

</style>