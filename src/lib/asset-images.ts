import path from "path";
import { readdir } from "fs/promises";

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

export const imagesRoot = path.join(process.cwd(), "src", "assets", "images");

export type AssetImage = {
  name: string;
  path: string;
  url: string;
};

export async function listAssetImages(
  directory = imagesRoot,
  prefix = ""
): Promise<AssetImage[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.posix.join(prefix, entry.name);
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listAssetImages(absolutePath, relativePath);
      }

      if (!allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
        return [];
      }

      return [
        {
          name: entry.name,
          path: relativePath,
          url: `/api/assets/${relativePath}`,
        },
      ];
    })
  );

  return images.flat().sort((first, second) => first.path.localeCompare(second.path));
}

export function getAssetMimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";

  return "image/png";
}

export function resolveAssetPath(relativePath: string) {
  const normalized = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const absolutePath = path.join(imagesRoot, normalized);
  const relativeToRoot = path.relative(imagesRoot, absolutePath);

  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    return null;
  }

  return absolutePath;
}
