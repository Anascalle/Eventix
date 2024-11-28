import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../utils/firebaseConfig'; // Asegúrate de tener la configuración de Firebase correcta
import { doc, getDoc } from 'firebase/firestore'; // Usa Firestore para obtener los datos del usuario

interface User {
    uid: string;
    img?: string;
    username: string;
    email: string;
    accountAmount: number;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async (uid: string) => {
            const userDocRef = doc(db, 'users', uid); // Asumiendo que los usuarios están en una colección 'users'
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser({
                    uid: userData.uid,
                    username: userData.username || 'Guest', // Si no hay username, asignar 'Guest'
                    email: userData.email,
                    img: userData.img || '', // Si no hay img, asignar una cadena vacía o un valor predeterminado
                    accountAmount: userData.accountAmount || 0, // Asigna un valor predeterminado si no existe accountAmount
                });
            } else {
                console.error('No such document!');
                setUser(null); // O manejar de otra forma, como asignar valores predeterminados
            }
        };

        const userId = 'quMBLJzSb2cY49eDz2QcqDmhy742'; // Este ID debe venir de la autenticación del usuario
        
        if (userId) {
            fetchUserData(userId);
        }
    }, []); // Este efecto solo se ejecutará una vez cuando el componente se monte

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
