import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#b4451a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 32 32">
          <path
            d="M21.6 10.4a7.4 7.4 0 1 0 0 11.2"
            fill="none"
            stroke="#fffaf2"
            strokeWidth="3.1"
            strokeLinecap="round"
          />
          <path
            d="M15.2 16h8.4v5.4"
            fill="none"
            stroke="#fffaf2"
            strokeWidth="3.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
