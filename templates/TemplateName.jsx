import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './TemplateName.module.scss';

function TemplateName({ props }) {
  const { t } = useTranslation();
  return (
    <section className={styles.templateName}>
      <div className="container">
        <div className={styles.container}>
          {t('TemplateName Component')}
          TemplateName Component
          {' '}
          {props}
        </div>
      </div>
    </section>
  );
}

TemplateName.propTypes = {
  props: PropTypes.string.isRequired,
};

export default TemplateName;
