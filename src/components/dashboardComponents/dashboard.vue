<template>
  <div class="dashboard-context">
    <h2>Recente kandidaten</h2>
    <div class="dashboard-cards">
      <li v-for="message in messages" :key="message.id" class="dashboard-cards-items">
        <div class="dashboard-card">
          <div class="dashboard-name">
            <h3>{{ message.name }}</h3>
            <img src="@/assets/img/extra_person_icon.svg" alt="extra person icon">
          </div>
          <div class="time">{{ message.timestamp }}</div>
          <div class="results">
            <h3>Snel overzicht</h3>
            <span><p><b>Functie:</b> Backend</p></span>
            <span><p><b>Resultaten:</b> {{ message.content }}</p></span>
            <span><p><b>Tijd:</b> 10:23 mins</p></span>
            <span><p><b>Datum:</b> 15 Mei 2020 14:54</p></span>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'
import 'moment/locale/nl';

  export default {
    name: 'dashboard',
    data(){
      return{
        tests: [],
        messages: [],
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

h2{
  padding: 1.5rem;
  text-align: left;
}
.dashboard-context{
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
  .dashboard-cards{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    .dashboard-cards-items{
      display: flex;
      padding: 1.5rem;
      width: 25%;
      .dashboard-card{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0px 8px 32px rgba(0, 48, 117, 0.08);
        border-radius: 6px;
        padding: 30px;
        width: 100%;
        .dashboard-name{
          display: flex;
          justify-content: space-between;
        }
        h3{
          text-transform: capitalize;
          text-align: left;
        }
        .time{
          font-weight: 400;
          letter-spacing: 1px;
          font-size: 10px;
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
            font-size: 14px;
            line-height: 18px;
            color: #44556E;
            text-align: left;
          }
        }
      }
    }
  }
}

//MEDIA QUERIES
@media only screen and (max-width: 1200px) {
  h2{
  }
  h3{
  }

  .dashboard-context{
    h2{
    }
    .dashboard-cards{
      .dashboard-cards-items{
        width: 33.3333%;
        .dashboard-card{
          .dashboard-name{
          }
          h3{
          }
          .time{
          }
          .results{
            h3{
            }
            b{
            }
            span{
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  h2{
  }
  h3{
  }
  .dashboard-context{
    h2{
    }
    .dashboard-cards{
      .dashboard-cards-items{
        width: 50%;
        .dashboard-card{
          .dashboard-name{
          }
          h3{
          }
          .time{
          }
          .results{
            h3{
            }
            b{
            }
            span{
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  h2{
  }
  h3{
  }
  
  .dashboard-context{
    h2{
    }
    .dashboard-cards{
      .dashboard-cards-items{
        padding: 0.75rem;
        width: 100%;
        .dashboard-card{
          .dashboard-name{
          }
          h3{
          }
          .time{
          }
          .results{
            h3{
            }
            b{
            }
            span{
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 480px) {
    h2{
  }
  h3{
  }
  .dashboard-context{
    h2{
    }
    .dashboard-cards{
      .dashboard-cards-items{
        width: 100%;
        .dashboard-card{
          .dashboard-name{
          }
          h3{
          }
          .time{
          }
          .results{
            h3{
            }
            b{
            }
            span{
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 320px) {
}
</style>
