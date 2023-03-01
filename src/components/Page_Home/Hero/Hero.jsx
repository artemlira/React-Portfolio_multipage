import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Hero.module.scss';

function Hero() {
  const { t } = useTranslation();
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.wrapperContent}>
            <div className={styles.content}>
              <h2 className={styles.title}>
                {t('hero_title')}
                <span>{t('hero_title_span')}</span>
              </h2>
              <p className={styles.text}>
                {t('hero_text')}
              </p>
              <Link className={styles.link} to="contacts">{t('hero_link')}</Link>
            </div>
            <div className={styles.wrapperImage}>
              <div className={styles.image} />
              <p className={styles.imageText}>
                <span className={styles.decor} />
                {t('hero_imageText')}
                <span className={styles.spanText}>
                  {t('hero_spanText')}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.quote}>
            <span className={styles.quoteText}>
              {t('hero_quoteText')}
            </span>
            <span className={styles.quoteAvtor}>
              {t('hero_quoteAvtor')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
