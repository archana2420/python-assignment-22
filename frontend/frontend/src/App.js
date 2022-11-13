import React,{useState,useEffect, useContext} from 'react'
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { UserContext } from './context/UserContext';
import { UserIdContext } from './context/UserIdContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProfileScreen from './components/ProfileScreen';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";


function App() {
  const [userId,setUserId] = useContext(UserIdContext)
  const [token] = useContext(UserContext)
 
 
  return (
    <div>
      <Router>
      <Header  />
      <Routes>
      <Route 
      path='/' 
      element={
        (!token )?<Login/>:(<div><ProfileScreen/></div>)
      }
      ></Route>
    
    <Route 
      path='/register' 
      element={
        (!token )?<Register/>:(<div><ProfileScreen/></div>)
      }
      ></Route>  

      <Route 
      path='/dashboard' 
      element={(token )?<Dashboard/>:<Navigate to='/'></Navigate>}
      ></Route>
      

      </Routes>
      
      </Router>
      
     
      
     
     
    </div>
  );
}

export default App;
