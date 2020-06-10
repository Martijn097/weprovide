<template>
  <div class="new-message">
    <form class="field" @submit.prevent="addMessage">
      <input class="input-label" type="text" name="new-message" v-model="newMessage" placeholder="Typ hier de code">
      <p v-if="feedback">{{ feedback }}</p>
    </form>
    <div @click="addMessage" class="code-btn">enter</div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewMessage',
  props: ['name', 'jobs'], 
  data(){
    return{
      newMessage: null,
      feedback: null,
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage === '4294'){
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          jobs: this.jobs,
          timestamp: Date.now()
        }).then(() => {
          this.$router.push({ name: 'Congratulations' })
        }).catch(err => {
          console.log(err)
        })
      } else{
        this.feedback = "FOUT"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.play{
  .field{
    display: block;
    text-align: left;
    margin-bottom: 20px;
    p{
      color: red;
      font-family: Futura;
      text-transform: uppercase;
      font-size: 40px;
      font-weight: bolder;
    }
    .input-label{
      font-family: Futura;
      text-transform: uppercase;
      padding-left: 35px;
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
      border-bottom: 2px solid white;
      transition: all 0.25s ease 0s;
      &:focus{
        color: white;
        transition: all 0.5s ease 0s;
      }
    }      
    &:before{
      content: url("~@/assets/img/edit.png");
      width: 16px;
      height: 16px;
      display: block;
      position: absolute;
      margin-top: 14px;
    }
  } 
  .code-btn{
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 10px 60px;
    height: 50px;
    box-sizing: border-box;
    width: auto;
    color: black;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bolder;
    font-family: futura;
    background-color:white;
    transition: opacity 0.3s;
    &:hover{
      opacity: 0.7;
    }
  }
}
</style>