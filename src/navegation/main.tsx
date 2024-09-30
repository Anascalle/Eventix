import { createBrowserRouter } from 'react-router-dom';
import LandingScreen from '../screens/Landing/Landing';
import DetailScreen from '../screens/Detail/Detail';
import Main from '../screens/Main/Main';

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <LandingScreen/>, 
  },
  {
    path: '/Main', 
    element: <Main/>, 
  },
  {
    path: '/Detail', 
    element: <DetailScreen/>, 
  },
  
]);