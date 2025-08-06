import z from "zod";
import { ApartmentStatus } from "./apartment.model";

const createApartmentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty"),
    link: z.url("Link must be a valid URL"),
    price: z.string().optional(),
    status: z.enum(ApartmentStatus).optional(),
  }),
});

const updateApartmentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    link: z.url("Link must be a valid URL").optional(),
    price: z.string().optional(),
    status: z.enum(ApartmentStatus).optional(),
  }),
});

export { createApartmentSchema, updateApartmentSchema };
