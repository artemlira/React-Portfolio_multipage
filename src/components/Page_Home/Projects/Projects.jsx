import React, { forwardRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, IconButton, Skeleton } from "@mui/material";
import { Link } from "react-router";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchProjects } from "../../../redux/slices/projects";
import sortProjectsByNewest from "../../../utils/projects";
// eslint-disable-next-line import/extensions
import DB from "../../../DB.jsx";
import styles from "./Projects.module.scss";

function Projects() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const projectItems = useMemo(() => {
    switch (projects.status) {
      case "loading":
        return [1, 2, 3].map((item) => (
          <Box sx={{ width: "100%" }} key={item}>
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
        ));
      case "error":
        return sortProjectsByNewest(DB.projects.completeApps).map((project) => (
          <Card
            key={project.id}
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
            id={project.id?.toString()}
            small={false}
            t={t}
          />
        ));
      default:
        return sortProjectsByNewest(projects.items).map((project) => (
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
            t={t}
          />
        ));
    }
  }, [i18n.language, projects.items, projects.status, t]);

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
          <div className={styles.sliderWrapper}>
            <Swiper
              className={styles.slider}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              spaceBetween={16}
              breakpoints={{
                600: {
                  slidesPerView: 2,
                },
                993: {
                  slidesPerView: 3,
                },
              }}
            >
              {projectItems.map((projectItem, index) => (
                <SwiperSlide
                  className={styles.slide}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`slide-${projectItem.key ?? index}`}
                >
                  {projectItem}
                </SwiperSlide>
              ))}
            </Swiper>
            {/* {projects?.status === "loading"
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
              : projects.status !== "error" &&
                projects.items.map(
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
                        t={t}
                      />
                    )
                )} */}
          </div>
        </div>
      </div>
    </section>
  );
}

const hasValue = (value) => {
  if (Array.isArray(value)) {
    return value.some((item) => hasValue(item));
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Boolean(value);
};

export const Card = forwardRef(
  (
    {
      img,
      imgWebp,
      skills = [],
      title,
      text,
      git,
      deploy,
      isAuth,
      onClickRemove,
      id,
      small,
      t,
    },
    ref
  ) => {
    const filteredSkills = Array.isArray(skills)
      ? skills.filter((skill) => hasValue(skill))
      : [];
    const imageSrc = hasValue(img) ? img : imgWebp;
    const hasImage = hasValue(imageSrc);
    const hasLinks = hasValue(deploy) || hasValue(git);
    const canManage = isAuth && hasValue(id);

    return (
      <div className={styles.card} ref={ref}>
        {hasImage && (
          <div className={styles.cardImage}>
            <picture>
              {hasValue(imgWebp) && (
                <source srcSet={imgWebp} type="image/webp" />
              )}
              <img src={imageSrc} alt={hasValue(title) ? title : ""} />
            </picture>
          </div>
        )}
        {filteredSkills.length > 0 && (
          <div className={styles.cardSkills}>
            {filteredSkills.map((skill, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={`${skill}-${index}`}>
                <span>#</span>
                {skill}
              </p>
            ))}
          </div>
        )}
        <div className={styles.content}>
          {hasValue(title) && (
            <div className={styles.cardTitle}>
              <h3>{title}</h3>
            </div>
          )}
          {hasValue(text) && (
            <div className={styles.cardDescription}>
              <p>{text}</p>
            </div>
          )}
          {hasLinks && (
            <div className={styles.cardLinks}>
              {hasValue(deploy) && (
                <a
                  className={styles.deploy}
                  href={deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("project_deploy")}
                </a>
              )}
              {hasValue(git) && (
                <a
                  className={styles.git}
                  href={git}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("project_code")}
                </a>
              )}
            </div>
          )}
          {canManage && (
            <div className="MUI_icons">
              <Link
                to={small ? `/smalls/${id}/edit` : `${id}/edit`}
                aria-label={`Редагувати ${title || "проект"}`}
              >
                <ModeIcon color="secondary" fontSize="medium" />
              </Link>
              <IconButton
                aria-label={`Видалити ${title || "проект"}`}
                onClick={() => onClickRemove({ id })}
                color="error"
                size="small"
              >
                <DeleteForeverIcon fontSize="medium" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Card.propTypes = {
  img: PropTypes.string,
  id: PropTypes.string,
  imgWebp: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  git: PropTypes.string,
  deploy: PropTypes.string,
  text: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Card.defaultProps = {
  img: "",
  id: "",
  imgWebp: "",
  skills: [],
  title: "",
  git: "",
  deploy: "",
  text: "",
};

export default Projects;
