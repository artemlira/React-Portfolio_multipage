import React, { forwardRef, useContext } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import { ReactComponent as Logo } from '../../assets/icons/LogoAL.svg';
import { MyContext } from '../Context';
import styles from './Header.module.scss';

const Wrapper = styled.div`
  cursor: pointer;
  
  &:hover{
    #fill{
      fill:#fff;
    }
    p{
      color: #fff;
    }
  }

  #fill{
    fill:#abb2bf;
  }

  .name{
    text-align: center;
  }

  p{
    color: #abb2bf;
    font-weight: 700;
  }
`;

const animation = {
  hidden: {
    x: '100%',
    scale: 0.3
  },
  visible: {
    x: 0,
    scale: 1,
    transition: { duration: 0.4 }
  },
  exit: {
    x: '100%'
  }
};

const setActive = ({ isActive }) => isActive ? 'active-header' : '';

export default function Header() {

  const { openMenu, setOpenMenu } = useContext(MyContext);

  const closeMenuClick = () => {
    setOpenMenu(false)
  }

  const closeMenuKey = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setOpenMenu(false)
    }
  }

  const managementMenuKey = (e) => {
    if (e.type === "keydown" && e.key === "Enter") {
      setOpenMenu(!openMenu)
    }
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          className={styles.container}>
          <Wrapper>
            <Link to="/" className={styles.logo}>
              <Logo />
              <div className="name">
                <p>Lira</p>
                <p>Artem</p>
              </div>
            </Link>
          </Wrapper>
          {
            !openMenu
              ? <Menu openMenu={openMenu} closeMenuClick={closeMenuClick} closeMenuKey={closeMenuKey} />
              : <MMenu variants={animation} openMenu={openMenu} closeMenuClick={closeMenuClick} closeMenuKey={closeMenuKey} />
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

const Menu = forwardRef(({ openMenu, closeMenuClick, closeMenuKey }, ref) => (
  <div className={!openMenu ? `${styles.navWrapper}` : `${styles.navWrapper} ${styles.active}`} ref={ref}>
    <nav className={!openMenu ? `${styles.nav}` : `${styles.active} ${styles.nav}`} >
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
      <select className={styles.language} name="lang">
        <option value="eng">eng</option>
        <option value="ua">ua</option>
      </select>
    </nav>
  </div>
))

Menu.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  closeMenuClick: PropTypes.func.isRequired,
  closeMenuKey: PropTypes.func.isRequired,
};

const MMenu = motion(Menu);
