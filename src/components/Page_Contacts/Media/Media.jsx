import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decode } from "js-base64";
import { selectIsAuth } from "../../../redux/slices/auth";
import { fetchMedias, fetchRemoveMedia } from "../../../redux/slices/medias";
import styles from "./Media.module.scss";

function Media() {
  const { t } = useTranslation();
  const { medias } = useSelector((state) => state.medias);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMedias());
  }, [dispatch]);

  const onClickRemove = (data) => {
    dispatch(fetchRemoveMedia(data));
  };

  return (
    <section className={styles.media}>
      <div className="container">
        <div className="wrapperTitle">
          <h2 className={styles.title}>
            <span>#</span>
            {t("media_title")}
          </h2>
          {isAuth && (
            <Link to="/add-media">
              <AddCircleIcon color="secondary" fontSize="large" />
            </Link>
          )}
        </div>
        <div className={styles.container}>
          {medias.items.map((item) => (
            <>
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={styles.icon}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: decode(item.icon) }}
                />
                <p>{item.name}</p>
              </a>
              {isAuth && (
                <div className="MUI_icons">
                  <Link
                    // eslint-disable-next-line no-underscore-dangle
                    to={`/medias/${item._id}/edit`}
                  >
                    <ModeIcon color="secondary" fontSize="medium" />
                  </Link>
                  <DeleteForeverIcon
                    // eslint-disable-next-line no-underscore-dangle
                    onClick={() => onClickRemove(item._id)}
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

export default Media;
