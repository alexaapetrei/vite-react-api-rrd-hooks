import { Link } from "react-router-dom";
import "../App.css";
import { useLogin } from "../hooks/useAuth";

const Nav = () => {
  const { user } = useLogin();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <nav
      key={user?.username || 1}
      className="navbar navbar-expand navbar-dark bg-dark"
    >
      <Link to={"/"} className="navbar-brand">
        Restaurant-App
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
        </li>
        {user?.roles?.includes("ROLE_MODERATOR") && (
          <li className="nav-item">
            <Link to={"/mod"} className="nav-link">
              Moderator Board
            </Link>
          </li>
        )}
        {user?.roles?.includes("ROLE_ADMIN") && (
          <li className="nav-item">
            <Link to={"/admin"} className="nav-link">
              Admin Board
            </Link>
          </li>
        )}
        {user && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">
              User
            </Link>
          </li>
        )}
      </div>

      {user?.username ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              {user.username}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" onClick={handleLogout}>
              LogOut
            </Link>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Nav;
