<template>
  <div class="navbar">
    <div class="container">
      <!-- <router-link :to="{ name: 'Home' }" class="brand-logo">
        <svg width="100%" viewBox="0 0 781 88" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M121.884 0L132.05 17.6398H255.927L266.093 0H121.884Z" fill="#13233A"/><path d="M142.215 35.1802L152.38 52.82H235.597L245.762 35.1802H142.215Z" fill="#13233A"/><path d="M162.546 70.3601L172.711 88H215.266L225.431 70.3601H162.546Z" fill="#13233A"/><path d="M81.223 0L132.05 87.9999H152.38L101.554 0H81.223Z" fill="#13233A"/><path d="M40.6614 0L91.488 87.9999H111.719L60.992 0H40.6614Z" fill="#13233A"/><path d="M0 0L50.8267 87.9999H71.1573L20.3307 0H0Z" fill="#13233A"/> <path d="M302.469 69.9613L287.121 18.437H298.283L306.355 46.1425L309.245 55.8096L311.438 46.1425L317.816 18.437H329.875L336.353 46.4415L338.645 56.2082C339.542 52.9194 340.439 49.6306 341.535 46.4415L349.608 18.437H360.072L344.824 69.9613H332.566L326.586 43.95L323.895 32.3894C322.998 36.7745 322.102 40.6612 321.105 43.95L314.627 69.9613H302.469Z" fill="#13233A"/><path d="M367.048 69.9613V18.437H407.71V27.9047H378.21V38.4687H406.215V47.9364H378.21V60.3939H408.706V69.9613H367.048Z" fill="#13233A"/><path d="M450.065 48.634H461.526C464.915 48.634 467.506 47.6374 469.499 45.6442C471.492 43.651 472.489 41.2592 472.489 38.2694C472.489 35.2796 471.492 32.7881 469.499 30.8945C467.506 28.9013 464.915 27.9047 461.626 27.9047H450.065V48.634ZM439.003 69.9613V18.437H461.028C468.303 18.437 473.984 20.3306 478.07 24.018C482.056 27.8051 484.149 32.4891 484.149 38.2694C484.149 44.0497 482.156 48.8334 478.07 52.5208C474.083 56.2082 468.303 58.1017 460.928 58.1017H450.065V69.8616H439.003V69.9613Z" fill="#13233A"/> <path d="M504.579 48.6341H515.94C519.329 48.6341 521.92 47.6375 523.913 45.6443C525.906 43.6511 526.903 41.2592 526.903 38.2694C526.903 35.2796 525.906 32.7881 523.913 30.8946C521.92 28.9014 519.329 27.9048 515.94 27.9048H497.304L491.723 18.3374H515.542C522.817 18.3374 528.498 20.2309 532.584 23.9184C536.57 27.6058 538.663 32.3895 538.663 38.1698C538.663 41.6579 537.766 44.847 536.072 47.8368C534.377 50.7269 531.986 53.1188 528.896 54.9127L538.762 69.8617H526.106L519.329 57.9025C517.535 58.0021 513.947 58.1018 510.658 58.1018H504.679V69.8617H493.517V48.6341H504.579Z" fill="#13233A"/> <path d="M557.2 44.1495C557.2 48.7338 558.695 52.6206 561.684 55.8097C564.674 58.9988 568.461 60.6931 572.946 60.6931C577.431 60.6931 581.118 59.0985 584.108 55.8097C587.098 52.6206 588.593 48.6342 588.593 44.1495C588.593 39.6648 587.098 35.778 584.108 32.4892C581.118 29.3001 577.431 27.6059 572.946 27.6059C568.461 27.6059 564.674 29.2005 561.684 32.4892C558.695 35.778 557.2 39.6648 557.2 44.1495ZM545.54 44.1495C545.54 36.7746 548.131 30.3964 553.313 25.3137C558.495 20.1314 564.973 17.6399 572.846 17.6399C580.72 17.6399 587.197 20.2311 592.38 25.3137C597.562 30.496 600.153 36.7746 600.153 44.1495C600.153 51.624 597.562 57.9026 592.38 63.0849C587.197 68.2672 580.72 70.7587 572.846 70.7587C564.973 70.7587 558.495 68.1676 553.313 63.0849C548.131 58.0022 545.54 51.624 545.54 44.1495Z" fill="#13233A"/> <path d="M621.779 69.9613L601.748 18.437H613.109L623.274 44.548L627.56 57.4041C629.353 51.5242 630.848 47.2388 631.845 44.548L642.01 18.437H653.372L633.34 69.9613H621.779Z" fill="#13233A"/><path d="M670.912 18.437H659.75V69.9613H670.912V18.437Z" fill="#13233A"/> <path d="M693.136 60.3939H702.305C707.188 60.3939 711.075 58.899 714.164 55.8096C717.154 52.7201 718.649 48.8333 718.649 44.1493C718.649 39.4653 717.154 35.5786 714.164 32.4891C711.175 29.3996 707.188 27.9047 702.305 27.9047H693.136V60.3939ZM681.974 69.9613V18.437H702.604C710.876 18.437 717.553 20.9285 722.635 25.9115C727.718 30.8945 730.21 36.9738 730.21 44.249C730.21 51.5242 727.718 57.6034 722.635 62.5864C717.553 67.5695 710.876 70.061 702.604 70.061H681.974V69.9613Z" fill="#13233A"/> <path d="M738.98 69.9613V18.437H779.641V27.9047H750.142V38.4687H778.146V47.9364H750.142V60.3939H780.638V69.9613H738.98Z" fill="#13233A"/></svg>
      </router-link> -->
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <div class="links">
              <a href="#"><li>Dashboard</li></a>
              <a href="#"><li>Kandidaten</li></a>
              <a href="#"><li>Selecteer kandidaat</li></a>
              <a href="#"><li>Beheer kandidaten</li></a>
              <a href="#"><li>Visualisatie</li></a>
            </div>
            <div class="bottom-link">
              <a href="#"><li>weprovide.com</li></a>
            </div>
          </ul>
        </div>
      </nav>
      <div class="navbar-header">
        <span class="full-text">We Provide Recruitment Tool Dashboard</span>
        <span class="short-text">Dashboard</span>
      </div>
      <div class="dropdown">
        <!-- <li v-if="!user"><router-link :to="{ name: 'Signup' }">Sign up</router-link></li> -->
        <!-- <div v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></div> -->
        <!-- <li v-if="user"><a>{{ user.email }}</a></li> -->
        <div class="btn-logout" >          
          <img src="@/assets/img/icon_user.png" alt="icon user">
        </div>
        <div @click="logout" v-if="user" class="dropdown-content">logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data(){
    return{
      user: null
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  },
  created(){
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null 
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  position: fixed;
  width: 100vw;
  height: 80px;
  background-color: white;
  box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
  display: flex;
  font-family: arboria, sans-serif;
  font-weight: 500;
  font-style: normal;
  color: #13233A;
  letter-spacing: -1px;
  z-index: 1;
  .container{
    display: flex;
    flex-direction: row;
    width: 100vw;
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav{
      #menuToggle{
        display: block;
        position: relative;
        z-index: 1;
        -webkit-user-select: none;
        user-select: none;
        margin-top: 6px;
        input{
          display: block;
          width: 40px;
          height: 32px;
          position: absolute;
          top: -7px;
          left: -5px;
          cursor: pointer;
          opacity: 0;
          z-index: 2; 
          -webkit-touch-callout: none;
          &:checked ~ span{
            opacity: 1;
            transform: rotate(45deg) translate(-2px, -1px);
            background: #13233A;
          }
          &:checked ~ span:nth-last-child(3){
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
          }
          &:checked ~ span:nth-last-child(2){
            transform: rotate(-45deg) translate(0, -1px);
          }
          &:checked ~ #menu{
            transform: none;
          }
        }
        span{
          display: block;
          width: 33px;
          height: 4px;
          margin-bottom: 5px;
          position: relative;
          background: #13233A;
          border-radius: 40px;
          z-index: 1;
          transform-origin: 4px 0px;
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      opacity 0.55s ease;
          &:first-child{
            transform-origin: 0% 0%;
          }
          &:nth-last-child(2){
            transform-origin: 0% 100%;
          }
        }
        #menu{
          position: absolute;
          width: 300px;
          height: 100vh;
          margin: -57px 0 0 -50px;
          padding: 70px 50px 50px 50px;
          background: white;
          list-style-type: none;
          -webkit-font-smoothing: antialiased;
          transform-origin: 0% 0%;
          transform: translate(-100%, 0);
          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
          box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .links{
            .link-down{
              margin-top: 40px;
            }
            a{
              li{
                transition: all .3s ease-out;
                &:hover{
                  margin-left: 20px;
                }
              }
            }
          }
          .bottom-link{
            text-align: left;
            a{
              li{
                transition: all .3s ease-out;
                &:hover{
                  margin-left: 20px;
                }
              }
            }
          }
          a{
            text-decoration: none;
            color: #13233A;
            transition: color 0.3s ease;
            li{
              padding: 10px 0;
              font-size: 20px;
              text-align: left;
            }
          }
        }
      }
    }
    .navbar-header{
      font-size: 24px;
      margin-top: -5px;
      .full-text{
        display: block;
      }
      .short-text{
        display: none;
      }
    }
    a{
      text-decoration: none;
    }
    .brand-logo{
      width: 200px;
      display: flex;
      align-items: center;
    }
    .dropdown{
      position: relative;
      display: inline-block;
      &:hover .dropdown-content{
        opacity: 1;
      }
      li{
        color: black;
        text-decoration: none;
        list-style-type: none;
      }
      .btn-logout{
        cursor: pointer;
        width: 24px;
      }
      .dropdown-content{
        margin-left: -50px;
        cursor: pointer;
        position: absolute;
        background: white;
        min-width: 5rem;
        padding: 1rem;
        transition: all 0.5 ease;
        box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
        opacity: 0;
        z-index: 1;
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }
}

//MEDIA QUERIES
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 1024px) {
}
@media only screen and (max-width: 800px) {
}
@media only screen and (max-width: 600px) {
  .navbar{
    .container{
      nav{
        #menuToggle{
          input{
            &:checked ~ span{
            }
            &:checked ~ span:nth-last-child(3){
            }
            &:checked ~ span:nth-last-child(2){
            }
            &:checked ~ #menu{
            }
          }
          span{
            &:first-child{
            }
            &:nth-last-child(2){
            }
          }
          #menu{
            .links{
              .link-down{
              }
              a{
                li{
                  &:hover{
                  }
                }
              }
            }
            .bottom-link{
              a{
                li{
                  &:hover{
                  }
                }
              }
            }
            a{
              li{
              }
            }
          }
        }
      }
      .navbar-header{
        .full-text{
          display: none;
        }
        .short-text{
          display: block;
        }
      }
      a{
      }
      .brand-logo{
      }
      .dropdown{
        &:hover .dropdown-content{
        }
        li{
        }
        .btn-logout{
        }
        .dropdown-content{
          &:hover{
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 480px) {
}
@media only screen and (max-width: 320px) {
}
</style>