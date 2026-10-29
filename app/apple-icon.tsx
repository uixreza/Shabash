import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function Icon() {
  const fontExtraBold = await readFile(
    join(process.cwd(), "assets/fonts/Dana-ExtraBold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1c1917 0%, #292524 55%, #1c1917 100%)",
          borderRadius: 36,
        }}>
        <span
          style={{
            fontSize: 110,
            color: "#d4af37",
            fontFamily: "Dana",
            fontWeight: 800,
          }}>
          ش
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
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
