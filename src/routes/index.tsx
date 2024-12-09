import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '../views/Home';
import Settings from '../views/Settings';
import DashBoard from '../views/Dashboard';
import PainelEstatistico from '../views/PainelEstatistico';
import NotFound from '../views/NotFound';
import SignIn from '../views/SingIn';
import SignUp from '../views/SignUp';
import Form from '../views/Form';

const router = createBrowserRouter([
  {
    path: '/tp3/',
    element: <Home />,
  },
  {
    path: '/tp3/signin',
    element: <SignIn />,
  },
  {
    path: '/tp3/signup',
    element: <SignUp />,
  },
  {
    path: '/tp3/settings',
    element: <Settings />,
  },
  {
    path: '/tp3/dashboard',
    element: <DashBoard />,
  },
  {
    path: '/tp3/painel-estatico',
    element: <PainelEstatistico />,
  },
  {
    path: '/tp3/form',
    element: <Form />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
