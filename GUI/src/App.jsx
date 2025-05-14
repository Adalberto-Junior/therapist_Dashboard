// import { useState } from 'react'
// import './index.css'
// import './App.css'
// import RegisterForm from './pages/auth/registerForm.jsx'
// import NoPage from './pages/NoPage.jsx'
// import LoginForm from './pages/auth/login.jsx'
// import Protected from './pages/protected.jsx'
// import Home from './pages/Home.jsx'
// import LabTabs from "./compunent/labTabs.jsx";
// import AllUtente from './pages/utente/all_utente.jsx'
// import ProtectedRoute from './pages/ProtectedRoute.jsx'
// import HealthUserInformation from './pages/utente/information.jsx'
// import ArticulationResult from './pages/utente/result/articulation.jsx'


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// const isAuthenticated = () => {
//   return localStorage.getItem('token') !== null;
// };

// export default function App() {
//   // const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//   };

//   if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
//     return (
//       <BrowserRouter>
//         <LabTabs />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="utente" element={<AllUtente />} />
//           <Route path="utente/:id/informacao" element={<HealthUserInformation />} />
//           <Route path="utente/:id/analise/articulacao" element={<ArticulationResult />} />
//           <Route path="protected" element={<Protected />} />
//           <Route path="*" element={<NoPage />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   } else {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginForm />} />
//           <Route path="register" element={<RegisterForm />} />
//           <Route path="*" element={<NoPage />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   }
  
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import { isAuthenticated } from "./auth"; // supondo que esteja importando isso
import RegisterForm from './pages/auth/registerForm.jsx'
import NoPage from './pages/NoPage.jsx'
import LoginForm from './pages/auth/login.jsx'
import Protected from './pages/protected.jsx'
import Home from './pages/Home.jsx'
import LabTabs from "./component/labTabs.jsx";
import AllUtente from './pages/utente/all_utente.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import HealthUserInformation from './pages/utente/information.jsx'
import ArticulationResult from './pages/utente/result/articulation.jsx'
import AllExercise from './pages/utente/exercise/allExercise.jsx'

import UtenteTabsLayout from "./layouts/UtenteTabsLayout";

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // const handleLogin = () => setIsLoggedIn(true);
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  // };

  const isAuth = localStorage.getItem('token') !== null && localStorage.getItem('token') !== "";

  return (
    <BrowserRouter>
      {isAuth && <LabTabs />}
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="utente" element={<AllUtente />} />

            {/* Utente Tabs Layout para rotas que compartilham o componente UtenteTabs */}
            <Route path="utente/:id" element={<UtenteTabsLayout />}>
              <Route path="informacao" element={<HealthUserInformation />} />
              <Route path="analise/articulacao" element={<ArticulationResult />} />
              <Route path="exercicios" element={<AllExercise />} />
              {/* Adicione outras subtabs aqui */}
            </Route>

            <Route path="protected" element={<Protected />} />
            <Route path="*" element={<NoPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="*" element={<NoPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
