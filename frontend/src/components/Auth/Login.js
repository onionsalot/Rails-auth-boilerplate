import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signin = useUserContext().signin;
  const [errors, setErrors] = useState([])

  const handleLogin = async (userInfo) => {
    const response = await login(userInfo);
    console.log('registration: =>', response)
    if (response && response.status === 200) {
      signin(response);
      navigate("/app/dashboard");
    } else if (response.data.errors.length > 0) {
      setErrors([...errors, ...response.data.errors])
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    handleLogin(userInfo);
    e.target.reset();
  };

  const showErrors = errors.map((e, i) => {
    return <p className="errors" key={i}>{e}</p>
  })

  return (
    <div>
      <h3> Login </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" required/>
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" required/>
        <br />
        <input type="submit" value="Login" />
      </form>
      {errors ? showErrors : ""}
    </div>
  );
};
export default Login;
