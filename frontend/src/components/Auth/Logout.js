import Cookies from "js-cookie"
import { useUserContext } from "../../components/UserContext/UserContext";
import { logout } from "../../helpers/users-api";

const Logout = () => {
  const signout = useUserContext().signout;
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response.data.success === true) {
      signout();
    }
  };
  return (
    <div>
      <input type="button" value="Logout" onClick={handleClick} />
    </div>
  );
};

export default Logout;
