let isAndroid = /(android)/i.test(navigator.userAgent);
let isIphone = /(iphone)/i.test(navigator.userAgent)
if(!isIphone) {
  importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

  const config = {
    apiKey: "AIzaSyDCG7agWQb9KOHe-aARPLGLwrN7r5260a4",
    authDomain: "fortnitetv-26656.firebaseapp.com",
    databaseURL: "https://fortnitetv-26656.firebaseio.com",
    projectId: "fortnitetv-26656",
    storageBucket: "fortnitetv-26656.appspot.com",
    messagingSenderId: "296425214337",
    appId: "1:296425214337:web:f5495f606032bc2c"
    };
  firebase.initializeApp(config)

  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler((payload) => {
    console.log(payload)
    const title = 'IT Club Alert';
    const options = { 
      body: payload.data.message
    };
    return self.registration.showNotification(title,options)
  })


}
