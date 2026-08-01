export const getTextField = (value) =>
  typeof value === "string" ? value.trim() : "";

export const getCommaSeparatedValues = (value) => {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getApiErrorMessage = (
  error,
  fallback = "Не вдалося зберегти зміни. Спробуйте ще раз."
) => {
  const data = error?.response?.data;

  if (typeof data === "string") {
    return data;
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  const errors = Array.isArray(data) ? data : data?.errors;

  if (Array.isArray(errors)) {
    const message = errors
      .map((item) => item.msg || item.message)
      .filter(Boolean)
      .join(" ");

    return message || fallback;
  }

  return fallback;
};
