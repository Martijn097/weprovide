<template>
  <div class="dashboard-page">
    <div class="navbar">
      <div class="container">
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <div class="links">
                <a v-for="tab in tabs" v-bind:key="tab" v-bind:class="['link', { active: currentTab === tab }]" v-on:click="currentTab = tab" @click="test"
                  ><li>{{ tab }}</li>
                </a>
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
          <div class="btn-logout" >          
            <img src="@/assets/img/icon_user.png" alt="icon user">
          </div>
          <div @click="logout" v-if="user" class="dropdown-content">logout</div>
        </div>
      </div>
    </div>

    <div class="dashboard-container">
      <transition name="fade" mode="out-in">
        <component v-bind:is="currentTabComponent" class="tab"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'
import 'moment/locale/nl';
//Dashboard components
import dashboard from '@/components/dashboardComponents/dashboard'
import kandidaten from '@/components/dashboardComponents/kandidaten'
import selecteer from '@/components/dashboardComponents/selecteer'
import beheer from '@/components/dashboardComponents/beheer'
import visualisatie from '@/components/dashboardComponents/visualisatie'

export default {
  name: 'Dashboard',
  data(){
    return{
      user: null,
      currentTab: 'dashboard',
      tabs: ['dashboard', 'kandidaten', 'selecteer', 'beheer', 'visualisatie'],
    }
  },
  components: {
    dashboard,
    kandidaten,
    selecteer,
    beheer,
    visualisatie
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase()
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    test: function () {
      console.log('Called method!');
    }
  },
  beforeCreate: function() {
    document.body.className = 'dashboard';
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null 
      }
    })
  },
}
</script>

<style lang="scss">
h2{
  font-family: arboria, sans-serif;
  font-weight: 500;
  font-style: normal;
  color: #13233A;
  letter-spacing: -1px;
  font-size: 24px;
  line-height: 28px;
  margin: 0;
  padding: 0;
}
h3{
  font-family: arboria, sans-serif;
  font-weight: 500;
  font-style: normal;
  color: #13233A;
  letter-spacing: -1px;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
  padding: 0;
}
.dashboard-page{
  height: 100vh;
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
              .link{

              }
              .active{
                font-style: italic;
              }
              .link-down{
                margin-top: 40px;
              }
              a{
                text-transform: capitalize;
                cursor: pointer;
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
                cursor: pointer;
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
  .dashboard-container{
    position: relative;
    top: 120px;
  }
}

//MEDIA QUERIES
@media only screen and (max-width: 1200px) {
  h2{
  }
  h3{
  }
  .dashboard-page{
    .dashboard-container{
    }
  }
}
@media only screen and (max-width: 1024px) {
  h2{
  }
  h3{
  }
  .dashboard-page{
    .dashboard-container{
    }
  }
}
@media only screen and (max-width: 600px) {
  h2{
  }
  h3{
  }
  .dashboard-page{
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
    .dashboard-container{
      top: 80px;
    }
  }
}
@media only screen and (max-width: 480px) {
  h2{
  }
  h3{
  }
  .dashboard-page{
    .dashboard-container{
    }
  }
}
</style>