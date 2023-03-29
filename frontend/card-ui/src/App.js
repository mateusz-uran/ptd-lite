import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from './component/Navbar';
import ErrorPage from './component/ErrorPage';
import CardSpecification from './component/CardSpecification';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import client from './Keycloak';

const initOptions = {
  onLoad: "login-required",
  responseType: 'code',
  pkceMethod: 'S256',
}

function App() {
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (client.authenticated) {
        setIsLogin(true);
        setToken(client.token);
      }
    }
  }

  const loadingComponent = (
    <div>
      <p>Keycloak is loading or running authorization code flow with PKCE</p>
    </div>
  )

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar token={token} isLogin={isLogin} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "card/:cardId",
          element: <CardSpecification />,
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
