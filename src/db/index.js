import firebase from 'firebase'
import 'firebase/firestore'
import db from '@/db';

//const settings = {timestampsInSnapshots: true};

const config = {
  api
  };
const firebaseapp = firebase.initializeApp(config)

let isAndroid = /(android)/i.test(navigator.userAgent);
let isIphone = /(iphone)/i.test(navigator.userAgent)

if (!isIphone) {
  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(""); // 1. Generate a new key pair

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
