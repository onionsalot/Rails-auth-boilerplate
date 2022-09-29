import { useRef } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Registration=({setUser})=>{
  const navigate = useNavigate();
    const formRef = useRef()
    const signup=async (userInfo, setUser)=>{
        const url="http://localhost:3000/registrations"
        try{
            const response= await axios.post(url, userInfo, { withCredentials: true })
            console.log(response)
            // const data=await response.json()
            // localStorage.setItem('token', response.headers.get("Authorization"))
            if (response.data.status === 'created') {
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
            Password Confirmation: <input type="password" name='password_confirmation' placeholder="Password Confirmation" />
            <br/>
            <input type='submit' value="Submit" />
        </form>
    </div>
    )
}
export default Registration