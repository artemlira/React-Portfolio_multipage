import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router";
import { fetchSkills } from "../../../redux/slices/skills";
import getSkillGroups from "../../../utils/skillGroups";
import styles from "./Skills.module.scss";

function Skills() {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills);
  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const { t } = useTranslation();
  const groups = getSkillGroups(skills.items);
  return (
    <section className={styles.skills}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t("skills_title")}
        </h2>
        <div className={styles.container}>
          <div className={styles.skillsContent}>
            <div className={styles.content}>
              {groups.map((group) => (
                <Skill
                  key={group.key}
                  title={t(group.label)}
                  text={group.featured}
                  isAuth={false}
                  onClickRemove={() => {}}
                  id={group.key}
                />
              ))}
            </div>
            <Link className={styles.allSkillsLink} to="/about">
              {t("skills_all_link")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Skill = forwardRef(
  ({ title, text, isAuth, onClickRemove, id }, ref) => (
    <div className={styles.skillWrapper} ref={ref}>
      {isAuth && (
        <div className="MUI_icons">
          <Link to={`/skills/${id}/edit`}>
            <ModeIcon color="secondary" fontSize="medium" />
          </Link>
          <DeleteForeverIcon
            onClick={() => onClickRemove({ id })}
            color="error"
            fontSize="medium"
          />
        </div>
      )}
      <h4 className={styles.skillTitle}>{title}</h4>
      <ul className={styles.skillsList}>
        {text.map((skill) => (
          <li className={styles.skillItem} key={skill}>
            <p className={styles.skillText}>{skill}</p>
          </li>
        ))}
      </ul>
    </div>
  )
);

Skill.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

export default Skills;
