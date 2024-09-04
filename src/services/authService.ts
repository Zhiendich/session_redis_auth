import User from "../models/user.js";
import bcrypt from "bcryptjs";

class AuthService {
  async registration(login: string, password: string) {
    try {
      const findUser = await User.findOne({ login });
      if (findUser) {
        return { error: "User already exist" };
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ login, password: hashPassword });
      await user.save();
      return user;
    } catch (error) {
      return { error: "Error" };
    }
  }
  async login(login: string, password: string) {
    try {
      const user = await User.findOne({ login });
      if (user === null) {
        return { error: "User not found" };
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return { error: "Неверный пароль" };
      }

      return user;
    } catch (error) {
      return { error: "Error" };
    }
  }
  async getUser(id: string) {
    const user = await User.findOne({ _id: id });
    if (user === null) {
      return { error: "User not found" };
    }
    return user;
  }
}

export default new AuthService();
