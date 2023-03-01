import React, { forwardRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import { MyContext } from '../Context';
import LogoLira from '../LogoLira';
import styles from './Header.module.scss';

const animation = {
  hidden: {
    x: '100%',
    scale: 0.3,
  },
  visible: {
    x: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    x: '100%',
  },
};

const setActive = ({ isActive }) => (isActive ? 'active-header' : '');

export default function Header() {
  const { openMenu, setOpenMenu } = useContext(MyContext);
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const closeMenuClick = () => {
    setOpenMenu(false);
  };

  const closeMenuKey = (e) => {
    if (e.type === 'keydown' && e.key === 'Enter') {
      setOpenMenu(false);
    }
  };

  const managementMenuKey = (e) => {
    if (e.type === 'keydown' && e.key === 'Enter') {
      setOpenMenu(!openMenu);
    }
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
          {
            !openMenu
              ? (
                <Menu
                  openMenu={openMenu}
                  closeMenuClick={closeMenuClick}
                  closeMenuKey={closeMenuKey}
                  changeLanguage={changeLanguage}
                />
              )
              : (
                <MMenu
                  variants={animation}
                  openMenu={openMenu}
                  closeMenuClick={closeMenuClick}
                  closeMenuKey={closeMenuKey}
                  changeLanguage={changeLanguage}
                />
              )
          }
          <div
            role="button"
            tabIndex={0}
            className={!openMenu ? `${styles.burgerMenu}` : `${styles.burgerMenu} ${styles.active}`}
            onClick={() => setOpenMenu(!openMenu)}
            onKeyDown={(e) => managementMenuKey(e)}
          >
            <span className={!openMenu ? `${styles.menuTablet}` : `${styles.menuTablet} ${styles.active}`} />
          </div>
        </motion.div>
      </div>
    </header>
  );
}

const Menu = forwardRef(({
  openMenu, closeMenuClick, closeMenuKey, changeLanguage,
}, ref) => (
  <div className={!openMenu ? `${styles.navWrapper}` : `${styles.navWrapper} ${styles.active}`} ref={ref}>
    <nav className={!openMenu ? `${styles.nav}` : `${styles.active} ${styles.nav}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={setActive}
            onClick={() => closeMenuClick()}
            onKeyDown={(e) => closeMenuKey(e)}
          >
            <span>#</span>
            home
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
            projects
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
            about-me
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
            contacts
          </NavLink>
        </li>
      </ul>
      <button type="button" onClick={() => changeLanguage('en')}>en</button>
      <button type="button" onClick={() => changeLanguage('ua')}>ua</button>
      {/* <select className={styles.language} name="lang">
        <option value="en" onClick={() => changeLanguage('en')}>en</option>
        <option value="ua" onClick={() => changeLanguage('ua')}>ua</option>
      </select> */}
    </nav>
  </div>
));

Menu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  closeMenuClick: PropTypes.func.isRequired,
  closeMenuKey: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

const MMenu = motion(Menu);
