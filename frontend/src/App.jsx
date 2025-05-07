import { useState } from 'react'
// import './App.css'
import RegisterForm from './pages/auth/registerForm.jsx'
import NoPage from './pages/NoPage.jsx'
import LoginForm from './pages/auth/login.jsx'
import Protected from './pages/protected.jsx'
import Home from './pages/Home.jsx'
import LabTabs from "./compunent/labTabs.jsx";
import AllUtente from './pages/utente/all_utente.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import HealthUserInformation from './pages/utente/information.jsx'
import ArticulationResult from './pages/utente/result/articulation.jsx'


import { BrowserRouter, Routes, Route } from "react-router-dom";
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export default function App() {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
    
  // return (
  //   <BrowserRouter>
  //     <LabTabs isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
  //     <Routes>
  //       <Route path="/" element={isAuthenticated() ? <Home /> : navigate('/login')} />
  //       <Route path="login" element={<LoginForm />} />
  //       <Route path="register" element={<RegisterForm />} />
  //       <Route path="utente" element={<ProtectedRoute element={<AllUtente />} />} />
  //       <Route path="*" element={<NoPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
    return (
      <BrowserRouter>
        <LabTabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="utente" element={<AllUtente />} />
          <Route path="utente/:id/informacao" element={<HealthUserInformation />} />
          <Route path="utente/:id/analise/articulacao" element={<ArticulationResult />} />
          <Route path="protected" element={<Protected />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
  

  // return (
  //   // <>
  //   //   <section className="App-header flex flex">

  //   //     <h1>Register</h1>
  //   //     <RegisterForm />
  //   //   </section>
  //   // </>
  //     <BrowserRouter>
  //     <LabTabs />
  //     <Routes>
  //       <Route path="/" >
  //         <Route index element={<Home />} />
  //         <Route path="register" element={<RegisterForm />} />
  //         <Route path="login" element={<LoginForm />} />
  //         <Route path="protected" element={<Protected />} />
  //         <Route path="*" element={<NoPage />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // )
}

