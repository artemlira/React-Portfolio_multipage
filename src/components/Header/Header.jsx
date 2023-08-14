import React, { forwardRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LogoLira from "../LogoLira";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Header.module.scss";

const animation = {
  hidden: {
    x: "100%",
    scale: 0.3,
  },
  visible: {
    x: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    x: "100%",
  },
};

const setActive = ({ isActive }) => (isActive ? "active-header" : "");

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang] = useState(i18n.language);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const closeMenuClick = () => {
    setOpenMenu(false);
  };

  const closeMenuKey = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setOpenMenu(false);
    }
  };

  const managementMenuKey = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setOpenMenu(!openMenu);
    }
  };

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.container}
        >
          <LogoLira />
          {!openMenu ? (
            <Menu
              variants={animation}
              openMenu={openMenu}
              closeMenuClick={closeMenuClick}
              closeMenuKey={closeMenuKey}
              changeLanguage={changeLanguage}
              t={t}
              lang={lang}
              onClickLogout={onClickLogout}
              isAuth={isAuth}
            />
          ) : (
            <MMenu
              variants={animation}
              openMenu={openMenu}
              closeMenuClick={closeMenuClick}
              closeMenuKey={closeMenuKey}
              changeLanguage={changeLanguage}
              t={t}
              lang={lang}
              onClickLogout={onClickLogout}
              isAuth={isAuth}
            />
          )}
          <div
            role="button"
            tabIndex={0}
            className={
              !openMenu
                ? `${styles.burgerMenu}`
                : `${styles.burgerMenu} ${styles.active}`
            }
            onClick={() => setOpenMenu(!openMenu)}
            onKeyDown={(e) => managementMenuKey(e)}
          >
            <span
              className={
                !openMenu
                  ? `${styles.menuTablet}`
                  : `${styles.menuTablet} ${styles.active}`
              }
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}

const Menu = forwardRef(
  (
    {
      openMenu,
      closeMenuClick,
      closeMenuKey,
      changeLanguage,
      t,
      lang,
      onClickLogout,
      isAuth,
    },
    ref
  ) => (
    <div
      className={
        !openMenu
          ? `${styles.navWrapper}`
          : `${styles.navWrapper} ${styles.active}`
      }
      ref={ref}
    >
      <nav
        className={
          !openMenu ? `${styles.nav}` : `${styles.active} ${styles.nav}`
        }
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/"
              className={setActive}
              onClick={() => closeMenuClick()}
              onKeyDown={(e) => closeMenuKey(e)}
            >
              <span>#</span>
              {t("header_home")}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="projects"
              className={setActive}
              onClick={() => closeMenuClick()}
              onKeyDown={(e) => closeMenuKey(e)}
            >
              <span>#</span>
              {t("header_projects")}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="about"
              className={setActive}
              onClick={() => closeMenuClick()}
              onKeyDown={(e) => closeMenuKey(e)}
            >
              <span>#</span>
              {t("header_about")}
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="contacts"
              className={setActive}
              onClick={() => closeMenuClick()}
              onKeyDown={(e) => closeMenuKey(e)}
            >
              <span>#</span>
              {t("header_contacts")}
            </NavLink>
          </li>
        </ul>
        {isAuth ? (
          <button className={styles.out} onClick={onClickLogout} type="button">
            {t("header_out")}
          </button>
        ) : (
          <Link className={styles.login} to="auth/login">
            {t("header_login")}
          </Link>
        )}

        <select
          defaultValue={lang}
          onChange={(e) => {
            changeLanguage(e.target.value);
          }}
          className={styles.language}
          name="lang"
        >
          <option value="en">en</option>
          <option value="ua">ua</option>
        </select>
      </nav>
    </div>
  )
);

Menu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  closeMenuClick: PropTypes.func.isRequired,
  closeMenuKey: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

const MMenu = motion(Menu);
