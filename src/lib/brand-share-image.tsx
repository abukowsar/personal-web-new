import fs from "node:fs";
import path from "node:path";

let cachedLogoDataUrl: string | null = null;

function getLogoDataUrl() {
  if (cachedLogoDataUrl) return cachedLogoDataUrl;

  const logoPath = path.join(process.cwd(), "src", "assets", "images", "logo1.png");
  const logoBuffer = fs.readFileSync(logoPath);
  cachedLogoDataUrl = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  return cachedLogoDataUrl;
}

export function BrandShareImage() {
  const logoSrc = getLogoDataUrl();

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(135deg, #0b1220 0%, #111a2b 55%, #0b1220 100%)",
      }}
    >
      {/* Decorative diamonds echoing the logo mark */}
      <div
        style={{
          position: "absolute",
          top: -90,
          left: -90,
          width: 260,
          height: 260,
          border: "20px solid rgba(45,189,175,0.16)",
          borderRadius: 44,
          transform: "rotate(45deg)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -130,
          right: -70,
          width: 340,
          height: 340,
          border: "24px solid rgba(45,189,175,0.12)",
          borderRadius: 56,
          transform: "rotate(45deg)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 56,
          right: 90,
          width: 34,
          height: 34,
          border: "6px solid rgba(94,234,212,0.35)",
          borderRadius: 8,
          transform: "rotate(45deg)",
          display: "flex",
        }}
      />

      {/* Full logo, unclipped */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={760} height={211} alt="Abu Kowsar" />
      </div>

      <div
        style={{
          marginTop: 30,
          fontSize: 28,
          color: "#9CA3AF",
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        Technical Project Manager • AI Integration Specialist
      </div>

      <div
        style={{
          marginTop: 44,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "#2DBDAF",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 24, color: "#5EEAD4", letterSpacing: 1, display: "flex" }}>
          abukowsar.site
        </div>
      </div>
    </div>
  );
}
