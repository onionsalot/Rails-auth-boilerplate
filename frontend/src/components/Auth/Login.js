import { useRef } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login=({setUser})=>{
  const navigate = useNavigate();
    const formRef = useRef()
    const signup=async (userInfo, setUser)=>{
        const url="http://localhost:3000/sessions"
        try{
            const response= await axios.post(url, userInfo, { withCredentials: true })
            console.log(response)
            // const data=await response.json()
            // localStorage.setItem('token', response.headers.get("Authorization"))
            if (response.data.logged_in) {
                console.log(response)
              setUser(response.data.user)
              navigate("/dashboard");
            }
            
        } catch (error){
            console.log("error", error.message)
        }
    }
    const handleSubmit=e=>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const userInfo={
            "user":{ email: data.email, password: data.password }
        }
        signup(userInfo, setUser)
        e.target.reset()
    }

    return(
        <div>
        <form ref={formRef} onSubmit={handleSubmit}>
            Email: <input type="email" name='email' placeholder="email" />
            <br/>
            Password: <input type="password" name='password' placeholder="password" />
            <br/>
            <input type='submit' value="Login" />
        </form>
    </div>
    )
}
export default Login