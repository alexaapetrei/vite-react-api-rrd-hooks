import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import BoardUser from "./components/user";
import BoardModerator from "./components/moderator";
import ErrorPage from "./components/errorPage";
import BoardAdmin from "./components/admin";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout key="home">
        <Home />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <Layout key="login">
        <Login />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: (
      <Layout key="user">
        <BoardUser />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/mod",
    element: (
      <Layout key="mod">
        <BoardModerator />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <Layout key="admin">
        <BoardAdmin />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <Layout key="profile">
        <Profile />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <Layout key="register">
        <Register />
      </Layout>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
