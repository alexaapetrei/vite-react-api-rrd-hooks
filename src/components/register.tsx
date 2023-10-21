import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { RegisterPayload, useRegister } from "../hooks/useAuth";

const Register: React.FC = () => {
  const { user, error, register } = useRegister();
  const navigate = useNavigate();

  const schema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) navigate("/profile");
  }, [navigate, user]);

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit(register)}>
          {["username", "email", "password"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>{field}</label>
              <Controller
                name={field as keyof RegisterPayload}
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
              {errors[field as keyof RegisterPayload] && (
                <div className="alert alert-danger">Invalid {field}</div>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sign Up
          </button>
          {error && (
            <div className="alert alert-danger">{JSON.stringify(error)}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
