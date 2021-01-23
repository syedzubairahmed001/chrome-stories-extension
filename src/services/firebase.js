import  firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});


export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = async () => auth.signInWithPopup(provider);

export default firebase;
