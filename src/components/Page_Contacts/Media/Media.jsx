import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../Context';
import styles from './Media.module.scss';

function Media() {
  const { t } = useTranslation();
  const { media } = useContext(MyContext);
  return (
    <section className={styles.media}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t('media_title')}
        </h2>
        <div className={styles.container}>
          {media.map((item) => (
            <a key={item.id} href={item.link} target="_blank" rel="noreferrer">
              {item.icon}
              <p>{item.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Media;
