import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from '../LoginPage/LoginPage.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

function RegisterPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      // eslint-disable-next-line no-alert
      alert('Не удалось зарегистрироваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.registerPage}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} action="/" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className={styles.email}>
              Email
              <input
                type="email"
                id="email"
                placeholder="email"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('email', { required: 'Укажите почту' })}
              />
              {errors.email?.message}
            </label>
            <label htmlFor="fullName" className={styles.name}>
              Имя
              <input
                type="text"
                id="fullName"
                placeholder="Имя" // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('fullName', { required: 'Укажите Имя' })}
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
                {...register('password', { required: 'Укажите пароль' })}
              />
              {errors.password?.message}
            </label>
            <button type="submit" className={styles.btn} disabled={!isValid}>
              Реєстрація
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
