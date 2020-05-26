<template>
  <div class="dashboard-page">
    <Navbar />
    <div class="dashboard-container">
      <div class="dashboard-context">
        <h2>Recente kandidaten</h2>
        <div class="dashboard-cards">
          <div class="dashboard-card" v-for="message in messages" :key="message.id">
            <h3>{{ message.name }}</h3>
            <div class="time">{{ message.timestamp }}</div>
            <div class="results">
              <h3>Quick results</h3>
              <span><p><b>Functie:</b> Backend</p></span>
              <span><p><b>Results:</b> {{ message.content }}</p></span>
              <span><p><b>Time:</b> 10:23 mins</p></span>
              <span><p><b>Date:</b> 15 Mei 2020 14:54</p></span>
            </div>
          </div>
          <!-- <div class="dashboard-card" v-for="test in tests" :key="test.id">
            <h3>{{ test.name }}</h3>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'
import 'moment/locale/nl';

export default {
  name: 'Dashboard',
  components: {
      Navbar
  },
  data(){
    return{
      tests: [],
      messages: []
    }
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp')

    db.collection('tests').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let test = doc.data()
        test.id = doc.id
        this.tests.push(test)
      })
    }),

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('ll'),
          })
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
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
  background-color: #F7F8F8;
  color: black;
  height: 100vh;
  width: 100%;
  .dashboard-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;  
    position: relative;
    top: 80px;
    height: calc(100% - 80px);
    .dashboard-context{
      width: 1400px;
      h2{
        margin-bottom: 20px;
        text-align: left;
      }
      .dashboard-cards{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .dashboard-card{
          width: 320px;
          height: 320px;
          background-color: white;
          box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
          border-radius: 6px;
          padding: 30px;
          margin-right: 40px;
          margin-bottom: 40px;
          &:before{
            content: url("~@/assets/img/extra_person_icon.svg");
            display: block;
            position: absolute;
            margin-left: 240px;
          }
          &:nth-child(4n){
            margin-right: 0px;
          }
          h3{
            text-transform: capitalize;
            text-align: left;
          }
          .time{
            font-weight: 400;
            letter-spacing: 1px;
            font-size: 14px;
            color: #44556E;
            text-align: left;
          }
          .results{
            text-align: left;
            margin-top: 40px;
            h3{
              margin-bottom: 10px;
            }
            b{
              font-weight: bolder;
            }
            span{
              font-weight: 400;
              letter-spacing: 1px;
              font-size: 16px;
              line-height: 20px;
              color: #44556E;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>