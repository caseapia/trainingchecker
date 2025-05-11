import axios from "axios";
import settings from "@/consts/settings";
import Cookies from "js-cookie";

export type MetricTypes = "Error" | "Success" | "Warning"
export const isDevModeEnabled = settings.find(s => s.option === "DEV_TOOLS")?.value === true;

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
