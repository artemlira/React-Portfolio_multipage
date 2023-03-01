import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
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
                Artem Lira is a
                <span> front-end developer</span>
              </h2>
              <p className={styles.text}>
                {t('title')}
                {/* He crafts responsive websites where technologies meet creativity */}
              </p>
              <Link className={styles.link} to="contacts">Contact me!!</Link>
            </div>
            <div className={styles.wrapperImage}>
              <div className={styles.image} />
              <p className={styles.imageText}>
                <span className={styles.decor} />
                Currently working on
                <span className={styles.spanText}> Portfolio</span>
              </p>
            </div>
          </div>
          <div className={styles.quote}>
            <span className={styles.quoteText}>With great power comes great electricity bill</span>
            <span className={styles.quoteAvtor}>- Dr. Who</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
