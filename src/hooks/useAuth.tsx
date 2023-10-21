import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/v1/auth/";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Array<string>;
  accessToken: string;
};

export type LoginPayload = Pick<User, "username" | "password">;
export type RegisterPayload = Pick<User, "username" | "email" | "password">;

const useAuth = (initialUser: User | null) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const authRequest = async (
    url: string,
    payload: LoginPayload | RegisterPayload
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}${url}`, payload);
      setUser(data);
    } catch (e) {
      setError("Error");
    }
  };

  return { user, error, authRequest };
};

export const useLogin = () => {
  const { user, error, authRequest } = useAuth(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const login = (credentials: LoginPayload) =>
    authRequest("signin", credentials);
  return { user, error, login };
};

export const useRegister = () => {
  const { user, error, authRequest } = useAuth(null);
  const register = (newUser: RegisterPayload) => authRequest("signup", newUser);
  return { user, error, register };
};
