<template>
  <div class="login-page">
    <div class="container-left">
      <div class="wp-logo">
        <img alt="We Provide logo" src="~@/assets/img/wp_logo_white.png">
      </div>
    </div>
    <div class="container-right">
      <div class="container-right-wrapper">
        <form @submit.prevent="login" autocomplete="nope" class="card-panel">
          <h2 class="text-header">Login</h2>
          <div class="field">
            <!-- <label class="email-label" for="email">Email:</label> -->
            <input class="input-label" type="email" name="email" placeholder="Gebruikersnaam" v-model="email">
          </div>
          <div class="field">
            <!-- <label class="email-label" for="password">Password:</label> -->
            <input class="input-label" type="password" name="password" placeholder="Wachtwoord" v-model="password">
          </div>
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
          <div class="field">
            <button class="btn-login">Inloggen <svg width="10px" height="17px" viewBox="0 0 10 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="arrow-right"><g stroke="none" stroke-width="1" fill-rule="evenodd"><g transform="translate(-847.000000, -7963.000000)" fill-rule="nonzero"><g transform="translate(678.000000, 7944.000000)"><path d="M178.913828,27.5000005 C178.913828,27.6476288 178.857048,27.7782231 178.743487,27.8917834 L170.805612,35.82966 C170.69205,35.9432204 170.561456,36 170.413828,36 C170.266199,36 170.135604,35.9432204 170.022044,35.82966 L169.170341,34.9779562 C169.056781,34.8643959 169,34.7338016 169,34.5861722 C169,34.4385439 169.056781,34.3079496 169.170341,34.1943893 L175.86473,27.5000005 L169.170341,20.8056107 C169.056781,20.6920504 169,20.5614561 169,20.4138278 C169,20.2661994 169.056781,20.1356041 169.170341,20.0220438 L170.022044,19.170341 C170.135604,19.0567796 170.266199,19 170.413828,19 C170.561456,19 170.69205,19.0567796 170.805612,19.170341 L178.743487,27.1082166 C178.857048,27.2217769 178.913828,27.3523712 178.913828,27.5000005 Z"></path></g></g></g></svg></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Login',
    data(){
      return{
        email: null,
        password: null,
        feedback: null
      }
    },
    methods: {
      login(){
        // console.log(this.email, this.password)
        if(this.email && this.password){
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(cred =>{
            // console.log(cred)
            this.$router.push({ name: 'Dashboard' })
          }).catch(err => {
            this.feedback = err.message
          })
          this.feedback = null
        } else {
          this.feedback = 'Please fill in both fields'
        }
      }
    }
}
</script>

<style lang="scss" scoped>
h2{
  font-family: arboria, sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -1px;
  color: #13233A;
}

