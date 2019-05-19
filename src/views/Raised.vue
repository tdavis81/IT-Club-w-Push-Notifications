<template>
  <v-ons-page>
    <v-ons-list>
     <v-ons-list-header>Total Raised As Of Date</v-ons-list-header>
      <v-ons-list-item :modifier="md ? 'nodivider' : ''">
        <label>{{date}}</label>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list>
     <v-ons-list-header>Money Goal</v-ons-list-header>
      <v-ons-list-item :modifier="md ? 'nodivider' : ''">
        <label>${{moneyGoal}}</label>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list>
     <v-ons-list-header>Net Spendings</v-ons-list-header>
      <v-ons-list-item :modifier="md ? 'nodivider' : ''">
        <label>${{netSpendings}}</label>
      </v-ons-list-item>
    </v-ons-list>
    <v-ons-list>
     <v-ons-list-header>Total Raised</v-ons-list-header>
      <v-ons-list-item :modifier="md ? 'nodivider' : ''">
        <label>${{money}}</label>
      </v-ons-list-item>
    </v-ons-list>
    <div class="center-screen">
        <div class="single-chart">
          <h2>Percentage Raised</h2>
          <svg style="display:none" viewBox="0 0 36 36" class="circular-chart blue">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle" :style="color"
              :stroke-dasharray="calculatedPercent"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            
            <text x="18" y="20.35" class="percentage">{{percentage}}%</text>
              
          </svg>
        <p style="font-size:1.5rem">{{percentage}}%</p>
        <p>
         <v-ons-progress-circular style="width:120px;height:120px" v-model="percentage"></v-ons-progress-circular>
        </p>
        
        
      </div>
    </div>
    
  </v-ons-page>
</template>

<script>
import moment from 'moment'
import db from '@/db';

export default {
  name: 'Raised',
  data () {
    return {
      money: 0,
      moneyGoal: 0,
      netSpendings: 0,
      percentage: 0,
      color:'stroke:green',
      date: moment().format('MMMM Do YYYY')
    }
  },
  computed: {
    calculatedPercent () {
      this.percentage = ((this.money / this.moneyGoal) * 100).toFixed(2);
      return `${this.percentage} ,100`;
    }
  },
  created () {
    db.collection(`Money`).get().then(querySnapshot =>{
      querySnapshot.forEach((doc)=>{
        this.money = doc.data().RaisedMoney
        this.moneyGoal = doc.data().MoneyGoal
        this.netSpendings = doc.data().MoneySpendings
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
  min-height: 0vh;
}

</style>