<template>
  <v-ons-page>
    
    <!-- Login Modal -->
        <v-ons-modal :visible="showLoginModal">
        <div class="login" style="margin-top:5%">
            <img src="@/assets/burger.png" class="headerImage" style="margin-bottom:10%"/>
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <input type="email" v-model="user.email" class="fadeIn second" placeholder="Email" required>
                    <input type="password" v-model="user.password" class="fadeIn third" placeholder="Password" required>
                    <div class="row" style="margin-top:10px">
                        <div class="col-sm-6">
                            <input style="width:85%;text-align:center" type="submit" class="fadeIn fourth" value="Login" @click="checkUser()">
                        </div>
                    </div>
                    <p v-if="showError" style="color:red">Incorrect username or password.</p>
                    <v-ons-button v-if="!userLoggedIn" @click="showLoginModal = false" modifier="small" style="background-color:red" class="button-margin">Close</v-ons-button>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
        </v-ons-modal>

    <v-ons-button v-if="!userLoggedIn" @click="showModal()" modifier="large" style="background-color:red;margin-top:25px" class="button-margin">Login</v-ons-button>

    <div v-show="userLoggedIn"> 
        <v-ons-list>
            <v-ons-list-header v-if="!hideAdd">Add Item</v-ons-list-header>
            <v-ons-list-header v-if="hideAdd">Edit Item</v-ons-list-header>
            <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                <label class="center">
                <v-ons-input float maxlength="40"
                    placeholder="Item Title"
                    v-model="itemTitle"
                    type="text"
                >
                </v-ons-input>
                </label>
            </v-ons-list-item>
            <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                <label class="center">
                <v-ons-input float maxlength="40"
                    placeholder="Item Price"
                    v-model="itemPrice"
                    type="number"
                >
                </v-ons-input>
                </label>
            </v-ons-list-item>
            <v-ons-button v-if="!hideAdd" @click="addItem" modifier="large" class="button-margin">Add</v-ons-button>
            <v-ons-button v-if="hideAdd" @click="updateItem" modifier="large" class="button-margin">Update</v-ons-button>
        </v-ons-list>
        
        <v-ons-list>
        <v-ons-list-header>Items</v-ons-list-header>
        <v-ons-list-item v-for="(item,index) in items" :key="item.Key" :modifier="md ? 'nodivider' : ''">
            <label>{{item.Title}} - ${{item.Price}}</label>
            <v-ons-button style="margin-left:55px;margin-right:10px" @click="changeToUpdate(item.Key,index)" modifier="quiet" class="button-margin">Update</v-ons-button>
            <v-ons-button @click="deleteItem(item.Key,index)"  modifier="quiet" class="button-margin">Delete</v-ons-button>
        </v-ons-list-item>
        </v-ons-list>

        <v-ons-list>
          <v-ons-list-header>Set Goal</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                  <label class="center">
                  <v-ons-input float maxlength="40"
                      placeholder="Money Goal"
                      v-model="moneyGoal"
                      type="number"
                  >
                  </v-ons-input>
                  </label>
              </v-ons-list-item>
          <v-ons-button @click="updateGoal" modifier="large" class="button-margin">Update Goal</v-ons-button>
        </v-ons-list>

         <v-ons-list>
          <v-ons-list-header>Update Net Spendings</v-ons-list-header>
          <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                  <label class="center">
                  <v-ons-input float maxlength="40"
                      placeholder="Net Spendings"
                      v-model="netSpendings"
                      type="number"
                  >
                  </v-ons-input>
                  </label>
              </v-ons-list-item>
          <v-ons-button @click="updateNetSpendings" modifier="large" class="button-margin">Update Net Spendings</v-ons-button>
        </v-ons-list>

        <v-ons-list>
        <v-ons-list-header>Update Money Raised</v-ons-list-header>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                <label class="center">
                <v-ons-input float maxlength="40"
                    placeholder="Money Raised"
                    v-model="moneyRaised"
                    type="number"
                >
                </v-ons-input>
                </label>
            </v-ons-list-item>
        <v-ons-button  @click="updateMoneyRaised()" modifier="large" class="button-margin">Update Money Raised</v-ons-button>
        </v-ons-list>

        <v-ons-list>
        <v-ons-list-header>Next Event Date</v-ons-list-header>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                <label class="center">
                <v-ons-input float maxlength="40"
                    placeholder="Date"
                    v-model="nextEventDate"
                    type="text"
                >
                </v-ons-input>
                </label>
            </v-ons-list-item>
        <v-ons-button  @click="updateEventDate()" modifier="large" class="button-margin">Update Next Event Date</v-ons-button>
        </v-ons-list>

        <v-ons-list>
        <v-ons-list-header>Send Push Notification</v-ons-list-header>
        <v-ons-list-item :modifier="md ? 'nodivider' : ''">
                <label class="center">
                <v-ons-input style="width:100%" float maxlength="200"
                    placeholder="Message"
                    v-model="pushMessage"
                    type="text"
                >
                </v-ons-input>
                </label>
            </v-ons-list-item>
        <v-ons-button  @click="sendPushNotifications()" modifier="large" class="button-margin">Send</v-ons-button>
        <v-ons-button  @click="logout()" style="background-color:red;margin-top:15px" modifier="large" class="button-margin">Logout</v-ons-button>
        </v-ons-list>

        
    </div>
    
  </v-ons-page>
