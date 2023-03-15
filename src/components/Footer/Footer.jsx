import React from 'react';
import LogoLira from '../LogoLira';
import { ReactComponent as LinkedIn } from '../../assets/icons/LinkedLn.svg';
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Git } from '../../assets/icons/Git.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.wrapperContacts}>
              <div className={styles.contacts}>
                <LogoLira />
                <a href="mailto:artemliradev@gmail.com" className={styles.mail}>artemliradev@gmail.com</a>
              </div>
              <p className={styles.text}>Front-end developer</p>
            </div>
            <div className={styles.media}>
              <h3 className={styles.title}>Media</h3>
              <div className={styles.icons}>
                <a href="https://github.com/artemlira" target="_blank" rel="noreferrer">
                  <Git />
                </a>
                <a href="https://linkedin.com/in/артем-ліра-395111246" target="_blank" rel="noreferrer">
                  <LinkedIn />
                </a>
                <a href="https://www.instagram.com/artemlira/" target="_blank" rel="noreferrer">
                  <Instagram />
                </a>
                <a href="https://www.facebook.com/artem.lira" target="_blank" rel="noreferrer">
                  <Facebook />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.authorship}>
            <p>© Copyright 2023. Made by Lira Artem</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
