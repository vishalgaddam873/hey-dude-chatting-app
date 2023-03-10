import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCxCER1QgXyAWhspkPr5pISDHOiZGLgAvs',
  authDomain: 'tynker-chatting-app-m8.firebaseapp.com',
  databaseURL: 'https://tynker-chatting-app-m8-default-rtdb.firebaseio.com',
  projectId: 'tynker-chatting-app-m8',
  storageBucket: 'tynker-chatting-app-m8.appspot.com',
  messagingSenderId: '569964079448',
  appId: '1:569964079448:web:7b83f263bee08cd1e89d2d',
  measurementId: 'G-N3CQWWSDS1',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default firebase;
