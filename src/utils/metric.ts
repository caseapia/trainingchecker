import axios from "axios";
import Cookies from "js-cookie";

export type MetricTypes = "Error" | "Success" | "Warning"
export const isDevModeEnabled = process.env["NODE_ENV"] === "development";

export const metric = {
  send: async (
    message: string,
    type: MetricTypes,
    options?: {
      additionalData?: any;
      hash: string;
    }
  ) => {
    try {
      const payload = {
        message,
        type,
        additionalData: options?.additionalData || null,
        hash: Cookies.get("__ha_sh") || "undefined",
      };
      const res = await axios.post("/api/metric", JSON.stringify(payload));
      if (isDevModeEnabled) {
        console.log("[Metric] Sent metric:", res.data);
      }
    } catch (err) {
      if (isDevModeEnabled) {
        console.error("[Metric] Error sending metric:", err);
      }
    }
  }
}
