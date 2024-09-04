import { NextFunction, Response, Request } from "express";
import authService from "../services/authService";
import "../express-session";

class AuthController {
  async registration(
    req: Request<{ login: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { login, password } = req.body;
      const user = await authService.registration(login, password);
      if ("error" in user) {
        throw new Error();
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const user = await authService.login(login, password);
      if ("error" in user) {
        throw new Error();
      }
      req.session.userId = user._id.toString();
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json(error);
    }
  }
  async getUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const user = await authService.getUser(req.body.id);
    if ("error" in user) {
      throw new Error();
    }
    res.status(200).json(user);
  }
}

export default new AuthController();
