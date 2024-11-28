import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

export const getInvitations = async () => {
  const invitationsCol = collection(db, "invitations");
  const invitationSnapshot = await getDocs(invitationsCol);
  const invitationList = invitationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return invitationList;
};

// Nueva función para borrar una invitación específica
export const deleteInvitation = async (id: string) => {
  try {
    const invitationRef = doc(db, "invitations", id);
    await deleteDoc(invitationRef);
    console.log(`Invitation ${id} deleted from Firebase.`);
  } catch (error) {
    console.error("Error deleting invitation:", error);
  }
};

export { auth, db };