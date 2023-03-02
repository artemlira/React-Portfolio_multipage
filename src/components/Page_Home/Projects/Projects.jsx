import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projects } from '../../DBFile';
import styles from './Projects.module.scss';

function Projects() {
  const { t } = useTranslation();
  return (
    <section className={styles.projects}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.label}>
            <div className={styles.title}>
              <h2>
                <span>#</span>
                {t('projects_title')}
              </h2>
            </div>
            <div className={styles.link}>
              <Link to="projects">View all ~~&gt;</Link>
            </div>
          </div>
          <div className={styles.cards}>
            {projects.map((project, index) => (
              index < 3 && (
                <Card
                  key={project.id}
                  img={project.img}
                  skills={project.skills}
                  title={project.title}
                  text={project.shortDescription}
                  git={project.git}
                  deploy={project.deploy}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Card = forwardRef(({
  img, skills, title, text, git, deploy,
}, ref) => (
  <div className={styles.card} ref={ref}>
    <div className={styles.cardImage}>
      <img src={img} alt="njklk" />
    </div>
    <div className={styles.cardSkills}>
      {skills.map((skill) => <span>{skill}</span>)}
    </div>
    <div className={styles.content}>
      <div className={styles.cardTitle}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardDescription}>
        <p>{text}</p>
      </div>
      <div className={styles.cardLinks}>
        <a className={styles.deploy} href={deploy} target="_blank" rel="noreferrer">Deploy</a>
        <a className={styles.git} href={git} target="_blank" rel="noreferrer">Git</a>
      </div>
    </div>
  </div>
));

Card.propTypes = {
  img: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  git: PropTypes.string.isRequired,
  deploy: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Projects;
