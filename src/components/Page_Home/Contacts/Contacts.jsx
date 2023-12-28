import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { atob } from "js-base64";
import { fetchContacts } from "../../../redux/slices/contacts";
import styles from "./Contacts.module.scss";

function Contacts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={styles.title}>
          <span>#</span>
          {t("contacts_title")}
        </h2>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={styles.text}>{t("contacts_text")}</p>
            {contacts.items.map((item) => (
              <div key={item.value}>
                {item.name.toLowerCase() === "email" && (
                  <a key={item.value} href={`mailto:${item?.value}`}>
                    <div
                      className={styles.icon}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: atob(item.icon) }}
                    />
                    {item?.value}
                  </a>
                )}
                {item.name.toLowerCase() === "telegram" && (
                  <a
                    key={item.value}
                    href={item?.value}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={styles.icon}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: atob(item.icon) }}
                    />
                    {item?.value}
                  </a>
                )}
              </div>
            ))}
          </div>
          <form
            name="contact"
            method="POST"
            action="/contact"
            className={styles.form}
          >
            <input type="hidden" name="form-name" value="contact" />
            <h4 className={styles.formTitle}>{t("contacts_formTitle")}</h4>
            <div className={styles.label}>
              <input
                type="text"
                name="name"
                className={styles.inputName}
                placeholder={t("contacts_inputName")}
                required
              />
              <input
                type="email"
                name="email"
                className={styles.inputEmail}
                placeholder={t("contacts_inputEmail")}
                required
              />
            </div>
            <input
              type="text"
              name="title"
              className={styles.inputTitle}
              placeholder={t("contacts_inputTitle")}
              required
            />
            <textarea
              name="message"
              className={styles.message}
              placeholder={t("contacts_message")}
              required
            />
            <button type="submit" className={styles.button}>
              {t("contacts_button")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
