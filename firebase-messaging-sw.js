// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
// import { getMessaging, onMessage,  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js";
// import { firebaseConfig } from "./firebaseConfig.js";

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // onBackgroundMessage(messaging, (payload) => {
// //     console.log('Received background message: ', payload);
// //     const notificationTitle = payload.notification.title;
// //     const notificationOptions = {
// //         body: payload.notification.body,
// //         icon: 'images/Algos circle logo.png',
// //     };

// //     self.registration.showNotification(notificationTitle, notificationOptions);
// // });

// onMessage(messaging, (payload) => {
//     console.log('Received background message: ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: 'images/Algos circle logo.png',
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging-compat.js');
// importScripts('./firebaseConfig.js');

firebase.initializeApp({
    apiKey: "AIzaSyA7QgHIxT-Wrkgj50kBl0TsEtJLH3DnMlQ",
    authDomain: "sports-algos.firebaseapp.com",
    projectId: "sports-algos",
    storageBucket: "sports-algos.appspot.com",
    messagingSenderId: "571917601507",
    appId: "1:571917601507:web:ead82536696960b25893d6",
    measurementId: "G-XL5YKFPEDK"
});

const messaging = firebase.messaging();

// messaging.onMessage(function(payload) {
//     console.log('Received background message: ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: 'images/Algos circle logo.png',
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'images/Algos circle logo.png',
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
