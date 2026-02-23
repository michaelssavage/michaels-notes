import {
  getCollection,
  serializeMongoDoc,
  serializeMongoDocs,
} from "@/api/mongo/db";
import { GUIDE_TAGS, GUIDE_TYPES, GuideTableItem } from "@/types/Guide";
import { createServerFn } from "@tanstack/react-start";
import { ObjectId } from "mongodb";
import { z } from "zod";

const GuideSchema = z.object({
  name: z.string().min(1),
});

export const getGuide = createServerFn({ method: "GET" })
  .inputValidator(GuideSchema)
  .handler(async ({ data }) => {
    if (!data.name) {
      throw new Error("Missing 'name' query parameter");
    }

    const collection = await getCollection(data.name);
    const guide = await collection
      .find<GuideTableItem & { _id: ObjectId }>({})
      .toArray();

    return serializeMongoDocs<GuideTableItem>(guide);
  });

const GuideItemSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const getGuideItem = createServerFn({ method: "GET" })
  .inputValidator(GuideItemSchema)
  .handler(async ({ data }) => {
    if (!data.name || !data.slug) {
      throw new Error("Missing 'slug' query parameter");
    }

    const collection = await getCollection(data.name);
    const item = await collection.findOne<GuideTableItem & { _id: ObjectId }>({
      id: data.slug,
    });

    if (!item) {
      throw new Error("Item not found");
    }

    return serializeMongoDoc<GuideTableItem>(item);
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
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
});

export const updateGuideItem = createServerFn({ method: "POST" })
  .inputValidator(UpdateGuideItemSchema)
  .handler(async ({ data }) => {
    if (!data.name || !data.slug) {
      throw new Error("Missing 'slug' query parameter");
    }

    const collection = await getCollection<GuideTableItem>(data.name);

    const result = await collection.findOneAndUpdate(
      { id: data.slug },
      { $set: data.updates },
      { returnDocument: "after" }
    );

    if (!result) {
      throw new Error("Item not found");
    }

    return serializeMongoDoc<GuideTableItem>(result);
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
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
});

export const createGuideItem = createServerFn({ method: "POST" })
  .inputValidator(CreateGuideItemSchema)
  .handler(async ({ data }) => {
    if (!data.name) {
      throw new Error("Missing 'name' query parameter");
    }

    const collection = await getCollection<Partial<GuideTableItem>>(data.name);

    const result = await collection.insertOne(data.item);

    if (!result.insertedId) {
      throw new Error("Failed to create item");
    }

    return result.insertedId.toHexString();
  });
