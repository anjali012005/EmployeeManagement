import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;