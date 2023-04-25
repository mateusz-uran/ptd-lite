import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Navbar from './component/Navbar';
import ErrorPage from './component/ErrorPage';
import CardSpecification from './component/card/CardSpecification';
import AddTrip from './component/forms/AddTrip';
import AddFuel from './component/forms/AddFuel';

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar  />,
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
  
  return <RouterProvider router={router}/>;
}

export default App;
