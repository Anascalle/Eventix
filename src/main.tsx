import { router } from './navegation/main.tsx'; 
import { RouterProvider } from 'react-router-dom'; 
import { createRoot } from 'react-dom/client'; 
import './index.css'; 
import { UserProvider } from './context/useContext.tsx';
import { Toaster } from 'react-hot-toast'; // Importa el Toaster

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <Toaster /> 
    <RouterProvider router={router} />
  </UserProvider>
);
