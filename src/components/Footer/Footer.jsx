import React, { useContext } from 'react';
import LogoLira from '../LogoLira';
import { MyContext } from '../Context';
import styles from './Footer.module.scss';

function Footer() {
  const { media, contacts } = useContext(MyContext);
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.wrapperContacts}>
              <div className={styles.contacts}>
                <LogoLira />
                <a href={`mailto:${contacts && contacts[1]?.value}`} className={styles.mail}>{contacts && contacts[1].value}</a>
              </div>
              <p className={styles.text}>Front-end developer</p>
            </div>
            <div className={styles.media}>
              <h3 className={styles.title}>Media</h3>
              <div className={styles.icons}>
                {media?.map((item) => (
                  <a key={item.id} href={item.link} target="_blank" rel="noreferrer">
                    {item.icon}
                  </a>
                ))}
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
