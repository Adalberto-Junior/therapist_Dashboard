import { useState } from 'react'
import './App.css'
import RegisterForm from './registerForm.jsx'
import NoPage from './pages/NoPage.jsx'
import LoginForm from './pages/login.jsx'
import Protected from './pages/protected.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    // <>
    //   <section className="App-header flex flex">

    //     <h1>Register</h1>
    //     <RegisterForm />
    //   </section>
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          {/* <Route index element={<Home />} /> */}
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="protected" element={<Protected />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

