import { createBrowserRouter } from 'react-router-dom';
import LandingScreen from '../screens/Landing';

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <LandingScreen/>, 
  },
  
]);