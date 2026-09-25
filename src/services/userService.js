import { User } from "../models/user.js";

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};
