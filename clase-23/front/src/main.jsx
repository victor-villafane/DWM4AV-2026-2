import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './components/Layout.jsx';
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Peliculas = lazy(() => import('./pages/crud/Peliculas.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const DetallePelicula = lazy(() => import('./pages/crud/DetallePelicula.jsx'))
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const NuevaPelicula = lazy(() => import('./pages/crud/NuevaPelicula.jsx'))
const EditarPelicula = lazy(() => import('./pages/crud/EditarPelicula.jsx'))
const EliminarPelicula = lazy(() => import('./pages/crud/EliminarPelicula.jsx'))
const Logout = lazy(() => import('./pages/auth/Logout.jsx'))

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
        element: <Suspense fallback={<div>Cargando...</div>} > <ProtectedRoute element={<Peliculas />} rol={["user", "admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/productos/:id",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute element={<DetallePelicula />} rol={["superadmin"]} /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Cargando...</div>} ><Login /></Suspense>
      },
      {
        path: "/salir",
        element: <Suspense fallback={<div>Cargando...</div>} ><Logout /></Suspense>
      },
      {
        path: "/register",
        element: <Suspense fallback={<div>Cargando...</div>} ><Register /></Suspense>
      },
      {
        path: "/nueva-pelicula",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute element={<NuevaPelicula />} rol={["superadmin"]} /></Suspense>
      },
      {
        path: "/editar-pelicula/:id",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute element={<EditarPelicula />} rol={["superadmin"]} /></Suspense>
      },
      {
        path: "/eliminar-pelicula/:id",
        element: <Suspense fallback={<div>Cargando...</div>} ><ProtectedRoute element={<EliminarPelicula />} rol={["superadmin"]} /></Suspense>
      },
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
