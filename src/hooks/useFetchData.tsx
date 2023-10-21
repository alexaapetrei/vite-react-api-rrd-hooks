import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/";

export const useFetchData = (path: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.user ? JSON.parse(localStorage.user) : {};
    const config = user
      ? { headers: { Authorization: `Bearer ${user.accessToken}` } }
      : {};

    axios
      .get(`${API_URL}${path}`, config)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("⚠ You are NOT allowed here lol 😕");
        setLoading(false);
      });
  }, [path]);

  return { data, loading, error };
};
