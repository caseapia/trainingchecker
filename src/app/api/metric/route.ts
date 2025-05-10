import { metricApiClient } from "@/api/axios";

export const POST = async (req: Request) => {
  const params = process.env["NEXT_PUBLIC_METRIC"];
  try {
    const { message, type, additionalData, hash } = await req.json();

    const embedColorMap: Record<string, number> = {
      Success: 0x22c55e,
      Error: 0xef4444,
      Warning: 0xf59e0b,
    };

    const payload = {
      username: "Spidey Bot",
      embeds: [
        {
          title: `📊 ${type} Metric`,
          description: message,
          color: embedColorMap[type] || 0x3b82f6,
          fields: additionalData
            ? Object.entries(additionalData).map(([key, value]) => ({
              name: key,
              value: String(value),
              inline: true,
            }))
            : [],
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
