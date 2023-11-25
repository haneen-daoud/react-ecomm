import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import{router} from './assets/components/layouts/RRoutes.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
export default function App() {
  return (
<RouterProvider router={router} />  )
}
