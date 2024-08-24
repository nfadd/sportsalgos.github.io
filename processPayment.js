// import { FirebaseApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { addDoc, collection, getFirestore, onSnapshot} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-functions.js";

export const getCheckoutUrl = async (app, priceId) => {
  const auth = getAuth(app);
  const userId = auth.currentUser.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    // success_url: window.location.origin,
    success_url: "https://sportsalgos.github.io/login.html",
    // cancel_url: window.location.origin,
    cancel_url: "https://sportsalgos.github.io/subscribe.html",
  });

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data();
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (app) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  let dataWithUrl;
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-live-createPortalLink"
    );
    const { data } = await functionRef({
      customerId: user.uid,
      returnUrl: window.location.origin,
    });

    dataWithUrl = data.url;
    console.log("Reroute to user portal: ", dataWithUrl);
  } catch (error) {
    console.error(error);
  }

  return new Promise((resolve, reject) => {
    if (dataWithUrl) {
      resolve(dataWithUrl);
    } else {
      reject(new Error("No url returned"));
    }
  });
};