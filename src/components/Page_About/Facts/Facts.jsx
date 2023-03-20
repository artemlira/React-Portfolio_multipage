import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../Context';
import styles from './Facts.module.scss';

function Facts() {
  const { t, i18n } = useTranslation();
  const { facts } = useContext(MyContext);
  return (
    <section className={styles.facts}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t('facts_title')}
        </h2>
        <div className={styles.container}>
          {i18n.language === 'en' && facts.valueEN.map((fact) => <p key={fact}>{fact}</p>)}
          {i18n.language === 'ua' && facts.valueUA.map((fact) => <p key={fact}>{fact}</p>)}
        </div>
      </div>
    </section>
  );
}

export default Facts;
