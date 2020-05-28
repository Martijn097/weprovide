<template>
  <div class="name">
    <!-- <h1>{{ greet('morning') }}</h1> -->
    <!-- <div id="loading" v-if="isLoading">loaaadding</div> -->
    <!-- <Header /> -->
    <div class="card-container">
      <div class="field">
        <input v-bind:class="{ 'has-warning': attemptSubmit && missingFirstName }" v-on:keyup.enter="doThis" class="input-label" type="text" placeholder="voornaam" v-model="firstname">
        <p v-if="attemptSubmit && missingFirstName" class="red-text">test1</p>
      </div>
      <div class="field">
        <input v-bind:class="{ 'has-warning': attemptSubmit && missingLastName }" v-on:keyup.enter="doThis" class="input-label" type="text" placeholder="achternaam" v-model="lastname">
        <p v-if="attemptSubmit && missingLastName" class="red-text">test2</p>
      </div>
      <div v-on:click="validate" class="start-button">
        <div class="left-bracket"></div>
        <div class="start-button-label">START</div>
        <div class="right-bracket"></div>
        <div class="button-gradient"></div>
      </div>
    </div>
    <!-- <p>{{ textinput }}</p> -->
  </div>
</template>

<script>
import db from '@/firebase/init'
import Header from '@/components/layout/Header'

export default {
  name: 'Name',
  data(){
    return{
      name: null,
      textinput2: null,
      feedback: null,
      isLoading: true,
      firstname: '',
      lastname: '',
      attemptSubmit: false
    }
  },
  components: {
    Header
  },
  computed: {
    missingFirstName() {
      return this.firstname === '';
    },
    missingLastName() {
      return this.lastname === '';
    }
  },
  methods: {
    greet(time){
      return `Hello there and good ${time}, ${this.textinput} `
    },
    validate(e) {
      this.attemptSubmit = true;
      if (this.missingFirstName || this.missingLastName ) {
        event.preventDefault();
      } else{
        this.doThis();
      }
    },
    doThis(e){
      db.collection('tests').add({
        name: this.firstname + ' ' + this.lastname
      }).then(() => {
        this.$router.push({ name: 'Play', params: { name: this.firstname + ' ' + this.lastname }})
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>

<style lang="scss" >
.name{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Futura;
  text-transform: uppercase;
  #loading{
    position: fixed;
    z-index: 1000;
    background-color: #63ab97;
    color: white;
    font-size: 32px;
    padding-top: 10vh;
    height: 100vh;
    width: 100vw;
    text-align: center;
  }
  p{
    // font-size: 
  } 
  .card-container{
    margin: 0 auto;
    width: 400px;
    margin: 100px;
    h2{
      text-align: left;
    }
    .field{
      display: block;
      text-align: left;
      margin-bottom: 20px;
      .input-label{
        font-family: Futura;
        text-transform: uppercase;
        padding-left: 30px;
        color: white;
        position: relative;
        background-color: transparent;
        display: block;
        width: 100%;
        font-size: 20px;
        line-height: 50px;
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
        border-bottom: 2px solid #EFD15B;
        transition: all 0.25s ease 0s;
        &:focus{
          color: white;
          // font-size: 40px;
          transition: all 0.5s ease 0s;
        }
      }      
      &:before{
        content: url("~@/assets/img/person_icon.png");
        display: block;
        position: absolute;
        margin-top: 14px;
      }
    } 
    .start-button{
      cursor: pointer;
      position: relative;
      display: inline-block;
      height: 50px;
      box-sizing: border-box;
      text-align: left;
      margin-top: 40px;
      width: 100%;
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
        width: 200px;
        text-align: center;
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
  }
}

//MEDIA QUERIES
@media only screen and (max-width: 600px) {
  .name{
    #loading{
    }
    p{
    } 
    .card-container{
      margin: 80px;
      h2{
      }
      .field{
        .input-label{
          &:focus{
          }
        }      
        &:before{
        }
      } 
      .start-button{
        &:hover .start-button-label{
        }
        &:hover .button-gradient{
        }
        .left-bracket{
        }
        .start-button-label{
        }
        .right-bracket{
        }
        .button-gradient{
        }
      }
    }
  }
}
@media only screen and (max-width: 480px) {
  .name{
    #loading{
    }
    p{
    } 
    .card-container{
      margin: 40px;
      h2{
      }
      .field{
        .input-label{
          &:focus{
          }
        }      
        &:before{
        }
      } 
      .start-button{
        &:hover .start-button-label{
        }
        &:hover .button-gradient{
        }
        .left-bracket{
        }
        .start-button-label{
        }
        .right-bracket{
        }
        .button-gradient{
        }
      }
    }
  }
}
@media only screen and (max-width: 320px) {
  .name{
    #loading{
    }
    p{
    } 
    .card-container{
      margin: 40px;
      h2{
      }
      .field{
        .input-label{
          border-bottom: 1px solid #EFD15B;
          font-size: 16px;
          &:focus{
          }
        }      
        &:before{
        }
      } 
      .start-button{
        height: 40px;
        margin-top: 20px;
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
          margin-left: 0px;
          margin-top: 1px;
          width: 192px;
        }
      }
    }
  }
}
</style>