<template>
  <div class="home">
      
    <div ref="blackPage" class="black-page"></div>
    <div ref="lightBulb" class="lightbulb">
      <img src="~@/assets/img/lightbulb.gif" alt="Lightbulb">
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
        Je wordt wakker in een oude salon bar. Je hebt geen idee hoe je er terecht bent gekomen. Eén ding weet je zeker, ik moet hier wegkomen. <br><br>
        Met behulp van jouw kennis op het gebied van webdevelopment kun je een poging wagen om te ontsnappen. ...Lukt jou het?
        </div>
        <div class="landings-key">
          <img src="~@/assets/img/key.png" alt="key">
        </div>
      </div>

      <div ref="bottom" class="landings-bottom">
        <router-link :to="{ name: 'Name' }"  class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">START</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </router-link>
        <div class="social-media">
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
    const { bottom } = this.$refs
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
    timeline.to(text, 1.5, {
      opacity: 1,
      marginLeft: "0%",
      ease: Power2.easeInOut,
    }, '-=1.5') //run the animation 1.5s early
    timeline.to(bottom, 3, {
      opacity: 1,
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
      width: 90px;
    }
  }
  .landings-content{
    z-index: 1;
    margin: 0 auto;
    width: 1200px;
    margin: 100px;
    .landings-top{
      display: flex;
      flex-direction: row-reverse;
      .landings-lightbulb{
        position: absolute;
        margin-top: -100%;
        opacity: 0;
        img{
          width: 90px;
          margin-top: -200px;
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
        font-size: 32px;
        letter-spacing: 4px;
        line-height: 1;
        color: #EFD15B;
        text-align: left;
        margin-bottom: 40px;
        &:before{
          content: "";
          display: block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #EFD15B;
          margin-left: -17px;
          margin-top: 12px;
        }
        &:after{
          content: "";
          display: block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #EFD15B;
          margin-left: 130px;
          margin-top: -21px;
        }
      }
      .landings-message{
        font-family: Diner, sans-serif;
        font-size: 120px;
        letter-spacing: 4px;
        line-height: 1;
        color: #EFD15B;
        text-align: left;
      }
      .landings-message-text{
        font-weight: bolder;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 1px;
        width: 600px;
        color: white;
        text-align: left;
        font-family: Futura;
        text-transform: uppercase;
        margin-top: 40px;
        margin-bottom: -40px;
      }
      .landings-key{
        display: flex;
        margin-top: 40px;
        img{
          width: 500px;
          margin-left: -120px;
          position: relative;
        }
      }
    }
    .landings-bottom{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 20px;
      opacity: 0;
      .start-button{
        cursor: pointer;
        position: relative;
        display: block;
        height: 50px;
        box-sizing: border-box;
        text-align: left;
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
          text-align: center;
          position: relative;
          top: -18px;
          display: inline-block;
          color: #EFD15B;
          font-size: 20px;
          letter-spacing: 2px;
          width: 200px;
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
          margin-left: 2px;
          width: 241px;
          height: calc(100% - 0px);
          border: 2px solid;
          -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
          opacity: 0;
          transition: opacity .3s ease-out;
        }
      }
      .social-media{
        a{
          padding-right: 20px;
          img{
            width: 24px;
            height: 24px;
            transition: opacity .3s ease-out;
            &:hover{
              opacity: 0.7;
            }
          }
        }
      }
    }
  }
}
//MEDIA QUERIES
@media only screen and (max-width: 1024px) {
  .home{
    .landings-content{
      .landings-top{
        .landings-lightbulb{
          img{
            width: 80px;
          }
        }
      }
      .landings-middle{
        .landings-company{
          font-size: 26px;
          &:before{
            margin-left: -17px;
            margin-top: 9px;
          }
          &:after{
            margin-left: 116px;
            margin-top: -17px;
          }
        }
        .landings-message{
          font-size: 100px;
        }
        .landings-message-text{
          font-size: 14px;
          line-height: 18px;
          width: 500px;
        }
        .landings-key{
          img{
            width: 400px;
          }
        }
      }
      .landings-bottom{
        .social-media{
          a{
            img{
              &:hover{
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .home{
    .landings-content{
      margin: 60px;
      .landings-top{
        .landings-lightbulb{
          img{
            width: 50px;
          }
        }
      }
      .landings-middle{
        .landings-company{
          font-size: 26px;
          &:before{
            margin-left: -17px;
            margin-top: 9px;
          }
          &:after{
            margin-left: 116px;
            margin-top: -17px;
          }
        }
        .landings-message{
          font-size: 100px;
        }
        .landings-message-text{
          font-size: 14px;
          line-height: 18px;
          width: 100%;
        }
        .landings-key{
          display: none;
        }
      }

      .landings-bottom{
        margin-top: 80px;
        flex-direction: column;
        align-items: flex-start;
        .social-media{
          margin-top: 40px;
          a{
            img{
              width: 24px;
              height: 24px;
              &:hover{
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .home{
    .landings-content{
      margin: 40px;
      .landings-top{
        .landings-lightbulb{
          img{
            width: 50px;
          }
        }
      }
      .landings-middle{
        .landings-company{
          font-size: 26px;
          &:before{
            margin-left: -17px;
            margin-top: 9px;
          }
          &:after{
            margin-left: 116px;
            margin-top: -17px;
          }
        }
        .landings-message{
          font-size: 72px;
        }
        .landings-message-text{
          font-size: 12px;
          line-height: 16px;
          width: 100%;
        }
        .landings-key{
          display: none;
        }
      }

      .landings-bottom{
        margin-top: 80px;
        flex-direction: column;
        align-items: flex-start;
        .social-media{
          margin-top: 40px;
          a{
            img{
              width: 24px;
              height: 24px;
              &:hover{
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 480px) {
  .home{
    .lightbulb{
      img{
        width: 90px;
      }
    } 
    .landings-content{
      margin: 30px;
      .landings-top{
        .landings-lightbulb{
          display: none;
          img{
            width: 50px;
          }
        }
      }
      .landings-middle{
        .landings-company{
          font-size: 26px;
          &:before{
            margin-left: -17px;
            margin-top: 9px;
          }
          &:after{
            margin-left: 116px;
            margin-top: -17px;
          }
        }
        .landings-message{
          font-size: 72px;
        }
        .landings-message-text{
          font-size: 12px;
          line-height: 16px;
          width: 100%;
        }
        .landings-key{
          display: none;
        }
      }

      .landings-bottom{
        margin-top: 80px;
        flex-direction: column;
        align-items: flex-start;
        .social-media{
          margin-top: 40px;
          a{
            img{
              width: 24px;
              height: 24px;
              &:hover{
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 320px) {
  .home{
    .lightbulb{
      img{
        width: 80px;
      }
    }     
    .landings-content{
      margin: 20px;
      .landings-top{
        .landings-lightbulb{
          display: none;
          img{
            width: 50px;
          }
        }
      }
      .landings-middle{
        .landings-company{
          font-size: 20px;
          &:before{
            width: 6px;
            height: 6px;
            margin-left: -15px;
            margin-top: 6px;
          }
          &:after{
            width: 6px;
            height: 6px;
            margin-left: 96px;
            margin-top: -15px;
          }
        }
        .landings-message{
          font-size: 52px;
        }
        .landings-message-text{
          font-size: 10px;
          line-height: 14px;
          width: 100%;
        }
        .landings-key{
          display: none;
        }
      }

      .landings-bottom{
        margin-top: 80px;
        flex-direction: column;
        align-items: flex-start;
        .start-button{
          height: 40px;
          &:hover .start-button-label{
          }
          &:hover .button-gradient{
          }
          .left-bracket{
            width: 16px;
            height: 42px;
          }
          .start-button-label{
            top: -18px;
            font-size: 16px;
            width: 160px;
            line-height: 75px;
            height: 100%;
          }
          .right-bracket{
            width: 16px;
            height: 42px;
          }
          .button-gradient{
            width: 192px;
          }
        }
        .social-media{
          margin-top: 40px;
          a{
            img{
              width: 18px;
              height: 18px;
              &:hover{
              }
            }
          }
        }
      }
    }
  }
}
</style>