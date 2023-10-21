import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { LoginPayload, useLogin } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { user, error, login } = useLogin();
  const navigate = useNavigate();

  const schema = z.object({
    username: z
      .string()
      .min(3)
      .refine((value) => value.length >= 3, {
        message: "Minimum 3 characters",
      }),
    password: z
      .string()
      .min(4)
      .refine((value) => value.length >= 4, {
        message: "Minimum 4 characters",
      }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(login);

  useEffect(() => {
    if (user) navigate("/profile");
  }, [navigate, user]);

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <form onSubmit={onSubmit}>
          {["username", "password"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field}</label>
              <Controller
                name={field as keyof LoginPayload}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type={field.name === "password" ? "password" : "text"}
                    className="form-control"
                    autoComplete={field.name}
                  />
                )}
              />
              {errors[field as keyof LoginPayload]?.message && (
                <div className="alert alert-danger">
                  {errors[field as keyof LoginPayload]?.message}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
          {error && (
            <div className="alert alert-danger">{JSON.stringify(error)}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
