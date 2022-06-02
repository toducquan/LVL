export const url = "localhost:3000";
// export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": "Bearer "+localStorage.getItem("token"),
    },
  };

  return headers;
};
