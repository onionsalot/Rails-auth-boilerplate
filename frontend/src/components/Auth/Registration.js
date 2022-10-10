import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../helpers/users-api";
import { useUserContext } from "../../components/UserContext/UserContext";


const Registration = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const signin = useUserContext().signin;
  const [errors, setErrors] = useState([])

  const handleRegister = async (userInfo) => {
    const response = await signup(userInfo);
    console.log('registration: =>', response)
    if (response && response.status === 200) {
      signin(response);
      navigate("/app/dashboard");
    } else if (response.data.errors.full_messages.length > 0) {
      setErrors([...errors, ...response.data.errors.full_messages])
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    handleRegister(userInfo);
    e.target.reset();
  };

  const showErrors = errors.map((e, i) => {
    return <p className="errors" key={i}>{e}</p>
  })

  return (
    <div>
      <h3> Register </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name="email" placeholder="email" required/>
        <br />
        Password:{" "}
        <input type="password" name="password" placeholder="password" required/>
        <br />
        Password Confirmation:{" "}
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {errors ? showErrors : ""}
    </div>
  );
};
export default Registration;
