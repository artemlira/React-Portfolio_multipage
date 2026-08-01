import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { decode } from "js-base64";
import LogoLira from "../LogoLira";
import { fetchMedias } from "../../redux/slices/medias";
import { fetchContacts } from "../../redux/slices/contacts";
import styles from "./Footer.module.scss";

function Footer() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { medias } = useSelector((state) => state.medias);
  const { contacts } = useSelector((state) => state.contacts);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(fetchMedias());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.wrapperContacts}>
              <div className={styles.contacts}>
                <LogoLira />
                {contacts.items.map(
                  (item) =>
                    item.name.toLowerCase() === "email" && (
                      <a
                        key={item.value}
                        href={`mailto:${item.value}`}
                        className={styles.mail}
                      >
                        {item.value}
                      </a>
                    )
                )}
              </div>
              <p className={styles.text}>{t("footer_role")}</p>
            </div>
            <div className={styles.media}>
              <h3 className={styles.title}>{t("footer_media")}</h3>
              <div className={styles.icons}>
                {medias.items?.map((item) => (
                  <a
                    // eslint-disable-next-line no-underscore-dangle
                    key={item._id}
                    href={item.link}
                    aria-label={item.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={styles.icon}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: decode(item.icon) }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.authorship}>
            <p>{t("footer_copyright", { year: currentYear })}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
