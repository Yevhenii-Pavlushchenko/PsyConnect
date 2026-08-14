"use client";

import { AxiosError } from "axios";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { useAuthStore, useModalStore } from "../../../app/store/appStore";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too short!").required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const { closeModal, openModal } = useModalStore();

  return (
    <div className={css.formContainer}>
      <h2 className={css.title}>Create an Account</h2>
      <p className={css.subtitle}>
        Join PsyConnect to save your favorite specialists and book sessions
      </p>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await api.post<RegisterResponse>(
              "/api/auth/register",
              values,
            );

            console.log("Бекенд реєстрації повернув:", response.data);

            const user = response.data?.user;

            if (!user || !user.name || !user.email) {
              console.error(
                "Помилка: Об'єкт користувача відсутній у відповіді сервера!",
                response.data,
              );
              toast.error("Registration failed: invalid user profile data.");
              return;
            }

            toast.success("Account created successfully!");

            login({
              name: user.name,
              email: user.email,
            });

            closeModal();
          } catch (error: unknown) {
            if (error instanceof AxiosError) {
              toast.error(
                error.response?.data?.message || "Registration failed",
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
            {/* Поле Name */}
            <div className={css.inputWrapper}>
              <div
                className={`${css.fieldGroup} ${errors.name && touched.name ? css.inputError : ""}`}
              >
                <svg className={css.inputIcon} width="20" height="20">
                  <use href="/sprite.svg#icon-user"></use>
                </svg>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={css.input}
                />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className={css.errorText}
              />
            </div>

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
                  placeholder="Create a password"
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
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={css.switchFormText}>
        Already have an account?{" "}
        <span className={css.switchLink} onClick={() => openModal("login")}>
          Log In
        </span>
      </p>
    </div>
  );
}
