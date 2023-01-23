import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDAbYEoC7lAw82PHOkuqfpvffHzKNZEh-4",
  authDomain: "my-resturent-4347e.firebaseapp.com",
  databaseURL: "https://my-resturent-4347e-default-rtdb.firebaseio.com",
  projectId: "my-resturent-4347e",
  storageBucket: "my-resturent-4347e.appspot.com",
  messagingSenderId: "279248861777",
  appId: "1:279248861777:web:c3f6c87c27d1e54c541670",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
