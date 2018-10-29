import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBSRHmr5K9FJbM2cK2nMJKlmdOWg6WiI1Y",
  authDomain: "nba-app-f746b.firebaseapp.com",
  databaseURL: "https://nba-app-f746b.firebaseio.com",
  projectId: "nba-app-f746b",
  storageBucket: "nba-app-f746b.appspot.com",
  messagingSenderId: "180882680122"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseVideos = firebaseDB.ref('videos');
const firebaseTeams = firebaseDB.ref('teams');

const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  });
  return data;
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseVideos,
  firebaseTeams,
  firebaseLooper
}