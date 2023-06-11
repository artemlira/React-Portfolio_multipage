import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../../redux/slices/auth';
import styles from './LoginPage.module.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } else {
      // eslint-disable-next-line no-alert
      alert('Не удалось авторизоваться!');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <section className={styles.loginPage}>
      <div className="container">
        <div className={styles.container}>
          <form className={styles.form} action="/" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className={styles.name}>
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
              Ввійти
            </button>
            <Link to="/auth/register" className={styles.btn}>
              Реєстрація
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
