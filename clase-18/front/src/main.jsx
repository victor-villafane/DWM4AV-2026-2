import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = lazy(() => import('./pages/App.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Detalle = lazy(() => import('./pages/Detalle.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

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
        path: "/productos",
        element: <Suspense fallback={<div>Cargando...</div>} > <ProtectedRoute element={<App />} rol={["admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/productos/:id",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute element={<Detalle />} rol={[ "superadmin"]} /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
      }
    ]
  },
  {
    path: "*",
    element: <div>404</div>
  },
  {
    path: "/admin",
    element: <div>layoutadmin</div>,
    children: []
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
