import firebase from 'firebase'
import 'firebase/firestore'
import db from '@/db';

//const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDCG7agWQb9KOHe-aARPLGLwrN7r5260a4",
  authDomain: "fortnitetv-26656.firebaseapp.com",
  databaseURL: "https://fortnitetv-26656.firebaseio.com",
  projectId: "fortnitetv-26656",
  storageBucket: "fortnitetv-26656.appspot.com",
  messagingSenderId: "296425214337",
  appId: "1:296425214337:web:f5495f606032bc2c"
  };
const firebaseapp = firebase.initializeApp(config)

let isAndroid = /(android)/i.test(navigator.userAgent);
let isIphone = /(iphone)/i.test(navigator.userAgent)

if (!isIphone) {
  const messaging = firebase.messaging();

  messaging.usePublicVapidKey("BCKasHrDkLoVL9yDZzZ9YpePzVypEPf8pQzDLD3LiltOiQdWPnws0ds_MGjoQsIJSYlNz_mWTQjYyIw5iY6QWJo"); // 1. Generate a new key pair

  // Request Permission of Notifications
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');

    // Get Token
    let isFound = false;
    messaging.getToken().then((token) => {
      db.collection(`Tokens`).get().then(querySnapshot =>{
        for (var i in querySnapshot.docs) {
          const doc = querySnapshot.docs[i]
          if(doc.data().Token === token) {
            isFound = true;
            break;
          }
        }
      }).then(() => {
        if(!isFound) {
          db.collection('Tokens').doc().set({
            Token: token
          })
        }
      })

      
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });

  messaging.onMessage((payload)=> {
    alert(payload.data.message)
  })

}

export default firebaseapp.firestore()