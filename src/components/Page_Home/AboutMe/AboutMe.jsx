import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import styles from './AboutMe.module.scss';

function AboutMe() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <section className={styles.aboutMe}>
      <div className="container">
        {pathname === '/' && (
          <h2 className={styles.title}>
            <span>#</span>
            {t('about_title')}
          </h2>
        )}
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.contentLabel}>{t('about_label')}</p>
            <p className={styles.contentAboutMe}>{t('about_aboutMe')}</p>
            <p className={styles.contentText}>{t('about_text')}</p>
            {pathname === '/' && <Link className={styles.link} to="about">{t('about_link')}</Link>}
          </div>
          <div className={styles.image} />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
