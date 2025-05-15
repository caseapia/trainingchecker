import { metricApiClient } from "@/api/axios";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import settings from "@/consts/settings";

export const POST = async (req: Request) => {
  const hdr = await headers();
  const params = process.env["NEXT_PUBLIC_METRIC"];
  const forwardedFor = hdr.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "Unknown";
  const userAgent = hdr.get("user-agent") || "Unknown";
  const isDevModeEnabled = settings.find(s => s.option === "DEV_TOOLS")?.value === true;

  const { browser, cpu, device } = UAParser(String(userAgent));

  try {
    const { message, type, additionalData, hash } = await req.json();

    const embedColorMap: Record<string, number> = {
      Success: 0x22c55e,
      Error: 0xef4444,
      Warning: 0xf59e0b,
    };

    const fields = [
      ...(additionalData
        ? Object.entries(additionalData).map(([key, value]) => ({
          name: key,
          value: String(value),
          inline: true,
        }))
        : []),
      { name: "IP", value: ip, inline: true },
      { name: "Device Info", value: `${browser.name}, ${cpu.architecture}, ${device.type || "Unknown"}`, inline: true },
    ];

    const payload = {
      username: "Spidey Bot",
      embeds: [
        {
          title: `📊 ${type} Metric ${isDevModeEnabled ? "DEVELOPMENT" : ""}`,
          description: message,
          color: embedColorMap[type] || 0x3b82f6,
          fields,
          footer: {
            text: hash ? `User Hash: ${hash}` : "Hash is not mounted",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if (!params) {
      throw new Error("'NEXT_PUBLIC_METRIC' environment variable is not defined");
    }

    await metricApiClient.post(params, JSON.stringify(payload));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
};
