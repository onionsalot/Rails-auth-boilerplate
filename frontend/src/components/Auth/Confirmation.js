import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../queries/use-auth"

const Confirmation = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const { confirmationMutation } = useAuth()

  useEffect(() => {
    console.log('hello')
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token')
    console.log('token=',token)
    const payload = { params: { confirmation_token: token } }

    confirmationMutation.mutate(
      payload,
      { 
        onSuccess: (response) => {
          console.log('onSuccess called for Confirmation')
          // queryClient.invalidateQueries('user')
          setMessage("Account has been confirmed. You will be re-directed in 5 seconds...")
          setTimeout(() => {
            navigate("/app/login")
          }, 5000);
        },
        onError: () => {
          setMessage("An error has occured. Please ensure the link has not expired...")
        }
      }
    )
  },[])

  return (
    <>
      {message}
    </>
  );
};
export default Confirmation;
