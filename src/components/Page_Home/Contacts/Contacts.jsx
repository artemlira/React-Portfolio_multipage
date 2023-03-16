import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Telegram } from '../../../assets/icons/Telegram.svg';
import { ReactComponent as Email } from '../../../assets/icons/Mail.svg';
import styles from './Contacts.module.scss';

function Contacts() {
  const { t } = useTranslation();
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
              <Telegram />
              <a href="https://t.me/Artem_Lira" target="_blank" rel="noreferrer">@Artem_Lira</a>
            </div>
            <div className={styles.email}>
              <Email />
              <a href="mailto:artemliradev@gmail.com">artemliradev@gmail.com</a>
            </div>
          </div>
          <form name="contacts" method="POST" className={styles.form}>
            <input type="hidden" name="form-name" value="contacts" />
            <h4 className={styles.formTitle}>{t('contacts_formTitle')}</h4>
            <div className={styles.label}>
              <input type="text" name="name" className={styles.inputName} placeholder={t('contacts_inputName')} required />
              <input type="email" name="email" className={styles.inputEmail} placeholder={t('contacts_inputEmail')} required />
            </div>
            <input type="text" name="title" className={styles.inputTitle} placeholder={t('contacts_inputTitle')} required />
            <input type="text" name="message" className={styles.message} placeholder={t('contacts_message')} required />
            <button type="submit" className={styles.button}>{t('contacts_button')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Contacts.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default Contacts;
