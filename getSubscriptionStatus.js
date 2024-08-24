// import { FirebaseApp } from "firebase/app";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { collection, getFirestore, onSnapshot, query, where } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

export const getSubscriptionStatus = async (app) => {
  const auth = getAuth(app);
  const userId = auth.currentUser.uid;
  if (!userId) throw new Error("User not logged in");

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionsRef,
    where("status", "in", ["trialing", "active"])
  );

  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // In this implementation we only expect one active or trialing subscription to exist.
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active subscriptions found");
          resolve(false);
        } else {
          console.log("Active subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};