import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get("http://localhost:3000/logged_in", { withCredentials: true })
      console.log('response is=',response)
      if (response.data.logged_in) {
        setUser(response.data.user)
      } else if (!response.data.logged_in) {
        setUser(null)
      }
    }
    getCurrentUser()
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path ={"/"} element={<Home user={user} setUser={setUser} />} /> 
          <Route exact path ={"/dashboard"} element={<Dashboard user={user} setUser={setUser} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
