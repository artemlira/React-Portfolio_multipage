import React from 'react';
import PropTypes from 'prop-types';
import styles from './PageTitle.module.scss';

function PageTitle({ title, text }) {
  return (
    <section className={styles.pageTitle}>
      <div className="container">
        <h1 className={styles.title}>
          <span>/</span>
          {title}
        </h1>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  );
}

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageTitle;
