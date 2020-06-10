<template>
  <div class="name">
    <div v-bind:style="styleObject" class="card-container">
      <div class="fields">
        <div class="name-title">
          <h3>VUL JE NAAM EN ACHTERNAAM IN</h3>
        </div>
        <div class="field">
          <input v-bind:class="{ 'has-warning': attemptSubmit && missingFirstName }" class="input-label" type="text" placeholder="voornaam" v-model="firstname">
          <p v-if="attemptSubmit && missingFirstName" class="red-text">test1</p>
        </div>
        <div class="field">
          <input v-bind:class="{ 'has-warning': attemptSubmit && missingLastName }" class="input-label" type="text" placeholder="achternaam" v-model="lastname">
          <p v-if="attemptSubmit && missingLastName" class="red-text">test2</p>
        </div>
        <div v-on:click="validate" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">START</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </div>
      </div>
    </div>
    <div v-bind:style="styleObject2" class="radio-toolbar">
      <div class="jobs-title">
        <h3>SELECTEER DE FUNCTIE WAARVOOR JE SOLLICITEERT</h3>
      </div>
      <div class="jobs-offers">
        <input type="radio" id="test" name="test" value="frontend-junior/medior" v-model="job">
        <label for="test">
          <div class="left-bracket"></div>
          <div class="start-button-label">Frontend<div class="small-text">junior/medior</div></div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input type="radio" id="test2" name="test" value="backend-junior/medior" v-model="job">
        <label for="test2">
          <div class="left-bracket"></div>
          <div class="start-button-label">Backend<div class="small-text">junior/medior</div></div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input type="radio" id="test3" name="test" value="backend-senior" v-model="job">
        <label for="test3">
          <div class="left-bracket"></div>
          <div class="start-button-label">Backend<div class="small-text">senior</div></div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>   
      </div>

      <div class="jobs-continue">
        <button @click="displayRadioValue" v-show="job === 'frontend-junior/medior'" type="button" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </button>
        <button @click="displayRadioValue" v-show="job === 'backend-junior/medior'" type="button" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </button>
        <button @click="displayRadioValue" v-show="job === 'backend-senior'" type="button" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </button>
      </div>
    </div>
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
      firstname: '',
      lastname: '',
      attemptSubmit: false,
      x: '',
      jobs: null,
      job: null,
      styleObject: {
        opacity: '1',
        display: ''
      },
      styleObject2: {
        opacity: '0',
      }
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
    },
  },
  methods: {
    greet(time){
      return `Hello there and good ${time}, ${this.textinput} `
    },
    verander(){
      this.styleObject.opacity = '0'
      this.styleObject.display = 'none'
    },
    verander2(){
      this.styleObject2.opacity = '1'
    },
    validate(e) {
      this.attemptSubmit = true;
      if (this.missingFirstName || this.missingLastName ) {
        event.preventDefault();
      } else{
        console.log('gelukt');
        this.verander();
        this.verander2();
        // this.opacity='0';
      }
    },
    displayRadioValue(){
      var ele = document.getElementsByTagName('input'); 
        
      var i;
      for(i = 0; i < ele.length; i++) { 
        if(ele[i].type="radio") { 
          if(ele[i].checked) 
            db.collection('hoi').add({
              name: this.firstname + ' ' + this.lastname,
              jobs: this.job
            }).then(() => {
              this.$router.push({ name: 'Play', params: { name: this.firstname + ' ' + this.lastname, jobs: this.job }})
            }).catch(err => {
              console.log(err)
            })
        }
      } 
    },
  }
}
</script>

