import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import PageTitle from "../components/PageTitle/PageTitle";
import styles from "./PrivacyPolicy.module.scss";

const sectionKeys = [
  "privacy_data",
  "privacy_booking",
  "privacy_calendar",
  "privacy_analytics",
  "privacy_antispam",
  "privacy_retention",
  "privacy_rights",
  "privacy_contact",
];

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <article className={styles.page}>
      <PageTitle title={t("privacy_title")} text={t("privacy_intro")} />
      <section className={`container ${styles.content}`}>
        <p className={styles.updated}>{t("privacy_updated")}</p>
        {sectionKeys.map((key) => (
          <section className={styles.section} key={key}>
            <h2>{t(`${key}_title`)}</h2>
            <p>{t(`${key}_text`)}</p>
          </section>
        ))}
        <p className={styles.contactLink}>
          <Link to="/contacts">{t("privacy_contact_link")}</Link>
        </p>
      </section>
    </article>
  );
}

export default PrivacyPolicy;
