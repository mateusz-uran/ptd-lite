import './App.css';
import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import client from './api/keycloakCredentials';
import Navbar from './component/Navbar';
import ErrorPage from './component/ErrorPage';
import CardSpecification from './component/card/CardSpecification';
import AddTrip from './component/forms/AddTrip';
import AddFuel from './component/forms/AddFuel';

const initOptions = {
  onLoad: "login-required",
  responseType: 'code',
  pkceMethod: 'S256',
}

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (client.authenticated) {
        setIsLogin(true);
        const userExtra = client.tokenParsed.preferred_username
        setUsername(userExtra);
      }
    }
  }

  const loadingComponent = (
    <div className='flex text-align justify-center'>
      <Backdrop
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>Authorization in progress, please wait...</h1>
    </div>
  )

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar isLogin={isLogin} username={username} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "card/:cardId",
          element: <CardSpecification />,
        },
        {
          path: "card/:cardId/add-trip",
          element: <AddTrip />,
        },
        {
          path: "card/:cardId/add-fuel",
          element: <AddFuel />,
        },
      ],
    },
  ]);

  return (
    <ReactKeycloakProvider
      authClient={client}
      initOptions={initOptions}
      LoadingComponent={loadingComponent}
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
      <div>
        <RouterProvider router={router} />
      </div>
    </ReactKeycloakProvider>
  )
}

export default App;
