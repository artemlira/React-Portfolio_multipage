import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Skill } from '../../Page_Home/Skills/Skills';
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
          {skills.map((item) => (
            <Skill
              key={item.id}
              title={i18n.language === 'en' ? item.categoryEN : item.categoryUA}
              text={item.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
