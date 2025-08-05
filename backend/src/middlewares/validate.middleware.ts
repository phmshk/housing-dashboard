import { RequestHandler } from "express";
import { ZodError, ZodObject } from "zod";
import ApiError from "../utils/ApiError";

const validate =
  (schema: ZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((e) => e.message);
        return next(
          new ApiError(400, `Validation failed. ${errorMessages.join(". ")}`)
        );
      }
      return next(error);
    }
  };

export { validate };
