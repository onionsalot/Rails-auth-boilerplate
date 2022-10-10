import { useRef, useState, useMemo, useLocation } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../helpers/users-api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (userInfo, headers) => {
    try {
      const response = await resetPassword(userInfo, headers)
      console.log(response)
      if (response.status !== 200) {
        setErrors([...response.data.errors])
        setLoading(false)
        return 
      }
      setSuccess("Successfully changed password. You will be re-directed in 5 seconds...")
      setTimeout(() => {
        navigate("/app/login")
      }, 5000);
    } catch (e) {
      setLoading(false)
      setErrors([...e.response.data.errors])
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    if (data.password !== data.confirmPassword) setErrors(["Passwords are not the same"])
    const urlParams = new URLSearchParams(window.location.search);
    const [uid, client, accessToken] = [urlParams.get('uid'), urlParams.get('client'), urlParams.get('access-token')]
    const headers = { 
      headers : {
        'uid': uid,
        'client': client,
        'access-token': accessToken
      }
    }

    const userInfo = {
      password: data.password, password_confirmation: data.confirmPassword
    };

    handleReset(userInfo, headers)
    e.target.reset()
  };

  const showErrors = errors.map((e, i) => {
    return <p className="errors" key={i}>{e}</p>
  })

  return (
    <>
      { loading
      ? <>
        <p>Loading please wait...</p>
        { success }
        </>
      : <div>
          <h3> Login </h3>
          <form ref={formRef} onSubmit={handleSubmit}>
            Password: <input type="password" name="password" placeholder="password" required/>
            <br />
            Confirm Password: <input type="password" name="confirmPassword" placeholder="confirm password" required/>
            <br />
            <input type="submit" value="Reset Password" />
          </form>
          {errors ? showErrors : ""}
        </div>
      }
    </>
  );
};
export default ResetPassword;
