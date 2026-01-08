import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"

export default function ToastComponents() {
  return (<ToastContainer
                          position="top-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick={false}
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="light"
                        />
  )
}
