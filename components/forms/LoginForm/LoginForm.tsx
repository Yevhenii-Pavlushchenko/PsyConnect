"use client";

import { AxiosError } from "axios";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { useAuthStore } from "../../../app/store/authStore";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, closeLoginModal, openRegisterModal } = useAuthStore();

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Welcome Back</h2>
      <p className={css.subtitle}>
        Log in to access your favorites and bookings
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Типизируем ответ для логина
            const response = await api.post<{
              name: string;
              email: string;
              token: string;
            }>("/auth/login", values);
            toast.success("Welcome back!");

            loginUser(
              { name: response.data.name, email: response.data.email },
              response.data.token,
            );
            closeLoginModal();
          } catch (error: unknown) {
            if (error instanceof AxiosError) {
              toast.error(
                error.response?.data?.message || "Invalid email or password",
              );
            } else {
              toast.error("An unexpected error occurred");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            {/* Поле Email */}
            <div className={css.inputWrapper}>
              <div
                className={`${css.fieldGroup} ${errors.email && touched.email ? css.inputError : ""}`}
              >
                <svg className={css.inputIcon} width="20" height="20">
                  <use href="/sprite.svg#icon-envelop"></use>
                </svg>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={css.input}
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorText}
              />
            </div>

            {/* Поле Password */}
            <div className={css.inputWrapper}>
              <div
                className={`${css.fieldGroup} ${errors.password && touched.password ? css.inputError : ""}`}
              >
                <svg className={css.inputIcon} width="20" height="20">
                  <use href="/sprite.svg#icon-lock"></use>
                </svg>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={css.input}
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg width="20" height="20">
                    <use
                      href={`/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-close"}`}
                    ></use>
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={css.errorText}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.switchFormText}>
       Don&apos;t have an account?{" "}
        <span className={css.switchLink} onClick={openRegisterModal}>
          Sign Up
        </span>
      </p>
    </div>
  );
}
