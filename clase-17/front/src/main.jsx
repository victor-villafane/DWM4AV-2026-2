import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
// import App from './pages/App.jsx'
// import Home from './pages/Home.jsx'
// import Contact from './pages/Contact.jsx'
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react'

const App = lazy( () => import('./pages/App.jsx') )
const Home = lazy( () => import('./pages/Home.jsx') )
const Contact = lazy( () => import('./pages/Contact.jsx') )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Cargando...</div>} ><Home /></Suspense>,
      },
      {
        path: "/contact",
        element: <Suspense fallback={<div>Cargando...</div>} ><Contact /></Suspense>
      },
      {
        path: "/listado",
        element: <Suspense fallback={<div>Cargando...</div>} ><App /></Suspense>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>,
)
