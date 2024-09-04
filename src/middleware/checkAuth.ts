import { NextFunction, Response, Request } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user && req.session.user._id) {
    req.body.id = req.session.user._id;
    res.send(req.session.user);
  } else {
    res.status(403).json({ message: "Forrbiden" });
  }
};
