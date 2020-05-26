<template>
  <div class="jobs">
      <div class="radio-toolbar">

        <h3>SELECTEER DE FUNCTIE WAARVOOR JE SOLLICITEERT</h3>
        <input type="radio" id="test" name="test" value="frontend" v-model="x">
        <label for="test">
          <div class="left-bracket"></div>
          <div class="start-button-label">Frontend</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input checked="checked" type="radio" id="test2" name="test" value="backend" v-model="x">
        <label for="test2">
          <div class="left-bracket"></div>
          <div class="start-button-label">Backend</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>

        <input type="radio" id="test3" name="test" value="devops" v-model="x">
        <label for="test3">
          <div class="left-bracket"></div>
          <div class="start-button-label">Devops</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </label>   
    
        <router-link v-on:click="doDit" :to="({ name: 'Play', params: { jobs: this.jobs }})" v-show="x === 'frontend'" v-model="frontend" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </router-link>

        <router-link v-on:click="doDit" :to="({ name: 'Play', params: { jobs: this.jobs }})" v-show="x === 'backend'" v-model="backend" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </router-link>

        <router-link v-on:click="doDit" :to="({ name: 'Play', params: { jobs: this.jobs }})" v-show="x === 'devops'" v-model="devops" class="start-button">
          <div class="left-bracket"></div>
          <div class="start-button-label">Play</div>
          <div class="right-bracket"></div>
          <div class="button-gradient"></div>
        </router-link>

      </div>
  </div>
</template> 

<script>
export default {
  name: 'Jobs',
  data(){
    return{
      x: '',
      jobs: null,
      frontend: null,
      backend: null,
      devops: null,
    }
  },
  components: {
  },
  mounted(){
  },
  methods: {
    doDit(e){
      db.collection('hoi').add({
        jobs: this.frontend
      }).catch(err => {
        console.log(err)
      })
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Futura;
  text-transform: uppercase;
  .radio-toolbar input[type="radio"]{
    opacity: 0;
    position: fixed;
    width: 0;
  }
  .radio-toolbar label{
    cursor: pointer;
    position: relative;
    display: inline-block;
    height: 50px;
    box-sizing: border-box;
    text-align: left;
    margin-top: 40px;
    margin: 0 20px;
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
      margin-left: 1px;
      width: 242px;
      height: calc(100% - 0px);
      border: 2px solid;
      -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
      border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
      opacity: 0;
      transition: opacity .3s ease-out;
    }
  }
  .radio-toolbar input[type="radio"]:checked + label .button-gradient {
    opacity: 1;
  }
  // .radio-toolbar input[type="radio"]:focus + label .start-button-label{
  //   color: black;
  // }
  // .radio-toolbar input[type="radio"]:focus + label .button-gradient{
  //   border: none;
  // }
  // .radio-toolbar input[type="radio"]:focus + label {
  //   color: black;
  //   background-color: #EFD15B;
  //   z-index: 100;
  // }
  .radio-toolbar{
    margin: 0 auto;
    width: 1400px;
    margin: 100px;
    .radio-button {
      margin: 0 20px;
    }
  }
}


.start-button{
  cursor: pointer;
  position: relative;
  display: inline-block;
  height: 50px;
  box-sizing: border-box;
  text-align: left;
  margin-top: 100px;
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
    margin-left: 1px;
    width: 242px;
    height: calc(100% - 0px);
    border: 2px solid;
    -o-border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
    border-image: linear-gradient(180deg,white 0,#EFD15B 50%,#EFD15B) 2;
    opacity: 0;
    transition: opacity .3s ease-out;
  }
}
</style>