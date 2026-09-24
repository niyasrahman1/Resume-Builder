import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import ResumeSteps from './pages/ResumeSteps'
import Downloads from './pages/Downloads'
import Pnf from './pages/Pnf'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import ViewResume from './pages/ViewResume'
import UserForm from './pages/UserForm'
import Allresumes from './pages/Allresumes'
import { ToastContainer } from 'react-toastify';






function App() {


  return (
    <>
      <Header />
      {/* setup path */}
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='steps' element={<ResumeSteps />} />
        <Route path='form' element={<UserForm />} />
        <Route path='download' element={<Downloads />} />
        <Route path='resume/:id/view' element={<ViewResume />} />
        <Route path='all-resumes' element={<Allresumes />} />

        {/* redirect to pnf */}
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default App
