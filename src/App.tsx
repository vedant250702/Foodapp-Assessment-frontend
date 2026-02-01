import { useEffect, useState } from 'react'
import {socket} from "./utils/socketFunctions"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"
import Menu from './pages/Menu/Menu'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/PaymentPage/Checkout'
import Orders from './pages/Orders/Orders'
import AdminOrdersTable from './pages/AdminOrdersTable/AdminOrdersTable'
import Notification from './components/Notification/Notification'


function App() {

  const [notification, setnotification] = useState(false)
  const [status, setstatus] = useState('')


  useEffect(()=>{

    socket.on("notification-client",(payload:any)=>{

      setnotification(true)
      setstatus(payload.status)
      setTimeout(() => {
        setnotification(false)
      }, 5000);
    })

  },[])
  return (
    <>
    <div className='main-div'>

    <Router>
      <Navbar/>
      {notification&&
        <Notification status={status} exit={()=>{setnotification(false)}}/>
      }
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/admin' element={<AdminOrdersTable/>}/>
        </Routes>
      </Router>

    </div>
    </>
  )
}

export default App
