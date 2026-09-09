import path from "path";
import { readdir } from "fs/promises";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
const pdfExtensions = new Set([".pdf"]);

export const imagesRoot = path.join(process.cwd(), "src", "assets", "images");

export type AssetImage = {
  name: string;
  path: string;
  url: string;
};

async function listAssetsByExtensions(
  allowedExtensions: Set<string>,
  directory = imagesRoot,
  prefix = ""
): Promise<AssetImage[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.posix.join(prefix, entry.name);
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return listAssetsByExtensions(allowedExtensions, absolutePath, relativePath);
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

  return assets.flat().sort((first, second) => first.path.localeCompare(second.path));
}

export function listAssetImages(directory = imagesRoot, prefix = "") {
  return listAssetsByExtensions(imageExtensions, directory, prefix);
}

export function listAssetPdfs(directory = imagesRoot, prefix = "") {
  return listAssetsByExtensions(pdfExtensions, directory, prefix);
}

export function getAssetMimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";
  if (extension === ".pdf") return "application/pdf";

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
