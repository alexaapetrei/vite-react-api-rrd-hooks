import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, error } = useLogin();

  useEffect(() => {
    if (!user || error) navigate("/login");
  }, [user, navigate, error]);

  if (!user) return <>No User herer</>;
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {user.accessToken?.substring(0, 20)} ...{" "}
        {user.accessToken?.substr(user.accessToken?.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role: string) => <li key={role}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
