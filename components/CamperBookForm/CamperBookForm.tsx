import css from "./CamperBookForm.module.css";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";

import { sendBookingData } from "@/lib/api";
import Button from "../Button/Button";

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short (min 2 characters)")
    .max(30, "Name is too long (max 30 characters)")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .max(40, "Email is too long (max 40 characters)")
    .required("Email is required"),
});

const initialValues = {
  name: "",
  email: "",
};

interface BookingFormValues {
  name: string;
  email: string;
}

export default function CamperBookForm() {
  const { camperId } = useParams<{ camperId: string }>();

  const handleSubmit = async (
    values: BookingFormValues,
    { resetForm }: FormikHelpers<BookingFormValues>,
  ) => {
    try {
      const dataToSend = { ...values, camperId };

      console.log("Sending data:", dataToSend);

      await sendBookingData(dataToSend);
      toast.success("Camper booked successfully!");
      resetForm();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={css.formContainer}>
      <Toaster position="top-right" reverseOrder={false} />
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${errors.name && touched.name ? css.errorInput : ""}`}
                name="name"
                placeholder="Name*"
              />
              <ErrorMessage
                className={`${css.error} ${errors.name && touched.name ? css.errorInput : ""}`}
                name="name"
                component="span"
              />
            </div>

            <div className={css.fieldWrapper}>
              <Field
                className={`${css.input} ${errors.email && touched.email ? css.errorInput : ""}`}
                name="email"
                type="email"
                placeholder="Email*"
              />
              <ErrorMessage
                className={`${css.error} ${errors.email && touched.email ? css.errorInput : ""}`}
                name="email"
                component="span"
              />
            </div>

            <Button
              className={css.btnSend}
              color="green"
              width={527}
              text="Send"
              type="submit"
              onClick={() => {}}
            ></Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
