
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import { isAuthenticated } from "./auth"; // supondo que esteja importando isso
import RegisterForm from './pages/auth/registerForm.jsx'
import NoPage from './pages/NoPage.jsx'
import LoginForm from './pages/auth/login.jsx'
import Home from './pages/Home.jsx'
import LabTabs from "./component/labTabs.jsx";
import UtenteExerciseTab from "./component/utenteExerciseTab.jsx";
import ConditionalUtenteExerciseTab from "./component/ConditionalUtenteExerciseTab.jsx";
import AllUtente from './pages/utente/utenteData/all_utente.jsx'
import Profile from './pages/therapist/perfil.jsx'
import HealthUserInformation from './pages/utente/utenteData/information.jsx'
import ArticulationResult from './pages/utente/result/articulation.jsx'
import ProsodyResult from './pages/utente/result/prosody.jsx'
import PhonotionResult from './pages/utente/result/phonation.jsx'
import GlottalResult from './pages/utente/result/glottal.jsx'
import ReplearningResult from './pages/utente/result/repleaning.jsx'
import PhonologicalResult from "./pages/utente/result/phonological.jsx"; 
import AllExercise from './pages/utente/exercise/allExercise.jsx'
import AllGenericExercise from './pages/utente/exercise/allExerciseGeneric.jsx'
import ExerciseDetail from './pages/utente/exercise/exerciseDetail.jsx'
import EditUtente from './pages/utente/utenteData/editUtent.jsx'
import EditarExercicioForm from './pages/utente/exercise/editExercise.jsx'
import ReportList from './pages/utente/utenteData/allReport.jsx'
import EditReport from "./pages/utente/utenteData/editReport.jsx";
import ArticulationResultPage from './pages/utente/result/versao2/articulationPage.jsx'
import ProsodyResultPage from "./pages/utente/result/versao2/prosodyPage.jsx";  
import PhonotionResultPage from "./pages/utente/result/versao2/phonationPage.jsx";
import GenericExerciseDetail from "./pages/utente/exercise/GenericExerciseDetail.jsx";
import EditarGenericExercicioForm from "./pages/utente/exercise/editGenericExercise.jsx";
import UtenteTabsLayout from "./layouts/UtenteTabsLayout";
import ExerciseForm from "./pages/utente/reabilitation/exerciseForm.jsx";

// export default function App() {
//   // const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

//   // const handleLogin = () => setIsLoggedIn(true);
//   // const handleLogout = () => {
//   //   localStorage.removeItem('token');
//   //   setIsLoggedIn(false);
//   // };

//   const isAuth = localStorage.getItem('token') !== null && localStorage.getItem('token') !== "";

//   return (
//     <BrowserRouter>
//       {isAuth && <LabTabs />}
//       <Routes>
//         {isAuth ? (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="utente" element={<AllUtente />}/> 
//             <Route path="exercicios/genericos" element={<AllGenericExercise/>} />
            

//             <Route path="me" element={<Profile />} />
//             {/* Utente Tabs Layout para rotas que compartilham o componente UtenteTabs */}
//             <Route path="utente/:id" element={<UtenteTabsLayout />}>
//               <Route path="informacao" element={<HealthUserInformation />} />
//               <Route path="relatorio" element={<ReportList />} />
//               <Route path="relatorio/edit/:id_" element={<EditReport />} />
//               <Route path="editar" element={<EditUtente />} />
//               <Route path="analise/articulacao" element={<ArticulationResult />} />
//               <Route path="analise/fonacao" element={<PhonotionResult />} />
//               <Route path="analise/prosodia" element={<ProsodyResult />} />
//               <Route path="analise/glota" element={<GlottalResult />} />
//               <Route path="analise/reaprendizagem" element={<ReplearningResult />} />
//               <Route path="exercicios" element={<AllExercise />} />
//               <Route path="exercicio/:id_" element={<ExerciseDetail />} />
//               <Route path="exercicio/editar/:id_" element={<EditarExercicioForm />} />
//               {/* Adicione outras subtabs aqui */}
//             </Route>

//             <Route path="*" element={<NoPage />} />
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<LoginForm />} />
//             <Route path="register" element={<RegisterForm />} />
//             <Route path="*" element={<NoPage />} />
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default function App() {
  const isAuth = localStorage.getItem('token') !== null && localStorage.getItem('token') !== "";

  return (
    <BrowserRouter>
      {isAuth && <LabTabs />}
      {isAuth && <ConditionalUtenteExerciseTab />}

      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<AllUtente />} />
            {/* <Route path="utentes" element={<AllUtente />} /> */}
            <Route path="exercicios/genericos" element={<AllGenericExercise />} />
              <Route path="exercicios/genericos/detail/:id" element={<GenericExerciseDetail />} />
              <Route path="exercicios/genericos/detail/editar/:id" element={<EditarGenericExercicioForm />} />

            <Route path="me" element={<Profile />} />

            <Route path="utente/:id" element={<UtenteTabsLayout />}>
              <Route path="informacao" element={<HealthUserInformation />} />
              <Route path="relatorio" element={<ReportList />} />
              <Route path="relatorio/edit/:id_" element={<EditReport />} />
              <Route path="editar" element={<EditUtente />} />
              <Route path="analise/articulacao" element={<ArticulationResultPage />} />
              {/* <Route path="analise/articulacao" element={<ArticulationResult />} /> */}
              <Route path="analise/fonacao" element={<PhonotionResultPage />} />
              {/* <Route path="analise/fonacao" element={<PhonotionResult />} /> */}
              {/* <Route path="analise/prosodia" element={<ProsodyResult />} /> */}
              <Route path="analise/prosodia" element={<ProsodyResultPage />} />
              <Route path="analise/glota" element={<GlottalResult />} />
              <Route path="analise/fonologica" element={<PhonologicalResult />} />
              <Route path="analise/reaprendizagem" element={<ExerciseForm />} />  {/*TODO: VER ISSO AQUI*/}
              <Route path="exercicios" element={<AllExercise />} />
              <Route path="exercicio/:id_" element={<ExerciseDetail />} />
              <Route path="exercicio/editar/:id_" element={<EditarExercicioForm />} />
            </Route>

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
