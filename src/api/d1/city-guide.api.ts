import { execute, queryAll, queryOne } from "@/api/d1/api";
import { GUIDE_TAGS, GUIDE_TYPES, GuideTableItem } from "@/types/Guide";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type GuideRow = Omit<GuideTableItem, "tags" | "coordinates"> & {
  tags: string;
  coord_lat: number | null;
  coord_lng: number | null;
};

function deserializeGuide(row: GuideRow): GuideTableItem {
  const { tags, coord_lat, coord_lng, ...rest } = row;
  return {
    ...rest,
    tags: JSON.parse(tags),
    coordinates:
      coord_lat != null && coord_lng != null
        ? { lat: coord_lat, lng: coord_lng }
        : undefined,
  };
}

const GuideSchema = z.object({ name: z.string().min(1) });

export const getGuide = createServerFn({ method: "GET" })
  .inputValidator(GuideSchema)
  .handler(async ({ data }) => {
    const rows = await queryAll<GuideRow>(
      `SELECT id, title, location, link, price, image, description, tags, type, coord_lat, coord_lng FROM "${data.name}"`
    );
    return rows.map(deserializeGuide);
  });

const GuideItemSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const getGuideItem = createServerFn({ method: "GET" })
  .inputValidator(GuideItemSchema)
  .handler(async ({ data }) => {
    const row = await queryOne<GuideRow>(
      `SELECT id, title, location, link, price, image, description, tags, type, coord_lat, coord_lng FROM "${data.name}" WHERE id = ?`,
      [data.slug]
    );
    if (!row) throw new Error("Item not found");
    return deserializeGuide(row);
  });

const UpdateGuideItemSchema = z.object({
  name: z.string(),
  slug: z.string(),
  updates: z.object({
    title: z.string().optional(),
    location: z.string().optional(),
    link: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.enum(Object.values(GUIDE_TAGS))).optional(),
    type: z.enum(Object.values(GUIDE_TYPES)).optional(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  }),
});

export const updateGuideItem = createServerFn({ method: "POST" })
  .inputValidator(UpdateGuideItemSchema)
  .handler(async ({ data }) => {
    const { updates, name, slug } = data;
    const setClauses: string[] = [];
    const params: unknown[] = [];

    if (updates.title !== undefined) {
      setClauses.push("title = ?");
      params.push(updates.title);
    }
    if (updates.location !== undefined) {
      setClauses.push("location = ?");
      params.push(updates.location);
    }
    if (updates.link !== undefined) {
      setClauses.push("link = ?");
      params.push(updates.link);
    }
    if (updates.price !== undefined) {
      setClauses.push("price = ?");
      params.push(updates.price);
    }
    if (updates.image !== undefined) {
      setClauses.push("image = ?");
      params.push(updates.image);
    }
    if (updates.description !== undefined) {
      setClauses.push("description = ?");
      params.push(updates.description);
    }
    if (updates.tags !== undefined) {
      setClauses.push("tags = ?");
      params.push(JSON.stringify(updates.tags));
    }
    if (updates.type !== undefined) {
      setClauses.push("type = ?");
      params.push(updates.type);
    }
    if (updates.coordinates !== undefined) {
      setClauses.push("coord_lat = ?", "coord_lng = ?");
      params.push(updates.coordinates.lat, updates.coordinates.lng);
    }

    if (setClauses.length === 0) throw new Error("No fields to update");

    params.push(slug);
    await execute(
      `UPDATE "${name}" SET ${setClauses.join(", ")} WHERE id = ?`,
      params
    );

    const row = await queryOne<GuideRow>(
      `SELECT id, title, location, link, price, image, description, tags, type, coord_lat, coord_lng FROM "${name}" WHERE id = ?`,
      [slug]
    );
    if (!row) throw new Error("Item not found");
    return deserializeGuide(row);
  });

const CreateGuideItemSchema = z.object({
  name: z.string(),
  item: z.object({
    id: z.string(),
    title: z.string(),
    location: z.string().optional(),
    link: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.enum(Object.values(GUIDE_TAGS))).optional(),
    type: z.enum(Object.values(GUIDE_TYPES)).optional(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  }),
});

export const createGuideItem = createServerFn({ method: "POST" })
  .inputValidator(CreateGuideItemSchema)
  .handler(async ({ data }) => {
    const { item, name } = data;
    await execute(
      `INSERT INTO "${name}" (id, title, location, link, price, image, description, tags, type, coord_lat, coord_lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        item.title,
        item.location ?? "",
        item.link ?? "",
        item.price ?? "",
        item.image ?? "",
        item.description ?? "",
        JSON.stringify(item.tags ?? []),
        item.type ?? "",
        item.coordinates?.lat ?? null,
        item.coordinates?.lng ?? null,
      ]
    );
    return item.id;
  });
