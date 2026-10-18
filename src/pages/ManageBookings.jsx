/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/PageTitle/PageTitle";
import api from "../utils/axios";
import styles from "./ManageBookings.module.scss";

function ManageBookings() {
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      const { data } = await api.get("/bookings");
      setBookings(data);
      setError("");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || t("booking_admin_error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const cancelBooking = async (id) => {
    setRemovingId(id);
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((current) => current.filter((booking) => booking._id !== id));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || t("booking_cancel_error"));
    } finally {
      setRemovingId("");
    }
  };

  const formatDateTime = (value, timezone) => new Intl.DateTimeFormat(
    i18n.language === "ua" ? "uk-UA" : "en-US",
    { dateStyle: "medium", timeStyle: "short", timeZone: timezone },
  ).format(new Date(value));

  return (
    <article className={styles.page}>
      <PageTitle title={t("booking_admin_title")} text={t("booking_admin_description")} />
      <section className="container">
        {loading && <p role="status">{t("booking_loading")}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        {!loading && !bookings.length && !error && <p>{t("booking_admin_empty")}</p>}
        <ul className={styles.list}>
          {bookings.map((booking) => (
            <li className={styles.item} key={booking._id}>
              <div>
                <strong>{formatDateTime(booking.startAt, booking.timezone)}</strong>
                <p>{booking.name} · <a href={`mailto:${booking.email}`}>{booking.email}</a></p>
                <p>{t("booking_response_status")}: {t(`booking_response_${booking.meetingResponse || "pending"}`)}</p>
                {booking.meetUrl && <p><a href={booking.meetUrl} target="_blank" rel="noreferrer">Google Meet</a></p>}
                {booking.note && <p>{booking.note}</p>}
              </div>
              <button type="button" disabled={removingId === booking._id} onClick={() => cancelBooking(booking._id)}>
                {removingId === booking._id ? t("booking_sending") : t("booking_cancel")}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default ManageBookings;
