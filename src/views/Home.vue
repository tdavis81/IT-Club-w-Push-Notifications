<template>
  <v-ons-page>
    <div class="center-screen">
      <img src="../assets/burger.png">
    </div>
      <v-ons-list>
        <v-ons-list-header>Next Event Date</v-ons-list-header>
        <v-ons-list-item  :modifier="md ? 'nodivider' : ''">
          <label class="center">
          <v-ons-input style="width:100%" float maxlength="40"
              placeholder="Date"
              v-model="nextEventDate"
              type="text"
              readonly
          >
          </v-ons-input>
          </label>
        </v-ons-list-item>
      </v-ons-list>

    <v-ons-list>
     <v-ons-list-header>Items</v-ons-list-header>
      <v-ons-list-item v-for="(item,index) in items" :key="index" :modifier="md ? 'nodivider' : ''">
        <label>{{item.Title}} - ${{item.Price}}</label>
      </v-ons-list-item>
    </v-ons-list>
    
  </v-ons-page>
</template>


<script>
// @ is an alias to /src
import db from '@/db';
import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      items: [],
      nextEventDate: ''
    }
  },
  created () {
    db.collection(`Items`).get().then(querySnapshot =>{
      querySnapshot.forEach((doc)=>{
        this.items.push({
          Title: doc.data().Title,
          Price: doc.data().Price
        })
      })
    })
    db.collection(`Event`).get().then(querySnapshot =>{
      querySnapshot.forEach((doc)=>{
        this.nextEventDate = moment(doc.data().EventDate).format('llll')
      })
    })
  }
}
</script>

<style>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 23vh;
  margin-top:10px;
  margin-bottom:10px;
  
}</style>