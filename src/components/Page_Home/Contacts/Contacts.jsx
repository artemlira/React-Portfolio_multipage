import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../Context';
import styles from './Contacts.module.scss';

function Contacts() {
  const { t } = useTranslation();
  const { contacts } = useContext(MyContext);
  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t('contacts_title')}
        </h2>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.text}>
              {t('contacts_text')}
            </p>
            <div className={styles.telegram}>
              {contacts && contacts[2].icon}
              <a href={contacts && contacts[2].value} target="_blank" rel="noreferrer">@Artem_Lira</a>
            </div>
            <div className={styles.email}>
              {contacts && contacts[1].icon}
              <a href={`mailto:${contacts && contacts[1].value}`}>{contacts && contacts[1].value}</a>
            </div>
          </div>
          <form name="contact" method="POST" action="/contact" className={styles.form}>
            <input type="hidden" name="form-name" value="contact" />
            <h4 className={styles.formTitle}>{t('contacts_formTitle')}</h4>
            <div className={styles.label}>
              <input
                type="text"
                name="name"
                className={styles.inputName}
                placeholder={t('contacts_inputName')}
                required
              />
              <input
                type="email"
                name="email"
                className={styles.inputEmail}
                placeholder={t('contacts_inputEmail')}
                required
              />
            </div>
            <input
              type="text"
              name="title"
              className={styles.inputTitle}
              placeholder={t('contacts_inputTitle')}
              required
            />
            <textarea
              name="message"
              className={styles.message}
              placeholder={t('contacts_message')}
              required
            />
            <button type="submit" className={styles.button}>{t('contacts_button')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
