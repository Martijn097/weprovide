<template>
  <div class="jobs">
    <div class="radio-toolbar">

      <div class="jobs-title">
        <h3>SELECTEER DE FUNCTIE WAARVOOR JE SOLLICITEERT</h3>
      </div>
      <div class="jobs-offers">
        <input type="radio" id="test" name="test" value="frontend" v-model="job">
        <label for="test">
          <div class="left-bracket"></div>
          <div class="start-button-label">Frontend</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input type="radio" id="test2" name="test" value="backend" v-model="job">
        <label for="test2">
          <div class="left-bracket"></div>
          <div class="start-button-label">Backend</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input type="radio" id="test3" name="test" value="devops" v-model="job">
        <label for="test3">
          <div class="left-bracket"></div>
          <div class="start-button-label">Devops</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>   
      </div>

      <div class="jobs-continue">
        <button @click="displayRadioValue" v-show="job === 'frontend'" type="button" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </button>
        <button @click="displayRadioValue" v-show="job === 'backend'" type="button" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </button>
        <button @click="displayRadioValue" v-show="job === 'devops'" type="button" class="start-button">
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

export default {
  name: 'Jobs',
  props: ['name'],
  data(){
    return{
      x: '',
      jobs: null,
      job: null,
    }
  },
  components: {
  },
  mounted(){
  },
  methods: {
    displayRadioValue(){
    var ele = document.getElementsByTagName('input'); 
      
    var i;
    for(i = 0; i < ele.length; i++) { 
      if(ele[i].type="radio") { 
        if(ele[i].checked) 
          db.collection('hoi').add({
            jobs: this.job
          }).then(() => {
            this.$router.push({ name: 'Play', params: { name: this.firstname + ' ' + this.lastname }})
          }).catch(err => {
            console.log(err)
          })
        }
      } 
    },
    doDit(e){
     
    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  display: block;
}
.jobs{
  width: 100vw;
  height: 100vh;
  font-family: Futura;
  text-transform: uppercase;
  .radio-toolbar{
    margin: 0 auto;
    margin-top: 16rem;
    width: 800px;
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
  .jobs{
    .radio-toolbar{
      width: 100%;
      margin: 0 auto;
      margin-top: 12em;
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
  .jobs{
    .radio-toolbar{
      margin-top: 12em;
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
  .jobs{
    .radio-toolbar{
      margin-top: 8em;
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
  .jobs{
    .radio-toolbar{
      margin-top: 6em;
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
  .jobs{
    .radio-toolbar{
      margin-top: 6em;
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