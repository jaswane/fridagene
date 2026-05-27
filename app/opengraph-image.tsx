import { ImageResponse } from "next/og";

export const alt = "Fridagene.no — finn helligdager, fridager og langhelger i Norge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(900px 500px at 80% 0%, rgba(199,110,60,0.18), transparent 60%), radial-gradient(900px 600px at 10% 100%, rgba(28,78,92,0.16), transparent 65%), #FAF7F1",
          color: "#1A1F2A",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#1C4E5C",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 18,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                background: "#C76E3C",
              }}
            />
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 100,
                background: "#FAF7F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1C4E5C",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              FRI
            </div>
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: -1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            Fridagene<span style={{ color: "#1C4E5C" }}>.no</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 32,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#1C4E5C",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            Når har du fri?
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Helligdager, fridager og langhelger i Norge
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#636C7C",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>Røde dager · inneklemte dager · arbeidsdager</span>
          <span style={{ color: "#1A1F2A", fontWeight: 600 }}>fridagene.no</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
