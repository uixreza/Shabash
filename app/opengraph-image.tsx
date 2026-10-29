import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — برنامه‌ریزی و رزرو تالار و باغ عروسی در بجنورد و خراسان شمالی`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const [fontBold, fontExtraBold, fontRegular] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Dana-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Dana-ExtraBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Dana-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background:
            "linear-gradient(135deg, #1c1917 0%, #292524 45%, #1c1917 100%)",
          position: "relative",
        }}>
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "rgba(212, 175, 55, 0.14)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(212, 175, 55, 0.10)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            border: "2px solid rgba(212, 175, 55, 0.5)",
            borderRadius: 9999,
            padding: "10px 36px",
            backgroundColor: "rgba(212, 175, 55, 0.12)",
          }}>
          <span
            style={{
              fontSize: 30,
              color: "#d4af37",
              fontFamily: "Dana",
              fontWeight: 700,
            }}>
            بجنورد • خراسان شمالی
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 1080,
            fontSize: 76,
            color: "#faf7f0",
            fontFamily: "Dana",
            fontWeight: 800,
            textAlign: "center",
          }}>
          <span>
            شاباشچی <span style={{ color: "#d4af37" }}>یادت نره</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "rgba(250, 247, 240, 0.78)",
            fontFamily: "Dana",
            fontWeight: 400,
            maxWidth: 980,
            textAlign: "center",
            lineHeight: 1.7,
          }}>
          رزرو آنلاین تالار و باغ‌عمارت، آتلیه، میکاپ، گل‌آرایی و کترینگ عروسی
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
            fontSize: 28,
            color: "#d4af37",
            fontFamily: "Dana",
            fontWeight: 700,
          }}>
          مشاوره رایگان • تضمین بهترین قیمت • shabashchi
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Dana",
          data: fontRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Dana",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Dana",
          data: fontExtraBold,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
