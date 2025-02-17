import { Inter } from "next/font/google";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
const inter = Inter({ subsets: ["latin"], weight: ["700"] });

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const subtitle = searchParams.get("subtitle");
  const type = searchParams.get("type");

  // Ensure title and subtitle are not null
  const safeTitle = title || "Blood Need";
  const safeSubtitle = subtitle || "Connect donors with those in need";

  // Font loading
  let interBold: ArrayBuffer;
  try {
    interBold = await fetch(
      "https://fonts.gstatic.com/s/inter/v12/UcC7F-5FQ7tHc9IacZqUV_j2eZL2xFo.woff2"
    ).then((res) => res.arrayBuffer());
  } catch (e) {
    console.error("Failed to load Inter font:", e);
    interBold = interBold = new ArrayBuffer(0);
  }
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          fontFamily: inter.style.fontFamily,
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            padding: "24px 48px",
            borderRadius: "16px",
            color: "white",
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          {type === "donor"
            ? "Blood Donor"
            : type === "request"
            ? "Blood Request"
            : "Blood Donation"}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "16px",
            maxWidth: "80%",
          }}
        >
          {safeTitle}
        </div>
        <div
          style={{
            fontSize: 36,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {safeSubtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: interBold
        ? [
            {
              name: "Inter",
              data: interBold,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
