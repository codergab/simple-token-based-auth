import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { ErrorResponseObject, SuccessResponse } from "../common/http";
import { generateAccessToken } from "../services/AuthService";

export class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, phone, password } = req.body;

      const user = await UserModel.findOne({ email }).lean();
      if (user) {
        return res
          .status(400)
          .json(
            new ErrorResponseObject(
              "email belongs to an existing account! login?"
            )
          );
      }

      const userDetails = await new UserModel({
        first_name,
        last_name,
        email,
        phone,
        password,
      }).save();
      const access_token = generateAccessToken(userDetails);

      return res.json(
        new SuccessResponse("registration successful", { access_token })
      );
    } catch (error: any) {
      return res.status(500).json(new ErrorResponseObject(error.message));
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json(new ErrorResponseObject("Invalid credentials"));
      }

      const isValidUserPassword = await user.isValidPassword(password);
      if (!isValidUserPassword) {
        return res
          .status(400)
          .json(new ErrorResponseObject("Invalid credentials"));
      }

      const access_token = generateAccessToken(user);

      return res.json(
        new SuccessResponse("authentication successful", { access_token })
      );
    } catch (error: any) {
      return res.status(500).json(new ErrorResponseObject(error.message));
    }
  }

  static async getAccountDetails(req: Request, res: Response) {
    const user = await UserModel.findById(req.user.id).select('first_name last_name email phone');
    return res.json(new SuccessResponse("user details", user));
  }
}
