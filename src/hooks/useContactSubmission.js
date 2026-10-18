import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../utils/axios";

export default function useContactSubmission() {
  const { t, i18n } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const submitContactForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/contact", {
        name: values.get("name"),
        email: values.get("email"),
        title: values.get("title"),
        message: values.get("message"),
        locale: i18n.language,
      });
      form.reset();
      setStatus({ type: "success", message: t("contacts_submit_success") });
    } catch {
      setStatus({ type: "error", message: t("contacts_submit_error") });
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, status, submitContactForm };
}
