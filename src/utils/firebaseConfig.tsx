import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAPJBKfnpcxHtkPkS18CH4mb9AeFCq_9nY",
    authDomain: "programacion-ec39e.firebaseapp.com",
    projectId: "programacion-ec39e",
    storageBucket: "programacion-ec39e.appspot.com",
    messagingSenderId: "136757147578",
    appId: "1:136757147578:web:57d88a0060a8c982564f83"
  };


export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const shop = getFirestore(app);

export const receiptsCollection = collection(db, "receipts");
export const eventsCollection = collection(db, "events");

export const getInvitations = async () => {
  const invitationsCol = collection(db, "invitations");
  const invitationSnapshot = await getDocs(invitationsCol);
  const invitationList = invitationSnapshot.docs.map((doc) => doc.data());
  return invitationList;
};

export const getItems = async () => {
  const itemsCollection = collection(shop, "shopping"); 
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data() 
  }));
  return itemsList;
};


export { auth, db, shop };