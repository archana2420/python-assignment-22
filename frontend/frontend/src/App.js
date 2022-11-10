import React,{useState,useEffect, useContext} from 'react'
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';


function App() {
  const [token] = useContext(UserContext)
  const [message, setMessage] = useState("")

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

 
  return (
    <div>
      <Header title={message} />
      {
        !token?
        <Login/>:(
          <div>
            <Dashboard/>
        <Profile/>
        </div>)
        
      }
      
     
     
    </div>
  );
}

export default App;
