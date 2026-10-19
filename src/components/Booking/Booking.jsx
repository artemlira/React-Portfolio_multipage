import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import api from "../../utils/axios";
import styles from "./Booking.module.scss";

const BOOKING_TIMEZONE = import.meta.env.VITE_BOOKING_TIMEZONE || "Europe/Kyiv";

const getDateInTimezone = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const dateFromKey = (dateKey) => new Date(`${dateKey}T12:00:00Z`);
const monthFromKey = (monthKey) => new Date(`${monthKey}-01T12:00:00Z`);
const getMonthKey = (date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;

const getMonthOffset = (monthKey, offset) => {
  const [year, month] = monthKey.split("-").map(Number);
  return getMonthKey(new Date(Date.UTC(year, month - 1 + offset, 1, 12)));
};

function Booking({ showSectionHeading = false }) {
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const [timezone, setTimezone] = useState(BOOKING_TIMEZONE);
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [bookingWindowDays, setBookingWindowDays] = useState(14);
  const [currentMonth, setCurrentMonth] = useState("");
  const [firstMonth, setFirstMonth] = useState("");
  const [lastMonth, setLastMonth] = useState("");
  const [monthDays, setMonthDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [todayDate, setTodayDate] = useState("");
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDate, setLoadingDate] = useState(false);
  const [configReady, setConfigReady] = useState(false);
  const [legacyMonthApi, setLegacyMonthApi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const locale = i18n.language === "ua" ? "uk-UA" : "en-US";
  const formatDate = (dateKey, options) => new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "UTC",
  }).format(dateFromKey(dateKey));

  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" })
      .format(new Date(Date.UTC(2023, 0, index + 2, 12))),
  ), [locale]);

  const calendarCells = useMemo(() => {
    if (!currentMonth) return [];
    const [year, month] = currentMonth.split("-").map(Number);
    const firstWeekday = (new Date(Date.UTC(year, month - 1, 1, 12)).getUTCDay() + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const daysByDate = new Map(monthDays.map((day) => [day.date, day]));
    const cells = [
      ...Array.from({ length: firstWeekday }, (_, index) => ({ key: `empty-${index}`, empty: true })),
      ...Array.from({ length: daysInMonth }, (_, index) => {
        const dayNumber = index + 1;
        const date = `${currentMonth}-${String(dayNumber).padStart(2, "0")}`;
        return { key: date, date, dayNumber, availability: daysByDate.get(date) };
      }),
    ];
    const trailingCount = (7 - (cells.length % 7)) % 7;
    return [
      ...cells,
      ...Array.from({ length: trailingCount }, (_, index) => ({ key: `trailing-${index}`, empty: true })),
    ];
  }, [currentMonth, monthDays]);

  useEffect(() => {
    let active = true;
    const loadConfig = async () => {
      try {
        const { data } = await api.get("/bookings/config");
        if (!active) return;
        const today = getDateInTimezone(new Date(), data.timezone);
        const lastDate = new Date(`${today}T12:00:00Z`);
        lastDate.setUTCDate(lastDate.getUTCDate() + data.bookingWindowDays);
        setTimezone(data.timezone);
        setTodayDate(today);
        setDurationMinutes(data.durationMinutes);
        setBookingWindowDays(data.bookingWindowDays);
        setFirstMonth(today.slice(0, 7));
        setLastMonth(getMonthKey(lastDate));
        setCurrentMonth(today.slice(0, 7));
        setConfigReady(true);
      } catch (requestError) {
        if (active) setError(requestError?.response?.data?.message || t("booking_load_error"));
      } finally {
        if (active) setLoadingConfig(false);
      }
    };
    loadConfig();
    return () => { active = false; };
  }, [t]);

  useEffect(() => {
    if (!configReady || !currentMonth) return undefined;
    let active = true;
    const loadMonth = async () => {
      setLoadingMonth(true);
      setError("");
      setSuccess("");
      setSelectedDate("");
      setSlots([]);
      setSelectedSlot(null);
      try {
        const { data } = await api.get("/bookings/availability", {
          params: { month: currentMonth },
        });
        if (active) {
          setLegacyMonthApi(false);
          setMonthDays(data.days);
          setTimezone(data.timezone);
          setDurationMinutes(data.durationMinutes);
        }
      } catch (requestError) {
        if (active) {
          const responseMessage = requestError?.response?.data?.message;
          if (requestError?.response?.status === 400 && responseMessage === "Оберіть коректну дату.") {
            const [year, month] = currentMonth.split("-").map(Number);
            const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
            const lastDate = new Date(`${todayDate}T12:00:00Z`);
            lastDate.setUTCDate(lastDate.getUTCDate() + bookingWindowDays);
            const lastBookableDate = getDateInTimezone(lastDate, "UTC");
            const fallbackDays = Array.from({ length: daysInMonth }, (_, index) => {
              const date = `${currentMonth}-${String(index + 1).padStart(2, "0")}`;
              return { date, isBookable: date >= todayDate && date <= lastBookableDate, slots: [] };
            });
            setLegacyMonthApi(true);
            setMonthDays(fallbackDays);
            setError("");
          } else {
            setMonthDays([]);
            setError(responseMessage || t("booking_load_error"));
          }
        }
      } finally {
        if (active) setLoadingMonth(false);
      }
    };
    loadMonth();
    return () => { active = false; };
  }, [bookingWindowDays, configReady, currentMonth, t, todayDate]);

  const selectDate = async (day) => {
    if (!day.availability?.isBookable) return;
    setSelectedDate(day.date);
    setSlots(day.availability.slots || []);
    setSelectedSlot(null);
    setError("");
    setSuccess("");
    if (!legacyMonthApi) return;
    setLoadingDate(true);
    try {
      const { data } = await api.get("/bookings/availability", { params: { date: day.date } });
      setSlots(data.slots || []);
      setTimezone(data.timezone);
      setDurationMinutes(data.durationMinutes);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || t("booking_load_error"));
    } finally {
      setLoadingDate(false);
    }
  };

  const refreshCurrentMonth = async () => {
    const { data } = await api.get("/bookings/availability", {
      params: { month: currentMonth },
    });
    setMonthDays(data.days);
    const updatedDay = data.days.find((day) => day.date === selectedDate);
    setSlots(updatedDay?.slots || []);
    setSelectedSlot(null);
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    if (!selectedSlot) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await api.post("/bookings", {
        name: form.get("name"),
        email: form.get("email"),
        note: form.get("note"),
        website: form.get("website"),
        startAt: selectedSlot.startAt,
        locale: i18n.language,
      });
      formElement.reset();
      setSuccess(t("booking_success"));
      if (!data.notificationSent) setError(t("booking_notification_warning"));
      try {
        await refreshCurrentMonth();
      } catch {
        // The booking already succeeded; keep its success state if refreshing availability fails.
      }
    } catch (requestError) {
      setError(requestError?.response?.data?.message || t("booking_submit_error"));
      try {
        await refreshCurrentMonth();
      } catch {
        // Keep the booking error visible if availability refresh also fails.
      }
    } finally {
      setSubmitting(false);
    }
  };

  const monthLabel = currentMonth
    ? new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" })
      .format(monthFromKey(currentMonth))
    : "";

  return (
    <section className={styles.section} aria-labelledby="booking-title">
      <div className="container">
        {showSectionHeading && (
          <h2 className={styles.sectionTitle}>
            <span>#</span>
            {t("booking_section_title", {
              defaultValue: i18n.language === "ua" ? "давайте зустрінемось" : "let’s talk",
            })}
          </h2>
        )}
        <div className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <p className={styles.kicker}>{t("booking_kicker")}</p>
              <h2 id="booking-title">{t("booking_title")}</h2>
              <p className={styles.description}>{t("booking_description", { duration: durationMinutes })}</p>
            </div>
            {isAuth && <Link to="/bookings/manage" className={styles.manageLink}>{t("booking_manage")}</Link>}
          </div>

          {loadingConfig ? <p role="status">{t("booking_loading")}</p> : (
            <>
              {configReady && (
                <div className={styles.calendar}>
                  <div className={styles.calendarHeader}>
                    <button
                      className={styles.monthNav}
                      type="button"
                      aria-label={t("booking_previous_month")}
                      disabled={currentMonth <= firstMonth || loadingMonth}
                      onClick={() => setCurrentMonth(getMonthOffset(currentMonth, -1))}
                    >
                      <span aria-hidden="true">‹</span>
                    </button>
                    <h3>{monthLabel}</h3>
                    <button
                      className={styles.monthNav}
                      type="button"
                      aria-label={t("booking_next_month")}
                      disabled={currentMonth >= lastMonth || loadingMonth}
                      onClick={() => setCurrentMonth(getMonthOffset(currentMonth, 1))}
                    >
                      <span aria-hidden="true">›</span>
                    </button>
                  </div>

                  <div className={styles.calendarGrid} role="group" aria-label={t("booking_choose_date")}>
                    {weekdays.map((weekday) => (
                      <span className={styles.weekday} key={weekday}>{weekday}</span>
                    ))}
                    {calendarCells.map((cell) => {
                      if (cell.empty) return <span aria-hidden="true" className={styles.calendarBlank} key={cell.key} />;
                      const day = cell.availability;
                      const isAvailable = Boolean(day?.isBookable && (legacyMonthApi || day.slots.length));
                      const isSelected = selectedDate === cell.date;
                      const isToday = todayDate === cell.date;
                      const dayClass = [
                        styles.calendarDay,
                        isAvailable ? styles.availableDay : styles.unavailableDay,
                        isSelected ? styles.selectedDate : "",
                        isToday ? styles.todayDate : "",
                      ].filter(Boolean).join(" ");
                      const label = formatDate(cell.date, { weekday: "long", day: "numeric", month: "long" });
                      const accessibleLabel = [
                        label,
                        isToday ? t("booking_today") : "",
                        t(legacyMonthApi ? "booking_check_availability" : "booking_day_available"),
                      ].filter(Boolean).join(", ");
                      return isAvailable ? (
                        <button
                          aria-label={accessibleLabel}
                          aria-pressed={isSelected}
                          className={dayClass}
                          key={cell.key}
                          type="button"
                          disabled={loadingMonth || loadingDate}
                          onClick={() => selectDate(cell)}
                        >
                          <span>{cell.dayNumber}</span>
                          <span aria-hidden="true" className={styles.availabilityDot} />
                        </button>
                      ) : (
                        <span className={dayClass} key={cell.key}>
                          <span>{cell.dayNumber}</span>
                        </span>
                      );
                    })}
                  </div>
                  {loadingMonth && <p className={styles.calendarStatus} role="status">{t("booking_loading")}</p>}
                </div>
              )}

              {selectedDate && (
                <div className={styles.timeArea}>
                  <div className={styles.timeHeading}>
                    <h3>{t("booking_available_times")}</h3>
                    <span>{t("booking_timezone", { timezone })}</span>
                  </div>
                  {loadingDate && <p className={styles.calendarStatus} role="status">{t("booking_loading")}</p>}
                  {!loadingDate && slots.length > 0 && (
                    <div className={styles.timeList}>
                      {slots.map((slot) => (
                        <button
                          className={`${styles.timeButton} ${selectedSlot?.startAt === slot.startAt ? styles.selected : ""}`}
                          key={slot.startAt}
                          type="button"
                          aria-pressed={selectedSlot?.startAt === slot.startAt}
                          onClick={() => { setSelectedSlot(slot); setError(""); setSuccess(""); }}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {!loadingDate && slots.length === 0 && <p className={styles.empty}>{t("booking_no_slots")}</p>}
                </div>
              )}

              {!loadingMonth && !error && !legacyMonthApi && configReady && !monthDays.some((day) => day.slots.length) && (
                <p className={styles.empty}>{t("booking_no_month_slots")}</p>
              )}

              {selectedSlot && (
                <form className={styles.form} onSubmit={submitBooking}>
                  <div className={styles.honeypot} aria-hidden="true">
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <h3>{t("booking_form_title", {
                    date: formatDate(selectedDate, { dateStyle: "medium" }),
                    time: selectedSlot.label,
                  })}</h3>
                  <div className={styles.formRow}>
                    <label htmlFor="booking-name">{t("booking_name")}<input id="booking-name" name="name" autoComplete="name" maxLength="100" required /></label>
                    <label htmlFor="booking-email">{t("booking_email")}<input id="booking-email" name="email" type="email" autoComplete="email" maxLength="254" required /></label>
                  </div>
                  <label htmlFor="booking-note">{t("booking_note")}<textarea id="booking-note" name="note" maxLength="1000" rows="3" /></label>
                  <button className={styles.submit} type="submit" disabled={submitting}>
                    {submitting ? t("booking_sending") : t("booking_submit")}
                  </button>
                </form>
              )}
            </>
          )}
          {error && <p className={styles.error} role="alert">{error}</p>}
          {success && <p className={styles.success} role="status">{success}</p>}
        </div>
      </div>
    </section>
  );
}

Booking.propTypes = {
  showSectionHeading: PropTypes.bool,
};

Booking.defaultProps = {
  showSectionHeading: false,
};

export default Booking;
