import { Request, Response, NextFunction } from "express";
import { client } from "../app";

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const cache = await client.get(id);
  if (cache) {
    req.body = JSON.parse(cache);
  } else {
    const dataToCache = JSON.stringify(req.body);
    await client.set(id, dataToCache);
  }
  next();
};
