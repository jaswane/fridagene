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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F1",
        }}
      >
        <div
          style={{
            width: 144,
            height: 144,
            borderRadius: 28,
            background: "#1C4E5C",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 16,
            boxShadow: "0 6px 18px rgba(28,40,56,0.18)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 36,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              background: "#C76E3C",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 36,
              width: 14,
              height: 28,
              borderRadius: 6,
              background: "#1A1F2A",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -10,
              right: 36,
              width: 14,
              height: 28,
              borderRadius: 6,
              background: "#1A1F2A",
            }}
          />
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 100,
              background: "#FAF7F1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: -0.5,
              color: "#1C4E5C",
            }}
          >
            FRI
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
