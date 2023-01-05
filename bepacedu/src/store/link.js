import process from "process";

const envType = process.env.NODE_ENV;
export const mainLink =
  envType === "development" ? "http://localhost:5000" : "";
