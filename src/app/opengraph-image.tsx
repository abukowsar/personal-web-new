import { ImageResponse } from "next/og";
import { BrandShareImage } from "@/lib/brand-share-image";

export const runtime = "nodejs";
export const alt = "Engr Abu Kowsar — Technical Project Manager & AI Integration Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<BrandShareImage />, size);
}
