import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import React from 'react';
import Navbar from './component/Navbar';
import ErrorPage from './component/ErrorPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
