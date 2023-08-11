import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Skeleton } from "@mui/material";
import { Card } from "../../Page_Home/Projects/Projects";
import {
  fetchRemoveSmallProject,
  fetchSmallProjects,
} from "../../../redux/slices/smallProjects";
import { selectIsAuth } from "../../../redux/slices/auth";
import styles from "./Small.module.scss";

function Small() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { smallProjects } = useSelector((state) => state.smallProjects);
  const isAuth = useSelector(selectIsAuth);
  const skiletons = [1, 2, 3];

  useEffect(() => {
    dispatch(fetchSmallProjects());
  }, [dispatch]);

  const onClickRemove = (data) => {
    const { id } = data;
    dispatch(fetchRemoveSmallProject(id));
  };

  const projects = smallProjects.items;

  return (
    <section className={styles.small}>
      <div className="container">
        <div className="wrapperTitle">
          <h2 className={styles.title}>
            <span>#</span>
            {t("small_title")}
          </h2>
          {isAuth && (
            <Link to="/add-small">
              <AddCircleIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </div>
        <div className={styles.container}>
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
            : projects?.map((project) => (
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
                  small
                  t={t}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default Small;
