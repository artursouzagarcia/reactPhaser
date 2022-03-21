import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Login from './pages/auth/login/Login'
import ForgotPassword from './pages/auth/forgotPassword/ForgotPassword'
import Home from './pages/home/Home'
import Aprensentacao from './pages/jornada/apresentacao/Aprensentacao'
import Game from './pages/jornada/game/Game'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/begin_password_reset" element={<ForgotPassword />} />
					<Route path="/app" element={<Home />} />
					<Route path="/apresentacao/:idJornada" element={<Aprensentacao />} />
					<Route path="/game/:idJornada" element={<Game />} />
					<Route path="/*" element={<h1>Pagina não encontrada</h1>} />				
				</Routes>
			</BrowserRouter>
		</div>
		<ToastContainer
			position="bottom-center"
			autoClose={ 5000 }
			hideProgressBar={ false }
			
			newestOnTop={ false }
			closeOnClick
			rtl={ false }
			pauseOnFocusLoss
			draggable
			pauseOnHover
			className="toast-colored"
		/>
    
    </>
  )
}

export default App


