import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/LogoAL.svg';
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

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.container}>
          <Wrapper className={styles.logo}>
            <Logo />
            <div className="name">
              <p>Lira</p>
              <p>Artem</p>
            </div>
          </Wrapper>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a href="/">
                  <span>#</span>
                  home
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/">
                  <span>#</span>
                  works
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/">
                  <span>#</span>
                  about-me
                </a>
              </li>
              <li className={styles.navItem}>
                <a href="/">
                  <span>#</span>
                  contacts
                </a>
              </li>
            </ul>
            <select className={styles.language} name="lang">
              <option value="eng">eng</option>
              <option value="ua">ua</option>
            </select>
          </nav>
        </div>
      </div>
    </header>
  );
}
