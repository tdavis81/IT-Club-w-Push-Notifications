let isAndroid = /(android)/i.test(navigator.userAgent);
let isIphone = /(iphone)/i.test(navigator.userAgent)
if(!isIphone) {
  importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

  const config = {
   
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