.login-page{
  background-color: #F7F8F8;
  display: flex;
  .container-right{
    width: 65vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .container-right-wrapper{
      width: 100%;
      height: 100%;
      padding: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .card-panel{
        padding: 80px 120px;
        width: 100%; 
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
        border-radius: 6px;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        .text-header{
          text-align: left;
          width: 80%;
          position: relative;
          display: block;
          clear: both;
          margin-top: 0;
          margin-bottom: 50px;
        }
        .field{
          width: 80%; 
          display: block;
          text-align: left;
          margin-bottom: 10px;
          &:nth-child(2)::before{
            content: url("~@/assets/img/icon_user.png");
            display: block;
            position: absolute;
            z-index: 100;
          }
          &:nth-child(3)::before{
            content: url("~@/assets/img/icon_user.png");
            display: block;
            position: absolute;
            z-index: 100;
          }
          &:nth-child(3){
            margin-top: 30px;
          }
          .email-label{
            display: block;
            text-align: left;
            font-size: 1rem; 
          }
          .input-label{
            position: relative;
            display: block;
            width: 100%;
            font-family: arboria, sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 20px;
            line-height: 23px;
            padding-left: 40px;
            padding-bottom: 10px;
            border-top-width: initial;
            border-right-width: initial;
            border-left-width: initial;
            border-top-color: initial;
            border-right-color: initial;
            border-left-color: initial;
            outline: none;
            border-radius: 0px;
            border-style: none none solid;
            border-image: initial;
            border-bottom: 2px solid #44556E;
            transition: all 0.25s ease 0s;
            &::placeholder{
              color: #44556E;
            }
          }
          .btn-login{
            background-size: 100%;
            background: linear-gradient(to right,#FF4296 10%,#FF8650);
            color: #fff;
            -webkit-transition: all .15s ease-in;
            transition: all .15s ease-in;
            padding: 16px 30px;
            border-radius: 30px;
            z-index: -10;
            font-size: 18px;
            line-height: 17px;
            font-weight: bold;
            border: none;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: -ms-inline-flexbox;
            display: inline-flex;
            text-transform: uppercase;
            margin-top: 40px;
            cursor: pointer;
            outline: 0;
            max-width: 100%;
            svg{
              margin-left: 20px;
              fill: #fff;
            }
            &:hover{
              transform: scale(1.02);
              &:before{
                opacity: 1;
              }
            }
            &:before{
              border-radius: inherit;
              background: linear-gradient(to right,#FF8650 10%,#FF4296);
              content: '';
              display: block;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
              width: 100%;
              z-index: -100;
              -webkit-transition: opacity 0.45s;
              transition: opacity 0.45s;
            }
          }
        }
      }
    }
  }
  .container-left{
    width: 35vw;
    height: 100vh;
    // background-color: salmon;
    background-image: url("~@/assets/img/testbanner.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .wp-logo{
      margin-bottom: 6em;
      img{
        width: 200px;
      }
    }
  }
}

//MEDIA QUERIES
@media only screen and (max-width: 1200px) {
  h2{
  }

  .login-page{
    flex-direction: column;
    .container-right{
      width: 100vw;
      height: 80vh;
      .container-right-wrapper{
        .card-panel{
          padding: 80px 160px;
          .text-header{
          }
          .field{
            &:nth-child(2)::before{
            }
            &:nth-child(3)::before{
            }
            &:nth-child(3){
            }
            .email-label{
            }
            .input-label{
              &::placeholder{
              }
            }
            .btn-login{
              svg{
              }
              &:hover{
                &:before{
                }
              }
              &:before{
              }
            }
          }
        }
      }
    }
    .container-left{
      width: 100vw;
      height: 20vh;
      .wp-logo{
        margin-bottom: 0em;
        img{
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  h2{
  }

  .login-page{
    flex-direction: column;
    .container-right{
      width: 100vw;
      height: 80vh;
      .container-right-wrapper{
        padding: 60px;
        .card-panel{
          padding: 60px 60px;
          .text-header{
          }
          .field{
            &:nth-child(2)::before{
            }
            &:nth-child(3)::before{
            }
            &:nth-child(3){
            }
            .email-label{
            }
            .input-label{
              &::placeholder{
              }
            }
            .btn-login{
              svg{
              }
              &:hover{
                &:before{
                }
              }
              &:before{
              }
            }
          }
        }
      }
    }
    .container-left{
      width: 100vw;
      height: 20vh;
      .wp-logo{
        margin-bottom: 0em;
        img{
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  h2{
    font-size: 44px;
  }

  .login-page{
    flex-direction: column;
    .container-right{
      width: 100vw;
      height: 80vh;
      .container-right-wrapper{
        padding: 20px;
        .card-panel{
          padding: 40px 40px;
          .text-header{
          }
          .field{
            &:nth-child(2)::before{
            }
            &:nth-child(3)::before{
            }
            &:nth-child(3){
            }
            .email-label{
            }
            .input-label{
              &::placeholder{
              }
            }
            .btn-login{
              svg{
              }
              &:hover{
                &:before{
                }
              }
              &:before{
              }
            }
          }
        }
      }
    }
    .container-left{
      width: 100vw;
      height: 20vh;
      .wp-logo{
        margin-bottom: 0em;
        img{
          width: 140px;
        }
      }
    }
  }
}
@media only screen and (max-width: 480px) {
  h2{
    font-size: 44px;
  }

  .login-page{
    flex-direction: column;
    .container-right{
      width: 100vw;
      height: 80vh;
      .container-right-wrapper{
        padding: 20px;
        .card-panel{
          padding: 20px 20px;
          .text-header{
          }
          .field{
            &:nth-child(2)::before{
            }
            &:nth-child(3)::before{
            }
            &:nth-child(3){
            }
            .email-label{
            }
            .input-label{
              &::placeholder{
              }
            }
            .btn-login{
              svg{
              }
              &:hover{
                &:before{
                }
              }
              &:before{
              }
            }
          }
        }
      }
    }
    .container-left{
      width: 100vw;
      height: 20vh;
      .wp-logo{
        margin-bottom: 0em;
        img{
          width: 100px;
        }
      }
    }
  }
}
@media only screen and (max-width: 320px) {
  h2{
    font-size: 44px;
  }

  .login-page{
    flex-direction: column;
    .container-right{
      width: 100vw;
      height: 80vh;
      .container-right-wrapper{
        padding: 10px;
        .card-panel{
          padding: 10px 10px;
          .text-header{
          }
          .field{
            &:nth-child(2)::before{
            }
            &:nth-child(3)::before{
            }
            &:nth-child(3){
            }
            .email-label{
            }
            .input-label{
              &::placeholder{
              }
            }
            .btn-login{
              svg{
              }
              &:hover{
                &:before{
                }
              }
              &:before{
              }
            }
          }
        }
      }
    }
    .container-left{
      width: 100vw;
      height: 20vh;
      .wp-logo{
        margin-bottom: 0em;
        img{
        }
      }
    }
  }
}
</style>