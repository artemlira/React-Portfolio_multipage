import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import styles from "../LoginPage/LoginPage.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector((state) => state.auth.status);
  const [serverError, setServerError] = useState("");
  const isSubmitting = authStatus === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setServerError("");

    try {
      const data = await dispatch(fetchRegister(values)).unwrap();
      window.localStorage.setItem("token", data.token);
    } catch (error) {
      setServerError(
        typeof error === "string" ? error : "Не вдалося зареєструватися"
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.registerPage}>
      <div className="container">
        <div className={styles.container}>
          <form
            className={styles.form}
            action="/"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email" className={styles.email}>
              Email
              <input
                type="email"
                id="email"
                placeholder="email"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("email", { required: "Укажите почту" })}
              />
              {errors.email?.message}
            </label>
            <label htmlFor="fullName" className={styles.name}>
              Имя
              <input
                type="text"
                id="fullName"
                placeholder="Имя" // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("fullName", { required: "Укажите Имя" })}
              />
              {errors.fullName?.message}
            </label>
            <label htmlFor="password" className={styles.password}>
              Пароль
              <input
                type="password"
                id="password"
                placeholder="пароль"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register("password", { required: "Укажите пароль" })}
              />
              {errors.password?.message}
            </label>
            <button
              type="submit"
              className={styles.btn}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Реєструємо..." : "Реєстрація"}
            </button>
            {serverError && (
              <p className={styles.error} role="alert">
                {serverError}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
