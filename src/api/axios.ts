import axios from "axios";
import Cookies from "js-cookie";

const TRAININGAPI_URL = process.env.NEXT_PUBLIC_TRAININGAPI_URL!;
const CHRONOAPI_URL = process.env.NEXT_PUBLIC_CHRONOAPI_URL!;
const METRICAPI_URL = "https://ptb.discord.com/api/webhooks/";
const hash = Cookies.get("__ha_sh");

if (!TRAININGAPI_URL || !CHRONOAPI_URL) {
  throw new Error("API URLs are not properly defined.");
}

const createApiClient = (baseURL: string) => axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

const createAuthorizationApiClient = (baseURL: string) => axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": hash ?? "",
  },
})

export const trainingApiClient = createApiClient(TRAININGAPI_URL);
export const chronoApiClient = createAuthorizationApiClient(CHRONOAPI_URL);
export const metricApiClient = createApiClient(METRICAPI_URL);
