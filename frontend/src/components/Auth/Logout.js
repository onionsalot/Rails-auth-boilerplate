import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Logout=({setUser})=>{
  const logout=async (setUser)=>{
    await axios.delete("http://localhost:3000/logout", { withCredentials: true })
    setUser(null)
  }
  const handleClick=e=>{
    e.preventDefault()
     logout(setUser)
}
  return(
    <div>
      <input type="button" value='Logout' onClick={handleClick}/>
</div>
)
}

export default Logout