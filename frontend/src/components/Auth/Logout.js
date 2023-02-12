import { useAuth } from "../../hooks/use-auth"
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()
  const { signoutUserMutation } = useAuth()

  const handleClick = async (e) => {
    e.preventDefault()
    signoutUserMutation.mutate(
      { 
        onSuccess: (response) => {
          console.log('onSuccess called for Logout')
          navigate("/app/dashboard")
        }
      }
    )
  }

  return (
    <div>
      <input type="button" value="Logout" onClick={handleClick} />
    </div>
  )
}

export default Logout
