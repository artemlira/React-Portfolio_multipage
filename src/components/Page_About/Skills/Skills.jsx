import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { Skill } from "../../Page_Home/Skills/Skills";
import { selectIsAuth } from "../../../redux/slices/auth";
import { fetchRemoveSkill, fetchSkills } from "../../../redux/slices/skills";
import styles from "./Skills.module.scss";

function Skills() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const onClickRemove = (data) => {
    const { id } = data;
    dispatch(fetchRemoveSkill(id));
  };

  return (
    <section className={styles.skills}>
      <div className="container">
        <div className="wrapperTitle">
          <h2 className={styles.title}>
            <span>#</span>
            {t("skills_title")}
          </h2>
          {isAuth && (
            <Link to="/add-skill">
              <AddCircleIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </div>
        <div className={styles.container}>
          {skills.items.map((item) => (
            <Skill
              // eslint-disable-next-line no-underscore-dangle
              key={item._id}
              title={i18n.language === "en" ? item.categoryEN : item.categoryUA}
              text={item.value}
              isAuth={isAuth}
              onClickRemove={onClickRemove}
              // eslint-disable-next-line no-underscore-dangle
              id={item._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
