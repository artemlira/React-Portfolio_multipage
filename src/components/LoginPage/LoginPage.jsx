import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";
import styles from "./LoginPage.module.scss";

function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector((state) => state.auth.status);
  const { t } = useTranslation();
  const [serverError, setServerError] = useState("");
  const isSubmitting = authStatus === "loading";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    setServerError("");

    try {
      const data = await dispatch(fetchUserData(values)).unwrap();
      window.localStorage.setItem("token", data.token);
    } catch (error) {
      setServerError(
        typeof error === "string" ? error : "Не вдалося авторизуватися"
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <section className={styles.loginPage}>
      <div className="container">
        <div className={styles.container}>
          <form
            className={styles.form}
            action="/"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email" className={styles.name}>
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
            <label htmlFor="password" className={styles.password}>
              {t("login_pass")}
              <input
                type="password"
                id="password"
                placeholder={t("login_pass")}
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
              {isSubmitting ? "Входимо..." : t("header_login")}
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

export default LoginPage;
