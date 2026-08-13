"use client";

import { useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import css from "./BookingForm.module.css";
import { useModalStore } from "../../../app/store/appStore";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button/Button";

const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please enter your complete full name.")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      "Phone must start with +380 and include country code",
    )
    .required("Phone number is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
});

interface AppointmentResponse {
  message: string;
  appointment: {
    name: string;
    email: string;
    phone: string;
    date: string;
    psychologist: {
      id: string;
      name: string;
    };
  };
}

const timeOptions = [
  { value: "09:00", label: "09:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "13:00", label: "01:00 PM" },
  { value: "17:30", label: "05:30 PM" },
];

export default function BookingForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { modalData, closeModal } = useModalStore();

  if (!modalData) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  if (isSuccess) {
    return (
      <div className={css.successContainer}>
        <div className={css.successIconWrapper}>
          <svg width="64" height="64" className={css.successIcon}>
            <use href="/sprite.svg#icon-chacked"></use>
          </svg>
        </div>
        <h2 className={css.successTitle}>Your session has been booked!</h2>
        <p className={css.successSubtitle}>
          We&apos;ll send a confirmation to your email. <br />
          {modalData.name} will contact you shortly.
        </p>

        <Button
          text=" Close"
          color="green"
          width={460}
          onClick={() => closeModal}
          size="small"
        />
      </div>
    );
  }

  return (
    <div className={css.formContainer}>
      {/* 1. БЕЛАЯ ШАПКА (Фиксированная) */}
      <div className={css.formHeader}>
        <h2 className={css.title}>Book a Session</h2>
      </div>

      <Formik
        initialValues={{ name: "", email: "", phone: "", date: "", time: "" }}
        validationSchema={bookingSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const combinedDateTime = new Date(
              `${values.date}T${values.time}`,
            ).toISOString();

            const requestBody = {
              name: values.name,
              email: values.email,
              phone: values.phone,
              date: combinedDateTime,
              psychologistId: modalData._id,
            };

            await api.post<AppointmentResponse>(
              "/api/appointments",
              requestBody,
            );
            setIsSuccess(true);
          } catch (error: unknown) {
            if (error instanceof AxiosError) {
              toast.error(
                error.response?.data?.message || "Failed to book a session",
              );
            } else {
              toast.error("An unexpected error occurred");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form className={css.form}>
            {/* 2. СЕРАЯ ЦЕНТРАЛЬНАЯ ЧАСТЬ (Скролл) */}
            <div className={css.scrollContainer}>
              <div className={css.psychologistBrief}>
                <div className={css.avatarWrapper}>
                  <Image
                    src={modalData.avatar_url}
                    alt={modalData.name}
                    width={80}
                    height={80}
                    className={css.avatar}
                  />
                </div>
                <h3 className={css.psychologistName}>{modalData.name}</h3>
              </div>
              {/* Поле Name */}
              <div className={css.inputWrapper}>
                <label className={css.inputLabel}>Name</label>
                <div
                  className={`${css.fieldGroup} ${errors.name && touched.name ? css.inputError : ""}`}
                >
                  <svg className={css.inputIcon} width="16" height="18">
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={css.input}
                  />
                </div>
                <ErrorMessage name="name">
                  {(msg) => (
                    <span className={css.errorText}>
                      <svg width="16" height="16" className={css.errorIcon}>
                        <use href="/sprite.svg#icon-warning"></use>
                      </svg>
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              {/* Поле Email */}
              <div className={css.inputWrapper}>
                <label className={css.inputLabel}>Email</label>
                <div
                  className={`${css.fieldGroup} ${errors.email && touched.email ? css.inputError : ""}`}
                >
                  <svg className={css.inputIcon} width="16" height="18">
                    <use href="/sprite.svg#icon-envelop"></use>
                  </svg>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={css.input}
                  />
                </div>
                <ErrorMessage name="email">
                  {(msg) => (
                    <span className={css.errorText}>
                      <svg width="16" height="16" className={css.errorIcon}>
                        <use href="/sprite.svg#icon-warning"></use>
                      </svg>
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              {/* Поле Phone */}
              <div className={css.inputWrapper}>
                <label className={css.inputLabel}>Phone Number</label>
                <div
                  className={`${css.fieldGroup} ${errors.phone && touched.phone ? css.inputError : ""}`}
                >
                  <svg className={css.inputIcon} width="16" height="18">
                    <use href="/sprite.svg#icon-phone"></use>
                  </svg>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="+380635315168"
                    className={css.input}
                  />
                </div>
                <ErrorMessage name="phone">
                  {(msg) => (
                    <span className={css.errorText}>
                      <svg width="16" height="16" className={css.errorIcon}>
                        <use href="/sprite.svg#icon-warning"></use>
                      </svg>
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              {/* Ряд Дата и Время */}
              <div className={css.dateTimeRow}>
                {/* Дата */}
                <div className={css.inputWrapper}>
                  <label className={css.inputLabel}>Date</label>
                  <div
                    className={`${css.fieldGroup} ${errors.date && touched.date ? css.inputError : ""}`}
                  >
                    <Field
                      name="date"
                      type="date"
                      min={todayStr}
                      className={css.input}
                    />
                  </div>
                  <ErrorMessage name="date">
                    {(msg) => (
                      <span className={css.errorText}>
                        <svg width="16" height="16" className={css.errorIcon}>
                          <use href="/sprite.svg#icon-warning"></use>
                        </svg>
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>

                {/* Селектор Времени */}
                <div className={css.inputWrapper}>
                  <label className={css.inputLabel}>Time</label>
                  <div
                    className={`${css.fieldGroup} ${css.dropdownTrigger} ${errors.time && touched.time ? css.inputError : ""}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span
                      className={`${css.input} ${!values.time ? css.placeholderText : ""}`}
                    >
                      {timeOptions.find((opt) => opt.value === values.time)
                        ?.label || "Select time"}
                    </span>
                    <svg
                      className={`${css.arrowIcon} ${isDropdownOpen ? css.arrowOpen : ""}`}
                      width="16"
                      height="16"
                    >
                      <use href="/sprite.svg#icon-chevron-down"></use>
                    </svg>

                    {isDropdownOpen && (
                      <div className={css.dropdownMenu}>
                        {timeOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`${css.dropdownItem} ${values.time === option.value ? css.dropdownItemActive : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFieldValue("time", option.value);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="time">
                    {(msg) => (
                      <span className={css.errorText}>
                        <svg width="16" height="16" className={css.errorIcon}>
                          <use href="/sprite.svg#icon-warning"></use>
                        </svg>
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>
              </div>
            </div>

            {/* 3. БЕЛЫЙ ФУТЕР (Фиксированный) */}
            <div className={css.formActions}>
              <Button
                width={100}
                text="Cancel"
                color="white"
                size="small"
                type="button"
                onClick={closeModal}
                icon="icon-chevron-down"
                iconSize="small-arrow"
              />
              <Button
                width={140}
                text={isSubmitting ? "Booking..." : "Confirm Booking"}
                color="green"
                type="submit"
                size="small"
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
