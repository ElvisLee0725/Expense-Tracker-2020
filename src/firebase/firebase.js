import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAB68DI00Xv1bUDOn1GlOmjU_vjl5q-sQM",
    authDomain: "expense-tracker-2020-12cfa.firebaseapp.com",
    databaseURL: "https://expense-tracker-2020-12cfa.firebaseio.com",
    projectId: "expense-tracker-2020-12cfa",
    storageBucket: "expense-tracker-2020-12cfa.appspot.com",
    messagingSenderId: "158743949164",
    appId: "1:158743949164:web:9e99a8b8102fa3394e8d49",
    measurementId: "G-PFT6KPD2LE"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

const database = firebase.database();

// .ref() is like calling Table in MySQL or collection in MongoDB
// When nothing is passed, it refers to the root of database
database.ref().set({
    name: 'Elvis Lee',
    isSingle: false,
    age: 24,
    location: {
        city: 'Irvine',
        country: 'United States'
    }
});

database.ref('attributes').set({
    height: 180,
    weight: 158
}).then(() => {
    console.log('Data updated');
}).catch((error) => {
    console.log(error.message);
});