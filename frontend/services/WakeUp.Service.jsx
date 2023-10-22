import axios from "axios";
import * as url from "./constants/url.jsx";

export const wakeUp = () => {
  return axios.get(url.WAKE_UP_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default {
  wakeUp,
};
