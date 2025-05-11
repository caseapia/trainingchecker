import axios from "axios";

const TRAININGAPI_URL = process.env.NEXT_PUBLIC_TRAININGAPI_URL!;
const CHRONOAPI_URL = process.env.NEXT_PUBLIC_CHRONOAPI_URL!;
const METRICAPI_URL = "https://ptb.discord.com/api/webhooks/";

if (!TRAININGAPI_URL || !CHRONOAPI_URL) {
  throw new Error("API URLs are not properly defined.");
}

const createApiClient = (baseURL: string) => axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const trainingApiClient = createApiClient(TRAININGAPI_URL);
export const chronoApiClient = createApiClient(CHRONOAPI_URL);
export const metricApiClient = createApiClient(METRICAPI_URL);