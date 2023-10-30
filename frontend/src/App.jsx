import './App.css'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SetAvatar } from './pages/SetAvatar';
import { Chat } from './pages/Chat';


function App() {

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/setAvatar' element={<SetAvatar/>} />
        <Route path='/chat/:id' element={<Chat/>} />

      </Routes>
      {/* <div className="w-40 h-40  bg-[#030307]"></div> */}
    </>
  )
}

export default App
