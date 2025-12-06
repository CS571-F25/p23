import React from 'react';
import { createHashRouter, RouterProvider, Outlet } from 'react-router';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import ProgramInfo from './components/ProgramInfo';
import Auth from './components/Auth';
import ApplicationResources from './components/ApplicationResources';
import CommunitySupport from './components/CommunitySupport';
import './App.css';

const Layout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navigation />
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "programs",
        element: <ProgramInfo />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "resources",
        element: <ApplicationResources />,
      },
      {
        path: "community",
        element: <CommunitySupport />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App