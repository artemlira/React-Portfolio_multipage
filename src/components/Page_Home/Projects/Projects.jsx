import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../../redux/slices/projects";
import styles from "./Projects.module.scss";

function Projects() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const skiletons = [1, 2, 3];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <section className={styles.projects}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.label}>
            <div className={styles.title}>
              <h2>
                <span>#</span>
                {t("projects_title")}
              </h2>
            </div>
            <div className={styles.link}>
              <Link to="projects">
                {t("projects_link")}
                ~~&gt;
              </Link>
            </div>
          </div>
          <div className={styles.cards}>
            {projects?.status === "loading"
              ? skiletons.map((item) => (
                  <Box sx={{ width: 300 }} key={item}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton animation="wave" width={80} height={40} />
                      <Skeleton animation="wave" width={80} height={40} />
                    </Box>
                  </Box>
                ))
              : projects.items.map(
                  (project, index) =>
                    index < 3 && (
                      <Card
                        // eslint-disable-next-line no-underscore-dangle
                        key={project._id}
                        img={project.img}
                        imgWebp={project.imgWebp}
                        skills={project.skills}
                        title={project.title}
                        text={
                          i18n.language === "en"
                            ? project.shortDescriptionEN
                            : project.shortDescriptionUA
                        }
                        git={project.git}
                        deploy={project.deploy}
                        isAuth={false}
                        onClickRemove={() => {}}
                        // eslint-disable-next-line no-underscore-dangle
                        id={project._id}
                        small={false}
                      />
                    )
                )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Card = forwardRef(
  (
    {
      img,
      imgWebp,
      skills,
      title,
      text,
      git,
      deploy,
      isAuth,
      onClickRemove,
      id,
      small,
    },
    ref
  ) => (
    <div className={styles.card} ref={ref}>
      <div className={styles.cardImage}>
        <picture>
          <source srcSet={imgWebp} type="image/webp" />
          <img src={img} alt={title} />
        </picture>
      </div>
      <div className={styles.cardSkills}>
        {skills.map((skill) => (
          <p key={skill}>
            <span>#</span>
            {skill}
          </p>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.cardTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.cardDescription}>
          <p>{text}</p>
        </div>
        <div className={styles.cardLinks}>
          <a
            className={styles.deploy}
            href={deploy}
            target="_blank"
            rel="noreferrer"
          >
            Deploy
          </a>
          <a className={styles.git} href={git} target="_blank" rel="noreferrer">
            Git
          </a>
        </div>
        {isAuth && (
          <div className="MUI_icons">
            <Link to={small ? `/smalls/${id}/edit` : `${id}/edit`}>
              <ModeIcon color="secondary" fontSize="medium" />
            </Link>
            <DeleteForeverIcon
              onClick={() => onClickRemove({ id })}
              color="error"
              fontSize="medium"
            />
          </div>
        )}
      </div>
    </div>
  )
);

Card.propTypes = {
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgWebp: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  git: PropTypes.string.isRequired,
  deploy: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default Projects;
