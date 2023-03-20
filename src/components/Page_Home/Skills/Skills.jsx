import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../Context';
import styles from './Skills.module.scss';

function Skills() {
  const { t, i18n } = useTranslation();
  const { skills } = useContext(MyContext);
  return (
    <section className={styles.skills}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t('skills_title')}
        </h2>
        <div className={styles.container}>
          <div className={styles.content}>
            {skills.map((item) => (
              <Skill
                key={item.id}
                title={i18n.language === 'en' ? item.categoryEN : item.categoryUA}
                text={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Skill = forwardRef(({ title, text }, ref) => (
  <div className={styles.skillWrapper} ref={ref}>
    <h4 className={styles.skillTitle}>{title}</h4>
    <ul className={styles.skillsList}>
      {text.map((skill) => (
        <li className={styles.skillItem} key={skill}>
          <p className={styles.skillText}>{skill}</p>
        </li>
      ))}
    </ul>
  </div>
));

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Skills;
