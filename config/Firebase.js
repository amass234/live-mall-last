import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB8wlO7CJwurY0r8klyfWIjJw3KbSbW9rQ",
    authDomain: "livemall-ffe7b.firebaseapp.com",
    databaseURL: "https://livemall-ffe7b.firebaseio.com",
    projectId: "livemall-ffe7b",
    storageBucket: "livemall-ffe7b.appspot.com",
    messagingSenderId: "506375916759"
};

const Firebase = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
Firebase.firestore().settings({ timestampsInSnapshots: true })

export default Firebase;