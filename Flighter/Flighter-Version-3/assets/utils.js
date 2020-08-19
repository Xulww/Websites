import cookies from "browser-cookies";

export const getHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": cookies.get("csrftoken"),
  };
};