</template>


<script>
// @ is an alias to /src
import db from '@/db';
import firebase from 'firebase'

export default {
  name: 'admin',
  data () {
    return {
      hideAdd: false,
      items: [],
      moneyGoal: 0,
      moneyRaised: 0,
      netSpendings: 0,
      itemTitle: '',
      itemPrice: 0,
      editingDocId: 0,
      editingIndex: 0,
      user: {
        email: '',
        password: '',
        displayName: ''
      },
      showError: false,
      showLoginModal: false,
      userLoggedIn: false,
      nextEventDate: '',
      pushMessage: '',
    }
  },
  methods: {
    // Display Login Modal
    showModal() 
    {
      this.showLoginModal = true;
    },

    // Check User Credentials On Login Button In Modal
    checkUser() 
    {
      firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password).then(
        () => {
          location.reload()
        },
        () => {
          this.showError = true;
        }
      )
    },
    logout () {
      firebase.auth().signOut().then(() => {
        location.reload();
        this.$store.commit('tabbar/set', 0);
      }).catch(function(error) {
        // An error happened.
      });
    },
    deleteItem (docId,index) {
      if (this.userLoggedIn) {
        db.collection("Items").doc(docId).delete().then(() => {
            this.items.splice(index,1);
            alert('Item has been deleted')
        }).catch(function(error) {
            alert("Error removing item: ", error);
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    changeToUpdate (docId,index) {
        let item = this.items.find(x => x.Key == docId);
        this.itemTitle = item.Title;
        this.itemPrice=  item.Price;
        this.hideAdd = true;
        this.editingDocId = docId
        this.editingIndex = index
    },
    updateItem() {
      if (this.userLoggedIn) {
        db.collection('Items').doc(this.editingDocId).update({
          Title: this.itemTitle,
          Price: this.itemPrice
        }).then(() => {
            this.items[this.editingIndex].Title = this.itemTitle
            this.items[this.editingIndex].Price = this.itemPrice
            this.hideAdd = false;
            this.itemPrice = ''
            this.itemTitle = ''
            alert('Item has been updated.')
        })
        .catch((error) => {
          alert('Error, Item not updated.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    addItem () {
      if (this.userLoggedIn) {
        db.collection('Items').doc().set({
          Title: this.itemTitle,
          Price: this.itemPrice,
        }).then(() => {
            this.items.push({
                Title: this.itemTitle,
                Price: this.itemPrice
            })
            alert('Item Added')
        })
        .catch((error) => {
          alert('Error, Item not added.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    updateNetSpendings () {
      if (this.userLoggedIn) {
        db.collection('Money').doc('huYHwNiFs6n7dQX9yKOp').update({
          MoneySpendings: this.netSpendings,
        }).then(function() {
          alert('Spendings has been updated.')
          location.reload();
        })
        .catch(function(error) {
          alert('Error, Spendings not updated.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    updateGoal () {
      if (this.userLoggedIn) {
        db.collection('Money').doc('huYHwNiFs6n7dQX9yKOp').update({
          MoneyGoal: this.moneyGoal,
        }).then(function() {
          alert('Goal has been updated.')
          location.reload();
        })
        .catch(function(error) {
          alert('Error, Goal not updated.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    updateMoneyRaised () {
      if (this.userLoggedIn) {
        db.collection('Money').doc('huYHwNiFs6n7dQX9yKOp').update({
          RaisedMoney: this.moneyRaised
        }).then(function() {
          alert('Money Raised has been updated.')
          location.reload();
        })
        .catch(function(error) {
          alert('Error, Money Raised not updated.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    updateEventDate () {
      if (this.userLoggedIn) {
        db.collection('Event').doc('uJRak0UNinTi5YIVh33a').update({
          EventDate: this.nextEventDate
        }).then(() => {
          alert('Next Event Date has been updated.')
          location.reload();
        })
        .catch(function(error) {
          alert('Error, Event Date not updated.')
        });
      } else {
        alert('Not Authenticated')
      }
        
    },
    sendPushNotifications () {
      fetch('https://itclub-push-notifications--tdavis81.repl.co/sendNotifications/' + this.pushMessage)
      this.pushMessage = '';
      alert('Message Sent.')
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      { 
        this.userLoggedIn = true;
        db.collection(`Items`).get().then(querySnapshot =>{
            querySnapshot.forEach((doc)=>{
                this.items.push({
                Title: doc.data().Title,
                Price: doc.data().Price,
                Key: doc.id
                })
            })
        })
        db.collection(`Money`).get().then(querySnapshot =>{
            querySnapshot.forEach((doc)=>{
                this.moneyRaised = doc.data().RaisedMoney
                this.moneyGoal = doc.data().MoneyGoal
                this.netSpendings = doc.data().MoneySpendings
            })
        })
         db.collection(`Event`).get().then(querySnapshot =>{
            querySnapshot.forEach((doc)=>{
                this.nextEventDate = doc.data().EventDate
            })
        })
      } 
      else 
      {
        this.user.email = '';
        this.user.password = '';
        this.userLoggedIn = false;
      }
    });

  }
}
</script>

<style scoped>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 23vh;
  margin-top:10px;
  margin-bottom:10px;
  
}

.headerImage {
  width:45%;
  height:25%;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
  overflow-x: hidden;
  width: 100%;
  position: relative
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: green;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 10px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=email], input[type=password] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}



</style>