import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MyContext } from '../../Context';
import { Card } from '../../Page_Home/Projects/Projects';
import styles from './Complete.module.scss';

function Complete() {
  const { t, i18n } = useTranslation();
  const { projects } = useContext(MyContext);
  return (
    <section className={styles.complete}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t('complete_title')}
        </h2>
        <div className={styles.container}>
          {projects?.completeApps.map((project) => (
            <Card
              key={project.id}
              img={project.img}
              imgWebp={project.imgWebp}
              skills={project.skills}
              title={project.title}
              text={i18n.language === 'en' ? project.shortDescriptionEN : project.shortDescriptionUA}
              git={project.git}
              deploy={project.deploy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  imgWebp: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  git: PropTypes.string.isRequired,
  deploy: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Complete;
