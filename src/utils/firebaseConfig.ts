import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Para Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAPJBKfnpcxHtkPkS18CH4mb9AeFCq_9nY",
    authDomain: "programacion-ec39e.firebaseapp.com",
    projectId: "programacion-ec39e",
    storageBucket: "programacion-ec39e.appspot.com",
    messagingSenderId: "136757147578",
    appId: "1:136757147578:web:57d88a0060a8c982564f83"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };