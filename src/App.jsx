import React from 'react'
import './App.css';
import AppRoutes from './routes/AppRoutes'
import Header from './components/common/Header'
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
    <ToastContainer position='bottom-right' autoClose='2000'/>
    <Header/>
      <AppRoutes/>
    </>
  )
}
