import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useContext';
import { db } from '../utils/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté bien
import { doc, getDoc } from 'firebase/firestore'; // Usa Firestore para obtener los datos del usuario

const useFirebaseLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useUser(); // Acceder al contexto de usuario
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setError(null); // Limpiar errores previos

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Aquí obtienes los datos del usuario de Firestore
            const userDocRef = doc(db, 'users', user.uid); // Asumiendo que los datos del usuario están en 'users'
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();

                // Crear un objeto con los datos del usuario
                const userInfo = {
                    uid: user.uid,
                    username: userData.username || '', // Si no tiene username, lo dejamos vacío
                    email: user.email || '',
                    img: userData.img || '', // Si no tiene imagen, lo dejamos vacío
                    accountAmount: userData.accountAmount || 0, // Si no tiene amount, lo dejamos en 0
                };

                // Actualiza el estado global con la información del usuario
                setUser(userInfo);

                // Redirige al usuario a la página principal
                navigate(`/main/${user.uid}`);
            } else {
                console.error('No such document!');
                setUser(null); // O manejar de alguna forma si no se encuentran los datos
            }
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            if (error.code === 'auth/wrong-password') {
                setError('Incorrect Password.');
            } else if (error.code === 'auth/user-not-found') {
                setError('There is no account associated with that email.');
            } else {
                setError('An error occurred while signing in.');
            }
        }
    };

    return { login, error };
};

export default useFirebaseLogin;
