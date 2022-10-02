import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/UserContext/UserContext";
import { logout } from "../../helpers/users-api";

const Logout = () => {
  const signout = useUserContext().signout;
  const handleClick = async (e) => {
    e.preventDefault();
    await logout();
    signout();
  };
  return (
    <div>
      <input type="button" value="Logout" onClick={handleClick} />
    </div>
  );
};

export default Logout;
