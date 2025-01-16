import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from  './pages/HomePage';
import Analysis from './pages/Analysis';
import NotFoundPage from './pages/NotFoundPage';




import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/Analysis',
    element: <Analysis />,
  }
  
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)