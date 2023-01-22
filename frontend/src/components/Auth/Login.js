import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Cookies from "js-cookie"
import { useAuth } from "../../queries/use-auth"

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  // const signin = useUserContext().signin;
  const [errors, setErrors] = useState([])
  const [showReset, setShowReset] = useState(false)
  const [resetSuccess, setResetSuccess] = useState("")
  const { signinUserMutation, requestPasswordResetMutation } = useAuth()
  // const handleLogin = async (userInfo) => {
  //   const response = await login(userInfo);
  //   console.log('registration: =>', response)
  //   if (response && response.status === 200) {
      // signin(response);
  //     navigate("/app/dashboard");
  //   } else if (response.data.errors.length > 0) {
  //     setErrors([...errors, ...response.data.errors])
  //   }
  // };
  // const loginUserMutation = useMutation(login, {
  //     onSuccess: (response) => {
  //       console.log('success')
  //       signin(response)
  //       navigate("/app/dashboard");
  //     },
  //     onError: (e) => {
  //       setErrors([...errors, ...e.response.data.errors])
  //       console.log('error', e)
  //     }
  // })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
        remember_me: true
      }
    }
    signinUserMutation.mutate(
      userInfo,
      { 
        onSuccess: (response) => {
          navigate("/app/dashboard")
        }
      }
    );
    e.target.reset();
  };
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = { user: { email: data.email } }

    // let response = {}
    // try {
    //   response = await axios.post('http://localhost:3000/auth/password', userInfo)
    //   console.log(response)
    //   if(response && response.status === 200) {
    //     setResetSuccess(response.data.message)
    //   } else {
    //     setErrors(['An Error has occured'])
    //   }
    // } catch (e) {
    //   setErrors([...e.response.data.errors])
    // }
    requestPasswordResetMutation.mutate(userInfo)
  }

  const showErrors = errors.map((e, i) => {
    return <p className="errors" key={i}>{e}</p>
  })

  return (
    <div>
      <h3> Login </h3>
      { showReset 
      ? 
        <>
          <form ref={formRef} onSubmit={handlePasswordReset}>
          Email: <input type="email" name="email" placeholder="email" required/>
          <input type="submit" value="Submit" />
          </form>
          
          {errors ? showErrors : ""}
          <br />
          <p><span className="clickable-span" onClick={() => setShowReset(!showReset)}>Return to Login</span></p>
        </>
      : 
        <>
          <form ref={formRef} onSubmit={handleSubmit}>
            Email: <input type="email" name="email" placeholder="email" required/>
            <br />
            Password:{" "}
            <input type="password" name="password" placeholder="password" required/>
            <br />
            <input type="submit" value="Login" />
          </form>
          <br />
          <p>Forgot password? <span className="clickable-span" onClick={() => setShowReset(!showReset)}>Reset here</span></p>
        </>
      }
      {resetSuccess ? resetSuccess : ""}
      {signinUserMutation.isError ? signinUserMutation.error.response?.data : ""}
    </div>
  );
};
export default Login;
