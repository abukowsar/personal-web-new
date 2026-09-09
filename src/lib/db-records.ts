import { ObjectId, type Document } from "mongodb";

export function mapRecord(item: Document) {
  const mapped: Document = {
    ...item,
    id: item._id.toString(),
    createdAt: item.createdAt?.toISOString?.() ?? item.createdAt,
  };

  delete mapped._id;
  return mapped;
}

export function toRecordObjectId(id: string) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}
