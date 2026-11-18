import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg,#7a0a2e,#3f0119)",
          color: "#f3d68f",
          fontSize: 40,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        I
      </div>
    ),
    size,
  );
}