<style lang="scss" >
.name{
  width: 100vw;
  height: 100vh;
  font-family: Futura;
  text-transform: uppercase;
  .card-container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    // display: block;
    transition: opacity 0.5s linear;
    h2{
      text-align: left;
    }
    .fields{
      width: 500px;
      margin: 100px;
      .name-title{
        text-align: left;
        margin-bottom: 40px;
        h3{
          font-weight: bolder;
          font-size: 24px;
          line-height: 28px;
          letter-spacing: 1px;
          color: #EFD15B;
          font-family: Futura;
          text-transform: uppercase;
        }
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
  .radio-toolbar{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 0;
    transition: opacity 0.5s linear;
    .radio-button {
      margin: 0 20px;
    }
    .jobs-title{
      margin-bottom: 60px;
      h3{
        font-weight: bolder;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 1px;
        color: #EFD15B;
        font-family: Futura;
        text-transform: uppercase;
      }
    }
    .jobs-offers{
      width: 800px;
      display: flex;
      justify-content: space-between;
      input[type="radio"]{
        opacity: 0;
        position: fixed;
        width: 0;
      }
      label{
        cursor: pointer;
        position: relative;
        display: inline-block;
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
          position: relative;
          top: -9px;
          display: inline-block;
          color: #EFD15B;
          font-size: 20px;
          letter-spacing: 2px;
          width: 200px;
          text-align: center;
          height: 100%;
          transition: color .3s ease-out;
          .small-text{
            font-size: 10px;
          }
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
      input[type="radio"]:checked + label .button-gradient{
        opacity: 1;
      }
    }
    .jobs-continue{
      display: flex;
      justify-content: flex-end;
      margin-top: 60px;
      button{
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        text-transform: uppercase;
      }
      .start-button{
        cursor: pointer;
        position: relative;
        display: inline-block;
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
}

//MEDIA QUERIES
@media only screen and (max-width: 1024px) {
 .name{
    p{
    } 
    .card-container{
      h2{
      }
      .fields{
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
    .radio-toolbar{
      width: 100%;
      .radio-button {
      }
      .jobs-title{
        margin-left: 20px;
        margin-right: 20px;
        h3{
        }
      }
      .jobs-offers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input[type="radio"]{
        }
        label{
          margin-bottom: 20px;
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
        input[type="radio"]:checked + label .button-gradient{
        }
      }
      .jobs-continue{
        justify-content: center;
        margin-top: 40px;
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
}
@media only screen and (max-width: 800px) {
 .name{
    p{
    } 
    .card-container{
      h2{
      }
      .fields{
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
    .radio-toolbar{
      .radio-button {
      }
      .jobs-title{
        h3{
        }
      }
      .jobs-offers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input[type="radio"]{
        }
        label{
          margin-bottom: 20px;
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
        input[type="radio"]:checked + label .button-gradient{
        }
      }
      .jobs-continue{
        justify-content: center;
        margin-top: 40px;
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
}
@media only screen and (max-width: 600px) {
  .name{
    p{
    } 
    .card-container{
      h2{
      }
      .fields{
        margin: 60px;
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
    .radio-toolbar{
      .radio-button {
      }
      .jobs-title{
        h3{
        }
      }
      .jobs-offers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input[type="radio"]{
        }
        label{
          margin-bottom: 20px;
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
        input[type="radio"]:checked + label .button-gradient{
        }
      }
      .jobs-continue{
        justify-content: center;
        margin-top: 40px;
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
}
@media only screen and (max-width: 480px) {
  .name{
    p{
    } 
    .card-container{
      h2{
      }
      .fields{
        margin: 40px;
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
    .radio-toolbar{
      .radio-button {
      }
      .jobs-title{
        h3{
        }
      }
      .jobs-offers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input[type="radio"]{
        }
        label{
          margin-bottom: 20px;
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
        input[type="radio"]:checked + label .button-gradient{
        }
      }
      .jobs-continue{
        justify-content: center;
        margin-top: 40px;
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
}
@media only screen and (max-width: 320px) {
  .name{
    p{
    } 
    .card-container{
      h2{
      }
      .fields{
        margin: 20px;
        .name-title{
          h3{
            font-size: 20px;
            line-height: 24px;
          }
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
    .radio-toolbar{
      .radio-button {
      }
      .jobs-title{
        h3{
          font-size: 20px;
          line-height: 24px;
        }
      }
      .jobs-offers{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input[type="radio"]{
        }
        label{
          margin-bottom: 20px;
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
            line-height: 30px;
            height: 100%;
          }
          .right-bracket{
            width: 16px;
            height: 42px;
          }
          .button-gradient{
            margin-left: 0px;
            margin-top: -1px;
            width: 192px;
          }
        }
        input[type="radio"]:checked + label .button-gradient{
        }
      }
      .jobs-continue{
        justify-content: center;
        margin-top: 40px;
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
            margin-left: 0px;
            margin-top: 1px;
            width: 192px;
          }
        }
      }
    }
  }
}
</style>