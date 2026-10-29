import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import {Bounce, ToastContainer} from "react-toastify"
export default function Layout() {
    return (
        <div className='container-fluid' >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Navbar />
            <Outlet />
        </div>
    )
}
