import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { fetchFacts, fetchRemoveFact } from "../../../redux/slices/facts";
import { selectIsAuth } from "../../../redux/slices/auth";
import styles from "./Facts.module.scss";

function Facts() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { facts } = useSelector((state) => state.facts);
  const factsData = facts.items;
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchFacts());
  }, [dispatch]);

  const onClickRemove = (data) => {
    dispatch(fetchRemoveFact(data));
  };
  return (
    <section className={styles.facts}>
      <div className="container">
        <div className="wrapperTitle">
          <h2 className={styles.title}>
            <span>#</span>
            {t("facts_title")}
          </h2>
          {isAuth && (
            <Link to="/add-fact">
              <AddCircleIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </div>
        <div className={styles.container}>
          {factsData.map((fact) => (
            <>
              <p
                // eslint-disable-next-line no-underscore-dangle
                key={fact._id}
              >
                {i18n.language === "en" ? fact.valueEN : fact.valueUA}
              </p>
              {isAuth && (
                <div className="MUI_icons">
                  <Link
                    // eslint-disable-next-line no-underscore-dangle
                    to={`/facts/${fact._id}/edit`}
                  >
                    <ModeIcon color="secondary" fontSize="medium" />
                  </Link>
                  <DeleteForeverIcon
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => onClickRemove(fact._id)}
                    color="error"
                    fontSize="medium"
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Facts;
