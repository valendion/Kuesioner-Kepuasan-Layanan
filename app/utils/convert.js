export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const parsePostgresArray = (str) => {
  if (typeof str !== "string") return str;

  if (str.startsWith("{") && str.endsWith("}")) {
    const cleaned = str.slice(1, -1); // hapus { }
    return cleaned.split(",").map((v) => Number(v));
  }
  return str;
};
