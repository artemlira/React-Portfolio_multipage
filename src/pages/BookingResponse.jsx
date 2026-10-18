import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/PageTitle/PageTitle";
import api from "../utils/axios";
import styles from "./BookingResponse.module.scss";

function BookingResponse() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const requestedLocale = searchParams.get("locale");
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (requestedLocale === "uk-UA" || requestedLocale === "en-US") {
      i18n.changeLanguage(requestedLocale === "uk-UA" ? "ua" : "en");
    }
  }, [i18n, requestedLocale]);

  const submitResponse = async (meetingResponse) => {
    if (!token || submitting || response) return;
    setSubmitting(true);
    setError("");
    try {
      const { data } = await api.post("/bookings/respond", { token, response: meetingResponse });
      setResponse(data.response);
    } catch {
      setError(t("booking_response_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className={styles.page}>
      <PageTitle title={t("booking_response_page_title")} text={t("booking_response_page_description")} />
      <section className="container">
        {!token ? <p className={styles.error} role="alert">{t("booking_response_invalid")}</p> : (
          <div className={styles.panel}>
            {response ? (
              <p className={styles.success} role="status">
                {response === "confirmed" ? t("booking_response_saved_yes") : t("booking_response_saved_no")}
              </p>
            ) : (
              <>
                <h2>{t("booking_response_question")}</h2>
                <p>{t("booking_response_description")}</p>
                <div className={styles.actions}>
                  <button type="button" disabled={submitting} onClick={() => submitResponse("confirmed")}>
                    {submitting ? t("booking_sending") : t("booking_response_yes")}
                  </button>
                  <button type="button" disabled={submitting} onClick={() => submitResponse("declined")}>
                    {t("booking_response_no")}
                  </button>
                </div>
                {error && <p className={styles.error} role="alert">{error}</p>}
              </>
            )}
          </div>
        )}
      </section>
    </article>
  );
}

export default BookingResponse;
