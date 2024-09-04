import { NextFunction, Response, Request } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    req.body.id = req.session.userId;
    next();
  } else {
    res.status(403).json({ message: "Forrbiden" });
  }
};
