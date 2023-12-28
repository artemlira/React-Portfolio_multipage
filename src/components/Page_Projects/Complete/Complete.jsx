import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Skeleton } from "@mui/material";
import { Card } from "../../Page_Home/Projects/Projects";
import {
  fetchProjects,
  fetchRemoveProject,
} from "../../../redux/slices/projects";
import { selectIsAuth } from "../../../redux/slices/auth";
// eslint-disable-next-line import/extensions
import DB from "../../../DB.jsx";
import styles from "./Complete.module.scss";

function Complete() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const isAuth = useSelector(selectIsAuth);
  const skiletons = [1, 2, 3];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const onClickRemove = (data) => {
    const { id } = data;
    dispatch(fetchRemoveProject(id));
  };

  const completeApps = projects.items;

  const projectItems = useMemo(() => {
    switch (projects.status) {
      case "loading":
        return skiletons.map((item) => (
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
        ));
      case "error":
        return DB.projects.completeApps.map((project) => (
          <Card
            // eslint-disable-next-line no-underscore-dangle
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
            isAuth={isAuth}
            onClickRemove={onClickRemove}
            // eslint-disable-next-line no-underscore-dangle
            id={project._id}
            small={false}
            t={t}
          />
        ));
      default:
        return completeApps?.map((project) => (
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
            isAuth={isAuth}
            onClickRemove={onClickRemove}
            // eslint-disable-next-line no-underscore-dangle
            id={project._id}
            small={false}
            t={t}
          />
        ));
    }
  }, [completeApps, i18n.language, isAuth, onClickRemove, projects.status, skiletons, t]);

  return (
    <section className={styles.complete}>
      <div className="container">
        <div className="wrapperTitle">
          <h2 className={styles.title}>
            <span>#</span>
            {t("complete_title")}
          </h2>
          {isAuth && (
            <Link to="/add-project">
              <AddCircleIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </div>
        <div className={styles.container}>
          {projectItems}
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
            : completeApps?.map((project) => (
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
                  isAuth={isAuth}
                  onClickRemove={onClickRemove}
                  // eslint-disable-next-line no-underscore-dangle
                  id={project._id}
                  small={false}
                  t={t}
                />
              ))} */}
        </div>
      </div>
    </section>
  );
}

export default Complete;
