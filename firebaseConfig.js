// firebaseConfig.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDgBYGt5QFyzplDVDrsnsJ0E0W_-knE4Hw",
  authDomain: "to-dolist-3d0b6.firebaseapp.com",
  projectId: "to-dolist-3d0b6",
  storageBucket: "to-dolist-3d0b6.appspot.com",
  messagingSenderId: "146076895733",
  appId: "1:146076895733:web:6a042395a7be9ac970b8bc",
  measurementId: "G-Y0S7W6PB1R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
