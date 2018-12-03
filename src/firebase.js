import firebase from 'firebase'
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBbJGvW1p6yTVhZMlJcJIkdwQEIPz1dQFI",
    authDomain: "fams-224116.firebaseapp.com",
    databaseURL: "https://fams-224116.firebaseio.com",
    projectId: "fams-224116",
    storageBucket: "fams-224116.appspot.com",
    messagingSenderId: "529352510116"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default firebase
