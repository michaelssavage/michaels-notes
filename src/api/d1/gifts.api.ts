import { requireAdmin } from "@/api/auth/require-admin";
import { execute, queryAll, queryOne } from "@/api/d1/api";
import { Gift, GIFT_CATEGORIES } from "@/types/Gift";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const COLUMNS = "id, name, category, link, image, price, description";

const GiftSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(GIFT_CATEGORIES),
  link: z.string(),
  image: z.string(),
  price: z.string(),
  description: z.string(),
});

const GiftIdSchema = z.object({ id: z.string().min(1) });

export const getGifts = createServerFn({ method: "GET" }).handler(async () => {
  return queryAll<Gift>(`SELECT ${COLUMNS} FROM gifts`);
});

export const getGift = createServerFn({ method: "GET" })
  .inputValidator(GiftIdSchema)
  .handler(async ({ data }) => {
    const row = await queryOne<Gift>(
      `SELECT ${COLUMNS} FROM gifts WHERE id = ?`,
      [data.id],
    );
    if (!row) throw new Error("Gift not found");
    return row;
  });

export const createGift = createServerFn({ method: "POST" })
  .inputValidator(GiftSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    await execute(
      `INSERT INTO gifts (${COLUMNS}) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id,
        data.name,
        data.category,
        data.link,
        data.image,
        data.price,
        data.description,
      ],
    );
    return data.id;
  });

const UpdateGiftSchema = z.object({
  id: z.string().min(1),
  updates: GiftSchema.omit({ id: true }),
});

export const updateGift = createServerFn({ method: "POST" })
  .inputValidator(UpdateGiftSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    const { id, updates } = data;
    const result = await execute(
      `UPDATE gifts SET name = ?, category = ?, link = ?, image = ?, price = ?, description = ? WHERE id = ?`,
      [
        updates.name,
        updates.category,
        updates.link,
        updates.image,
        updates.price,
        updates.description,
        id,
      ],
    );
    if (result.meta.changes === 0) throw new Error("Gift not found");
    return { id, ...updates };
  });

export const deleteGift = createServerFn({ method: "POST" })
  .inputValidator(GiftIdSchema)
  .handler(async ({ data }) => {
    requireAdmin();
    await execute(`DELETE FROM gifts WHERE id = ?`, [data.id]);
    return data.id;
  });
