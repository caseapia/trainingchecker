import { metricApiClient } from "@/api/axios";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import settings from "@/consts/settings";
import axios from "axios";
import GeoResponse from "@/models/Geo";

export const POST = async (req: Request) => {
  const hdr = await headers();
  const params = process.env["NEXT_PUBLIC_METRIC"];
  const forwardedFor = hdr.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "Unknown";
  const userAgent = hdr.get("user-agent") || "Unknown";
  const isDevModeEnabled = settings.find(s => s.option === "DEV_TOOLS")?.value === true;

  const { browser, cpu, device } = UAParser(String(userAgent));
  let geoData: Partial<GeoResponse> = {};

  try {
    const geoRes = await axios.get<GeoResponse>(`https://ipwho.is/${ip}`);
    if (geoRes.data?.success) {
      geoData = geoRes.data;
    }
  } catch (e) {
    if (isDevModeEnabled) {
      console.error("Geo lookup failed:", e);
    }
  }

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
      { name: "🌐 IP", value: `\`${ip}\``, inline: true },
      {
        name: "🗺️ Location",
        value: [
          `**City:** ${geoData.city || "_Unknown_"},`,
          `**Country:** ${geoData.country || "_Unknown_"} ${geoData.flag?.emoji || ""}`,
          `**Continent:** ${geoData.continent || "_Unknown_"}`,
          `**EU Member:** ${geoData.is_eu ? "✅ Yes" : "❌ No"}`,
          `**Latitude:** \`${geoData.latitude ?? "?"}\``,
          `**Longitude:** \`${geoData.longitude ?? "?"}\``,
        ].join("\n"),
        inline: true,
      },
      {
        name: "📡 Connection",
        value: [
          `**Type:** \`${geoData.type || "Unknown"}\``,
          `**ASN:** \`${geoData.connection?.asn ?? "?"}\``,
          `**Org:** ${geoData.connection?.org || "_Unknown_"}`,
          `**ISP:** ${geoData.connection?.isp || "_Unknown_"}`,
          `**Domain:** \`${geoData.connection?.domain || "?"}\``,
        ].join("\n"),
        inline: false,
      },
      {
        name: "🕒 Timezone",
        value: [
          `**ID:** \`${geoData.timezone?.id || "Unknown"}\` (${geoData.timezone?.abbr || "?"})`,
          `**UTC:** \`${geoData.timezone?.utc || "?"}\``,
          `**Current Time:** \`${geoData.timezone?.current_time || "?"}\``,
        ].join("\n"),
        inline: false,
      },

      {
        name: "💻 Device Info",
        value: [
          `**Browser:** ${browser.name || "Unknown"}`,
          `**CPU Arch:** ${cpu.architecture || "Unknown"}`,
          `**Device Type:** ${device.type || "Unknown"}`,
        ].join("\n"),
        inline: true,
      },
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
