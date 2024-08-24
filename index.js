import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

const navToggle = document.querySelector(".nav-toggle");
const navClosedIcon = document.querySelector("#navClosed");
const navOpenIcon = document.querySelector("#navOpen");
const navIcon = document.querySelectorAll(".navIcon");
const nav = document.querySelector(".navbar-nav");
const navbar = document.querySelector(".navbar");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  navbar.classList.toggle("border");
  navIcon.forEach((icon) => {
    icon.classList.toggle("hidden");
  });
});

window.addEventListener(
  "resize", () => {
    if (document.body.clientWidth > 768) {
      nav.classList.remove("open");
      navbar.classList.remove("border");
      navIcon.forEach((icon) => {
        icon.classList.remove("hidden");
      });
      navOpenIcon.classList.add("hidden");
    }
  },
  { passive: false }
);

showPopup();

function showPopup() {
  const popup = document.getElementById('enable-notifications');
  const allowNotificationBtn = document.getElementById('allow');
  const cancelNotificationBtn = document.getElementById('cancel');

  if (!localStorage.getItem('notificationPopupShown')) {
    setTimeout(() => {
      popup.classList.add('show');
    }, 2000);
  }

  allowNotificationBtn.addEventListener('click', () => {
      requestNotificationPermission();
  });

  cancelNotificationBtn.addEventListener('click', () => {
      popup.style.display = "none";
      localStorage.setItem('notificationPopupShown', 'true');
  });
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

let swRegistration;
if ('serviceWorker' in navigator) {
  try {
    swRegistration = await navigator.serviceWorker.register("firebase-messaging-sw.js");
    console.log('Service Worker registered with scope:', swRegistration.scope);
  } catch (error) {
    console.error('Service Worker registration failed: ', error);
  }
}

async function requestNotificationPermission() {
  if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
  }

  await Notification.requestPermission().then((permission) => {
      console.log(permission);
      const popup = document.getElementById('enable-notifications');
      if (permission === "granted") {
          console.log("Notification permission granted.");
          getAndStoreFCMToken();
      } else if (permission === "denied") {
          console.log("Notification permission denied.");
      } else {
        console.log("Notification permission default (dismissed)");
      }
      popup.style.display = "none";
      localStorage.setItem('notificationPopupShown', 'true');
  });
}

async function getAndStoreFCMToken() {
  if (swRegistration) {
    try {
      const currentToken = await getToken(messaging, { serviceWorkerRegistration: swRegistration, vapidKey: 'BM7cwM5gTHsAiexNg1DbLtWEeiHuoiGQUs3QZlaxM42IwU5oHYM9o5ovK7vXlSyOt4ah6vuW6eXMbXUQR8nkFQ8' });
      if (currentToken) {
        // console.log('FCM Token:', currentToken);
        await addDoc(collection(db, 'tokens'), { token: currentToken })
          .then(() => {
            console.log('FCM Token stored in Firestore');
          })
          .catch((error) => {
            console.error('An error occurred while storing token in Firestore: ', error);
          });
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.error('An error occurred while retrieving FCM token: ', err);
    }
  } else {
    console.error('Service Worker registration not available');
  }
}